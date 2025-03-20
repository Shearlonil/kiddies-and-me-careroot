import React from "react";
import HeroComp from "../Components/HeroComp";
import IMAGES from "../assets/images";
import { Button, Col, Row } from "react-bootstrap";
import AnimatedCard from "../Components/AnimatedCard";
import {
    FcBbc,
    FcBinoculars,
    FcBookmark,
    FcBullish,
    FcCloth,
    FcIdea,
} from "react-icons/fc";

const About = () => {
    return (
        <>
            <HeroComp heroImage={IMAGES.ai_children}>
                <div>
                    <h3 className="display-4 fw-bold">About the Foundation</h3>
                </div>
            </HeroComp>

            <div className="container my-5 p-3">
                <div className="row g-4">
                    <div className="col-md-6 order-1 order-md-0">
                        <img
                            className="align-self-stretch"
                            src={IMAGES.preg_4}
                            alt=""
                            style={{
                                width: "100%",
                                height:
                                  "auto" /* Let height scale automatically to preserve aspect ratio */,
                                //maxHeight: "400px" /* Limit maximum height */,
                                objectFit: "cover" /* Ensure image covers container area */,
                            }}
                        />
                    </div>

                    <div className="col-md-6 order-0 order-md-1">
                        <h3 className="display-5 fw-bold">Our History</h3>
                        <p>
                            Kiddies & Me CareRoot CIC is a non-profit organisation committed to supporting mothers, including pregnant women, new mums, single
                            or married, and their children including those with special educational needs (SEND), In Medway and it's surroundings. We aim to reach
                            out to many families in the community to provide them with more support to cater for their needs and improve their lifestyle.
                        </p>
                        <p>
                            Initially, the focus is on providing baisc food and essentials to families with low income or limited support from family and friends.
                            The organization aims to offer basic essentials, introduce mother and baby care programs, and conduct kids' activity sessions that
                            include educational programs for children and vocational training for adults. The goal is to empower individuals, promote friendships,
                            and strengthen community connections. In the coming years, we plan to extend our support to all communities in Medway, Kent, and other
                            parts of the UK.
                        </p>
                        <p>
                            Our motto, "You are not alone. Let's build a brighter future together", reflects our aim for Medway to become a community that other
                            areas can look to as a shining example of love, care and support.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container">
                <Row className="mb-5 justify-content-center g-4">
                    <Col className="d-flex gap-3" xs={12} md={6} lg={4}>
                        <div>
                          <FcIdea size={"40"} />
                        </div>
                        <div>
                            <h2>Our Mission</h2>
                            <p>
                                Our mission is to empower and uplift communities through
                                charitable work, providing essential resources and support for those in need.
                                We strive to create lasting change through our initiatives, promoting a better future for everyone
                            </p>
                        </div>
                    </Col>
                    <Col className="d-flex gap-3" xs={12} md={6} lg={4}>
                        <div>
                            <FcBullish size={"40"} />
                        </div>
                        <div>
                            <h2>Our Vision</h2>
                            <p>
                                We envision a world where everyone, irrespective of their background, has the opportunity to thrive.
                                Through collaboration and empathy, we are dedicated to improving the world for all.
                            </p>
                        </div>
                    </Col>
                    <Col className="d-flex gap-3" xs={12} md={6} lg={4}>
                        <div>
                            <FcBookmark size={"40"} />
                        </div>
                        <div>
                            <h2>Our Story</h2>
                            <p>
                                Founded in 2024, our foundation was established to address the needs of marginalized communities. We aspire for our grassroots
                                initiative to grow into a global movement, aiming to reach thousands of people each year. Through partnerships, advocacy and 
                                direct efforts on the ground, we will continue to expand our impact around the world.
                            </p>
                        </div>
                    </Col>
                </Row>
            </div>

            <div className="container">
                <h3 className="display-6 text-center mb-4">Leadership</h3>
                <Row>
                    <Col xs={12} sm={6} md={4} lg={6} className="mb-4">
                        <AnimatedCard>
                            <div className="volunteer-img-container">
                                <img src={IMAGES.liz_one} className="volunteer-img" />
                            </div>
                            <div className="d-flex flex-column" style={{minHeight: '185px'}}>
                                <h4>Olajumoke Elizabeth Falanwo</h4>
                                <p>Founder</p>
                                <p>
                                    Olajumoke Elizabeth Falanwo established Kiddies & Me Careroot CIC in 2024 to support new mothers and children in Medway, Uk.
                                    Liz, as she prefers to be called, envisions reaching out to as many mothers as possible, including new moms and pregnant women,
                                    as well as children with or without siblings
                                </p>
                            </div>
                        </AnimatedCard>
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={6} className="mb-4">
                        <AnimatedCard>
                            <div className="volunteer-img-container">
                                <img src={IMAGES.donald} className="volunteer-img" />
                            </div>
                            <div className="d-flex flex-column" style={{minHeight: '185px'}}>
                                <h4>Donald Wigwe</h4>
                                <p>Co-Founder</p>
                                <p>
                                    Donald is fascinated in helping others. for his love for helping people, he named his daughter CHARITY.
                                </p>
                            </div>
                        </AnimatedCard>
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={6} className="mb-4">
                        <AnimatedCard>
                            <div className="volunteer-img-container">
                                <img src={IMAGES.kay} className="volunteer-img" />
                            </div>
                            <div className="d-flex flex-column" style={{minHeight: '185px'}}>
                                <h4>Olukayode Tayo Olaniyan</h4>
                                <p>Co-Founder</p>
                                <p>
                                    Kay as he likes to be called owns a partner charity organisation that supports widows and women and children in needs.
                                    He has happily partners with our newly founded organisation to reach as many families as possible
                                </p>
                            </div>
                        </AnimatedCard>
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default About;
