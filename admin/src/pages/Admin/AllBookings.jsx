

import React, { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { ImCancelCircle } from "react-icons/im";

const AllBookings = () => {
  const { aToken, bookings, getAllBookings, cancleBooking } =
    useContext(AdminContext);
  const { calculateAge, slotDateFormatter } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllBookings();
    }
  }, [aToken]);

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium text-gray-800 dark:text-gray-200">
        All Bookings
      </p>

      <div className="bg-white dark:bg-gray-900 border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll shadow-md">
        {/* Header row */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b font-medium text-gray-600 dark:text-gray-300 dark:border-gray-700">
          <p>#</p>
          <p>User</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Provider</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {/* Bookings */}
        {bookings.map((item, index) => (
          <div
            key={index}
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center 
              text-gray-600 dark:text-gray-300 py-3 px-6 border-b 
              hover:bg-gray-50 dark:hover:bg-gray-800 
              border-gray-200 dark:border-gray-700"
          >
            <p className="max-sm:hidden">{index + 1}</p>

            {/* User */}
            <div className="flex items-center gap-2">
              <img
                className="w-12 h-12 rounded-full border-2 border-blue-400 object-cover shadow-lg transition-transform transform hover:scale-105"
                src={item.userData.image}
                alt=""
              />
              <p>{item.userData.name}</p>
            </div>

            {/* Age */}
            <p className="max-sm:hidden">
              {calculateAge(item.userData.dob)}
            </p>

            {/* Slot */}
            <p>
              {slotDateFormatter(item.slotData)} | {item.slotTime}
            </p>

            {/* Provider */}
            <div className="flex items-center gap-2">
              <img
                className="w-12 h-12 rounded-full border-2 border-blue-400 object-cover shadow-lg transition-transform transform hover:scale-105"
                src={item.proData.image}
                alt=""
              />
              <p>{item.proData.name}</p>
            </div>

            {/* Fees */}
            <p className="font-medium text-gray-800 dark:text-gray-100">
              ₹{item.amount}
            </p>

            {/* Actions */}
            {item.cancelled ? (
              <p className="text-red-500 font-medium">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-500 font-bold">Completed</p>
            ) : (
              <ImCancelCircle
                onClick={() => cancleBooking(item._id)}
                className="text-xl cursor-pointer text-red-500 hover:scale-110 transition"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBookings;
