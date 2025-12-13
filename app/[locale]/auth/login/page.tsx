import React, {JSX} from "react";
import {Metadata} from "next";
import Login from "@/app/[locale]/auth/login/LoginPage";

export const metadata: Metadata = {
    title: "Login - Gašper Pintar",
    description: "Login page for Gašper Pintar's website",
    applicationName: "Login - Gašper Pintar",

    keywords: ["Gasper Pintar", "Login"],

    authors: [
        { name: "Gašper Pintar", url: "https://gasperpintar.com" }
    ],
    creator: "Gašper Pintar",
    publisher: "Gašper Pintar",

    icons: {
        icon: [
            { url: "/logo/favicon.ico", sizes: "32x32", type: "image/x-icon" }
        ],
        apple: "/logo/logo192.webp",
        shortcut: "/logo/favicon.ico"
    },
};

const LoginPage: React.FC = (): JSX.Element => {
    return (
        <Login/>
    );
};

export default LoginPage;
