/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      mono: ['ui-monospace', 'SFMono-Regular'],
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#023859",
          secondary: "#025373",
          accent: "#50A0BF",
          neutral: "#96C6D9",
          "base-100": "#D8EBF2",
          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
