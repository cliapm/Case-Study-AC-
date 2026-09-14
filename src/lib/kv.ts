import { Redis } from "@upstash/redis";

let redisClient: Redis | null = null;

export function getRedisClient() {
  if (redisClient) return redisClient;
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  redisClient = new Redis({ url, token });
  return redisClient;
}

function submissionKey(teamId: string, stageNumber: number) {
  return `submission:${teamId}:${stageNumber}`;
}

export async function saveTeamSubmission(record: {
  teamId: string;
  stageNumber: number;
  selectedDecisionCodes: string[];
}) {
  const redis = getRedisClient();
  if (!redis) throw new Error("Redis is not configured");
  const value = { ...record, submittedAt: new Date().toISOString(), isLocked: true };
  await redis.set(submissionKey(record.teamId, record.stageNumber), JSON.stringify(value));
  return value;
}

export async function getAllSubmissionsForStage(stageNumber: number, teamIds: string[]) {
  const redis = getRedisClient();
  if (!redis) return {};
  const results = await Promise.all(
    teamIds.map((id) => redis.get<string>(submissionKey(id, stageNumber)))
  );
  const map: Record<string, any> = {};
  teamIds.forEach((id, i) => {
    if (results[i]) map[id] = typeof results[i] === "string" ? JSON.parse(results[i] as string) : results[i];
  });
  return map;
}
