import React, {JSX} from "react";

import SmokingLogo150 from "@/public/images/projects/smoking-tracker/smoking-tracker-photo-size-150x150.webp";

import Image from "next/image";
import {getLatestVersion} from "@/utils/Utils";
import {Screenshot, screenshotsST} from "@/utils/Assets";
import {Metadata} from "next";
import {TranslationFunction} from "@/app/[locale]/layout";
import {getTranslations} from "next-intl/server";
import {SmokingTrackerButtons} from "@/app/[locale]/components/ContactButtons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChartLine, faCloudArrowUp, faDatabase, faGlobe, faMobileScreen} from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
    title: "Smoking Tracker - Gašper Pintar",
    description: "Smoking Tracker is an easy-to-use smoking tracking app that helps you understand your habits and progress towards quitting. Every cigarette you smoke is clearly recorded, giving you detailed insight into your daily, weekly and monthly patterns",
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
        title: "Gašper Pintar",
        description: "Smoking Tracker is an easy-to-use smoking tracking app that helps you understand your habits and progress towards quitting. Every cigarette you smoke is clearly recorded, giving you detailed insight into your daily, weekly and monthly patterns",
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
        description: "Smoking Tracker is an easy-to-use smoking tracking app that helps you understand your habits and progress towards quitting. Every cigarette you smoke is clearly recorded, giving you detailed insight into your daily, weekly and monthly patterns",
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

    const appVersion: string = await getLatestVersion("smoking-tracker");

    const t: TranslationFunction = await getTranslations("pages") as TranslationFunction;
    const t1: TranslationFunction = await getTranslations("projects") as TranslationFunction;
    const t2: TranslationFunction = await getTranslations("images") as TranslationFunction;

    return (
        <>
            <div className={"project-page-container mt-5"}>
                <div className={"container"}>
                    <div className={"row align-items-center justify-content-center text-center text-md-start mb-4"}>
                        <div className={"col-md-4 text-center mb-3 mb-md-0"}>
                            <Image
                                src={SmokingLogo150}
                                alt={"Smoking Tracker logo"}
                                width={250}
                                height={250}
                                loading={"eager"}
                                className={"img-fluid rounded-circle shadow-sm"}
                            />
                        </div>
                        <div className={"col-md-8"}>
                            <h1 className={"display-5 fw-bold"}>{t("smoking-tracker.title")}</h1>
                            <p className={"mb-0"}>
                                {t1("version")}: {appVersion}
                                <span className={"d-block text-muted"}>{t1("available")} Android 8+</span>
                            </p>
                            <SmokingTrackerButtons />
                        </div>
                    </div>

                    <div className={"row mb-4 text-justify"}>
                        <div className={"col"}>
                            <h3 className={"h4 fw-bold mb-3"}>{t("projects.text1.title")} {t("smoking-tracker.title")}?</h3>

                            <p className={"lead mb-3"}>
                                <strong>{t("smoking-tracker.title")}</strong> {t("smoking-tracker.description")}
                            </p>

                            <p className={"mb-3"}>
                                {t("smoking-tracker.text1.description2")}
                            </p>

                            <p className={"mb-3"}>
                                {t("smoking-tracker.text1.description3")}
                            </p>

                            <p className={"mb-3"}>
                                {t("smoking-tracker.text1.description4")}
                            </p>

                            <div className={"text-center"}>
                                <u className={"mb-3 fw-bold"}>
                                    {t("smoking-tracker.text2.description")}
                                </u>
                            </div>
                        </div>
                    </div>

                    <div className={"row my-5 text-start"}>
                        <div className={"col"}>
                            <h3 className={"h4 fw-bold mb-3"}>{t("smoking-tracker.title")}: {t("projects.description1")}</h3>
                            <ul className={"list-group list-group-flush"}>
                                <li className={"list-group-item"}><FontAwesomeIcon icon={faDatabase} className="me-2" /> {t("smoking-tracker.text3.benefits1")}</li>
                                <li className={"list-group-item"}><FontAwesomeIcon icon={faChartLine} className="me-2" /> {t("smoking-tracker.text3.benefits2")}</li>
                                <li className={"list-group-item"}><FontAwesomeIcon icon={faCloudArrowUp} className="me-2" /> {t("smoking-tracker.text3.benefits3")}</li>
                                <li className={"list-group-item"}><FontAwesomeIcon icon={faGlobe} className="me-2" /> {t("smoking-tracker.text3.benefits4")}</li>
                                <li className={"list-group-item"}><FontAwesomeIcon icon={faMobileScreen} className="me-2" /> {t("projects.benefits1")}</li>
                            </ul>
                        </div>
                    </div>

                    <div className={"screenshoots row"}>
                        <div className={"col text-center"}>
                            <h3 className={"h5 fw-bold mb-1"}>{t1("preview")}</h3>
                            <div className={"d-flex flex-column flex-md-row justify-content-center flex-wrap gap-4 mt-1"}>
                                {screenshotsST.map((shot: Screenshot, index: number): JSX.Element => (
                                    <div key={index} className={"text-center"}>
                                        <Image
                                            src={shot.src}
                                            alt={t2(shot.alt)}
                                            width={1080}
                                            height={720}
                                            loading={"eager"}
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

export default SmokingTracker;
