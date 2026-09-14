"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9e1b2b]">{t("brand.tag")}</p>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">{t("participantLogin.title")}</h1>
          </div>
          <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">{t("home.badge")}</div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0d2d4f] text-lg font-bold text-white">AC</div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{t("home.liveEventAccess")}</p>
                <h2 className="text-3xl font-bold text-[#0d2d4f]">{t("home.participantLogin")}</h2>
              </div>
            </div>

            <div className="grid gap-5 text-sm text-slate-700 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">{t("caseOverview.title")}</p>
                <p className="mt-2 font-medium text-slate-800">{t("caseOverview.projectValue")}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">{t("home.contractValueLabel")}</p>
                <p className="mt-2 font-medium text-slate-800">{t("caseOverview.contractValueAmount")}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">{t("caseOverview.originalTerm")}</p>
                <p className="mt-2 font-medium text-slate-800">{t("caseOverview.originalTermValue")}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">{t("home.bondValuesLabel")}</p>
                <p className="mt-2 font-medium text-slate-800">{t("home.bondValuesAmount")}</p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-700">{t("home.accessNotice")}</p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <Link href="/participant/login" className="inline-flex items-center justify-center rounded-xl bg-[#9e1b2b] px-5 py-3 font-semibold text-white transition hover:bg-[#7d1524]">{t("home.enterButton")}</Link>
                <Link href="/facilitator/login" className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100">{t("home.facilitatorAccess")}</Link>
              </div>
            </div>
          </div>

          <aside className="rounded-3xl border border-slate-200 bg-[#0d2d4f] p-6 text-white shadow-sm sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9fe9de]">{t("home.caseStatus")}</p>
            <h3 className="mt-4 text-2xl font-bold">{t("home.currentRelease")}</h3>
            <p className="mt-2 text-sm text-slate-200">{t("home.releaseDescription")}</p>
            <ul className="mt-6 space-y-3 text-sm text-slate-100">
              <li>• {t("home.statTeams")}</li>
              <li>• {t("home.statVariants")}</li>
              <li>• {t("home.statStages")}</li>
              <li>• {t("home.statDecisions")}</li>
            </ul>
          </aside>
        </section>
      </div>
    </main>
  );
}
