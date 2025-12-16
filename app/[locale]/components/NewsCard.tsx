"use client";

import React, {JSX} from "react";
import {Card, CardBody, CardTitle, CardText} from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import {NewsView, Translation} from "@/api/newsApi";
import {fetchImage} from "@/api/filesApi";
import {TranslationFunction} from "@/app/[locale]/layout";
import {useTranslations} from "next-intl";

interface NewsCardProps extends NewsView {
    currentLocale: string;
}

const NewsCard: React.FC<NewsCardProps> = (props: NewsCardProps): JSX.Element => {

    const { currentLocale, ...news } = props;
    const translations = news.translations as unknown as Record<string, Translation>;
    const translation: Translation = translations[currentLocale] || Object.values(translations)[0];

    const t: TranslationFunction = useTranslations("buttons") as TranslationFunction;

    return (
        <Card className={"mb-4 shadow-sm news-container"}>
            <Image
                className={"news-image"}
                src={fetchImage(news.image)}
                alt={translation.headline}
                width={100}
                height={200}
                unoptimized={true}
                loading={"eager"}
            />

            <CardBody>
                <CardTitle className={"truncate-one-line"}>{translation.headline}</CardTitle>
                <CardText className={"truncate-multi-line"}>{translation.description}</CardText>
                <div className={"d-flex justify-content-between align-items-center"}>
                    <small className={"text-muted"}>
                        {news.publishedAt}
                    </small>
                    <Link
                        key={news.id}
                        href={`/news/${news.slug}`}
                        className={"button"}
                    >
                        {t("read-more")}
                    </Link>
                </div>
            </CardBody>
        </Card>
    );
};

export {
    NewsCard
};
