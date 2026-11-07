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
          // Deep Obsidian Black Canvas (Luxury Performance Athletics)
          navy: '#08090C',        // root canvas
          void: '#050608',        // deepest backdrop
          surface: '#0E121A',     // card surface
          elevated: '#141A25',    // elevated surface / hover
          steel: '#111622',       // card & container base
          charcoal: '#1A212F',    // borders / active tags
          
          // Performance Crimson Voltage (Ferrari / Athletic Red)
          red: '#EE1B24',         // primary athletic crimson
          redHover: '#D0121A',    // dark crimson hover
          redGlow: 'rgba(238, 27, 36, 0.35)',
          redSubtle: 'rgba(238, 27, 36, 0.12)',

          // Typography & Metallic Tones
          white: '#FFFFFF',
          silver: '#E2E6EC',      // high-contrast body & titles
          gray: '#9CA3AF',        // secondary muted copy
          muted: '#6B7280',       // metadata / captions
          card: 'rgba(14, 18, 26, 0.75)',
          border: 'rgba(255, 255, 255, 0.08)',
          borderHover: 'rgba(238, 27, 36, 0.45)',
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'Tajawal', '-apple-system', 'sans-serif'],
        arabic: ['Tajawal', 'Cairo', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'crimson': '0 10px 30px -5px rgba(238, 27, 36, 0.3)',
        'crimson-lg': '0 20px 40px -10px rgba(238, 27, 36, 0.4)',
        'card': '0 12px 35px -10px rgba(0, 0, 0, 0.75)',
        'card-hover': '0 20px 50px -10px rgba(0, 0, 0, 0.9), 0 0 30px -5px rgba(238, 27, 36, 0.25)',
      }
    },
  },
  plugins: [],
}
