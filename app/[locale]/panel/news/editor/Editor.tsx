"use client";

import React, {useState, useEffect, JSX, ChangeEvent, FormEvent} from "react";
import ImageUploadArea from "./ImageUploadArea";
import RichTextEditor from "./RichTextEditor";
import {saveArticle, getArticleSingle, NewsArticleSingleView, NewsArticle} from "@/api/newsApi";
import {ReadonlyURLSearchParams, useSearchParams} from "next/navigation";
import { useRouter } from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

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

    const [newCoverImage, setNewCoverImage] = useState<File | null>(null);
    const [existingCoverImageUrl, setExistingCoverImageUrl] = useState<string>("");
    const [deletedCoverImage, setDeletedCoverImage] = useState<string | undefined>(undefined);

    const [newImages, setNewImages] = useState<File[]>([]);
    const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]);
    const [deletedImageUrls, setDeletedImageUrls] = useState<string[]>([]);

    const [selectedLanguage, setSelectedLanguage] = useState<string>(SUPPORTED_LANGUAGES[0].code);
    const [content, setContent] = useState<Record<string, string>>(getEmptyLanguageObject());
    const [title, setTitle] = useState<Record<string, string>>(getEmptyLanguageObject());
    const [description, setDescription] = useState<Record<string, string>>(getEmptyLanguageObject());
    const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);
    const [hasInitialContentSync, setHasInitialContentSync] = useState(false);
    const [ignoreNextContentChange, setIgnoreNextContentChange] = useState(false);

    const [notificationMessage, setNotificationMessage] = useState<string | null>(null);
    const [notificationType, setNotificationType] = useState<"success" | "error" | null>(null);

    const searchParams: ReadonlyURLSearchParams = useSearchParams();
    const newsId: string = searchParams.get("url") || "";

    const router: AppRouterInstance = useRouter();

    const handlePreview: () => void = (): void => {
        const encoded: string = encodeURIComponent(content[selectedLanguage] || "");
        window.open(`/panel/news/editor/preview?html=${encoded}`, "_blank");
    };

    useEffect((): void => {
        if (!newsId) {
            return;
        }
        (async (): Promise<void> => {
            try {
                const data: NewsArticleSingleView = await getArticleSingle(newsId);
                const newTitle = { ...getEmptyLanguageObject() };
                const newDescription = { ...getEmptyLanguageObject() };
                const newContent = { ...getEmptyLanguageObject() };
                if (data.translations) {
                    for (const lang of Object.keys(data.translations)) {
                        newTitle[lang] = data.translations[lang].headline || "";
                        newDescription[lang] = data.translations[lang].description || "";
                        newContent[lang] = data.translations[lang].content || "";
                    }
                }
                setTitle(newTitle);
                setDescription(newDescription);
                setContent(newContent);
                setExistingCoverImageUrl(data.coverImage || "");
                setExistingImageUrls(data.images || []);
                setNewCoverImage(null);
                setNewImages([]);
                setHasInitialContentSync(false);
            } catch {}
        })();
    }, [newsId]);

    const handleCoverImageChange: (images: (string | File)[]) => void = (images: (File | string)[]): void => {
        if (images.length > 0 && images[0] instanceof File) {
            if (existingCoverImageUrl) {
                setDeletedCoverImage(existingCoverImageUrl);
            }
            setNewCoverImage(images[0] as File);
            setExistingCoverImageUrl("");
        } else if (images.length > 0 && typeof images[0] === "string") {
            setExistingCoverImageUrl(images[0] as string);
            setNewCoverImage(null);
            setDeletedCoverImage(undefined);
        } else {
            if (existingCoverImageUrl) {
                setDeletedCoverImage(existingCoverImageUrl);
            }
            setNewCoverImage(null);
            setExistingCoverImageUrl("");
        }
        markDirty();
    };

    const handleImagesChange: (images: (string | File)[]) => void = (images: (File | string)[]): void => {
        const removed: string[] = existingImageUrls.filter((url: string): boolean => !images.includes(url));
        if (removed.length > 0) {
            setDeletedImageUrls((previous: string[]): string[] => [...previous, ...removed.filter((url: string): boolean => !previous.includes(url))]);
        }
        setNewImages(images.filter((image: string | File): image is File => image instanceof File));
        setExistingImageUrls(images.filter((image: string | File): image is string => typeof image === "string"));
        markDirty();
    };

    const handleSave: () => void = async (): Promise<void> => {
        setUnsavedChanges(false);
        const isNew: boolean = !newsId;
        const article: NewsArticle = {
            uuid: newsId,
            headline: title[selectedLanguage] || "",
            shortDescription: description[selectedLanguage] || "",
            content: content[selectedLanguage] || "",
            language: selectedLanguage,
            newCoverImage: newCoverImage || undefined,
            existingCoverImage: existingCoverImageUrl || undefined,
            deletedCoverImage: deletedCoverImage,
            newImages: newImages,
            existingImages: existingImageUrls,
            deletedImages: deletedImageUrls,
        };
        try {
            const result: NewsArticle = await saveArticle(article);
            setNotificationMessage("Article successfully updated");
            setNotificationType("success");
            setDeletedImageUrls([]);
            setDeletedCoverImage(undefined);

            console.log(result.uuid);
            if (isNew && result && result.uuid) {
                const params = new URLSearchParams(Array.from(searchParams.entries()));
                params.set("url", result.uuid);
                router.replace(`?${params.toString()}`);
            }
        } catch (error: unknown) {
            setNotificationMessage(error instanceof Error ? error.message : "Error updating Article");
            setNotificationType("error");
        }
    };

    useEffect((): (() => void) | undefined => {
        if (notificationMessage) {
            const timeout: ReturnType<typeof setTimeout> = setTimeout((): void => {
                setNotificationMessage(null);
                setNotificationType(null);
            }, 2000);
            return (): void => clearTimeout(timeout);
        }
    }, [notificationMessage]);

    const markDirty: () => void = (): void => {
        setUnsavedChanges(true);
    };

    return (
        <>
            {(notificationMessage && notificationType) && (
                <div className={"login-toast"}>
                    <div className={`alert alert-${notificationType === "success" ? "success" : "danger"} shadow`} role={notificationType === "success" ? "status" : "alert"}>
                        {notificationMessage}
                    </div>
                </div>
            )}
            <div className={"container-fluid mt-5"}>
                <div className={"row gx-1 align-items-start editor-row"}>
                    <div className={"col-lg-2 editor-image-col"}>
                        <ImageUploadArea
                            images={[...existingImageUrls, ...newImages]}
                            onImagesChange={handleImagesChange}
                            singleImage={false}
                        />
                    </div>
                    <div className={"col-lg-8 d-flex flex-column editor-center-col"}>
                        <div className={"flex-grow-1"}>
                            <RichTextEditor
                                content={content[selectedLanguage] || ""}
                                onContentChange={(value: string): void => {
                                    if (ignoreNextContentChange) {
                                        setIgnoreNextContentChange(false);
                                        setContent((previous: Record<string, string>): {[x: string]: string} => ({ ...previous, [selectedLanguage]: value }));
                                        return;
                                    }
                                    setContent((previous: Record<string, string>): {[x: string]: string} => ({ ...previous, [selectedLanguage]: value }));
                                    if (!hasInitialContentSync) {
                                        setHasInitialContentSync(true);
                                    } else {
                                        markDirty();
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className={"col-lg-2 p-2"}>
                        <form onSubmit={(event: FormEvent<HTMLFormElement>): void => { event.preventDefault()}}>
                            <div className={`editor-unsaved-row${unsavedChanges ? " unsaved-active" : ""}`}>
                                <span className={"editor-unsaved-indicator"}>Spremembe niso shranjene</span>
                                <button
                                    type={"button"}
                                    className={"button editor-unsaved-save-button"}
                                    onClick={handleSave}
                                >Save</button>
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
                                <ImageUploadArea images={existingCoverImageUrl ? [existingCoverImageUrl] : newCoverImage ? [newCoverImage] : []} onImagesChange={handleCoverImageChange} singleImage={true} />
                            </div>
                            <div className={"mb-2"}>
                                <label htmlFor={"lang-select"} className={"form-label"}>News language</label>
                                <select
                                    id={"lang-select"}
                                    className={"select"}
                                    value={selectedLanguage}
                                    onChange={(event: ChangeEvent<HTMLSelectElement>): void => {
                                        setSelectedLanguage(event.target.value);
                                        setIgnoreNextContentChange(true);
                                    }}
                                >
                                    {SUPPORTED_LANGUAGES.map((language: Language): JSX.Element => (
                                        <option key={language.code} value={language.code}>{language.label}</option>
                                    ))}
                                </select>
                            </div>
                            <button type={"button"} className={"button w-100 mb-1"} onClick={handlePreview}>Preview</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Editor;
