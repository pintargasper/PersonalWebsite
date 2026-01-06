import React, {JSX} from "react";
import {getNewsSingle, NewsView, Translation} from "@/api/newsApi";
import {type Metadata} from "next";
import {fetchImage} from "@/api/filesApi";
import {TranslationFunction} from "@/app/[locale]/layout";
import {getTranslations} from "next-intl/server";

interface NewsDetailPageProps {
    params: {
        id: string;
        locale: string;
    };
}

export const generateMetadata: ({ params }: { params: { id: string; locale: string }}) => Promise<Metadata> = async ({ params }: { params: { id: string; locale: string } }): Promise<Metadata> => {

    const { id, locale } = await params;
    let newsItem: NewsView | null;

    try {
        newsItem = await getNewsSingle(id, locale);
    } catch {
        newsItem = null;
    }
    if (!newsItem) {
        return {
            title: "News not found",
            icons: {
                icon: [
                    { url: "/logo/logo192.webp", sizes: "32x32", type: "image/x-icon" }
                ],
                apple: "/logo/logo192.webp",
                shortcut: "/logo/logo192.webp"
            },
        };
    }

    const translations: Record<string, Translation> = newsItem.translations as unknown as Record<string, Translation>;
    const translation: Translation = translations[locale] ?? Object.values(translations)[0];

    const absoluteImageUrl: string = newsItem.image ? fetchImage(newsItem.image) : "/logo/logo192.webp";
    const ogImage = {
        url: absoluteImageUrl,
        width: 1200,
        height: 630,
        alt: translation.headline
    };

    return {
        title: newsItem.seoTitle || translation.headline,
        description: newsItem.seoDescription || translation.headline,
        icons: {
            icon: [
                { url: absoluteImageUrl, sizes: "32x32", type: "image/x-icon" }
            ],
            apple: absoluteImageUrl,
            shortcut: absoluteImageUrl
        },
        openGraph: {
            title: newsItem.seoTitle || translation.headline,
            description: newsItem.seoDescription || translation.headline,
            url: `https://gasperpintar.com/news/${id}`,
            siteName: "News - Gašper Pintar",
            type: "article",
            locale: locale,
            images: [ogImage]
        },
        twitter: {
            card: "summary_large_image",
            title: newsItem.seoTitle || translation.headline,
            description: newsItem.seoDescription || translation.headline,
            images: [ogImage.url]
        }
    };
};

const NewsDetailPage: ({ params }: NewsDetailPageProps) => Promise<JSX.Element> = async ({ params }: NewsDetailPageProps): Promise<JSX.Element> => {

    const {id, locale} = await params;

    const t: TranslationFunction = await getTranslations("news") as TranslationFunction;

    let newsItem: NewsView | null;
    try {
        newsItem = await getNewsSingle(id, locale);
    } catch {
        newsItem = null;
    }

    if (!newsItem) {
        return (
            <div className={"news-empty-state"}>
                <div className={"news-empty-card"}>
                    <svg xmlns={"http://www.w3.org/2000/svg"} width={"48"} height={"48"} fill={"none"} viewBox={"0 0 24 24"} className={"news-empty-icon"}>
                        <circle cx={"12"} cy={"12"} r={"10"} stroke={"#adb5bd"} strokeWidth={"2"} fill={"#f8f9fa"}/>
                        <path d={"M9.5 9.5a2.5 2.5 0 1 1 5 0c0 1.5-2.5 2-2.5 4"} stroke={"#adb5bd"} strokeWidth={"1.5"} strokeLinecap={"round"} strokeLinejoin={"round"}/>
                        <circle cx={"12"} cy={"17"} r={"1"} fill={"#adb5bd"}/>
                    </svg>
                    <h2 className={"news-empty-title"}>{t("not-found.title")}</h2>
                    <p className={"news-empty-desc"}>{t("not-found.message")}</p>
                </div>
            </div>
        );
    }

    const translations: Record<string, Translation> = newsItem.translations as unknown as Record<string, Translation>;
    const translation: Translation = translations[locale] ?? Object.values(translations)[0];

    return (
        <div className={"container mt-5 mb-5"}>
            <div className={"row justify-content-center"}>
                <div className={"col-md-8 col-lg-7"}>
                    <div className={"card shadow-sm p-4"}>
                        <h1 className={"mb-3 fw-bold fs-2"}>{translation.headline}</h1>
                        <div className={"d-flex align-items-center mb-2"}>
                            <small className={"text-muted me-3"}>{t("posted")}: {newsItem.publishedAt}</small>
                        </div>
                        {translation.content && (
                            <div
                                className={"mt-4 fs-6 lh-base text-start"}
                                dangerouslySetInnerHTML={{ __html: translation.content }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsDetailPage;
