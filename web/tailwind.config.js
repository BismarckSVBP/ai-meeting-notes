/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // 👈 this is missing
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
