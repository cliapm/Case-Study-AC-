export type TeamSubmissionRecord = {
  teamId: string;
  stageNumber: number;
  selectedDecisionCodes: string[];
  submittedAt: string;
  isLocked: boolean;
};

const STORAGE_PREFIX = "project-agua-clara";

export function getTeamStorageKey(teamId: string) {
  return `${STORAGE_PREFIX}:${teamId}`;
}

export function getStoredSubmission(teamId: string): TeamSubmissionRecord | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(getTeamStorageKey(teamId));
  if (!raw) return null;

  try {
    return JSON.parse(raw) as TeamSubmissionRecord;
  } catch {
    return null;
  }
}

export function saveSubmission(record: TeamSubmissionRecord) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(getTeamStorageKey(record.teamId), JSON.stringify(record));
}

export function saveSelectedDecisions(teamId: string, stageNumber: number, selectedDecisionCodes: string[]) {
  const existing = getStoredSubmission(teamId);
  const record: TeamSubmissionRecord = {
    teamId,
    stageNumber,
    selectedDecisionCodes,
    submittedAt: existing?.submittedAt ?? new Date().toISOString(),
    isLocked: Boolean(existing?.isLocked),
  };

  saveSubmission(record);
  return record;
}
