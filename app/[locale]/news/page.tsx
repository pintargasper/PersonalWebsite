import React, {JSX} from "react";
import {Metadata} from "next";
import {Col, Row} from "react-bootstrap";
import {NewsCard, NewsItem} from "@/app/[locale]/components/NewsCard";

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

export const newsData: NewsItem[] = [
    {
        id: 1,
        title: "Predstavitev nove funkcionalnosti",
        description: "Objavljena je bila nova funkcionalnost, ki izboljšuje uporabniško izkušnjo in povečuje učinkovitost spletne platforme.",
        image: "/images/news1.webp",
        published: true,
        publishedAt: "2025-01-14",
        url: "news/predstavitev-nove-funkcionalnosti"
    },
    {
        id: 2,
        title: "Posodobljena poslovna strategija",
        description: "Predstavljen je načrt za leto 2025, ki vključuje pomembne razvojne usmeritve in optimizacijo procesov.",
        image: "/images/news2.webp",
        published: true,
        publishedAt: "2025-01-10",
        url: "news/posodobljena-poslovna-strategija"
    },
    {
        id: 3,
        title: "Posodobljena poslovna strategija",
        description: "Predstavljen je načrt za leto 2025, ki vključuje pomembne razvojne usmeritve in optimizacijo procesov.",
        image: "/images/news2.webp",
        published: false,
        publishedAt: "2025-01-10",
        url: "news/posodobljena-poslovna-strategija"
    },
    {
        id: 4,
        title: "Posodobljena poslovna strategija",
        description: "Predstavljen je načrt za leto 2025, ki vključuje pomembne razvojne usmeritve in optimizacijo procesov.",
        image: "/images/news2.webp",
        published: false,
        publishedAt: "2025-01-10",
        url: "news/posodobljena-poslovna-strategija"
    },
    {
        id: 5,
        title: "Posodobljena poslovna strategija 3",
        description: "Predstavljen je načrt za leto 2025, ki vključuje pomembne razvojne usmeritve in optimizacijo procesov.",
        image: "https://gasperpintar.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fprofile-photo.2a780b90.webp&w=256&q=75",
        published: true,
        publishedAt: "2025-01-10",
        url: "news/posodobljena-poslovna-strategija-3"
    },
    {
        id: 6,
        title: "Posodobljena poslovna strategija",
        description: "Predstavljen je načrt za leto 2025, ki vključuje pomembne razvojne usmeritve in optimizacijo procesov.",
        image: "/images/news2.webp",
        published: false,
        publishedAt: "2025-01-10",
        url: "news/posodobljena-poslovna-strategija"
    },
    {
        id: 7,
        title: "Posodobljena poslovna strategija",
        description: "Predstavljen je načrt za leto 2025, ki vključuje pomembne razvojne usmeritve in optimizacijo procesov.",
        image: "/images/news2.webp",
        published: true,
        publishedAt: "2025-01-10",
        url: "news/posodobljena-poslovna-strategija"
    }
];

const News: () => void = async (): Promise<JSX.Element> => {

    //const t: TranslationFunction = await getTranslations("news") as TranslationFunction;

    return (
        <>
            <div className={"news-page-container mt-5"}>
                <div className={"container"}>
                    <Row>
                        {newsData.map((singleNewsItem: NewsItem): JSX.Element => (
                            <Col key={singleNewsItem.id} md={6} lg={4}>
                                <NewsCard newsItem={singleNewsItem} />
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>
        </>
    );
};

export default News;
