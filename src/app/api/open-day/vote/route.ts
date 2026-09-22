import { NextRequest, NextResponse } from "next/server";
import { QUESTIONS } from "@/data/open-day";
import { addVote } from "@/lib/openDayStore";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const { questionId, optionKey } = body as { questionId?: string; optionKey?: string };

  const question = QUESTIONS.find((q) => q.id === questionId);
  if (!question) {
    return NextResponse.json({ error: "Domanda non valida" }, { status: 400 });
  }
  if (!question.options.some((o) => o.key === optionKey)) {
    return NextResponse.json({ error: "Opzione non valida" }, { status: 400 });
  }

  const votes = await addVote(question.id, optionKey!);
  return NextResponse.json({ votes });
}
