/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-red': 'rgba(33, 13, 22, 1)',
        'pinkish': 'rgba(184, 40, 105, 1)',
        'bright-red': 'rgba(229, 9, 20, 1)',
      },
    },
  },
  plugins: [],
}
