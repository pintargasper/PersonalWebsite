import React, {JSX} from "react";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Gašper Pintar",
    description: "Gašper Pintar - Personal Website",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>): JSX.Element {
    return (
        <html lang="en">
            <body>
                {children}
            </body>
        </html>
    );
}
