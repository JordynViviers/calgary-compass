import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",

    interpolation: {
      escapeValue: false,
    },

    resources: {

      en: {
        translation: {
          home: "Home",
          technologies: "Technologies",
          events: "Events",
          apply: "Apply"
        }
      },

      fr: {
        translation: {
          home: "Accueil",
          technologies: "Technologies",
          events: "Événements",
          apply: "Postuler"
        }
      },

      es: {
        translation: {
          home: "Inicio",
          technologies: "Tecnologías",
          events: "Eventos",
          apply: "Aplicar"
        }
      }

    }
  });

export default i18n;
