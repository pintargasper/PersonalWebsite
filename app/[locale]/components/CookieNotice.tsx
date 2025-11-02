"use client";

import React, {JSX, useEffect, useState} from "react";
import Cookies from "js-cookie";
import {TranslationFunction} from "@/app/[locale]/layout";
import {useTranslations} from "next-intl";

const COOKIE_NOTICE_KEY = "cookie-notice";

const CookieNotice: React.FC = (): JSX.Element | null => {

    const [visible, setVisible] = useState<undefined | boolean>(undefined);

    const t: TranslationFunction = useTranslations() as TranslationFunction;

    useEffect((): void => {
        const dismissed: string | undefined = Cookies.get(COOKIE_NOTICE_KEY);
        setTimeout((): void => {
            setVisible(!dismissed);
        }, 0);
    }, []);

    const handleClose: () => void = (): void => {
        Cookies.set(COOKIE_NOTICE_KEY, "true", { expires: 365, path: "/" });
        setVisible(false);
    };

    if (visible !== true) return null;

    return (
        <div className={"cookie-notice"}>
            <span className={"cookie-notice-text"}>
                {t("components.cookie-notice.message")}
            </span>
            <button
                onClick={handleClose}
                className={"button"}
            >
                {t("buttons.close")}
            </button>
        </div>
    );
};

export default CookieNotice;
