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
        zen: {
          bg: "#FAF7F2",
          card: "#FFFFFF",
          main: "#2D312E",
          muted: "#6B726E",
          border: "#E6E1D8",
          primary: "#3A5A40",
          "primary-hover": "#2F4A34",
          "primary-light": "#EBF0EC",
          accent: "#C27D53",
          "accent-light": "#F9EFE9",
          sand: "#F4EFE6",
        },
      },
      fontFamily: {
        serif: ["var(--font-lora)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
