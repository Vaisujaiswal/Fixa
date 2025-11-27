

import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContext } from "../context/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import PageWrapper from "../components/PageWrapper";

const ResetPassword = () => {
  const { backendUrl, setToken, darkMode } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  const prefillEmail = location.state?.email || "";
  const [email, setEmail] = useState(prefillEmail);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  //  Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/");
  }, [navigate]);

  useEffect(() => {
    if (prefillEmail) setEmail(prefillEmail);
  }, [prefillEmail]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !otp || !password)
      return toast.error("Fill all fields", { theme: darkMode ? "dark" : "light" });
    if (password !== password2)
      return toast.error("Passwords do not match", { theme: darkMode ? "dark" : "light" });

    setLoading(true);
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/reset-password`, { email, otp, password });
      if (data.success) {
        toast.success(data.message || "Password reset", { theme: darkMode ? "dark" : "light" });
        if (data.token) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
        }
        navigate("/");
      } else {
        toast.error(data.message || "Failed", { theme: darkMode ? "dark" : "light" });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Error", { theme: darkMode ? "dark" : "light" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageWrapper>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-indigo-200 to-blue-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-10 overflow-hidden">
      <div className="relative w-full max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white/30 dark:border-gray-700 transition-all duration-500 hover:shadow-indigo-300/40">

        <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
          Reset Password 🔑
        </h2>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-2 mb-6">
          Enter your registered email, OTP, and new password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 outline-none transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* OTP */}
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">OTP</label>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 outline-none transition"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>

          {/* New Password */}
          <div className="relative">
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter new password"
              className="w-full px-4 py-2 pr-10 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 outline-none transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="absolute right-3 top-9 cursor-pointer text-gray-600 dark:text-slate-500 hover:text-blue-500 transition"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
            <input
              type={showPassword2 ? "text" : "password"}
              placeholder="Confirm new password"
              className="w-full px-4 py-2 pr-10 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 outline-none transition"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
            <span
              className="absolute right-3 top-9 cursor-pointer text-gray-600 dark:text-slate-500 hover:text-blue-500 transition"
              onClick={() => setShowPassword2(!showPassword2)}
            >
              {showPassword2 ? <Eye size={20} /> : <EyeOff size={20} />}
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 text-white font-semibold rounded-xl shadow-lg transition-transform transform hover:scale-[1.02]"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
    </PageWrapper>
  );
};

export default ResetPassword;
