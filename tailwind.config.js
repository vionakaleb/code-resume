/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          base: "#0b0f1e",
          panel: "#0f1426",
          elev: "#141a30",
          border: "#1f2742",
        },
        ink: {
          primary: "#e6e8f2",
          secondary: "#a8adc4",
          muted: "#6b7194",
          dim: "#454b6b",
        },
        accent: {
          DEFAULT: "#7c5cff",
          hover: "#8f73ff",
          soft: "rgba(124, 92, 255, 0.15)",
          ring: "rgba(124, 92, 255, 0.45)",
        },
        status: {
          live: "#3ddc97",
        },
        line: "#9aa3c7",
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', "Menlo", "monospace"],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      animation: {
        "pulse-dot": "pulseDot 2s ease-in-out infinite",
        "fade-in": "fadeIn 0.4s ease-out",
      },
      keyframes: {
        pulseDot: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.6", transform: "scale(0.9)" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
