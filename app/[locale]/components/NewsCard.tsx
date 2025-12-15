import React, {JSX} from "react";
import {Card, CardBody, CardTitle, CardText} from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";

interface NewsItem {
    id: number,
    title: string,
    description: string,
    image: string,
    published: boolean,
    publishedAt: string,
    url: string
}

interface NewsCardProps {
    newsItem: NewsItem
}

const NewsCard: React.FC<NewsCardProps> = ({newsItem}: NewsCardProps): JSX.Element => {

    return (
        <Card className={"mb-4 shadow-sm news-container"}>
            <Image
                className={"news-image"}
                src={newsItem?.image}
                alt={newsItem?.title}
                width={100}
                height={200}
                loading={"eager"}
            />

            <CardBody>
                <CardTitle className={"truncate-one-line"}>{newsItem?.title}</CardTitle>
                <CardText className={"truncate-multi-line"}>{newsItem?.description}</CardText>
                <div className={"d-flex justify-content-between align-items-center"}>
                    <small className={"text-muted"}>
                        {newsItem!.publishedAt}
                    </small>
                    <Link
                        key={newsItem?.id}
                        href={newsItem?.url}
                        className={"button"}
                    >
                        Read more
                    </Link>
                </div>
            </CardBody>
        </Card>
    );
};

export {
    NewsCard
};

export type {
    NewsItem
};
