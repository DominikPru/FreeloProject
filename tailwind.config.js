/** @type {import('tailwindcss').Config} */
export default {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  content: [],
  theme: {
    extend: {
      colors: {
        "dark": "#222831",
        "dark-foreground": "#393E46",
        "white-primary": "#EEEEEE",
        "action-primary": "#00ADB5",
      },
      fontFamily: {
        sans: ["afacad", "sans-serif"], 
        serif: ["afacad", "serif"], 
        mono: ["afacad", "Monaco"],
      },
    },
  },
  plugins: [],
};
