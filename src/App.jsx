import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import "react-datetime/css/react-datetime.css";

import Home from "./Routes/Home";
import NavBar from "./Components/Navbar.jsx";
import About from "./Routes/About.jsx";
import Footer from "./Components/Footer.jsx";
import Registration from "./Routes/Registration.jsx";
import Dashboard from "./Routes/Dashboard.jsx";
import { ProtectedRoute } from './Routes/ProtectedRoute';
import Login from "./Routes/Login.jsx";
import { ToastContainer } from "react-toastify";
import RegistrantLists from "./Routes/RegistrantList.jsx";
import ChangePassword from "./Routes/ChangePassword.jsx";
import EventCreation from "./Routes/EventCreation.jsx";

function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route index path="/" element={<Home />} />
                <Route index path="about" element={<About />} />
                <Route index path="on-boarding" element={<Registration />} />

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
						<Route path=":id/view" element={<EventCreation />} />
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
