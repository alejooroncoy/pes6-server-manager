/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      keyframes: {
        pulseButton: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(0.95)" },
        },
      },
      colors: {
        primary: "#247291",
        secondary: "#F8DA5B",
        thirdary: "#EEF2E2",
        quaternary: "#F5F9EE",
      },
      flex: {
        full: "100%",
        "4/5": "80%",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
