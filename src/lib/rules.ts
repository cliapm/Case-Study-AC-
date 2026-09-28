import { DecisionRule } from "@/lib/types";

export const decisionRules: DecisionRule[] = [
  { decisionCode: "U1", confidentialExplanation: "The dedicated project account creates a ring-fenced control and a clearer evidentiary trail for the advance payment." },
  { decisionCode: "U2", confidentialExplanation: "Quarterly reporting strengthens the evidence available if the advance payment is later questioned." },
  { decisionCode: "U3", confidentialExplanation: "Conditioning bond reductions on ERAP confirmation reduces the risk of an unsupported release of the guarantee." },
  { decisionCode: "U4", confidentialExplanation: "Independent technical review adds a modest cost but improves the reliability of budget and schedule assumptions." },
  { decisionCode: "U5", confidentialExplanation: "The bank guarantee creates additional collateral tied to the advance payment exposure." },
  { decisionCode: "U6", confidentialExplanation: "The additional premium is charged at inception and is a direct cost of the underwriting structure." },

  { decisionCode: "R1", confidentialExplanation: "The forensic audit documents how the advance payment was used and supports later recovery arguments." },
  { decisionCode: "R2", confidentialExplanation: "The blocked account secures funds that can later be enforced if a covered payment is made." },
  { decisionCode: "R3", confidentialExplanation: "The reservation-of-rights notice preserves the insurer's position ahead of any insolvency." },
  { decisionCode: "R4", confidentialExplanation: "Independent monitoring improves visibility over progress and completion cost, at a modest cost." },
  { decisionCode: "R5", confidentialExplanation: "The assignment of receivables creates a further recoverable asset tied to certified amounts owed by ERAP." },
  { decisionCode: "R6", confidentialExplanation: "A joint crisis committee improves coordination between underwriting, claims, recovery, legal and reinsurance." },

  { decisionCode: "T1", confidentialExplanation: "The delay-causation report allocates responsibility for the delay and can materially affect the Performance Bond outcome under a conditional wording." },
  { decisionCode: "T2", confidentialExplanation: "Legal advice on termination validity and bond wording clarifies the strength of the defence available under the group's variant." },
  { decisionCode: "T3", confidentialExplanation: "Preserving financed equipment protects a tangible asset base that supports the group's position." },
  { decisionCode: "T4", confidentialExplanation: "Early reservations of rights and counter-indemnity demands help secure the group's position before further restrictions arise." },
  { decisionCode: "T5", confidentialExplanation: "Coordinating counsel across jurisdictions strengthens and centralises the group's legal strategy." },
  { decisionCode: "T6", confidentialExplanation: "A single consolidated reserve report keeps reinsurers aligned on the group's reported position." },

  { decisionCode: "C1", confidentialExplanation: "The final audit of the AP Bond balance reduces the claim to the amount actually supported by evidence." },
  { decisionCode: "C2", confidentialExplanation: "The overlap review prevents the same amount being claimed twice under both bonds." },
  { decisionCode: "C3", confidentialExplanation: "A global settlement resolves both bonds together and can reduce net payments and legal cost." },
  { decisionCode: "C4", confidentialExplanation: "Enforcing bank guarantees and assigned receivables converts previously secured collateral into cash." },
  { decisionCode: "C5", confidentialExplanation: "Enforcing counter-indemnity obligations directly pursues recovery from the parties who remain able to pay." },
  { decisionCode: "C6", confidentialExplanation: "A coordinated recovery strategy across jurisdictions helps the group realise the full value of the rights it has preserved." },
];

export function getDecisionTextByCode(code: string) {
  return decisionRules.find((rule) => rule.decisionCode === code)?.confidentialExplanation || "Confidential adjustment applied.";
}
