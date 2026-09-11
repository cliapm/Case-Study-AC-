import { decisionCatalog, teamList, variantBaselines } from "@/lib/mock-data";
import { getRuleForDecision } from "@/lib/rules";
import { Team, TeamPosition, Variant } from "@/lib/types";

export type PositionSnapshot = {
  teamId: string;
  stageNumber: number;
  apExposure: number;
  pbExposure: number;
  accumulatedPremium: number;
  apPaid: number;
  pbPaid: number;
  costs: number;
  potentialRecovery: number;
  realisedRecovery: number;
  reserve: number;
  netLoss: number;
  knownEffects: string[];
};

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

export function calculateTeamPosition(teamId: string, stageNumber: number, selectedCodes: string[]): TeamPosition {
  const team = getTeamById(teamId);
  const baseline = variantBaselines[team.variant];

  const base: PositionSnapshot = {
    teamId,
    stageNumber,
    apExposure: 30,
    pbExposure: 58,
    accumulatedPremium: baseline.accumulatedPremium,
    apPaid: baseline.apPaid,
    pbPaid: baseline.pbPaid,
    costs: baseline.costs,
    potentialRecovery: baseline.recovery,
    realisedRecovery: 0,
    reserve: 0,
    netLoss: baseline.netLoss,
    knownEffects: [
      `${team.variant} baseline in place for the current case and legal structure.`,
    ],
  };

  let updated = { ...base };
  const effects: string[] = [];

  selectedCodes.forEach((code) => {
    const decision = getDecisionByCode(code);
    const rules = getRuleForDecision(code, team.variant);
    if (!decision) return;

    rules.forEach((rule) => {
      if (rule.targetMetric === "accumulatedPremium") {
        updated.accumulatedPremium += rule.adjustmentValue;
      }
      if (rule.targetMetric === "apPaid") {
        updated.apPaid += rule.adjustmentValue;
      }
      if (rule.targetMetric === "pbPaid") {
        updated.pbPaid += rule.adjustmentValue;
      }
      if (rule.targetMetric === "costs") {
        updated.costs += rule.adjustmentValue;
      }
      if (rule.targetMetric === "potentialRecovery") {
        updated.potentialRecovery += rule.adjustmentValue;
      }
      if (rule.targetMetric === "realisedRecovery") {
        updated.realisedRecovery += rule.adjustmentValue;
      }
      if (rule.targetMetric === "securedProtections") {
        updated.reserve += rule.adjustmentValue;
      }
      effects.push(`${decision.code}: ${rule.confidentialExplanation}`);
    });
  });

  updated.netLoss = Number((updated.apPaid + updated.pbPaid + updated.costs - updated.potentialRecovery - updated.accumulatedPremium).toFixed(3));
  updated.knownEffects = [
    ...effects.slice(0, 4),
    `Net loss for ${team.variant} after stage ${stageNumber}: USD ${updated.netLoss.toFixed(3)} million.`,
  ];

  const result: TeamPosition = {
    teamId,
    stageNumber,
    apExposure: Number(updated.apExposure.toFixed(3)),
    pbExposure: Number(updated.pbExposure.toFixed(3)),
    accumulatedPremium: Number(updated.accumulatedPremium.toFixed(3)),
    apPaid: Number(updated.apPaid.toFixed(3)),
    pbPaid: Number(updated.pbPaid.toFixed(3)),
    costs: Number(updated.costs.toFixed(3)),
    potentialRecovery: Number(updated.potentialRecovery.toFixed(3)),
    realisedRecovery: Number(updated.realisedRecovery.toFixed(3)),
    reserve: Number(updated.reserve.toFixed(3)),
    netLoss: Number(updated.netLoss.toFixed(3)),
    calculatedAt: new Date().toISOString(),
    knownEffects: updated.knownEffects,
  };

  return result;
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
