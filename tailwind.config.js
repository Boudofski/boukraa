/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#071827',
          steel: '#102A3B',
          red: '#F21D27',
          silver: '#D9E0E5',
          white: '#F5F7F8',
          gray: '#9BA9B3',
          charcoal: '#172027',
          card: 'rgba(16, 42, 59, 0.65)',
          border: 'rgba(217, 224, 229, 0.12)',
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'Tajawal', 'sans-serif'],
        arabic: ['Tajawal', 'Cairo', 'sans-serif'],
      },
      clipPath: {
        'slanted': 'polygon(0 0, 100% 0, 95% 100%, 0% 100%)',
        'slanted-r': 'polygon(5% 0, 100% 0, 100% 100%, 0% 100%)',
      }
    },
  },
  plugins: [],
}
