import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const ProviderContext = createContext();

const ProviderContextProvider = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [pToken, setPToken] = useState(localStorage.getItem("pToken") ? localStorage.getItem("pToken") : "");

  const [bookings, setBookings] = useState([]);
  const [dashData, setDashData] = useState(false);

  const [profileData, setProfileData] = useState(false);



   axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        localStorage.removeItem("pToken");
        window.location.href = "/";
      }
      return Promise.reject(error);
    }
  );

  const getBookings = async () => {
    try {

      const { data } = await axios.get(backendUrl + "/api/provider/bookings", {
        headers: {
          Authorization: `Bearer ${pToken}`, // ✅ standard way
        },
      });



      console.log("Sending token:", pToken);


      if (data.success) {
        setBookings(data.bookings);
        console.log(data.bookings);
      } else {
        toast.error(data.message);
      }

    } catch (error) {

      console.log(error);
      toast.error("Something went wrong");

    }
  };

  // const completeBooking = async (bookingId) => {

  //   try {

  //     const { data } = await axios.post(backendUrl + "/api/provider/complete-booking", { bookingId }, {
  //       headers: {
  //         Authorization: `Bearer ${pToken}`, // ✅ standard way
  //       },
  //     })
  //     if (data.success) {
  //       toast.success(data.message);
  //       getBookings();
  //     } else {
  //       toast.error(data.message);
  //     }

  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Something went wrong");
  //   }

  // }


  const completeBooking = async (bookingId) => {
  try {
    const { data } = await axios.post(backendUrl + "/api/provider/complete-booking", { bookingId }, {
      headers: { Authorization: `Bearer ${pToken}` },
    });

    if (data.success) {
      toast.success(data.message);

      // Optimistically update bookings state
      setBookings(prev => prev.map(b => b._id === bookingId ? { ...b, isCompleted: true } : b));
      
      // Also update dashData.latestBookings if exists
      setDashData(prev => prev ? {
        ...prev,
        latestBookings: prev.latestBookings.map(b => b._id === bookingId ? { ...b, isCompleted: true } : b)
      } : prev);

    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};


const cancleBooking = async (bookingId) => {
  try {
    const { data } = await axios.post(backendUrl + "/api/provider/cancel-booking", { bookingId }, {
      headers: { Authorization: `Bearer ${pToken}` },
    });

    if (data.success) {
      toast.success(data.message);

      // Optimistically update bookings state
      setBookings(prev => prev.map(b => b._id === bookingId ? { ...b, cancelled: true } : b));

      // Also update dashData.latestBookings if exists
      setDashData(prev => prev ? {
        ...prev,
        latestBookings: prev.latestBookings.map(b => b._id === bookingId ? { ...b, cancelled: true } : b)
      } : prev);

    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
};



  const getDashData = async () => {

    try {

      const { data } = await axios.get(backendUrl + "/api/provider/dashboard", {
        headers: {
          Authorization: `Bearer ${pToken}`, // ✅ standard way
        }
      })

      if(data.success){
        setDashData(data.dashData);
        console.log(data.dashData);
      }else{
        console.log(data.message);
        toast.error(data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

  }


  const getProfileData = async() => {

    try {
      const {data} = await axios.get(backendUrl + "/api/provider/profile", {headers: {
          Authorization: `Bearer ${pToken}`, // ✅ standard way
        },})

        if(data.success){
          setProfileData(data.profileData)
          console.log(data.profileData)
        }
    } catch (error) {
       console.log(error);
      toast.error("Something went wrong");
    }

  }

  const value = {
    backendUrl,
    pToken,
    setPToken,
    bookings,
    getBookings,
    setBookings,
    completeBooking,
    cancleBooking,
    dashData,
    getDashData,
    setDashData,
    profileData,
    setProfileData,
    getProfileData
  };

  return (
    <ProviderContext.Provider value={value}>
      {props.children}
    </ProviderContext.Provider>
  );
}

export default ProviderContextProvider;