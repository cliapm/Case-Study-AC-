import { Decision, Stage, Team, Variant } from "@/lib/types";

export const variantLabels: Record<Variant, string> = {
  A: "Conditional documentary Advance Payment Bond / Conditional Performance Bond / joint and several unlimited counter-indemnities from all three JV members",
  B: "First-demand Advance Payment Bond / First-demand Performance Bond / joint and several unlimited counter-indemnities from all three JV members",
  C: "First-demand Advance Payment Bond / First-demand Performance Bond / counter-indemnity provided only by Iberagua",
};

export type VariantBaseline = {
  // Base counter-indemnity recovery realisable via C5, before R3's +3m bonus.
  recoveryCiBase: number;
  // Aggregate ceiling across every recovery channel combined (C4 + C5 + C6).
  recoveryCeiling: number;
};

// Per §8 "Economic effects by Code" (master document v7): Variants A and B share the
// same recovery structure (joint counter-indemnity from all three JV members); Variant C
// is capped much lower (Iberagua's direct obligation only).
export const variantBaselines: Record<Variant, VariantBaseline> = {
  A: { recoveryCiBase: 40, recoveryCeiling: 43 },
  B: { recoveryCiBase: 40, recoveryCeiling: 43 },
  C: { recoveryCiBase: 5, recoveryCeiling: 8 },
};

export const teamList: Team[] = Array.from({ length: 30 }, (_, index) => {
  const variants: Variant[] = ["A", "B", "C"];
  const variant = variants[Math.floor(index / 10)] as Variant;
  const teamNumber = (index % 10) + 1;
  const teamId = `${variant}${teamNumber}`;

  return {
    id: teamId,
    groupCode: `G-${variant}-${teamNumber}`,
    accessCodeHash: `mock-hash-${teamId}`,
    variant,
    currentStage: 1,
    createdAt: "2026-01-16T09:00:00.000Z",
  };
});

export const stages: Stage[] = [
  {
    number: 1,
    title: "Initial underwriting",
    caseDevelopment: "The general terms of the contract are already known. The advance payment and project account are set up, and groups may select three additional protections to increase their level of comfort with the underwriting.",
    status: "open",
    releasedAt: "2026-01-20T09:00:00.000Z",
  },
  {
    number: 2,
    title: "Red flags and project deterioration",
    caseDevelopment: "Month 31: physical progress reaches 50% against an expected 63%, financial progress runs ahead at 67%, and documentation for part of the remaining advance payment balance is incomplete.",
    status: "locked",
  },
  {
    number: 3,
    title: "Termination and pre-claim preparation",
    caseDevelopment: "Month 43: ERAP terminates the contract. Iberagua seeks court protection from creditors and the group prepares reserves, documentation, defence and recovery before formal demands are made.",
    status: "locked",
  },
  {
    number: 4,
    title: "Claim and recovery",
    caseDevelopment: "ERAP serves formal demands under the Advance Payment Bond and Performance Bond. The group finalises its position on limits, premium, protections, reserves and preserved rights.",
    status: "locked",
  },
];

export const decisionCatalog: Decision[] = [
  { code: "U1", stageNumber: 1, title: "Dedicated project account", text: "Set up a dedicated project account with dual authorisation.", immediateEffectText: "The advance payment may only be used through the controlled account.", displayOrder: 1 },
  { code: "U2", stageNumber: 1, title: "Quarterly reporting requirement", text: "Require documented quarterly reporting on use of the advance payment.", immediateEffectText: "The JV provides statements, invoices and quarterly reconciliations.", displayOrder: 2 },
  { code: "U3", stageNumber: 1, title: "Conditional bond reductions", text: "Make each AP Bond reduction conditional on evidence of amortisation and ERAP written confirmation.", immediateEffectText: "No reduction is recognised solely on JV-declared progress.", displayOrder: 3 },
  { code: "U4", stageNumber: 1, title: "Independent technical review", text: "Commission an independent technical review of budget and schedule.", immediateEffectText: "An independent adviser validates budget, contingency, procurement and critical path.", displayOrder: 4 },
  { code: "U5", stageNumber: 1, title: "Irrevocable bank guarantee", text: "Require a USD 15,000,000 irrevocable bank guarantee linked to the AP Bond.", immediateEffectText: "USD 15,000,000 is backed by bank security.", displayOrder: 5 },
  { code: "U6", stageNumber: 1, title: "Additional initial premium", text: "Charge an additional 10% initial premium.", immediateEffectText: "The initial premium increases by 10%, from USD 6,960,000 to USD 7,656,000.", displayOrder: 6 },

  { code: "R1", stageNumber: 2, title: "Forensic audit", text: "Commission a forensic audit of USD 30,000,000 with incomplete documentation.", immediateEffectText: "The destination of the funds is investigated and documented.", displayOrder: 1 },
  { code: "R2", stageNumber: 2, title: "Blocked account deposit", text: "Require Iberagua to deposit USD 12,000,000 into a blocked account pledged to the insurer.", immediateEffectText: "The funds remain segregated and may be enforced through C4 if a covered payment is made.", displayOrder: 2 },
  { code: "R3", stageNumber: 2, title: "Reservation of rights", text: "Issue a formal reservation-of-rights notice to all three members.", immediateEffectText: "Rights are preserved before insolvency.", displayOrder: 3 },
  { code: "R4", stageNumber: 2, title: "Independent monthly technical monitor", text: "Appoint an independent monthly technical monitor.", immediateEffectText: "The insurer receives monthly progress and completion-cost reports.", displayOrder: 4 },
  { code: "R5", stageNumber: 2, title: "Assigned receivables", text: "Obtain an assignment of USD 10,000,000 certified receivables.", immediateEffectText: "JV receivables from ERAP are assigned to the insurer.", displayOrder: 5 },
  { code: "R6", stageNumber: 2, title: "Crisis committee", text: "Create a formal crisis committee involving the insurer's underwriting, claims, recovery, legal and technical teams, together with relevant reinsurers.", immediateEffectText: "Information, reserves and strategy are shared monthly.", displayOrder: 6 },

  { code: "T1", stageNumber: 3, title: "Delay causation report", text: "Commission an independent delay-causation report.", immediateEffectText: "The report attributes 34% to ERAP, 45% to Iberagua and 21% to Andina.", displayOrder: 1 },
  { code: "T2", stageNumber: 3, title: "Termination validity review", text: "Obtain legal advice on termination validity and bond wording.", immediateEffectText: "The defence is structured according to the variant.", displayOrder: 2 },
  { code: "T3", stageNumber: 3, title: "Preserve equipment inventory", text: "Inventory and preserve equipment financed by the advance payment.", immediateEffectText: "Reusable equipment is identified and protected.", displayOrder: 3 },
  { code: "T4", stageNumber: 3, title: "Rights and counter-indemnity demands", text: "Issue reservations of rights and immediate demands under counter-indemnities.", immediateEffectText: "Demands are filed before further judicial restrictions.", displayOrder: 4 },
  { code: "T5", stageNumber: 3, title: "Coordinating counsel", text: "Appoint coordinating counsel in Peru, Spain and Italy.", immediateEffectText: "The legal strategy is centralised.", displayOrder: 5 },
  { code: "T6", stageNumber: 3, title: "Consolidated reserve report", text: "Notify reinsurers using a single consolidated reserve report.", immediateEffectText: "All markets receive the same information and calculation basis.", displayOrder: 6 },

  { code: "C1", stageNumber: 4, title: "Final AP bond audit", text: "Perform a final audit of the AP Bond balance.", immediateEffectText: "The amount due is reconciled against amortisation and reusable equipment.", displayOrder: 1 },
  { code: "C2", stageNumber: 4, title: "Overlap review", text: "Perform an overlap review between the AP Bond and Performance Bond.", immediateEffectText: "Duplicate amounts are removed before payment.", displayOrder: 2 },
  { code: "C3", stageNumber: 4, title: "Global settlement", text: "Negotiate a global settlement with ERAP, including release and assignment of rights.", immediateEffectText: "Both demands are resolved through one global settlement.", displayOrder: 3 },
  { code: "C4", stageNumber: 4, title: "Bank guarantee enforcement", text: "Enforce bank guarantees and assigned receivables.", immediateEffectText: "Previously obtained collateral is converted into cash.", displayOrder: 4 },
  { code: "C5", stageNumber: 4, title: "Counter-indemnity enforcement", text: "Enforce direct obligations against available counter-indemnitors.", immediateEffectText: "Recovery starts against all accessible obligors.", displayOrder: 5 },
  { code: "C6", stageNumber: 4, title: "Coordinated recovery", text: "Implement a coordinated recovery strategy in all three jurisdictions.", immediateEffectText: "One enforcement plan is adopted.", displayOrder: 6 },
];
