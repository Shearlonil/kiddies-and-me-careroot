import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { CiSettings } from "react-icons/ci";

import HeroComp from "../Components/HeroComp";
import AnimatedCard from "../Components/AnimatedCard";
import { Wrapper } from "../Styles/Home";
import IMAGES from "../assets/images";

const Home = () => {
    const navigate = useNavigate();

    return (
        <Wrapper>
            <HeroComp heroImage={IMAGES.black_mother_and_child}>
                <h3 className="display-3 fw-bold">You Are Not Alone.</h3>
                <p className="lead">
                    Let's Build a Brighter Future Together. <br />
                </p>
                <div className="btn-div d-inline-block">
                    <Button className="donate-btn btn-lg px-5 py-3 rounded-1" onClick={() => window.open(`https://wa.me/+447309400863`, '_blank')?.focus()}>
                        Chat With Us
                    </Button>
                </div>
            </HeroComp>
            {/*  */}
            <div
              className="d-flex align-items-center justify-content-center container mb-5 p-3"
              id="section-2"
            >
                <div className="d-flex flex-column flex-md-row align-items-sm-center justify-content-around gap-3 w-100">
                    <p className="p-0 m-0 h3 text-white">Join our great community</p>
                    <div className="btn-div">
                        <Button variant="outline-light" className="rounded-0 btn-lg" onClick={() => navigate('/on-boarding')}>
                            Register
                        </Button>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="container mx-auto" id="section-3">
                <div className="my-5 py-3 text-center mx-auto child-1">
                    <h6 style={{ color: "var(--primary-color)" }}>What we are doing</h6>
                    <h1 className="display-5 fw-bold">
                        Supporting Mums and Kids
                    </h1>
                </div>
                <div className="row child-2 g-3">
                    <div className="col-12 col-sm-6 col-md-4 d-flex justify-content-center" >
                        <div className="p-4 d-flex flex-column justify-content-center gap-4 text-center rounded-3">
                            <div className="rounded-circle d-inline-block d-flex align-items-center justify-content-center mx-auto" style={{width: '130px', height: '130px'}}>
                                <img src={IMAGES.preg_2} className="w-100 h-100 rounded-circle" />
                            </div>
                            <h4>Prenatal Care</h4>
                            <p>
                                Good prenatal care includes good nutrition and health habits before and during pregnancy.
                            </p>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 d-flex justify-content-center" >
                        <div className="p-4 d-flex flex-column justify-content-center gap-4 text-center rounded-3">
                            <div className="rounded-circle d-inline-block d-flex align-items-center justify-content-center mx-auto" style={{width: '110px', height: '110px'}}>
                                <img src={IMAGES.preg_woman_and_child} className="w-100 h-100 rounded-circle" />
                            </div>
                            <h4>After Child Birth</h4>
                            <p> 
                                First few weeks after delivery can be exciting and also challenging for new mums. 
                                Having the right support and care reduce the stress they face after delivery.
                            </p>
                        </div>
                    </div>
                    <div className="col-12 col-sm-6 col-md-4 d-flex justify-content-center" >
                        <div className="p-4 d-flex flex-column justify-content-center gap-4 text-center rounded-3">
                            <div className="rounded-circle d-inline-block d-flex align-items-center justify-content-center mx-auto" style={{width: '110px', height: '110px'}}>
                                <img src={IMAGES.ai_baby} className="w-100 h-100 rounded-circle" />
                            </div>
                            <h4>Babies</h4>
                            <p>
                                Having a baby is an exciting and wonderful experience. It is also stressful for mothers.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="my-5 text-white" id="section-4">
                <div className="container-fluid">
                    <div className="row child-1">
                        <div className="col-md-6 p-0 m-0">
                            <img
                                className=""
                                src={IMAGES.preg_3}
                                width={"100%"}
                                height={"100%"}
                                alt=""
                            />
                        </div>
                        <div className="col-md-6 d-flex align-items-center p-3 p-md-5 py-5">
                            <div className="p-md-5">
                                <h3 className="display-5 fw-bold mb-4">
                                  Are you pregnant or <br />Do you have young children?
                                </h3>
                                <h4 className="fw-bold mb-4">Struggling Financially?</h4>
                                <p>
                                    Join us for a comprehensive support program designed specifically for
                                    parents in the Medway area facing financial challenges
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*  */}

            <div id="volunteer-section" className="container py-5">
                <div className="text-center mb-4">
                    <h6 style={{ color: "var(--primary-color)" }}>What We Are Doing</h6>
                    <h2 className="display-5 fw-bold">
                        Support for Parents in Need
                    </h2>
                    <p className="mb-3">
                        We are here to help! Our services include:
                    </p>
                </div>
                <Row className="text-center">
                    <Col xs={12} sm={6} md={4} lg={6} className="mb-4">
                        <AnimatedCard>
                            <div className="volunteer-img-container">
                                <img src={IMAGES.child_temperature} className="volunteer-img" />
                            </div>
                            <div className="d-flex flex-column align-items-center">
                                <h4 className="btn-outline px-5 py-3 rounded-1 link-success">Health</h4>
                                <ul className="text-start w-75">
                                    <li>Access to affordable prenantal and pediatric care</li>
                                    <li>Free health check-ups</li>
                                </ul>
                            </div>
                        </AnimatedCard>
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={6} className="mb-4">
                        <AnimatedCard>
                            <div className="volunteer-img-container">
                                <img src={IMAGES.coounseling} className="volunteer-img" />
                            </div>
                            <div>
                                <div className="d-flex flex-column align-items-center">
                                    <h4 className="btn-outline px-5 py-3 rounded-1 link-danger">Counseling</h4>
                                    <ul className="text-start w-75">
                                        <li>Access to counseling and mental health services</li>
                                        <li>Nutritional support and advice</li>
                                    </ul>
                                </div>
                            </div>
                        </AnimatedCard>
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={6} className="mb-4">
                        <AnimatedCard>
                            <div className="volunteer-img-container">
                                <img src={IMAGES.emotional} className="volunteer-img" />
                            </div>
                            <div className="d-flex flex-column align-items-center">
                                <h4 className="btn-outline px-5 py-3 rounded-1 link-primary">Emotional and Mental Health</h4>
                                <p>Stress and anxiety management workshops</p>
                            </div>
                        </AnimatedCard>
                    </Col>
                    <Col xs={12} sm={6} md={4} lg={6} className="mb-4">
                        <AnimatedCard>
                            <div className="volunteer-img-container">
                                <img src={IMAGES.group_support} className="volunteer-img" />
                            </div>
                            <div className="d-flex flex-column align-items-center">
                                <h4 className="btn-outline px-5 py-3 rounded-1 link-success">Group Support</h4>
                                <ul className="text-start w-75">
                                    <li>Parenting support groups</li>
                                    <li>Connecting with other parents</li>
                                </ul>
                            </div>
                        </AnimatedCard>
                    </Col>
                </Row>
            </div>
        </Wrapper>
    );
};

export default Home;
