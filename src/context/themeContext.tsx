import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { TDarkMode } from "../types/darkMode.type";
import DARK_MODE from "../constants/darkMode.constant";
import appConfig from "../config/app.config";
import { TLang } from "../types/lang.type";

export interface IThemeContextProps {
  isDarkTheme: boolean;
  darkModeStatus: TDarkMode | null;
  setDarkModeStatus: Dispatch<SetStateAction<TDarkMode | null>>;
  fontSize: number;
  setFontSize: Dispatch<SetStateAction<number>>;
  language: TLang;
  setLanguage: Dispatch<SetStateAction<TLang>>;
  // region: string;
  // setRegion: Dispatch<SetStateAction<string>>;
}
const ThemeContext = createContext<IThemeContextProps>(
  {} as IThemeContextProps
);

interface IThemeContextProviderProps {
  children: ReactNode;
}
export const ThemeContextProvider: FC<IThemeContextProviderProps> = ({
  children,
}) => {
  const projectName = appConfig.projectName.split(" ").join("_").toLowerCase();
  /**
   * Language
   */
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState<TLang>(
    (localStorage.getItem(`${projectName}_language`) as TLang) ||
      appConfig.language
  );
  useLayoutEffect(() => {
    localStorage.setItem(`${projectName}_language`, language);

    i18n
      .changeLanguage(language)
      .then(() => {
        document.documentElement.setAttribute("dir", i18n.dir());
        document.documentElement.setAttribute("lang", i18n.language);
      })
      .catch((e) => {
        console.log(e);
      });

    // Changing the global locale doesn't affect existing instances.
    // more information: https://day.js.org/docs/en/i18n/changing-locale
    // If you want the current instances to change instantly: dayjs().locale(i18n.language)
    // dayjs.locale(language);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  /**
   * Dark Mode
   */
  const [darkModeStatus, setDarkModeStatus] = useState<TDarkMode | null>(
    (localStorage.getItem(`${projectName}_theme`) ||
      appConfig.theme) as TDarkMode
  );
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(
    darkModeStatus === appConfig.theme
  );
  useLayoutEffect(() => {
    localStorage.setItem(`${projectName}_theme`, darkModeStatus as string);
    if (
      localStorage.getItem(`${projectName}_theme`) === DARK_MODE.DARK ||
      (localStorage.getItem(`${projectName}_theme`) === DARK_MODE.SYSTEM &&
        window.matchMedia(`(prefers-color-scheme: ${DARK_MODE.DARK})`).matches)
    ) {
      document.documentElement.classList.add(DARK_MODE.DARK);
      setIsDarkTheme(true);
    } else {
      document.documentElement.classList.remove(DARK_MODE.DARK);
      setIsDarkTheme(false);
    }
  }, [darkModeStatus]);

  /**
   * Font Size
   */
  const [fontSize, setFontSize] = useState<number>(
    Number(localStorage.getItem(`${projectName}_fontSize`))
      ? Number(localStorage.getItem(`${projectName}_fontSize`))
      : appConfig.fontSize
  );
  useLayoutEffect(() => {
    localStorage.setItem(`${projectName}_fontSize`, fontSize?.toString());
  }, [fontSize]);

  /**
   * Region
   */
  // const [region, setRegion] = useState<string>(
  //   (localStorage.getItem(`${projectName}_region`) as string) ||
  //     appConfig.region
  // );
  // useLayoutEffect(() => {
  //   localStorage.setItem(`${projectName}_region`, region);
  // }, [region]);

  const values: IThemeContextProps = useMemo(
    () => ({
      isDarkTheme,
      darkModeStatus,
      setDarkModeStatus,
      fontSize,
      setFontSize,
      language,
      setLanguage,
      // region,
      // setRegion,
    }),
    [isDarkTheme, darkModeStatus, fontSize, language]
  );

  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContext;
