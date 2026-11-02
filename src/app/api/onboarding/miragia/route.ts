import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { Redis } from "@upstash/redis";
import { buildEmailText, findIssues, parseData } from "@/lib/onboarding-miragia";

// ATTENZIONE: questa route riceve password in chiaro.
// Non loggare mai il corpo della richiesta, i dati parsati o il testo dell'email.

export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 64 * 1024;
const RATE_LIMIT = 5; // invii
const RATE_WINDOW_SECONDS = 60 * 60; // per ora, per IP

const redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
const redis = redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;

// Fallback in memoria se Redis non è configurato: vale per singola istanza serverless,
// basta come freno contro invii ripetuti da uno stesso client.
const memoryHits = new Map<string, { count: number; resetAt: number }>();

async function isRateLimited(ip: string): Promise<boolean> {
  const key = `onboarding:miragia:rl:${ip}`;
  if (redis) {
    try {
      const count = await redis.incr(key);
      if (count === 1) await redis.expire(key, RATE_WINDOW_SECONDS);
      return count > RATE_LIMIT;
    } catch {
      // Redis non raggiungibile: si passa al limite in memoria
    }
  }
  const now = Date.now();
  const entry = memoryHits.get(key);
  if (!entry || entry.resetAt < now) {
    memoryHits.set(key, { count: 1, resetAt: now + RATE_WINDOW_SECONDS * 1000 });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  return (fwd?.split(",")[0] || req.headers.get("x-real-ip") || "unknown").trim();
}

const noindex = { "X-Robots-Tag": "noindex, nofollow", "Cache-Control": "no-store" };

function json(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status, headers: noindex });
}

export async function POST(req: NextRequest) {
  const declared = Number(req.headers.get("content-length") || 0);
  if (declared > MAX_BODY_BYTES) {
    return json({ error: "Le risposte sono troppo lunghe." }, 413);
  }

  let raw: unknown;
  try {
    const text = await req.text();
    if (text.length > MAX_BODY_BYTES) {
      return json({ error: "Le risposte sono troppo lunghe." }, 413);
    }
    raw = JSON.parse(text);
  } catch {
    return json({ error: "Richiesta non valida." }, 400);
  }

  if (await isRateLimited(clientIp(req))) {
    return json({ error: "Troppi invii in poco tempo. Riprova tra un'ora." }, 429);
  }

  // Honeypot: un utente vero non vede né compila questo campo.
  // Si risponde ok per non dare indizi a chi invia spam.
  const honeypot = (raw as { website?: unknown })?.website;
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return json({ ok: true });
  }

  const data = parseData(raw);
  const issues = findIssues(data);
  if (issues.length) {
    return json({ error: "Alcune risposte non sono valide.", issues }, 422);
  }

  const resendKey = process.env.RESEND_API_KEY;
  const resendFrom = process.env.RESEND_FROM_EMAIL;
  if (!resendKey || resendKey === "placeholder" || !resendFrom || resendFrom === "placeholder") {
    console.error("[onboarding-miragia] Resend non configurato");
    return json({ error: "Invio non disponibile al momento." }, 503);
  }

  const nome = data.nome.trim().replace(/[\r\n]+/g, " ");

  try {
    const resend = new Resend(resendKey);
    const { error } = await resend.emails.send({
      from: resendFrom,
      to: "info@lucavizza.it",
      subject: `Onboarding Miragià – risposte di ${nome}`,
      text: buildEmailText(data, new Date()),
    });
    if (error) {
      // Solo il nome dell'errore, mai il contenuto inviato
      console.error("[onboarding-miragia] invio fallito:", error.name);
      return json({ error: "Invio non riuscito." }, 502);
    }
  } catch {
    console.error("[onboarding-miragia] invio fallito: eccezione Resend");
    return json({ error: "Invio non riuscito." }, 502);
  }

  return json({ ok: true });
}
