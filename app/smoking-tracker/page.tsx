import React, {JSX} from "react";

import SmokingLogo150 from "@/public/images/projects/smoking-tracker/logo_150x150.webp";
import GetEnglish from "@/public/images/projects/images/play-store/english.webp";
import GetGitHub from "@/public/images/projects/images/github.webp";

import Image from "next/image";
import {getLatestVersion} from "@/utils/Utils";
import {Screenshot, screenshotsST} from "@/utils/Assets";

const SmokingTracker: React.FC = (): JSX.Element => {

    const appVersion: Promise<string> = getLatestVersion("smoking-tracker");

    return (
        <>
            <div className={"project-page-container py-4"}>
                <div className={"container"}>
                    <div className={"row align-items-center mb-4"}>
                        <div className={"col-md-4 text-center mb-3 mb-md-0"}>
                            <Image
                                src={SmokingLogo150}
                                alt={"Smoking Tracker logo"}
                                width={250}
                                height={250}
                                loading={"eager"}
                                className={"img-fluid rounded-circle shadow-sm"}
                            />
                        </div>
                        <div className={"col-md-8"}>
                            <h1 className={"display-5 fw-bold"}>Smoking Tracker</h1>
                            <p className={"lead"}>Smoking Tracker is a program that allows the user to easily track the number of cigarettes smoked. It also enables the display of data on weekly, monthly and yearly graphs</p>
                            <p className={"mb-0"}>Version : {appVersion}</p>
                        </div>
                    </div>

                    <div className={"row text-center mb-5"}>
                        <h2 className={"h5 fw-bold mb-3"}>Download</h2>
                        <div className={"d-flex justify-content-center flex-wrap gap-3"}>
                            <a
                                key={"github"}
                                href={"https://github.com/pintargasper/SmokingTracker/releases/latest"}
                                target={"_blank"}
                                className={"button"}
                            >
                                <Image
                                    src={GetGitHub}
                                    alt={"GitHub logo"}
                                    width={25}
                                    height={25}
                                    className={"img-github"}
                                />
                                <span>GitHub</span>
                            </a>
                            <a
                                key={"google play store"}
                                href={"https://play.google.com/store/apps/details?id=com.gasperpintar.smokingtracker"}
                                target={"_blank"}
                                rel="noopener noreferrer"
                            >
                                <Image
                                    src={GetEnglish}
                                    alt={"Get it on Google Play"}
                                    width={270}
                                    height={80}
                                    className={"img-play"}
                                />
                            </a>
                        </div>
                    </div>

                    <div className={"row mb-3"}>
                        <div className={"col text-center"}>
                            <h3 className={"h5 fw-bold mb-3"}>Supported languages</h3>
                            <ul className={"list-unstyled d-inline-block text-start"}>
                                <li>English</li>
                                <li>Slovenščina</li>
                            </ul>
                        </div>
                    </div>

                    <div className={"screenshoots row"}>
                        <div className={"col text-center"}>
                            <h3 className={"h5 fw-bold mb-1"}>Preview</h3>
                            <div className={"d-flex flex-column flex-md-row justify-content-center flex-wrap gap-4 mt-1"}>
                                {screenshotsST.map((shot: Screenshot, index: number): JSX.Element => (
                                    <div key={index} className={"text-center"}>
                                        <Image
                                            src={shot.src}
                                            alt={shot.alt}
                                            width={1080}
                                            height={720}
                                            loading={"eager"}
                                            className={"img-fluid shadow-sm rounded mt-0"}
                                        />
                                        <p className={"mt-1"}>{shot.alt}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SmokingTracker;
