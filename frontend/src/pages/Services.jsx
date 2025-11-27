
import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { ImFilter } from "react-icons/im";

const Services = () => {
  const { speciality } = useParams();
  const { serviceProviders } = useContext(AppContext);
  const navigate = useNavigate();

  const [filterService, setFilterService] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const applyFilter = () => {
    if (speciality) {
      setFilterService(
        serviceProviders?.filter((ser) => ser.speciality === speciality) || []
      );
    } else {
      setFilterService(serviceProviders);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [serviceProviders, speciality]);

  const filterOptions = [
    "Electrician",
    "Plumber",
    "Painter",
    "Beautician",
    "Pest Control",
    "Cook",
    "Home Cleaner",
    "Laundry",
    "Carpenter",
    "Photographer",
    "AC Technician",
    "Mechanic",
    "Packers & Movers",
    "Computer Repair",
    "CCTV Installer"
  ];

  const handleFilterClick = (option) => {
    if (speciality?.toLowerCase() === option.toLowerCase()) {
      navigate("/services");
    } else {
      navigate(`/service/${option}`);
    }

    // Close mobile filter panel automatically
    setShowFilter(false);
  };

  return (
    <div className="mx-4 sm:mx-[8%]">
      <p className="text-gray-600 dark:text-gray-400 p-5">
        Browse through the service speciality
      </p>

      <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-12">
        {/* Toggle filter (mobile only) */}
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden flex gap-2 items-center
          ${showFilter ? `bg-primary text-white` : `bg-gray-100 dark:bg-gray-700 dark:text-gray-300`}`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          <ImFilter className="text-yellow-300" /> Filters
        </button>

        {/* Filter Options */}
        <div
          className={`flex-col gap-2 text-sm ${showFilter ? "flex flex-wrap mb-5" : "hidden sm:flex sm:flex-col"
            }`}
        >
          {filterOptions.map((option, idx) => {
            const isSelected =
              speciality?.toLowerCase() === option.toLowerCase();

            return (
              <p
                key={idx}
                onClick={() => handleFilterClick(option)}
                className={`w-[65vw] sm:w-auto px-8 py-2 rounded-lg cursor-pointer border-l-4 transition-all duration-300 
                ${isSelected
                    ? "bg-indigo-100 border-indigo-500 text-indigo-700 font-semibold dark:bg-indigo-900 dark:text-indigo-300"
                    : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-indigo-300"
                  }`}
              >
                {option}
              </p>
            );
          })}
        </div>

        {/* Service Providers Grid */}
        <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 mt-4 sm:mt-0">
          {Array.isArray(filterService) && filterService.length > 0 ? (
            filterService.map((item, index) => (
              <div
                key={index}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl transform transition duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden relative w-full "
                onClick={() => {
                  navigate(`/booking/${item._id}`);
                  scrollTo({ top: 0, left: 0, behavior: "smooth" });
                }}
              >
                {/* Image with hover zoom */}
                <div className="overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.fullName}
                    className="w-full h-48 object-cover rounded-t-2xl transform group-hover:scale-110 transition duration-500 ease-in-out"
                  />
                  {/* Availability Badge */}
                  <span
                    className={`absolute top-3 right-3 ${item.available ? "bg-green-500" : "bg-red-500"
                      } text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg`}
                  >
                    {item.available ? "Available" : "Not Available"}
                  </span>
                </div>

                {/* Card Details */}
                <div className="p-5">
                  <p className="font-bold text-lg text-gray-800 dark:text-gray-200 truncate group-hover:text-primary transition">
                    {item.fullName}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    {item.title}
                  </p>

                  {/* Speciality & Price */}
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-sm text-primary font-medium tracking-wide">
                      {item.speciality}
                    </span>
                    <span className="text-gray-900 dark:text-gray-100 font-semibold">
                      ₹ {item.fees}
                    </span>
                  </div>

                  {/* Button */}
                  <div className="mt-5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/booking/${item._id}`);
                        scrollTo({ top: 0, left: 0, behavior: "smooth" });
                      }}
                      className="w-full relative overflow-hidden py-2.5 rounded-lg font-semibold text-white bg-gradient-to-r from-primary to-indigo-600 shadow-md transition-all duration-500 ease-out hover:scale-105 hover:shadow-xl"
                    >
                      <span className="relative z-10">View Profile</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-primary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-in-out rounded-lg"></span>
                    </button>
                  </div>
                </div>


              </div>
            ))
          ) : (<p className="col-span-full text-center text-red-500 text-lg font-semibold mt-10">
            Sorry 😔, this service is not available.
          </p>)}
        </div>
      </div>
    </div>
  );
};

export default Services;
