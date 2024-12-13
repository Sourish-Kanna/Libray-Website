/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  
  theme: {
    fontFamily: {
      serif: ['Merriweather', 'Fraunces', 'Georgia', 'Times New Roman', 'serif'],
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
        's_orange': '#f26d21',
        's_blue': '#014da1',
        "s_blue_400": "#3492fe"
      },
      fontSize: {
        "Title": '1.5rem',
        "Primary": ['1.25rem', '1.75rem'],
        "Secondary": '1.125rem',
        "Body": ['1rem','1rem'],
        "SubBody": '.875rem',
        "2-Primary": ['1.5rem','2rem'],
      },
    },        
  },
  plugins: [],
}
