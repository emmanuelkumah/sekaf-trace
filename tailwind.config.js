/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "system-ui", "sans-serif"],
      },
      colors: {
        primary: "#DA4167",
        secondary: "#eb99ad",
        accent: "#000000",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
