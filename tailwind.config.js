/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {},
      colors: {
        bgColor: {
          1: "#f8f6f1",
        },

        fontColor: {
          1: "#ffffff",
        },

        secondary: {
          1:'#e68619'
        }
      },
    },
  },
  plugins: [],
};
