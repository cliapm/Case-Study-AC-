"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

const LANGUAGES: { code: "en" | "es" | "pt"; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
  { code: "pt", label: "PT" },
];

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          type="button"
          onClick={() => setLanguage(lang.code)}
          className={`rounded-md px-2 py-1 text-xs font-semibold transition ${
            language === lang.code ? "bg-[#0d2d4f] text-white" : "text-slate-600 hover:bg-slate-200"
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
