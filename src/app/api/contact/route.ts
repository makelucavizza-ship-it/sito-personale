import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const { nome, email, messaggio } = await req.json();

  if (!nome || !email || !messaggio) {
    return NextResponse.json({ error: "Dati mancanti" }, { status: 400 });
  }

  try {
    const resendKey = process.env.RESEND_API_KEY;
    const resendFrom = process.env.RESEND_FROM_EMAIL;

    if (resendKey && resendKey !== "placeholder" && resendFrom && resendFrom !== "placeholder") {
      const resend = new Resend(resendKey);

      await Promise.allSettled([
        // Notifica admin
        resend.emails.send({
          from: resendFrom,
          to: "info@lucavizza.it",
          replyTo: email,
          subject: `Nuovo messaggio da ${nome} — lucavizza.it`,
          html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f5f0eb;padding:32px 24px;">
              <div style="background:#474747;border-radius:16px;padding:28px 32px;margin-bottom:24px;">
                <img src="https://lucavizza.it/logo-full-white.svg" alt="Luca Vizza" style="height:32px;width:auto;display:block;margin-bottom:20px;" />
                <p style="color:#ee826d;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;margin:0 0 8px;">NUOVO MESSAGGIO</p>
                <h1 style="color:#f5f0eb;font-size:20px;margin:0;">${nome}</h1>
              </div>
              <div style="background:white;border-radius:12px;padding:24px;margin-bottom:16px;border-left:4px solid #ee826d;">
                <p style="color:#474747;opacity:0.5;font-size:12px;margin:0 0 4px;">Da</p>
                <p style="color:#474747;font-weight:bold;margin:0 0 12px;">${nome} — <a href="mailto:${email}" style="color:#ee826d;text-decoration:none;">${email}</a></p>
                <p style="color:#474747;opacity:0.5;font-size:12px;margin:0 0 4px;">Messaggio</p>
                <p style="color:#474747;line-height:1.7;white-space:pre-wrap;margin:0;">${messaggio}</p>
              </div>
              <div style="text-align:center;">
                <a href="mailto:${email}" style="display:inline-block;background:#ee826d;color:white;padding:12px 28px;border-radius:100px;text-decoration:none;font-weight:bold;font-size:14px;">✉️ Rispondi a ${nome}</a>
              </div>
            </div>
          `,
        }),

        // Conferma all'utente
        resend.emails.send({
          from: resendFrom,
          to: email,
          replyTo: "info@lucavizza.it",
          subject: "Ho ricevuto il tuo messaggio — Luca Vizza",
          html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#f5f0eb;padding:32px 24px;">
              <div style="background:#474747;border-radius:16px;padding:28px 32px;margin-bottom:24px;">
                <img src="https://lucavizza.it/logo-full-white.svg" alt="Luca Vizza" style="height:36px;width:auto;display:block;margin-bottom:24px;" />
                <h1 style="color:#f5f0eb;font-size:22px;margin:0 0 8px;">Ho ricevuto il tuo messaggio</h1>
                <p style="color:rgba(245,240,235,0.5);font-size:13px;margin:0;">Ciao ${nome}, grazie per avermi scritto.</p>
              </div>

              <div style="background:white;border-radius:12px;padding:24px;margin-bottom:24px;">
                <p style="color:#474747;line-height:1.7;margin:0 0 16px;">
                  Ho ricevuto il tuo messaggio e ti risponderò <strong>al più presto</strong>, di solito entro 24 ore.
                </p>
                <p style="color:#474747;line-height:1.7;margin:0;">
                  Se hai bisogno di qualcosa di urgente, puoi scrivermi direttamente su
                  <a href="mailto:info@lucavizza.it" style="color:#ee826d;text-decoration:none;font-weight:bold;">info@lucavizza.it</a>.
                </p>
              </div>

              <div style="background:#ee826d10;border:1px solid #ee826d25;border-radius:12px;padding:20px;margin-bottom:32px;">
                <p style="color:#474747;opacity:0.5;font-size:12px;margin:0 0 4px;">Il tuo messaggio</p>
                <p style="color:#474747;font-size:14px;line-height:1.6;white-space:pre-wrap;margin:0;font-style:italic;">"${messaggio}"</p>
              </div>

              <p style="text-align:center;color:#474747;font-size:12px;opacity:0.4;margin:0;">Luca Vizza · Marketing Digitale &amp; AI Automation · <a href="https://lucavizza.it" style="color:#474747;">lucavizza.it</a></p>
            </div>
          `,
        }),
      ]);
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Errore invio" }, { status: 500 });
  }
}
