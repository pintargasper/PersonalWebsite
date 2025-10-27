"use client";

import React, { JSX, useState, type RefObject, useRef, MouseEvent, useEffect } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faGlobe, faMoon, faFolder } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";

import SmokingLogo70 from "@/public/images/projects/smoking-tracker/logo_70x70.webp";
import CardLogo70 from "@/public/images/projects/card-generator/logo_70x70.webp";

const Navigation: React.FC = (): JSX.Element => {

    const [isNavbarExpanded, setIsNavbarExpanded] = useState<boolean>(false);
    const [isProjectDropdownOpen, setIsProjectDropdownOpen] = useState<boolean>(false);
    const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState<boolean>(false);
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState<boolean>(false);

    const navbarRef: RefObject<HTMLDivElement | null> = useRef<HTMLDivElement | null>(null);

    const handleClickOutside: (event: MouseEvent<Document>) => void = (event: MouseEvent<Document>): void => {
        if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
            setIsProjectDropdownOpen(false);
            setIsSettingsDropdownOpen(false);
            setIsLanguageDropdownOpen(false);
        }
    };

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
                <Navbar.Brand as={Link} href={"/"}>Home</Navbar.Brand>

                <Navbar.Toggle
                    aria-controls={"basic-navbar-nav"}
                    onClick={(): void => setIsNavbarExpanded((previous: boolean): boolean => !previous)}
                    className={"no-outline"}
                />

                <Navbar.Collapse id={"basic-navbar-nav"}>
                    <Nav className={"me-auto"}>
                        <NavDropdown
                            title={<><FontAwesomeIcon icon={faFolder} className={"me-2"} />Project</>}
                            id={"project-dropdown"}
                            show={isProjectDropdownOpen}
                            onClick={(): void => setIsProjectDropdownOpen((previous: boolean): boolean => !previous)}
                        >
                            <NavDropdown.Item as={Link} href={"/smoking-tracker"}>
                                <Image src={SmokingLogo70} alt={"Smoking Tracker logo"} width={25} height={25} className={"me-2 mb-1"} />
                                <span>Smoking Tracker</span>
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} href={"/card-generator"}>
                                <Image src={CardLogo70} alt={"Smoking Tracker logo"} width={25} height={25} className={"me-2 mb-1"} />
                                Card Generator
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                    {/*<Nav className={"ms-auto"}>
                        <NavDropdown
                            id={"settings-dropdown"}
                            title={<><FontAwesomeIcon icon={faCog} className={"me-2"} />Settings</>}
                            align={"end"}
                            show={isSettingsDropdownOpen}
                            onClick={(): void => {
                                setIsSettingsDropdownOpen((previous: boolean): boolean => !previous);
                                setIsLanguageDropdownOpen(false);
                            }}
                        >
                            <NavDropdown
                                id={"language-dropdown"}
                                title={<><FontAwesomeIcon icon={faGlobe} className={"me-2"} />Language</>}
                                drop={"start"}
                                show={isLanguageDropdownOpen}
                                onClick={(event: MouseEvent<HTMLDivElement>): void => {
                                    event.stopPropagation();
                                    setIsLanguageDropdownOpen((previous: boolean): boolean => !previous);
                                }}
                            >
                                <NavDropdown.Item href={"#english"}>English</NavDropdown.Item>
                                <NavDropdown.Item href={"#slovenian"}>Slovenščina</NavDropdown.Item>
                            </NavDropdown>

                            <NavDropdown.Item href={"#theme"}>
                                <FontAwesomeIcon icon={faMoon} className={"me-2"} />
                                Dark
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>*/}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
