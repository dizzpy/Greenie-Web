/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-green': '#1BAC5F',
        'text-gray': '#585656',
        'bg-light': '#F8F8F8',
        outline: '#DBDBDB',
        lightred: '#e15959',
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
