/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
      colors: {
        cream: '#f4f0e6',
        paper: '#fffdf7',
        pine: {
          50: '#f0f4f1',
          100: '#dde8e0',
          300: '#9db8a8',
          500: '#4a6b58',
          600: '#3c5a49',
          700: '#2f4839',
          800: '#26392e',
          900: '#1d2b23',
        },
        brass: {
          100: '#f3e8d3',
          200: '#e9d8b4',
          400: '#c9a35e',
          500: '#b98a3c',
          600: '#9c7330',
          700: '#7d5b26',
        },
      },
      keyframes: {
        pop: {
          '0%': { transform: 'scale(.96)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shake: {
          '10%,90%': { transform: 'translateX(-2px)' },
          '30%,70%': { transform: 'translateX(4px)' },
          '50%': { transform: 'translateX(-6px)' },
        },
        flash: { '0%': { opacity: '.85' }, '100%': { opacity: '0' } },
      },
      animation: {
        pop: 'pop .18s ease-out',
        shake: 'shake .4s ease',
        flash: 'flash .5s ease-out forwards',
      },
    },
  },
  // Section colours are applied via runtime-built class strings, so safelist them.
  safelist: [],
  plugins: [],
}
