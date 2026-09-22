import { NextRequest, NextResponse } from "next/server";
import { getStepAt, clampStep, STEPS, QUESTIONS } from "@/data/open-day";
import { getStep, setStep, getVotes, resetAll, isStoreConfigured } from "@/lib/openDayStore";

export const dynamic = "force-dynamic";

async function buildState(step: number) {
  const current = getStepAt(step);
  const votes =
    current.kind === "question" ? await getVotes(QUESTIONS[current.questionIndex].id) : null;
  return {
    step,
    totalSteps: STEPS.length,
    votes,
    configured: isStoreConfigured(),
  };
}

export async function GET() {
  const step = await getStep();
  return NextResponse.json(await buildState(step));
}

export async function POST(req: NextRequest) {
  const key = process.env.OPEN_DAY_KEY;
  if (!key) {
    return NextResponse.json(
      { error: "OPEN_DAY_KEY non configurata sul server" },
      { status: 503 }
    );
  }

  const body = await req.json().catch(() => ({}));
  if (body.key !== key) {
    return NextResponse.json({ error: "Chiave non valida" }, { status: 401 });
  }

  const current = await getStep();

  if (body.action === "reset") {
    await resetAll();
    return NextResponse.json(await buildState(0));
  }

  let next = current;
  if (body.action === "next") next = clampStep(current + 1);
  else if (body.action === "prev") next = clampStep(current - 1);
  else return NextResponse.json({ error: "Azione non valida" }, { status: 400 });

  await setStep(next);
  return NextResponse.json(await buildState(next));
}
