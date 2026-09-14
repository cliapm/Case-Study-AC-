"use client";

import { getTeamById } from "@/lib/simulation";
import { getLocalizedVariantLabel } from "@/lib/i18n/content";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function CaseOverviewContent() {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();
  const teamId = searchParams.get("team") ?? "A1";
  const team = getTeamById(teamId);

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 text-slate-900">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9e1b2b]">{t("caseOverview.title")}</p>
              <h1 className="mt-2 text-3xl font-bold text-[#0d2d4f]">{t("caseOverview.heading")}</h1>
            </div>
            <div className="rounded-full bg-[#0d2d4f] px-4 py-2 text-sm font-semibold text-white">{t("common.team")} {team.id} • {t("common.variant")} {team.variant}</div>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-2xl font-bold text-[#0d2d4f]">{t("caseOverview.projectProfile")}</h2>
            <ul className="mt-5 space-y-3 text-sm text-slate-700">
              <li><strong className="text-slate-900">{t("caseOverview.project")}:</strong> {t("caseOverview.projectValue")}</li>
              <li><strong className="text-slate-900">{t("caseOverview.contract")}:</strong> {t("caseOverview.contractTypeValue")}</li>
              <li><strong className="text-slate-900">{t("caseOverview.contractValue")}:</strong> {t("caseOverview.contractValueAmount")}</li>
              <li><strong className="text-slate-900">{t("caseOverview.originalTerm")}:</strong> {t("caseOverview.originalTermValue")}</li>
              <li><strong className="text-slate-900">{t("caseOverview.assistedOperation")}:</strong> {t("caseOverview.assistedOperationValue")}</li>
              <li><strong className="text-slate-900">{t("caseOverview.apBond")}:</strong> {t("caseOverview.apBondAmount")}</li>
              <li><strong className="text-slate-900">{t("caseOverview.pbBond")}:</strong> {t("caseOverview.pbBondAmount")}</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-2xl font-bold text-[#0d2d4f]">{t("caseOverview.assignedVariant")}</h2>
            <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
              <p className="font-semibold text-slate-900">{t("common.variant")} {team.variant}</p>
              <p className="mt-2">{getLocalizedVariantLabel(team.variant, language)}</p>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-bold text-[#0d2d4f]">{t("caseOverview.jvStructure")}</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              { name: "Andina Infraestructura S.A.C.", share: "35%" },
              { name: "Iberagua Ingeniería y Construcción S.A.", share: "40%" },
              { name: "Mediterranea Impianti S.p.A.", share: "25%" },
            ].map((member) => (
              <div key={member.name} className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm font-medium text-slate-700">{member.name}</p>
                <p className="mt-2 text-xl font-bold text-[#0d2d4f]">{member.share}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="flex justify-end">
          <a href={`/participant/current-stage?team=${team.id}`} className="rounded-xl bg-[#9e1b2b] px-5 py-3 font-semibold text-white hover:bg-[#7d1524]">{t("caseOverview.proceedButton")}</a>
        </div>
      </div>
    </main>
  );
}

export default function CaseOverviewPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-slate-100" />}>
      <CaseOverviewContent />
    </Suspense>
  );
}
