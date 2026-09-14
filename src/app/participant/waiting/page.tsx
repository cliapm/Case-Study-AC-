import { getTeamById } from "@/lib/simulation";
import { getTeamSubmission } from "@/lib/kv";
import Link from "next/link";

export default async function WaitingScreenPage({ searchParams }: { searchParams?: Promise<{ team?: string }> }) {
  const params = await searchParams;
  const teamId = params?.team ?? "A1";
  const team = getTeamById(teamId);
  const stored = await getTeamSubmission(teamId, team.currentStage);

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900">
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9e1b2b]">Submission confirmed</p>
        <h1 className="mt-3 text-3xl font-bold text-[#0d2d4f]">Waiting for the facilitator to release the next stage</h1>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Team ID</p>
            <p className="mt-2 text-xl font-bold text-[#0d2d4f]">{team.id}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Current simulation progress</p>
            <p className="mt-2 text-xl font-bold text-[#0d2d4f]">Stage {stored?.stageNumber ?? team.currentStage} of 5</p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-700">
          <p className="font-medium text-slate-900">Submitted decision codes</p>
          <p className="mt-2">{stored?.selectedDecisionCodes?.join(", ") ?? "No submission found"}</p>
        </div>

        <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
          <p className="font-medium text-slate-900">Current position summary</p>
          <p className="mt-2">The facilitator will release the next stage after all team submissions are locked.</p>
        </div>
        {stored ? (
          <Link href={`/participant/current-position?team=${team.id}&codes=${stored.selectedDecisionCodes.join(",")}`} className="mt-6 inline-flex rounded-xl bg-[#0d2d4f] px-4 py-3 font-semibold text-white">View calculated position</Link>
        ) : null}
      </div>
    </main>
  );
}
