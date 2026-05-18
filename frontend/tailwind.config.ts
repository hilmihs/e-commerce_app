import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#172026",
        muted: "#62727d",
        line: "#d8e0e5",
        surface: "#f6f8f9",
        brand: "#1f6feb",
        accent: "#0e9f6e",
        warning: "#b7791f"
      },
      boxShadow: {
        panel: "0 14px 40px rgba(23, 32, 38, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
