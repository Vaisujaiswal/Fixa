

// import React, { useContext, useState } from "react";
// import emailjs from "@emailjs/browser";
// import { toast } from "react-toastify";
// import { FaMapLocationDot } from "react-icons/fa6";
// import { FaPhoneAlt } from "react-icons/fa";
// import { AiTwotoneMail } from "react-icons/ai";
// import { AppContext } from "../context/AppContext";

// const Contact = () => {
//   const {darkMode} = useContext(AppContext)
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const serviceId = "service_b8s4k58";
//     const templateId = "template_f5i82aq";
//     const publicKey = "hrapzJoagGq5Q8hS-";

//     const templateParams = {
//       from_name: name,
//       from_email: email,
//       to_name: "Fixa Support",
//       message: message,
//     };

//     emailjs
//       .send(serviceId, templateId, templateParams, publicKey)
//       .then((response) => {
//         console.log("SUCCESS!", response);
//         toast.success("Message sent successfully!", {
//             theme: darkMode ? "dark" : "light",
//           });
//         setName("");
//         setEmail("");
//         setMessage("");
//       })
//       .catch((err) => {
//         console.log("FAILED...", err);
//         toast.error("Failed to send message. Please try again later.", {
//             theme: darkMode ? "dark" : "light",
//           });
//       });
//   };

//   return (
//     <div className="bg-white dark:bg-gray-950 min-h-screen px-6 py-12 md:px-20 lg:px-36 text-gray-800 dark:text-gray-200 transition-colors duration-300">
//       <div className="max-w-5xl mx-auto">
//         <h1 className="text-3xl md:text-5xl font-bold text-center text-primary mb-10">
//           Contact Us
//         </h1>

//         <p className="text-md md:text-lg text-center text-gray-600 dark:text-gray-400 mb-12">
//           We'd love to hear from you! Whether you have a question, feedback, or
//           need help — feel free to reach out.
//         </p>

//         <div className="grid md:grid-cols-2 gap-10">
//           {/* Contact Info */}
//           <div className="space-y-6">
//             <div>
//               <h2 className="text-xl font-semibold mb-2 flex gap-2 items-center"><FaMapLocationDot className="text-green-500" /> Address</h2>
//               <p className="text-gray-700 dark:text-gray-300">
//                 123 Main Street, Mumbai, India - 400001
//               </p>
//             </div>
//             <div>
//               <h2 className="text-xl font-semibold mb-2 flex gap-2 items-center"><FaPhoneAlt className="text-blue-500" /> Phone</h2>
//               <p className="text-gray-700 dark:text-gray-300">
//                 +91 98765 43210
//               </p>
//             </div>
//             <div>
//               <h2 className="text-xl font-semibold mb-2 flex gap-2 items-center"><AiTwotoneMail className="text-red-500" /> Email</h2>
//               <p className="text-gray-700 dark:text-gray-300">
//                 vaishnavijaiswal707@gmail.com
//               </p>
//             </div>
//           </div>

//           {/* Contact Form */}
//           <form
//             onSubmit={handleSubmit}
//             className="space-y-6 bg-gray-100 dark:bg-gray-800 p-6 rounded-2xl shadow transition-colors"
//           >
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Your Name
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter your name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 
//                            bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 
//                            rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 
//                            bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 
//                            rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">Message</label>
//               <textarea
//                 rows="4"
//                 placeholder="Type your message..."
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 
//                            bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 
//                            rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
//               ></textarea>
//             </div>
//             <button
//               type="submit"
//               className="w-full py-3 bg-blue-600 text-white rounded 
//                          hover:bg-blue-700 dark:hover:bg-blue-500 
//                          transition-colors font-semibold shadow-md"
//             >
//               Send Message
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;












































import React, { useContext, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { AiTwotoneMail } from "react-icons/ai";
import { motion } from "framer-motion";
import { AppContext } from "../context/AppContext";

const Contact = () => {
  const { darkMode } = useContext(AppContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const validateEmail = (email) => {
    // Basic email pattern
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic form validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all fields before submitting.", {
        theme: darkMode ? "dark" : "light",
      });
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.", {
        theme: darkMode ? "dark" : "light",
      });
      return;
    }

    const serviceId = "service_b8s4k58";
    const templateId = "template_f5i82aq";
    const publicKey = "hrapzJoagGq5Q8hS-";

    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: "Fixa Support",
      message: message,
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then(() => {
        toast.success("Message sent successfully!", {
          theme: darkMode ? "dark" : "light",
        });
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch(() => {
        toast.error("Failed to send message. Please try again later.", {
          theme: darkMode ? "dark" : "light",
        });
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={`min-h-screen px-6 py-16 md:px-20 lg:px-36 transition-colors duration-300
        ${darkMode ? "bg-gray-950 text-gray-200" : "bg-white text-gray-800"}`}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent mb-8"
        >
          Get in Touch
        </motion.h1>

        <p className="text-center text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          We’re here to help! Whether you have questions, feedback, or need support — drop us a message and we’ll get back to you soon.
        </p>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Contact Info */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4">
              <FaMapLocationDot className="text-3xl text-green-500" />
              <div>
                <h2 className="text-xl font-semibold">Address</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  123 Main Street, Mumbai, India - 400001
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <FaPhoneAlt className="text-3xl text-blue-500" />
              <div>
                <h2 className="text-xl font-semibold">Phone</h2>
                <p className="text-gray-700 dark:text-gray-300">+91 98765 43210</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <AiTwotoneMail className="text-3xl text-red-500" />
              <div>
                <h2 className="text-xl font-semibold">Email</h2>
                <p className="text-gray-700 dark:text-gray-300">
                  vaishnavijaiswal707@gmail.com
                </p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            onSubmit={handleSubmit}
            className={`space-y-6 p-8 rounded-2xl shadow-lg backdrop-blur-md 
              border ${darkMode ? "bg-gray-900/70 border-gray-700" : "bg-white/80 border-gray-200"}`}
          >
            <div>
              <label className="block text-sm font-medium mb-2">Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600
                  bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200
                  focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600
                  bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200
                  focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                rows="5"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600
                  bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200
                  focus:outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 rounded-lg font-semibold text-white
                bg-gradient-to-r from-blue-600 to-green-500
                hover:from-green-500 hover:to-blue-600 
                shadow-md transition-all duration-300"
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;
