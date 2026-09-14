import { MetricCard } from "@/components/MetricCard";
import { calculateTeamPosition, getTeamById } from "@/lib/simulation";

export default async function CurrentPositionPage({ searchParams }: { searchParams?: Promise<{ team?: string; codes?: string }> }) {
  const params = await searchParams;
  const teamId = params?.team ?? "A1";
  const team = getTeamById(teamId);
  const selectedCodes = params?.codes?.split(",").filter(Boolean) ?? [];
  const position = calculateTeamPosition(teamId, team.currentStage, selectedCodes);

  const metrics = [
    { label: "Advance Payment Bond exposure", value: `${position.apExposure.toFixed(3)}m` },
    { label: "Performance Bond exposure", value: `${position.pbExposure.toFixed(3)}m` },
    { label: "Accumulated premium", value: `${position.accumulatedPremium.toFixed(3)}m` },
    { label: "AP payment", value: `${position.apPaid.toFixed(3)}m` },
    { label: "PB payment", value: `${position.pbPaid.toFixed(3)}m` },
    { label: "Costs", value: `${position.costs.toFixed(3)}m` },
    { label: "Secured protections", value: `${position.reserve.toFixed(3)}m` },
    { label: "Potential recoveries", value: `${position.potentialRecovery.toFixed(3)}m` },
    { label: "Realised recoveries", value: `${position.realisedRecovery.toFixed(3)}m` },
    { label: "Current reserve", value: `${Math.max(position.netLoss, 0).toFixed(3)}m` },
    { label: "Estimated net loss", value: `${position.netLoss.toFixed(3)}m` },
  ];

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9e1b2b]">Current position</p>
          <h1 className="mt-2 text-3xl font-bold text-[#0d2d4f]">Team {team.id} • Variant {team.variant}</h1>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} label={metric.label} value={metric.value} />
          ))}
        </section>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-bold text-[#0d2d4f]">Impact of Your Decisions</h2>
          <div className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
            <p className="font-medium text-slate-900">Applied decisions: {selectedCodes.length ? selectedCodes.join(", ") : "Baseline only"}</p>
            {position.knownEffects.map((effect) => <p key={effect}>{effect}</p>)}
            <p>The underwriting approach affects the amount of premium charged, the value of the contractual protections, and the recoverability of losses after claims arise.</p>
            <p>Bond wording, counter-indemnity structure, timing of intervention, controls and coordinated recovery all influence the final result.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
