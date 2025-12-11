import React, { JSX } from "react";
import Image from "next/image";
import { NewsItem } from "@/app/[locale]/components/NewsCard";
import { newsData } from "@/app/[locale]/news/page";

interface NewsDetailPageProperties {
    params: Promise<{
        id: string;
    }>;
}

const NewsDetailPage = async (props: NewsDetailPageProperties): Promise<JSX.Element> => {

    const params: {id: string} = await props.params;

    const normalizeTitle: (title: string) => string = (title: string): string => {
        return title
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "");
    };

    const newsItem: NewsItem | undefined = newsData.find(
        (item: NewsItem): boolean => normalizeTitle(item.title) === params.id
    );

    if (!newsItem) {
        return (
            <div className={"container mt-5"}>
                <h2>Novica ni bila najdena.</h2>
            </div>
        );
    }

    return (
        <div className={"container mt-5"}>
            <h1 className={"mb-3"}>{newsItem.title}</h1>

            <div className={"mb-4"} style={{ maxWidth: "600px", margin: "0 auto" }}>
                <Image
                    src={newsItem.image}
                    alt={newsItem.title}
                    width={600}
                    height={400}
                    className={"img-fluid rounded"}
                    style={{ objectFit: "cover", width: "100%", height: "auto" }}
                    priority={true}
                />
            </div>

            <p className={"mb-3"}>{newsItem.description}</p>
            <small className={"text-muted"}>
                Objavljeno: {newsItem.publishedAt}
            </small>
        </div>
    );
};

export default NewsDetailPage;
