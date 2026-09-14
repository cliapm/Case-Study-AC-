"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getTeamById } from "@/lib/simulation";
import { stages } from "@/lib/mock-data";
import { useLanguage } from "@/lib/i18n/LanguageContext";

type Submission = { selectedDecisionCodes: string[]; stageNumber: number } | null;

const TOTAL_STAGES = stages.length;

function WaitingContent() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const teamId = searchParams.get("team") ?? "A1";
  const team = getTeamById(teamId);
  const submittedStage = Number(searchParams.get("stage") ?? "1");
  const isFinalStage = submittedStage >= TOTAL_STAGES;

  const [stored, setStored] = useState<Submission>(null);
  const [releasedStage, setReleasedStage] = useState(submittedStage);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function poll() {
      try {
        const [stageRes, subRes] = await Promise.all([
          fetch("/api/stage"),
          fetch(`/api/submission?team=${teamId}&stage=${submittedStage}`),
        ]);
        const stageData = await stageRes.json();
        const subData = await subRes.json();
        if (cancelled) return;
        setReleasedStage(stageData.stageNumber ?? submittedStage);
        setStored(subData.submission ?? null);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    }
    poll();
    const interval = setInterval(poll, 8000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [teamId, submittedStage]);

  const nextStageAvailable = !isFinalStage && releasedStage > submittedStage;

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900">
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9e1b2b]">{t("waiting.submissionConfirmed")}</p>
        <h1 className="mt-3 text-3xl font-bold text-[#0d2d4f]">
          {isFinalStage ? t("waiting.completedTitle") : nextStageAvailable ? t("waiting.releasedTitle") : t("waiting.waitingTitle")}
        </h1>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">{t("waiting.teamId")}</p>
            <p className="mt-2 text-xl font-bold text-[#0d2d4f]">{team.id}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">{t("waiting.progress")}</p>
            <p className="mt-2 text-xl font-bold text-[#0d2d4f]">{t("common.stage")} {submittedStage} {t("waiting.stageSubmitted")}</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-700">
          <p className="font-medium text-slate-900">{t("waiting.submittedCodes")}</p>
          <p className="mt-2">{isLoading ? t("waiting.loading") : stored?.selectedDecisionCodes?.join(", ") ?? t("waiting.noSubmission")}</p>
        </div>

        {isFinalStage ? (
          <div className="mt-6 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">
            <p className="font-medium">{t("waiting.completedTitle")}</p>
            <p className="mt-2">{t("waiting.completedText")}</p>
          </div>
        ) : nextStageAvailable ? (
          <div className="mt-6 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">
            <p className="font-medium">{t("common.stage")} {releasedStage} {t("waiting.nowOpen")}</p>
            <p className="mt-2">{t("waiting.continueNext")}</p>
          </div>
        ) : (
          <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
            <p className="font-medium text-slate-900">{t("waiting.summaryTitle")}</p>
            <p className="mt-2">{t("waiting.summaryText")}</p>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          {isFinalStage && stored ? (
            <Link href={`/participant/final-result?team=${team.id}&stage=${submittedStage}&codes=${stored.selectedDecisionCodes.join(",")}`} className="inline-flex rounded-xl bg-[#0d2d4f] px-4 py-3 font-semibold text-white">{t("waiting.viewFinalResult")}</Link>
          ) : stored ? (
            <Link href={`/participant/current-position?team=${team.id}&stage=${submittedStage}&codes=${stored.selectedDecisionCodes.join(",")}`} className="inline-flex rounded-xl bg-[#0d2d4f] px-4 py-3 font-semibold text-white">{t("waiting.viewPosition")}</Link>
          ) : null}
          {nextStageAvailable ? (
            <Link href={`/participant/current-stage?team=${team.id}`} className="inline-flex rounded-xl bg-[#9e1b2b] px-4 py-3 font-semibold text-white">{t("waiting.continueToStage")} {releasedStage}</Link>
          ) : null}
        </div>
      </div>
    </main>
  );
}

export default function WaitingScreenPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-slate-100" />}>
      <WaitingContent />
    </Suspense>
  );
}
