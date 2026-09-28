import { getReleasedStage, setReleasedStage } from "@/lib/kv";
import { stages } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

export async function POST() {
  const current = await getReleasedStage();
  const next = Math.min(current + 1, stages.length);
  await setReleasedStage(next);
  return Response.json({ stageNumber: next });
}
