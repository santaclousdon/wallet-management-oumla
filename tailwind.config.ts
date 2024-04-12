import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "proBack": "#ffffff",
        'proText': '#1f0757',
        'proTextLight': '#8480ae',
        'gtxGreen': '#11CABE',
        'gtxRed': '#FA2256',
        'gtxBackLight': '#34384C',
      },
      width: {
        'maxW': "1400px"
      },
      height: {
        'heightHead': "80px"
      }
    },
  },
  plugins: [],
};
export default config;
