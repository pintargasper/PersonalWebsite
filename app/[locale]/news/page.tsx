import React, {JSX} from "react";
import {Metadata} from "next";
import {Col, Row} from "react-bootstrap";
import {NewsCard} from "@/app/[locale]/components/NewsCard";
import {getNews, type NewsView} from "@/api/newsApi";
import {getLocale, getTranslations} from "next-intl/server";
import {TranslationFunction} from "@/app/[locale]/layout";

export const metadata: Metadata = {
    title: "News - Gašper Pintar",
    description: "News is the central information hub of Gašper Pintar’s website, providing the latest updates, project announcements, development highlights, and important insights. The page offers a clear and timely overview of current activities, ensuring that visitors stay informed about ongoing progress and the creator’s vision",
    applicationName: "News - Gašper Pintar",

    keywords: ["Gasper Pintar", "News"],

    authors: [
        { name: "Gašper Pintar", url: "https://gasperpintar.com" }
    ],
    creator: "Gašper Pintar",
    publisher: "Gašper Pintar",

    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1
        }
    },

    icons: {
        icon: [
            { url: "/logo/favicon.ico", sizes: "32x32", type: "image/x-icon" }
        ],
        apple: "/logo/logo192.webp",
        shortcut: "/logo/favicon.ico"
    },

    openGraph: {
        title: "Gašper Pintar",
        description: "News is the central information hub of Gašper Pintar’s website, providing the latest updates, project announcements, development highlights, and important insights. The page offers a clear and timely overview of current activities, ensuring that visitors stay informed about ongoing progress and the creator’s vision",
        url: "https://gasperpintar.com/card-generator",
        siteName: "News - Gašper Pintar",
        type: "website",
        locale: "en",
        images: [
            {
                url: "https://gasperpintar.com/logo/logo192.webp",
                width: 1200,
                height: 630,
                alt: "News - Open Graph Image"
            }
        ]
    },

    twitter: {
        card: "summary_large_image",
        title: "News - Gašper Pintar",
        description: "News is the central information hub of Gašper Pintar’s website, providing the latest updates, project announcements, development highlights, and important insights. The page offers a clear and timely overview of current activities, ensuring that visitors stay informed about ongoing progress and the creator’s vision",
        images: ["https://gasperpintar.com/logo/logo192-cg.webp"]
    },

    alternates: {
        canonical: "https://gasperpintar.com/news",
        languages: {
            "en": "https://gasperpintar.com/news",
            "sl": "https://gasperpintar.com/news"
        }
    },

    category: "technology",
    referrer: "origin-when-cross-origin",

    metadataBase: new URL("https://gasperpintar.com/news"),
    appLinks: {
        web: {
            url: "https://gasperpintar.com/news",
            should_fallback: true,
        }
    }
};

const News: () => Promise<JSX.Element> = async (): Promise<JSX.Element> => {

    const locale: string = await getLocale();
    const newsViews: NewsView[] = await getNews(locale);

    const t: TranslationFunction = await getTranslations("news") as TranslationFunction;

    return (
        <>
            <div className={"news-page-container mt-5"}>
                <div className={"container"}>
                    {newsViews.length === 0 ? (
                        <div className={"news-empty-state"}>
                            <div className={"news-empty-card"}>
                                <svg xmlns={"http://www.w3.org/2000/svg"} width={"48"} height={"48"} fill={"none"} viewBox={"0 0 24 24"} className={"news-empty-icon"}>
                                    <circle cx={"12"} cy={"12"} r={"10"} stroke={"#adb5bd"} strokeWidth={"2"} fill={"#f8f9fa"}/>
                                    <path d={"M9.5 9.5a2.5 2.5 0 1 1 5 0c0 1.5-2.5 2-2.5 4"} stroke={"#adb5bd"} strokeWidth={"1.5"} strokeLinecap={"round"} strokeLinejoin={"round"}/>
                                    <circle cx={"12"} cy={"17"} r={"1"} fill={"#adb5bd"}/>
                                </svg>
                                <h2 className={"news-empty-title"}>{t("no-news.title")}</h2>
                                <p className={"news-empty-desc"}>{t("no-news.message")}</p>
                            </div>
                        </div>
                    ) : (
                        <Row>
                            {newsViews.map((singleNewsItem: NewsView): JSX.Element => (
                                <Col key={singleNewsItem.id} md={6} lg={4}>
                                    <NewsCard currentLocale={locale} {...singleNewsItem} />
                                </Col>
                            ))}
                        </Row>
                    )}
                </div>
            </div>
        </>
    );
};

export default News;
