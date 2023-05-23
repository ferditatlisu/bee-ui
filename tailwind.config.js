/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'kb-orange': '#f27a1a',
        'dark-blue': '#1e2a3b',
        'light-blue': '#27364b',
        'light-gray': '#fafafa',
        'gray-500': '#475569',
        'gray-600': '#9aa5b6',
      },
    },
  },
  plugins: [],
};
