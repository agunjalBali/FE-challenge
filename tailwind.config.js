/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#01D167',
        black: '#222222',
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        serif: ['Open Sans', 'sans-serif'],
        mono: ['Open Sans', 'sans-serif'],
        display: ['Open Sans', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
