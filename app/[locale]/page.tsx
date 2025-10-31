import React, {JSX} from "react";

import ProjectCard from "@/app/[locale]/components/ProjectCard";
import {ContactButtons} from "@/app/[locale]/components/ContactButtons";

import ProfilePicture250 from "@/public/images/home/profile-photo-size-250x250.webp";
import {ProjectData, projects} from "@/utils/Assets";
import Image from "next/image";
import {Metadata} from "next";

import {useTranslations} from "next-intl";
import {TranslationFunction} from "@/app/[locale]/layout";

export const metadata: Metadata = {
    title: "Personal Website - Gašper Pintar | Projects & Applications",
    description: "Personal page of Gašper Pintar. Learn about my projects and interests, and connect with me | Signal, LinkedIn, GitHub, Email",
    applicationName: "Personal Website - Gašper Pintar",

    keywords: ["Gasper Pintar", "Portfolio", "Applications", "Personal Website"],

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
        description: "Personal page of Gašper Pintar. Learn about my projects and interests, and connect with me | Signal, LinkedIn, GitHub, Email",
        url: "https://gasperpintar.com",
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
        title: "Gašper Pintar",
        description: "Personal page of Gašper Pintar. Learn about my projects and interests, and connect with me | Signal, LinkedIn, GitHub, Email",
        images: ["https://gasperpintar.com/logo/logo192.webp"]
    },

    alternates: {
        canonical: "https://gasperpintar.com",
        languages: {
            "en": "https://gasperpintar.com",
            "sl": "https://gasperpintar.com"
        }
    },

    category: "technology",
    referrer: "origin-when-cross-origin",

    metadataBase: new URL("https://gasperpintar.com"),
    appLinks: {
        web: {
            url: "https://gasperpintar.com",
            should_fallback: true,
        }
    }
};

const HomePage: React.FC = (): JSX.Element => {

    const t: TranslationFunction = useTranslations("pages") as TranslationFunction;

    return (
        <>
            <div className={"container mt-5"}>
                <div className={"row align-items-center justify-content-center text-center text-md-start mb-4"}>
                    <div className={"col-md-4 text-center mb-3 mb-md-0"}>
                        <Image
                            src={ProfilePicture250.src}
                            alt={"Profile photo of Gašper Pintar"}
                            width={250}
                            height={250}
                            loading={"eager"}
                            className={"img-fluid rounded-circle"}
                        />
                    </div>
                    <div className={"col-md-8"}>
                        <h1 className={"display-5"}>Gašper Pintar</h1>
                        <p className={"lead"}>{t("home.lead")}</p>
                        <p>{t("home.description")}</p>
                        <ContactButtons />
                    </div>
                </div>

                <h2 className={"text-center"}>{t("home.projects")}</h2>
                <div className={"row g-0"}>
                    {projects.map((projectData: ProjectData): JSX.Element => (
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

export default HomePage;
