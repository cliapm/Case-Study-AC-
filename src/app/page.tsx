import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8 flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9e1b2b]">Project Agua Clara</p>
            <h1 className="mt-2 text-2xl font-bold text-slate-900">Integrated Underwriting, Claims and Recovery Simulation</h1>
          </div>
          <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700">Confidential training exercise</div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0d2d4f] text-lg font-bold text-white">AC</div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Live event access</p>
                <h2 className="text-3xl font-bold text-[#0d2d4f]">Participant Login</h2>
              </div>
            </div>

            <div className="grid gap-5 text-sm text-slate-700 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Case overview</p>
                <p className="mt-2 font-medium text-slate-800">Desalination plant in Peru</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Contract value</p>
                <p className="mt-2 font-medium text-slate-800">USD 600 million</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Original term</p>
                <p className="mt-2 font-medium text-slate-800">48 months</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">Bond values</p>
                <p className="mt-2 font-medium text-slate-800">AP 120m / PB 60m</p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5">
              <p className="text-sm font-medium text-slate-700">Access into this simulation is by team group code and access code only.</p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <Link href="/participant/login" className="inline-flex items-center justify-center rounded-xl bg-[#9e1b2b] px-5 py-3 font-semibold text-white transition hover:bg-[#7d1524]">Enter Simulation</Link>
                <Link href="/facilitator/login" className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100">Facilitator access</Link>
              </div>
            </div>
          </div>

          <aside className="rounded-3xl border border-slate-200 bg-[#0d2d4f] p-6 text-white shadow-sm sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9fe9de]">Case status</p>
            <h3 className="mt-4 text-2xl font-bold">Current release</h3>
            <p className="mt-2 text-sm text-slate-200">Stage 4 is open for participating teams, with live monitoring and decision lock management available to facilitators.</p>
            <ul className="mt-6 space-y-3 text-sm text-slate-100">
              <li>• 28 teams and 224 participants</li>
              <li>• 4 variants: A, B, C and D</li>
              <li>• 5 sequential stages</li>
              <li>• 3 decisions per stage</li>
            </ul>
          </aside>
        </section>
      </div>
    </main>
  );
}
