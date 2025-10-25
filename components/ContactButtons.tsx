import React, { type JSX } from "react";
import {contacts, TLink} from "@/utils/Assets";

const ContactButtons: React.FC = (): JSX.Element => {
    return (
        <div className={"d-flex flex-wrap gap-2 mt-3 justify-content-center justify-content-md-start"}>
            {contacts.map((contact: TLink): JSX.Element => (
                <a
                    key={contact.label}
                    href={contact.url}
                    {...(contact.label !== "Email" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className={"button"}
                >
                    {contact.label}
                </a>
            ))}
        </div>
    );
};

export default ContactButtons;
