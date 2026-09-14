"use client";

import { createContext, useContext, useEffect, useState } from "react";
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
  language: "en",
  setLanguage: () => {},
  t: (path: string) => getValueAtPath(en, path),
};

const LanguageContext = createContext<LanguageContextValue>(defaultValue);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("agua-clara-language") as Language | null;
    if (stored && dictionaries[stored]) {
      setLanguageState(stored);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    window.localStorage.setItem("agua-clara-language", lang);
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
