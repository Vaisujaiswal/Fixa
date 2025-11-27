

import React, { useEffect, useContext } from 'react';
import { ProviderContext } from '../../context/ProviderContext';
import { AppContext } from '../../context/AppContext';
import { ImCancelCircle } from "react-icons/im";
import { FaRegCheckCircle } from "react-icons/fa";

const ProviderBooking = () => {
  const { pToken, bookings, getBookings, completeBooking, cancleBooking } = useContext(ProviderContext);
  const { calculateAge, slotDateFormatter } = useContext(AppContext);

  useEffect(() => {
    if (pToken) {
      getBookings();
    }
  }, [pToken]);

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium text-gray-900 dark:text-gray-200'>All Bookings</p>
      <div className='bg-white dark:bg-gray-900 border dark:border-gray-700 rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-auto'>
        
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b font-medium text-gray-600 dark:text-gray-300 dark:border-gray-700'>
          <p>#</p>
          <p>Customer</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>

        {bookings.slice().reverse().map((item, index) => (
          <div key={index} className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 dark:text-gray-300 py-3 px-6 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'>
            
            <p className='max-sm:hidden'>{index + 1}</p>
            
            <div className='flex items-center gap-2'>
              <img className="w-12 h-12 md:w-12 md:h-12 rounded-full border-2 border-blue-400 object-cover shadow-lg transition-transform transform hover:scale-105" src={item.userData.image} alt="" />
              <p>{item.userData.name}</p>
            </div>

            <div>
              <p className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 w-fit px-3 py-1 rounded-full text-sm mx-auto md:mx-0">
                {item.payment ? 'Online' : 'Cash'}
              </p>
            </div>

            <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
            <p>{slotDateFormatter(item.slotData)} | {item.slotTime}</p>
            <p>₹{item.amount}</p>

            {item.cancelled ? (
              <p className='text-red-500 font-medium'>Cancelled</p>
            ) : item.isCompleted ? (
              <p className='text-green-500 font-medium'>Completed</p>
            ) : (
              <div className='flex gap-3'>
                <ImCancelCircle onClick={() => cancleBooking(item._id)} className='cursor-pointer text-2xl text-red-500' />
                <FaRegCheckCircle onClick={() => completeBooking(item._id)} className='cursor-pointer text-2xl text-green-500' />
              </div>
            )}

          </div>
        ))}

      </div>
    </div>
  );
}

export default ProviderBooking;
