import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const { nome, email, messaggio } = await req.json();

  if (!nome || !email || !messaggio) {
    return NextResponse.json({ error: "Dati mancanti" }, { status: 400 });
  }

  try {
    if (process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to: "make.luca.vizza@gmail.com",
        replyTo: email,
        subject: `Nuovo messaggio da ${nome} — lucavizza.it`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #474747;">
            <h2>Nuovo messaggio dal sito</h2>
            <p><strong>Da:</strong> ${nome} (${email})</p>
            <div style="background: #f5f0eb; padding: 20px; border-radius: 8px; margin-top: 16px;">
              <p style="white-space: pre-wrap;">${messaggio}</p>
            </div>
          </div>
        `,
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Errore invio" }, { status: 500 });
  }
}
