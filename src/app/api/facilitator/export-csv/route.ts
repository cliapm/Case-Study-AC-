import { teamList, stages } from "@/lib/mock-data";
import { getTeamDecisionHistory } from "@/lib/kv";
import { calculateTeamPosition } from "@/lib/simulation";

export const dynamic = "force-dynamic";

export async function GET() {
  const totalStages = stages.length;
  const rows = await Promise.all(
    teamList.map(async (team) => {
      const history = await getTeamDecisionHistory(team.id, totalStages);
      const position = calculateTeamPosition(team.id, totalStages, history);
      const submitted = history.length > 0 ? "yes" : "no";
      return [
        team.id,
        team.variant,
        String(team.currentStage),
        submitted,
        position.accumulatedPremium.toFixed(3),
        position.realisedRecovery.toFixed(3),
        position.reserve.toFixed(3),
        position.netLoss.toFixed(3),
      ].join(",");
    }),
  );

  const csv = ["team_id,variant,current_stage,submitted,premium,recovery,reserve,net_loss", ...rows].join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=project-agua-clara-results.csv",
    },
  });
}
