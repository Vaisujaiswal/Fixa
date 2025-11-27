

import React, { useContext } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { motion } from "framer-motion";

const BannerSlider = () => {
  const navigate = useNavigate();
  const { darkMode } = useContext(AppContext);

  const banners = [
    {
      title: "Your Trusted Home Services, Just a Click Away!",
      subtitle: "Fast, reliable, and professional services at your doorstep.",
      cta: "Book Now",
      image: assets.banner1,
      ctaLink: "/services",
    },
    {
      title: "Reliable Professionals at Your Doorstep",
      subtitle: "Hire verified electricians, plumbers, and more instantly.",
      cta: "Explore Services",
      image: assets.banner2,
      ctaLink: "/services",
    },
    {
      title: "Fast & Easy Booking for All Your Needs",
      subtitle: "Get home services anytime, anywhere with just one click.",
      cta: "Get Started",
      image: assets.banner3,
      ctaLink: "/services",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
    fade: true,
  };

  const textMotion = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1, ease: "easeOut" },
  };

  const buttonMotion = {
    whileHover: { scale: 1.05, boxShadow: "0px 5px 15px rgba(0,0,0,0.3)" },
    transition: { duration: 0.3 },
  };

  return (
    <div className="w-full relative">
      <Slider {...settings}>
        {banners.map((banner, idx) => (
          <div key={idx} className="px-4 sm:px-10">
            <div
              className={`sm:h-[70vh] relative w-full rounded-2xl p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 transition-all duration-1000 overflow-hidden ${
                darkMode
                  ? "bg-gradient-to-r from-gray-700 via-gray-900 to-gray-800 text-white shadow-xl"
                  : "bg-gradient-to-r from-blue-500 via-indigo-700 to-purple-700 text-white shadow-2xl"
              }`}
            >
              {/* Text Section */}
              <motion.div
                className="flex-1 space-y-4 z-10"
                initial="initial"
                animate="animate"
                variants={textMotion}
              >
                <h1 className="text-3xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
                  {banner.title}
                </h1>
                <p className="text-md sm:text-lg text-white/90">
                  {banner.subtitle}
                </p>
                <motion.button
                  onClick={() => navigate(banner.ctaLink)}
                  className="px-6 py-3 rounded-full bg-yellow-400 dark:bg-yellow-500 text-gray-900 dark:text-gray-900 font-semibold"
                  whileHover={buttonMotion.whileHover}
                  transition={buttonMotion.transition}
                >
                  {banner.cta}
                </motion.button>
              </motion.div>

              {/* Image Section */}
              <motion.div
                className="flex-1 relative overflow-hidden rounded-xl"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
              >
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-auto object-cover rounded-xl transform transition-transform duration-1000 hover:scale-105"
                />
                {/* Gradient overlay for readability */}
                <div className="absolute inset-0 bg-black/20 rounded-xl pointer-events-none"></div>
              </motion.div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Custom slick dots color */}
      <style>
        {`
          .slick-dots li button:before {
            color: ${darkMode ? "white" : "white"};
            opacity: 0.8;
          }
          .slick-dots li.slick-active button:before {
            color: ${darkMode ? "#facc15" : "#fbbf24"};
          }
        `}
      </style>
    </div>
  );
};

export default BannerSlider;
