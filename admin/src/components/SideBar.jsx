import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { MdDashboard } from "react-icons/md";
import { MdOutlineDateRange } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";
import { FaUserGroup } from "react-icons/fa6";
import { ProviderContext } from '../context/ProviderContext';

const SideBar = () => {

  const { aToken } = useContext(AdminContext)
  const {pToken} = useContext(ProviderContext)

  return (
   <div className='min-h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 transition-colors duration-300'>
  {aToken && (
    <ul className='text-gray-800 dark:text-gray-200'>
      <NavLink
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer 
           ${isActive 
             ? 'bg-[#F2F3FF] dark:bg-gray-800 border-r-4 border-primary text-primary dark:text-blue-400' 
             : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`
        }
        to={"/admin-dashboard"}
      >
        <MdDashboard />
        <p className='hidden md:block'>DashBoard</p>
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer 
           ${isActive 
             ? 'bg-[#F2F3FF] dark:bg-gray-800 border-r-4 border-primary text-primary dark:text-blue-400' 
             : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`
        }
        to={'/all-bookings'}
      >
        <MdOutlineDateRange />
        <p className='hidden md:block'>Booking</p>
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer 
           ${isActive 
             ? 'bg-[#F2F3FF] dark:bg-gray-800 border-r-4 border-primary text-primary dark:text-blue-400' 
             : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`
        }
        to={'/add-provider'}
      >
        <IoMdPersonAdd />
        <p className='hidden md:block'>Add Provider</p>
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer 
           ${isActive 
             ? 'bg-[#F2F3FF] dark:bg-gray-800 border-r-4 border-primary text-primary dark:text-blue-400' 
             : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`
        }
        to={'/provider-list'}
      >
        <FaUserGroup />
        <p className='hidden md:block'>Provider List</p>
      </NavLink>
    </ul>
  )}

  {pToken && (
    <ul className='text-gray-800 dark:text-gray-200'>
      <NavLink
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer 
           ${isActive 
             ? 'bg-[#F2F3FF] dark:bg-gray-800 border-r-4 border-primary text-primary dark:text-blue-400' 
             : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`
        }
        to={"/provider-dashboard"}
      >
        <MdDashboard />
        <p className='hidden md:block'>DashBoard</p>
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer 
           ${isActive 
             ? 'bg-[#F2F3FF] dark:bg-gray-800 border-r-4 border-primary text-primary dark:text-blue-400' 
             : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`
        }
        to={'/provider-bookings'}
      >
        <MdOutlineDateRange />
        <p className='hidden md:block'>Booking</p>
      </NavLink>

      <NavLink
        className={({ isActive }) =>
          `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer 
           ${isActive 
             ? 'bg-[#F2F3FF] dark:bg-gray-800 border-r-4 border-primary text-primary dark:text-blue-400' 
             : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`
        }
        to={'/provider-profile'}
      >
        <FaUserGroup />
        <p className='hidden md:block'>Profile</p>
      </NavLink>
    </ul>
  )}
</div>

  )
}

export default SideBar