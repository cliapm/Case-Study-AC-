"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Team } from "@/lib/types";
import { useLanguage } from "@/lib/i18n/LanguageContext";

type Position = {
  accumulatedPremium: number;
  potentialRecovery: number;
  realisedRecovery: number;
  netLoss: number;
};

type TeamWithSubmission = Team & {
  submission: { selectedDecisionCodes: string[]; submittedAt: string } | null;
  status: "Submitted" | "Waiting";
  position: Position;
};

export default function FacilitatorDashboardPage() {
  const { t } = useLanguage();
  const [teams, setTeams] = useState<TeamWithSubmission[]>([]);
  const [submittedCount, setSubmittedCount] = useState(0);
  const [stageNumber, setStageNumber] = useState(1);
  const [releasedStage, setReleasedStage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isReleasing, setIsReleasing] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const fetchTeams = async () => {
    try {
      const [teamsRes, stageRes] = await Promise.all([
        fetch(`/api/facilitator/teams?stage=${stageNumber}`),
        fetch("/api/stage"),
      ]);
      const data = await teamsRes.json();
      const stageData = await stageRes.json();
      setTeams(data.teams ?? []);
      setSubmittedCount(data.submittedCount ?? 0);
      setReleasedStage(stageData.stageNumber ?? 1);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeams();
    const interval = setInterval(fetchTeams, 3000);
    return () => clearInterval(interval);
  }, [stageNumber]);

  const handleReleaseStage = async () => {
    if (!confirm(t("facilitatorDashboard.confirmRelease").replace("{stage}", String(releasedStage + 1)))) return;
    setIsReleasing(true);
    try {
      const res = await fetch("/api/facilitator/release-stage", { method: "POST" });
      const data = await res.json();
      setReleasedStage(data.stageNumber);
      setStageNumber(data.stageNumber);
    } catch (err) {
      console.error(err);
    } finally {
      setIsReleasing(false);
    }
  };

  const handleResetSimulation = async () => {
    if (!confirm(t("facilitatorDashboard.confirmReset"))) return;
    setIsResetting(true);
    try {
      const res = await fetch("/api/facilitator/reset-simulation", { method: "POST" });
      const data = await res.json();
      setReleasedStage(data.stageNumber);
      setStageNumber(data.stageNumber);
      await fetchTeams();
    } catch (err) {
      console.error(err);
    } finally {
      setIsResetting(false);
    }
  };

  const totalTeams = teams.length || 28;

  return (
    <main className="min-h-screen bg-slate-100 p-4 text-slate-900 lg:p-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9e1b2b]">{t("facilitatorDashboard.label")}</p>
            <h1 className="mt-2 text-3xl font-bold text-[#0d2d4f]">{t("facilitatorDashboard.title")}</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={fetchTeams} className="rounded-xl border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700">{t("facilitatorDashboard.refresh")}</button>
            <button
              onClick={handleReleaseStage}
              disabled={isReleasing || releasedStage >= 5}
              className="rounded-xl bg-[#9e1b2b] px-4 py-2 font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {releasedStage >= 5 ? t("facilitatorDashboard.finalStageReached") : isReleasing ? t("facilitatorDashboard.releasing") : `${t("facilitatorDashboard.releaseStage")} ${releasedStage + 1}`}
            </button>
            <Link href="/facilitator/comparison" className="rounded-xl border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700">{t("facilitatorDashboard.comparisonScreen")}</Link>
            <a href="/api/facilitator/export-csv" className="rounded-xl bg-[#0d2d4f] px-4 py-2 font-semibold text-white">{t("facilitatorDashboard.exportCsv")}</a>
            <button
              onClick={handleResetSimulation}
              disabled={isResetting}
              className="rounded-xl border border-[#9e1b2b] bg-white px-4 py-2 font-semibold text-[#9e1b2b] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isResetting ? t("facilitatorDashboard.resetting") : t("facilitatorDashboard.resetButton")}
            </button>
          </div>
        </header>

        <section className="mb-6 grid gap-4 md:grid-cols-4">
          {[
            { label: t("facilitatorDashboard.currentReleasedStage"), value: String(releasedStage) },
            { label: t("facilitatorDashboard.teamsSubmitted"), value: `${submittedCount} ${t("facilitatorDashboard.of")} ${totalTeams}` },
            { label: t("facilitatorDashboard.teamsWaiting"), value: String(totalTeams - submittedCount) },
            { label: t("facilitatorDashboard.status"), value: t("facilitatorDashboard.live") },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">{item.label}</p>
              <p className="mt-3 text-2xl font-bold text-[#0d2d4f]">{item.value}</p>
            </div>
          ))}
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <select
              className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700"
              value={stageNumber}
              onChange={(e) => setStageNumber(Number(e.target.value))}
            >
              <option value={1}>{t("facilitatorDashboard.stage")} 1</option>
              <option value={2}>{t("facilitatorDashboard.stage")} 2</option>
              <option value={3}>{t("facilitatorDashboard.stage")} 3</option>
              <option value={4}>{t("facilitatorDashboard.stage")} 4</option>
              <option value={5}>{t("facilitatorDashboard.stage")} 5</option>
            </select>
            <span className="text-sm text-slate-500">{t("facilitatorDashboard.viewingSubmissions")}</span>
            {isLoading ? <span className="text-sm text-slate-500">{t("facilitatorDashboard.loading")}</span> : null}
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="px-3 py-3 font-semibold">{t("facilitatorDashboard.colTeam")}</th>
                  <th className="px-3 py-3 font-semibold">{t("facilitatorDashboard.colVariant")}</th>
                  <th className="px-3 py-3 font-semibold">{t("facilitatorDashboard.colStatus")}</th>
                  <th className="px-3 py-3 font-semibold">{t("facilitatorDashboard.colSubmitted")}</th>
                  <th className="px-3 py-3 font-semibold">{t("facilitatorDashboard.colDecisionCodes")}</th>
                  <th className="px-3 py-3 font-semibold">{t("facilitatorDashboard.colPremium")}</th>
                  <th className="px-3 py-3 font-semibold">{t("facilitatorDashboard.colRecovery")}</th>
                  <th className="px-3 py-3 font-semibold">{t("facilitatorDashboard.colNetLoss")}</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team) => (
                  <tr key={team.id} className="border-t border-slate-200">
                    <td className="px-3 py-3 font-semibold text-[#0d2d4f]">{team.id}</td>
                    <td className="px-3 py-3">{team.variant}</td>
                    <td className="px-3 py-3">
                      <span className={`rounded-full px-2 py-1 text-xs font-medium ${team.status === "Submitted" ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"}`}>
                        {team.status === "Submitted" ? t("facilitatorDashboard.submittedStatus") : t("facilitatorDashboard.waitingStatus")}
                      </span>
                    </td>
                    <td className="px-3 py-3">{team.submission ? new Date(team.submission.submittedAt).toLocaleString() : "-"}</td>
                    <td className="px-3 py-3">{team.submission ? team.submission.selectedDecisionCodes.join(", ") : "-"}</td>
                    <td className="px-3 py-3">{team.position.accumulatedPremium.toFixed(1)}m</td>
                    <td className="px-3 py-3">{(team.position.potentialRecovery + team.position.realisedRecovery).toFixed(1)}m</td>
                    <td className="px-3 py-3">{team.position.netLoss.toFixed(1)}m</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
