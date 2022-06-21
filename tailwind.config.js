const plugin = require("tailwindcss/plugin");

module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        loading: "url('../public/images/loading.svg')",
      },
      aspectRatio: {
        "3/4": "3 / 4",
        "9/16": "9 / 16",
        "16/9": "16 / 9",
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("third", "&:nth-child(11n+9)");
    }),
  ],
};
