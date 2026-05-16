import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        void: "#06070f",
        ink: "#d9f7ff",
        cyanNeon: "#34f5ff",
        magentaNeon: "#ff3df2",
        acid: "#a6ff4d"
      },
      fontFamily: {
        display: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"]
      },
      boxShadow: {
        neon: "0 0 22px rgba(52, 245, 255, 0.22), inset 0 0 18px rgba(255, 61, 242, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
