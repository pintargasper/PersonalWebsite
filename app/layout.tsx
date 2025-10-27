import React, {JSX} from "react";
import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation";
import "@/styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";

import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

interface NodeProps {
    children: React.ReactNode;
}

const RootLayout: (props: Readonly<NodeProps>) => React.JSX.Element = ({children}: Readonly<NodeProps>): JSX.Element => {
    return (
        <html lang={"en"}
              data-scroll-behavior={"smooth"}
        >
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
