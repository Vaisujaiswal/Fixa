

import React from "react";
import { FaCode, FaLightbulb, FaLaptopCode, FaHeart } from "react-icons/fa";

const About = () => {
  return (
    <div className="bg-white dark:bg-gray-950 text-gray-800 dark:text-gray-200 px-6 py-12 md:px-20 lg:px-36 min-h-screen transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h1 className="text-3xl md:text-5xl font-bold mb-16 text-center text-primary">
          About Fixa
        </h1>

        {/* Intro Section */}
        <p className="text-lg leading-relaxed text-justify mb-8 text-gray-700 dark:text-gray-300">
          Welcome to <strong>Fixa</strong> — your trusted digital platform where
          customers connect with verified service providers effortlessly.
          Whether you need a reliable plumber, electrician, carpenter, tutor, or
          any skilled professional, <strong>Fixa</strong> makes it fast, safe,
          and simple to get the job done.
        </p>

        <p className="text-lg leading-relaxed text-justify mb-16 text-gray-700 dark:text-gray-300">
          Our goal is to empower both customers and professionals by creating a
          transparent ecosystem built on trust, convenience, and innovation. At
          Fixa, we believe that every service, no matter how small, deserves to
          be delivered with excellence.
        </p>

        {/* Mission & Vision Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-[0_4px_20px_rgba(59,96,252,0.5)] transition">
            <h3 className="text-xl font-semibold text-primary mb-2">
              Our Mission
            </h3>
            <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              To bridge the gap between skilled professionals and customers by
              providing a transparent, secure, and easy-to-use service platform.
            </p>
          </div>

          <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-[0_4px_20px_rgba(59,96,252,0.5)] transition">
            <h3 className="text-xl font-semibold text-primary mb-2">
              Our Vision
            </h3>
            <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              To become India’s most trusted online hub for daily services —
              connecting people, empowering professionals, and simplifying life.
            </p>
          </div>

          <div className="p-6 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-[0_4px_20px_rgba(59,96,252,0.5)] transition">
            <h3 className="text-xl font-semibold text-primary mb-2">
              What Makes Us Unique
            </h3>
            <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              Verified service providers, transparent pricing, fast booking,
              secure payments, and real user feedback make Fixa stand apart.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-20 border-t border-gray-300 dark:border-gray-700"></div>

        {/* Meet the Developer Section */}
        <h2 className="text-3xl font-bold text-center text-primary mb-10">
          Meet the Developer
        </h2>

        <div className="flex flex-col items-center text-center space-y-6">
          <img
            src="https://cdn-icons-png.flaticon.com/512/219/219969.png"
            alt="Developer Avatar"
            className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-md"
          />
          <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Vaishnavi Jaiswal
          </h3>
          <p className="max-w-2xl text-gray-700 dark:text-gray-400 leading-relaxed">
            Hi 👋 I'm <strong>Vaishnavi</strong> — the sole developer and
            designer behind Fixa. I built this platform from scratch using the
            <strong> MERN Stack</strong> to make daily services easier for
            everyone. I’m passionate about clean UI, efficient backend systems,
            and creating digital products that actually solve problems.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mt-4 text-blue-600 dark:text-blue-400 text-2xl">
            <div className="flex flex-col items-center">
              <FaCode />
              <span className="text-sm mt-1">Full Stack Dev</span>
            </div>
            <div className="flex flex-col items-center">
              <FaLaptopCode />
              <span className="text-sm mt-1">UI/UX Designer</span>
            </div>
            <div className="flex flex-col items-center">
              <FaLightbulb />
              <span className="text-sm mt-1">Innovator</span>
            </div>
            <div className="flex flex-col items-center">
              <FaHeart />
              <span className="text-sm mt-1">Built with ❤️</span>
            </div>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-12">
          © {new Date().getFullYear()} Fixa. Designed & Developed by Vaishnavi
          Jaiswal.
        </p>
      </div>
    </div>
  );
};

export default About;
