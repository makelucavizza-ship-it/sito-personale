import { Redis } from "@upstash/redis";
import { QUESTIONS } from "@/data/open-day";

const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

const redis = url && token ? new Redis({ url, token }) : null;

export function isStoreConfigured(): boolean {
  return redis !== null;
}

const STEP_KEY = "open_day:step";
const voteKey = (questionId: string) => `open_day:votes:${questionId}`;

// Fallback in-memory — solo per sviluppo locale senza Redis configurato.
// Su Vercel (più istanze serverless) NON è affidabile: va configurato Redis prima dell'evento.
let memoryStep = 0;
const memoryVotes = new Map<string, Record<string, number>>();

export async function getStep(): Promise<number> {
  if (!redis) return memoryStep;
  const v = await redis.get<number>(STEP_KEY);
  return typeof v === "number" ? v : 0;
}

export async function setStep(step: number): Promise<number> {
  if (!redis) {
    memoryStep = step;
    return step;
  }
  await redis.set(STEP_KEY, step);
  return step;
}

export async function getVotes(questionId: string): Promise<Record<string, number>> {
  if (!redis) return memoryVotes.get(questionId) ?? {};
  const raw = await redis.hgetall<Record<string, string | number>>(voteKey(questionId));
  if (!raw) return {};
  const out: Record<string, number> = {};
  for (const [k, v] of Object.entries(raw)) out[k] = Number(v) || 0;
  return out;
}

export async function addVote(questionId: string, optionKey: string): Promise<Record<string, number>> {
  if (!redis) {
    const current = memoryVotes.get(questionId) ?? {};
    current[optionKey] = (current[optionKey] ?? 0) + 1;
    memoryVotes.set(questionId, current);
    return current;
  }
  await redis.hincrby(voteKey(questionId), optionKey, 1);
  return getVotes(questionId);
}

export async function resetAll(): Promise<void> {
  if (!redis) {
    memoryStep = 0;
    memoryVotes.clear();
    return;
  }
  await redis.set(STEP_KEY, 0);
  await Promise.all(QUESTIONS.map((q) => redis.del(voteKey(q.id))));
}
