import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import appConfig from "./config/app.config";

// Import dayjs locales
import "dayjs/locale/en";
import "dayjs/locale/es";
import "dayjs/locale/ar";

// Import English resources
import enLanguage from "./locales/en/language.json";
import idLanguage from "./locales/id/language.json";

// Define resources by language
const resources = {
  en: {
    language: enLanguage,
  },
  id: {
    language: idLanguage,
  },
};

const projectName = appConfig.projectName.split(" ").join("_").toLowerCase();
// Get user's language preference from localStorage
const storedLanguage = localStorage.getItem(
  `${projectName.toLowerCase()}_language`
);
const languageToUse = storedLanguage || appConfig.language;
// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: appConfig.language,
    lng: languageToUse,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
  })
  .then();

export default i18n;
