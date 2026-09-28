import { teamList, stages } from "@/lib/mock-data";
import { getAllSubmissionsForStage, getTeamDecisionHistory } from "@/lib/kv";
import { calculateTeamPosition } from "@/lib/simulation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const stageNumber = Number(searchParams.get("stage") ?? "1");
  const teamIds = teamList.map((t) => t.id);
  const submissions = await getAllSubmissionsForStage(stageNumber, teamIds);

  const teams = await Promise.all(
    teamList.map(async (team) => {
      const submission = submissions[team.id] ?? null;
      const history = await getTeamDecisionHistory(team.id, stages.length);
      const position = calculateTeamPosition(team.id, stageNumber, history);

      return {
        ...team,
        submission,
        history,
        status: submission ? "Submitted" : "Waiting",
        position,
      };
    }),
  );

  return Response.json({
    teams,
    total: teams.length,
    submittedCount: teams.filter((t) => t.status === "Submitted").length,
    stageNumber,
  });
}
