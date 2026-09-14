import { getReleasedStage } from "@/lib/kv";

export const dynamic = "force-dynamic";

export async function GET() {
  const stageNumber = await getReleasedStage();
  return Response.json({ stageNumber });
}
