"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type LanguageContextType = {
  language: string;
  setLanguage: (language: string) => void;
};

const LanguageContext =
  createContext<LanguageContextType>({
    language: "English",
    setLanguage: () => {},
  });

export function LanguageProvider({
  children,
}: {
  children: React.ReactNode;
}) {

  const [language, setLanguage] =
    useState("English");

  useEffect(() => {

    const savedLanguage =
      localStorage.getItem("language");

    if (savedLanguage) {
      setLanguage(savedLanguage);
    }

  }, []);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
