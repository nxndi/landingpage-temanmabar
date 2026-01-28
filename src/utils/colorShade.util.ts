import chroma from "chroma-js";

interface TailwindColorConfig {
  [key: string]: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
}

const generateShades = (
  color: string,
  name: string = "customColor",
): TailwindColorConfig => {
  const scale =
    name === "background"
      ? chroma.scale([color, "black"])
      : name === "text"
        ? chroma.scale(["white", color])
        : chroma.scale(["white", color, "black"]);
  const palette: string[] = [];

  // Generate shades for 50 to 900
  palette.push(scale(0.05).hex()); // Special case for 50
  for (let i = 0.1; i < 0.9; i += 0.1) {
    palette.push(scale(i).hex());
  }

  const colorConfig: TailwindColorConfig = {
    [name]: {
      50: palette[0],
      100: palette[1],
      200: palette[2],
      300: palette[3],
      400: palette[4],
      500: palette[5],
      600: palette[6],
      700: palette[7],
      800: palette[8],
      900: palette[9],
    },
  };

  return colorConfig;
};

export default generateShades;
