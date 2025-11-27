
// import React, { useContext, useState } from 'react'
// import { AppContext } from '../context/AppContext';
// import { assets } from '../assets/assets';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const MyProfile = () => {
//   const { userData, setUserData, token, backendUrl, loadUserProfileData, darkMode } = useContext(AppContext);
//   const [isEdit, setIsEdit] = useState(false);
//   const [image, setImage] = useState(false);

//   const updateUserProfileData = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('name', userData.name);
//       formData.append('phoneNumber', userData.phoneNumber);
//       formData.append('address', JSON.stringify(userData.address));
//       formData.append('gender', userData.gender)
//       formData.append('dob', userData.dob);
//       image && formData.append('image', image);

//       const { data } = await axios.post(
//         backendUrl + '/api/user/update-profile',
//         formData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       )

//       if (data.success) {
//         toast.success(data.message, {
//           theme: darkMode ? "dark" : "light",
//         });
//         await loadUserProfileData();
//         setIsEdit(false);
//         setImage(false);
//       } else {
//         toast.error(data.message, {
//           theme: darkMode ? "dark" : "light",
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Error in updating profile data", {
//         theme: darkMode ? "dark" : "light",
//       });
//     }
//   }

//   return userData && (
//     <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-950 
//                     rounded-3xl shadow-xl border border-gray-200 dark:border-gray-700 
//                     transition-all duration-500 hover:shadow-[0_0_15px_#3b82f6]">

//       {/* Profile Image */}
//       <div className="flex flex-col items-center">
//         {isEdit ? (
//           <label htmlFor="image" className="relative cursor-pointer group">
//             <img
//               className="w-36 h-36 md:w-40 md:h-40 rounded-full object-cover 
//                  opacity-80 group-hover:opacity-100 transition-all duration-300
//                  shadow-[0_0_15px_#3b82f6] hover:shadow-[0_0_25px_#3b82f6]"
//               src={image ? URL.createObjectURL(image) : userData.image}
//               alt=""
//             />
//             <div className="absolute bottom-0 right-0 w-10 h-10 bg-blue-500 
//                     rounded-full flex items-center justify-center shadow-md 
//                     hover:bg-blue-600 hover:shadow-[0_0_15px_#3b82f6] transition">
//               <img src={assets.defaultImg} alt="edit" className="w-6 h-6" />
//             </div>
//             <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
//           </label>
//         ) : (
//           <img
//             className="w-36 h-36 md:w-40 md:h-40 rounded-full border-4 border-blue-400 
//                object-cover transition-transform transform hover:scale-105 
//                shadow-[0_0_15px_#3b82f6] hover:shadow-[0_0_25px_#3b82f6]"
//             src={userData.image}
//             alt=""
//           />
//         )}


//         {/* Name */}
//         <div className="mt-4 text-center">
//           {isEdit ? (
//             <input
//               type="text"
//               value={userData.name}
//               onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
//               className="border px-4 py-2 rounded-xl shadow-sm focus:outline-none 
//                          focus:ring-2 focus:ring-blue-400 w-full text-center 
//                          text-lg font-semibold dark:bg-gray-800 dark:text-white"
//             />
//           ) : (
//             <p className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">
//               {userData.name}
//             </p>
//           )}
//         </div>
//       </div>

//       <hr className="my-6 border-gray-200 dark:border-gray-700" />

//       {/* Contact Info */}
//       <div className="space-y-4">
//         <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
//           Contact Information
//         </p>
//         <div className="space-y-3">
//           {/* Email */}
//           <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-sm 
//                           flex flex-col md:flex-row md:justify-between gap-2 md:gap-0 
//                           hover:shadow-[0_0_10px_#3b82f6] transition">
//             <p className="font-medium text-gray-600 dark:text-gray-400">Email ID:</p>
//             <p className="text-gray-800 dark:text-gray-200">{userData.email}</p>
//           </div>

//           {/* Phone */}
//           <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-sm 
//                           flex flex-col md:flex-row md:justify-between gap-2 md:gap-0 
//                           hover:shadow-[0_0_10px_#3b82f6] transition">
//             <p className="font-medium text-gray-600 dark:text-gray-400">Phone Number:</p>
//             {isEdit ? (
//               <input
//                 type="text"
//                 value={userData.phoneNumber}
//                 onChange={e => setUserData(prev => ({ ...prev, phoneNumber: e.target.value }))}
//                 className="border px-3 py-2 rounded-lg shadow-sm w-full md:w-60 
//                            focus:outline-none focus:ring-2 focus:ring-blue-400 
//                            dark:bg-gray-700 dark:text-white"
//               />
//             ) : (
//               <p className="text-gray-800 dark:text-gray-200">{userData.phoneNumber}</p>
//             )}
//           </div>

//           {/* Address */}
//           <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-sm 
//                           flex flex-col md:flex-row md:justify-between gap-2 md:gap-0 
//                           hover:shadow-[0_0_10px_#3b82f6] transition">
//             <p className="font-medium text-gray-600 dark:text-gray-400">Address:</p>
//             {isEdit ? (
//               <div className="space-y-2 w-full md:w-60">
//                 <input
//                   type="text"
//                   value={userData.address.address1}
//                   onChange={e => setUserData(prev => ({
//                     ...prev,
//                     address: { ...prev.address, address1: e.target.value }
//                   }))}
//                   className="border px-3 py-2 rounded-lg shadow-sm w-full 
//                              focus:outline-none focus:ring-2 focus:ring-blue-400 
//                              dark:bg-gray-700 dark:text-white"
//                 />
//                 <input
//                   type="text"
//                   value={userData.address.address2}
//                   onChange={e => setUserData(prev => ({
//                     ...prev,
//                     address: { ...prev.address, address2: e.target.value }
//                   }))}
//                   className="border px-3 py-2 rounded-lg shadow-sm w-full 
//                              focus:outline-none focus:ring-2 focus:ring-blue-400 
//                              dark:bg-gray-700 dark:text-white"
//                 />
//               </div>
//             ) : (
//               <p className="text-gray-800 dark:text-gray-200">
//                 {userData.address.address1} <br />
//                 {userData.address.address2}
//               </p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Basic Info */}
//       <div className="mt-6 space-y-4">
//         <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
//           Basic Information
//         </p>
//         <div className="space-y-3">
//           {/* Gender */}
//           <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-sm 
//                           flex flex-col md:flex-row md:justify-between gap-2 md:gap-0 
//                           hover:shadow-[0_0_10px_#3b82f6] transition">
//             <p className="font-medium text-gray-600 dark:text-gray-400">Gender:</p>
//             {isEdit ? (
//               <select
//                 value={userData.gender}
//                 onChange={e => setUserData(prev => ({ ...prev, gender: e.target.value }))}
//                 className="border px-3 py-2 rounded-lg shadow-sm focus:outline-none 
//                            focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
//               >
//                 <option value="Male">Male</option>
//                 <option value="Female">Female</option>
//               </select>
//             ) : (
//               <p className="text-gray-800 dark:text-gray-200">{userData.gender}</p>
//             )}
//           </div>

//           {/* DOB */}
//           <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-sm 
//                           flex flex-col md:flex-row md:justify-between gap-2 md:gap-0 
//                           hover:shadow-[0_0_10px_#3b82f6] transition">
//             <p className="font-medium text-gray-600 dark:text-gray-400">Date of Birth:</p>
//             {isEdit ? (
//               <input
//                 type="date"
//                 value={userData.dob}
//                 onChange={e => setUserData(prev => ({ ...prev, dob: e.target.value }))}
//                 className="border px-3 py-2 rounded-lg shadow-sm focus:outline-none 
//                            focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
//               />
//             ) : (
//               <p className="text-gray-800 dark:text-gray-200">{userData.dob}</p>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Buttons */}
//       <div className="mt-6 flex justify-center">
//         {isEdit ? (
//           <button
//             onClick={updateUserProfileData}
//             className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white 
//                        rounded-xl shadow-md transition transform hover:scale-105 
//                        hover:shadow-[0_0_15px_#3b82f6]"
//           >
//             Save Information
//           </button>
//         ) : (
//           <button
//             onClick={() => setIsEdit(true)}
//             className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white 
//                        rounded-xl shadow-md transition transform hover:scale-105 
//                        hover:shadow-[0_0_15px_#3b82f6]"
//           >
//             Edit
//           </button>
//         )}
//       </div>
//     </div>
//   )
// }

// export default MyProfile;








































import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import { Pencil, Check } from "lucide-react"; // ✨ Elegant icons

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData, darkMode } =
    useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      // Basic validation
      if (
        !userData.name?.trim() ||
        !userData.phoneNumber?.trim() ||
        !userData.address?.address1?.trim() ||
        !userData.gender?.trim() ||
        !userData.dob?.trim()
      ) {
        toast.error("Please fill all required fields before saving.", {
          theme: darkMode ? "dark" : "light",
        });
        return;
      }

      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phoneNumber", userData.phoneNumber);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);
      if (image) formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(data.message, {
          theme: darkMode ? "dark" : "light",
        });
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message, {
          theme: darkMode ? "dark" : "light",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in updating profile data", {
        theme: darkMode ? "dark" : "light",
      });
    }
  };

  return (
    userData && (
      <div
        className="relative max-w-2xl mx-auto p-6 bg-white dark:bg-gray-950 
                    rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800 
                    transition-all duration-500 hover:shadow-[0_0_15px_#3b82f6]"
      >
        {/*  Floating Edit Icon */}
        <button
          onClick={() => {
            if (isEdit) updateUserProfileData();
            else setIsEdit(true);
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-blue-500 text-white 
                     hover:bg-blue-600 shadow-md transition transform hover:scale-110"
        >
          {isEdit ? <Check className="w-5 h-5 " /> : <Pencil className="w-5 h-5" />}
        </button>

        {/* Profile Image */}
        <div className="flex flex-col items-center">
          {isEdit ? (
            <label htmlFor="image" className="relative cursor-pointer group">
              <img
                className="w-36 h-36 md:w-40 md:h-40 rounded-full object-cover 
                   opacity-80 group-hover:opacity-100 transition-all duration-300
                   shadow-[0_0_15px_#3b82f6] hover:shadow-[0_0_25px_#3b82f6]"
                src={image ? URL.createObjectURL(image) : userData.image}
                alt=""
              />
              <div className="absolute bottom-0 right-0 w-10 h-10 bg-blue-500 
                      rounded-full flex items-center justify-center shadow-md 
                      hover:bg-blue-600 transition">
                <img src={assets.defaultImg} alt="edit" className="w-6 h-6" />
              </div>
              <input
                onChange={(e) => setImage(e.target.files[0])}
                type="file"
                id="image"
                hidden
              />
            </label>
          ) : (
            <img
              className="w-36 h-36 md:w-40 md:h-40 rounded-full border-4 border-blue-400 
                 object-cover transition-transform transform hover:scale-105 
                 shadow-[0_0_15px_#3b82f6]"
              src={userData.image}
              alt=""
            />
          )}

          {/* Name */}
          <div className="mt-4 text-center">
            {isEdit ? (
              <input
                type="text"
                value={userData.name}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-xl 
                           shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 
                           w-full text-center text-lg font-semibold 
                           bg-gray-50 dark:bg-gray-800 dark:text-white"
              />
            ) : (
              <p className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200">
                {userData.name}
              </p>
            )}
          </div>
        </div>

        <hr className="my-6 border-gray-200 dark:border-gray-700" />

        {/* Contact Info */}
        <div className="space-y-4">
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Contact Information
          </p>

          {/* Email */}
          <div
            className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-sm 
                        flex flex-col md:flex-row md:justify-between gap-2 md:gap-0 
                        hover:shadow-[0_0_10px_#3b82f6] transition"
          >
            <p className="font-medium text-gray-600 dark:text-gray-400">Email ID:</p>
            <p className="text-gray-800 dark:text-gray-200">{userData.email}</p>
          </div>

          {/* Phone */}
          <div
            className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-sm 
                        flex flex-col md:flex-row md:justify-between gap-2 md:gap-0 
                        hover:shadow-[0_0_10px_#3b82f6] transition"
          >
            <p className="font-medium text-gray-600 dark:text-gray-400">
              Phone Number:
            </p>
            {isEdit ? (
              <input
                type="text"
                value={userData.phoneNumber}
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    phoneNumber: e.target.value,
                  }))
                }
                className="border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-400 
                           bg-gray-50 dark:bg-gray-800 dark:text-white w-full md:w-60"
              />
            ) : (
              <p className="text-gray-800 dark:text-gray-200">
                {userData.phoneNumber}
              </p>
            )}
          </div>

          {/* Address */}
          <div
            className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-sm 
                        flex flex-col md:flex-row md:justify-between gap-2 md:gap-0 
                        hover:shadow-[0_0_10px_#3b82f6] transition"
          >
            <p className="font-medium text-gray-600 dark:text-gray-400">Address:</p>
            {isEdit ? (
              <div className="space-y-2 w-full md:w-60">
                <input
                  type="text"
                  value={userData.address.address1}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, address1: e.target.value },
                    }))
                  }
                  className="border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-blue-400 
                             bg-gray-50 dark:bg-gray-800 dark:text-white w-full"
                />
                <input
                  type="text"
                  value={userData.address.address2}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, address2: e.target.value },
                    }))
                  }
                  className="border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg 
                             focus:outline-none focus:ring-2 focus:ring-blue-400 
                             bg-gray-50 dark:bg-gray-800 dark:text-white w-full"
                />
              </div>
            ) : (
              <p className="text-gray-800 dark:text-gray-200">
                {userData.address.address1} <br />
                {userData.address.address2}
              </p>
            )}
          </div>
        </div>

        {/* Basic Info */}
        <div className="mt-6 space-y-4">
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Basic Information
          </p>

          {/* Gender */}
          <div
            className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-sm 
                        flex flex-col md:flex-row md:justify-between gap-2 md:gap-0 
                        hover:shadow-[0_0_10px_#3b82f6] transition"
          >
            <p className="font-medium text-gray-600 dark:text-gray-400">Gender:</p>
            {isEdit ? (
              <select
                value={userData.gender}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                className="border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-400 
                           bg-gray-50 dark:bg-gray-800 dark:text-white"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="text-gray-800 dark:text-gray-200">{userData.gender}</p>
            )}
          </div>

          {/* DOB */}
          <div
            className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-sm 
                        flex flex-col md:flex-row md:justify-between gap-2 md:gap-0 
                        hover:shadow-[0_0_10px_#3b82f6] transition"
          >
            <p className="font-medium text-gray-600 dark:text-gray-400">
              Date of Birth:
            </p>
            {isEdit ? (
              <input
                type="date"
                value={userData.dob}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
                className="border border-gray-300 dark:border-gray-600 px-3 py-2 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-400 
                           bg-gray-50 dark:bg-gray-800 dark:text-white"
              />
            ) : (
              <p className="text-gray-800 dark:text-gray-200">{userData.dob}</p>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default MyProfile;













//   return (
// //     <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-blue-200 py-10 px-4 flex items-center justify-center">
// //       <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-3xl transition-all duration-300">
// //         <div className="flex flex-col md:flex-row items-center gap-8">
// //           <img
// //             src={userData.image}
// //             alt="profile"
// //             className="w-36 h-36 rounded-full border-4 border-blue-400 object-cover shadow-md"
// //           />
// //           <div className="flex-1 w-full">
// //             <h2 className="text-3xl font-bold text-blue-700 mb-4">
// //               {isEdit ? 'Edit Profile' : 'My Profile'}
// //             </h2>
// //             <div className="space-y-3">
// //               <InputField label="Name" name="name" value={userData.name} isEdit={isEdit} onChange={handleChange} />
// //               <InputField label="Email" name="email" value={userData.email} isEdit={isEdit} onChange={handleChange} />
// //               <InputField label="Phone" name="phone" value={userData.phone} isEdit={isEdit} onChange={handleChange} />
// //               <InputField label="Address Line 1" name="line1" value={userData.address.line1} isEdit={isEdit} onChange={handleChange} />
// //               <InputField label="Address Line 2" name="line2" value={userData.address.line2} isEdit={isEdit} onChange={handleChange} />
// //               <InputField label="Gender" name="gender" value={userData.gender} isEdit={isEdit} onChange={handleChange} />
// //               <InputField label="Date of Birth" name="dob" value={userData.dob} isEdit={isEdit} onChange={handleChange} type="date" />
// //             </div>

// //             <div className="mt-6 flex gap-4">
// //               <button
// //                 onClick={isEdit ? handleSave : handleToggleEdit}
// //                 className={`px-6 py-2 rounded-lg text-white font-semibold transition ${
// //                   isEdit ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
// //                 }`}
// //               >
// //                 {isEdit ? 'Save' : 'Edit'}
// //               </button>
// //               {isEdit && (
// //                 <button
// //                   onClick={handleToggleEdit}
// //                   className="px-6 py-2 rounded-lg border border-red-500 text-red-600 hover:bg-red-100"
// //                 >
// //                   Cancel
// //                 </button>
// //               )}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // const InputField = ({ label, name, value, onChange, isEdit, type = 'text' }) => (
// //   <div>
// //     <label className="block text-sm font-medium text-gray-700">{label}</label>
// //     {isEdit ? (
// //       <input
// //         type={type}
// //         name={name}
// //         value={value}
// //         onChange={onChange}
// //         className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
// //       />
// //     ) : (
// //       <p className="mt-1 text-gray-800 font-medium">{value}</p>
// //     )}
// //   </div>
// // );

// // export default MyProfile;
