import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import AnimatedCard from "../Components/AnimatedCard";
import { FaClock } from "react-icons/fa6";
import { FcCalendar } from "react-icons/fc";
import { MdLocationPin } from "react-icons/md";

import Skeleton from "react-loading-skeleton";
import IMAGES from "../../assets/images";
import eventController from "../../controllers/event-controller";

const AdminEventsView = () => {
    const imgs = [IMAGES.ai_children, IMAGES.preg_4, IMAGES.black_mother_and_child, IMAGES.coounseling, IMAGES.group_support, IMAGES.talking_counselor, IMAGES.logo]
    const [networkRequest, setNetworkRequest] = useState(false);
    const [events, setEvents] = useState([]);
    const [arr, setArr] = useState([]);

    useEffect(() => {
        initialize();
    }, []);

    const initialize = async () => {
        setNetworkRequest(true);
        const response = await eventController.fetchUpComing();

        if (response && response.data && response.data.length > 0) {
            setEvents(response.data);
            const set = new Set();
            while(set.size < response.data.length) {
                set.add(Math.floor(Math.random() * imgs.length))
            }
            setArr(Array.from(set));
            console.log(arr);
        }
        setNetworkRequest(false);
    };

    const buildSkeleton = () => {
        return new Array(1).fill(1).map((index) => (
            <Row className="g-4" key={Math.random()}>
                <Col key={index} md={6} lg={4}>
                    <AnimatedCard>
                        <Card className="shadow-sm border-0"  style={{ height: "550px", maxHeight: "600px" }} >
                            <Skeleton count={1} width={"100%"} height={"250px"} />
                            <Card.Body className="d-flex flex-column justify-content-around">
                                <Card.Title>
                                    <Skeleton count={1} width={"100%"} />
                                </Card.Title>
                                <Card.Text>
                                    <Skeleton count={3} width={"100%"} />
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <Skeleton count={1} width={"100%"} />
                            </Card.Footer>
                        </Card>
                    </AnimatedCard>
                </Col>
            </Row>
        ));
    };

    return (
        <Container className="py-5">
            <h2 className="text-center mb-4">Upcoming Events</h2>
            <Row className="g-4">
                {!networkRequest && events.map((event, index) => {
                    const eventDates = event.EventDates.map(eventDate => eventDate.date + " | ");
                    return <Col key={index} md={6} lg={4}>
                        <AnimatedCard>
                            <Card className="shadow-sm border-0"  style={{ height: "550px", maxHeight: "600px" }} >
                                <Card.Img height={"250px"} variant="top" src={imgs[arr[index]]} alt={event.title} />
                                <Card.Body className="d-flex flex-column justify-content-around">
                                    <Card.Title>{event.title}</Card.Title>
                                    <Card.Text>
                                        <strong className="mb-3">
                                            <FcCalendar className="me-1" /> {eventDates}
                                        </strong>
                                        <br />
                                        <br />
                                        <span>
                                            <MdLocationPin className="me-1" />
                                            {event.venue}
                                        </span>{" "}
                                        <br />
                                        <span>
                                            <FaClock className="me-1" />
                                            {event.time}
                                        </span>
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <Link to={`/on-boarding`}>Update</Link>
                                </Card.Footer>
                            </Card>
                        </AnimatedCard>
                    </Col>
                })}
                {networkRequest && buildSkeleton()}
            </Row>
        </Container>
    );
};

export default AdminEventsView;
