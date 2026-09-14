"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function FacilitatorLoadingPage() {
  const { t } = useLanguage();
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9e1b2b]">{t("facilitatorLoading.label")}</p>
        <h1 className="mt-3 text-3xl font-bold text-[#0d2d4f]">{t("facilitatorLoading.title")}</h1>
        <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full w-2/3 animate-pulse rounded-full bg-[#9e1b2b]" />
        </div>
      </div>
    </main>
  );
}
