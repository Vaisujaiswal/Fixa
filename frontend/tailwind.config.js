/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // <-- enable class-based dark mode
  theme: {
    extend: {
      colors:{
        'primary' : "#3b60fc"
      },
      gridTemplateColumns:{
        'auto': 'repeat(auto-fill, minmax(200px, 1fr))'
      }
      
    },
  },
  plugins: [],
}
