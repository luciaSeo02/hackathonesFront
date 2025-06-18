/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'light-gradient': 'linear-gradient(135deg, #1565c0 0%, #9d4edd 100%)',
        'dark-gradient': 'linear-gradient(135deg, #0b3680 0%, #7b2cbf 100%)'
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}
