import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import IMAGES from "../assets/images";
import AnimatedCard from "../Components/AnimatedCard";
import { FaClock } from "react-icons/fa6";
import { FcCalendar } from "react-icons/fc";
import { MdLocationPin } from "react-icons/md";

const events = [
    {
        title: "Support for Parents in Need",
        date: "June - 7th, 14th, 21st,28th",
        location: " Davis Estate Community Centre (DERAC) Barberry Ave, Chatham. Me5 9te.",
        time: "1.30 pm - 5.30pm",
        image: IMAGES.image_1,
    },
    {
        title: "Community Mental Health Workshop",
        date: "March 20, 2025",
        location: " Local Community Center",
        time: "1.30 pm - 5.30pm",
        image: IMAGES.image_2,
    },
    {
        title: "Nutrition & Wellness Seminar",
        date: "May- 3rd, 10th, 17th, 24th and 31st",
        location: " Maidstone",
        time: "1.30 pm - 5.30pm",
        image: IMAGES.image_3,
    },
];

const Events = () => {
    return (
        <Container className="py-5">
            <h2 className="text-center mb-4">Upcoming Events</h2>
            <Row className="g-4">
                {events.map((event, index) => (
                    <Col key={index} md={6} lg={4}>
                        <AnimatedCard>
                            <Card className="shadow-sm border-0"  style={{ height: "550px", maxHeight: "600px" }} >
                                <Card.Img height={"270px"} variant="top" src={event.image} alt={event.title} />
                                <Card.Body className="d-flex flex-column justify-content-around">
                                    <Card.Title>{event.title}</Card.Title>
                                    <Card.Text>
                                        <strong>
                                            <FcCalendar className="me-1" /> {event.date}
                                        </strong>
                                        <br />
                                        <span>
                                            <MdLocationPin className="me-1" />
                                            {event.location}
                                        </span>{" "}
                                        <br />
                                        <span>
                                            <FaClock className="me-1" />
                                            {event.time}
                                        </span>
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <small clas>Parking ais available on the street.</small>
                                </Card.Footer>
                            </Card>
                        </AnimatedCard>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Events;
