"use client";

import React, {JSX, useEffect, useState} from "react";
import Cookies from "js-cookie";

const COOKIE_NOTICE_KEY = "cookie-notice";

const CookieNotice: React.FC = (): JSX.Element | null => {

    const [visible, setVisible] = useState<undefined | boolean>(undefined);

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
                This website uses cookies to analyze and improve your user experience. By continuing to use the site, you agree to the use of cookies
            </span>
            <button
                onClick={handleClose}
                className={"button"}
            >
                Zapri
            </button>
        </div>
    );
};

export default CookieNotice;
