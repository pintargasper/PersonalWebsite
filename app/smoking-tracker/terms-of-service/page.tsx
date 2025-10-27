import React, {type JSX} from "react";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Smoking Tracker - Terms of Service",
    description: "Smoking Tracker Terms of Service",
    icons: {
        icon:  [
            {
                url: "/logo/favicon-st.ico",
                sizes: "32x32",
                type: "image/x-icon"
            }
        ]
    }
};

const TermsOfService: React.FC = (): JSX.Element => {

    return (
        <div className={"document container py-4"}>
            <div className={"content mx-auto"}>
                <h1 className={"text-center mb-3"}>Terms of Service</h1>

                <h2>Introduction</h2>
                <p>
                    Welcome to Smoking Tracker. By downloading, installing, and using this application, you agree to comply
                    with and be bound by the following data of service. Please review these data carefully. If you do
                    not agree with these data, do not use this application.
                </p>

                <h2>Use of Application</h2>
                <p>
                    Smoking Tracker is rated PEGI 3 and is suitable for users of all ages. You agree to use
                    this application solely for personal purposes and in a manner that does not infringe the rights or
                    restrict the use of this application by other users.
                </p>

                <h2>Data Storage and Processing</h2>
                <p>
                    Smoking Tracker stores all user data locally on your device. The application allows exporting and importing
                    data to/from Excel files. It is your responsibility to ensure compliance with privacy and data laws.
                </p>

                <h2>Limitation of Liability</h2>
                <p>
                    In no event will Smoking Tracker or its owners be liable for any direct, indirect, incidental,
                    consequential, or punitive damages arising from your use of this application.
                </p>

                <h2>Modifications to the data</h2>
                <p>
                    Smoking Tracker reserves the right to revise these terms at any time. Your continued use after changes
                    constitutes acceptance of the updated terms.
                </p>

                <h2>Governing Law</h2>
                <p>These terms are governed by the laws of the Republic of Slovenia.</p>

                <h2>Contact Us</h2>
                <p>If you have questions about these Terms of Service, contact us via the application or website.</p>

                <h2>Update</h2>
                <p>Last updated: September 20th, 2025</p>
            </div>
        </div>
    );
};

export default TermsOfService;
