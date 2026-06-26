/** @type {import('tailwindcss').Config} */
const sectionColors = ['amber','orange','lime','yellow','green','rose','purple','red','teal','pink','indigo','cyan','slate','emerald','sky','violet']

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
      keyframes: {
        pop: { '0%': { transform: 'scale(.96)', opacity: '0' }, '100%': { transform: 'scale(1)', opacity: '1' } },
        shake: { '10%,90%': { transform: 'translateX(-2px)' }, '30%,70%': { transform: 'translateX(4px)' }, '50%': { transform: 'translateX(-6px)' } },
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
