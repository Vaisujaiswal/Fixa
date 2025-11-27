// import React, { useContext, useEffect, useState } from 'react'
// import { ProviderContext } from '../../context/ProviderContext'
// import { AppContext } from '../../context/AppContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const ProviderProfile = () => {

//   const { pToken, getProfileData, setProfileData, profileData, backendUrl } = useContext(ProviderContext);
//   // const { backendUrl } = useContext(AppContext)

//   const [isEdit, setIsEdit] = useState(false);
//   const [image, setImage] = useState(false);


//   axios.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       if (error.response && (error.response.status === 401 || error.response.status === 403)) {
//         localStorage.removeItem("pToken");
//         window.location.href = "/";
//       }
//       return Promise.reject(error);
//     }
//   );


//   const updateProfile = async() => {
//     try {

//       const updateData = {
//         name: profileData.name, 
//         email: profileData.email, 
//         address: profileData.address, 
//         experience: profileData.experience, 
//         title: profileData.title, 
//         description: profileData.description, 
//         fees: profileData.fees, 
//         available: profileData.available
//       }

//       const {data} = await axios.post(backendUrl + '/api/provider/profile-update', updateData, {headers: { Authorization: `Bearer ${pToken}` }});

//       if(data.success){
//         toast.success(data.message)
//         setIsEdit(false)
//         getProfileData()
//       }else{
//         toast.error(data.message)
//       }

//     } catch (error) {

//       console.log(error)
//       toast.error(error.message)

//     }
//   }

//   useEffect(() => {
//     if (pToken) {
//       getProfileData()
//     }
//   }, [pToken])

//   return profileData && (
//     <div className="max-w-4xl mx-auto mt-10 bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">

//   {/* Header with Gradient */}
//   <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-32 relative">
//     <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
//       <img
//         src={profileData.image}
//         alt={profileData.name}
//         className="w-36 h-36 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl object-cover transition-transform transform hover:scale-105"
//       />
//     </div>
//   </div>

//   {/* Content */}
//   <div className="pt-20 pb-8 px-6 md:px-10 flex flex-col md:flex-row gap-8">

//     {/* Left Section: Basic Info */}
//     <div className="flex-1 space-y-4">
//       <p className="text-3xl font-bold text-gray-800 text-center md:text-center">{profileData.name}</p>
//       <div className="flex flex-wrap gap-4 justify-center md:justify-start text-gray-600">
//         <p className="font-medium bg-gray-100 px-3 py-1 rounded-lg shadow-sm"><span className='font-bold'>Speciality -</span> {profileData.speciality}</p>
//         <p className="font-medium bg-gray-100 px-3 py-1 rounded-lg shadow-sm"><span className='font-bold'> Experience - </span>{profileData.experience}</p>
//       </div>

//       <div className="bg-gray-50 p-4 rounded-xl shadow-md">
//         <p className="font-semibold text-gray-700 mb-1">About:</p>
//         <p className="text-gray-800">{profileData.description}</p>
//       </div>

//       <div className="bg-gray-50 p-4 rounded-xl shadow-md">
//         <p className="font-semibold text-gray-700 mb-1">Address:</p>
//         <p className="text-gray-800">{isEdit ? <input type="text" onChange={(e) => setProfileData(prev => ({...prev, address:{...prev.address, line1:e.target.value }}))} value={profileData.address.line1} /> : profileData.address.line1}</p>
//         <p className="text-gray-800">{isEdit ? <input type="text" onChange={(e) => setProfileData(prev => ({...prev, address:{...prev.address, line2:e.target.value }}))} value={profileData.address.line2} /> : profileData.address.line2}</p>
//       </div>

//       <div className=" flex font-medium bg-gray-100 px-3 py-1 rounded-lg shadow-sm">
//         <p className='text-gray-600'>Fee - </p>
//         <p className='text-gray-600'> ₹ {isEdit ? <input type="number" onChange={(e) => setProfileData(prev => ({...prev, fees: e.target.value}))} value={profileData.fees} /> : profileData.fees}</p>
//       </div>

//       <div className="flex items-center gap-2 mt-2">
//         <input
//           type="checkbox"
//           onChange={() => isEdit && setProfileData(prev => ({...prev, available : !prev.available}))}
//           checked = {profileData.available}
//           className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
//         />
//         <label className="text-gray-700 font-medium">Available</label>
//       </div>

//       <div className="mt-4 text-center md:text-left">

//         {
//           isEdit ? <button onClick={updateProfile} className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-md transition transform hover:scale-105">Save Info</button>
//           :  <button onClick={() => setIsEdit(true)} className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-md transition transform hover:scale-105">Edit</button>
//         }





//       </div>
//     </div>


//   </div>
// </div>


//   )
// }

// export default ProviderProfile








































import React, { useContext, useEffect, useState } from "react";
import { ProviderContext } from "../../context/ProviderContext";
import axios from "axios";
import { toast } from "react-toastify";

const ProviderProfile = () => {
  const { pToken, getProfileData, setProfileData, profileData, backendUrl } =
    useContext(ProviderContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  // Axios interceptor to handle 401/403
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

  // Update profile including image
  const updateProfile = async () => {
    try {
      const formData = new FormData();

      // Append all fields
      formData.append("name", profileData.name);
      formData.append("email", profileData.email);
      formData.append("speciality", profileData.speciality);
      formData.append("experience", profileData.experience);
      formData.append("title", profileData.title);
      formData.append("description", profileData.description);
      formData.append("fees", profileData.fees);
      formData.append("available", profileData.available);

      // Address nested
      formData.append("address[line1]", profileData.address.line1);
      formData.append("address[line2]", profileData.address.line2);

      // Image
      if (image) {
        formData.append("image", image);
      }

      const { data } = await axios.post(
        backendUrl + "/api/provider/profile-update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${pToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setIsEdit(false);
        setImage(null);
        getProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (pToken) {
      getProfileData();
    }
  }, [pToken]);

  if (!profileData) return null;

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-colors duration-300">
      {/* Header with Gradient */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-32 relative">
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
          <label className="relative cursor-pointer">
            <img
              src={image ? URL.createObjectURL(image) : profileData.image}
              alt={profileData.name}
              className="w-36 h-36 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl object-cover transition-transform transform hover:scale-105"
            />
            {isEdit && (
              <div className="absolute bottom-0 right-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-md hover:bg-blue-600 transition">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <span className="text-white font-bold cursor-pointer">✎</span>
              </div>
            )}
          </label>
        </div>
      </div>

      {/* Content */}
      <div className="pt-20 pb-8 px-6 md:px-10 flex flex-col md:flex-row gap-8">
        <div className="flex-1 space-y-4">
          {/* Name */}
          <p className="text-3xl font-bold text-gray-800 dark:text-gray-200 text-center md:text-left">
            {isEdit ? (
              <input
                type="text"
                className="border px-2 py-1 rounded w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
                value={profileData.name}
                onChange={(e) =>
                  setProfileData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            ) : (
              profileData.name
            )}
          </p>

          {/* Speciality & Experience */}
          <div className="flex flex-wrap gap-4 justify-center md:justify-start text-gray-600 dark:text-gray-300">
            <p className="font-medium bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-lg shadow-sm">
              <span className="font-bold">Speciality - </span>
              {profileData.speciality}
            </p>

            <p className="font-medium bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-lg shadow-sm">
              <span className="font-bold">Experience - </span>
              {isEdit ? (
                <input
                  type="text"
                  className="border px-2 py-1 rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                  value={profileData.experience}
                  onChange={(e) =>
                    setProfileData((prev) => ({ ...prev, experience: e.target.value }))
                  }
                />
              ) : (
                profileData.experience
              )}
            </p>
          </div>

          {/* About */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow-md">
            <p className="font-semibold text-gray-700 dark:text-gray-200 mb-1">About:</p>
            {isEdit ? (
              <textarea
                className="w-full border px-2 py-1 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                value={profileData.description}
                onChange={(e) =>
                  setProfileData((prev) => ({ ...prev, description: e.target.value }))
                }
              />
            ) : (
              <p className="text-gray-800 dark:text-gray-200">{profileData.description}</p>
            )}
          </div>

          {/* Address */}
          <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl shadow-md">
            <p className="font-semibold text-gray-700 dark:text-gray-200 mb-1">Address:</p>
            {isEdit ? (
              <>
                <input
                  type="text"
                  className="border px-2 py-1 rounded w-full mb-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                  value={profileData.address.line1}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                />
                <input
                  type="text"
                  className="border px-2 py-1 rounded w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                  value={profileData.address.line2}
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                />
              </>
            ) : (
              <>
                <p className="text-gray-800 dark:text-gray-200">{profileData.address.line1}</p>
                <p className="text-gray-800 dark:text-gray-200">{profileData.address.line2}</p>
              </>
            )}
          </div>

          {/* Fees */}
          <div className="flex font-medium bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-lg shadow-sm">
            <p className="text-gray-600 dark:text-gray-300">Fee - </p>
            <p className="text-gray-600 dark:text-gray-300 ml-2">
              {isEdit ? (
                <input
                  type="number"
                  className="border px-2 py-1 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                  value={profileData.fees}
                  onChange={(e) =>
                    setProfileData((prev) => ({ ...prev, fees: e.target.value }))
                  }
                />
              ) : (
                profileData.fees
              )}
            </p>
          </div>

          {/* Availability */}
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              onChange={() =>
                isEdit && setProfileData((prev) => ({ ...prev, available: !prev.available }))
              }
              checked={profileData.available}
              className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
            />
            <label className="text-gray-700 dark:text-gray-200 font-medium">Available</label>
          </div>

          {/* Buttons */}
          <div className="mt-4 text-center md:text-left">
            {isEdit ? (
              <button
                onClick={updateProfile}
                className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl shadow-md transition transform hover:scale-105"
              >
                Save Info
              </button>
            ) : (
              <button
                onClick={() => setIsEdit(true)}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl shadow-md transition transform hover:scale-105"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>
</div>
      );
};

      export default ProviderProfile;
