// import React from 'react'
// import { assets } from '../assets/assets'
// import { useContext } from 'react';
// import { AdminContext } from '../context/AdminContext.jsx';
// import { useNavigate } from 'react-router-dom';
// import { ProviderContext } from '../context/ProviderContext.jsx';

// const Navbar = () => {

//   const { aToken, setAToken } = useContext(AdminContext);
//   const { pToken, setPToken } = useContext(ProviderContext);


//   const navigate = useNavigate();

//   const logout = () => {
//     navigate('/');
//     aToken && setAToken('');
//     aToken && localStorage.removeItem('aToken');

//     pToken && setPToken('');
//     pToken && localStorage.removeItem('pToken');
//   }

//   return (
//     <div className='flex justify-between items-center bg-white px-4 sm:px-10 py-3 border-b'>
//       <div className='flex items-center gap-5 text-xs'>
//         <div className='flex items-center justify-center cursor-pointer'>
//           <img className='w-28 h-12 ' src={assets.logo} alt='' />
//         </div>
//         <p className="bg-blue-100 text-blue-800 w-fit px-3 py-1 rounded-full text-sm mx-auto md:mx-0" >{aToken ? "Admin" : "Provider"}</p>
//       </div>
//       <button onClick={logout} className='bg-primary text-white px-9 text-sm py-2 rounded-full'>Logout</button>
//     </div>
//   )
// }

// export default Navbar


























// import React from 'react'
// import { assets } from '../assets/assets'
// import { useContext } from 'react';
// import { AdminContext } from '../context/AdminContext.jsx';
// import { useNavigate } from 'react-router-dom';
// import { ProviderContext } from '../context/ProviderContext.jsx';

// const Navbar = () => {
//   const { aToken, setAToken } = useContext(AdminContext);
//   const { pToken, setPToken } = useContext(ProviderContext);

//   const navigate = useNavigate();

//   const logout = () => {
//     navigate('/');
//     aToken && setAToken('');
//     aToken && localStorage.removeItem('aToken');

//     pToken && setPToken('');
//     pToken && localStorage.removeItem('pToken');
//   }

//   return (
//     <div className='flex justify-between items-center bg-white dark:bg-gray-900 px-4 sm:px-10 py-3 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300'>
//       <div className='flex items-center gap-5 text-xs'>
//         <div className='flex items-center justify-center cursor-pointer'>
//           <span className='text-primary text-2xl sm:text-4xl'>FIXA</span>
//         </div>
//         <p className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 w-fit px-3 py-1 rounded-full text-sm mx-auto md:mx-0">
//           {aToken ? "Admin" : "Provider"}
//         </p>
//       </div>
//       <button 
//         onClick={logout} 
//         className='bg-primary text-white px-9 text-sm py-2 rounded-full hover:opacity-90 transition'
//       >
//         Logout
//       </button>
//     </div>
//   )
// }

// export default Navbar











import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext.jsx';
import { ProviderContext } from '../context/ProviderContext.jsx';
import { useNavigate } from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';
import { AppContext } from '../context/AppContext.jsx';
// import { AppContext } from '../context/AppContext'; // <-- Import AppContext

const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { pToken, setPToken } = useContext(ProviderContext);
  const { darkMode, setDarkMode } = useContext(AppContext); // <-- Use context here
  const navigate = useNavigate();

  const logout = () => {
    navigate('/');
    aToken && setAToken('');
    aToken && localStorage.removeItem('aToken');

    pToken && setPToken('');
    pToken && localStorage.removeItem('pToken');
  };

  return (
    <div className="flex justify-between items-center bg-white dark:bg-gray-900 px-4 sm:px-10 py-3 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="flex items-center gap-5 text-xs">
        <div className="flex items-center justify-center cursor-pointer">
          <span className="text-primary text-2xl sm:text-4xl">FIXA</span>
        </div>
        <p className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 w-fit px-3 py-1 rounded-full text-sm mx-auto md:mx-0">
          {aToken ? 'Admin' : 'Provider'}
        </p>
      </div>

      <div className="flex items-center gap-4">
        {/* Dark/Light Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition hover:scale-110"
        >
          {darkMode ? <FaSun className='text-yellow-300' /> : <FaMoon />}
        </button>

        <button
          onClick={logout}
          className="bg-primary text-white px-9 text-sm py-2 rounded-full hover:opacity-90 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
