import React, {JSX} from "react";

import ItemWeightScannerLogo from "@/public/images/projects/item-weight-scanner/item-weight-scanner-photo-size-320x320.webp";

import Image from "next/image";
import {getLatestVersion} from "@/utils/Utils";
import {screenshotsIWS} from "@/utils/Assets";
import {Metadata} from "next";
import {TranslationFunction} from "@/app/[locale]/layout";
import {getTranslations} from "next-intl/server";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDatabase, faGlobe, faMobileScreen} from "@fortawesome/free-solid-svg-icons";
import PreviewImage from "@/app/[locale]/components/PreviewImage";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Item Weight Scanner - Gašper Pintar",
    description: "Item Weight Scanner is a barcode scanning application that uses a product's barcode to obtain information about its weight and adds up the total weight of all scanned items",
    applicationName: "Item Weight Scanner - Gašper Pintar",

    keywords: ["Gasper Pintar", "Scanner", "Item Weight Scanner", "Application"],

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
            { url: "/logo/favicon-iws.ico", sizes: "32x32", type: "image/x-icon" }
        ],
        apple: "/logo/logo192-iws.webp",
        shortcut: "/logo/favicon-iws.ico"
    },

    openGraph: {
        title: "Item Weight Scanner - Gašper Pintar",
        description: "Item Weight Scanner is a barcode scanning application that uses a product's barcode to obtain information about its weight and adds up the total weight of all scanned items",
        url: "https://gasperpintar.com/item-weight-scanner",
        siteName: "Item Weight Scanner - Gašper Pintar",
        type: "website",
        locale: "en",
        images: [
            {
                url: "https://gasperpintar.com/logo/logo192-iws.webp",
                width: 1200,
                height: 630,
                alt: "Item Weight Scanner - Open Graph Image"
            }
        ]
    },

    twitter: {
        card: "summary_large_image",
        title: "Item Weight Scanner - Gašper Pintar",
        description: "Item Weight Scanner is a barcode scanning application that uses a product's barcode to obtain information about its weight and adds up the total weight of all scanned items",
        images: ["https://gasperpintar.com/logo/logo192-iws.webp"]
    },

    alternates: {
        canonical: "https://gasperpintar.com/item-weight-scanner",
        languages: {
            "en": "https://gasperpintar.com/item-weight-scanner",
            "sl": "https://gasperpintar.com/item-weight-scanner"
        }
    },

    category: "technology",
    referrer: "origin-when-cross-origin",

    metadataBase: new URL("https://gasperpintar.com/item-weight-scanner"),
    appLinks: {
        web: {
            url: "https://gasperpintar.com/item-weight-scanner",
            should_fallback: true,
        }
    }
};

const SmokingTracker: () => void = async (): Promise<JSX.Element> => {

    const appVersion: string = await getLatestVersion("item-weight-scanner");

    const t: TranslationFunction = await getTranslations("item-weight-scanner") as TranslationFunction;
    const t1: TranslationFunction = await getTranslations("translation") as TranslationFunction;

    return (
        <>
            <div className={"project-page-container mt-5"}>
                <div className={"container"}>
                    <div className={"row align-items-center justify-content-center text-center text-md-start mb-4"}>
                        <div className={"col-md-4 text-center mb-3 mb-md-0"}>
                            <Image
                                src={ItemWeightScannerLogo}
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
                            <div className={"mt-3"}>
                                <div className={"border-0"}>
                                    <p className={"mb-0"}>
                                        {t1("item-weight-scanner")}
                                    </p>
                                    <Link
                                        href={"https://translate.gasperpintar.com/projects/itemweightscanner"}
                                        target={"_blank"}
                                    >
                                        <Image
                                            src={"https://translate.gasperpintar.com/widget/itemweightscanner/287x66-grey.png"}
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
                                <li className={"list-group-item"}><FontAwesomeIcon icon={faDatabase} className={"me-2"} /> {t("features.text-1")}</li>
                                <li className={"list-group-item"}><FontAwesomeIcon icon={faGlobe} className={"me-2"} /> {t("features.text-2")}</li>
                                <li className={"list-group-item"}><FontAwesomeIcon icon={faMobileScreen} className={"me-2"} /> {t("features.text-3")}</li>
                            </ul>
                        </div>
                    </div>

                    <div className={"screenshoots row"}>
                        <div className={"col text-center"}>
                            <h3 className={"h5 fw-bold mb-1"}>{t("preview")}</h3>
                            <div className={"d-flex flex-column flex-md-row justify-content-center flex-wrap gap-4 mt-1"}>
                                <PreviewImage screenshots={screenshotsIWS} type={"item-weight-scanner"} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default SmokingTracker;
