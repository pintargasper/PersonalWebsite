import React, {JSX} from "react";
import Editor from "@/app/[locale]/panel/news/editor/Editor";
import {Metadata} from "next";
import ProtectedRoute from "../../../../components/ProtectedRoute";

export const metadata: Metadata = {
    title: "News editor - Gašper Pintar",
    description: "Create and edit news articles in multiple languages before publishing",
    applicationName: "News editor - Gašper Pintar",

    keywords: ["Gasper Pintar", "News", "Editor"],

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

const EditorPage: React.FC = (): JSX.Element => {
    return (
        <ProtectedRoute>
            <Editor/>
        </ProtectedRoute>
    );
};

export default EditorPage;
