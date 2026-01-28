import { TLang } from "../types/lang.type";
import idFlag from "../assets/flags/id.webp";
import enFlag from "../assets/flags/en.webp";

export type ILang = {
  [key in TLang]: {
    text: string;
    lng: TLang;
    icon: string;
  };
};

const LANG: ILang = {
  en: {
    text: "English",
    lng: "en",
    icon: enFlag,
  },
  id: {
    text: "Indonesia",
    lng: "id",
    icon: idFlag,
  },
};

export default LANG;
