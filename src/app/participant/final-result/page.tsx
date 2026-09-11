import { MetricCard } from "@/components/MetricCard";
import { calculateTeamPosition, getTeamById } from "@/lib/simulation";

export default function FinalResultPage({ searchParams }: { searchParams?: { team?: string; codes?: string } }) {
  const teamId = searchParams?.team ?? "A1";
  const team = getTeamById(teamId);
  const selectedCodes = searchParams?.codes?.split(",").filter(Boolean) ?? [];
  const result = calculateTeamPosition(teamId, 5, selectedCodes);

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 text-slate-900">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9e1b2b]">Final result</p>
          <h1 className="mt-2 text-3xl font-bold text-[#0d2d4f]">Team {team.id} • Variant {team.variant}</h1>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          {[
            { label: "Final AP payment", value: `${result.apPaid.toFixed(3)}m` },
            { label: "Final PB payment", value: `${result.pbPaid.toFixed(3)}m` },
            { label: "Total costs", value: `${result.costs.toFixed(3)}m` },
            { label: "Accumulated premium", value: `${result.accumulatedPremium.toFixed(3)}m` },
            { label: "Total recovery", value: `${(result.potentialRecovery + result.realisedRecovery).toFixed(3)}m` },
            { label: "Final net loss", value: `${result.netLoss.toFixed(3)}m` },
          ].map((item) => (
            <MetricCard key={item.label} label={item.label} value={item.value} />
          ))}
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-2xl font-bold text-[#0d2d4f]">Outcome summary</h2>
          <p className="mt-4 text-sm font-medium text-slate-900">Applied decisions: {selectedCodes.length ? selectedCodes.join(", ") : "Baseline only"}</p>
          <p className="mt-4 text-sm leading-7 text-slate-700">
            The final outcome reflects the bond wording, counter-indemnity structure, timing of intervention, underwriting controls, claims preparation and recovery enforcement. These factors determine whether the team limits claim value, creates protection, and realises recoveries.
          </p>
        </section>
      </div>
    </main>
  );
}
