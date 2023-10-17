import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      xs: ["1.3rem", "1.2"],
      sm: ["1.4rem", "1"],
      md: ["1.6rem", "1"],
      lg: "1.8rem",
      xl: ["2.2rem", "1.3"],
      "2xl": "2.4rem",
      "3xl": "2.6rem",
      "4xl": "3.8rem",
      "5xl": "4rem",
      "6xl": ["4.2rem", "1"],
      "8xl": ["8rem", "1"],
    },
    spacing: {
      0: "0",
      1: "0.4rem",
      2: "0.8rem",
      3: "1.2rem",
      4: "1.6rem",
      5: "2rem",
      6: "2.4rem",
      7: "2.8rem",
      8: "3.2rem",
      9: "3.6rem",
      10: "4rem",
      11: "4.4rem",
      12: "4.8rem",
    },
    fontFamily: {
      sans: [
        "SF Pro Display",
        "-apple-system,BlinkMacSystemFont",
        "Segoe UI",
        "Roboto,Oxygen,Ubuntu,Cantarell",
        "Open Sans",
        "Helvetica Neue",
        "sans-serif",
      ],
    },
    extend: {
      colors: {
        background: "#000212",
        "white-08": "rgba(255, 255, 255, 0.08)",
        primary: "#f7f8f8",
        secondary: "#b4bcd0",
        textiary: "#b4bcd099",

        "brand-primary-color": "#5e6ad2",
        "mask-hero":
          "linear-gradient(to right bottom, rgb(255, 255, 255) 30%, rgba(255, 255, 255, 0.38))",
        "over-hero":
          "radial-gradient(ellipse 80% 50% at 50% -20%,rgba(120,119,198,0.3),hsla(0,0%,100%,0))",
      },
      backgroundImage: {
        maskHero:
          "linear-gradient(to right bottom, rgb(255, 255, 255) 30%, rgba(255, 255, 255, 0.38))",
        subtleMask:
          "radial-gradient(ellipse 80% 50% at 50% -20%,rgba(120,119,198,0.3),hsla(0,0%,100%,0))",
      },
      keyframes: {
        "fade-in": {
          from: {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          to: {
            opacity: "1",
            transform: "none",
          },
        },
      },
      animation: {
        "fade-in": "fade-in 1000ms var(--animation-delay, 0s) ease forwards",
      },
    },
  },
  plugins: [],
};
export default config;
