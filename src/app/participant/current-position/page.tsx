"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { MetricCard } from "@/components/MetricCard";
import { calculateTeamPosition, getTeamById } from "@/lib/simulation";
import { useLanguage } from "@/lib/i18n/LanguageContext";

function CurrentPositionContent() {
  const { t, language } = useLanguage();
  const searchParams = useSearchParams();
  const teamId = searchParams.get("team") ?? "A1";
  const team = getTeamById(teamId);
  const stage = Number(searchParams.get("stage") ?? team.currentStage);
  const selectedCodes = searchParams.get("codes")?.split(",").filter(Boolean) ?? [];
  const position = calculateTeamPosition(teamId, stage, selectedCodes, language);

  const metrics = [
    { label: t("currentPosition.apExposure"), value: `${position.apExposure.toFixed(1)}m` },
    { label: t("currentPosition.pbExposure"), value: `${position.pbExposure.toFixed(1)}m` },
    { label: t("currentPosition.accumulatedPremium"), value: `${position.accumulatedPremium.toFixed(1)}m` },
    { label: t("currentPosition.apPayment"), value: `${position.apPaid.toFixed(1)}m` },
    { label: t("currentPosition.pbPayment"), value: `${position.pbPaid.toFixed(1)}m` },
    { label: t("currentPosition.costs"), value: `${position.costs.toFixed(1)}m` },
    { label: t("currentPosition.securedProtections"), value: `${position.reserve.toFixed(1)}m` },
    { label: t("currentPosition.potentialRecoveries"), value: `${position.potentialRecovery.toFixed(1)}m` },
    { label: t("currentPosition.realisedRecoveries"), value: `${position.realisedRecovery.toFixed(1)}m` },
    { label: t("currentPosition.currentReserve"), value: `${Math.max(position.netLoss, 0).toFixed(1)}m` },
    { label: t("currentPosition.estimatedNetLoss"), value: `${position.netLoss.toFixed(1)}m` },
  ];

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <Link href={`/participant/waiting?team=${team.id}&stage=${stage}`} className="mb-4 inline-flex items-center text-sm font-medium text-[#0d2d4f] underline">← {t("common.back")}</Link>
        <header className="mb-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9e1b2b]">{t("currentPosition.label")}</p>
          <h1 className="mt-2 text-3xl font-bold text-[#0d2d4f]">{t("common.team")} {team.id} • {t("common.variant")} {team.variant}</h1>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} label={metric.label} value={metric.value} />
          ))}
        </section>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-bold text-[#0d2d4f]">{t("currentPosition.impactTitle")}</h2>
          <div className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
            <p className="font-medium text-slate-900">{t("currentPosition.appliedDecisions")}: {selectedCodes.length ? selectedCodes.join(", ") : t("currentPosition.baselineOnly")}</p>
            {position.knownEffects.map((effect) => <p key={effect}>{effect}</p>)}
            <p>{t("currentPosition.para1")}</p>
            <p>{t("currentPosition.para2")}</p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default function CurrentPositionPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-slate-100" />}>
      <CurrentPositionContent />
    </Suspense>
  );
}
