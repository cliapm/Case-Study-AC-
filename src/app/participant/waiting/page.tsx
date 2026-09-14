"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getTeamById } from "@/lib/simulation";

type Submission = {
  selectedDecisionCodes: string[];
  stageNumber: number;
} | null;

function WaitingContent() {
  const searchParams = useSearchParams();
  const teamId = searchParams.get("team") ?? "A1";
  const team = getTeamById(teamId);
  const submittedStage = Number(searchParams.get("stage") ?? "1");

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

  const nextStageAvailable = releasedStage > submittedStage;

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900">
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9e1b2b]">Submission confirmed</p>
        <h1 className="mt-3 text-3xl font-bold text-[#0d2d4f]">
          {nextStageAvailable ? "The facilitator has released the next stage" : "Waiting for the facilitator to release the next stage"}
        </h1>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Team ID</p>
            <p className="mt-2 text-xl font-bold text-[#0d2d4f]">{team.id}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Current simulation progress</p>
            <p className="mt-2 text-xl font-bold text-[#0d2d4f]">Stage {submittedStage} of 5 submitted</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-700">
          <p className="font-medium text-slate-900">Submitted decision codes</p>
          <p className="mt-2">{isLoading ? "Loading…" : stored?.selectedDecisionCodes?.join(", ") ?? "No submission found"}</p>
        </div>

        {nextStageAvailable ? (
          <div className="mt-6 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800">
            <p className="font-medium">Stage {releasedStage} is now open.</p>
            <p className="mt-2">Continue to make your next round of decisions.</p>
          </div>
        ) : (
          <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
            <p className="font-medium text-slate-900">Current position summary</p>
            <p className="mt-2">The facilitator will release the next stage after all team submissions are locked. This page checks quietly in the background — no need to refresh it yourself.</p>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          {stored ? (
            <Link href={`/participant/current-position?team=${team.id}&codes=${stored.selectedDecisionCodes.join(",")}`} className="inline-flex rounded-xl bg-[#0d2d4f] px-4 py-3 font-semibold text-white">View calculated position</Link>
          ) : null}
          {nextStageAvailable ? (
            <Link href={`/participant/current-stage?team=${team.id}`} className="inline-flex rounded-xl bg-[#9e1b2b] px-4 py-3 font-semibold text-white">Continue to Stage {releasedStage}</Link>
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
