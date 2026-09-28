/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./lib/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#C2410C",
          dark: "#9A3412",
          light: "#FFF7ED",
          muted: "#FDBA74",
        },
        page: "#FDF8F3",
        ink: "#1C1917",
        mutedtext: "#78716C",
        line: "#E7E5E4",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgb(0 0 0 / 0.06)",
      },
    },
  },
  plugins: [],
};
