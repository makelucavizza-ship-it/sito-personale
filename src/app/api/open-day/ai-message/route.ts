import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { QUESTIONS, AI_MESSAGE_QUESTION_IDS, AI_MESSAGE_FALLBACK } from "@/data/open-day";
import { getCachedAiMessage, setCachedAiMessage, getSessionAnswers } from "@/lib/openDayStore";

export const dynamic = "force-dynamic";

const SYSTEM_PROMPT =
  "Sei un docente di un ITS Academy di turismo digitale, ti rivolgi a ragazzi tra i 16 e i 19 anni a un open day. " +
  "Dato il nome dello studente e le sue risposte a un sondaggio (scuola frequentata, età, interesse personale, " +
  "bisogno che pensa sia più urgente per il turismo romagnolo, ambito lavorativo che lo incuriosisce), scrivi 2-3 frasi " +
  "rivolte direttamente a lui o lei per nome, spiegando in modo concreto perché il corso è la scelta giusta sulla base " +
  "di queste risposte specifiche. Tono professionale ma simpatico, mai paternalistico, niente frasi fatte o superlativi " +
  "gonfiati, massimo 50-60 parole, in italiano.";

function sanitizeName(raw: unknown): string {
  if (typeof raw !== "string") return "studente";
  const cleaned = raw.replace(/[\r\n]+/g, " ").trim().slice(0, 40);
  return cleaned.length > 0 ? cleaned : "studente";
}

function isValidSessionId(raw: unknown): raw is string {
  return typeof raw === "string" && /^[a-zA-Z0-9-]{8,100}$/.test(raw);
}

function buildUserPrompt(name: string, answers: Record<string, string>): string {
  const lines = [`Nome: ${name}`];
  for (const id of AI_MESSAGE_QUESTION_IDS) {
    const question = QUESTIONS.find((q) => q.id === id);
    const option = question?.options.find((o) => o.key === answers[id]);
    if (question && option) {
      lines.push(`${question.text} ${option.label}`);
    }
  }
  return lines.join("\n");
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { sessionId, name: rawName } = body as { sessionId?: string; name?: string };

  if (!isValidSessionId(sessionId)) {
    return NextResponse.json({ error: "sessionId non valido" }, { status: 400 });
  }

  // Un solo messaggio generato per sessione: se esiste già, non richiamare mai più l'API
  // per questo studente — anche se la sua prima risposta era il messaggio di riserva.
  const cached = await getCachedAiMessage(sessionId);
  if (cached) {
    return NextResponse.json({ message: cached });
  }

  const name = sanitizeName(rawName);
  const answers = await getSessionAnswers(sessionId);
  const hasAnyAnswer = AI_MESSAGE_QUESTION_IDS.some((id) => answers[id]);

  const apiKey = process.env.ANTHROPIC_API_KEY;
  let message = AI_MESSAGE_FALLBACK;

  if (apiKey && apiKey !== "placeholder" && hasAnyAnswer) {
    try {
      const anthropic = new Anthropic({ apiKey });
      const response = await anthropic.messages.create(
        {
          model: "claude-haiku-4-5",
          max_tokens: 300,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: buildUserPrompt(name, answers) }],
        },
        { timeout: 4500, maxRetries: 0 }
      );
      const rawText = response.content[0]?.type === "text" ? response.content[0].text : "";
      const generated = rawText.trim();
      if (generated) message = generated;
    } catch {
      // Wifi ballerino, timeout o errore API: resta il messaggio di riserva, niente spinner o errore a schermo.
    }
  }

  await setCachedAiMessage(sessionId, message);
  return NextResponse.json({ message });
}
