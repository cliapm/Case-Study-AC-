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
// The Advance Payment Bond's full, unreduced face value (20% of the USD 600m contract).
// Stage 1's own "position returned" instruction says "AP and PB exposure maintained" —
// still the full bond amount. The amortised-down balance below is a fact the story only
// reveals from Stage 2 onward.
const AP_BOND_FACE_VALUE = 120;
// Outstanding unamortised balance from Stage 2 onward: USD 90m of the original 120m
// advance is formally amortised, leaving 30m — the figure ERAP later claims.
const AP_CLAIM_BALANCE = 30;
const PB_BOND_LIMIT = 60;
const PREMIUM_BASE = 6.96;

/**
 * Calculates a team's position given every decision it has selected across all
 * stages reached so far (selectedCodes is the cumulative history, not just the
 * latest stage's three codes) — several rules are explicitly cross-stage (e.g.
 * T6 depends on whether R6 was picked in an earlier stage, and whether the
 * recovery ceiling is reached at all depends on Stage 4 codes acting on
 * protections created back in Stage 1/2/3).
 *
 * Rewritten against master document v7, §8 "Economic effects by Code", which
 * replaced v6's flat confidential matrix with an explicit per-code rule set and
 * corrected several signs the facilitator flagged after testing v6's build:
 *  - There is no longer a per-variant starting "costs" figure — costs start at
 *    zero and only ever increase (no decision reduces costs).
 *  - R4, R6 and T6 are cost increases, not reductions (v6 had these backwards).
 *  - C1/C2's AP Bond reduction and T3's AP Bond reduction only apply to Variant
 *    A (its bond is conditional/documentary); Variants B/C are first-demand and
 *    must pay in full regardless of audit findings or equipment preservation.
 *  - Recovery is no longer an automatic narrative fact at the claim stage — it
 *    is built from three separate pools (collateral via U5/R2/R5, the
 *    counter-indemnity base +R3 bonus, and the T5/T1 bonus channels), each of
 *    which only converts from "potential" to "realised" if its specific
 *    enforcement code (C4, C5, C6 respectively) is picked, and the whole total
 *    is capped both by the variant's aggregate recovery ceiling and by the
 *    amount actually paid out under the two bonds.
 *
 * One combination the document still leaves unquantified for arbitrary
 * decision paths: C3's settlement reduction is stated to apply "first to the
 * Performance Bond payment and only thereafter to the Advance Payment Bond
 * payment," but no magnitude is restated in v7 (v6 gave USD 4,000,000). The
 * 4m figure and the PB-first/AP-spillover ordering below reflect that — flag
 * to the document's author if the magnitude has changed.
 */
export function calculateTeamPosition(teamId: string, stageNumber: number, selectedCodes: string[], language: Language = "en"): TeamPosition {
  const team = getTeamById(teamId);
  const variant = team.variant;
  const baseline = variantBaselines[variant];
  const text = simulationText[language];
  const has = (code: string) => selectedCodes.includes(code);
  const isStageOne = stageNumber <= 1;
  const isClaimStageOrLater = stageNumber >= FINAL_STAGE_NUMBER;

  // --- Costs: every decision that carries a cost adds to a zero baseline; nothing reduces costs. ---
  let costs = 0;
  const u1 = has("U1");
  const u4 = has("U4");
  if (u1 && u4) {
    costs += 0.8; // combined cap: U1 + U4 together max out at +0.8 (not +1.0)
  } else if (u1 || u4) {
    costs += 0.5;
  }
  if (has("R4")) costs += 0.4;
  const r6 = has("R6");
  if (r6) costs += 0.2;
  if (has("T6") && !r6) costs += 0.2; // T6's coordination cost isn't duplicated if R6 already paid for it
  if (has("T5")) costs += 0.4;
  if (has("C6")) costs += 0.8;

  // --- Premium ---
  let premium = PREMIUM_BASE;
  if (has("U6")) premium *= 1.1;

  // --- Advance Payment Bond / Performance Bond paid ---
  // ERAP only serves formal demands at the Claim and recovery stage. Before that,
  // nothing has actually been paid under either bond — apExposure/pbExposure
  // (returned separately) represent what's at stake, not money that has moved.
  const c2 = has("C2");
  let apPaidIfClaimed = isStageOne ? AP_BOND_FACE_VALUE : AP_CLAIM_BALANCE;
  if (variant === "A") {
    // Only Variant A's conditional/documentary AP Bond lets an audit or preserved
    // equipment reduce the amount owed. Variants B/C are first-demand: paid in full.
    if (has("C1")) apPaidIfClaimed -= 4;
    if (c2) apPaidIfClaimed -= 4;
    if (has("T3") && !c2) apPaidIfClaimed -= 2; // T3's reduction doesn't stack with C2's larger one
  }
  apPaidIfClaimed = Math.max(apPaidIfClaimed, 0);

  // Only Variant A's conditional Performance Bond lets a causation defence (T1)
  // reduce the payment (60m -> 39.6m, the 66% JV-attributable share). Variants B/C
  // are first-demand/unconditional: payable in full regardless of causation.
  let pbPaidIfClaimed = variant === "A" && has("T1") ? 39.6 : PB_BOND_LIMIT;

  // Global settlement (C3) applies first to the Performance Bond, then spills any
  // remainder onto the Advance Payment Bond.
  if (has("C3")) {
    const pbReduction = Math.min(4, pbPaidIfClaimed);
    pbPaidIfClaimed -= pbReduction;
    const remainder = 4 - pbReduction;
    if (remainder > 0) apPaidIfClaimed = Math.max(apPaidIfClaimed - remainder, 0);
  }
  pbPaidIfClaimed = Math.max(pbPaidIfClaimed, 0);

  const apPaid = isClaimStageOrLater ? apPaidIfClaimed : 0;
  const pbPaid = isClaimStageOrLater ? pbPaidIfClaimed : 0;

  // --- Recovery ---
  // Three separate potential pools, each requiring its own enforcement code to convert
  // into realised recovery:
  //  - collateral (U5 + R2 + R5, up to 37m combined) -> realised via C4. Zero for
  //    Variant C, whose bond structure gives no enforceable recovery through these.
  //  - counter-indemnity (40m base for A/B, 5m for C; +3m if R3 was selected) -> C5.
  //  - bonus (T5's 3m for A/B, T1's 2m for B only) -> C6.
  // The combined total is capped both by the variant's aggregate recovery ceiling and
  // by the amount actually paid out under the two bonds.
  let collateralPotential = 0;
  if (variant !== "C") {
    if (has("U5")) collateralPotential += 15;
    if (has("R2")) collateralPotential += 12;
    if (has("R5")) collateralPotential += 10;
  }
  const counterIndemnityPotential = baseline.recoveryCiBase + (has("R3") ? 3 : 0);
  const t5Potential = variant !== "C" && has("T5") ? 3 : 0;
  const t1BonusPotential = variant === "B" && has("T1") ? 2 : 0;

  const potentialRecovery = Math.min(
    collateralPotential + counterIndemnityPotential + t5Potential + t1BonusPotential,
    baseline.recoveryCeiling,
  );

  let realisedRecovery = 0;
  if (has("C4")) realisedRecovery += collateralPotential;
  if (has("C5")) realisedRecovery += counterIndemnityPotential;
  if (has("C6")) realisedRecovery += t5Potential + t1BonusPotential;
  realisedRecovery = Math.min(realisedRecovery, baseline.recoveryCeiling, apPaid + pbPaid);

  // --- Secured protections: collateral created so far, before it's realised into cash. ---
  const reserve = collateralPotential;

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
    apExposure: Number((isStageOne ? AP_BOND_FACE_VALUE : AP_CLAIM_BALANCE).toFixed(3)),
    pbExposure: Number(PB_BOND_LIMIT.toFixed(3)),
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
