const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: "var(--font-inter)",
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
  plugins: [nextui()],
};
