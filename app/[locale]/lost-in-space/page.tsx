import Link from "next/link";
import React, { type JSX } from "react";
import {Card, cards} from "@/utils/Assets";
import Image from "next/image";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Lost in space - Gašper Pintar",
    description: "The page you are looking for does not exist. Explore Gašper Pintar's projects, portfolio, and contact information",
    applicationName: "Personal Website - Gašper Pintar",

    keywords: ["Gasper Pintar", "Applications", "404 Page", "Not Found"],

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
        title: "Lost in space - Gašper Pintar",
        description: "The page you are looking for does not exist. Explore Gašper Pintar's projects, portfolio, and contact information",
        url: "https://gasperpintar.com/lost-in-space",
        siteName: "Gasper Pintar",
        type: "website",
        locale: "en",
        images: [
            {
                url: "https://gasperpintar.com/logo/logo192.webp",
                width: 1200,
                height: 630,
                alt: "Gasper Pintar - Open Graph Image"
            }
        ]
    },

    twitter: {
        card: "summary_large_image",
        title: "Lost in space - Gašper Pintar",
        description: "The page you are looking for does not exist. Explore Gašper Pintar's projects, portfolio, and contact information",
        images: ["https://gasperpintar.com/logo/logo192.webp"]
    },

    alternates: {
        canonical: "https://gasperpintar.com/lost-in-space",
        languages: {
            "en": "https://gasperpintar.com/lost-in-space",
            "sl-SI": "https://gasperpintar.com/lost-in-space"
        }
    },

    category: "technology",
    referrer: "origin-when-cross-origin",

    metadataBase: new URL("https://gasperpintar.com"),
    appLinks: {
        web: {
            url: "https://gasperpintar.com/lost-in-space",
            should_fallback: true,
        }
    }
};

const NotFoundPage: React.FC = (): JSX.Element => {
    return (
        <>
            <div className={"notfound-container"}>
                <h1 className={"notfound-title"}>Lost in space</h1>
                <p className={"notfound-text"}>Looks like you drifted off course</p>

                <div className={"cards-wrapper"}>
                    {cards.map((card: Card, index: number): JSX.Element => (
                        <Link key={index} href={card.link} className={"floating-card d-flex align-items-center gap-2"}>
                            {card.image && (
                                <Image
                                    src={card.image}
                                    alt={card.alt + " logo"}
                                    width={40}
                                    height={40}
                                    className={"img-fluid"}
                                    loading={"eager"}
                                />
                            )}
                            <span>{card.title}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default NotFoundPage;
