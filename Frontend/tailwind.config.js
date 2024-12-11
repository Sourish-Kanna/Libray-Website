/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  theme: {
    fontFamily: {
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      backgroundImage: {
        'Navbg': "url('/src/assets/header_bg.jpg')",
      
      }
    },
  },
  plugins: [],
}


