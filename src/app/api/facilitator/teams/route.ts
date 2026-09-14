import { teamList } from "@/lib/mock-data";
import { getAllSubmissionsForStage } from "@/lib/kv";
import { calculateTeamPosition } from "@/lib/simulation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const stageNumber = Number(searchParams.get("stage") ?? "1");
  const teamIds = teamList.map((t) => t.id);
  const submissions = await getAllSubmissionsForStage(stageNumber, teamIds);

  const teams = teamList.map((team) => {
    const submission = submissions[team.id] ?? null;
    const selectedCodes = submission?.selectedDecisionCodes ?? [];
    const position = calculateTeamPosition(team.id, stageNumber, selectedCodes);

    return {
      ...team,
      submission,
      status: submission ? "Submitted" : "Waiting",
      position,
    };
  });

  return Response.json({
    teams,
    total: teams.length,
    submittedCount: teams.filter((t) => t.status === "Submitted").length,
    stageNumber,
  });
}
