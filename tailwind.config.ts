import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Catch-all for any nested components
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Legacy prefix (used by Footer, Navbar, etc.)
        vb: {
          green: "#2E7D32",
          blue: "#1565C0",
          yellow: "#FFD54F",
          dark: "#0A0F0D",
          text: "#E0E0E0",
          neon: "#00D9A0",
        },
        // Brand prefix (used by pages & newer components)
        brand: {
          green: "#2E7D32",
          blue: "#1565C0",
          yellow: "#FFD54F",
          dark: "#0A0F0D",
          teal: "#00D9A0",
          text: "#E0E0E0",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-inter)", "system-ui", "sans-serif"],
        body: ["var(--font-satoshi)", "system-ui", "sans-serif"],
        accent: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
