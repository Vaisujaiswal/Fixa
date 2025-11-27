
import React, { useContext, useState } from "react";
import { assets } from "../assets/assets.js";
import { AdminContext } from "../context/AdminContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
import { ProviderContext } from "../context/ProviderContext.jsx";

const Login = () => {

    const [state, setState] = useState("Admin");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { setAToken, backendUrl } = useContext(AdminContext);
    const {setPToken} = useContext(ProviderContext);


    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            if (state === "Admin") {
                const { data } = await axios.post(
                    backendUrl + "/api/admin/login",
                    { email, password }
                );

                if (data.success) {
                    localStorage.setItem("aToken", data.token);
                    setAToken(data.token);
                    toast.success("Admin login successful!");
                    console.log("Token:", data.token);
                } else {
                    toast.error(data.message || "Login failed");
                }
            } else {
                // Example for Provider login
                const { data } = await axios.post(
                    backendUrl + "/api/provider/login",
                    { email, password }
                );

                if (data.success) {
                    localStorage.setItem("pToken", data.token);
                    setPToken(data.token);
                    console.log("Token:", data.token);
                } else {
                    toast.error(data.message || "Login failed");
                }

                
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
            console.error("Login failed:", error);
        }
    };


    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <form onSubmit={onSubmitHandler} className="bg-white shadow-lg rounded-xl p-6 sm:p-10 w-full max-w-md">
                {/* Heading */}
                <h2 className="text-2xl font-semibold text-center mb-6">
                    <span className="text-primary">{state}</span> Login
                </h2>

                {/* Email */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1 text-sm font-medium">
                        Email
                    </label>
                    <input
                        type="email"
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>

                {/* Password */}
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1 text-sm font-medium">
                        Password
                    </label>
                    <input
                        type="password"
                        required
                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white py-2 rounded-lg transition duration-300"
                >
                    Login
                </button>

                {/* Switch case */}
                <div className="mt-4 text-center text-sm">
                    {state === "Admin" ? (
                        <p className="text-gray-600">
                            Provider Login?{" "}
                            <span
                                onClick={() => setState("Provider")}
                                className="text-primary font-medium cursor-pointer hover:underline transition"
                            >
                                Click here
                            </span>
                        </p>
                    ) : (
                        <p className="text-gray-600">
                            Admin Login?{" "}
                            <span
                                onClick={() => setState("Admin")}
                                className="text-primary font-medium cursor-pointer hover:underline transition"
                            >
                                Click here
                            </span>
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Login;

