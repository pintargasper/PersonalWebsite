import React, {JSX} from "react";

import CardLogo150 from "@/public/images/projects/card-generator/card-generator-photo-size-150x150.webp";

import Image from "next/image";
import {getLatestVersion} from "@/utils/Utils";
import {screenshotsCG} from "@/utils/Assets";
import {Metadata, Viewport} from "next";
import {TranslationFunction} from "@/app/[locale]/layout";
import {getTranslations} from "next-intl/server";
import {CardGeneratorButtons} from "@/app/[locale]/components/ContactButtons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFile, faFileCode,
    faFileExcel, faMobileScreen
} from "@fortawesome/free-solid-svg-icons";
import PreviewImage from "@/app/[locale]/components/PreviewImage";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Card Generator - Gašper Pintar",
    description: "Card Generator is a desktop application for creating and generating custom playing cards. Using Excel spreadsheets and customizable fxml templates, you can quickly create entire decks of playing cards without having to design each card individually",
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
        description: "Card Generator is a desktop application for creating and generating custom playing cards. Using Excel spreadsheets and customizable fxml templates, you can quickly create entire decks of playing cards without having to design each card individually",
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
        description: "Card Generator is a desktop application for creating and generating custom playing cards. Using Excel spreadsheets and customizable fxml templates, you can quickly create entire decks of playing cards without having to design each card individually",
        images: ["https://gasperpintar.com/logo/logo192-cg.webp"]
    },

    alternates: {
        canonical: "https://gasperpintar.com/card-generator",
        languages: {
            "en": "https://gasperpintar.com/card-generator",
            "sl": "https://gasperpintar.com/card-generator"
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

const CardGenerator: () => void = async (): Promise<JSX.Element> => {

    const appVersion: string = await getLatestVersion("card-generator");

    const t: TranslationFunction = await getTranslations("card-generator") as TranslationFunction;
    const t1: TranslationFunction = await getTranslations("translation") as TranslationFunction;

    return (
        <>
            <div className={"project-page-container mt-5"}>
                <div className={"container"}>
                    <div className={"row align-items-center justify-content-center text-center text-md-start mb-4"}>
                        <div className={"col-md-4 text-center mb-3 mb-md-0"}>
                            <Image
                                src={CardLogo150}
                                alt={t("logo-alt")}
                                width={250}
                                height={250}
                                loading={"eager"}
                                className={"img-fluid rounded-circle shadow-sm"}
                            />
                        </div>
                        <div className={"col-md-8"}>
                            <h1 className={"display-5 fw-bold"}>{t("title")}</h1>
                            <p className={"mb-0"}>
                                {t("version")}: {appVersion}
                                <span className={"d-block text-muted"}>{t("available-on")}</span>
                            </p>
                            <CardGeneratorButtons />

                            <div className={"mt-3"}>
                                <div className={"border-0"}>
                                    <p className={"mb-0"}>
                                        {t1("sentence", { app: t("title") })}
                                    </p>
                                    <Link
                                        href={"https://translate.gasperpintar.com/projects/cardgenerator"}
                                        target={"_blank"}
                                    >
                                        <Image
                                            src={"https://translate.gasperpintar.com/widget/cardgenerator/287x66-grey.png"}
                                            alt={t1("status")}
                                            width={287}
                                            height={66}
                                            className={"img-fluid rounded border"}
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={"row mb-4 text-justify"}>
                        <div className={"col"}>
                            <h3 className={"h4 fw-bold mb-3"}>{t("what-is")}</h3>

                            <p className={"lead mb-3"}>
                                {t("description")}
                            </p>

                            <p className={"mb-3"}>
                                {t("description-text-1")}
                            </p>

                            <p className={"mb-3"}>
                                {t("description-text-2")}
                            </p>

                            <div className={"text-center"}>
                                <u className={"mb-3 fw-bold"}>
                                    {t("description-text-hyper")}
                                </u>
                            </div>
                        </div>
                    </div>

                    <div className={"row my-5 text-start"}>
                        <div className={"col"}>
                            <h3 className={"h4 fw-bold mb-3"}>{t("features.title")}</h3>
                            <ul className={"list-group list-group-flush"}>
                                <li className={"list-group-item"}><FontAwesomeIcon icon={faFileExcel} className={"me-2"} /> {t("features.text-1")}</li>
                                <li className={"list-group-item"}><FontAwesomeIcon icon={faFileCode} className={"me-2"} /> {t("features.text-2")}</li>
                                <li className={"list-group-item"}><FontAwesomeIcon icon={faFile} className={"me-2"} /> {t("features.text-3")}</li>
                                <li className={"list-group-item"}><FontAwesomeIcon icon={faMobileScreen} className={"me-2"} /> {t("features.text-4")}</li>
                            </ul>
                        </div>
                    </div>

                    <div className={"row"}>
                        <div className={"col text-center"}>
                            <h3 className={"h5 fw-bold mb-1"}>{t("preview")}</h3>
                            <div className={"d-flex flex-column flex-md-row justify-content-center flex-wrap gap-4 mt-1"}>
                                <PreviewImage screenshots={screenshotsCG} type={"card-generator"}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CardGenerator;
