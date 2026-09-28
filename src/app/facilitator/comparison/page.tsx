"use client";

import { useEffect, useState } from "react";
import { teamList } from "@/lib/mock-data";
import { calculateTeamPosition } from "@/lib/simulation";
import { useLanguage } from "@/lib/i18n/LanguageContext";

type TeamRow = { id: string; variant: string; history: string[] };

export default function FacilitatorComparisonPage() {
  const { t, language } = useLanguage();
  const [rows, setRows] = useState<TeamRow[]>([]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const res = await fetch("/api/facilitator/teams?stage=4");
      const data = await res.json();
      if (cancelled) return;
      setRows((data.teams ?? []).map((team: { id: string; variant: string; history?: string[] }) => ({
        id: team.id,
        variant: team.variant,
        history: team.history ?? [],
      })));
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 p-4 text-slate-900 lg:p-8">
      <div className="mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9e1b2b]">{t("facilitatorComparison.label")}</p>
        <h1 className="mt-2 text-3xl font-bold text-[#0d2d4f]">{t("facilitatorComparison.title")}</h1>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-100 text-slate-700">
              <tr>
                <th className="px-3 py-3 font-semibold">{t("facilitatorComparison.colTeam")}</th>
                <th className="px-3 py-3 font-semibold">{t("facilitatorComparison.colVariant")}</th>
                <th className="px-3 py-3 font-semibold">{t("facilitatorComparison.colBaselineNetLoss")}</th>
                <th className="px-3 py-3 font-semibold">{t("facilitatorComparison.colDecisionAdjustments")}</th>
                <th className="px-3 py-3 font-semibold">{t("facilitatorComparison.colFinalNetLoss")}</th>
              </tr>
            </thead>
            <tbody>
              {(rows.length > 0 ? rows : teamList.map((team) => ({ id: team.id, variant: team.variant, history: [] as string[] }))).map((team) => {
                const baseline = calculateTeamPosition(team.id, 4, [], language);
                const final = calculateTeamPosition(team.id, 4, team.history, language);
                return (
                  <tr key={team.id} className="border-t border-slate-200">
                    <td className="px-3 py-3 font-semibold text-[#0d2d4f]">{team.id}</td>
                    <td className="px-3 py-3">{team.variant}</td>
                    <td className="px-3 py-3">{baseline.netLoss.toFixed(1)}m</td>
                    <td className="px-3 py-3">{team.history.length ? team.history.join(", ") : "-"}</td>
                    <td className="px-3 py-3">{final.netLoss.toFixed(1)}m</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
