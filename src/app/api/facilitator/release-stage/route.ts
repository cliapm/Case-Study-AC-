import { getReleasedStage, setReleasedStage } from "@/lib/kv";

export const dynamic = "force-dynamic";

export async function POST() {
  const current = await getReleasedStage();
  const next = Math.min(current + 1, 5);
  await setReleasedStage(next);
  return Response.json({ stageNumber: next });
}
