import React, {JSX} from "react";

import SmokingLogo150 from "@/public/images/projects/smoking-tracker/logo_150x150.webp";
import GetEnglish from "@/public/images/projects/images/play-store/english.webp";
import GetGitHub from "@/public/images/projects/images/github.webp";

import Image from "next/image";
import {getLatestVersion} from "@/utils/Utils";
import {Screenshot, screenshotsST} from "@/utils/Assets";
import Link from "next/link";
import {Metadata} from "next";
import {TranslationFunction} from "@/app/[locale]/layout";
import {useTranslations} from "next-intl";
import {getTranslations} from "next-intl/server";

export const metadata: Metadata = {
    title: "Smoking Tracker - Gašper Pintar",
    description: "Smoking Tracker is a program that allows the user to easily track the number of cigarettes smoked and display the data on weekly, monthly, and yearly graphs",
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
        description: "Smoking Tracker is a program that allows the user to easily track the number of cigarettes smoked and display the data on weekly, monthly, and yearly graphs",
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
        description: "Smoking Tracker is a program that allows the user to easily track the number of cigarettes smoked and display the data on weekly, monthly, and yearly graphs",
        images: ["https://gasperpintar.com/logo/logo192-st.webp"]
    },

    alternates: {
        canonical: "https://gasperpintar.com/smoking-tracker",
        languages: {
            "en": "https://gasperpintar.com/smoking-tracker",
            "sl-SI": "https://gasperpintar.com/smoking-tracker"
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

const SmokingTracker: () => Promise<JSX.Element> = async (): Promise<JSX.Element> => {

    const appVersion: string = await getLatestVersion("smoking-tracker");

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
                            <p className={"lead"}>{t("smoking-tracker.description")}</p>
                            <p className={"mb-0"}>{t1("version")} : {appVersion}</p>
                        </div>
                    </div>

                    <div className={"row text-center mb-5"}>
                        <h2 className={"h5 fw-bold mb-3"}>{t1("download")}</h2>
                        <div className={"d-flex justify-content-center flex-wrap gap-3"}>
                            <Link
                                key={"github"}
                                href={"https://github.com/pintargasper/SmokingTracker/releases/latest"}
                                target={"_blank"}
                                className={"button"}
                            >
                                <Image
                                    src={GetGitHub}
                                    alt={"GitHub logo"}
                                    width={25}
                                    height={25}
                                    className={"img-assets"}
                                />
                                <span>GitHub</span>
                            </Link>
                            <Link
                                key={"google play store"}
                                href={"https://play.google.com/store/apps/details?id=com.gasperpintar.smokingtracker"}
                                target={"_blank"}
                                rel="noopener noreferrer"
                            >
                                <Image
                                    src={GetEnglish}
                                    alt={"Get it on Google Play"}
                                    width={270}
                                    height={80}
                                    className={"img-play"}
                                />
                            </Link>
                        </div>
                    </div>

                    <div className={"row mb-3"}>
                        <div className={"col text-center"}>
                            <h3 className={"h5 fw-bold mb-3"}>{t1("supported-languages")}</h3>
                            <ul className={"list-unstyled d-inline-block text-start"}>
                                <li>English</li>
                                <li>Slovenščina</li>
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
