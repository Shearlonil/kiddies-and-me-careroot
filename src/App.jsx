import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import "react-datetime/css/react-datetime.css";
import "react-loading-skeleton/dist/skeleton.css";

import Home from "./Routes/Home";
import NavBar from "./Components/Navbar.jsx";
import About from "./Routes/About.jsx";
import Footer from "./Components/Footer.jsx";
import Registration from "./Routes/Registration.jsx";
import { ProtectedRoute } from './Routes/ProtectedRoute';
import Login from "./Routes/Login.jsx";
import { ToastContainer } from "react-toastify";
import RegistrantLists from "./Routes/Dashboard/RegistrantList.jsx";
import ChangePassword from "./Routes/Dashboard/ChangePassword.jsx";
import EventCreation from "./Routes/Dashboard/EventCreation.jsx";
import Dashboard from "./Routes/Dashboard/Dashboard.jsx";
import Events from "./Routes/Events.jsx";
import AdminEventsView from "./Routes/Dashboard/AdminEventsView.jsx";
import EventUpdate from "./Routes/Dashboard/EventUpdate.jsx";

function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route index path="/" element={<Home />} />
                <Route index path="about" element={<About />} />
                <Route index path="on-boarding" element={<Registration />} />
                <Route index path="events" element={<Events />} />

				{/* Login */}
				<Route path="/login" element={<Login />} />

				{/* Dashboard */}
				<Route path="/dashboard" element={<ProtectedRoute />}>
					<Route path="password" element={<ChangePassword />} />
					{/* <Route path="/dashboard/gallery/upload" element={<ImageUpload />} /> */}
					{/* Applicant */}
					{/* <Route path="/dashboard/applicants" element={<ApplicantLists />} /> */}
					{/* <Route path="/dashboard/applicants/details/:id" element={<ViewApplicantDetails />} /> */}
					{/* Parents */}
					<Route path="registrants" element={<RegistrantLists />} />
					<Route path="events">
						<Route path="create" element={<EventCreation />} />
						<Route path="all" element={<AdminEventsView />} />
						<Route path=":id/view" element={<EventUpdate />} />
					</Route>
					<Route index element={<Dashboard />} />
				</Route>		
            </Routes>
			<ToastContainer />
            <Footer />
        </>
    );
}

export default App;
