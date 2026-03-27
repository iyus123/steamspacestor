import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#3B82F6",
          dark: "#2563EB",
          soft: "#DBEAFE"
        },
        steam: {
          black: "#000000",
          charcoal: "#1F1F1F",
          slate: "#0f172a"
        }
      },
      boxShadow: {
        premium: "0 24px 60px rgba(2, 6, 23, 0.08)",
        neon: "0 10px 35px rgba(59, 130, 246, 0.28)"
      },
      backgroundImage: {
        grid: "radial-gradient(circle at 1px 1px, rgba(59,130,246,0.18) 1px, transparent 0)",
        aurora: "radial-gradient(circle at top left, rgba(59,130,246,0.22), transparent 30%), radial-gradient(circle at bottom right, rgba(96,165,250,0.18), transparent 26%)"
      }
    }
  },
  plugins: []
};

export default config;
