/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {margin: {
      '100': '27rem', // Custom margin of 25rem
      '200': '50rem', // Custom margin of 50rem
      // Add more custom margins here
    },},
  },
  plugins: [],
}

