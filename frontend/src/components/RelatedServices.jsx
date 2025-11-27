// import React, { useContext, useEffect, useState } from 'react'
// import { AppContext } from '../context/AppContext'
// import { useNavigate } from 'react-router-dom'

// const RelatedServices = ({speciality, proId}) => {

//     const { providers } = useContext(AppContext);
//     const navigate = useNavigate();

//     const [relProvider, setRelProvider] = useState([]);

//     useEffect(() => {
//         if (providers.length > 0 && speciality) {
//             const providersData = providers.filter((pro) => pro.speciality === speciality && pro._id !== proId);
//             setRelProvider(providersData);
//         }
//     }, [providers, speciality, proId]);

//     return (
//         <div className="flex flex-col items-center gap-4 my-24 text-gray-950 md:mx-10">
//             <h1 className="text-3xl font-medium">Top Services to Book</h1>
//             <p className="sm:w-1/3 text-center text-sm">Find the best service providers for your home. Happiness starts here!</p>

//             <div className="w-full grid grid-cols-auto pt-5 gap-y-6 px-3 sm:px-0 gap-6">
//                 {
//                     relProvider.slice(0, 10).map((item, index) => (
//                         <div onClick={() => navigate(`/booking/${item._id}`)} key={index} className="rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500 hover:shadow-2xl dark:hover:shadow-2xl">
//                             <img src={item.image} alt={item.fullName} className="w-full h-40 object-cover rounded" />
//                             <div className="mt-4 p-5">
//                                 <p className="font-semibold text-lg text-gray-700">{item.fullName}</p>
//                                 <p className='text-gray-500'>{item.description}</p>
//                                 <div className='flex items-center justify-between'>
//                                     <p className="text-sm text-gray-800">{item.speciality}</p>
//                                     <p>{item.price}</p>
//                                 </div>

//                             </div>
//                         </div>
//                     ))
//                 }
//             </div>

//             <div className="text-center mt-8">
//                 <button onClick={() => { navigate('/services'); scrollTo(0, 0) }} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition">
//                     More
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default RelatedServices

















import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'


const RelatedServices = ({ speciality, proId }) => {

  // const { providers } = useContext(AppContext);
  const { serviceProviders: providers } = useContext(AppContext);

  const navigate = useNavigate();

  const [relProvider, setRelProvider] = useState([]);

  useEffect(() => {

    console.log("All Providers:", providers); // 👈 Check what you're getting
    console.log("Speciality:", speciality);   // 👈 Check input
    console.log("Current Provider ID:", proId);

    if (providers?.length > 0 && speciality) {
      const providersData = providers.filter((pro) =>
        pro.speciality === speciality && pro._id !== proId
      );
      console.log("Filtered Providers:", providersData); // 👈 Check filtered result
      setRelProvider(providersData);
    }
  }, [providers, speciality, proId]);

  return (
    <div className="flex flex-col items-center gap-4 my-24 text-gray-950 md:mx-10">
      <h1 className="text-3xl font-medium">Related Services Here</h1>
      <p className="sm:w-1/3 text-center text-sm">Find the best service providers for your home</p>


      {/* Related Provider Cards */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8">
        {relProvider.slice(0, 8).map((item, index) => (
          <div
            key={index}
            className="group bg-white dark:bg-gray-800 rounded-2xl shadow-md 
                 hover:shadow-2xl transform transition duration-300 
                 hover:-translate-y-2 cursor-pointer overflow-hidden relative w-full"
          >
            {/* Image with zoom on hover */}
            <div className="overflow-hidden relative">
              <img
                src={item.image}
                alt={item.fullName}
                className="w-full h-48 object-cover rounded-t-2xl 
                     transform group-hover:scale-110 transition duration-500 ease-in-out"
              />
              {/* Availability Badge */}
              <span
                className={`absolute top-3 right-3 ${item.available ? "bg-green-500" : "bg-red-500"
                  } text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg`}
              >
                {item.available ? "Available" : "Not Available"}
              </span>
            </div>

            {/* Details */}
            <div className="p-5">
              <p className="font-bold text-lg text-gray-800 dark:text-gray-200 truncate group-hover:text-primary transition">
                {item.fullName}
              </p>
              <p className="text-gray-500 text-sm">{item.title}</p>

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
                  className="w-full relative overflow-hidden py-2.5 rounded-lg 
                       font-semibold text-white 
                       bg-gradient-to-r from-primary to-indigo-600 
                       shadow-md transition-all duration-500 ease-out
                       hover:scale-105 hover:shadow-xl"
                >
                  <span className="relative z-10">View Profile</span>
                  <span className="absolute inset-0 bg-gradient-to-r 
                       from-indigo-600 to-primary 
                       translate-x-[-100%] group-hover:translate-x-0 
                       transition-transform duration-500 ease-in-out"></span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>



      {/* More Button */}
      <div className="text-center mt-10">
        <button
          onClick={() => {
            navigate("/services");
            scrollTo({ top: 0, left: 0, behavior: "smooth" });
          }}
          className="relative overflow-hidden px-8 py-3 rounded-full font-semibold text-white
               bg-gradient-to-r from-primary to-indigo-600 shadow-md
               transition-all duration-500 ease-out
               hover:scale-105 hover:shadow-xl"
        >
          <span className="relative z-10">View All Services</span>
          {/* Animated gradient overlay */}
          <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-primary 
                     translate-x-[-100%] hover:translate-x-0 
                     transition-transform duration-500 ease-in-out rounded-full"></span>
        </button>
      </div>

    </div>
  )
}

export default RelatedServices;
