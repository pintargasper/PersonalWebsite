import React, {JSX} from "react";
import Footer from "@/app/[locale]/components/Footer";
import Navigation from "@/app/[locale]/components/Navigation";
import CookieNotice from "@/app/[locale]/components/CookieNotice";
import "@/styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

import {NextIntlClientProvider, hasLocale} from "next-intl";

import { config } from "@fortawesome/fontawesome-svg-core";
import {Viewport} from "next";
import Script from "next/script";
import {routing} from "@/i18n/routing";
import {notFound} from "next/navigation";
config.autoAddCss = false;

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1.0,
    maximumScale: 1.0,
    userScalable: false
};

type TranslationFunction = <Key extends string>(
    key: Key,
    values?: Record<string, React.ReactNode>
) => string;

async function RootLayout({children, params}: {
    children: React.ReactNode;
    params: Promise<{locale: string}>;
}): Promise<JSX.Element> {

    const {locale} = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    return (
        <html lang={locale}
              data-scroll-behavior={"smooth"}
        >
            <head>
                {/* Google Analytics */}
                <meta name="google-site-verification" content="ful3dtJx-2GOrhDrAbYsMI2oXsYASfAWbXLXZSj6Gf0"/>
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-06PV0WY17C"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', 'G-06PV0WY17C');
                        `}
                </Script>
            </head>
            <body>
                <NextIntlClientProvider>
                <div className={"app-wrapper d-flex flex-column min-vh-100"}>
                    <Navigation />
                    <CookieNotice />
                    <div className={"flex-fill content-wrapper"}>
                        {children}
                    </div>
                    <Footer />
                </div>
                </NextIntlClientProvider>
            </body>
        </html>
    );
};

export type {
    TranslationFunction
}

export default RootLayout;
