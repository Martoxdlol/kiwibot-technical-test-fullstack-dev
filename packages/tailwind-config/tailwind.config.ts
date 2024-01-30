import type { Config } from "tailwindcss";

// We want each package to be responsible for its own content.
const config: Omit<Config, "content"> = {
  theme: {
    extend: {
      colors: {
        primary: "#FDF1F1",
        'primary-strong': "#ffcfcf",
        nav: "#F0EBEB",
        'nav-button': "#E2E2E2",
        secondary: "#086939",
      }
    },
  },
  plugins: [],
};
export default config;