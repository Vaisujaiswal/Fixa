// import React, { useContext, useEffect } from 'react'
// import { ProviderContext } from '../../context/ProviderContext'
// import { assets } from '../../assets/assets';
// import { LuLayoutList } from "react-icons/lu";
// import { ImCancelCircle } from "react-icons/im";
// import { AppContext } from '../../context/AppContext';
// import { FaRegCheckCircle } from "react-icons/fa";


// const ProviderDashboard = () => {

//   const { pToken, dashData, setDashData, getDashData, completeBooking, cancleBooking } = useContext(ProviderContext);
//   const { slotDateFormatter } = useContext(AppContext);

//   useEffect(() => {
//     if (pToken) {
//       getDashData();
//     }
//   }, [pToken])

//   return dashData && (
//     <div className='m-5'>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

//         {/* Earnings */}
//         <div className="flex items-center gap-4 bg-gradient-to-r from-blue-200 to-blue-500 text-white p-5 rounded-2xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
//           <div className="bg-white/40 p-3 rounded-xl">
//             <img className="w-8 h-8" src={assets.earnings} alt="earnings" />
//           </div>
//           <div>
//             <p className="text-2xl font-bold">₹ {dashData.earnings}</p>
//             <p className="text-sm opacity-90">Earnings</p>
//           </div>
//         </div>

//         {/* Bookings */}
//         <div className="flex items-center gap-4 bg-gradient-to-r from-purple-200 to-purple-500 text-white p-5 rounded-2xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
//           <div className="bg-white/40 p-3 rounded-xl">
//             <img className="w-8 h-8" src={assets.booking} alt="bookings" />
//           </div>
//           <div>
//             <p className="text-2xl font-bold">{dashData.bookings}</p>
//             <p className="text-sm opacity-90">Bookings</p>
//           </div>
//         </div>

//         {/* Customers */}
//         <div className="flex items-center gap-4 bg-gradient-to-r from-green-200 to-green-500 text-white p-5 rounded-2xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
//           <div className="bg-white/40 p-3 rounded-xl">
//             <img className="w-8 h-8" src={assets.customer} alt="customers" />
//           </div>
//           <div>
//             <p className="text-2xl font-bold">{dashData.customers}</p>
//             <p className="text-sm opacity-90">Customers</p>
//           </div>
//         </div>

//       </div>


//       <div className='bg-white'>
//         <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t  border'>
//           <LuLayoutList className='text-2xl' />
//           <p className='font-semibold'>Latest Bookings</p>
//         </div>

//         <div className='pt-4 border border-t-0'>
//           {
//             dashData.latestBookings.map((item, index) => (
//               <div className='flex items-center py-6 px-3 gap-3 hover:bg-gray-100' key={index}>
//                 <img className="w-12 h-12 md:w-12 md:h-12 rounded-full border-2 border-blue-400 object-cover shadow-lg transition-transform transform hover:scale-105" src={item.userData.image} alt="" />
//                 <div className='flex-1 text-sm'>
//                   <p className='text-gray-800 font-medium'>{item.userData.name}</p>
//                   <p className='text-gray-600'>{slotDateFormatter(item.slotData)}</p>
//                 </div>
//                 {
//                   item.cancelled ? <p className='text-red-500 font-medium'>Cancelled</p>
//                     : item.isCompleted ? <p className='text-green-500 font-medium'>Completed</p>
//                       : <div className='flex gap-3'>
//                         <ImCancelCircle onClick={() => cancleBooking(item._id)} className='cursor-pointer text-2xl text-red-500' />
//                         <FaRegCheckCircle onClick={() => completeBooking(item._id)} className='cursor-pointer text-2xl text-green-500' />
//                       </div>
//                 }
//               </div>
//             ))
//           }
//         </div>
//       </div>

//     </div>
//   )
// }

// export default ProviderDashboard




















































import React, { useContext, useEffect } from 'react'
import { ProviderContext } from '../../context/ProviderContext'
import { assets } from '../../assets/assets';
import { LuLayoutList } from "react-icons/lu";
import { ImCancelCircle } from "react-icons/im";
import { AppContext } from '../../context/AppContext';
import { FaRegCheckCircle } from "react-icons/fa";

const ProviderDashboard = () => {
  const { pToken, dashData, getDashData, completeBooking, cancleBooking } = useContext(ProviderContext);
  const { slotDateFormatter } = useContext(AppContext);

  useEffect(() => {
    if (pToken) {
      getDashData();
    }
  }, [pToken])

  return dashData && (
    <div className='m-5'>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

         {/* Earnings */}
        <div className="flex items-center gap-4 bg-gradient-to-r from-blue-200 to-blue-500 dark:from-blue-700 dark:to-blue-900 text-white p-5 rounded-2xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
          <div className="bg-white/40 dark:bg-white/20 p-3 rounded-xl">
            <img className="w-8 h-8" src={assets.earnings} alt="earnings" />
          </div>
          <div>
            <p className="text-2xl font-bold">{dashData.earnings}</p>
            <p className="text-sm opacity-90">Earnings</p>
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

         {/* Customers */}
        <div className="flex items-center gap-4 bg-gradient-to-r from-green-200 to-green-500 dark:from-green-700 dark:to-green-900 text-white p-5 rounded-2xl shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
          <div className="bg-white/40 dark:bg-white/20 p-3 rounded-xl">
            <img className="w-8 h-8" src={assets.customer} alt="customer" />
          </div>
          <div>
            <p className="text-2xl font-bold">{dashData.customers}</p>
            <p className="text-sm opacity-90">Customers</p>
          </div>
        </div>

      </div>

      <div className='bg-white dark:bg-gray-900 dark:border-gray-700 border rounded mt-8'>
        <div className='flex items-center gap-2.5 px-4 py-4 rounded-t border-b dark:border-gray-700'>
          <LuLayoutList className='text-2xl text-gray-800 dark:text-gray-200' />
          <p className='font-semibold text-gray-800 dark:text-gray-200'>Latest Bookings</p>
        </div>

        <div className='pt-4 border-t-0'>
          {dashData.latestBookings.map((item, index) => (
            <div key={index} className='flex items-center py-6 px-3 gap-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors rounded'>
              <img className="w-12 h-12 md:w-12 md:h-12 rounded-full border-2 border-blue-400 object-cover shadow-lg transition-transform transform hover:scale-105" src={item.userData.image} alt="" />
              <div className='flex-1 text-sm'>
                <p className='text-gray-800 dark:text-gray-200 font-medium'>{item.userData.name}</p>
                <p className='text-gray-600 dark:text-gray-400'>{slotDateFormatter(item.slotData)}</p>
              </div>
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

    </div>
  )
}

export default ProviderDashboard;
