import appConfig from "./src/config/app.config";
import generateShades from "./src/utils/colorShade.util";

const defaultTheme = require("tailwindcss/defaultTheme");
const backgroundShade = generateShades(appConfig.backgroundColor, "background");
const textShade = generateShades(appConfig.textColor, "text");
const primaryShade = generateShades(appConfig.primaryColor, "primary");
const secondaryShade = generateShades(appConfig.secondaryColor, "secondary");
const accentShade = generateShades(appConfig.accentColor, "accent");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      aspectRatio: {
        '5/7': '5 / 7',
      },
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
        display: ['Ibarra Real Nova', 'serif']
      },
      colors: {
        // Colors from appConfig
        ...backgroundShade,
        ...textShade,
        ...primaryShade,
        ...secondaryShade,
        ...accentShade,
      },
      screens: {
        'xs': '555px',
        'xxs': '320px',
      }
    },
  },
  safelist: [
    {
      pattern:
        // /bg-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900)$/,
        /bg-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|primary|secondary|accent)-(50|100|200|300|400|500|600|700|800|900|950)$/,
      variants: ["hover", "active", "checked", "indeterminate"],
    },
    {
      pattern:
        // /bg-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900)$/,
        /bg-(zinc|gray|red|amber|lime|emerald|sky|blue|violet|green|orange|yellow|indigo|pink|rose|cyan|primary|secondary|accent)-(50|100|200|300|400|500|600|700|800|900|950)\/(10)$/,
    },
    // {
    // 	pattern: /border-(inherit|current|transparent|black|white)$/,
    // 	variants: ['hover', 'active'],
    // },
    {
      pattern:
        // /border-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900)$/,
        /border-(zinc|gray|red|amber|lime|emerald|sky|blue|violet|green|orange|yellow|indigo|pink|rose|cyan|primary|secondary|accent)-(50|100|200|300|400|500|600|700|800|900|950)$/,
      variants: ["hover", "active", "dark:hover", "peer-checked"],
    },
    {
      pattern:
        // /ring-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900)$/,
        /ring-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|primary|secondary|accent)-(50|100|200|300|400|500|600|700|800|900|950)$/,
      variants: ["hover", "active", "focus", "offset"],
    },
    {
      pattern:
        // /ring-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900)$/,
        /ring-offset-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|primary|secondary|accent)-(50|100|200|300|400|500|600|700|800|900|950)$/,
      variants: ["hover", "active", "focus"],
    },
    {
      pattern:
        // /border-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900)\/(0|5|10|20|25|30|40|50|60|70|75|80|90|95|100)$/,
        /border-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|primary|secondary|accent)-(50|100|200|300|400|500|600|700|800|900|950)\/(50)$/,
      variants: ["hover", "active"],
    },
    {
      pattern:
        // /text-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900)\/(0|5|10|20|25|30|40|50|60|70|75|80|90|95|100)$/,
        /text-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|primary|secondary|accent)-(50|100|200|300|400|500|600|700|800|900|950)$/,
      variants: ["hover", "active", "dark:hover"],
    },
    {
      pattern:
        // /border-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(50|100|200|300|400|500|600|700|800|900)\/(0|5|10|20|25|30|40|50|60|70|75|80|90|95|100)$/,
        /shadow-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|primary|secondary|accent)-(50|100|200|300|400|500|600|700|800|900|950)\/(10|20|30|40|50|60|70|80|90|100)$/,
      variants: ["hover", "focus", "active"],
    },
  ],
  darkMode: "class",
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/typography"),
  ],
};
