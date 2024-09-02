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
        'Navbg': "url('/src/Components/Pages/NavBar/assets/innerheadercommon.jpg')",

        'homepage-bg':"linear-gradient(rgba(108, 150, 245, 0.6), rgba(108, 150, 245, 0.6), rgba(108, 150, 245, 0.6)),"
        +"url('/src/Components/Pages/HomePage/assets/library-view.png')",        
      }
    },
  },
  plugins: [],
}


