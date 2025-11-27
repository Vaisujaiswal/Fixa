import React, { useContext } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import SideBar from './components/SideBar';
import { Route, Router, Routes } from 'react-router-dom';
import DashBoard from './pages/Admin/DashBoard';
import AllBookings from './pages/Admin/AllBookings';
import AddProvider from './pages/Admin/AddProvider';
import ProviderList from './pages/Admin/ProviderList';
import { ProviderContext } from './context/ProviderContext';
import ProviderDashboard from './pages/Provider/ProviderDashboard';
import ProviderBooking from './pages/Provider/ProviderBooking';
import ProviderProfile from './pages/Provider/ProviderProfile';
import ProviderChatPage from './pages/Provider/ProviderChatPage';
import Login from './pages/Login';
const App = () => {

  const { aToken } = useContext(AdminContext);
  const { pToken } = useContext(ProviderContext);

 return aToken || pToken ? (
  <div className="h-screen flex flex-col overflow-hidden bg-[#eef4f4] dark:bg-gray-950">
    <ToastContainer />

    {/* Navbar fixed on top */}
    <Navbar />

    <div className="flex flex-1 overflow-hidden">
      {/* Sidebar fixed height, left */}
      <SideBar />

      {/* Main content area */}
      <div className="flex-1 overflow-auto p-4">
        <Routes>
          {/* Admin Routes */}
          <Route path="/" element={<></>} />
          <Route path="/chat/:providerId" element={<ProviderChatPage />} />
          <Route path="/admin-dashboard" element={<DashBoard />} />
          <Route path="/all-bookings" element={<AllBookings />} />
          <Route path="/add-provider" element={<AddProvider />} />
          <Route path="/provider-list" element={<ProviderList />} />

          {/* Provider Routes */}
          <Route path="/provider-dashboard" element={<ProviderDashboard />} />
          <Route path="/provider-bookings" element={<ProviderBooking />} />
          <Route path="/provider-profile" element={<ProviderProfile />} />
        </Routes>
      </div>
    </div>
  </div>
) : (
  <>
    <Login />
    <ToastContainer />
  </>
);

}

export default App