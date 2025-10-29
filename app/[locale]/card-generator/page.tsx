import React, {JSX} from "react";

import CardLogo150 from "@/public/images/projects/card-generator/logo_150x150.webp";

import Image from "next/image";
import {getLatestVersion} from "@/utils/Utils";
import {Screenshot, screenshotsCG} from "@/utils/Assets";
import GetGitHub from "@/public/images/projects/images/github.webp";
import Link from "next/link";
import {Metadata, Viewport} from "next";
import {TranslationFunction} from "@/app/[locale]/layout";
import {getTranslations} from "next-intl/server";

export const metadata: Metadata = {
    title: "Card Generator - Gašper Pintar",
    description: "Card Generator allows the creation of any card and also its generation in png format. It also allows downloading images in pdf mode",
    applicationName: "Card Generator - Gašper Pintar",

    keywords: ["Gasper Pintar", "Cards", "Card Generator", "Application"],

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
            { url: "/logo/favicon-cg.ico", sizes: "32x32", type: "image/x-icon" }
        ],
        apple: "/logo/logo192-cg.webp",
        shortcut: "/logo/favicon-cg.ico"
    },

    openGraph: {
        title: "Gašper Pintar",
        description: "Card Generator allows the creation of any card and also its generation in png format. It also allows downloading images in pdf mode",
        url: "https://gasperpintar.com/card-generator",
        siteName: "Card Generator - Gašper Pintar",
        type: "website",
        locale: "en",
        images: [
            {
                url: "https://gasperpintar.com/logo/logo192-cg.webp",
                width: 1200,
                height: 630,
                alt: "Card Generator - Open Graph Image"
            }
        ]
    },

    twitter: {
        card: "summary_large_image",
        title: "Card Generator - Gašper Pintar",
        description: "Card Generator allows the creation of any card and also its generation in png format. It also allows downloading images in pdf mode",
        images: ["https://gasperpintar.com/logo/logo192-cg.webp"]
    },

    alternates: {
        canonical: "https://gasperpintar.com/card-generator",
        languages: {
            "en": "https://gasperpintar.com/card-generator",
            "sl-SI": "https://gasperpintar.com/card-generator"
        }
    },

    category: "technology",
    referrer: "origin-when-cross-origin",

    metadataBase: new URL("https://gasperpintar.com/card-generator"),
    appLinks: {
        web: {
            url: "https://gasperpintar.com/card-generator",
            should_fallback: true,
        }
    }
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1.0,
    maximumScale: 1.0,
    userScalable: false
};

const CardGenerator: () => Promise<JSX.Element> = async (): Promise<JSX.Element> => {

    const appVersion: string = await getLatestVersion("card-generator");

    const t: TranslationFunction = await getTranslations("pages") as TranslationFunction;
    const t1: TranslationFunction = await getTranslations("projects") as TranslationFunction;
    const t2: TranslationFunction = await getTranslations("images") as TranslationFunction;

    return (
        <>
            <div className={"project-page-container py-4"}>
                <div className={"container"}>
                    <div className={"row align-items-center mb-4"}>
                        <div className={"col-md-4 text-center mb-3 mb-md-0"}>
                            <Image
                                src={CardLogo150}
                                alt={"Smoking Tracker logo"}
                                width={250}
                                height={250}
                                loading={"eager"}
                                className={"img-fluid rounded-circle shadow-sm"}
                            />
                        </div>
                        <div className={"col-md-8"}>
                            <h1 className={"display-5 fw-bold"}>{t("card-generator.title")}</h1>
                            <p className={"lead"}>{t("card-generator.description")}</p>
                            <p className={"mb-0"}>{t1("version")} : {appVersion}</p>
                        </div>
                    </div>

                    <div className={"row text-center mb-5"}>
                        <h2 className={"h5 fw-bold mb-3"}>{t1("download")}</h2>
                        <div className={"d-flex justify-content-center flex-wrap gap-3"}>
                            <Link
                                key={"github"}
                                href={"https://github.com/pintargasper/CardGenerator/releases/latest"}
                                target={"_blank"}
                                className={"button"}
                            >
                                <Image
                                    src={GetGitHub}
                                    alt={"GitHub logo"}
                                    width={25}
                                    height={25}
                                    loading={"eager"}
                                    className={"img-assets"}
                                />
                                <span>GitHub</span>
                            </Link>
                        </div>
                    </div>

                    <div className={"row mb-3"}>
                        <div className={"col text-center"}>
                            <h3 className={"h5 fw-bold mb-3"}>{t1("supported-languages")}</h3>
                            <ul className={"list-unstyled d-inline-block text-start"}>
                                <li>English</li>
                            </ul>
                        </div>
                    </div>

                    <div className={"row"}>
                        <div className={"col text-center"}>
                            <h3 className={"h5 fw-bold mb-1"}>{t1("preview")}</h3>
                            <div className={"d-flex flex-column flex-md-row justify-content-center flex-wrap gap-4 mt-1"}>
                                {screenshotsCG.map((shot: Screenshot, index: number): JSX.Element => (
                                    <div key={index} className={`${!shot.isHorizontal ? "screenshoots " : ""} text-center`}>
                                        <Image
                                            src={shot.src}
                                            alt={t2(shot.alt)}
                                            width={1900}
                                            height={1080}
                                            className={"img-fluid shadow-sm rounded mt-0"}
                                        />
                                        <p className={"mt-1"}>{t2(shot.alt)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CardGenerator;
