import { DecisionRule, Variant } from "@/lib/types";

export const decisionRules: DecisionRule[] = [
  { decisionCode: "U1", variant: "all", ruleType: "Create collateral", targetMetric: "securedProtections", adjustmentValue: 8, confidentialExplanation: "The dedicated project account creates a ring-fenced control and better evidentiary trail, strengthening the claim position." },
  { decisionCode: "U2", variant: "all", ruleType: "Preserve a recovery right", targetMetric: "potentialRecovery", adjustmentValue: 6.5, confidentialExplanation: "Quarterly reporting preserves the evidence needed to argue overpayment and advance payment reconciliation." },
  { decisionCode: "U3", variant: "all", ruleType: "Prevention of double counting", targetMetric: "apPaid", adjustmentValue: -4, confidentialExplanation: "Conditional reductions reduce the risk that the AP bond is overdrawn or that the claim is overstated." },
  { decisionCode: "U4", variant: "all", ruleType: "Add or subtract costs", targetMetric: "costs", adjustmentValue: 1.2, confidentialExplanation: "Independent technical review adds modest investigation cost but strengthens the evidence base." },
  { decisionCode: "U5", variant: "all", ruleType: "Create collateral", targetMetric: "securedProtections", adjustmentValue: 15, confidentialExplanation: "The guarantee provides direct collateral tied to the advance payment exposure and can be enforced as secured value." },
  { decisionCode: "U6", variant: "all", ruleType: "Add or subtract premium", targetMetric: "accumulatedPremium", adjustmentValue: 0.6125, confidentialExplanation: "The additional premium is charged at inception and is a direct cost of the underwriting structure." },

  { decisionCode: "A1", variant: "all", ruleType: "Add or subtract premium", targetMetric: "accumulatedPremium", adjustmentValue: 0.874, confidentialExplanation: "The extension premium increases materially as contract value and exposure grow." },
  { decisionCode: "A2", variant: "all", ruleType: "Create collateral", targetMetric: "securedProtections", adjustmentValue: 25, confidentialExplanation: "The equity contribution creates a direct cash support and strengthens the project account." },
  { decisionCode: "A3", variant: "all", ruleType: "Preserve a recovery right", targetMetric: "potentialRecovery", adjustmentValue: 25, confidentialExplanation: "Mediterranea direct indemnity preserves a valuable recovery claim against the JV member." },
  { decisionCode: "A4", variant: "all", ruleType: "Preserve a recovery right", targetMetric: "potentialRecovery", adjustmentValue: 5, confidentialExplanation: "Joint control reduces leakage and preserves the exploitable project asset pool." },
  { decisionCode: "A5", variant: "all", ruleType: "Add or subtract AP payment", targetMetric: "apPaid", adjustmentValue: -8, confidentialExplanation: "Blocking AP reductions holds the exposure until the reconciliation is proven and prevents premature settlement." },
  { decisionCode: "A6", variant: "all", ruleType: "Create collateral", targetMetric: "securedProtections", adjustmentValue: 13.2, confidentialExplanation: "A portion of the performance bond increase is coinsured and therefore shared across participants rather than fully borne by the insurer." },

  { decisionCode: "R1", variant: "all", ruleType: "Add or subtract costs", targetMetric: "costs", adjustmentValue: 1.8, confidentialExplanation: "The forensic audit creates a direct costs burden but improves evidential quality and reduces later disputes." },
  { decisionCode: "R2", variant: "all", ruleType: "Create collateral", targetMetric: "securedProtections", adjustmentValue: 12, confidentialExplanation: "Restoring an amount to the project account improves ring-fenced support and reduces recovery leakage." },
  { decisionCode: "R3", variant: "all", ruleType: "Preserve a recovery right", targetMetric: "potentialRecovery", adjustmentValue: 12, confidentialExplanation: "Reservation of rights preserves the insurer's legal claim position while disputes and counter-indemnities are evaluated." },
  { decisionCode: "R4", variant: "all", ruleType: "Add or subtract costs", targetMetric: "costs", adjustmentValue: 1.1, confidentialExplanation: "Technical monitoring creates professional costs but reduces uncertainty and improves claims preparation." },
  { decisionCode: "R5", variant: "all", ruleType: "Create collateral", targetMetric: "securedProtections", adjustmentValue: 10, confidentialExplanation: "Certified receivable assignment creates a tangible recovery asset that may later be enforced." },
  { decisionCode: "R6", variant: "all", ruleType: "Preserve a recovery right", targetMetric: "potentialRecovery", adjustmentValue: 9, confidentialExplanation: "A crisis committee improves coordination, preserves rights and aligns all parties in the claim and recovery process." },

  { decisionCode: "T1", variant: "all", ruleType: "Add or subtract costs", targetMetric: "costs", adjustmentValue: 1.3, confidentialExplanation: "A delay causation report creates legal and technical expense but materially strengthens the cover and termination analysis." },
  { decisionCode: "T2", variant: "all", ruleType: "Preserve a recovery right", targetMetric: "potentialRecovery", adjustmentValue: 7, confidentialExplanation: "Validating termination and bond wording preserves the basis for a viable claim or rights adjustment." },
  { decisionCode: "T3", variant: "all", ruleType: "Create collateral", targetMetric: "securedProtections", adjustmentValue: 15, confidentialExplanation: "Preserving financed equipment provides a tangible asset pool and improves recovery prospects." },
  { decisionCode: "T4", variant: "all", ruleType: "Enforce collateral", targetMetric: "realisedRecovery", adjustmentValue: 18, confidentialExplanation: "Immediate demands and rights notices can turn preserved rights into realised recovery if enforceable claims exist." },
  { decisionCode: "T5", variant: "all", ruleType: "Preserve a recovery right", targetMetric: "potentialRecovery", adjustmentValue: 8, confidentialExplanation: "Coordinating counsel improves support for claims across Peru, Spain and Italy and strengthens recoverability." },
  { decisionCode: "T6", variant: "all", ruleType: "Realise a previously created recovery", targetMetric: "realisedRecovery", adjustmentValue: 6, confidentialExplanation: "A unified reserve report supports faster settlement and more coherent recovery reporting." },

  { decisionCode: "C1", variant: "all", ruleType: "Add or subtract AP payment", targetMetric: "apPaid", adjustmentValue: -6.5, confidentialExplanation: "The final AP bond audit reduces claim value if unsupported balances are excluded." },
  { decisionCode: "C2", variant: "all", ruleType: "Prevention of double counting", targetMetric: "pbPaid", adjustmentValue: -10, confidentialExplanation: "Overlap review prevents double counting between the AP and PB claims and reduces overstated losses." },
  { decisionCode: "C3", variant: "all", ruleType: "Realise a previously created recovery", targetMetric: "realisedRecovery", adjustmentValue: 20, confidentialExplanation: "The global settlement resolves the dispute and produces a cleaner, faster recovery profile." },
  { decisionCode: "C4", variant: "all", ruleType: "Enforce collateral", targetMetric: "realisedRecovery", adjustmentValue: 22, confidentialExplanation: "Enforcing bank guarantees and assigned receivables realises value directly from secured assets." },
  { decisionCode: "C5", variant: "all", ruleType: "Enforce collateral", targetMetric: "realisedRecovery", adjustmentValue: 16, confidentialExplanation: "Direct enforcement against counter-indemnitors converts preserved rights into actual recoveries." },
  { decisionCode: "C6", variant: "all", ruleType: "Realise a previously created recovery", targetMetric: "realisedRecovery", adjustmentValue: 14, confidentialExplanation: "A coordinated strategy across jurisdictions improves the timing and value of recovery execution." },
];

export function getRuleForDecision(decisionCode: string, variant: Variant) {
  return decisionRules.filter((rule) => rule.decisionCode === decisionCode && (rule.variant === "all" || rule.variant === variant));
}

export function getDecisionTextByCode(code: string) {
  return decisionRules.find((rule) => rule.decisionCode === code)?.confidentialExplanation || "Confidential adjustment applied.";
}
