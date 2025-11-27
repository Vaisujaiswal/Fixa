
import React from 'react';
import { useLocation, Route, Routes } from "react-router-dom";

import Home from './pages/Home';
import Services from './pages/Services';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import About from './pages/About';
import Contact from './pages/Contact';
import MyProfile from './pages/MyProfile';
import MyBooking from './pages/MyBooking';
import Booking from './pages/Booking';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AnimatePresence } from "framer-motion";


const App = () => {
  const location = useLocation();
  return (
     <AnimatePresence mode="wait">
    <div>
      <ToastContainer />
      <Routes>

        <Route element={<MainLayout />}  location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/service/:speciality" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/my-profile" element={<MyProfile />} />
          <Route path="/my-booking" element={<MyBooking />} />
          <Route path="/booking/:proId" element={<Booking />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>
      </Routes>
    </div>
    </AnimatePresence>
  );
};

export default App;
