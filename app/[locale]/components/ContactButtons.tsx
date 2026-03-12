import React, { type JSX } from "react";
import {contacts, TLink} from "@/utils/Assets";
import Image from "next/image";
import {Link} from "@/i18n/navigation"

import GetGitHub from "@/public/images/projects/images/badges/github.webp";
import GetGitHubApp from "@/public/images/projects/images/badges/github-app.webp";
import GetFDroidPlay from "@/public/images/projects/images/badges/f-droid.webp";
import GetIzzyOnDroid from "@/public/images/projects/images/badges/izzyondroid.webp";
import GetOpenApk from "@/public/images/projects/images/badges/open-apk.webp";
import GetGooglePlay from "@/public/images/projects/images/badges/google-play.webp";

import PlatformButton from "@/app/[locale]/components/GooglePlayButton";

const ContactButtons: React.FC = (): JSX.Element => {
    return (
        <div className={"d-flex flex-wrap gap-1 mt-3 justify-content-center justify-content-md-start"}>
            {contacts.map((contact: TLink): JSX.Element => (
                <Link
                    key={contact.label}
                    href={contact.url}
                    {...(contact.label !== "Email" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={"button"}
                >
                    <Image
                        src={contact.img ?? ""}
                        alt={contact.alt ?? contact.label}
                        width={25}
                        height={25}
                        loading={"eager"}
                        className={"img-assets"}
                    />
                    <span>{contact.label}</span>
                </Link>
            ))}
        </div>
    );
};

const SmokingTrackerButtons: React.FC = (): JSX.Element => {

    return (
        <div className={"d-flex flex-wrap gap-1 mt-3 justify-content-center justify-content-md-start"}>
            <PlatformButton
                href={"https://github.com/pintargasper/SmokingTracker/releases/latest"}
                imageSource={GetGitHub}
                altText={"GitHub logo"}
                width={270}
                height={90}
                className={"img-play"}
            />

            <PlatformButton
                href={"https://f-droid.org/en/packages/com.gasperpintar.smokingtracker/"}
                imageSource={GetFDroidPlay}
                altText={"Download APK from F-droid"}
                width={270}
                height={80}
                className={"img-play"}
            />

            <PlatformButton
                href={"https://apt.izzysoft.de/fdroid/index/apk/com.gasperpintar.smokingtracker"}
                imageSource={GetIzzyOnDroid}
                altText={"Download APK from IzzyOnDroid"}
                width={270}
                height={80}
                className={"img-play"}
            />

            <PlatformButton
                href={"https://www.openapk.net/smoking-tracker/com.gasperpintar.smokingtracker/"}
                imageSource={GetOpenApk}
                altText={"Get it on OpenAPK"}
                width={270}
                height={80}
                className={"img-play"}
            />
            <PlatformButton
                href={"https://play.google.com/store/apps/details?id=com.gasperpintar.smokingtracker"}
                imageSource={GetGooglePlay}
                altText={"Get it on Google Play"}
                width={270}
                height={80}
                className={"img-play"}
            />
        </div>
    );
};

const CardGeneratorButtons: React.FC = (): JSX.Element => {
    return (
        <div className={"d-flex flex-wrap gap-1 mt-3 justify-content-center justify-content-md-start"}>
            <PlatformButton
                href={"https://github.com/pintargasper/CardGenerator/releases/latest"}
                imageSource={GetGitHubApp}
                altText={"GitHub logo"}
                width={270}
                height={90}
                className={"img-play"}
            />
        </div>
    );
};

export {
    ContactButtons,
    SmokingTrackerButtons,
    CardGeneratorButtons
};


