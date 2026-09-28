import { NextRequest } from "next/server";
import { getTeamDecisionHistory } from "@/lib/kv";
import { stages } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const teamId = searchParams.get("team");
  if (!teamId) {
    return Response.json({ error: "Missing team" }, { status: 400 });
  }
  const codes = await getTeamDecisionHistory(teamId, stages.length);
  return Response.json({ codes });
}
