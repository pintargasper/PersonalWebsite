import React, {JSX} from "react";
import {Metadata} from "next";
import ProtectedRoute from "../../../components/ProtectedRoute";
import NewsPage from "@/app/[locale]/panel/news/NewsPage";

export const metadata: Metadata = {
    title: "News panel - Gašper Pintar",
    description: "News panel for managing",
    applicationName: "News panel - Gašper Pintar",

    keywords: ["Gasper Pintar", "News", "Panel"],

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

const NewsPanelPage: React.FC = (): JSX.Element => {

    return (
        <ProtectedRoute>
            <NewsPage/>
        </ProtectedRoute>
    );
};

export default NewsPanelPage;
