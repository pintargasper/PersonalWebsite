import React, {JSX} from "react";
import {Metadata} from "next";
import Image from "next/image";
import {newsData} from "@/app/[locale]/news/page";
import Link from "next/link";
import {NewsItem} from "@/app/[locale]/components/NewsCard";
import ProtectedRoute from "../../../components/ProtectedRoute";

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
            <div className={"container py-5"}>
                <div className={"row justify-content-center g-4"}>
                    {newsData.map((news: NewsItem): JSX.Element => (
                        <div key={news.id} className={"col-12"}>
                            <div className={"news-card align-items-center text-start p-3 h-100"}>
                                <Image
                                    src={news.image}
                                    alt={news.title}
                                    width={120}
                                    height={120}
                                    className={"me-3 rounded"}
                                    style={{ objectFit: "cover" }}
                                />
                                <div className={"flex-grow-1 d-flex flex-column justify-content-center w-100"}>
                                    <h3 className={"fw-bold mb-1 truncate-one-line"}>{news.title}</h3>
                                    <p className={"mb-0 text-justify truncate-multi-line"}>{news.description}</p>
                                    <span className={news.published ? "badge bg-success mt-2" : "badge bg-secondary mt-2"}>
                                        {news.published ? "Published" : "Draft"}
                                    </span>
                                </div>
                                <div className={"d-flex flex-column text-center gap-2 ms-3"}>
                                    <Link href={{ pathname: "/panel/news/editor", query: { url: news.url } }} className={"button"}>Edit</Link>
                                    <button type={"button"} className={"button"}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default NewsPanelPage;
