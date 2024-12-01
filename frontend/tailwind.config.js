/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'scrollbar-bg': '#e0f2f1', // Custom background color for scrollbar
        'scrollbar-thumb': '#00796b', // Custom thumb color for scrollbar
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'), // Tailwind Scrollbar plugin
  ],
}