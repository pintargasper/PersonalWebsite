"use client";

import React, {JSX} from "react";
import {ReadonlyURLSearchParams, useSearchParams} from "next/navigation";
import {addImageAlignmentClasses} from "@/app/[locale]/panel/news/editor/RichTextEditor";

const PreviewPage: React.FC = (): JSX.Element => {

    const searchParams: ReadonlyURLSearchParams = useSearchParams();
    const htmlRaw: string = searchParams.get("html") || "";
    const html: string = addImageAlignmentClasses(htmlRaw);

    return (
        <div className={"container-fluid mt-5"}>
            <div className={"row justify-content-center"}>
                <div className={"col-md-8"}>
                    <div className={"p-4 bg-white"}>
                        <h2 className={"mb-4 text-center"}>Predogled novice</h2>
                        <div className={"ProseMirror"} dangerouslySetInnerHTML={{ __html: html }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewPage;
