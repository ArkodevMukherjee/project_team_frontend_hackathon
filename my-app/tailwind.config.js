/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:'class',
  content: [
    "./index.html",        // Include the HTML file
    "./src/**/*.{js,ts,jsx,tsx}",  // Include all JS/TS/JSX/TSX files in src directory
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
