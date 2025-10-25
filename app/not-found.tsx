import Link from "next/link";
import React, { type JSX } from "react";
import {Card, cards} from "@/utils/Assets";
import Image from "next/image";

const NotFoundPage: React.FC = (): JSX.Element => {

    return (
        <>
            <div className={"notfound-container"}>
                <h1 className={"notfound-title"}>Lost in space</h1>
                <p className={"notfound-text"}>Looks like you drifted off course</p>

                <div className={"cards-wrapper"}>
                    {cards.map((card: Card, index: number): JSX.Element => (
                        <Link key={index} href={card.link} className={"floating-card d-flex align-items-center gap-2"}>
                            {card.image && (
                                <Image
                                    src={card.image}
                                    alt={card.alt + " logo"}
                                    width={40}
                                    height={40}
                                    className={"img-fluid"}
                                    loading={"eager"}
                                />
                            )}
                            <span>{card.title}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default NotFoundPage;
