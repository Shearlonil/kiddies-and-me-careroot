import { Modal, Carousel, Button } from "react-bootstrap";
import IMAGES from "../assets/images";
import { HiLink } from "react-icons/hi";
import { FcCalendar, FcAlarmClock } from "react-icons/fc";
import { MdLocationPin } from "react-icons/md";
import { LiaTimesSolid } from "react-icons/lia";
import { useNavigate } from "react-router-dom";

const EventPopup = ({show, setShow, events}) => {
    const navigate = useNavigate();

    // const events = [
    //     {
    //         title: "Free Health Check-Up",
    //         date: "March 15, 2025 - 9 AM",
    //         location: "Community Center, Medway",
    //         link: "/events",
    //         image: IMAGES.image_1,
    //     },
    //     {
    //         title: "Parenting Workshop",
    //         date: "April 10, 2025 - 2 PM",
    //         location: "Local Library, London ",
    //         link: "/events",
    //         image: IMAGES.image_2,
    //     },
    //     {
    //         title: "Support for Parents in Need",
    //         date: "Every Saturday, 10 AM - 12 Noon",
    //         location: "Online Event",
    //         link: "/events",
    //         image: IMAGES.image_3,
    //     },
    // ];

    return (
        <Modal show={show} onHide={() => setShow(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>📢 Upcoming Events</Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-0">
                <Carousel interval={5000} indicators={true}>
                    {events?.map((event, index) => {
                        const eventDates = event.EventDates.map(eventDate => eventDate.date + ", ");
                        return <Carousel.Item key={index} style={{ minHeight: "300px" }} className="bg-dark ">
                            {/* <img src={event.image} className="d-block w-100" alt={event.title} style={{ maxHeight: "300px" }} /> */}
                            <Carousel.Caption className="bg-opacity-75 p-3 rounded">
                                <h5>{event.title}</h5>
                                <p>
                                    <FcCalendar className="me-1" /> {eventDates}
                                </p>
                                <p>
                                    <FcAlarmClock className="me-1" size={30} /> {event.time}
                                </p>
                                <p>
                                    <MdLocationPin className="me-1" />
                                    {event.venue}
                                </p>
                                <p>
                                    <Button className="btn btn-success" onClick={() => navigate('on-boarding')} >
                                        <HiLink /> Register
                                    </Button>
                                </p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    })}
                </Carousel>
            </Modal.Body>
        </Modal>
    );
};

export default EventPopup;
