import { NextRequest, NextResponse } from "next/server";
import { QUESTIONS } from "@/data/open-day";
import { addVote, recordSessionAnswer } from "@/lib/openDayStore";

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

  const votes = await addVote(question.id, optionKey!);

  if (typeof sessionId === "string" && sessionId.length > 0 && sessionId.length <= 100) {
    await recordSessionAnswer(sessionId, question.id, optionKey!);
  }

  return NextResponse.json({ votes });
}
