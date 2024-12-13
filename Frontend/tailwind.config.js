/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  
  theme: {
    fontFamily: {
      serif: ['Merriweather', 'Fraunces', 'serif'],
      sans: ['Open Sans', 'Signika', 'Helvetica', 'Arial', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        'header-bg': "url('../assets/Header/header_bg.jpg')",
      },
      backgroundPosition: {
        'top-header': 'top',
      },
      backgroundSize: {
        'cover-header': 'cover',
      },
      colors: {
        'header-color': '#f3f2ed',
      },
      fontSize: {
        "Title": '1.5rem',
        "Primary": '1.25rem',
        "Secondary": '1.125rem',
        "Body": '1rem',
        "SubBody": '.875rem',
        "small": '.75rem',
      },
    },        
  },
  plugins: [],
}
