/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'Background': '#F2E7F3',
      'Text': '#170C18',
      'Primary': '#A65AF2',
      'Secondary': '#CB77CF',
      'Accent': '#C3794B',
      'TableP': '#E4C5E6',
      'LoginF': '#F59356',
      'CenterC': '#DA808C',
      'LoginS': '#A65AF2',
    },
    
    },
  },
  plugins: [],
}