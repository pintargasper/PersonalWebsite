"use client";

import React, {ChangeEvent, JSX, useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import {getArticleSingle, NewsArticleSingleView, Translation} from "@/api/newsApi";
import {addImageAlignmentClasses} from "@/app/[locale]/panel/news/editor/RichTextEditor";
import {TranslationFunction} from "@/app/[locale]/layout";
import {useTranslations} from "next-intl";

const PreviewPage: React.FC = (): JSX.Element => {

    const uuid: string | null = useSearchParams().get("url");
    const [article, setArticle] = useState<NewsArticleSingleView | null>(null);
    const [, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedLanguage, setSelectedLanguage] = useState<string>("en");

    const t: TranslationFunction = useTranslations("panel") as TranslationFunction;

    useEffect((): void => {
        if (!uuid) {
            setTimeout((): void => {
                setLoading(false);
                setError("The news URL is missing");
            }, 0);
            return;
        }
        setTimeout((): void => setLoading(true), 0);
        getArticleSingle(uuid).then((data: NewsArticleSingleView): void => {
                setArticle(data);
                setError(null);
                const language: string[] = Object.keys(data.translations);
                setSelectedLanguage(language.includes("en") ? "en" : language[0]);
            }).catch((error: unknown): void => {
                setError(error instanceof Error ? error.message : t("editor.preview.errors.retrieve-article"));
                setArticle(null);
            })
            .finally((): void => setLoading(false));
    }, [t, uuid]);

    const availableLanguages: string[] = article ? Object.keys(article.translations) : [];
    const translation: Translation | null = article && (article.translations[selectedLanguage] || article.translations[availableLanguages[0]]);

    return (
        <div className={"container-fluid mt-5"}>
            <div className={"row justify-content-center"}>
                <div className={"col-md-8"}>
                    <div className={"p-4 bg-white"}>
                        <h2 className={"mb-4 text-center"}>{t("editor.preview.title")}</h2>
                        {availableLanguages.length > 1 && (
                            <div className={"mb-3 text-center"}>
                                <label htmlFor={"lang-select"} className={"form-label me-2"}>{t("editor.preview.language")}:</label>
                                <select
                                    id={"lang-select"}
                                    className={"select d-inline-block w-auto"}
                                    value={selectedLanguage}
                                    onChange={(event: ChangeEvent<HTMLSelectElement>): void => setSelectedLanguage(event.target.value)}
                                >
                                    {availableLanguages.map((language: string): JSX.Element => (
                                        <option key={language} value={language}>{language}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                        {error && <div className={"text-danger"}>{error}</div>}
                        {translation && (
                            <>
                                <h3>{translation.headline}</h3>
                                <p className={"mb-3"}>{translation.description}</p>
                                <div className={"ProseMirror"} dangerouslySetInnerHTML={{ __html: addImageAlignmentClasses(translation.content) }} />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewPage;
