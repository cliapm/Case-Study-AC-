import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { teamId, stageNumber, selectedDecisionCodes } = body;

    if (!teamId || !stageNumber || !Array.isArray(selectedDecisionCodes)) {
      return Response.json({ error: "Invalid submission payload" }, { status: 400 });
    }

    if (selectedDecisionCodes.length !== 3) {
      return Response.json({ error: "Exactly three decisions are required." }, { status: 400 });
    }

    return Response.json({
      ok: true,
      teamId,
      stageNumber,
      selectedDecisionCodes,
      message: "Submission accepted in mock mode.",
    });
  } catch {
    return Response.json({ error: "Submission failed" }, { status: 500 });
  }
}
