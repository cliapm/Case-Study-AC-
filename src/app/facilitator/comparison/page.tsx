"use client";

import { teamList, variantBaselines } from "@/lib/mock-data";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function FacilitatorComparisonPage() {
  const { t } = useLanguage();
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
              {teamList.map((team) => (
                <tr key={team.id} className="border-t border-slate-200">
                  <td className="px-3 py-3 font-semibold text-[#0d2d4f]">{team.id}</td>
                  <td className="px-3 py-3">{team.variant}</td>
                  <td className="px-3 py-3">{variantBaselines[team.variant].netLoss.toFixed(3)}m</td>
                  <td className="px-3 py-3">U1, U2, U4</td>
                  <td className="px-3 py-3">{variantBaselines[team.variant].netLoss.toFixed(3)}m</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
