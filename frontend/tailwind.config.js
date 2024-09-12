/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this to your project structure
  ],
  theme: {
    extend: {
      colors: {
        customPurple: '#6c5efe',
        customBg: '#f9f8fd',
        customNotSelectedIcon: '#98accd',
        customSelectedIcon: '#2f3a64',
        customCardBg: '#F4F4F4',
    },
      fontFamily: {
        kalam: ['Kalam', 'cursive'], // Hier fügst du deine Google Font ein
        nonito: ['Nunito', 'italic'],
      },
  },
},
  plugins: [],
};


