


import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import { assets } from '../../assets/assets';
import { LuLayoutList } from "react-icons/lu";
import { ImCancelCircle } from "react-icons/im";
import { AppContext } from '../../context/AppContext';

const DashBoard = () => {
  const { aToken, dashData, getDashData, cancleBooking } = useContext(AdminContext);
  const { slotDateFormatter } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);

  return (
    dashData && (
      <div className="m-6">

        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Providers */}
          <div className="flex items-center gap-4 bg-gradient-to-r from-blue-200 to-blue-500 dark:from-blue-700 dark:to-blue-900 text-white p-5 rounded-2xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
            <div className="bg-white/40 dark:bg-white/20 p-3 rounded-xl">
              <img className="w-8 h-8" src={assets.provider} alt="providers" />
            </div>
            <div>
              <p className="text-2xl font-bold">{dashData.providers}</p>
              <p className="text-sm opacity-90">Providers</p>
            </div>
          </div>

          {/* Bookings */}
          <div className="flex items-center gap-4 bg-gradient-to-r from-purple-200 to-purple-500 dark:from-purple-700 dark:to-purple-900 text-white p-5 rounded-2xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
            <div className="bg-white/40 dark:bg-white/20 p-3 rounded-xl">
              <img className="w-8 h-8" src={assets.booking} alt="bookings" />
            </div>
            <div>
              <p className="text-2xl font-bold">{dashData.bookings}</p>
              <p className="text-sm opacity-90">Bookings</p>
            </div>
          </div>

          {/* Users */}
          <div className="flex items-center gap-4 bg-gradient-to-r from-green-200 to-green-500 dark:from-green-700 dark:to-green-900 text-white p-5 rounded-2xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
            <div className="bg-white/40 dark:bg-white/20 p-3 rounded-xl">
              <img className="w-8 h-8" src={assets.user} alt="users" />
            </div>
            <div>
              <p className="text-2xl font-bold">{dashData.users}</p>
              <p className="text-sm opacity-90">Users</p>
            </div>
          </div>

        </div>

        {/* Latest bookings section */}
        <div className="bg-white dark:bg-gray-900 mt-10 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2.5 px-4 py-4 rounded-t">
            <LuLayoutList className="text-2xl dark:text-gray-200" />
            <p className="font-semibold text-gray-800 dark:text-gray-200">Latest Bookings</p>
          </div>

          <div className="pt-4">
            {dashData.latestBookings.map((item, index) => (
              <div
                key={index}
                className="flex items-center py-6 px-3 gap-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <img
                  className="w-12 h-12 rounded-full border-2 border-blue-400 object-cover shadow-lg transition-transform transform hover:scale-105"
                  src={item.proData.image}
                  alt="provider"
                />
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 dark:text-gray-200 font-medium">{item.proData.name}</p>
                  <p className="text-gray-600 dark:text-gray-400">{slotDateFormatter(item.slotData)}</p>
                </div>
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
      </div>
    )
  );
};

export default DashBoard;
