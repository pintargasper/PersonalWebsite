"use client";

import React, {type JSX} from "react";
import Image from "next/image";

import GetEnglish from "@/public/images/projects/images/play-store/get-it-on-google-play-english.webp";
import GetSlovenian from "@/public/images/projects/images/play-store/get-it-on-google-play-slovenian.webp";

import {useLocale} from "next-intl";

const GooglePlayButton: React.FC = (): JSX.Element => {

    const locale: string = useLocale();

    return (
        <Image
            src={locale === "en" ? GetEnglish : GetSlovenian}
            alt={"Get it on Google Play"}
            width={270}
            height={80}
            className={"img-play"}
        />
    );
};

export default GooglePlayButton;
