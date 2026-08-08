/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#12181A',
          soft: '#38423F',
        },
        paper: {
          DEFAULT: '#FAF9F5',
          dim: '#F1EFE8',
        },
        emerald: {
          50: '#EAF4EE',
          100: '#CFE6D9',
          200: '#9FCDB3',
          300: '#6DB18C',
          400: '#3F9569',
          500: '#0E6E4F',
          600: '#0B5C42',
          700: '#094A36',
          800: '#07392A',
          900: '#052A1F',
        },
        gold: {
          50: '#FBF6E7',
          400: '#D9B84A',
          500: '#C9A227',
          600: '#A9840F',
        },
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 8px rgba(18,24,26,0.06), 0 12px 32px -12px rgba(18,24,26,0.10)',
        lift: '0 8px 24px rgba(14,110,79,0.16), 0 24px 48px -16px rgba(18,24,26,0.16)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}
