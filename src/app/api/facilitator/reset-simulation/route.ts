import { resetSimulation } from "@/lib/kv";
import { teamList, stages } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

export async function POST() {
  const stageNumber = await resetSimulation(teamList.map((team) => team.id), stages.length);
  return Response.json({ stageNumber });
}
