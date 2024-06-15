/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        black: ["Poppins-Black", "sans-serif"],
        bold: ["Poppins-Bold", "sans-serif"],
        italic: ["Poppins-Italic", "sans-serif"],
        light: ["Poppins-Light", "sans-serif"],
        medium: ["Poppins-Medium", "sans-serif"],
        regular: ["Poppins-Regular", "sans-serif"],
        semibold: ["Poppins-SemiBold", "sans-serif"],
        thin: ["Poppins-Thin", "sans-serif"],
      },
    },
  },
  plugins: [],
};
