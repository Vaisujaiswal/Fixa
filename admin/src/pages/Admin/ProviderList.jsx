import React, { useEffect } from 'react'
import { useContext } from 'react';
import { AdminContext } from '../../context/AdminContext';

const ProviderList = () => {

  const { getAllProviders, providers, aToken, changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if(aToken){
      getAllProviders();
    }
  }, [aToken]);


return (
  // <div className="p-4 md:p-8">
  //   <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">All Providers</h1>

  //   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  //     {providers.map((item, index) => (
  //       <div
  //         key={index}
  //         className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
  //       >
  //         <img
  //           src={item.image}
  //           alt={item.name}
  //           className="w-full h-48 object-cover"
  //         />
  //         <div className="p-4">
  //           <p className="text-lg font-semibold text-gray-800">{item.name}</p>
  //           <p className="text-gray-600 mb-3">{item.speciality}</p>
  //           <div className="flex items-center space-x-2">
  //             <input
  //               onChange={(e) => changeAvailability(item._id)}
  //               type="checkbox"
  //               checked={item.available}
  //               className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-400"
  //             />
  //             <p className="text-gray-700">Available</p>
  //           </div>
  //         </div>
  //       </div>
  //     ))}
  //   </div>
  // </div>


  <div className="p-4 md:p-8">
  <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
    All Providers
  </h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {providers.map((item, index) => (
      <div
        key={index}
        className="bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
      >
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <p className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            {item.name}
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-3">
            {item.speciality}
          </p>
          <div className="flex items-center space-x-2">
            <input
              onChange={(e) => changeAvailability(item._id)}
              type="checkbox"
              checked={item.available}
              className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
            />
            <p className="text-gray-700 dark:text-gray-300">Available</p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

);
};

export default ProviderList