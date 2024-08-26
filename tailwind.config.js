/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      extend: {
        textShadow: {
          'sm': '1px 1px 2px rgba(0, 0, 0, 0.25)', // Small text shadow
          'md': '2px 2px 4px rgba(0, 0, 0, 0.15)', // Medium text shadow
          'lg': '3px 3px 6px rgba(0, 0, 0, 0.10)', // Large text shadow
          'green-glow': '0 0 5px rgba(16, 185, 129, 0.8)', // Custom green text shadow
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-shadow-sm': {
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.25)',
        },
        '.text-shadow-md': {
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.15)',
        },
        '.text-shadow-lg': {
          textShadow: '3px 3px 6px rgba(0, 0, 0, 0.10)',
        },
        '.text-shadow-green-glow': {
          textShadow: '0 0 5px rgba(16, 185, 129, 0.8)',
        },
      });
    },
  ],
}
