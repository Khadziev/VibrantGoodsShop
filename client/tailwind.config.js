/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./src/app/styles/index.css"],
  theme: {
    extend: {
      /* Colors with CSS variables reference */
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        "primary-dark": "rgb(var(--color-primary-dark) / <alpha-value>)",
        "primary-light": "rgb(var(--color-primary-light) / <alpha-value>)",

        bg: "rgb(var(--color-bg) / <alpha-value>)",
        "bg-secondary": "rgb(var(--color-bg-secondary) / <alpha-value>)",
        "bg-dark": "rgb(var(--color-bg-dark) / <alpha-value>)",
        "bg-darker": "rgb(var(--color-bg-darker) / <alpha-value>)",
        "bg-card": "rgb(var(--color-bg-card) / <alpha-value>)",

        "text-base": "rgb(var(--color-text-base) / <alpha-value>)",
        "text-muted": "rgb(var(--color-text-muted) / <alpha-value>)",
        "text-light": "rgb(var(--color-text-light) / <alpha-value>)",
        "text-inverted": "rgb(var(--color-text-inverted) / <alpha-value>)",

        border: "rgb(var(--color-border) / <alpha-value>)",
        error: "rgb(var(--color-error) / <alpha-value>)",
        success: "rgb(var(--color-success) / <alpha-value>)",
        warning: "rgb(var(--color-warning) / <alpha-value>)",
        info: "rgb(var(--color-info) / <alpha-value>)",

        /* Category colors */
        "category-digital": "var(--color-category-digital)",
        "category-fashion": "var(--color-category-fashion)",
        "category-beauty": "var(--color-category-beauty)",
        "category-sport": "var(--color-category-sport)",
        "category-house": "var(--color-category-house)",
        "category-toy": "var(--color-category-toy)",
        "category-stationery": "var(--color-category-stationery)",

        /* Legacy colors for backwards compatibility */
        customColor: "#020314",
        customColorPrimary: "rgb(167, 27, 74)",
        customColorSecondary: "rgb(74, 76, 90)",
        customColorTextBase: "rgb(226, 232, 240)",
      },

      /* Spacing with CSS variables */
      spacing: {
        xs: "var(--spacing-xs)",
        sm: "var(--spacing-sm)",
        base: "var(--spacing-base)",
        lg: "var(--spacing-lg)",
        xl: "var(--spacing-xl)",
        "2xl": "var(--spacing-2xl)",
        "3xl": "var(--spacing-3xl)",
      },

      /* Typography */
      fontFamily: {
        base: "var(--font-family-base)",
        display: "var(--font-family-display)",
        fallback: "var(--font-family-fallback)",
        sans: ["Roboto", "sans-serif"],
        serif: ["Open Sans", "serif"],
        cinzel: ["Cinzel", "serif"],
      },

      fontSize: {
        xs: "var(--font-size-xs)",
        sm: "var(--font-size-sm)",
        base: "var(--font-size-base)",
        lg: "var(--font-size-lg)",
        xl: "var(--font-size-xl)",
        "2xl": "var(--font-size-2xl)",
        "3xl": "var(--font-size-3xl)",
      },

      fontWeight: {
        light: "var(--font-weight-light)",
        normal: "var(--font-weight-normal)",
        medium: "var(--font-weight-medium)",
        semibold: "var(--font-weight-semibold)",
        bold: "var(--font-weight-bold)",
      },

      /* Border radius */
      borderRadius: {
        sm: "var(--radius-sm)",
        base: "var(--radius-base)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        full: "var(--radius-full)",
      },

      /* Shadows */
      boxShadow: {
        sm: "var(--shadow-sm)",
        base: "var(--shadow-base)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
      },

      /* Transitions */
      transitionDuration: {
        fast: "var(--transition-fast)",
        base: "var(--transition-base)",
        slow: "var(--transition-slow)",
      },

      /* Animations */
      animation: {
        "fade-in": "fadeIn var(--transition-base) ease-out",
        "fade-out": "fadeOut var(--transition-base) ease-out",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "fade-in-down": "fadeInDown 0.6s ease-out forwards",
        "slide-in": "slideIn var(--transition-base) ease-out",
        "slide-out": "slideOut var(--transition-base) ease-out",
        blob: "blob 7s infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 3s linear infinite",
        "bounce-slow": "bounce 2s infinite",
        blink: "blinking 1.5s infinite",

        /* Legacy animations */
        blinking: "blinking 1s infinite",
        slide: "slide 2s linear infinite",
      },

      keyframes: {
        /* Already defined in animations.css but needed here for Tailwind */
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
    },
  },
  plugins: [],
};
