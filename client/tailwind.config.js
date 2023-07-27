/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'blinking': 'blinking 1s infinite',
      },
      keyframes: {
        blinking: {
          '0%': { color: 'white' },
          '50%': { color: 'green' },
          '100%': { color: 'white' },
        },
      },
      fontFamily: {
        'sans': ['Roboto', 'sans-serif'],
        'serif': ['Open Sans', 'serif'],
        'cinzel': ['Cinzel', 'serif'],
      }
    },
  },
  plugins: [],
}

