import React, { type JSX } from "react";
import {contacts, TLink} from "@/utils/Assets";
import Image from "next/image";
import {Link} from "@/i18n/navigation"

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
                        alt={contact.label}
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

export default ContactButtons;
