

// import React, { useContext, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { AppContext } from '../context/AppContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const Login = () => {

//   const { token, setToken, backendUrl, darkMode } = useContext(AppContext);
//   const navigate = useNavigate()

//   const [state, setState] = React.useState('Sign Up');

//   const [email, setEmail] = React.useState('');
//   const [password, setPassword] = React.useState('');
//   const [name, setName] = React.useState('');

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();

//     try {

//       if (state === 'Sign Up') {

//         const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password });
//         if (data.success) {
//           localStorage.setItem('token', data.token);
//           setToken(data.token);
//           toast.success("Welcome to Fixa...")
//         } else {
//           toast.error(data.message, {
//             theme: darkMode ? "dark" : "light",
//           })
//         }

//       } else {

//         const { data } = await axios.post(backendUrl + '/api/user/login', { email, password });
//         if (data.success) {
//           localStorage.setItem('token', data.token);
//           setToken(data.token);
//           toast.success("Welcome Back..", {
//             theme: darkMode ? "dark" : "light",
//           });

//         } else {
//           toast.error(error.message, {
//             theme: darkMode ? "dark" : "light",
//           });
//         }

//       }

//     } catch (error) {

//       toast.error(error.message, {
//             theme: darkMode ? "dark" : "light",
//           })

//     }

//   }

//   useEffect(() => {
//     if (token) {
//       navigate('/')
//     }
//   }, [token])

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 to-blue-300 px-4 py-10">
//       <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">

//         <h2 className="text-3xl font-bold text-center text-blue-700 mb-4">{state === 'Sign Up' ? 'Create account' : 'Welcome Back 👋'}</h2>
//         <p className="text-sm text-center text-gray-600 mb-8">{state === 'Sign Up' ? 'sign up' : 'log in'} to Book services</p>

//         <form onSubmit={onSubmitHandler} className="space-y-6">

//           {state === 'Sign Up' && <div>
//             <label className="block mb-1 text-sm font-medium text-gray-700">Full Name</label>
//             <input
//               type="text"
//               placeholder="John Doe"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               onChange={(e) => setName(e.target.value)}
//               value={name} required
//             />
//           </div>}

//           <div>
//             <label className="block mb-1 text-sm font-medium text-gray-700">Email</label>
//             <input
//               type="email"
//               placeholder="you@example.com"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               onChange={(e) => setEmail(e.target.value)}
//               value={email} required
//             />
//           </div>

//           <div>
//             <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
//             <input
//               type="password"
//               placeholder="Enter your password"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
//               onChange={(e) => setPassword(e.target.value)}
//               value={password} required
//             />
//           </div>



//           {state === 'Login' && (
//             <p className="text-sm text-right mt-1">
//               <span
//                 className="text-blue-600 cursor-pointer hover:underline"
//                 onClick={() => navigate('/forgot-password')}
//               >
//                 Forgot Password?
//               </span>
//             </p>
//           )}


//           <button
//             type="submit"
//             className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
//           >
//             {state === 'Sign Up' ? 'Create Account' : 'Login'}
//           </button>

//         </form>

//         {state === 'Sign Up' ?
//           <p className="mt-6 text-sm text-center text-gray-600">
//             Already have an account? <span onClick={() => setState('Login')} className='text-primary cursor-pointer underline'>Login here</span> </p> :
//           <p className="mt-6 text-sm text-center text-gray-600">
//             Don't have an account? <span onClick={() => setState('Sign Up')} className='text-primary cursor-pointer underline'>Sign Up</span>
//           </p>
//         }
//       </div>
//     </div>
//   );
// };

// export default Login;


































































import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';
import PageWrapper from '../components/PageWrapper';

const Login = () => {
  const { token, setToken, backendUrl, darkMode } = useContext(AppContext);
  const navigate = useNavigate();

  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          toast.success("Welcome to Fixa...");
        } else {
          toast.error(data.message, { theme: darkMode ? "dark" : "light" });
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/user/login', { email, password });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          toast.success("Welcome Back..", { theme: darkMode ? "dark" : "light" });
        } else {
          toast.error(data.message, { theme: darkMode ? "dark" : "light" });
        }
      }
    } catch (error) {
      toast.error(error.message, { theme: darkMode ? "dark" : "light" });
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <PageWrapper>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-indigo-200 to-blue-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4 py-10 overflow-hidden">
      <div className="relative w-full max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white/30 dark:border-gray-700 transition-all duration-500 hover:shadow-indigo-300/40">

        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
            {state === 'Sign Up' ? 'Create Account' : 'Welcome Back 👋'}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            {state === 'Sign Up' ? 'Sign up to start your journey' : 'Log in to continue your experience'}
          </p>
        </div>

        <form onSubmit={onSubmitHandler} className="space-y-5">
          {state === 'Sign Up' && (
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 outline-none transition"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>
          )}

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 outline-none transition"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          <div className="relative">
            <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full px-4 py-2 pr-10 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-blue-400 outline-none transition"

              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <span
              className="absolute right-3 top-9 cursor-pointer text-gray-600 dark:text-gray-200 hover:text-blue-500 transition"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </span>

          </div>

          {state === 'Login' && (
            <p className="text-sm text-right mt-1">
              <span
                className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline"
                onClick={() => navigate('/forgot-password')}
              >
                Forgot Password?
              </span>
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 text-white font-semibold rounded-xl shadow-lg transition-transform transform hover:scale-[1.02]"
          >
            {state === 'Sign Up' ? 'Create Account' : 'Login'}
          </button>
        </form>

        {state === 'Sign Up' ? (
          <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <span onClick={() => setState('Login')} className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline font-medium">
              Login here
            </span>
          </p>
        ) : (
          <p className="mt-6 text-sm text-center text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <span onClick={() => setState('Sign Up')} className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline font-medium">
              Sign Up
            </span>
          </p>
        )}
      </div>
    </div>
    </PageWrapper>
  );
};

export default Login;
