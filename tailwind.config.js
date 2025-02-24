/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    colors: {
      primary: "#F32929",
      secondary: "#f79292",
      bg: "#ededed",
      white: "#ffffff",
      black: "#000000",
      gray: "#eae8e8",
    },
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {},
    screens: {
      sm: "575px",
      md: "770px",
      mmd: "990px",
      lg: "1300px",
    },
  },
  plugins: [],
};
