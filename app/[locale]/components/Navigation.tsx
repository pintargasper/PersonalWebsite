"use client";

import React, { JSX, useState, type RefObject, useRef, MouseEvent, useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from '@/i18n/navigation';
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faGlobe, faMoon, faFolder } from "@fortawesome/free-solid-svg-icons";
import {Link} from "@/i18n/navigation";
import Image from "next/image";

import SmokingLogo70 from "@/public/images/projects/smoking-tracker/logo_70x70.webp";
import CardLogo70 from "@/public/images/projects/card-generator/logo_70x70.webp";

import {useTranslations} from "next-intl";
import {TranslationFunction} from "@/app/[locale]/layout";

const Navigation: React.FC = (): JSX.Element => {

    const [isNavbarExpanded, setIsNavbarExpanded] = useState<boolean>(false);
    const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState<boolean>(false);
    const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState<boolean>(false);
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState<boolean>(false);

    const navbarRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);

    const locale: string = useLocale();
    const router: ReturnType<typeof useRouter> = useRouter();
    const pathname: string = usePathname();

    const t: TranslationFunction = useTranslations("components") as TranslationFunction;
    const t1: TranslationFunction = useTranslations("pages") as TranslationFunction;

    const handleClickOutside: (event: MouseEvent<Document>) => void = (event: MouseEvent<Document>): void => {
        if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
            setIsProjectDropdownOpen(false);
            setIsSettingsDropdownOpen(false);
            setIsLanguageDropdownOpen(false);
            setIsNavbarExpanded(false);
        }
    };

    const closeAll: () => void = (): void => {
        setIsNavbarExpanded(false);
        setIsProjectDropdownOpen(false);
        setIsSettingsDropdownOpen(false);
        setIsLanguageDropdownOpen(false);
    };

    const changeLocale: (newLocale: string) => void = (newLocale: string): void => {
        if (newLocale !== locale) {
            router.replace(pathname, { locale: newLocale });
            router.refresh();
        }
    }

    useEffect((): () => void => {
        document.addEventListener("click", handleClickOutside as unknown as EventListener);
        return (): void => {
            document.removeEventListener("click", handleClickOutside as unknown as EventListener);
        };
    }, []);

    return (
        <Navbar
            fixed={"top"}
            expand={"sm"}
            expanded={isNavbarExpanded}
            className={"shadow-sm border-bottom bg-light"}
            ref={navbarRef}
        >
            <Container fluid={true}>
                <Navbar.Brand as={Link} href={"/"} onClick={closeAll}>{t("navbar.brand")}</Navbar.Brand>

                <Navbar.Toggle
                    aria-controls={"basic-navbar-nav"}
                    onClick={(): void => setIsNavbarExpanded((previous: boolean): boolean => !previous)}
                    className={"no-outline"}
                />

                <Navbar.Collapse id={"basic-navbar-nav"}>
                    <Nav className={"me-auto"}>
                        <NavDropdown
                            title={<><FontAwesomeIcon icon={faFolder} className={"me-2"} />{t("navbar.projects")}</>}
                            id={"project-dropdown"}
                            show={isProjectDropdownOpen}
                            onToggle={(isOpen: boolean): void => setIsProjectDropdownOpen(isOpen)}
                        >
                            <NavDropdown.Item as={Link} href={"/smoking-tracker"} onClick={closeAll}>
                                <Image src={SmokingLogo70} alt={"Smoking Tracker logo"} width={25} height={25} className={"me-2 mb-1"} />
                                <span>{t1("smoking-tracker.title")}</span>
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} href={"/card-generator"} onClick={closeAll}>
                                <Image src={CardLogo70} alt={"Card Generator logo"} width={25} height={25} className={"me-2 mb-1"} />
                                {t1("card-generator.title")}
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                    <Nav className={"ms-auto"}>
                        <NavDropdown
                            id={"settings-dropdown"}
                            title={<><FontAwesomeIcon icon={faCog} className={"me-2"} />{t("navbar.settings")}</>}
                            align={"end"}
                            show={isSettingsDropdownOpen}
                            onToggle={(isOpen: boolean): void => setIsSettingsDropdownOpen(isOpen)}
                        >
                            <NavDropdown
                                id={"language-dropdown"}
                                title={<><FontAwesomeIcon icon={faGlobe} className={"me-2"} />{t("navbar.language")}</>}
                                drop={"start"}
                                show={isLanguageDropdownOpen}
                                onToggle={(isOpen: boolean): void => setIsLanguageDropdownOpen(isOpen)}
                            >
                                <NavDropdown.Item onClick={(): void => changeLocale("en")}>English</NavDropdown.Item>
                                <NavDropdown.Item onClick={(): void => changeLocale("sl")}>Slovenščina</NavDropdown.Item>
                            </NavDropdown>

                            {/*<NavDropdown.Item href={"#theme"}>
                                <FontAwesomeIcon icon={faMoon} className={"me-2"} />
                                Dark
                            </NavDropdown.Item>*/}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
