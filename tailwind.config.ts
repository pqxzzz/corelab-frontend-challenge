import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        text: {
          primary: "#455A64",
          placeholder: "#50656E",
          text: "#4F4F4D"
        },
        border: {
          primary: "#D9D9D9"
        },
        background: "#F0F2F5"
      }
    }
  },
  plugins: []
};
export default config;
