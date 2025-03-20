import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { BiPhone } from "react-icons/bi";
import { HiLocationMarker } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import IMAGES from "../assets/images";
import { useAuth } from "../app-context/auth-user-context";

const Footer = () => {

    const { getCurrentYear } = useAuth();

    return (
        <footer
            className="py-5"
            style={{
                backgroundColor: "var(--footer-bg)",
                color: "white",
            }}
        >
            <div className="container p-5 pb-0">
                <Row className="text-center text-md-left">
                    <Col md={4}>
                        <h3 className="">Kiddies & Me Careroot CIC</h3>
                        <img className="mb-4" src={IMAGES.logo} alt="" height="100" width={'50%'} />
                    </Col>

                    {/* About Us Column */}
                    <Col md={4} className="mb-4">
                        <h5>ABOUT US</h5>
                        <p>
                            Kiddies & Me CareRoot is a non-profit organization that provides adequate support for families
                        </p>
                        <p style={{ color: "#ff6f61" }}>
                            Let's Build a Brighter Future Together.
                        </p>
                    </Col>

                    {/* Get Connected Column */}
                    <Col md={4} className="mb-4">
                        <h5>GET CONNECTED</h5>
                        <div className="d-flex flex-column gap-2">
                            <p className="d-flex gap-2">
                                <HiLocationMarker size={20} />
                                <span className="fw-bold">Address:</span>69 Harptree Drive, Me5 Otf.
                            </p>
                            <p className="d-flex gap-2">
                                <BiPhone size={20} />
                                <span className="fw-bold">Phone:</span>07309400863
                            </p>
                            <p className="d-flex gap-2">
                                <MdEmail size={20} />
                                <span className="fw-bold">Email:</span>kiddies.mecareroot@yahoo.com
                            </p>
                        </div>
                    </Col>
                </Row>

                {/* Footer Bottom */}
                <div className="text-center mt-4" style={{ color: "#888" }}>
                    <p className="mb-3">&copy;{getCurrentYear()} All rights reserved | Kiddies&Me CareRoot CIC</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
