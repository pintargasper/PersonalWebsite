import React, {type JSX} from "react";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Card Generator - Terms of Service",
    description: "Card Generator Terms of Service document outlining user responsibilities, application usage rules, and legal agreements governing access and features",
    applicationName: "Card Generator - Gašper Pintar",

    keywords: ["Gasper Pintar", "Cards", "Card Generator", "Application", "Terms of Service"],

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
        title: "Card Generator - Terms of Service",
        description: "Card Generator Terms of Service document outlining user responsibilities, application usage rules, and legal agreements governing access and features",
        url: "https://gasperpintar.com/card-generator/terms-of-service",
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
        title: "Card Generator - Terms of Service",
        description: "Card Generator Terms of Service document outlining user responsibilities, application usage rules, and legal agreements governing access and features",
        images: ["https://gasperpintar.com/logo/logo192-cg.webp"]
    },

    alternates: {
        canonical: "https://gasperpintar.com/card-generator/terms-of-service",
        languages: {
            "en": "https://gasperpintar.com/card-generator/terms-of-service",
            "sl": "https://gasperpintar.com/card-generator/terms-of-service"
        }
    },

    category: "technology",
    referrer: "origin-when-cross-origin",

    metadataBase: new URL("https://gasperpintar.com/card-generator"),
    appLinks: {
        web: {
            url: "https://gasperpintar.com/card-generator/terms-of-service",
            should_fallback: true,
        }
    }
};

const TermsOfService: React.FC = (): JSX.Element => {

    return (
        <div className={"document container py-4"}>
            <div className={"content mx-auto"}>
                <h1 className={"text-center mb-3"}>Terms of Service</h1>

                <h2>Introduction</h2>
                <p>
                    Welcome to Card Generator. By downloading, installing, and using this application, you agree to comply
                    with and be bound by the following data of service. Please review these data carefully. If you do
                    not agree with these data, do not use this application.
                </p>

                <h2>Use of Application</h2>
                <p>
                    Card Generator is suitable for users of all ages. You agree to use
                    this application solely for personal purposes and in a manner that does not infringe the rights or
                    restrict the use of this application by other users.
                </p>

                <h2>Data Storage and Processing</h2>
                <p>
                    Card Generator stores all user data locally on your device. The application allows exporting and importing
                    data to/from Excel files. It is your responsibility to ensure compliance with privacy and data laws.
                </p>

                <h2>Limitation of Liability</h2>
                <p>
                    In no event will Card Generator or its owners be liable for any direct, indirect, incidental,
                    consequential, or punitive damages arising from your use of this application.
                </p>

                <h2>Modifications to the data</h2>
                <p>
                    Card Generator reserves the right to revise these terms at any time. Your continued use after changes
                    constitutes acceptance of the updated terms.
                </p>

                <h2>Governing Law</h2>
                <p>These terms are governed by the laws of the Republic of Slovenia.</p>

                <h2>Contact Us</h2>
                <p>If you have questions about these Terms of Service, contact us via the application or website.</p>

                <h2>Update</h2>
                <p>Last updated: September 20th, 2025</p>
            </div>
        </div>
    );
};

export default TermsOfService;
