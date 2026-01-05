import React, {JSX} from "react";

import {androidProjects, ProjectData} from "@/utils/Assets";
import {Metadata} from "next";
import {TranslationFunction} from "@/app/[locale]/layout";
import {getTranslations} from "next-intl/server";
import ProjectCard from "@/app/[locale]/components/ProjectCard";

export const metadata: Metadata = {
    title: "Android projects - Gašper Pintar",
    description: "A collection of Android apps focused on performance, usability and user experience",
    applicationName: "Android projects - Gašper Pintar",

    keywords: ["Gasper Pintar", "Android", "Smoking Tracker", "Item Weight Scanner"],

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
        description: "A collection of Android apps focused on performance, usability and user experience",
        url: "https://gasperpintar.com/projects/android",
        siteName: "Android projects - Gašper Pintar",
        type: "website",
        locale: "en",
        images: [
            {
                url: "https://gasperpintar.com/logo/logo192-st.webp",
                width: 1200,
                height: 630,
                alt: "Android projects - Open Graph Image"
            }
        ]
    },

    twitter: {
        card: "summary_large_image",
        title: "Android projects - Gašper Pintar",
        description: "A collection of Android apps focused on performance, usability and user experience",
        images: ["https://gasperpintar.com/logo/logo192.webp"]
    },

    alternates: {
        canonical: "https://gasperpintar.com/projects/android",
        languages: {
            "en": "https://gasperpintar.com/projects/android",
            "sl": "https://gasperpintar.com/projects/android"
        }
    },

    category: "technology",
    referrer: "origin-when-cross-origin",

    metadataBase: new URL("https://gasperpintar.com/projects/android"),
    appLinks: {
        web: {
            url: "https://gasperpintar.com/projects/android",
            should_fallback: true,
        }
    }
};

const Projects: () => void = async (): Promise<JSX.Element> => {

    const t: TranslationFunction = await getTranslations("android") as TranslationFunction;

    return (
        <>
            <div className={"container mt-5"}>
                <h2 className={"text-center"}>{t("title")}</h2>
                <div className={"row g-0"}>
                    {androidProjects.map((projectData: ProjectData): JSX.Element => (
                        <ProjectCard
                            key={projectData.title}
                            project={projectData}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Projects;
