import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import langRu from "./locales/ru/translation.json";
import langUz from "./locales/uz/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    ru: {
      translation: langRu,
    },
    uz: {
      translation: langUz,
    },
  },
  lng: "uz",
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});
