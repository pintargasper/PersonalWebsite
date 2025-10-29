import React, { type JSX } from "react";
import {Link} from "@/i18n/navigation";
import {ProjectData, TLink} from "@/utils/Assets";
import Image from "next/image";
import GetGitHub from "@/public/images/projects/images/github-photo.webp";
import {useTranslations} from "next-intl";
import {TranslationFunction} from "@/app/[locale]/layout";

interface ProjectCardProps {
    project: ProjectData;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }: ProjectCardProps): JSX.Element => {

    const t: TranslationFunction = useTranslations("pages") as TranslationFunction;
    const t1: TranslationFunction = useTranslations("projects") as TranslationFunction;

    return (
        <div className={"project-card mb-0"}>
            <div className={"d-flex justify-content-center mb-md-0 me-md-3 ms-md-3"}>
                <Image
                    src={project.image}
                    alt={`${t(project?.title)} logo`}
                    width={100}
                    height={100}
                    loading={"eager"}
                />
            </div>

            <div className={"flex-grow-1"}>
                <h3 className={"project-title fw-bold mb-2"}>{t(project.title)}</h3>
                <p className={"project-description"}>
                    {t(project?.description)}
                </p>
                <div className={"d-flex flex-wrap gap-2 mt-2 justify-content-center justify-content-md-start"}>
                    {project?.links.map((link: TLink): JSX.Element => (
                        <Link
                            key={link.label}
                            href={link.url}
                            {...(link.url.startsWith("http") ? { target: "_blank" } : {})}
                            className={"button"}
                        >
                            {link.url.startsWith("http") && (
                                <Image
                                    src={GetGitHub}
                                    alt={"GitHub logo"}
                                    width={25}
                                    height={25}
                                    loading={"eager"}
                                    className={"img-assets"}
                                />
                            )}
                            <span>{link.t ? t1(link.label) : link.label}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectCard;
