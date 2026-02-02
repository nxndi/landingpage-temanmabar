import DARK_MODE from "../constants/darkMode.constant";
import { TDarkMode } from "../types/darkMode.type";
import { TRounded } from "../types/rounded.type";
import { HEXColor, RGBAColor } from "../types/colors.type";
import { TBorderWidth } from "../types/borderWidth.type";
import { TLang } from "../types/lang.type";

type TAppConfigs = {
  projectTitle: string;
  projectName: string;
  language: TLang;
  region: string;
  theme: TDarkMode;
  backgroundColor: HEXColor | RGBAColor | RGBAColor;
  textColor: HEXColor | RGBAColor | RGBAColor;
  primaryColor: HEXColor | RGBAColor | RGBAColor;
  secondaryColor: HEXColor | RGBAColor | RGBAColor;
  accentColor: HEXColor | RGBAColor | RGBAColor;
  rounded: TRounded;
  borderWidth: TBorderWidth;
  transition: string;
  fontSize: 12 | 13 | 14 | 15 | 16 | 17 | 18;
  json_file?: string;
  // GA_trackingId: string;
};

const appConfig: TAppConfigs = {
  projectTitle: "Teman Mabar",
  projectName: "Teman Mabar",
  language: "en",
  region: "id",
  theme: DARK_MODE.DARK,
  backgroundColor: "#0a0a0a",
  textColor: "#0c1614",
  primaryColor: "#1d20b4",
  secondaryColor: "#e3e1de",
  accentColor: "#1a1a1a",
  rounded: "rounded-xl",
  borderWidth: "border",
  transition: "transition-all duration-300 ease-in-out",
  fontSize: 12,
  // json_file: "kulo.json",
  // GA_trackingId: "G-PSZS10CQW3",
};

export default appConfig;
