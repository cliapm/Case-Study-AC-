export async function GET() {
  const csv = [
    "team_id,variant,current_stage,submitted,status,premium,recovery,reserve,net_loss",
    "A1,A,1,yes,submitted,8.158,43.000,18.000,17.042",
    "B1,B,1,yes,submitted,9.270,43.000,0.000,38.730",
    "C1,C,1,yes,submitted,10.012,8.000,0.000,73.788",
    "D1,D,1,yes,submitted,8.900,39.000,0.000,45.300",
  ].join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=project-agua-clara-results.csv",
    },
  });
}
