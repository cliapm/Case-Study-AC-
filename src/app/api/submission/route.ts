import { getTeamSubmission } from "@/lib/kv";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const teamId = searchParams.get("team");
  const stageNumber = Number(searchParams.get("stage") ?? "1");
  if (!teamId) return Response.json({ error: "team is required" }, { status: 400 });
  const submission = await getTeamSubmission(teamId, stageNumber);
  return Response.json({ submission });
}
