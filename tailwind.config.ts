import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#474747",
        "accent-1": "#3ad3ef",
        "accent-2": "#ffbd59",
        "accent-3": "#5bc783",
        "accent-4": "#544fb3",
        "accent-5": "#5ed5bf",
        coral: "#ee826d",
        bg: "#f5f0eb",
      },
      fontFamily: {
        phenomena: ["var(--font-phenomena)", "sans-serif"],
        sailors: ["var(--font-sailors)", "Georgia", "serif"],
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease forwards",
        blink: "blink 1s step-end infinite",
      },
    },
  },
  plugins: [],
};
export default config;
