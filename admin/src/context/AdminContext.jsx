

import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );
  const [providers, setProviders] = useState([]);

  const [bookings, setBookings] = useState([]); // all bookings for admin

  const [dashData, setDashData] = useState(false); // dashboard data for admin

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Axios instance with interceptor
  // const axiosInstance = axios.create();

  // axiosInstance.interceptors.response.use(
  //   (response) => response,
  //   (error) => {
  //     if (error.response && (error.response.status === 401 || error.response.status === 403)) {
  //       // token expired or unauthorized
  //       localStorage.removeItem("aToken");
  //       setAToken("");
  //       window.location.href = "http://localhost:5174/"; // redirect to login
  //     }
  //     return Promise.reject(error);
  //   }
  // );


  axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      localStorage.removeItem("aToken");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

  const getAllProviders = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/provider-list",
        {},
        { headers: { aToken } }
      );

      if (data.success) {
        setProviders(data.providers);
        console.log(data.providers);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeAvailability = async (proId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availability",
        { proId },
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        getAllProviders();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const getAllBookings = async () => {

    try {

      const {data} = await axios.get(backendUrl + '/api/admin/all-bookings', { headers: {aToken} });
      if(data.success){
        setBookings(data.bookings.reverse());
        console.log(data.bookings);
      }else {
        toast.error(data.message);
      }
      
    } catch (error) {
      toast.error(error.message);
    }

  };

  const cancleBooking = async (bookingId) => {

    try {

      const {data} = await axios.post(backendUrl + '/api/admin/cancle-booking', {bookingId}, { headers: {aToken} });
      if(data.success){
        toast.success(data.message);
        getAllBookings();
      }else {
        toast.error(data.message);
      }
      
    } catch (error) {
      toast.error(error.message);
    }

  };


  const getDashData = async () => {

    try {

      const {data} = await axios.get(backendUrl + '/api/admin/dashboard', {headers: {aToken}});

      if(data.success){
        setDashData(data.dashData);
        console.log(data.dashData);
      }else {
        toast.error(data.message);
      }
      
    } catch (error) {
      
      toast.error(error.message);
      console.error(error);
    }

  };






  const value = {
    aToken,
    setAToken,
    backendUrl,
    providers,
    getAllProviders,
    changeAvailability,
    bookings,
    getAllBookings,
    setBookings,
    cancleBooking,
    dashData,
    getDashData
  };

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
