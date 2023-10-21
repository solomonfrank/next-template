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
        "conic-hero-gradient":
          "conic-gradient(from 230.29deg at 51.63% 52.16%, rgb(36, 0, 255) 0deg, rgb(0, 135, 255) 67.5deg, rgb(108, 39, 157) 198.75deg, rgb(24, 38, 163) 251.25deg, rgb(54, 103, 196) 301.88deg, rgb(105, 30, 255) 360deg)",
        "hero-gradient":
          "radial-gradient(ellipse 50% 80% at 20% 40%,rgba(93,52,221,0.1),transparent), radial-gradient(ellipse 50% 80% at 80% 50%,rgba(120,119,198,0.15),transparent)",
        maskHero:
          "linear-gradient(to right bottom, rgb(255, 255, 255) 30%, rgba(255, 255, 255, 0.38))",
        subtleMask:
          "radial-gradient(ellipse 80% 50% at 50% -20%,rgba(120,119,198,0.3),hsla(0,0%,100%,0))",
        backgroundGalaxy:
          "radial-gradient(circle at bottom center,#7877C6,transparent 70%)",
        unlikeBackground:
          "linear-gradient(rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.05) 100%)",
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
        "rotate-out": {
          "0%": {
            transform: "rotateX(25deg)",
          },
          "25%": {
            transform: "rotateX(25deg) scale(0.9)",
          },
          "60%, 100%": {
            transform: "none",
          },
        },
        "glow-image": {
          from: {
            opacity: "0",
            "animation-timing-function": "cubic-bezier(0.74,0.25,0.76, 1 )",
          },

          "10%": {
            opacity: "1",
            "animation-timing-function": "cubic-bezier(0.12,0.01,0.08,0.99)",
          },
          to: {
            opacity: "0.2",
          },
        },
        "image-stroke": {
          from: {
            "stroke-dashoffset": "1",
          },
          "50%, 99%": {
            "stroke-dashoffset": "0",
          },
          to: {
            visibilty: "hidden",
          },
        },
        zap: {
          "0%, 9%, 11%, 100% ": {
            fill: "transparent",
          },
          "10%": {
            fill: "white",
          },
        },
      },
      animation: {
        "fade-in": "fade-in 1000ms var(--animation-delay, 0s) ease forwards",
        "rotate-out": "rotate-out 1400ms  ease forwards",
        "glow-image": "glow-image 4100ms  600ms ease-out forwards",
        "image-stroke": "image-stroke 1200ms ease-out forwards",
        zap: "zap 2250ms calc(var(--index) * 20ms) linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
