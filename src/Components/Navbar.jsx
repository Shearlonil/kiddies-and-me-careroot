import React, { useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAuth } from "../app-context/auth-user-context";
import { ThreeDotLoading } from "./Indicators";
import handleErrMsg from "../Utils/error-handler";
import IMAGES from "../assets/images";

const NavBar = () => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);

    const { authUser, logout } = useAuth();
    const user = authUser();

	const [isLoggingOut, setIsLoggingOut] = useState(false);

	const handleLogout = async () => {
		// call logout endpoint
		try {
			setIsLoggingOut(true);
			await logout();
			setIsLoggingOut(false);
		} catch (error) {
			// display error message
			toast.error(handleErrMsg(error).msg);
			setIsLoggingOut(false);
		}
	}

    const handleNavClick = () => {
      setExpanded(false); // Close navbar on menu click
    };

    return (
        <Navbar
            bg="light"
            sticky="top"
            expand="lg"
            expanded={expanded}
            className="shadow p-4"
        >
            <Container>
                <Navbar.Brand onClick={() => navigate("/")} className="d-flex">
                    <div className="d-md-block d-none">
                        <img className="me-2" src={IMAGES.logo} alt="" height="40" width={'40'} />
                    </div>
                    Kiddies&Me CareRoot CIC
                </Navbar.Brand>
                <Navbar.Toggle
                    aria-controls="basic-navbar-nav"
                    onClick={() => setExpanded(expanded ? false : true)}
                />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto d-flex gap-lg-3" onClick={handleNavClick}>
                        <Nav.Link onClick={() => navigate("/")}>Home</Nav.Link>
                        <Nav.Link onClick={() => navigate("about")}>About Us</Nav.Link>
                        <Nav.Link onClick={() => navigate("events")}>Events</Nav.Link>
                        {/* <Nav.Link>Contact</Nav.Link> */}
                        {user && <Nav.Link onClick={() => navigate("dashboard")}>Dashboard</Nav.Link>}
                    </Nav>
                    <div className="btn-div d-md-block d-none">
                        <Button className="donate-btn rounded-1 px-5 py-3 btn-lg" onClick={() => navigate('/on-boarding')}>
                            Register
                        </Button>
                    </div>

                    {user && ( <Nav.Link
                        className={`navbar-nav nav-item p-2 link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover fw-bold ${isLoggingOut && 'disabled'}`}
                        eventKey={8}
                        onClick={() => handleLogout()}
                    >
                        {isLoggingOut && <ThreeDotLoading variant="windmill" color="#f78419" size="small" />}
                        { !isLoggingOut && <span className="text-danger">Logout</span> }
                    </Nav.Link> )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
