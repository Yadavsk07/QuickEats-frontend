/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F97316",
        dark: "#111827",
        success: "#22C55E",
        danger: "#EF4444"
      }
    }
  },
  plugins: []
};
