"use client";

import { useMemo, useState } from "react";
import { getStageDecisions, getTeamById } from "@/lib/simulation";
import { saveSelectedDecisions } from "@/lib/team-store";

export default function CurrentStagePage({ searchParams }: { searchParams?: { team?: string } }) {
  const teamId = searchParams?.team ?? "A1";
  const team = getTeamById(teamId);
  const decisions = getStageDecisions(team.currentStage);
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedDetails = useMemo(
    () => decisions.filter((decision) => selectedCodes.includes(decision.code)),
    [decisions, selectedCodes],
  );

  const toggleDecision = (code: string) => {
    setSelectedCodes((current) => {
      if (current.includes(code)) return current.filter((item) => item !== code);
      if (current.length >= 3) return current;
      return [...current, code];
    });
  };

  const canSubmit = selectedCodes.length === 3;

  const handleConfirmSubmission = async () => {
    setIsSubmitting(true);
    try {
      await fetch("/api/submit-decision", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          teamId: team.id,
          stageNumber: team.currentStage,
          selectedDecisionCodes: selectedCodes,
        }),
      });
      saveSelectedDecisions(team.id, team.currentStage, selectedCodes);
      window.location.href = `/participant/waiting?team=${team.id}`;
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <header className="mb-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9e1b2b]">Current stage</p>
              <h1 className="mt-2 text-3xl font-bold text-[#0d2d4f]">Stage {team.currentStage}</h1>
            </div>
            <div className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">Open</div>
          </div>
        </header>

        <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">Stage status</p>
              <h2 className="mt-2 text-2xl font-bold text-[#0d2d4f]">Initial Underwriting</h2>
            </div>
            <div className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">{selectedCodes.length} of 3 selected</div>
          </div>

          <div className="mb-5 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
            <p className="font-medium text-slate-900">Relevant case development</p>
            <p className="mt-2">The project begins with mobilisation and initial underwriting controls. The team must decide how to structure the AP bond and project account risk protections.</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {decisions.map((decision) => {
              const isSelected = selectedCodes.includes(decision.code);
              return (
                <button
                  key={decision.code}
                  type="button"
                  onClick={() => toggleDecision(decision.code)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    isSelected ? "border-[#9e1b2b] bg-[#fff3f5] shadow-sm" : "border-slate-200 bg-slate-50 hover:border-[#0d2d4f] hover:bg-white"
                  }`}
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="rounded-full bg-[#0d2d4f] px-2 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-white">{decision.code}</span>
                    <span className="text-xs font-medium text-slate-500">{isSelected ? "Selected" : "Unselected"}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{decision.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-700">{decision.text}</p>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
            <div className="text-sm font-medium text-slate-700">Select exactly three decisions before submitting.</div>
            <div className="flex gap-3">
              <button type="button" className="rounded-xl border border-slate-300 bg-white px-4 py-3 font-semibold text-slate-700">Review Selections</button>
              <button
                type="button"
                onClick={() => setShowConfirm(true)}
                className="rounded-xl bg-[#9e1b2b] px-4 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
                disabled={!canSubmit}
              >
                Submit Final Decisions
              </button>
            </div>
          </div>
        </section>
      </div>

      {showConfirm ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9e1b2b]">Confirmation required</p>
            <h3 className="mt-3 text-2xl font-bold text-[#0d2d4f]">Final submission</h3>
            <p className="mt-3 text-sm leading-6 text-slate-700">Your selected decisions are final and cannot be changed after submission.</p>
            <ul className="mt-4 space-y-2 rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
              {selectedDetails.map((decision) => (
                <li key={decision.code}><span className="font-semibold text-[#0d2d4f]">{decision.code}</span> — {decision.title}</li>
              ))}
            </ul>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => setShowConfirm(false)} className="rounded-xl border border-slate-300 bg-white px-4 py-3 font-semibold text-slate-700">Cancel</button>
              <button
                type="button"
                onClick={handleConfirmSubmission}
                disabled={isSubmitting}
                className="rounded-xl bg-[#9e1b2b] px-4 py-3 text-center font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                {isSubmitting ? "Submitting..." : "Confirm submission"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
