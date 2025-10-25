import React, { type JSX } from "react";
import Link from "next/link";
import {ProjectData, TLink} from "@/utils/Assets";
import Image from "next/image";

interface ProjectCardProps {
    project: ProjectData;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }: ProjectCardProps): JSX.Element => {

    return (
        <div className={"project-card mb-0"}>
            <div className={"d-flex justify-content-center mb-md-0 me-md-3 ms-md-3"}>
                <Image
                    src={project?.image}
                    //srcSet={project?.imageSrcSet}
                    sizes={"70vw, 100vw, 150vw"}
                    alt={`${project?.title} logo`}
                    width={100}
                    height={100}
                    loading={"eager"}
                />
            </div>

            <div className={"flex-grow-1"}>
                <h3 className={"project-title fw-bold mb-2"}>{project.title}</h3>
                <p className={"project-description"}>
                    {project?.description}
                </p>
                <div className={"d-flex flex-wrap gap-2 mt-2 justify-content-center justify-content-md-start"}>
                    {project?.links.map((link: TLink): JSX.Element => (
                        <Link
                            key={link.label}
                            href={link.url}
                            {...(link.url.startsWith("http") ? { target: "_blank" } : {})}
                            className={"button"}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
