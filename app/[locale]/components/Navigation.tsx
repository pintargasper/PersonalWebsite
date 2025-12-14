"use client";

import React, { JSX, useState, type RefObject, useRef, MouseEvent, useEffect } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from '@/i18n/navigation';
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faGlobe, faFolder, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import {Link} from "@/i18n/navigation";
import Image from "next/image";

import SmokingLogo70 from "@/public/images/projects/smoking-tracker/smoking-tracker-photo-size-70x70.webp";
import CardLogo70 from "@/public/images/projects/card-generator/card-generator-photo-size-70x70.webp";

import {useTranslations} from "next-intl";
import {TranslationFunction} from "@/app/[locale]/layout";
import {useAuth} from "@/app/components/AuthContext";

const Navigation: React.FC = (): JSX.Element => {

    const { isAuthenticated, logout: contextLogout, authChecked, checkAuth, isProtectedRouteActive } = useAuth();

    const [isNavbarExpanded, setIsNavbarExpanded] = useState<boolean>(false);
    const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState<boolean>(false);
    const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState<boolean>(false);
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState<boolean>(false);
    const navbarRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);

    const locale: string = useLocale();
    const router: ReturnType<typeof useRouter> = useRouter();
    const pathname: string = usePathname();

    const t: TranslationFunction = useTranslations("components") as TranslationFunction;

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

    const handleLogout: () => Promise<void> = async (): Promise<void> => {
        await contextLogout();
        router.replace("/auth/login");
    };

    useEffect((): () => void => {
        document.addEventListener("click", handleClickOutside as unknown as EventListener);
        return (): void => {
            document.removeEventListener("click", handleClickOutside as unknown as EventListener);
        };
    }, []);

    useEffect((): void => {
        checkAuth().then((result: void): void => result);
    }, [checkAuth, pathname]);

    if (!authChecked) {
        return <></>;
    }

    const showAuthenticated: boolean = isProtectedRouteActive && isAuthenticated;

    return (
        <Navbar
            fixed={"top"}
            expand={"sm"}
            expanded={isNavbarExpanded}
            className={"shadow-sm border-bottom bg-light"}
            ref={navbarRef}
        >
            <Container fluid={true}>
                {showAuthenticated ? (
                    <Navbar.Brand as={Link} href={"/panel"} onClick={closeAll}>Panel</Navbar.Brand>
                ) : (
                    <Navbar.Brand as={Link} href={"/"} onClick={closeAll}>{t("navbar.brand")}</Navbar.Brand>
                )}

                {!showAuthenticated && (
                    <Nav.Link
                        as={Link}
                        href={"/news"}
                        onClick={closeAll}
                    >
                        Novice
                    </Nav.Link>
                )}

                <Navbar.Toggle
                    aria-controls={"basic-navbar-nav"}
                    onClick={(): void => setIsNavbarExpanded((previous: boolean): boolean => !previous)}
                    className={"no-outline"}
                />

                <Navbar.Collapse id={"basic-navbar-nav"}>
                    {!showAuthenticated && (
                        <Nav className={"me-auto"}>
                            <NavDropdown
                                title={<><FontAwesomeIcon icon={faFolder} className={"me-2"} />{t("navbar.projects")}</>}
                                id={"project-dropdown"}
                                show={isProjectDropdownOpen}
                                onToggle={(isOpen: boolean): void => setIsProjectDropdownOpen(isOpen)}
                            >
                                <NavDropdown.Item as={Link} href={"/smoking-tracker"} onClick={closeAll}>
                                    <Image src={SmokingLogo70} alt={t("projects.smoking-tracker.alt")}
                                           width={25} height={25} className={"me-2 mb-1"}/>
                                    <span>{t("projects.smoking-tracker.title")}</span>
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} href={"/card-generator"} onClick={closeAll}>
                                    <Image src={CardLogo70} alt={t("projects.card-generator.alt")}
                                           width={25} height={25} className={"me-2 mb-1"}/>
                                    {t("projects.card-generator.title")}
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    )}

                    <Nav className={"ms-auto"}>
                        <NavDropdown
                            id={"settings-dropdown"}
                            title={<><FontAwesomeIcon icon={faCog} className={"me-2"}/>{t("navbar.settings")}</>}
                            align={"end"}
                            show={isSettingsDropdownOpen}
                            onToggle={(isOpen: boolean): void => setIsSettingsDropdownOpen(isOpen)}
                        >
                            <NavDropdown
                                id={"language-dropdown"}
                                title={<><FontAwesomeIcon icon={faGlobe} className={"me-2"}/>{t("navbar.language")}</>}
                                drop={"start"}
                                show={isLanguageDropdownOpen}
                                onToggle={(isOpen: boolean): void => setIsLanguageDropdownOpen(isOpen)}
                            >
                                <NavDropdown.Item onClick={(): void => changeLocale("en")}>English</NavDropdown.Item>
                                <NavDropdown.Item onClick={(): void => changeLocale("sl")}>Slovenščina</NavDropdown.Item>
                            </NavDropdown>
                            {showAuthenticated && (
                                <NavDropdown.Item onClick={handleLogout}>
                                    <FontAwesomeIcon icon={faRightFromBracket} className={"me-2"}/> Logout
                                </NavDropdown.Item>
                            )}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
