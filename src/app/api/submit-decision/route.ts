import { NextRequest } from "next/server";
import { saveTeamSubmission } from "@/lib/kv";

export async function POST(request: NextRequest) {
  try {
    const { teamId, stageNumber, selectedDecisionCodes } = await request.json();

    if (!teamId || !stageNumber || !Array.isArray(selectedDecisionCodes)) {
      return Response.json({ error: "Invalid submission payload" }, { status: 400 });
    }
    if (selectedDecisionCodes.length !== 3) {
      return Response.json({ error: "Exactly three decisions are required." }, { status: 400 });
    }

    const record = await saveTeamSubmission({ teamId, stageNumber, selectedDecisionCodes });
    return Response.json({ ok: true, ...record });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Submission failed" }, { status: 500 });
  }
}
