"use client";

import { createContext, useContext, useState } from "react";
import { en } from "./en";
import { es } from "./es";
import { pt } from "./pt";

export type Language = "en" | "es" | "pt";

const dictionaries = { en, es, pt };

type LanguageContextValue = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string) => string;
};

function getValueAtPath(obj: any, path: string): string {
  return path.split(".").reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj) ?? path;
}

const defaultValue: LanguageContextValue = {
  language: "es",
  setLanguage: () => {},
  t: (path: string) => getValueAtPath(es, path),
};

const LanguageContext = createContext<LanguageContextValue>(defaultValue);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("es");

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (path: string) => getValueAtPath(dictionaries[language], path);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
