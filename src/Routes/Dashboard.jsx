import React from "react";
import { Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FiUpload } from "react-icons/fi";
import { useAuth } from "../app-context/auth-user-context";

import IMAGES from "../assets/images";

const Dashboard = () => {
	const navigate = useNavigate();

    const { authUser } = useAuth();
    const user = authUser();

	return (
		<div className="container py-3">
			<h1 className="text-danger display-5 paytone-one">Hello <span className="text-info"> {user.firstName}</span> </h1>
			<hr className="my-4" />
			<div className="d-flex flex-column gap-4">
				<Card className="py-3 px-2 gap-3 shadow-sm bg-light d-flex flex-column flex-md-row justify-content-around align-items-md-center">
					<div className="text-center">
						<img
							style={{ maxWidth: "300px", width: "100%" }}
							src={IMAGES.dash_one}
							alt=""
						/>
					</div>
					<div className="px-3 gap-3 d-flex flex-column ">
						<h2 className="display-6 paytone-one">Registrants</h2>
						<Link className="btn btn-secondary fs-5" to={"registrants"}>
							View
						</Link>
					</div>
				</Card>
				<Card className="py-3 px-2 gap-3 shadow-sm bg-warning-subtle d-flex flex-column flex-md-row justify-content-around align-items-md-center">
					<div className="text-center">
						<img
							style={{ maxWidth: "300px", width: "100%" }}
							src={IMAGES.dash_two}
							alt=""
						/>
					</div>
					<div className="px-3 gap-3 d-flex flex-column">
						<h2 className="display-6 paytone-one">Events</h2>
						<Link className="btn btn-warning fs-5" to={"events/create"}>
							Create
						</Link>
						<Link className="btn btn-warning fs-5" to={"parents"}>
							View
						</Link>
					</div>
				</Card>
				<Card className="py-3 px-2 gap-3 shadow-sm bg-light d-flex flex-column flex-md-row justify-content-around align-items-md-center">
					<div className="px-3 gap-3 d-flex flex-column order-1 order-md-0">
						<h2 className="display-6 paytone-one">Change Password</h2>
						<Link className="btn btn-primary fs-5" to={"password"}>
							Change Password
						</Link>
					</div>
					<div className="order-0 order-md-1 text-center">
						<img
							style={{ maxWidth: "300px", width: "100%" }}
							src={IMAGES.authentication}
							alt=""
						/>
					</div>
				</Card>
				{/* <Card className="py-3 px-2 gap-3 shadow-sm bg-info-subtle d-flex flex-column flex-md-row justify-content-around align-items-md-center">
					<div>
						<img
							style={{ maxWidth: "300px", width: "100%" }}
							src={IMAGES.dashboard_img_3}
							alt=""
						/>
					</div>
					<div className="px-3 d-flex gap-3 flex-column order-1 order-md-0">
						<h2 className="display-6 paytone-one">Gallery</h2>{" "}
						<Link className="btn btn-info fs-5" to={"gallery"}>
							View
						</Link>
						<button className="d-flex justify-content-between gap-2 btn btn-outline-dark btn-lg rounded-1" 
							onClick={() => navigate('/dashboard/gallery/upload')}>
							Upload
							<FiUpload />
						</button>
					</div>
				</Card> */}
			</div>
		</div>
	);
};

export default Dashboard;
