import { NextRequest, NextResponse } from "next/server";
import { QUESTIONS } from "@/data/open-day";
import { addVote, recordSessionAnswer, getSessionAnswers } from "@/lib/openDayStore";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { questionId, optionKey, sessionId } = body as {
    questionId?: string;
    optionKey?: string;
    sessionId?: string;
  };

  const question = QUESTIONS.find((q) => q.id === questionId);
  if (!question) {
    return NextResponse.json({ error: "Domanda non valida" }, { status: 400 });
  }
  if (!question.options.some((o) => o.key === optionKey)) {
    return NextResponse.json({ error: "Opzione non valida" }, { status: 400 });
  }

  const hasSession = typeof sessionId === "string" && sessionId.length > 0 && sessionId.length <= 100;

  // Se lo studente ha già risposto a questa domanda, sposta il voto invece di sommarne uno nuovo.
  let previousOptionKey: string | null = null;
  if (hasSession) {
    const answers = await getSessionAnswers(sessionId);
    previousOptionKey = answers[question.id] ?? null;
  }

  const votes = await addVote(question.id, optionKey!, previousOptionKey);

  if (hasSession) {
    await recordSessionAnswer(sessionId, question.id, optionKey!);
  }

  return NextResponse.json({ votes });
}
