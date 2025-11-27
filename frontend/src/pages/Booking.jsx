


import React, { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { MdVerified, MdCurrencyRupee } from "react-icons/md";
import { FaCircleInfo, FaLocationDot } from "react-icons/fa6";
import RelatedServices from '../components/RelatedServices';
import ReviewSection from "../components/ReviewSection";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Booking = () => {
  const { proId } = useParams();
  const { serviceProviders, backendUrl, token, getProviderData, userData, darkMode } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const navigate = useNavigate();

  const [providerInfo, setProviderInfo] = useState(null);
  const [providerSlot, setProviderSlot] = useState([]);
  const [slotIndex, SetslotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const getAvailableSlot = async () => {
    setProviderSlot([]);
    let today = new Date();
    const slotsBooked = providerInfo.slots_booked || {};

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      const slotDate = `${day}-${month}-${year}`;

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const isSlotAvailable =
          currentDate > new Date() &&
          !slotsBooked[slotDate]?.includes(formattedTime);

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          });
        }
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      setProviderSlot(prev => [...prev, timeSlots]);
    }
  };

  const bookingAppointment = async () => {
    if (!token || !userData) {
      toast.warn('User data missing. Please login again.', {
            theme: darkMode ? "dark" : "light",
          });
      return navigate('/login');
    }

    const userId = userData._id;
    const userDetails = userData;

    if (!slotTime || providerSlot.length === 0) {
      toast.warn('Please select a date and time slot', {
            theme: darkMode ? "dark" : "light",
          });
      return;
    }

    const date = providerSlot[slotIndex][0].datetime;
    const slotDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;

    try {
      const { data } = await axios.post(
        backendUrl + '/api/user/my-booking',
        {
          proId,
          slotData: slotDate,
          slotTime,
          userId,
          userData: userDetails,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message, {
            theme: darkMode ? "dark" : "light",
          });
        getProviderData();
        return navigate('/my-booking');
      } else {
        toast.error(data.message, {
            theme: darkMode ? "dark" : "light",
          });
      }
    } catch (error) {
      console.log(error);
      toast.error('Error booking appointment', {
            theme: darkMode ? "dark" : "light",
          });
    }
  };

  useEffect(() => {
    const fetchProviderInfo = () => {
      const info = serviceProviders.find(pro => pro._id === proId);
      setProviderInfo(info);
    };
    fetchProviderInfo();
  }, [serviceProviders, proId]);

  useEffect(() => {
    if (providerInfo) {
      getAvailableSlot();
    }
  }, [providerInfo]);

  if (!providerInfo) {
    return <div className="text-center mt-10 text-gray-500 dark:text-gray-400">Loading provider details...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 p-4 md:p-8 transition-all duration-500">
      {/* Profile Section */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg dark:shadow-gray-700 p-6 flex flex-col md:flex-row gap-6 max-w-5xl mx-auto mb-10">
        {/* Profile Image */}
        <div className="flex-shrink-0 flex justify-center md:w-1/3">
          <img
            src={providerInfo.image}
            alt={providerInfo.fullName}
            className="w-40 h-40 rounded-full object-cover border-4 border-blue-200 dark:border-blue-500 shadow-md"
          />
        </div>

        {/* Details */}
        <div className="md:w-2/3 flex flex-col gap-3 text-center md:text-left">
          <div className="text-2xl font-semibold flex items-center justify-center md:justify-start gap-2 text-gray-800 dark:text-gray-200">
            {providerInfo.name}
            <MdVerified className="text-blue-600" title="Verified" />
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm flex items-center gap-2">
            Speciality - {providerInfo.speciality}
          </p>
          <div className='flex items-center justify-start gap-5'>
            <p className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 w-fit px-3 py-1 rounded-full text-sm mx-auto md:mx-0">
              {providerInfo.experience} experience
            </p>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-sm flex items-center gap-2">
            <FaLocationDot /> {providerInfo.location}
          </p>

          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-600 mt-2">
            <h3 className="text-lg font-semibold flex items-center gap-2 mb-2 text-gray-800 dark:text-gray-200">
              <FaCircleInfo /> About Me
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm">{providerInfo.description}</p>
          </div>
          <p className="text-gray-800 dark:text-gray-200 flex items-center justify-center md:justify-start gap-1 mt-2">
            Booking fee: <MdCurrencyRupee /> <span>{providerInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* Booking Slot Section */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md dark:shadow-gray-700 p-6 max-w-5xl mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-center text-gray-800 dark:text-gray-200">Available Booking Slots</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 w-full">
          {providerSlot.length > 0 && providerSlot
            .map((item, index) => ({ slots: item, index }))
            .filter(day => day.slots.length > 0)
            .map(day => (
              <div
                key={`day-${day.index}`}
                onClick={() => SetslotIndex(day.index)}
                className={`text-center py-3 min-w-6 rounded-full cursor-pointer transition ${slotIndex === day.index
                  ? 'bg-primary text-white'
                  : 'border border-gray-500 dark:border-gray-400 dark:text-gray-300 text-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
              >
                <p>{daysOfWeek[day.slots[0].datetime.getDay()]}</p>
                <p>{day.slots[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>

        <div className='flex items-center gap-3 w-full overflow-x-auto mt-4'>
          {providerSlot.length > 0 && providerSlot[slotIndex]?.map((item) => (
            <p
              key={`time-${item.datetime.getTime()}`}
              onClick={() => setSlotTime(item.time)}
              className={`text-sm font-light flex-shrink-0 px-3 py-1 rounded-full border cursor-pointer transition ${item.time === slotTime
                ? 'bg-primary text-white border-primary'
                : 'text-gray-800 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
            >
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>

        <button
          onClick={bookingAppointment}
          className='bg-primary text-white px-12 py-3 rounded-full mt-5 hover:bg-blue-700 transition'
        >
          Book a service
        </button>
      </div>

      <ReviewSection providerId={providerInfo._id} />
      <RelatedServices proId={proId} speciality={providerInfo.speciality} />
    </div>
  );
};

export default Booking;
