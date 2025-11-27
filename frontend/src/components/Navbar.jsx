// import React, { useContext, useState } from 'react'
// import { assets } from '../assets/assets'
// import { Navigate, NavLink, redirect, useNavigate } from 'react-router-dom'
// import { RiArrowDropDownLine } from "react-icons/ri";
// import { FiSun, FiMoon } from "react-icons/fi";
// import { useEffect } from 'react';
// import { CgMenuRight } from "react-icons/cg";
// import { RxCross1 } from "react-icons/rx";
// import { AppContext } from '../context/AppContext';
// import { toast } from 'react-toastify';

// const Navbar = () => {

//   const navigate = useNavigate()

//   const { token, setToken, userData } = useContext(AppContext)
//   const [showMenu, setShowMenu] = useState(false)

//   // darkMode state defined!
//   const [darkMode, setDarkMode] = useState(() => {
//     return localStorage.getItem("theme") === "dark"
//   })

//   const logout = () => {
//     setToken(false);
//     localStorage.removeItem('token')
//     toast.success("You Logout..")
//     // Redirect to home page after short delay
//     setTimeout(() => {
//       navigate('/');
//     }, 500);
//   }

//   useEffect(() => {
//     const root = document.documentElement
//     if (darkMode) {
//       root.classList.add('dark')
//       localStorage.setItem('theme', 'dark')
//     } else {
//       root.classList.remove('dark')
//       localStorage.setItem('theme', 'light')
//     }
//   }, [darkMode])

//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     let lastScrollTop = 0;

//     const handleScroll = () => {
//       const scrollTop = window.scrollY;

//       if (scrollTop > lastScrollTop) {
//         // scrolling down
//         setIsScrolled(true);
//       } else {
//         // scrolling up
//         setIsScrolled(false);
//       }

//       lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <div
//       className={`sticky top-0 z-50 w-full transition-colors duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-transparent"
//         }`}
//     >
//       <div className='sticky top-0 z-50 flex items-center justify-between text-sm-py-6 p-4  '>

//         {/* logo here */}
//         <div onClick={() => navigate('/')} className='flex gap-1 items-center justify-center cursor-pointer'>
//           {/* <img className='w-12 ' src={assets.logo} alt='' /> */}
//           <span className='text-3xl text-[#5b6067] mt-2'>Fixa.com</span>
//         </div>

//         {/* List */}
//         <ul className='hidden md:flex items-start gap-8 font-medium mt-4'>
//           <NavLink to='/'>
//             <li className="py-1">Home</li>
//             <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
//           </NavLink>
//           <NavLink to='/services'>
//             <li className="py-1">All Services</li>
//             <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
//           </NavLink>
//           <NavLink to='/contact'>
//             <li className="py-1">Contact</li>
//             <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
//           </NavLink>
//           <NavLink to='/about'>
//             <li className="py-1">About</li>
//             <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
//           </NavLink>
//         </ul>


//         <div className='flex items-center gap-4'>

//           {/* Theme Toggle */}
//           {/* <button onClick={() => setDarkMode(!darkMode)} className='text-lg border border-gray-800 px-5 py-2.5 rounded-full dark:border-white'>
//           {darkMode ? <FiSun /> : <FiMoon />}
//         </button> */}

//           {/* logic */}
//           {
//             token && userData ? (
//               <div className='flex items-center gap-2 cursor-pointer group relative'>
//                 <img className='w-12 h-12 rounded-full border-4 border-blue-300 object-cover"' src={userData.image} alt="" />
//                 <RiArrowDropDownLine className='text-2xl font-light' />

//                 {/* Dropdown */}
//                 <div className='absolute top-0 pt-14 text-base font-medium z-20 hidden group-hover:block'>
//                   <div className={`min-w-48 rounded flex flex-col gap-4 p-5 transition-all duration-300 
//           ${darkMode ? 'bg-gray-900 text-white' : 'bg-stone-100 text-gray-600'}`}>

//                     {/* dropdown list  */}
//                     <p onClick={() => navigate('/my-profile')} className='hover:text-primary cursor-pointer'>My Profile</p>
//                     <p onClick={() => navigate('/my-booking')} className='hover:text-primary cursor-pointer'>My Booking</p>
//                     <p onClick={logout} className='hover:text-primary cursor-pointer'>Logout</p>

//                   </div>
//                 </div>
//               </div>
//             ) : (

//               <button onClick={() => navigate('/login')} className='bg-primary text-white sm:px-5 sm:py-3 rounded-full font-light px-3 py-2 mt-3'>
//                 Create Account
//               </button>

//             )
//           }


//           <CgMenuRight onClick={() => setShowMenu(true)} className='text-3xl md:hidden' />
//           {/* mobile menu  */}
//           <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden top-0 right-0 bottom-0 overflow-hidden z-20 bg-white transition-all`}>
//             <div className='flex items-center justify-between p-4 border-b border-b-slate-400'>
//               <div onClick={() => navigate('/')} className='flex gap-1 items-center justify-center cursor-pointer'>
//                 <img className='w-12 ' src={assets.logo} alt='' />
//                 <span className='text-3xl text-primary mt-2'>Fixa</span>
//               </div>
//               <RxCross1 onClick={() => setShowMenu(false)} className='text-3xl' />
//             </div>

//             <ul className='flex flex-col items-center gap-6 font-medium mt-4 text-xl'>
//               <NavLink onClick={() => setShowMenu(false)} to='/'>Home</NavLink>
//               <NavLink onClick={() => setShowMenu(false)} to='/services'>All Services</NavLink>
//               <NavLink onClick={() => setShowMenu(false)} to='/contact'>Contact</NavLink>
//               <NavLink onClick={() => setShowMenu(false)} to='/about'>About</NavLink>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Navbar























// import React, { useContext, useState, useEffect } from 'react'
// import { assets } from '../assets/assets'
// import { NavLink, useNavigate } from 'react-router-dom'
// import { RiArrowDropDownLine } from "react-icons/ri"
// import { CgMenuRight } from "react-icons/cg"
// import { RxCross1 } from "react-icons/rx"
// import { AppContext } from '../context/AppContext'
// import { toast } from 'react-toastify'

// const Navbar = () => {
//   const navigate = useNavigate()
//   const { token, setToken, userData } = useContext(AppContext)
//   const [showMenu, setShowMenu] = useState(false)

//   // Dark mode
//   const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark")

//   const logout = () => {
//     setToken(false)
//     localStorage.removeItem('token')
//     toast.success("You Logout..")
//     setTimeout(() => navigate('/'), 500)
//   }

//   useEffect(() => {
//     const root = document.documentElement
//     if (darkMode) {
//       root.classList.add('dark')
//       localStorage.setItem('theme', 'dark')
//     } else {
//       root.classList.remove('dark')
//       localStorage.setItem('theme', 'light')
//     }
//   }, [darkMode])

//   // Scroll detection for background
//   const [isScrolled, setIsScrolled] = useState(false)
//   useEffect(() => {
//     let lastScrollTop = 0
//     const handleScroll = () => {
//       const scrollTop = window.scrollY
//       if (scrollTop > lastScrollTop) {
//         setIsScrolled(false) // scrolling down → show bg
//       } else {
//         setIsScrolled(true) // scrolling up → transparent
//       }
//       lastScrollTop = scrollTop <= 0 ? 0 : scrollTop
//     }
//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   return (
//     <div
//       className={`sticky top-0 z-50 w-full transition-colors duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-transparent"
//         }`}
//     >
//       {/* Inner content aligned with margins */}
//       <div className='mx-4 sm:mx-[8%] flex items-center justify-between py-4'>

//         {/* Logo */}
//         <div onClick={() => navigate('/')} className='flex gap-1 items-center cursor-pointer'>
//           <NavLink to='/'><img src={assets.logo} alt="" className='w-28 h-12' /></NavLink>
//         </div>

//         {/* Desktop menu */}
//         <ul className='hidden md:flex items-center gap-12 font-medium mt-4 text-[#222325]'>
//           <NavLink to='/'><li className="py-1 hover:text-primary">Home</li></NavLink>
//           <NavLink to='/services'><li className="py-1 hover:text-primary">Services</li></NavLink>
//           <NavLink to='/contact'><li className="py-1 hover:text-primary">Contact</li></NavLink>
//           <NavLink to='/about'><li className="py-1 hover:text-primary">About</li></NavLink>
//         </ul>

//         {/* Right side */}
//         <div className='flex items-center gap-4'>

//           {/* Login / Profile */}
//           {token && userData ? (
//             <div className='flex items-center gap-2 cursor-pointer group relative'>
//               <img className='w-12 h-12 rounded-full border-4 border-blue-400 object-cover' src={userData.image} alt="" />
//               <RiArrowDropDownLine className='text-2xl font-light' />

//               {/* Profile Dropdown */}
//               <div className="absolute top-12 right-0 w-56 rounded-xl shadow-lg border border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700 transform scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-200 origin-top-right z-20">
//                 <div className="flex flex-col py-3">
//                   <button
//                     onClick={() => navigate('/my-profile')}
//                     className="px-5 py-2 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition rounded-md"
//                   >
//                     👤 My Profile
//                   </button>
//                   <button
//                     onClick={() => navigate('/my-booking')}
//                     className="px-5 py-2 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition rounded-md"
//                   >
//                     📑 My Booking
//                   </button>
//                   <button
//                     onClick={logout}
//                     className="px-5 py-2 text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition rounded-md"
//                   >
//                     🚪 Logout
//                   </button>
//                 </div>
//               </div>

//             </div>
//           ) : (
//             <button
//               onClick={() => navigate('/login')}
//               className="relative px-6 py-3 mt-3 text-sm font-medium rounded-full border-2 border-primary text-primary 
//              overflow-hidden transition-all duration-500 group"
//             >
//               <span
//                 className="absolute inset-0 bg-primary translate-x-full group-hover:translate-x-0 transition-transform duration-500"
//               ></span>
//               <span className="relative z-10 group-hover:text-white">
//                 Create Account
//               </span>
//             </button>

//           )}

//           {/* Mobile menu toggle */}
//           <CgMenuRight onClick={() => setShowMenu(true)} className='text-3xl md:hidden' />

//           {/* Mobile menu */}
//           <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden top-0 right-0 bottom-0 overflow-hidden z-20 bg-white transition-all`}>
//             <div className='flex items-center justify-between p-4 border-b border-b-slate-400'>
//               <div onClick={() => navigate('/')} className='flex gap-1 items-center cursor-pointer'>
//                 <span className='text-3xl text-primary mt-2'>Fixa</span>
//               </div>
//               <RxCross1 onClick={() => setShowMenu(false)} className='text-3xl' />
//             </div>

//             <ul className='flex flex-col items-center gap-6 font-medium mt-4 text-xl text-[#222325]'>
//               <NavLink onClick={() => setShowMenu(false)} to='/'>Home</NavLink>
//               <NavLink onClick={() => setShowMenu(false)} to='/services'>All Services</NavLink>
//               <NavLink onClick={() => setShowMenu(false)} to='/contact'>Contact</NavLink>
//               <NavLink onClick={() => setShowMenu(false)} to='/about'>About</NavLink>
//             </ul>
//           </div>

//         </div>
//       </div>
//     </div>
//   )
// }

// export default Navbar

























import React, { useContext, useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { RiArrowDropDownLine } from "react-icons/ri"
import { CgMenuRight } from "react-icons/cg"
import { RxCross1 } from "react-icons/rx"
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import { FaMoon, FaSun } from "react-icons/fa" 
import { FaUserAlt } from "react-icons/fa";
import { FaAddressBook } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";

const Navbar = () => {
  const navigate = useNavigate()
  const { token, setToken, userData } = useContext(AppContext)
  const [showMenu, setShowMenu] = useState(false)

  const [dropdownOpen, setDropdownOpen] = useState(false);
  let closeTimeout;

  const openDropdown = () => {
    clearTimeout(closeTimeout);
    setDropdownOpen(true);
  };

  const closeDropdown = () => {
    closeTimeout = setTimeout(() => {
      setDropdownOpen(false);
    }, 800); // delay in ms
  };


  const { darkMode, setDarkMode } = useContext(AppContext);


  const logout = () => {
    setToken(false)
    localStorage.removeItem('token')
    toast.success("You Logout..", {
  theme: darkMode ? "dark" : "light",
});

    setTimeout(() => navigate('/'), 500)
  }

  const handleClick = (path) => {
    setDropdownOpen(false); // Close dropdown on click
    if (path === "logout") {
      logout();
    } else {
      navigate(path);
    }
    setDropdownOpen(false); // close dropdown after any click
  };

  useEffect(() => {
    const root = document.documentElement
    if (darkMode) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [darkMode])

  // Scroll detection
  const [isScrolled, setIsScrolled] = useState(false)
  useEffect(() => {
    let lastScrollTop = 0
    const handleScroll = () => {
      const scrollTop = window.scrollY
      if (scrollTop > lastScrollTop) {
        setIsScrolled(false)
      } else {
        setIsScrolled(true)
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className={`sticky top-0 z-50 w-full transition-colors duration-300 ${isScrolled ? "bg-white dark:bg-gray-900 shadow-md" : "bg-transparent"
      }`}>
      <div className='mx-4 sm:mx-[8%] flex items-center justify-between py-4'>

        {/* Logo */}
        
          <NavLink to='/'><span className='text-primary font-bold md:text-4xl text-2xl'>FIXA</span></NavLink>
        

        {/* Desktop menu */}
        <ul className='hidden md:flex items-center gap-12 font-medium mt-4 text-[#222325] dark:text-gray-200'>
          <NavLink to='/'>
            <li className="py-1 hover:text-primary">Home</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
          </NavLink>
          <NavLink to='/services'>
            <li className="py-1 hover:text-primary">Services</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
          </NavLink>
          <NavLink to='/contact'>
            <li className="py-1 hover:text-primary">Contact</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
          </NavLink>
          <NavLink to='/about'>
            <li className="py-1 hover:text-primary">About</li>
            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
          </NavLink>
        </ul>

        {/* Right side */}
        <div className='flex items-center gap-4'>

          {/* Dark/Light Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-yellow-400 transition"
          >
            {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
          </button>

          {userData ? (
            <div
              className="relative flex items-center gap-2 cursor-pointer"
              onMouseEnter={openDropdown}
              onMouseLeave={closeDropdown}
            >
              {/* Profile Icon */}
              <img
                className="w-12 h-12 rounded-full border-4 border-blue-400 object-cover"
                src={userData.image}
                alt="Profile"
              />
              <RiArrowDropDownLine className="text-2xl font-light" />

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute top-14 right-0 w-56 rounded-xl shadow-lg border border-gray-200 bg-white dark:bg-gray-900 dark:border-gray-700 z-20">
                  <div className="flex flex-col py-3">
                    <button
                      onClick={() => handleClick("/my-profile")}
                      className=" flex items-center gap-2 px-5 py-2 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition rounded-md"
                    >
                      <FaUserAlt className='text-blue-500' /> My Profile
                    </button>
                    <button
                      onClick={() => handleClick("/my-booking")}
                      className=" flex items-center gap-2 px-5 py-2 text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition rounded-md"
                    >
                      <FaAddressBook className='text-green-500'/> My Booking
                    </button>
                    <button
                      onClick={() => handleClick("logout")}
                      className="flex items-center gap-2 px-5 py-2 text-left text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition rounded-md"
                    >
                      <IoLogOut className='text-xl'/> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="relative px-5 py-3 mt-2 text-sm font-medium rounded-full border-2 border-primary text-primary overflow-hidden transition-all duration-500 group"
            >
              <span className="absolute inset-0 bg-primary translate-x-full group-hover:translate-x-0 transition-transform duration-500"></span>
              <span className="relative z-10 group-hover:text-white">Create Account</span>
            </button>
          )}

          {/* Mobile menu toggle */}
          <CgMenuRight onClick={() => setShowMenu(true)} className='text-3xl md:hidden dark:text-gray-200' />

          {/* Mobile menu */}
          <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden top-0 right-0 bottom-0 overflow-hidden z-20 bg-white dark:bg-gray-900 transition-all`}>
            <div className='flex items-center justify-between p-4 border-b border-b-slate-400 dark:border-b-gray-700'>
              <div onClick={() => navigate('/')} className='flex gap-1 items-center cursor-pointer'>
                <span className='text-3xl text-primary mt-2'>Fixa</span>
              </div>
              <RxCross1 onClick={() => setShowMenu(false)} className='text-3xl dark:text-gray-200' />
            </div>

            <ul className='flex flex-col items-center gap-6 font-medium mt-4 text-xl text-[#222325] dark:text-gray-200'>
              <NavLink onClick={() => setShowMenu(false)} to='/' ><li>Home</li><hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' /></NavLink>
              <NavLink onClick={() => setShowMenu(false)} to='/services'>All Services <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' /></NavLink>
              <NavLink onClick={() => setShowMenu(false)} to='/contact'>Contact <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' /></NavLink>
              <NavLink onClick={() => setShowMenu(false)} to='/about'>About <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' /></NavLink>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
