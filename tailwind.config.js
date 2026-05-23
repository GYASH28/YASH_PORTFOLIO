export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Bricolage Grotesque", "system-ui", "sans-serif"],
        body: ["DM Sans", "system-ui", "sans-serif"],
        mono: ["Geist Mono", "Courier New", "monospace"],
      },
      screens: {
        xs: "420px",
      },
    },
  },
  plugins: [],
};
