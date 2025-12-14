"use client";

import React, {useState, useEffect, JSX, ChangeEvent} from "react";
import ImageUploadArea from "./ImageUploadArea";
import RichTextEditor from "./RichTextEditor";

type Language = {
    code: string;
    label: string
};

const SUPPORTED_LANGUAGES: Language[] = [
    { code: "en", label: "English" },
    { code: "sl", label: "Slovenščina" }
];

const getEmptyLanguageObject: () => Record<string, string> = (): Record<string, string> =>
    Object.fromEntries(SUPPORTED_LANGUAGES.map((language: Language): [string, string] => [language.code, ""]));

const Editor: React.FC = (): JSX.Element => {

    const [images, setImages] = useState<string[]>([]);
    const [coverImage, setCoverImage] = useState<string[]>([]);
    const [selectedLanguage, setSelectedLanguage] = useState<string>(SUPPORTED_LANGUAGES[0].code);
    const [content, setContent] = useState<Record<string, string>>(getEmptyLanguageObject());
    const [title, setTitle] = useState<Record<string, string>>(getEmptyLanguageObject());
    const [description, setDescription] = useState<Record<string, string>>(getEmptyLanguageObject());
    const [setFontSize, setSetFontSize] = useState<(size: string) => void>((): () => void => (): void => {});
    const [setLineHeight, setSetLineHeight] = useState<(lh: string) => void>((): () => void => (): void => {});
    const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);

    const handlePreview: () => void = (): void => {
        const encoded: string = encodeURIComponent(content[selectedLanguage] || "");
        window.open(`/panel/news/editor/preview?html=${encoded}`, "_blank");
    };

    useEffect((): void => {
        setFontSize("18px");
        setLineHeight("1");
    }, [setFontSize, setLineHeight]);

    const handleSave: () => void = (): void => {
        setUnsavedChanges(false);
    };

    const markDirty: () => void = (): void => setUnsavedChanges(true);

    return (
        <div className={"container-fluid mt-5"}>
            <div className={"row gx-1 align-items-start editor-row"}>
                <div className={"col-lg-2 editor-image-col"}>
                    <ImageUploadArea images={images} onImagesChange={(imgs) => { setImages(imgs); markDirty(); }} />
                </div>
                <div className={"col-lg-8 d-flex flex-column editor-center-col"}>
                    <div className={"flex-grow-1"}>
                        <RichTextEditor
                            content={content[selectedLanguage] || ""}
                            onContentChange={(value: string): void => {
                                setContent((previous: Record<string, string>): {[x: string]: string} => ({ ...previous, [selectedLanguage]: value }));
                                markDirty();
                            }}
                            onSetFontSize={(fn: (size: string) => void): void => setSetFontSize((): (size: string) => void => fn)}
                            onSetLineHeight={(fn: (lh: string) => void): void => setSetLineHeight((): (lh: string) => void => fn)}
                        />
                    </div>
                </div>
                <div className={"col-lg-2 p-2"}>
                    <form>
                        <div className={`editor-unsaved-row${unsavedChanges ? ' unsaved-active' : ''}`}>
                            <span className="editor-unsaved-indicator">Spremembe niso shranjene</span>
                            <button
                                type="button"
                                className="button editor-unsaved-save-button"
                                onClick={handleSave}
                            >Shrani</button>
                        </div>
                        <div className={"mb-2"}>
                            <label htmlFor={"news-title"} className={"form-label"}>News headline</label>
                            <input
                                id={"news-title"}
                                name={"title"}
                                type={"text"}
                                className={"input"}
                                placeholder={"Enter the news headline"}
                                value={title[selectedLanguage] || ""}
                                onChange={(event: ChangeEvent<HTMLInputElement>): void => {
                                    setTitle((previous: Record<string, string>): {[x: string]: string} => ({ ...previous, [selectedLanguage]: event.target.value }));
                                    markDirty();
                                }}
                                maxLength={100}
                            />
                            <div className={"text-end small"}>{(title[selectedLanguage] || "").length}/100</div>
                        </div>
                        <div className={"mb-2"}>
                            <label htmlFor={"news-description"} className={"form-label"}>Short description</label>
                            <textarea
                                id={"news-description"}
                                name={"description"}
                                className={"input"}
                                placeholder={"Enter a short description of the news"}
                                value={description[selectedLanguage] || ""}
                                onChange={(event: ChangeEvent<HTMLTextAreaElement>): void => {
                                    setDescription((previous: Record<string, string>): {[x: string]: string} => ({ ...previous, [selectedLanguage]: event.target.value }));
                                    markDirty();
                                }}
                                rows={4}
                                maxLength={300}
                            />
                            <div className={"text-end small"}>{(description[selectedLanguage] || "").length}/300</div>
                        </div>
                        <div className={"mb-2"}>
                            <label className={"form-label"}>Cover image</label>
                            <ImageUploadArea images={coverImage} onImagesChange={(imgs) => { setCoverImage(imgs); markDirty(); }} singleImage={true} />
                        </div>
                        <div className={"mb-2"}>
                            <label htmlFor={"lang-select"} className={"form-label"}>News language</label>
                            <select
                                id={"lang-select"}
                                className={"select"}
                                value={selectedLanguage}
                                onChange={(event: ChangeEvent<HTMLSelectElement>): void => {
                                    setSelectedLanguage(event.target.value);
                                    markDirty();
                                }}
                            >
                                {SUPPORTED_LANGUAGES.map((language: Language): JSX.Element => (
                                    <option key={language.code} value={language.code}>{language.label}</option>
                                ))}
                            </select>
                        </div>
                        <button type={"button"} className={"button w-100 mb-1"} onClick={handlePreview}>Preview</button>
                        <button type={"submit"} className={"button w-100"}>Publish</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Editor;
