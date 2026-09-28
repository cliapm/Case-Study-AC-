import { decisionCatalog, teamList, variantBaselines } from "@/lib/mock-data";
import { Team, TeamPosition, Variant } from "@/lib/types";
import { getLocalizedRuleExplanation } from "@/lib/i18n/content";
import { en } from "@/lib/i18n/en";
import { es } from "@/lib/i18n/es";
import { pt } from "@/lib/i18n/pt";
import type { Language } from "@/lib/i18n/LanguageContext";

const simulationText: Record<Language, typeof en.simulation> = { en: en.simulation, es: es.simulation, pt: pt.simulation };

export function getTeamById(teamId: string) {
  return teamList.find((team) => team.id === teamId) ?? teamList[0];
}

export function getStageDecisions(stageNumber: number) {
  return decisionCatalog.filter((decision) => decision.stageNumber === stageNumber).sort((a, b) => a.displayOrder - b.displayOrder);
}

export function getDecisionByCode(code: string) {
  return decisionCatalog.find((decision) => decision.code === code);
}

export function getVariantTeamSummary(variant: Variant) {
  return teamList.filter((team) => team.variant === variant);
}

const FINAL_STAGE_NUMBER = 4;

/**
 * Calculates a team's position given every decision it has selected across all
 * stages reached so far (selectedCodes is the cumulative history, not just the
 * latest stage's three codes) — several rules below are explicitly cross-stage
 * (e.g. T6 depends on whether R6 was picked in an earlier stage).
 *
 * Rule sourcing: every numeric effect here is derived from the confidential
 * calculation matrix and its notes. Two combination rules the matrix leaves
 * genuinely underspecified for arbitrary decision combinations (the C3 global
 * settlement split between AP/PB, and which enforcement code "unlocks" which
 * created collateral) reflect a best-faith reading — see the inline notes.
 */
// The Advance Payment Bond's full, unreduced face value (20% of the USD 600m contract).
// Stage 1's own "position returned" instruction says "AP and PB exposure maintained" —
// i.e. still the full bond amount. The amortised-down balance (baseline.apExposure/
// apPaidBase, USD 30m) is a fact the story only reveals from Stage 2 onward (USD 90m of
// the original 120m advance is amortised, leaving the 30m balance ERAP later claims).
const AP_BOND_FACE_VALUE = 120;

export function calculateTeamPosition(teamId: string, stageNumber: number, selectedCodes: string[], language: Language = "en"): TeamPosition {
  const team = getTeamById(teamId);
  const variant = team.variant;
  const baseline = variantBaselines[variant];
  const text = simulationText[language];
  const has = (code: string) => selectedCodes.includes(code);
  const isStageOne = stageNumber <= 1;

  // --- Costs ---
  let costs = baseline.costsBase;
  const u1 = has("U1");
  const u4 = has("U4");
  if (u1 && u4) {
    costs += 0.8; // combined cap: U1 + U4 together max out at +0.8 (not +1.0)
  } else if (u1 || u4) {
    costs += 0.5;
  }
  if (has("R4")) costs -= 0.4;
  const r6 = has("R6");
  if (r6) costs -= 0.2;
  if (has("T6") && !r6) costs -= 0.2; // T6's cost benefit is zeroed if R6 already gave it
  if (has("T5")) costs += 0.4;
  if (has("T3")) costs -= 0.5;
  const c2 = has("C2");
  if (c2) costs -= 1.0;
  const c3 = has("C3");
  if (c3) costs -= 0.5;
  if (has("C6")) costs += 0.8;

  // --- Premium ---
  let premium = baseline.premiumBase;
  if (has("U6")) premium *= 1.1;

  // --- Advance Payment Bond paid ---
  let apPaid = isStageOne ? AP_BOND_FACE_VALUE : baseline.apPaidBase;
  if (has("C1")) apPaid -= 4;
  if (c2) apPaid -= 4;
  if (has("T3") && !c2) apPaid -= 2; // T3's AP reduction only applies if C2 didn't already produce a larger one

  // --- Performance Bond paid ---
  // Variants B/C are first-demand/unconditional bonds: payable in full regardless of causation.
  // Only Variant A's conditional wording lets a causation defence (T1) reduce the payment.
  let pbPaid = variant === "A" && has("T1") ? 40 : baseline.pbPaidBase;

  // Global settlement (C3) reduces the net amount still payable, applied after the
  // bond-specific reductions above. Modelled here against the PB payment.
  if (c3) pbPaid -= 4;

  apPaid = Math.max(apPaid, 0);
  pbPaid = Math.max(pbPaid, 0);

  // --- Recovery ---
  // The counter-indemnity ceiling (43m for A/B, 8m for C) is a fact of the case narrative,
  // not something a decision "creates" — it becomes realised once the team reaches the
  // Claim and recovery stage. Two variant-specific bonus channels exist beyond the ceiling:
  // T5's cross-border corporate-asset potential (A/B, realised via C5) and, for Variant B
  // only, T1's additional potential when combined with C6.
  const isClaimStageOrLater = stageNumber >= FINAL_STAGE_NUMBER;
  let potentialRecovery = baseline.recoveryCap;
  let realisedRecovery = isClaimStageOrLater ? baseline.recoveryCap : 0;
  if (variant !== "C" && has("T5")) {
    potentialRecovery += 3;
    if (has("C5")) realisedRecovery += 3;
  }
  if (variant === "B" && has("T1")) {
    potentialRecovery += 2;
    if (has("C6")) realisedRecovery += 2;
  }

  // --- Secured protections ---
  // Collateral created by U5/R2/R5 is tracked here informationally. Per the master document's
  // non-duplication rule, it backs the same capped recovery above rather than adding to it.
  let reserve = 0;
  if (has("U5")) reserve += 15;
  if (has("R2")) reserve += 12;
  if (has("R5")) reserve += 10;

  const netLoss = Number((apPaid + pbPaid + costs - realisedRecovery - premium).toFixed(3));

  const effects = selectedCodes
    .filter((code) => getDecisionByCode(code))
    .map((code) => `${code}: ${getLocalizedRuleExplanation(code, language)}`);

  const knownEffects = [
    text.baselineNote.replace("{variant}", variant),
    ...effects.slice(0, 4),
    text.netLossNote.replace("{variant}", variant).replace("{stage}", String(stageNumber)).replace("{value}", netLoss.toFixed(1)),
  ];

  return {
    teamId,
    stageNumber,
    apExposure: Number((isStageOne ? AP_BOND_FACE_VALUE : baseline.apExposure).toFixed(3)),
    pbExposure: Number(baseline.pbExposure.toFixed(3)),
    accumulatedPremium: Number(premium.toFixed(3)),
    apPaid: Number(apPaid.toFixed(3)),
    pbPaid: Number(pbPaid.toFixed(3)),
    costs: Number(costs.toFixed(3)),
    potentialRecovery: Number(potentialRecovery.toFixed(3)),
    realisedRecovery: Number(realisedRecovery.toFixed(3)),
    reserve: Number(reserve.toFixed(3)),
    netLoss,
    calculatedAt: new Date().toISOString(),
    knownEffects,
  };
}

export function calculateStageSummary(teamId: string, selectedCodes: string[]) {
  const team = getTeamById(teamId);
  const stageNumber = team.currentStage;
  const result = calculateTeamPosition(teamId, stageNumber, selectedCodes);
  return {
    ...result,
    variant: team.variant,
  };
}
