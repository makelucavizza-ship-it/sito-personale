import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { Resend } from "resend";


function buildPrompt(
  settore: string,
  answers: Record<string, string>,
  nome: string,
  azienda: string
): string {
  const answersText = Object.entries(answers)
    .map(([k, v]) => `- ${k}: ${v}`)
    .join("\n");

  return `Sei un esperto di marketing digitale e AI automation per PMI italiane.
Hai appena ricevuto le risposte di un audit digitale da ${nome || "un imprenditore"}${azienda ? ` (${azienda})` : ""} nel settore ${settore}.

Risposte:
${answersText}

Genera un report professionale in italiano con esattamente queste 4 sezioni:

## 1. Livello di maturità digitale
Descrivi in 2-3 paragrafi il livello attuale dell'azienda, cosa sta facendo bene e dove ci sono lacune. Sii specifico e usa un tono diretto ma incoraggiante.

## 2. Servizi consigliati
Elenca 3-4 servizi di marketing digitale o AI automation che sarebbero più utili per questa specifica realtà. Per ognuno spiega il perché in 2-3 righe.

## 3. Bandi e finanziamenti applicabili
Indica 2-3 opportunità di finanziamento (PNRR, crediti d'imposta, bandi regionali Emilia-Romagna) che potrebbero essere rilevanti per questo settore e questa situazione. Sii specifico ma aggiungi sempre un disclaimer che le condizioni cambiano.

## 4. 3 azioni immediate
Elenca 3 cose concrete che l'azienda può fare nei prossimi 30 giorni, a costo zero o bassissimo, per migliorare la sua situazione digitale. Sii pratico e specifico.

---
Concludi con un paragrafo che invita a contattare Luca Vizza su lucavizza.it per una consulenza gratuita.

Tono: professionale ma diretto, concreto, non generico. Evita frasi fatte tipo "nel mondo digitale di oggi". Scrivi come parlerebbe un consulente senior che conosce il settore.`;
}

export async function POST(req: NextRequest) {
  const { settore, answers, email, nome, azienda } = await req.json();

  if (!settore || !answers || !email) {
    return new Response("Dati mancanti", { status: 400 });
  }

  const prompt = buildPrompt(settore, answers, nome, azienda);

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });
  const encoder = new TextEncoder();
  let fullReport = "";

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const anthropicStream = anthropic.messages.stream({
          model: "claude-sonnet-4-6",
          max_tokens: 2000,
          messages: [{ role: "user", content: prompt }],
        });

        for await (const chunk of anthropicStream) {
          if (
            chunk.type === "content_block_delta" &&
            chunk.delta.type === "text_delta"
          ) {
            const text = chunk.delta.text;
            fullReport += text;
            controller.enqueue(encoder.encode(text));
          }
        }

        controller.close();

        // Send email after stream completes
        if (process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL) {
          const resend = new Resend(process.env.RESEND_API_KEY);
          await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL,
            to: email,
            subject: `Il tuo Audit Digitale — ${settore}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #474747;">
                <h1 style="color: #474747; font-size: 28px; margin-bottom: 8px;">
                  Il tuo Audit Digitale
                </h1>
                <p style="color: #888; font-size: 14px; margin-bottom: 32px;">
                  Settore: ${settore}${nome ? ` | ${nome}` : ""}
                </p>
                <div style="background: #f5f0eb; padding: 32px; border-radius: 12px; white-space: pre-wrap; line-height: 1.7;">
${fullReport.replace(/## /g, "\n## ").replace(/### /g, "\n### ")}
                </div>
                <div style="margin-top: 32px; padding: 24px; background: #ee826d10; border: 1px solid #ee826d30; border-radius: 12px; text-align: center;">
                  <p style="margin: 0 0 16px; color: #474747;">
                    Vuoi approfondire questi risultati con una consulenza gratuita?
                  </p>
                  <a href="https://lucavizza.it/contatti"
                     style="background: #ee826d; color: white; padding: 12px 28px; border-radius: 50px; text-decoration: none; font-weight: bold; display: inline-block;">
                    Scrivimi su lucavizza.it
                  </a>
                </div>
                <p style="margin-top: 24px; font-size: 12px; color: #aaa; text-align: center;">
                  Luca Vizza — lucavizza.it — Marketing Digitale &amp; AI Automation
                </p>
              </div>
            `,
          });
        }
      } catch (err) {
        controller.error(err);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
      "Cache-Control": "no-cache",
    },
  });
}
