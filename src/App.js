import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes } from "react-router";

// components
import Connect from "./components/pages/connect/Connect";
import FaqSection from "./components/pages/faq/FaqSection";
import Home from "./components/home/Home";
import NavigationBar from "./components/navigation/NavigationBar";
import Partners from "./components/pages/partners/Partners";
import Register from "./components/pages/register/Register";
import Services from "./components/pages/services/Services";

// styles
import "./App.css";
import { AboutUs } from "./components/pages/about/AboutUs";

export default function App() {
  return (
    <>
      <Router>
        <NavigationBar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/faq" element={<FaqSection />} />
          <Route
            id="connect"
            path="/connect"
            element={<Connect page={true} />}
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}
