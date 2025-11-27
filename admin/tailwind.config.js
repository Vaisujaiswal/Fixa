/** @type {import('tailwindcss').Config} */
export default {
   darkMode: 'class', // important
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'primary' : "#3b60fc"
      },
    },
  },
  plugins: [],
}


