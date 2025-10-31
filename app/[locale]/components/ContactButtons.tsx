import React, { type JSX } from "react";
import {contacts, TLink} from "@/utils/Assets";
import Image from "next/image";
import {Link} from "@/i18n/navigation"
import GooglePlayButton from "@/app/[locale]/components/GooglePlayButton";
import GetGitHub from "@/public/images/projects/images/github-photo.webp";

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
            <Link
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
                    className={"img-assets"}
                />
                <span>GitHub</span>
            </Link>
            <Link
                key={"GitHub"}
                href={"https://play.google.com/store/apps/details?id=com.gasperpintar.smokingtracker"}
                target={"_blank"}
            >
                <GooglePlayButton />
            </Link>
        </div>
    );
};

export {
    ContactButtons,
    SmokingTrackerButtons
};


