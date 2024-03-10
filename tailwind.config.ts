import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: '#5570F1',
        customLightBlue: '#EFECFF',
        customGray: '#EDEFFB',
        customGray2: '#F4F5FA',
        customLightGray: '#F9F9F9',
        customYellow: '#FFEECC',
      },
      fontSize: {
        '8px': '0.5rem', // 8px si la base est 16px
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
        serif: ['Nunito', 'serif'],
        mono: ['Nunito', 'monospace'],
      },
    },
  },
  plugins: [],
};
export default config;
