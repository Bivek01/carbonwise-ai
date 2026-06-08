/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f2fbf5',
          100: '#e1f7e8',
          200: '#c3ecd1',
          300: '#94dcb0',
          400: '#5fc387',
          500: '#3ba466',
          600: '#2b8450',
          700: '#256942',
          800: '#215336',
          900: '#1d442e',
          950: '#0f2619',
        },
        leaf: '#4ade80',
        mint: '#dcfce7',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
