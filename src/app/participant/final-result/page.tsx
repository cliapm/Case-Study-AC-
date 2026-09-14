"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { MetricCard } from "@/components/MetricCard";
import { calculateTeamPosition, getTeamById } from "@/lib/simulation";
import { stages } from "@/lib/mock-data";
import { useLanguage } from "@/lib/i18n/LanguageContext";

function FinalResultContent() {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();
  const teamId = searchParams.get("team") ?? "A1";
  const team = getTeamById(teamId);
  const stage = Number(searchParams.get("stage") ?? stages.length);
  const selectedCodes = searchParams.get("codes")?.split(",").filter(Boolean) ?? [];
  const result = calculateTeamPosition(teamId, stages.length, selectedCodes, language);

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 text-slate-900">
      <div className="mx-auto max-w-6xl space-y-6">
        <Link href={`/participant/waiting?team=${team.id}&stage=${stage}`} className="inline-flex items-center text-sm font-medium text-[#0d2d4f] underline">← {t("common.back")}</Link>
        <header className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9e1b2b]">{t("finalResult.label")}</p>
          <h1 className="mt-2 text-3xl font-bold text-[#0d2d4f]">{t("common.team")} {team.id} • {t("common.variant")} {team.variant}</h1>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          {[
            { label: t("finalResult.finalAP"), value: `${result.apPaid.toFixed(1)}m` },
            { label: t("finalResult.finalPB"), value: `${result.pbPaid.toFixed(1)}m` },
            { label: t("finalResult.totalCosts"), value: `${result.costs.toFixed(1)}m` },
            { label: t("finalResult.accumulatedPremium"), value: `${result.accumulatedPremium.toFixed(1)}m` },
            { label: t("finalResult.totalRecovery"), value: `${(result.potentialRecovery + result.realisedRecovery).toFixed(1)}m` },
            { label: t("finalResult.finalNetLoss"), value: `${result.netLoss.toFixed(1)}m` },
          ].map((item) => (
            <MetricCard key={item.label} label={item.label} value={item.value} />
          ))}
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-bold text-[#0d2d4f]">{t("finalResult.outcomeSummary")}</h2>
          <p className="mt-4 text-sm font-medium text-slate-900">{t("finalResult.appliedDecisions")}: {selectedCodes.length ? selectedCodes.join(", ") : t("finalResult.baselineOnly")}</p>
          <p className="mt-4 text-sm leading-7 text-slate-700">{t("finalResult.summary")}</p>
        </section>
      </div>
    </main>
  );
}

export default function FinalResultPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-slate-100" />}>
      <FinalResultContent />
    </Suspense>
  );
}
