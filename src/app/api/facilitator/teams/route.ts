import { teamList } from "@/lib/mock-data";
import { getAllSubmissionsForStage } from "@/lib/kv";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const stageNumber = Number(searchParams.get("stage") ?? "1");
  const teamIds = teamList.map((t) => t.id);
  const submissions = await getAllSubmissionsForStage(stageNumber, teamIds);

  const teams = teamList.map((team) => ({
    ...team,
    submission: submissions[team.id] ?? null,
    status: submissions[team.id] ? "Submitted" : "Waiting",
  }));

  return Response.json({
    teams,
    total: teams.length,
    submittedCount: teams.filter((t) => t.status === "Submitted").length,
    stageNumber,
  });
}
