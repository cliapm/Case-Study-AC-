import { Decision, Stage, Team, Variant } from "@/lib/types";

export const variantLabels: Record<Variant, string> = {
  A: "Documentary conditional AP bond / conditional PB / unlimited joint indemnity",
  B: "On-demand AP bond / on-demand PB / unlimited joint indemnity",
  C: "On-demand AP bond / on-demand PB / Iberagua only counter-indemnity",
  D: "On-demand AP bond / on-demand PB / 55/25/20 coinsurance + proportional indemnity",
};

export const variantBaselines: Record<
  Variant,
  { apPaid: number; pbPaid: number; costs: number; recovery: number; accumulatedPremium: number; netLoss: number }
> = {
  A: { apPaid: 22, pbPaid: 40, costs: 6.2, recovery: 43, accumulatedPremium: 8.158, netLoss: 17.042 },
  B: { apPaid: 30, pbPaid: 58, costs: 3, recovery: 43, accumulatedPremium: 9.27, netLoss: 38.73 },
  C: { apPaid: 30, pbPaid: 58, costs: 3.8, recovery: 8, accumulatedPremium: 10.012, netLoss: 73.788 },
  D: { apPaid: 30, pbPaid: 58, costs: 5.2, recovery: 39, accumulatedPremium: 8.9, netLoss: 45.3 },
};

export const teamList: Team[] = Array.from({ length: 28 }, (_, index) => {
  const variants: Variant[] = ["A", "B", "C", "D"];
  const variant = variants[Math.floor(index / 7)] as Variant;
  const teamNumber = index % 7 + 1;
  const teamId = `${variant}${teamNumber}`;

  return {
    id: teamId,
    groupCode: `G-${variant}-${teamNumber}`,
    accessCodeHash: `mock-hash-${teamId}`,
    variant,
    currentStage: 1,
    createdAt: "2025-01-16T09:00:00.000Z",
  };
});

export const stages: Stage[] = [
  {
    number: 1,
    title: "Initial Underwriting",
    caseDevelopment: "Project mobilisation in Peru begins with the advance payment and project account setup.",
    status: "closed",
    releasedAt: "2025-02-01T09:00:00.000Z",
    closedAt: "2025-02-04T18:00:00.000Z",
  },
  {
    number: 2,
    title: "Contract Amendment",
    caseDevelopment: "Month 16: contract value rises to USD 660m and the bid margin compresses to 7.1%.",
    status: "closed",
    releasedAt: "2025-02-07T09:00:00.000Z",
    closedAt: "2025-02-12T18:00:00.000Z",
  },
  {
    number: 3,
    title: "Red Flags and Deterioration",
    caseDevelopment: "Month 31: physical progress 50%, financial progress 67%, and documentation gaps emerge.",
    status: "closed",
    releasedAt: "2025-02-14T09:00:00.000Z",
    closedAt: "2025-02-20T18:00:00.000Z",
  },
  {
    number: 4,
    title: "Termination and Pre-Claim Preparation",
    caseDevelopment: "Month 43: termination occurs, Iberagua enters court protection, and completion cost rises.",
    status: "open",
    releasedAt: "2025-02-21T09:00:00.000Z",
  },
  {
    number: 5,
    title: "Claim and Recovery",
    caseDevelopment: "Advance payment and performance bond claims are triggered with equipment overlap risk.",
    status: "locked",
  },
];

export const decisionCatalog: Decision[] = [
  { code: "U1", stageNumber: 1, title: "Dedicated project account", text: "Set up a dedicated project account with dual authorisation for disbursements, transfers and reconciliations.", immediateEffectText: "A dedicated project account is established and controls increase immediately.", displayOrder: 1 },
  { code: "U2", stageNumber: 1, title: "Quarterly reporting requirement", text: "Require documented quarterly reporting on use of the advance payment and associated sources and applications of funds.", immediateEffectText: "Reporting obligations strengthen the evidential trail for bond and recovery reviews.", displayOrder: 2 },
  { code: "U3", stageNumber: 1, title: "Conditional bond reductions", text: "Make every advance payment bond reduction conditional on evidence of amortisation and ERAP written confirmation.", immediateEffectText: "The bond reduction process becomes more controlled and less exposed to uncontrolled release.", displayOrder: 3 },
  { code: "U4", stageNumber: 1, title: "Independent technical review", text: "Commission an independent technical review of budget and schedule before approving major changes.", immediateEffectText: "Technical risk and delay analysis improve early underwriting discipline.", displayOrder: 4 },
  { code: "U5", stageNumber: 1, title: "Irrevocable bank guarantee", text: "Require a USD 15 million irrevocable bank guarantee linked to the Advance Payment Bond.", immediateEffectText: "Additional collateral is created to support the advance payment exposure.", displayOrder: 5 },
  { code: "U6", stageNumber: 1, title: "Additional initial premium", text: "Charge an additional 10% initial premium to reflect increased underwriting and monitoring risk.", immediateEffectText: "The premium base increases at inception to reflect the risk profile.", displayOrder: 6 },

  { code: "A1", stageNumber: 2, title: "Increase extension premium", text: "Increase the extension premium by 15% to reflect the changed risk and amended schedule.", immediateEffectText: "The portfolio premium rises with the extension and increased exposure.", displayOrder: 1 },
  { code: "A2", stageNumber: 2, title: "Equity contribution", text: "Require a USD 25 million equity contribution into the project account.", immediateEffectText: "A material project account support measure is introduced.", displayOrder: 2 },
  { code: "A3", stageNumber: 2, title: "Direct Mediterranea counter-indemnity", text: "Require a direct Mediterranea counter-indemnity capped at USD 25 million.", immediateEffectText: "A direct claim right is preserved against the JV member with direct responsibility.", displayOrder: 3 },
  { code: "A4", stageNumber: 2, title: "Joint control over disbursements", text: "Set up joint control over new disbursements and intercompany transfers to limit leakage.", immediateEffectText: "Controls are tightened over project cash movements and related-party transfers.", displayOrder: 4 },
  { code: "A5", stageNumber: 2, title: "Block bond reductions", text: "Block further Advance Payment Bond reductions until the advance payment is fully reconciled.", immediateEffectText: "The AP exposure is preserved until there is clear support for each reduction.", displayOrder: 5 },
  { code: "A6", stageNumber: 2, title: "Performance bond coinsurance", text: "Place 20% of the Performance Bond increase in coinsurance.", immediateEffectText: "Part of the increased bond exposure is shared with coinsurers.", displayOrder: 6 },

  { code: "R1", stageNumber: 3, title: "Forensic audit", text: "Commission a forensic audit of the USD 30 million with incomplete supporting documentation.", immediateEffectText: "A detailed documentation and control review is launched to support recovery and reserve discipline.", displayOrder: 1 },
  { code: "R2", stageNumber: 3, title: "Restore project account", text: "Require USD 12 million to be restored to the project account.", immediateEffectText: "Cash is restored into the controlled account and ring-fenced for claims support.", displayOrder: 2 },
  { code: "R3", stageNumber: 3, title: "Reservation of rights", text: "Issue a formal reservation-of-rights notice to all three joint venture members.", immediateEffectText: "The insurer preserves rights against the joint venture members and their indemnity obligations.", displayOrder: 3 },
  { code: "R4", stageNumber: 3, title: "Independent monthly technical monitor", text: "Appoint an independent monthly technical monitor to review the project and progress claims.", immediateEffectText: "The project is monitored by an independent technical expert for critical months.", displayOrder: 4 },
  { code: "R5", stageNumber: 3, title: "Assigned receivables", text: "Obtain an assignment of USD 10 million of certified receivables.", immediateEffectText: "A recoverable receivables protection is created and can later be enforced.", displayOrder: 5 },
  { code: "R6", stageNumber: 3, title: "Crisis committee", text: "Create a formal crisis committee with the insurer, reinsurers, and coinsurers.", immediateEffectText: "The team implements a coordinated response structure across all interested parties.", displayOrder: 6 },

  { code: "T1", stageNumber: 4, title: "Delay causation report", text: "Commission an independent delay-causation report to support the termination analysis.", immediateEffectText: "The causal narrative and delay evidence are strengthened for the claim and recovery position.", displayOrder: 1 },
  { code: "T2", stageNumber: 4, title: "Termination validity review", text: "Obtain legal advice on termination validity and bond wording to test the bond and claim arguments.", immediateEffectText: "The legal position on the termination and bond wording is clarified.", displayOrder: 2 },
  { code: "T3", stageNumber: 4, title: "Preserve equipment inventory", text: "Inventory and preserve equipment financed by the advance payment.", immediateEffectText: "Equipment financed by the advance payment is identified and preserved for use in recovery.", displayOrder: 3 },
  { code: "T4", stageNumber: 4, title: "Rights and counter-indemnity demands", text: "Issue reservations of rights and immediate demands under available counter-indemnities.", immediateEffectText: "Rights are asserted early and the counter-indemnity framework is activated.", displayOrder: 4 },
  { code: "T5", stageNumber: 4, title: "Coordinating counsel", text: "Appoint coordinating counsel in Peru, Spain, and Italy to manage jurisdictional issues.", immediateEffectText: "The claims response is coordinated across the key jurisdictions and legal teams.", displayOrder: 5 },
  { code: "T6", stageNumber: 4, title: "One reserve report", text: "Notify coinsurers and reinsurers using one reserve report.", immediateEffectText: "A single reserve narrative is used to align recoveries and loss reporting.", displayOrder: 6 },

  { code: "C1", stageNumber: 5, title: "Final AP bond audit", text: "Perform a final audit of the Advance Payment Bond balance and project account reconciliation.", immediateEffectText: "The AP claim is tested against the actual balance and supporting evidence.", displayOrder: 1 },
  { code: "C2", stageNumber: 5, title: "Overlap review", text: "Perform an overlap review between the Advance Payment Bond and Performance Bond.", immediateEffectText: "The double-counting risk between bond claims is reviewed and controlled.", displayOrder: 2 },
  { code: "C3", stageNumber: 5, title: "Global settlement", text: "Negotiate a global settlement with ERAP, including release and assignment of rights.", immediateEffectText: "The claim is resolved through a coordinated settlement framework and rights transfer.", displayOrder: 3 },
  { code: "C4", stageNumber: 5, title: "Bank guarantee enforcement", text: "Immediately enforce bank guarantees and assigned receivables.", immediateEffectText: "Collateral and assigned rights are enforced to realise value on the claim.", displayOrder: 4 },
  { code: "C5", stageNumber: 5, title: "Counter-indemnity enforcement", text: "Enforce direct obligations against available counter-indemnitors.", immediateEffectText: "Available counter-indemnity rights are enforced to recover a portion of the loss.", displayOrder: 5 },
  { code: "C6", stageNumber: 5, title: "Coordinated recovery", text: "Implement a coordinated recovery strategy in all three jurisdictions.", immediateEffectText: "Recovery efforts are coordinated across the key jurisdictions and parties.", displayOrder: 6 },
];
