
import React from "react";
import { NavLink } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaGlobe } from "react-icons/fa";
import ScrollNavLink from "../ScrollNavLink";
import { FaPhone } from "react-icons/fa6";
import { AiTwotoneMail } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="mt-20 px-6 py-12 md:px-16 lg:px-24 bg-white text-gray-700 border-t border-gray-200 shadow-sm 
                       dark:bg-gray-950 dark:text-gray-300 dark:border-gray-700 transition-colors duration-300">

      {/* Main Sections */}
      <div className="flex flex-col md:flex-row justify-between gap-10">

        {/* Left Section */}
        <div className="md:w-1/3">
          <NavLink to='/'><span className='text-primary font-bold md:text-4xl text-2xl'>FIXA</span></NavLink>
          <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 mt-5">
            Fixa helps you connect with trusted professionals — from home repairs
            to digital services. Quick, reliable, and hassle-free booking at your fingertips.
          </p>
        </div>

        {/* Center Section */}
        <div>
          <p className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Company</p>
          <ul className="space-y-2 text-sm">
            <ScrollNavLink  to='/'><li className="cursor-pointer hover:text-primary transition duration-300">Home</li></ScrollNavLink >
            <ScrollNavLink  to='/services'><li className="cursor-pointer hover:text-primary transition duration-300">Services</li></ScrollNavLink >
            <ScrollNavLink  to='/contact'><li className="cursor-pointer hover:text-primary transition duration-300">Contact Us</li></ScrollNavLink >
            <ScrollNavLink  to='/about'><li className="cursor-pointer hover:text-primary transition duration-300">About Us</li></ScrollNavLink >
          </ul>
        </div>

        {/* Right Section */}
        <div>
          <p className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Get in Touch</p>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-center gap-2"><FaPhone className="text-blue-500" /> +91-123-456-3450</li>
            <li className="flex items-center gap-2"><AiTwotoneMail className="text-red-500" /> vaishnavijaiswal707@gmail.com</li>
          </ul>

          {/* Social Media */}
          <div className="flex gap-4 mt-4 text-xl">
            <a href="https://www.linkedin.com/in/vaishnavi-rajesh-jaiswal-991322314/" target="blank" className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition"><FaGlobe /></a>
            <a href="https://www.linkedin.com/in/vaishnavi-rajesh-jaiswal-991322314/" target="blank"  className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition"><FaTwitter /></a>
            <a href="https://www.linkedin.com/in/vaishnavi-rajesh-jaiswal-991322314/" target="blank"  className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition"><FaFacebookF /></a>
            <a href="https://www.linkedin.com/in/vaishnavi-rajesh-jaiswal-991322314/" target="blank"  className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Divider + Copyright */}
      <div className="mt-10 border-t border-gray-300 dark:border-gray-700 pt-4 text-center text-xs text-gray-500 dark:text-gray-400 ">
        <p className="hover:text-primary">© 2025 Fixa — All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;

