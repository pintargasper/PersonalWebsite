import React, {JSX} from "react";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import "@/styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { config } from "@fortawesome/fontawesome-svg-core";
import {Viewport} from "next";
import Script from "next/script";
config.autoAddCss = false;

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1.0,
    maximumScale: 1.0,
    userScalable: false
};

interface NodeProps {
    children: React.ReactNode;
}

const RootLayout: (props: Readonly<NodeProps>) => React.JSX.Element = ({children}: Readonly<NodeProps>): JSX.Element => {
    return (
        <html lang={"en"}
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
                <div className={"app-wrapper d-flex flex-column min-vh-100"}>
                    <Navigation />
                    <div className={"flex-fill content-wrapper"}>
                        {children}
                    </div>
                    <Footer />
                </div>
            </body>
        </html>
    );
};

export default RootLayout;
