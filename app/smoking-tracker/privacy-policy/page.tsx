import React, {JSX} from "react";
import {Metadata, Viewport} from "next";

export const metadata: Metadata = {
    title: "Smoking Tracker - Privacy Policy",
    description: "Smoking Tracker Privacy Policy document outlining data handling and user privacy practices",
    applicationName: "Smoking Tracker - Gašper Pintar",

    keywords: ["Gasper Pintar", "Tracker", "Smoking Tracker", "Application", "Privacy Policy"],

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
        title: "Smoking Tracker - Privacy Policy",
        description: "Smoking Tracker Privacy Policy document outlining data handling and user privacy practices",
        url: "https://gasperpintar.com/smoking-tracker/privacy-policy",
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
        title: "Smoking Tracker - Privacy Policy",
        description: "Smoking Tracker Privacy Policy document outlining data handling and user privacy practices",
        images: ["https://gasperpintar.com/logo/logo192-st.webp"]
    },

    alternates: {
        canonical: "https://gasperpintar.com/smoking-tracker/privacy-policy",
        languages: {
            "en": "https://gasperpintar.com/smoking-tracker/privacy-policy",
            "sl-SI": "https://gasperpintar.com/smoking-tracker/privacy-policy"
        }
    },

    category: "technology",
    referrer: "origin-when-cross-origin",

    metadataBase: new URL("https://gasperpintar.com/smoking-tracker"),
    appLinks: {
        web: {
            url: "https://gasperpintar.com/smoking-tracker/privacy-policy",
            should_fallback: true,
        }
    }
};

const PrivacyPolicy: React.FC = (): JSX.Element => {
    return (
        <div className={"document container py-4"}>
            <div className={"content mx-auto"}>
                <h1 className={"text-center mb-3"}>Privacy Policy</h1>
                <p>
                    If you require any more information or have any questions about our privacy policy, please feel free to contact us
                    through the application or via our website.
                </p>
                <p>
                    At Smoking Tracker, we take your privacy seriously. This privacy policy outlines how we handle your data and protect
                    your information when you use our application.
                </p>

                <h2>Data Collection and Storage</h2>
                <p>
                    Smoking Tracker stores all your data locally on your device. The application does not upload or share your data with
                    any external servers or third parties. You have full control over your data and can export it to Excel files or import
                    data from Excel files as needed.
                </p>

                <h2>Use of Data</h2>
                <p>
                    Your data is used solely to provide functionality within the application. Smoking Tracker does not use your data
                    for advertising, analytics, or any other purpose.
                </p>

                <h2>Data Security</h2>
                <p>
                    While Smoking Tracker does not transmit your data externally, we recommend you take steps to protect your device and
                    any exported files. Ensure your device is secure and handle exported files carefully.
                </p>

                <h2>Children&#39;s Information</h2>
                <p>
                    Smoking Tracker is rated PEGI 3, which means it is suitable for all age groups, including children.
                    We do not knowingly collect any personal information from users in violation of applicable laws.
                </p>

                <h2>Consent</h2>
                <p>By using Smoking Tracker, you hereby consent to our data policy and agree to its terms.</p>

                <h2>Changes to This Policy</h2>
                <p>
                    We reserve the right to update this privacy policy at any time. Any changes will be reflected in the application
                    and on our website. Your continued use after changes signifies acceptance of the updated policy.
                </p>

                <h2>Update</h2>
                <p>Last updated: September 20th, 2025</p>
            </div>
        </div>
    );
}

export default PrivacyPolicy;
