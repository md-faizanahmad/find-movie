import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#E50914", // Netflix-style red
          secondary: "#141414",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#A1A1AA",
        },
      },
      spacing: {
        section: "6rem",
      },
      borderRadius: {
        xl: "1rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
