import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export const AppContext = createContext();

const AppContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [serviceProviders, setServiceProviders] = useState([]);
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)
    const [userData, setUserData] = useState(false);

    // Dark mode state
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

    useEffect(() => {
        const root = document.documentElement;
        if (darkMode) {
            root.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            root.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    const getProviderData = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/provider/list');
            if (data.success) {
                setServiceProviders(data.serviceProviders);
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message);
        }

    }

    // const loadUserProfileData = async () => {

    //     try {

    //         const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
    //             headers: { atoken: token }
    //         });

    //         if (data.success) {
    //             setUserData(data.userData)
    //         } else {
    //             toast.error(data.message)
    //         }

    //     } catch (error) {

    //         console.log(error)
    //         toast.error(error.message);

    //     }

    // }



    console.log(token);


    const loadUserProfileData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, {
                headers: { Authorization: `Bearer ${token}` } // ✅ Standard
            });
            if (data.success) {
                setUserData(data.userData);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };





    const value = {
        serviceProviders, getProviderData,
        token, setToken,
        backendUrl,
        userData, setUserData,
        loadUserProfileData, darkMode, setDarkMode
    }

    useEffect(() => {
        getProviderData();
    }, []);

    useEffect(() => {
        if (token) {
            loadUserProfileData()
        } else {
            setUserData(false)
        }
    }, [token])

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider;