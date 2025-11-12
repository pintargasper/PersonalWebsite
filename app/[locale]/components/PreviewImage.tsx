"use client";

import React, { type JSX } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Screenshot } from "@/utils/Assets";
import { TranslationFunction } from "@/app/[locale]/layout";

interface PreviewImageProps {
    screenshots?: Screenshot[];
    type: string;
}

const PreviewImage: React.FC<PreviewImageProps> = ({ screenshots = [], type }: PreviewImageProps): JSX.Element => {

    const translationFunction: TranslationFunction = useTranslations(type) as TranslationFunction;
    const locale: string = useLocale();

    return (
        <div className={"d-flex flex-column flex-md-row justify-content-center flex-wrap gap-4 mt-1"}>
            {screenshots.map((screenshot: Screenshot, index: number): JSX.Element => (
                <div key={index} className={`${!screenshot.isHorizontal ? "screenshoots " : ""} text-center`}>
                    <Image
                        src={screenshot.src[locale] || screenshot.src["en"]}
                        alt={translationFunction(screenshot.alt)}
                        width={1080}
                        height={720}
                        loading={"eager"}
                        className={"img-fluid shadow-sm rounded mt-0"}
                    />
                    <p className={"mt-1"}>{translationFunction(screenshot.title)}</p>
                </div>
            ))}
        </div>
    );
};

export default PreviewImage;
