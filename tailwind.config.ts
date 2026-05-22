import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts}",
  ],
  safelist: [
    "btn-header",
    "tipo",
    "normal",
    "fire",
    "water",
    "grass",
    "electric",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dark",
    "dragon",
    "steel",
    "fairy",
  ],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
      },
      colors: {
        "clr-black": "var(--clr-black)",
        "clr-gray": "var(--clr-gray)",
        "clr-white": "var(--clr-white)",
      },
      maxWidth: {
        content: "1000px",
      },
      borderRadius: {
        pill: "100vmax",
      },
    },
  },
  plugins: [],
};

export default config;
