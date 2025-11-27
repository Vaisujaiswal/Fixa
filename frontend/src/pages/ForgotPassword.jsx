// import React, { useState, useContext, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { AppContext } from "../context/AppContext";
// import { useNavigate } from "react-router-dom";

// const ForgotPassword =  () => {
//   const { backendUrl, darkMode } = useContext(AppContext);
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//   // ✅ if user is already logged in, prevent access to reset-password
//   const token = localStorage.getItem("token");
//   if (token) {
//     navigate("/"); // redirect to home or dashboard
//   }
// }, [navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!email) return toast.error("Please enter your email", {
//             theme: darkMode ? "dark" : "light",
//           });
//     setLoading(true);
//     try {
//       const { data } = await axios.post(`${backendUrl}/api/user/forgot-password`, { email });
//       if (data.success) {
//         toast.success(data.message || "OTP sent", {
//             theme: darkMode ? "dark" : "light",
//           });
//         // navigate to reset page and pass email (optional)
//         navigate("/reset-password", { state: { email } });
//       } else {
//         toast.error(data.message || "Failed", {
//             theme: darkMode ? "dark" : "light",
//           });
//       }
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Network error", {
//             theme: darkMode ? "dark" : "light",
//           });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-blue-300 px-4 py-10">
//       <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
//         <h2 className="text-3xl font-bold text-center text-blue-700 mb-4">Forgot Password</h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//             placeholder="Enter your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             type="email"
//             required
//           />
//           <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700" disabled={loading}>
//             {loading ? "Sending..." : "Send OTP"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }



// export default ForgotPassword;













































import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

const ForgotPassword = () => {
  const { backendUrl, darkMode } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Prevent access if user already logged in
    const token = localStorage.getItem("token");
    if (token) navigate("/");
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email)
      return toast.error("Please enter your email", {
        theme: darkMode ? "dark" : "light",
      });

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/forgot-password`,
        { email }
      );

      if (data.success) {
        toast.success(data.message || "OTP sent successfully!", {
          theme: darkMode ? "dark" : "light",
        });
        navigate("/reset-password", { state: { email } });
      } else {
        toast.error(data.message || "Something went wrong!", {
          theme: darkMode ? "dark" : "light",
        });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Network error", {
        theme: darkMode ? "dark" : "light",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          : "bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`rounded-2xl shadow-2xl p-8 w-full max-w-md backdrop-blur-md ${
          darkMode ? "bg-gray-900/70 border border-gray-700" : "bg-white"
        }`}
      >
        <div className="text-center mb-6">
          <Mail
            className={`w-12 h-12 mx-auto ${
              darkMode ? "text-blue-400" : "text-blue-600"
            }`}
          />
          <h2
            className={`text-3xl font-bold mt-2 ${
              darkMode ? "text-white" : "text-blue-700"
            }`}
          >
            Forgot Password
          </h2>
          <p
            className={`mt-1 text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Enter your registered email to receive OTP
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`w-full px-4 py-3 rounded-lg outline-none transition-all duration-200 ${
                darkMode
                  ? "bg-gray-800 text-white border border-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-blue-400"
                  : "bg-white border border-gray-300 focus:ring-2 focus:ring-blue-400"
              }`}
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className={`w-full py-2.5 rounded-lg text-white font-semibold transition-all duration-300 ${
              loading
                ? "opacity-80 cursor-not-allowed"
                : "hover:shadow-lg hover:shadow-blue-500/30"
            } ${
              darkMode
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send OTP"}
          </motion.button>
        </form>

        <p
          onClick={() => navigate("/login")}
          className={`mt-6 text-center text-sm cursor-pointer hover:underline ${
            darkMode ? "text-gray-400 hover:text-blue-400" : "text-gray-600 hover:text-blue-600"
          }`}
        >
          Back to Login
        </p>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
