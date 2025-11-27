// import { toast } from "react-toastify";

// export const confirmToast = (message, onConfirm) => {
//   toast(
//     ({ closeToast }) => (
//       <div>
//         <p>{message}</p>
//         <div className="flex gap-2 mt-2">
//           <button
//             onClick={() => {
//               onConfirm();
//               closeToast();
//             }}
//             className="px-3 py-1 bg-red-600 text-white rounded"
//           >
//             Yes
//           </button>
//           <button
//             onClick={closeToast}
//             className="px-3 py-1 bg-gray-300 rounded"
//           >
//             No
//           </button>
//         </div>
//       </div>
//     ),
//     { autoClose: false, closeOnClick: false } // stay open until user decides
//   );
// };









// import { toast } from "react-toastify";

// export const showToast = (message, type = "success", darkMode = false) => {
//   toast(message, {
//     type, // "success", "error", "info", etc.
//     position: "top-right",
//     autoClose: 3000,
//     hideProgressBar: false,
//     closeOnClick: true,
//     pauseOnHover: true,
//     draggable: true,
//     theme: darkMode ? "dark" : "light", // dynamic theme
//   });
// };





























import { toast } from "react-toastify";

export const confirmToast = (message, onConfirm, darkMode = false) => {
  toast(
    ({ closeToast }) => (
      <div>
        <p>{message}</p>
        <div className="flex gap-2 mt-2">
          <button
            onClick={() => {
              onConfirm();
              closeToast();
            }}
            className="px-3 py-1 bg-red-600 text-white rounded"
          >
            Yes
          </button>
          <button
            onClick={closeToast}
            className="px-3 py-1 bg-gray-300 rounded"
          >
            No
          </button>
        </div>
      </div>
    ),
    {
      autoClose: false,
      closeOnClick: false,
      theme: darkMode ? "dark" : "light",
    }
  );
};

