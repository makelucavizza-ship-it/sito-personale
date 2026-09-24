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
const sessionAnswersKey = (sessionId: string) => `open_day:session:${sessionId}:answers`;
const aiMessageKey = (sessionId: string) => `open_day:session:${sessionId}:ai-message`;

// Dati legati a un singolo studente (risposte, messaggio AI): non servono oltre la serata,
// scadono da soli invece di restare per sempre nel database.
const SESSION_TTL_SECONDS = 60 * 60 * 6;

// Fallback in-memory — solo per sviluppo locale senza Redis configurato.
// Su Vercel (più istanze serverless) NON è affidabile: va configurato Redis prima dell'evento.
let memoryStep = 0;
const memoryVotes = new Map<string, Record<string, number>>();
const memorySessionAnswers = new Map<string, Record<string, string>>();
const memoryAiMessages = new Map<string, string>();

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

export async function recordSessionAnswer(sessionId: string, questionId: string, optionKey: string): Promise<void> {
  if (!redis) {
    const current = memorySessionAnswers.get(sessionId) ?? {};
    current[questionId] = optionKey;
    memorySessionAnswers.set(sessionId, current);
    return;
  }
  const key = sessionAnswersKey(sessionId);
  await redis.hset(key, { [questionId]: optionKey });
  await redis.expire(key, SESSION_TTL_SECONDS);
}

export async function getSessionAnswers(sessionId: string): Promise<Record<string, string>> {
  if (!redis) return memorySessionAnswers.get(sessionId) ?? {};
  const raw = await redis.hgetall<Record<string, string>>(sessionAnswersKey(sessionId));
  return raw ?? {};
}

export async function getCachedAiMessage(sessionId: string): Promise<string | null> {
  if (!redis) return memoryAiMessages.get(sessionId) ?? null;
  const raw = await redis.get<string>(aiMessageKey(sessionId));
  return raw ?? null;
}

export async function setCachedAiMessage(sessionId: string, message: string): Promise<void> {
  if (!redis) {
    memoryAiMessages.set(sessionId, message);
    return;
  }
  await redis.set(aiMessageKey(sessionId), message, { ex: SESSION_TTL_SECONDS });
}

export async function resetAll(): Promise<void> {
  if (!redis) {
    memoryStep = 0;
    memoryVotes.clear();
    memorySessionAnswers.clear();
    memoryAiMessages.clear();
    return;
  }
  await redis.set(STEP_KEY, 0);
  await Promise.all(QUESTIONS.map((q) => redis.del(voteKey(q.id))));
}
