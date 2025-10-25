import React, { type JSX } from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer: React.FC = (): JSX.Element => {

    const currentYear: number = new Date().getFullYear();

    return (
        <footer className={"footer border-top mt-auto py-3"}>
            <Container fluid>
                <Row className={"align-items-center justify-content-center text-center"}>
                    <Col xs={12}>
                        <span className={"footer-text"}>
                            © {currentYear} - Gašper Pintar
                        </span>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
