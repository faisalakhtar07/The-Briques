/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#12181A', soft: '#38423F' },
        // Background updated to the requested #EBEAE7.
        paper: { DEFAULT: '#EBEAE7', dim: '#E1DFDA' },
        // "emerald" token kept for compatibility with every component that
        // already uses emerald-* classes — ramp regenerated around #2A3636.
        emerald: {
          50: '#EDF2F2', 100: '#D2DFDF', 200: '#A5C0C0', 300: '#78A0A0',
          400: '#475C5C', 500: '#2A3636', 600: '#1D2525', 700: '#141919',
          800: '#0D1111', 900: '#0A0D0D', 950: '#070909',
        },
        gold: { 50: '#FBF6E7', 400: '#D9B84A', 500: '#C9A227', 600: '#A9840F' },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 8px rgba(18,24,26,0.06), 0 12px 32px -12px rgba(18,24,26,0.10)',
        lift: '0 8px 24px rgba(42,54,54,0.16), 0 24px 48px -16px rgba(18,24,26,0.16)',
      },
      borderRadius: { xl2: '1.25rem' },
    },
  },
  plugins: [],
};
