"use client";

import React, { JSX } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

interface StoreButtonProperties {
    readonly href: string;
    readonly imageSource: StaticImageData;
    readonly altText: string;
    readonly width: number;
    readonly height: number;
    readonly className?: string;
}

const StoreButton: React.FC<StoreButtonProperties> = ({
                                                          href,
                                                          imageSource,
                                                          altText,
                                                          width,
                                                          height,
                                                          className
                                                      }: StoreButtonProperties): JSX.Element => {
    return (
        <Link
            href={href}
            target={"_blank"}
        >
            <Image
                src={imageSource}
                alt={altText}
                width={width}
                height={height}
                className={className ?? ""}
            />
        </Link>
    );
};

export default StoreButton;
