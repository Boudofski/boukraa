/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#F5F5F2',
          navy: '#14283B',
          red: '#EF252D',
          redHover: '#D91920',
          gray: '#777F87',
          white: '#FFFFFF',
          border: '#E5E5E0',
          surface: '#1C3349',   // admin portal panels (dark)
          silver: '#E2E6EC',    // admin portal text on dark
          muted: '#A3A8AE',
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'Tajawal', '-apple-system', 'sans-serif'],
        arabic: ['Tajawal', 'Cairo', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 12px -2px rgba(0, 0, 0, 0.08), 0 2px 6px -2px rgba(0, 0, 0, 0.04)',
        'modal': '0 20px 60px -12px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
}
