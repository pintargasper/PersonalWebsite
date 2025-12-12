import React, {JSX} from "react";
import PreviewPage from "@/app/[locale]/panel/news/editor/preview/PreviewPage";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "News preview - Gašper Pintar",
    description: "Preview a news article before publishing",
    applicationName: "News preview - Gašper Pintar",

    keywords: ["Gasper Pintar", "News", "Preview"],

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

const Preview: React.FC = (): JSX.Element => {
  return (
      <PreviewPage/>
  );
};

export default Preview;
