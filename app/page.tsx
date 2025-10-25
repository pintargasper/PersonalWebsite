import React, {JSX} from "react";

import ProjectCard from "@/components/ProjectCard";
import ContactButtons from "@/components/ContactButtons";

import ProfilePicture250 from "@/public/images/home/profile_250x250.webp";
import {ProjectData, projects} from "@/utils/Assets";
import Image from "next/image";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Gašper Pintar",
    description: "Gašper Pintar - Personal Website",
    icons: {
        icon:  [
            {
                url: "/logo/favicon.ico",
                sizes: "32x32",
                type: "image/x-icon"
            }
        ]
    }
};

const HomePage: React.FC = (): JSX.Element => {
    return (
        <>
            <div className={"container mt-5"}>
                <div className={"row align-items-center justify-content-center text-center text-md-start mb-4"}>
                    <div className={"col-md-4 text-center mb-3 mb-md-0"}>
                        <Image
                            src={ProfilePicture250.src}
                            alt={"Profile"}
                            width={250}
                            height={250}
                            loading={"eager"}
                            className={"img-fluid rounded-circle"}
                        />
                    </div>
                    <div className={"col-md-8"}>
                        <h1 className={"display-5"}>Gašper Pintar</h1>
                        <p className={"lead"}>Student at faculty of information studies Novo mesto</p>
                        <p>Hi, I am Gašper from Slovenia</p>
                        <ContactButtons />
                    </div>
                </div>

                <h2 className={"text-center"}>Projects</h2>
                <div className={"row justify-content-center g-0"}>
                    {projects.map((projectData: ProjectData): JSX.Element => (
                        <ProjectCard
                            key={projectData.title}
                            project={projectData}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default HomePage;
