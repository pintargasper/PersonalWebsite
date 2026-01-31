import React, {JSX} from "react";

import SmokingLogo150 from "@/public/images/projects/smoking-tracker/smoking-tracker-photo-size-150x150.webp";

import Image from "next/image";
import {getVersions, VersionEntryObject} from "@/utils/Utils";
import {screenshotsST} from "@/utils/Assets";
import {Metadata} from "next";
import {TranslationFunction} from "@/app/[locale]/layout";
import {getTranslations} from "next-intl/server";
import {SmokingTrackerButtons} from "@/app/[locale]/components/ContactButtons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChartLine, faCloudArrowUp, faChartSimple, faDatabase, faGlobe, faMobileScreen} from "@fortawesome/free-solid-svg-icons";
import PreviewImage from "@/app/[locale]/components/PreviewImage";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Smoking Tracker - Gašper Pintar",
    description: "Smoking Tracker is an easy to use smoking tracking app that helps you understand your habits and progress towards quitting. Every cigarette you smoke is clearly recorded, giving you detailed insight into your daily, weekly and monthly patterns",
    applicationName: "Smoking Tracker - Gašper Pintar",

    keywords: ["Gasper Pintar", "Tracker", "Smoking Tracker", "Application"],

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
            { url: "/logo/favicon-st.ico", sizes: "32x32", type: "image/x-icon" }
        ],
        apple: "/logo/logo192-st.webp",
        shortcut: "/logo/favicon-st.ico"
    },

    openGraph: {
        title: "Smoking Tracker - Gašper Pintar",
        description: "Smoking Tracker is an easy to use smoking tracking app that helps you understand your habits and progress towards quitting. Every cigarette you smoke is clearly recorded, giving you detailed insight into your daily, weekly and monthly patterns",
        url: "https://gasperpintar.com/smoking-tracker",
        siteName: "Smoking Tracker - Gašper Pintar",
        type: "website",
        locale: "en",
        images: [
            {
                url: "https://gasperpintar.com/logo/logo192-st.webp",
                width: 1200,
                height: 630,
                alt: "Smoking Tracker - Open Graph Image"
            }
        ]
    },

    twitter: {
        card: "summary_large_image",
        title: "Smoking Tracker - Gašper Pintar",
        description: "Smoking Tracker is an easy to use smoking tracking app that helps you understand your habits and progress towards quitting. Every cigarette you smoke is clearly recorded, giving you detailed insight into your daily, weekly and monthly patterns",
        images: ["https://gasperpintar.com/logo/logo192-st.webp"]
    },

    alternates: {
        canonical: "https://gasperpintar.com/smoking-tracker",
        languages: {
            "en": "https://gasperpintar.com/smoking-tracker",
            "sl": "https://gasperpintar.com/smoking-tracker"
        }
    },

    category: "technology",
    referrer: "origin-when-cross-origin",

    metadataBase: new URL("https://gasperpintar.com/smoking-tracker"),
    appLinks: {
        web: {
            url: "https://gasperpintar.com/smoking-tracker",
            should_fallback: true,
        }
    }
};

const SmokingTracker: () => void = async (): Promise<JSX.Element> => {

    const appVersion: string | VersionEntryObject | "N/A" = await getVersions("smoking-tracker");

    const t: TranslationFunction = await getTranslations("smoking-tracker") as TranslationFunction;
    const t1: TranslationFunction = await getTranslations("translation") as TranslationFunction;

    return (
        <>
            <div className={"project-page-container mt-5"}>
                <div className={"container"}>
                    <div className={"row align-items-center justify-content-center text-center text-md-start mb-4"}>
                        <div className={"col-md-4 text-center mb-3 mb-md-0"}>
                            <Image
                                src={SmokingLogo150}
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
                                {t("version")}: {appVersion as string}
                                <span className={"d-block text-muted"}>{t("available-on")}</span>
                            </p>
                            <SmokingTrackerButtons />

                            <div className={"mt-3"}>
                                <div className={"border-0"}>
                                    <p className={"mb-0"}>
                                        {t1("smoking-tracker")}
                                    </p>
                                    <Link
                                        href={"https://translate.gasperpintar.com/projects/smokingtracker"}
                                        target={"_blank"}
                                    >
                                        <Image
                                            src={"https://translate.gasperpintar.com/widget/smokingtracker/287x66-grey.png"}
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

                            <p className={"mb-3"}>
                                {t("description-text-3")}
                            </p>

                            <p className={"mb-3"}>
                                {t("description-text-4")}
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
                                <li className={"list-group-item"}><FontAwesomeIcon icon={faChartLine} className={"me-2"} /> {t("features.text-2")}</li>
                                <li className={"list-group-item"}><FontAwesomeIcon icon={faChartSimple} className={"me-2"} /> {t("features.text-3")}</li>
                                <li className={"list-group-item"}><FontAwesomeIcon icon={faCloudArrowUp} className={"me-2"} /> {t("features.text-4")}</li>
                                <li className={"list-group-item"}><FontAwesomeIcon icon={faGlobe} className={"me-2"} /> {t("features.text-5")}</li>
                                <li className={"list-group-item"}><FontAwesomeIcon icon={faMobileScreen} className={"me-2"} /> {t("features.text-6")}</li>
                            </ul>
                        </div>
                    </div>

                    <div className={"screenshoots row"}>
                        <div className={"col text-center"}>
                            <h3 className={"h5 fw-bold mb-1"}>{t("preview")}</h3>
                            <div className={"d-flex flex-column flex-md-row justify-content-center flex-wrap gap-4 mt-1"}>
                                <PreviewImage screenshots={screenshotsST} type={"smoking-tracker"} />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default SmokingTracker;
