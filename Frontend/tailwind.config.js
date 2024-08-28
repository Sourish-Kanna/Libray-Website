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
        'Navbg': "url('https://siesgst.edu.in/images/innerheadercommon.jpg')",

        'homepage-bg':"linear-gradient(#6c96f5ac, #6c96f5ac, #6c96f5ac), url('https://static.wixstatic.com/media/2b9d05_012c7620f2c048dea8d967aa8943e777~mv2.jpg/v1/fill/w_955,h_436,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/2b9d05_012c7620f2c048dea8d967aa8943e777~mv2.jpg')",


        
      }
    },
  },
  plugins: [],
}


