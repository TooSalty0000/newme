/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "baseColor": "var(--base-color)",
        "primaryColor": "var(--primary-color)",
        "secondaryColor": "var(--secondary-color)",
        "tertiaryColor": "var(--tertiary-color)",
        "highlightColor": "var(--highlight-color)",
        "highlightColorShade": "var(--highlight-shade-color)",
        "highlightColorLight": "var(--highlight-light-color)",
      }
    },
  },
  plugins: [],
}

