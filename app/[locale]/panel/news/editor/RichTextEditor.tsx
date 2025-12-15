import React, {ChangeEvent, FC, ReactElement, useEffect, useState, useRef} from "react";
import {EditorContent, useEditor} from "@tiptap/react";
import type {Editor} from "@tiptap/core";
import {Extension, Node as TiptapNode} from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import {ResizableImage} from "tiptap-extension-resizable-image";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Blockquote from "@tiptap/extension-blockquote";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Link from "@tiptap/extension-link";
import {TextStyle} from "@tiptap/extension-text-style";

import type {Node as ProseMirrorNode, ResolvedPos,} from "prosemirror-model";

interface RichTextEditorProps {
    content: string;
    onContentChange: (content: string) => void;
    onSetFontSize?: (setFontSizeCallback: (fontSize: string) => void) => void;
    onSetLineHeight?: (setLineHeightCallback: (lineHeight: string) => void) => void;
    onSetHeading?: (setHeadingCallback: (heading: string) => void) => void;
}

interface GlobalAttributesDefinition {
    types: string[];
    attributes: Record<
        string,
        {
            default: unknown;
            parseHTML: (element: HTMLElement) => string;
            renderHTML: (attributes: Record<string, string>) => Record<string, string>;
        }
    >;
}

type HeadingType = "paragraph" | "h1" | "h2" | "h3";
type ImageAlignment = "left" | "right" | "none";
type PositionResult = { pos: number } | null;

const FontSize: Extension = Extension.create({
    name: "fontSize",
    addOptions(): { types: string[] } {
        return { types: ["textStyle"] };
    },
    addGlobalAttributes(): GlobalAttributesDefinition[] {
        return [
            {
                types: ["textStyle"],
                attributes: {
                    fontSize: {
                        default: null,
                        parseHTML: (element: HTMLElement): string =>
                            (element.style.fontSize || "").replace("px", ""),
                        renderHTML: (attributes: Record<string, string>): Record<string, string> => {
                            const value: string | undefined = attributes.fontSize;
                            if (!value) {
                                return {};
                            }
                            return { style: `font-size: ${value}` };
                        },
                    },
                },
            },
        ];
    },
});

const LineHeight: Extension = Extension.create({
    name: "lineHeight",
    addOptions(): { types: string[] } {
        return { types: ["textStyle"] };
    },
    addGlobalAttributes(): GlobalAttributesDefinition[] {
        return [
            {
                types: ["textStyle"],
                attributes: {
                    lineHeight: {
                        default: null,
                        parseHTML: (element: HTMLElement): string =>
                            element.style.lineHeight || "",
                        renderHTML: (attributes: Record<string, string>): Record<string, string> => {
                            const value: string | undefined = attributes.lineHeight;
                            if (!value) return {};
                            return { style: `line-height: ${value}` };
                        }
                    }
                }
            }
        ];
    }
});

const ImageWithAlignment: TiptapNode = ResizableImage.extend({
    addAttributes(): Record<string, unknown> {
        const parentAttrs: Record<string, unknown> = (this.parent?.() as Record<string, unknown>) ?? {};
        return {
            ...parentAttrs,
            align: {
                default: "none",
                parseHTML: (element: HTMLElement): string =>
                    element.getAttribute("data-align") || "none",
                renderHTML: (attributes: Record<string, string>): Record<string, string> => {
                    return { "data-align": attributes.align };
                }
            }
        };
    }
});

const addImageAlignmentClasses: (html: string) => string = (html: string): string => {
    return html.replace(
        /<img([^>]*?)data-align=["']?(left|right|none)["']?([^>]*?)>/g,
        (
            match: string,
            before: string,
            align: string,
            after: string
        ): string => {
            const classMatch: RegExpMatchArray | null = match.match(/class=["']([^"']*)["']/);
            let classValue: string = classMatch ? classMatch[1] : "";

            if (!classValue.includes("editor-image")) {
                classValue += " editor-image";
            }

            if (!classValue.includes(`float-${align}`)) {
                classValue += ` float-${align}`;
            }

            const cleanedAttrs: string = (before + after)
                .replace(/class=["'][^"']*["']/, "")
                .replace(/data-align=["']?(left|right|none)["']?/, "")
                .replace(/alt=["'][^"']*["']/, "");
            return `<img className={"${classValue.trim()}"${cleanedAttrs}} alt={""}>`;
        }
    );
};


export const handleImageDrop: <T extends Element>(
    dragEvent: React.DragEvent<T>,
    editor: Editor | null
) => void = <T extends Element>(
    dragEvent: React.DragEvent<T>,
    editor: Editor | null
): void => {
    if (!editor) {
        return;
    }

    const htmlData: string | null = dragEvent.dataTransfer?.getData("text/html") ?? null;
    const isDraggedImage: boolean = htmlData?.includes("img") ?? false;
    if (!isDraggedImage) return;

    const coords: { left: number; top: number } = {
        left: dragEvent.clientX,
        top: dragEvent.clientY
    };

    const position: PositionResult = editor.view.posAtCoords(coords);

    if (!position) {
        return;
    }

    const resolvedPosition: ResolvedPos = editor.state.doc.resolve(position.pos);

    let imageAlignment: ImageAlignment = "none";

    const parentOffset: number = resolvedPosition.parentOffset;
    const endOffset: number = resolvedPosition.parent.nodeSize - 10;

    if (parentOffset < 10) {
        imageAlignment = "left";
    } else if (parentOffset > endOffset) {
        imageAlignment = "right";
    } else {
        imageAlignment = "none";
    }

    setTimeout((): void => {
        const nodeAtPosition: ProseMirrorNode | null = editor.state.doc.nodeAt(resolvedPosition.pos) ?? null;
        if (nodeAtPosition && nodeAtPosition.type.name === "image") {
            editor
                .chain()
                .focus()
                .setNodeSelection(resolvedPosition.pos)
                .updateAttributes("image", { align: imageAlignment })
                .run();
        }
    }, 50);
};


export const handleHeadingChange: <T extends HTMLSelectElement>(
    changeEvent: ChangeEvent<T>,
    editor: Editor | null
) => void = <T extends HTMLSelectElement>(
    changeEvent: ChangeEvent<T>,
    editor: Editor | null
): void => {
    if (!editor) {
        return;
    }

    const selected: string = changeEvent.target.value;
    const headingValue: HeadingType = selected as HeadingType;

    const headingActions: Record<HeadingType, () => boolean> = {
        paragraph: (): boolean => editor.chain().focus().setParagraph().run(),
        h1: (): boolean => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        h2: (): boolean => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        h3: (): boolean => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    };

    const action: (() => boolean) | undefined = headingActions[headingValue];
    if (action) {
        action();
    }
};


const RichTextEditor: FC<RichTextEditorProps> = ({
    content,
    onContentChange,
    onSetFontSize,
    onSetLineHeight,
    onSetHeading
}: RichTextEditorProps): ReactElement | null => {

    const [isClient, setIsClient]: [boolean, (v: boolean) => void] = useState<boolean>(false);
    const lastSyncedContent = useRef<string>("");

    const handleUpdate = (props: { editor: Editor }) => {
        const htmlContent: string = addImageAlignmentClasses(props.editor.getHTML());
        if (htmlContent !== lastSyncedContent.current) {
            lastSyncedContent.current = htmlContent;
            onContentChange(htmlContent);
        }
    };

    const editor: Editor | null = useEditor({
        extensions: [
            StarterKit,
            ImageWithAlignment.configure({
                allowBase64: true,
                defaultWidth: 300,
                defaultHeight: 300,
                minWidth: 50,
                minHeight: 50,
                withCaption: false
            }),
            Heading.configure({ levels: [1, 2, 3] }),
            TextAlign.configure({ types: ["heading", "paragraph"] }),
            Underline,
            Strike,
            Blockquote,
            BulletList,
            OrderedList,
            ListItem,
            Link.configure({ openOnClick: false }),
            TextStyle,
            FontSize,
            LineHeight
        ],
        content,
        onUpdate: handleUpdate,
        immediatelyRender: false
    });

    useEffect((): () => void => {
        const timer: number = window.setTimeout((): void => {
            setIsClient(true);
        }, 0);
        return (): void => clearTimeout(timer);
    }, []);

    useEffect((): void => {
        if (!editor) {
            return;
        }

        if (onSetFontSize) {
            onSetFontSize((fontSize: string): void => {
                editor.chain().focus().setMark("textStyle", { fontSize }).run();
            });
        }

        if (onSetLineHeight) {
            onSetLineHeight((lineHeight: string): void => {
                editor.chain().focus().setMark("textStyle", { lineHeight }).run();
            });
        }

        if (onSetHeading) {
            onSetHeading((heading: string): void => {
                const type: HeadingType = heading as HeadingType;
                const actions: Record<HeadingType, () => boolean> = {
                    paragraph: (): boolean => editor.chain().focus().setParagraph().run(),
                    h1: (): boolean => editor.chain().focus().toggleHeading({ level: 1 }).run(),
                    h2: (): boolean => editor.chain().focus().toggleHeading({ level: 2 }).run(),
                    h3: (): boolean => editor.chain().focus().toggleHeading({ level: 3 }).run(),
                };
                const fn: (() => boolean) | undefined = actions[type];
                if (fn) {
                    fn();
                }
            });
        }
    }, [editor, onSetFontSize, onSetLineHeight, onSetHeading]);

    useEffect(() => {
        if (!editor) return;
        // Uporabi microtask, da se izogneš flushSync napaki
        if (content !== lastSyncedContent.current && content !== editor.getHTML()) {
            Promise.resolve().then(() => {
                editor.commands.setContent(content || "<p></p>");
                lastSyncedContent.current = content;
            });
        }
    }, [content, editor]);

    if (!isClient) {
        return null;
    }

    return (
        <div>
            <div className={"mb-2 d-flex flex-wrap gap-2 align-items-center bg-light p-2 rounded shadow-sm"}>
                <select
                    id={"heading-select"}
                    className={"select w-auto editor-toolbar-dropdown"}
                    title={"Text Type"}
                    onChange={(event: ChangeEvent<HTMLSelectElement>): void =>
                        handleHeadingChange<HTMLSelectElement>(event, editor)
                    }
                >
                    <option value={"paragraph"}>Navadno besedilo</option>
                    <option value={"h1"}>Naslov 1</option>
                    <option value={"h2"}>Naslov 2</option>
                    <option value={"h3"}>Naslov 3</option>
                </select>

                <select
                    id={"font-size-select"}
                    className={"select w-auto editor-toolbar-dropdown"}
                    title={"Font Size"}
                    onChange={(event: ChangeEvent<HTMLSelectElement>): boolean | undefined =>
                        editor?.chain().focus().setMark("textStyle", { fontSize: event.target.value }).run()
                    }
                    defaultValue={"18px"}
                >
                    <option value={"11px"}>11</option>
                    <option value={"12px"}>12</option>
                    <option value={"13px"}>13</option>
                    <option value={"14px"}>14</option>
                    <option value={"16px"}>16</option>
                    <option value={"18px"}>18</option>
                    <option value={"20px"}>20</option>
                    <option value={"22px"}>22</option>
                    <option value={"24px"}>24</option>
                    <option value={"26px"}>26</option>
                    <option value={"28px"}>28</option>
                    <option value={"36px"}>36</option>
                    <option value={"48px"}>48</option>
                    <option value={"72px"}>72</option>
                </select>

                <select
                    id={"line-height-select"}
                    className={"select w-auto editor-toolbar-dropdown"}
                    title={"Line Spacing"}
                    onChange={(event: ChangeEvent<HTMLSelectElement>): boolean | undefined =>
                        editor?.chain().focus().setMark("textStyle", { lineHeight: event.target.value }).run()
                    }
                    defaultValue={"1"}
                >
                    <option value={"1"}>1</option>
                    <option value={"1.15"}>1.15</option>
                    <option value={"1.5"}>1.5</option>
                    <option value={"2"}>2</option>
                    <option value={"2.5"}>2.5</option>
                    <option value={"3"}>3</option>
                </select>

                <button
                    type={"button"}
                    title={"Bold"}
                    className={editor?.isActive("bold")
                        ? "btn btn-dark btn-sm editor-toolbar-btn"
                        : "btn btn-light btn-sm editor-toolbar-btn"}
                    onClick={(): void => {
                        editor?.chain().focus().toggleBold().run();
                    }}
                >
                    <span className={"editor-toolbar-bold"}>B</span>
                </button>

                <button
                    type={"button"}
                    title={"Italic"}
                    className={editor?.isActive("italic")
                        ? "btn btn-dark btn-sm editor-toolbar-btn"
                        : "btn btn-light btn-sm editor-toolbar-btn"}
                    onClick={(): void => {
                        editor?.chain().focus().toggleItalic().run();
                    }}
                >
                    <span className={"editor-toolbar-italic"}>I</span>
                </button>

                <button
                    type={"button"}
                    title={"Underline"}
                    className={editor?.isActive("underline")
                        ? "btn btn-dark btn-sm editor-toolbar-btn"
                        : "btn btn-light btn-sm editor-toolbar-btn"}
                    onClick={(): void => {
                        editor?.chain().focus().toggleUnderline().run();
                    }}
                >
                    <span className={"editor-toolbar-underline"}>U</span>
                </button>

                <button
                    type={"button"}
                    title={"Strike"}
                    className={editor?.isActive("strike")
                        ? "btn btn-dark btn-sm editor-toolbar-btn"
                        : "btn btn-light btn-sm editor-toolbar-btn"}
                    onClick={(): void => {
                        editor?.chain().focus().toggleStrike().run();
                    }}
                >
                    <span className={"editor-toolbar-strike"}>S</span>
                </button>

                <button
                    type={"button"}
                    title={"Bullet List"}
                    className={editor?.isActive("bulletList")
                        ? "btn btn-dark btn-sm editor-toolbar-btn"
                        : "btn btn-light btn-sm editor-toolbar-btn"}
                    onClick={(): void => {
                        editor?.chain().focus().toggleBulletList().run();
                    }}
                >
                    <span className={"editor-toolbar-bullet"}>• • •</span>
                </button>

                <button
                    type={"button"}
                    title={"Ordered List"}
                    className={editor?.isActive("orderedList")
                        ? "btn btn-dark btn-sm editor-toolbar-btn"
                        : "btn btn-light btn-sm editor-toolbar-btn"}
                    onClick={(): void => {
                        editor?.chain().focus().toggleOrderedList().run();
                    }}
                >
                    <span className={"editor-toolbar-ordered"}>1. 2. 3.</span>
                </button>

                <button
                    type={"button"}
                    title={"Quote"}
                    className={editor?.isActive("blockquote")
                        ? "btn btn-dark btn-sm editor-toolbar-btn"
                        : "btn btn-light btn-sm editor-toolbar-btn"}
                    onClick={(): void => {
                        editor?.chain().focus().toggleBlockquote().run();
                    }}
                >
                    <span className={"editor-toolbar-quote"}>“</span>
                </button>

                <button
                    type={"button"}
                    title={"Undo"}
                    className={"btn btn-light btn-sm editor-toolbar-btn"}
                    onClick={(): void => {
                        editor?.chain().focus().undo().run();
                    }}
                >
                    <span className={"editor-toolbar-undo"}>↺</span>
                </button>

                <button
                    type={"button"}
                    title={"Redo"}
                    className={"btn btn-light btn-sm editor-toolbar-btn"}
                    onClick={(): void => {
                        editor?.chain().focus().redo().run();
                    }}
                >
                    <span className={"editor-toolbar-redo"}>↻</span>
                </button>

                <button
                    type={"button"}
                    title={"Align Left"}
                    className={editor?.isActive("paragraph", { textAlign: "left" })
                        ? "btn btn-dark btn-sm editor-toolbar-btn"
                        : "btn btn-light btn-sm editor-toolbar-btn"}
                    onClick={(): void => {
                        editor?.chain().focus().setTextAlign("left").run();
                    }}
                >
                    <span className={"editor-toolbar-align-left"}>←</span>
                </button>

                <button
                    type={"button"}
                    title={"Align Center"}
                    className={editor?.isActive("paragraph", { textAlign: "center" })
                        ? "btn btn-dark btn-sm editor-toolbar-btn"
                        : "btn btn-light btn-sm editor-toolbar-btn"}
                    onClick={(): void => {
                        editor?.chain().focus().setTextAlign("center").run();
                    }}
                >
                    <span className={"editor-toolbar-align-center"}>↔</span>
                </button>

                <button
                    type={"button"}
                    title={"Align Right"}
                    className={editor?.isActive("paragraph", { textAlign: "right" })
                        ? "btn btn-dark btn-sm editor-toolbar-btn"
                        : "btn btn-light btn-sm editor-toolbar-btn"}
                    onClick={(): void => {
                        editor?.chain().focus().setTextAlign("right").run();
                    }}
                >
                    <span className={"editor-toolbar-align-right"}>→</span>
                </button>
            </div>

            <EditorContent
                editor={editor}
                onDrop={(event: React.DragEvent): void => handleImageDrop<Element>(event, editor)}
            />
        </div>
    );
};

export default RichTextEditor;

export {
    addImageAlignmentClasses
}
