import { useState } from "react";
import { Route, Routes } from "react-router-dom";

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
					<Route path="/dashboard/password" element={<ChangePassword />} />
					{/* <Route path="/dashboard/gallery/upload" element={<ImageUpload />} /> */}
					{/* Applicant */}
					{/* <Route path="/dashboard/applicants" element={<ApplicantLists />} /> */}
					{/* <Route path="/dashboard/applicants/details/:id" element={<ViewApplicantDetails />} /> */}
					{/* Parents */}
					<Route path="/dashboard/registrants" element={<RegistrantLists />} />
					{/* <Route path="/dashboard/parents/details/:id" element={<ViewParentDetails />} /> */}
					<Route index element={<Dashboard />} />
				</Route>		
            </Routes>
			<ToastContainer />
            <Footer />
        </>
    );
}

export default App;
