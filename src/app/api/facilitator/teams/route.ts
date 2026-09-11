import { teamList } from "@/lib/mock-data";

export async function GET() {
  return Response.json({ teams: teamList, total: teamList.length });
}
