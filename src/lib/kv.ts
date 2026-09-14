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
export async function getTeamSubmission(teamId: string, stageNumber: number) {
  const redis = getRedisClient();
  if (!redis) return null;
  const raw = await redis.get<string>(submissionKey(teamId, stageNumber));
  if (!raw) return null;
  return typeof raw === "string" ? JSON.parse(raw) : raw;
}
const RELEASED_STAGE_KEY = "released-stage-number";

export async function getReleasedStage(): Promise<number> {
  const redis = getRedisClient();
  if (!redis) return 1;
  const value = await redis.get<number | string>(RELEASED_STAGE_KEY);
  if (!value) return 1;
  return Number(value);
}

export async function setReleasedStage(stageNumber: number) {
  const redis = getRedisClient();
  if (!redis) throw new Error("Redis is not configured");
  await redis.set(RELEASED_STAGE_KEY, stageNumber);
  return stageNumber;
}

export async function resetSimulation(teamIds: string[], totalStages: number) {
  const redis = getRedisClient();
  if (!redis) throw new Error("Redis is not configured");
  const keys = teamIds.flatMap((teamId) =>
    Array.from({ length: totalStages }, (_, i) => submissionKey(teamId, i + 1)),
  );
  if (keys.length > 0) {
    await redis.del(...keys);
  }
  await redis.set(RELEASED_STAGE_KEY, 1);
  return 1;
}
