import type { Config } from "tailwindcss";

// We want each package to be responsible for its own content.
const config: Omit<Config, "content"> = {
  theme: {
    extend: {
      colors: {
        appbar: "#FDF1F1",
        nav: "#F0EBEB",
        'nav-button': "#E2E2E2",
      }
    },
  },
  plugins: [],
};
export default config;