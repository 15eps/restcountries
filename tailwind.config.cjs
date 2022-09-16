/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px"
      },
      colors:{
        "darkblue":"hsl(209, 23%, 22%)",
        "very-darkblue":"hsl(207, 26%, 17%)",
        'very-darkgray':"hsl(200, 15%, 8%)",
        "darkgray":"hsl(0, 0%, 52%)",
      }
    }
  },
  darkMode:"class",
  plugins: [],
}