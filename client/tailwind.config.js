/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./src/app/styles/index.css"],
  theme: {
    extend: {
      colors: {
        customColor: "#020314",
        customColorPrimary: "rgb(167, 27, 74)",
        customColorSecondary: "rgb(74, 76, 90)",
        customColorTextBase: "rgb(226, 232, 240)",
      },
      animation: {
        blinking: "blinking 1s infinite",
        slide: "slide 2s linear infinite",
      },
      keyframes: {
        blinking: {
          "0%": { color: "white" },
          "50%": { color: "green" },
          "100%": { color: "white" },
        },
        slide: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        serif: ["Open Sans", "serif"],
        cinzel: ["Cinzel", "serif"],
      },
    },
  },
  plugins: [],
};
