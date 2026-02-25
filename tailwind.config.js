/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#F39200", // 🔶 Main brand color
        base: "#F9F8F3", // 🧱 Base / background
        background: "#F9F8F3", // alias (optional)
        text: "#222222", // ✍️ Typography
      },
    },
  },
  plugins: [],
};
