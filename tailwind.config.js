/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ecobank: {
          50: '#f2f8fc',
          100: '#e3f0f9',
          500: '#1e88e5',
          600: '#1976d2',
          900: '#0d47a1',
        },
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
      },
    },
  },
  plugins: [],
}
