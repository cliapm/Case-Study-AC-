export type Variant = "A" | "B" | "C" | "D";

export type Team = {
  id: string;
  groupCode: string;
  accessCodeHash: string;
  variant: Variant;
  currentStage: number;
  createdAt: string;
};

export type Decision = {
  code: string;
  stageNumber: number;
  title: string;
  text: string;
  immediateEffectText: string;
  displayOrder: number;
};

export type Stage = {
  number: number;
  title: string;
  caseDevelopment: string;
  status: "locked" | "open" | "closed";
  releasedAt?: string;
  closedAt?: string;
};

export type DecisionRule = {
  decisionCode: string;
  variant: Variant | "all";
  ruleType: string;
  targetMetric: string;
  adjustmentValue: number;
  dependencyCode?: string;
  enforcementCode?: string;
  stackingGroup?: string;
  stackingCap?: number;
  confidentialExplanation: string;
};

export type SubmittedDecision = {
  teamId: string;
  stageNumber: number;
  selectedDecisionCodes: string[];
  submittedAt: string;
  isLocked: boolean;
};

export type TeamPosition = {
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
  calculatedAt: string;
  knownEffects: string[];
};

export type ProtectionRecord = {
  id: string;
  teamId: string;
  protectionCode: string;
  protectionType: string;
  createdByDecision: string | null;
  preservedByDecision: string | null;
  enforcedByDecision: string | null;
  potentialValue: number;
  realisedValue: number;
  status: "created" | "preserved" | "enforced" | "expired";
};

export type AuditEntry = {
  teamId: string;
  stageNumber: number;
  decisionCode: string;
  metric: string;
  previousValue: number;
  adjustment: number;
  updatedValue: number;
  calculationReason: string;
  createdAt: string;
};
