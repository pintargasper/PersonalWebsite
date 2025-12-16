"use client";

import React, {useState, useEffect, useRef, JSX, ChangeEvent, FormEvent, RefObject} from "react";
import ImageUploadArea from "./ImageUploadArea";
import RichTextEditor from "./RichTextEditor";
import {saveArticle, getArticleSingle, NewsArticleSingleView, NewsArticle} from "@/api/newsApi";
import {ReadonlyURLSearchParams, useSearchParams} from "next/navigation";
import { useRouter } from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import Link from "next/link";
import {TranslationFunction} from "@/app/[locale]/layout";
import {useTranslations} from "next-intl";

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

    const [published, setPublished] = useState<boolean>(false);

    const [imagesKey, setImagesKey] = useState(0);

    const searchParams: ReadonlyURLSearchParams = useSearchParams();
    const newsId: string = searchParams.get("url") || "";

    const router: AppRouterInstance = useRouter();

    const newCoverImageRef: RefObject<File | null> = useRef<File | null>(null);
    const existingCoverImageUrlRef: RefObject<string> = useRef<string>("");
    const deletedCoverImageRef: RefObject<string | undefined> = useRef<string | undefined>(undefined);
    const newImagesRef: RefObject<File[]> = useRef<File[]>([]);
    const existingImageUrlsRef: RefObject<string[]> = useRef<string[]>([]);
    const deletedImageUrlsRef: RefObject<string[]> = useRef<string[]>([]);
    const titleRef: RefObject<Record<string, string>> = useRef<Record<string, string>>(getEmptyLanguageObject());
    const descriptionRef: RefObject<Record<string, string>> = useRef<Record<string, string>>(getEmptyLanguageObject());
    const contentRef: RefObject<Record<string, string>> = useRef<Record<string, string>>(getEmptyLanguageObject());
    const selectedLanguageRef: RefObject<string> = useRef<string>(SUPPORTED_LANGUAGES[0].code);
    const publishedRef: RefObject<boolean> = useRef<boolean>(false);

    const t: TranslationFunction = useTranslations("panel") as TranslationFunction;
    const t1: TranslationFunction = useTranslations("buttons") as TranslationFunction;

    const setNewCoverImageAndRef: (value: File | null) => void = (value: File | null): void => {
        setNewCoverImage(value); newCoverImageRef.current = value;
    };

    const setExistingCoverImageUrlAndRef: (value: string) => void = (value: string): void => {
        setExistingCoverImageUrl(value); existingCoverImageUrlRef.current = value;
    };

    const setDeletedCoverImageAndRef: (value: string | undefined) => void = (value: string | undefined): void => {
        setDeletedCoverImage(value); deletedCoverImageRef.current = value;
    };

    const setNewImagesAndRef: (value: File[]) => void = (value: File[]): void => {
        setNewImages(value); newImagesRef.current = value;
    };

    const setExistingImageUrlsAndRef: (value: string[]) => void = (value: string[]): void => {
        setExistingImageUrls(value); existingImageUrlsRef.current = value;
    };

    const setDeletedImageUrlsAndRef: (value: string[]) => void = (value: string[]): void => {
        setDeletedImageUrls(value); deletedImageUrlsRef.current = value;
    };

    const setTitleAndRef: (value: Record<string, string>) => void = (value: Record<string, string>): void => {
        setTitle(value); titleRef.current = value;
    };

    const setDescriptionAndRef: (value: Record<string, string>) => void = (value: Record<string, string>): void => {
        setDescription(value); descriptionRef.current = value;
    };

    const setContentAndRef: (value: Record<string, string>) => void = (value: Record<string, string>): void => {
        setContent(value); contentRef.current = value;
    };

    useEffect((): void => {
        newCoverImageRef.current = newCoverImage;
        existingCoverImageUrlRef.current = existingCoverImageUrl;
        deletedCoverImageRef.current = deletedCoverImage;
        newImagesRef.current = newImages;
        existingImageUrlsRef.current = existingImageUrls;
        deletedImageUrlsRef.current = deletedImageUrls;
        titleRef.current = title;
        descriptionRef.current = description;
        contentRef.current = content;
        selectedLanguageRef.current = selectedLanguage;
        publishedRef.current = published;
    }, [newCoverImage, existingCoverImageUrl, deletedCoverImage,
        newImages, existingImageUrls, deletedImageUrls,
        title, description, content, selectedLanguage, published
    ]);

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
                    for (const language of Object.keys(data.translations)) {
                        newTitle[language] = data.translations[language].headline || "";
                        newDescription[language] = data.translations[language].description || "";
                        newContent[language] = data.translations[language].content || "";
                    }
                }
                setTitleAndRef(newTitle);
                setDescriptionAndRef(newDescription);
                setContentAndRef(newContent);
                setExistingCoverImageUrl(data.coverImage || "");
                setExistingImageUrls(data.images || []);
                setNewCoverImageAndRef(null);
                setNewImagesAndRef([]);
                setPublished(data.published);
                setHasInitialContentSync(false);
            } catch {}
        })();
    }, [newsId]);

    const handleCoverImageChange: (images: (string | File)[]) => void = (images: (File | string)[]): void => {
        setUnsavedChanges(true);
        if (images.length > 0 && images[0] instanceof File) {
            if (existingCoverImageUrlRef.current) {
                setDeletedCoverImageAndRef(existingCoverImageUrlRef.current);
            }
            setNewCoverImageAndRef(images[0] as File);
            setExistingCoverImageUrlAndRef("");
        } else if (images.length > 0 && typeof images[0] === "string") {
            setExistingCoverImageUrlAndRef(images[0] as string);
            setNewCoverImageAndRef(null);
            setDeletedCoverImageAndRef(undefined);
        } else {
            if (existingCoverImageUrlRef.current) {
                setDeletedCoverImageAndRef(existingCoverImageUrlRef.current);
            }
            setNewCoverImageAndRef(null);
            setExistingCoverImageUrlAndRef("");
        }
        markDirty();
        handleSave();
    };

    const handleImagesChange: (images: (string | File)[]) => void = (images: (File | string)[]): void => {
        setUnsavedChanges(true);
        const removed: string[] = existingImageUrlsRef.current.filter((url: string): boolean => !images.includes(url));
        if (removed.length > 0) {
            setDeletedImageUrlsAndRef([
                ...deletedImageUrlsRef.current,
                ...removed.filter((url: string): boolean => !deletedImageUrlsRef.current.includes(url))
            ]);
        }
        setNewImagesAndRef(images.filter((image: string | File): image is File => image instanceof File));
        setExistingImageUrlsAndRef(images.filter((image: string | File): image is string => typeof image === "string"));
        markDirty();
        handleSave();
    };

    const handleImagesSaveRefresh: () => void = (): void => {
        setImagesKey((previous: number): number => previous + 1);
    };

    const handleSave: () => void = async (): Promise<void> => {
        setUnsavedChanges(false);
        const isNew: boolean = !newsId;
        const language: string = selectedLanguageRef.current;
        const article: NewsArticle = {
            uuid: newsId,
            headline: titleRef.current[language] || "",
            shortDescription: descriptionRef.current[language] || "",
            content: contentRef.current[language] || "",
            language: language,
            published: publishedRef.current,
            newCoverImage: newCoverImageRef.current || undefined,
            existingCoverImage: existingCoverImageUrlRef.current || undefined,
            deletedCoverImage: deletedCoverImageRef.current,
            newImages: newImagesRef.current,
            existingImages: existingImageUrlsRef.current,
            deletedImages: deletedImageUrlsRef.current
        };
        try {
            const result: NewsArticle = await saveArticle(article);
            setNotificationMessage("Article successfully updated");
            setNotificationType("success");
            setDeletedImageUrlsAndRef([]);
            setDeletedCoverImageAndRef(undefined);
            setNewImagesAndRef([]);
            setNewCoverImageAndRef(null);
            if (result.uuid) {
                const fresh: NewsArticleSingleView = await getArticleSingle(result.uuid);
                setExistingImageUrlsAndRef(fresh.images || []);
                setExistingCoverImageUrlAndRef(fresh.coverImage || "");
            }
            handleImagesSaveRefresh();
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
                <div className={"login-toast position-fixed top-0 end-0 m-3"}>
                    <div className={`alert alert-${notificationType === "success" ? "success" : "danger"} shadow`} role={notificationType === "success" ? "status" : "alert"}>
                        {notificationMessage}
                    </div>
                </div>
            )}
            <div className={"container-fluid mt-5"}>
                <div className={"row gx-1 align-items-start editor-row"}>
                    <div className={"col-lg-2 editor-image-col"}>
                        <ImageUploadArea
                            key={imagesKey}
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
                                <span className={"editor-unsaved-indicator"}>{t("editor.editor.changes.status")}</span>
                            </div>
                            <div className={"d-flex align-items-center w-100 mb-3"}>
                                {newsId ? (
                                    <Link
                                        href={{ pathname: "/panel/news/editor/preview", query: { url: newsId } }}
                                        target={"_blank"}
                                        className={"button w-50 me-2"}
                                    >
                                        {t1("preview")}
                                    </Link>
                                ) : (
                                    <span className={"w-50 me-2"}>{t("editor.editor.changes.preview")}</span>
                                )}
                                {unsavedChanges && (
                                    <button
                                        type={"button"}
                                        className={"button w-50"}
                                        onClick={handleSave}
                                    >{t1("save")}</button>
                                )}
                            </div>
                            <div className={"mb-2"}>
                                <label htmlFor={"news-title"} className={"form-label"}>{t("editor.editor.headline.label")}</label>
                                <input
                                    id={"news-title"}
                                    name={"title"}
                                    type={"text"}
                                    className={"input"}
                                    placeholder={t("editor.editor.headline.placeholder")}
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
                                <label htmlFor={"news-description"} className={"form-label"}>{t("editor.editor.description.label")}</label>
                                <textarea
                                    id={"news-description"}
                                    name={"description"}
                                    className={"input"}
                                    placeholder={t("editor.editor.description.placeholder")}
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
                                <label className={"form-label"}>{t("editor.editor.cover-image")}</label>
                                <ImageUploadArea images={existingCoverImageUrl ? [existingCoverImageUrl] : newCoverImage ? [newCoverImage] : []} onImagesChange={handleCoverImageChange} singleImage={true} />
                            </div>
                            <div className={"mb-2"}>
                                <label htmlFor={"lang-select"} className={"form-label"}>{t("editor.editor.language")}</label>
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
                            <div className={"mb-2 form-check"}>
                                <input
                                    id={"publish-checkbox"}
                                    type={"checkbox"}
                                    className={"checkbox form-check-input"}
                                    checked={published}
                                    onChange={(event: ChangeEvent<HTMLInputElement>): void => { setPublished(event.target.checked); markDirty(); }}
                                />
                                <label htmlFor={"publish-checkbox"}>{t("editor.editor.checkbox")}</label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Editor;
