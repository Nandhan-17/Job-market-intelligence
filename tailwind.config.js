/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: "#051424",
        "surface-container": "#122131",
        "surface-container-high": "#1c2b3c",
        "surface-container-low": "#0d1c2d",
        "surface-bright": "#2c3a4c",
        primary: "#38bdf8",
        secondary: "#34d399",
        tertiary: "#a78bfa",
        accent: "#f43f5e",
        warning: "#fbbf24"
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
