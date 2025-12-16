"use client";

import React, {JSX, useEffect, useState} from "react";
import Image from "next/image";
import {deleteArticle, getArticles, NewsArticleView} from "@/api/newsApi";
import Link from "next/link";
import {fetchImage} from "@/api/filesApi";
import {useLocale} from "next-intl";


const NewsPage: React.FC = (): JSX.Element => {

    const [articles, setArticles] = useState<NewsArticleView[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const locale: string = useLocale();

    useEffect((): void => {
        (async (): Promise<void> => {
            try {
                const data: NewsArticleView[] = await getArticles(locale);
                const array: NewsArticleView[] | (NewsArticleView | undefined)[] = Array.isArray(data) ? data : [data];
                setArticles(array as NewsArticleView[]);
            } catch (error) {
                setError(error instanceof Error ? error.message : "Error fetching articles");
            } finally {
                setLoading(false);
            }
        })();
    }, [locale]);

    const handleDelete: (uuid: string) => void = async (uuid: string): Promise<void> => {
        try {
            await deleteArticle(uuid);
            const data: NewsArticleView[] = await getArticles(locale);
            const array: NewsArticleView[] | (NewsArticleView | undefined)[] = Array.isArray(data) ? data : [data];
            setArticles(array as NewsArticleView[]);
        } catch (error) {
            setError(error instanceof Error ? error.message : "Error deleting article");
        }
    };

    return (
        <div className={"container py-5"}>
            <div className={"mb-4 d-flex justify-content-end"}>
                <Link href={"/panel/news/editor"} className={"button fw-bold"}>
                    + Add New Article
                </Link>
            </div>
            <div className={"row justify-content-center g-4"}>
                {error && <div className={"text-danger"}>{error}</div>}
                {!loading && !error && articles.map((news: NewsArticleView): JSX.Element => (
                    <div key={news.id} className={"col-12"}>
                        <div className={"news-card align-items-center text-start p-3 h-100"}>
                            {news.image ? (
                                <Image
                                    src={fetchImage(news.image)}
                                    alt={news.headline}
                                    width={120}
                                    height={120}
                                    unoptimized={true}
                                    loading={"eager"}
                                    className={"me-3 rounded"}
                                    style={{ objectFit: "cover" }}
                                />
                            ) : null}
                            <div className={"flex-grow-1 d-flex flex-column justify-content-center w-100"}>
                                <h3 className={"fw-bold mb-1 truncate-one-line"}>{news.headline}</h3>
                                <p className={"mb-0 text-justify truncate-multi-line"}>{news.description}</p>
                                <span className={news.published ? "badge bg-success mt-2" : "badge bg-secondary mt-2"}>
                                        {news.published ? "Published" : "Draft"}
                                    </span>
                            </div>
                            <div className={"d-flex flex-column text-center gap-2 ms-3"}>
                                <Link href={{ pathname: "/panel/news/editor", query: { url: news.uuid } }} className={"button"}>Edit</Link>
                                <button type={"button"} className={"button"} onClick={(): void => handleDelete(news.uuid)}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsPage;
