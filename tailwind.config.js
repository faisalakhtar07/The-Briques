/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#171717', soft: '#5C5C5C' },
        paper: { DEFAULT: '#FAFAF8', dim: '#F0EFEA' },
        emerald: {
          50: '#FBF6E7', 100: '#F3E6BE', 200: '#E6CE87', 300: '#D9B54F',
          400: '#C9A227', 500: '#B08D1E', 600: '#8F7118', 700: '#6E5712',
          800: '#4D3D0D', 900: '#2C2307', 950: '#1A1404',
        },
        gold: { 50: '#F3E6BE', 400: '#C9A227', 500: '#B08D1E', 600: '#8F7118' },
        night: { bg: '#15140F', dim: '#1D1C16', text: '#F2F0EA', soft: '#A8A399' },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.06), 0 8px 24px -12px rgba(0,0,0,0.10)',
        lift: '0 4px 20px rgba(0,0,0,0.3), 0 24px 48px -16px rgba(0,0,0,0.4)',
      },
      borderRadius: { xl2: '1.25rem' },
    },
  },
  plugins: [],
};