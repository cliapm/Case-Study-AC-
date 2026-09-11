"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const TEAM_CODES = ["A1","A2","A3","A4","A5","A6","A7","B1","B2","B3","B4","B5","B6","B7","C1","C2","C3","C4","C5","C6","C7","D1","D2","D3","D4","D5","D6","D7"];

export default function ParticipantLoginPage() {
  const router = useRouter();
  const [groupId, setGroupId] = useState("A1");
  const [accessCode, setAccessCode] = useState("agua123");
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedTeamId = groupId.trim().toUpperCase();
    if (!TEAM_CODES.includes(normalizedTeamId)) {
      setError("Please enter a valid team ID.");
      return;
    }
    if (!accessCode.trim()) {
      setError("Please enter the team access code.");
      return;
    }
    setGroupId(normalizedTeamId);
    router.push(`/participant/case-overview?team=${normalizedTeamId}`);
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900">
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-8 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9e1b2b]">Project Agua Clara</p>
            <h1 className="mt-3 text-3xl font-bold text-[#0d2d4f]">Integrated Underwriting, Claims and Recovery Simulation</h1>
          </div>
          <div className="hidden rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-600 sm:block">Confidential</div>
        </div>

        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-3xl bg-slate-50 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">Training exercise notice</p>
            <p className="mt-4 text-base leading-7 text-slate-700">
              This simulation reflects a confidential underwriting, claims and recovery exercise. Team access is restricted to the assigned group and its own decisions.
            </p>
            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-600">
              Teams must submit exactly three decisions per stage and remain within the released stage timeline.
            </div>
          </section>

          <section>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="group-id" className="mb-2 block text-sm font-medium text-slate-700">Group ID</label>
                <input id="group-id" value={groupId} onChange={(event) => setGroupId(event.target.value.toUpperCase())} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-3 text-slate-900 focus:border-[#0d2d4f]" placeholder="A1" />
              </div>
              <div>
                <label htmlFor="access-code" className="mb-2 block text-sm font-medium text-slate-700">Unique access code</label>
                <input id="access-code" type="password" value={accessCode} onChange={(event) => setAccessCode(event.target.value)} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-3 text-slate-900 focus:border-[#0d2d4f]" placeholder="Enter access code" />
              </div>

              {error ? <p className="text-sm font-medium text-[#9e1b2b]">{error}</p> : null}

              <button type="submit" className="w-full rounded-xl bg-[#9e1b2b] px-4 py-3 text-base font-semibold text-white hover:bg-[#7d1524]">Enter Simulation</button>
            </form>
          </section>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm font-medium text-[#0d2d4f] underline">Return to home</Link>
        </div>
      </div>
    </main>
  );
}
