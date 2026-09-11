import Link from "next/link";
import { teamList, variantBaselines } from "@/lib/mock-data";

export default function FacilitatorDashboardPage() {
  const teams = teamList;

  return (
    <main className="min-h-screen bg-slate-100 p-4 text-slate-900 lg:p-6">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9e1b2b]">Facilitator control</p>
            <h1 className="mt-2 text-3xl font-bold text-[#0d2d4f]">Project Agua Clara Dashboard</h1>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-xl border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700">Refresh</button>
            <button className="rounded-xl bg-[#9e1b2b] px-4 py-2 font-semibold text-white">Release Stage</button>
            <Link href="/facilitator/comparison" className="rounded-xl border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700">Comparison screen</Link>
            <a href="/api/facilitator/export-csv" className="rounded-xl bg-[#0d2d4f] px-4 py-2 font-semibold text-white">Export CSV</a>
          </div>
        </header>

        <section className="mb-6 grid gap-4 md:grid-cols-4">
          {[
            { label: "Current released stage", value: "4" },
            { label: "Teams submitted", value: "27 of 28" },
            { label: "Teams waiting", value: "1" },
            { label: "Status", value: "Live" },
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">{item.label}</p>
              <p className="mt-3 text-2xl font-bold text-[#0d2d4f]">{item.value}</p>
            </div>
          ))}
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-4 flex flex-wrap gap-3">
            <select className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700">
              <option>All variants</option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
              <option>D</option>
            </select>
            <select className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700">
              <option>All stages</option>
              <option>Stage 1</option>
              <option>Stage 2</option>
              <option>Stage 3</option>
              <option>Stage 4</option>
              <option>Stage 5</option>
            </select>
            <select className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700">
              <option>Submitted</option>
              <option>Waiting</option>
            </select>
            <input className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700" placeholder="Search team ID" />
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-700">
                <tr>
                  <th className="px-3 py-3 font-semibold">Team</th>
                  <th className="px-3 py-3 font-semibold">Variant</th>
                  <th className="px-3 py-3 font-semibold">Stage</th>
                  <th className="px-3 py-3 font-semibold">Status</th>
                  <th className="px-3 py-3 font-semibold">Submitted</th>
                  <th className="px-3 py-3 font-semibold">Decision codes</th>
                  <th className="px-3 py-3 font-semibold">Premium</th>
                  <th className="px-3 py-3 font-semibold">Recovery</th>
                  <th className="px-3 py-3 font-semibold">Reserve</th>
                  <th className="px-3 py-3 font-semibold">Net loss</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((team) => (
                  <tr key={team.id} className="border-t border-slate-200">
                    <td className="px-3 py-3 font-semibold text-[#0d2d4f]">{team.id}</td>
                    <td className="px-3 py-3">{team.variant}</td>
                    <td className="px-3 py-3">{team.currentStage}</td>
                    <td className="px-3 py-3"><span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-700">Submitted</span></td>
                    <td className="px-3 py-3">{new Date(team.createdAt).toLocaleString()}</td>
                    <td className="px-3 py-3">U1, U2, U3</td>
                    <td className="px-3 py-3">{variantBaselines[team.variant].accumulatedPremium.toFixed(3)}m</td>
                    <td className="px-3 py-3">{variantBaselines[team.variant].recovery.toFixed(3)}m</td>
                    <td className="px-3 py-3">0.000m</td>
                    <td className="px-3 py-3">{variantBaselines[team.variant].netLoss.toFixed(3)}m</td>
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
