/** @type {import('tailwindcss').Config} */

const codeblockCss = {
  pre: {
    color: "#1F2933",
    backgroundColor: "#F5F7FA",
  },
  "pre code::before": {
    "padding-left": "unset",
  },
  "pre code::after": {
    "padding-right": "unset",
  },
  code: {
    backgroundColor: "#F5F7FA",
    color: "#DD1144",
    fontWeight: "400",
    "border-radius": "0.25rem",
  },
  "code::before": {
    content: '""',
    "padding-left": "0.25rem",
  },
  "code::after": {
    content: '""',
    "padding-right": "0.25rem",
  },
};

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/MarkdownEditor.css",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: "Inter, sans-serif",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            "pre code": {
              borderRadius: theme("borderRadius.xl"),
              borderWidth: "4px",
              borderColor: theme("colors.stone.100"),
              backgroundColor: theme("colors.stone.100"),
            },
            pre: false,
            code: false,
            "code::before": false,
            "code::after": false,
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwind-scrollbar")],
};
