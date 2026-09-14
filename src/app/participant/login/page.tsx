"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const VARIANTS = ["A", "B", "C", "D"] as const;
const TEAM_CODES = VARIANTS.flatMap((variant) => Array.from({ length: 7 }, (_, i) => `${variant}${i + 1}`));

export default function ParticipantLoginPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  const handleEnter = () => {
    if (!selectedTeam) return;
    router.push(`/participant/case-overview?team=${selectedTeam}`);
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900">
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-8 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9e1b2b]">{t("brand.tag")}</p>
            <h1 className="mt-3 text-3xl font-bold text-[#0d2d4f]">{t("participantLogin.title")}</h1>
          </div>
          <div className="hidden rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-600 sm:block">{t("participantLogin.confidential")}</div>
        </div>

        <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-3xl bg-slate-50 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">{t("participantLogin.noticeLabel")}</p>
            <p className="mt-4 text-base leading-7 text-slate-700">
              {t("participantLogin.noticeText")}
            </p>
            <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-600">
              {t("participantLogin.noticeRule")}
            </div>
          </section>

          <section>
            <p className="mb-3 text-sm font-medium text-slate-700">{t("participantLogin.selectTeamLabel")}</p>
            <div className="space-y-4">
              {VARIANTS.map((variant) => (
                <div key={variant}>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">{t("participantLogin.variantLabel")} {variant}</p>
                  <div className="grid grid-cols-4 gap-2 sm:grid-cols-7 md:grid-cols-4">
                    {TEAM_CODES.filter((code) => code.startsWith(variant)).map((code) => (
                      <button
                        key={code}
                        type="button"
                        onClick={() => setSelectedTeam(code)}
                        className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                          selectedTeam === code
                            ? "border-[#9e1b2b] bg-[#9e1b2b] text-white"
                            : "border-slate-300 bg-slate-50 text-slate-700 hover:border-[#9e1b2b]"
                        }`}
                      >
                        {code}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleEnter}
              disabled={!selectedTeam}
              className="mt-6 w-full rounded-xl bg-[#9e1b2b] px-4 py-3 text-base font-semibold text-white transition hover:bg-[#7d1524] disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {t("participantLogin.enterButton")}
            </button>
          </section>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm font-medium text-[#0d2d4f] underline">{t("participantLogin.backHome")}</Link>
        </div>
      </div>
    </main>
  );
}
