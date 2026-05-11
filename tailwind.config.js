/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'hsl(222, 65%, 15%)',
        foreground: '#ffffff',
        primary: '#ffcc4d',
        secondary: '#4d9de0',
        accent: '#23b99a',
      },
    },
  },
  plugins: [],
};
