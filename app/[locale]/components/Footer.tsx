"use client";

import React, { type JSX } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer: React.FC = (): JSX.Element => {

    const currentYear: number = new Date().getFullYear();
    const pathname: string | null = usePathname();

    const visibleFooterRoutes: string[] = [
        "/smoking-tracker",
        "/card-generator"
    ];

    const isFooterLinksVisible: boolean = pathname ? visibleFooterRoutes.includes(pathname) : false;

    return (
        <footer className={"footer border-top mt-auto py-3"}>
            <Container fluid>
                <Row className={"align-items-center justify-content-center text-center"}>
                    <Col xs={12}>
                        <span className={"footer-text"}>
                            © {currentYear} - Gašper Pintar
                        </span>
                    </Col>

                    {isFooterLinksVisible && (
                        <Col
                            xs={12}
                            className={"d-flex justify-content-center mt-2"}
                        >
                            <Link
                                href={`${pathname}/terms-of-service`}
                                className={"footer-link me-3"}
                            >
                                Terms of Service
                            </Link>
                            <Link
                                href={`${pathname}/privacy-policy`}
                                className={"footer-link"}
                            >
                                Privacy Policy
                            </Link>
                        </Col>
                    )}
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
