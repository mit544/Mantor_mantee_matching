import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0077B6",
        accent: "#FFD700", 
        background: "#F5F5F5",
        text: "#333333",
      },
    },
  },
  plugins: [],
} satisfies Config;
