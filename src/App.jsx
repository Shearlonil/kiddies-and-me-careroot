import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./Routes/Home";
import NavBar from "./Components/Navbar.jsx";
import About from "./Routes/About.jsx";
import Footer from "./Components/Footer.jsx";
import Registration from "./Routes/Registration.jsx";

function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route index path="/" element={<Home />} />
                <Route index path="about" element={<About />} />
                <Route index path="on-boarding" element={<Registration />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
