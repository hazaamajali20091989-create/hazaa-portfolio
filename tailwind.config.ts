import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: { bg: "#050816", primary: "#60A5FA", glow: "#B8E3FF" },
      fontFamily: { sans: ["var(--font-ar)", "system-ui", "sans-serif"] },
    },
  },
  plugins: [],
} satisfies Config;
