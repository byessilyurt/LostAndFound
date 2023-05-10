/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        lostColor: "#FF8682",
        foundColor: "#4E60FF",
        mintGreen: "#8DD3BB",
        lightGray: "#C7C8D2",
      },
    },
  },
  plugins: [],
};
