

import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { MdOutlineArrowRightAlt, MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();


  const handleSearch = () => {
    if (searchTerm.trim() === "") return;

    // convert input into Title-Case and hyphenated
    const formattedSearch = searchTerm
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join("%20");

    navigate(`/service/${formattedSearch}`);
  };


  return (
    <div className="relative h-[90vh] flex items-center">
      {/* ---------- Background Image ---------- */}
      <img
        src={assets.header}
        alt="Hero"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* ---------- Content Overlay ---------- */}
      <div className="relative z-10 px-6 md:px-10 lg:px-20 w-full md:w-1/2 text-left">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight text-white">
          Book Services <br />
          <span className="text-primary">With Skilled Providers</span>
        </h1>

        <p className="text-gray-200 text-lg max-w-lg mt-4">
          From home repairs to digital solutions, Fixa connects you with
          <span className="font-semibold"> trusted professionals </span>
          in just a few clicks.
        </p>

        {/* Search Bar */}
        <div className="flex items-center bg-white/70 dark:bg-gray-700/40 backdrop-blur-lg 
                shadow-lg rounded-full px-4 py-2 max-w-lg mt-6 
                border border-gray-200/20 dark:border-gray-700/40">
          <MdSearch className="text-gray-700 text-xl dark:text-gray-300" />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search services (e.g. Plumber, Electrician)"
            className="flex-1 px-3 py-2 text-sm bg-transparent outline-none 
               text-gray-700 dark:text-gray-200 placeholder-gray-700 dark:placeholder-gray-300
               focus:ring-0 focus:outline-none"
          />

          <button
            onClick={handleSearch}
            className="w-full sm:w-auto relative overflow-hidden px-4 sm:px-6 py-2 rounded-full font-semibold text-white
             bg-gradient-to-r from-primary to-indigo-600
             shadow-md transition-all duration-500 ease-out
             hover:scale-105 hover:shadow-xl"
          >
            <span className="relative z-10">Search</span>
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-500 
                   -translate-x-full group-hover:translate-x-0 
                   transition-transform duration-500 ease-in-out rounded-full"></span>
          </button>

        </div>


        {/* CTA Button */}
        <div className="pt-6">
          <a
            href="#speciality"
            className="bg-primary text-white px-6 py-3 rounded-full transition duration-300 hover:scale-105 inline-flex gap-3 items-center shadow-lg hover:bg-gray-700"
          >
            Book Service
            <MdOutlineArrowRightAlt className="text-white text-xl" />
          </a>
        </div>
      </div>
    </div>
  );

};

export default Header;

