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
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translate(-50%, 100%)', opacity: '0' },
          '100%': { transform: 'translate(-50%, 0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
      },
    },
  },
  plugins: [],
};
