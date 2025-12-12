import React, {JSX} from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faNewspaper, faProjectDiagram, faCog, IconDefinition} from "@fortawesome/free-solid-svg-icons";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Panel - Gašper Pintar",
    description: "Admin panel for managing",
    applicationName: "Panel - Gašper Pintar",

    keywords: ["Gasper Pintar", "News", "Panel"],

    authors: [
        { name: "Gašper Pintar", url: "https://gasperpintar.com" }
    ],
    creator: "Gašper Pintar",
    publisher: "Gašper Pintar",

    icons: {
        icon: [
            { url: "/logo/favicon.ico", sizes: "32x32", type: "image/x-icon" }
        ],
        apple: "/logo/logo192.webp",
        shortcut: "/logo/favicon.ico"
    },
};

interface Card {
    id: number;
    title: string;
    icon: IconDefinition;
    link: string;
}

const adminCards = [
	{
		id: 1,
		title: "News",
		icon: faNewspaper,
		link: "/panel/news"
	},
	{
		id: 2,
		title: "Users",
		icon: faProjectDiagram,
		link: "/panel/projects"
	},
	{
		id: 3,
		title: "Settings",
		icon: faCog,
		link: "/panel/settings"
	},
];

const AdminPanelPage: React.FC = (): JSX.Element => {
    return (
        <div className={"container py-5"}>
            <div className={"row g-4 justify-content-center"}>
                {adminCards.map((card: Card): JSX.Element => (
                    <div key={card.id} className={"col-12 col-sm-6 col-md-4 col-lg-3"}>
                        <Link
                            href={card.link}
                            className={"project-card d-flex flex-column align-items-center text-center"}
                        >
                            <FontAwesomeIcon
                                icon={card.icon}
                                size={"2x"}
                                className={"mb-2 text-primary"}
                            />
                            <div className={"flex-grow-1 d-flex flex-column justify-content-center w-100"}>
                                <h3 className={"fw-bold mb-2"}>{card.title}</h3>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPanelPage;
