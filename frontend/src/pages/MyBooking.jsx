










import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const MyBooking = () => {
  const { backendUrl, token, getProviderData, darkMode } = useContext(AppContext);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const months = [
    "",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const slotDateFormatter = (slotDate) => {
    const dateArray = slotDate.split("-");
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2];
  };

  const getUserBookings = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/my-booking`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setBookings(data.bookings.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching bookings", { theme: darkMode ? "dark" : "light" });
    }
  };

  const cancleBooking = async (bookingId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/cancle-booking`,
        { bookingId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message, { theme: darkMode ? "dark" : "light" });
        setBookings((prev) =>
          prev.map((b) => (b._id === bookingId ? { ...b, cancelled: true } : b))
        );
        getProviderData();
      } else {
        toast.error(data.message, { theme: darkMode ? "dark" : "light" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error cancelling booking", { theme: darkMode ? "dark" : "light" });
    }
  };

  useEffect(() => {
    if (token) getUserBookings();
  }, [token]);

  return (
    <div className="bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-gray-950 dark:to-gray-900 min-h-screen transition-all duration-500">
      <div className="mx-4 sm:mx-[8%] py-10 px-4 md:px-10">
        <h2 className="text-3xl font-bold text-blue-800 dark:text-blue-400 mb-8 text-center">
          My Bookings
        </h2>

        {bookings.length === 0 ? (
          <p className="text-center text-gray-600 dark:text-gray-400 text-lg mt-16">
            You don’t have any bookings yet.
          </p>
        ) : (
          <div className="grid gap-8">
            {bookings.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-2xl dark:hover:shadow-[0_0_20px_#3b82f6] p-6 md:flex items-center gap-6 transition-all duration-300 border border-gray-200 dark:border-gray-700"
              >
                {/* Provider Image */}
                <div className="flex-shrink-0 mx-auto md:mx-0">
                  <img
                    src={item.proData.image}
                    alt={item.proData.fullName}
                    className="w-28 h-28 object-cover rounded-full border-4 border-blue-300 dark:border-blue-500 shadow-md"
                  />
                </div>

                {/* Booking Info */}
                <div className="flex-1 mt-4 md:mt-0">
                  <h3
                    onClick={() => navigate(`/booking/${item.proData._id}`)}
                    className="text-xl font-semibold text-blue-700 dark:text-blue-400 hover:underline cursor-pointer transition-colors duration-200"
                  >
                    {item.proData.name}
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    <span className="font-semibold">Speciality:</span>{" "}
                    {item.proData.speciality}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    <span className="font-semibold">Location:</span>{" "}
                    {item.proData.location}
                  </p>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                    <span className="font-semibold">Date & Time:</span>{" "}
                    {slotDateFormatter(item.slotData)} | {item.slotTime}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 md:mt-0 flex flex-col gap-3 text-center">
                  {!item.cancelled && item.payment && !item.isCompleted && (
                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow">
                      Paid
                    </button>
                  )}

                  {!item.cancelled && !item.payment && !item.isCompleted && (
                    <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow">
                      Pay Online
                    </button>
                  )}

                  {!item.cancelled && !item.isCompleted && (
                    <button
                      onClick={() => cancleBooking(item._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow"
                    >
                      Cancel Booking
                    </button>
                  )}

                  {item.cancelled && !item.isCompleted && (
                    <span className="text-red-600 dark:text-red-400 font-semibold">
                      Booking Cancelled
                    </span>
                  )}

                  {item.isCompleted && (
                    <span className="text-green-600 dark:text-green-400 font-semibold">
                      Completed
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBooking;

