/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#EE5622",
        secondary: "#FF0000",
        ternary: "#006817",
        whitecolor: "#FFFFFF",
        greencolor: "#006817",
        bglogin: "#7763FB",
      },
    },
  },
  plugins: [],
};
