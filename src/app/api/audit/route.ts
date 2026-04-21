import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { Resend } from "resend";

interface Sliders {
  prenotazioni: number;
  preventivi: number;
  followup: number;
  tariffa: number;
}

interface AuditResult {
  titolo: string;
  problema_principale: string;
  automazioni: Array<{ nome: string; descrizione: string; risparmio: string }>;
  insight_finale: string;
  prossimo_passo: string;
}

const FALLBACK_RESULT: AuditResult = {
  titolo: "Il tuo tempo vale più di quanto pensi",
  problema_principale:
    "Dalle tue risposte emerge un quadro molto comune: attività ripetitive che sottraggono ore preziose ogni settimana. Non è colpa tua — è così che funziona quando si gestisce tutto manualmente, senza strumenti pensati per snellire il lavoro.",
  automazioni: [
    {
      nome: "Agente vocale AI",
      descrizione:
        "Risponde al telefono al posto tuo, raccoglie prenotazioni e informazioni. Attivo 24/7 senza che tu faccia nulla.",
      risparmio: "3–5h/settimana",
    },
    {
      nome: "WhatsApp automatizzato",
      descrizione:
        "Conferme, promemoria e follow-up inviati automaticamente ai tuoi clienti al momento giusto.",
      risparmio: "2–3h/settimana",
    },
    {
      nome: "CRM semplice",
      descrizione:
        "Tutti i tuoi clienti in un posto, con storico, note e promemoria. Smetti di cercare numeri su WhatsApp.",
      risparmio: "1–2h/settimana",
    },
  ],
  insight_finale:
    "Il problema non è che sei poco digitale. È che nessuno ti ha mai mostrato come farlo in modo semplice, su misura per la tua realtà.",
  prossimo_passo:
    "Parliamo 20 minuti. Ti mostro esattamente cosa automatizzerei per primo nella tua situazione, senza impegno. Scrivimi su lucavizza.it/contatti",
};

function extractJSON(text: string): string {
  const match = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (match) return match[1].trim();
  return text.trim();
}

function buildPrompt(
  settore: string,
  sliders: Sliders,
  sectorAnswers: Record<string, string>,
  nome: string
): string {
  const totalOre = sliders.prenotazioni + sliders.preventivi + sliders.followup;
  const annualValue = totalOre * sliders.tariffa * 52;

  const answersText = Object.entries(sectorAnswers)
    .map(([k, v]) => `- ${k}: ${v}`)
    .join("\n");

  return `Sei Luca Vizza, esperto di marketing digitale e AI automation per PMI italiane.

Hai ricevuto le risposte di ${nome || "un imprenditore"} dal settore: ${settore}.

DATI CALCOLATORE:
- Ore/settimana su prenotazioni: ${sliders.prenotazioni}h
- Ore/settimana su preventivi: ${sliders.preventivi}h
- Ore/settimana su follow-up: ${sliders.followup}h
- Valore orario: €${sliders.tariffa}
- Totale ore perse/anno: ${totalOre * 52}
- Valore economico annuo: €${annualValue.toLocaleString("it-IT")}

RISPOSTE SETTORE:
${answersText}

Genera un'analisi personalizzata IN ITALIANO. Rispondi SOLO con JSON valido, senza nient'altro.

Il JSON deve avere ESATTAMENTE questa struttura:
{
  "titolo": "Titolo corto e diretto che cattura la loro situazione (puoi usare numeri reali dal calcolatore)",
  "problema_principale": "2-3 frasi basate sui dati reali. Usa i numeri del calcolatore. Sii diretto, non generico.",
  "automazioni": [
    {
      "nome": "Nome dello strumento o automazione concreta",
      "descrizione": "1-2 frasi su come funziona per il loro caso specifico nel settore ${settore}",
      "risparmio": "Stima concreta, es: '3h/settimana' o '€2.400/anno'"
    },
    {
      "nome": "...",
      "descrizione": "...",
      "risparmio": "..."
    },
    {
      "nome": "...",
      "descrizione": "...",
      "risparmio": "..."
    }
  ],
  "insight_finale": "1-2 frasi: una verità scomoda o un insight inaspettato. Qualcosa che li faccia riflettere. Prima persona come Luca.",
  "prossimo_passo": "1-2 frasi su cosa fare adesso. Specifico e concreto. Puoi menzionare lucavizza.it/contatti"
}`;
}

function buildUserEmailHtml(
  result: AuditResult,
  nome: string,
  settore: string,
  sliders: Sliders
): string {
  const totalOre = sliders.prenotazioni + sliders.preventivi + sliders.followup;
  const annualValue = (totalOre * sliders.tariffa * 52).toLocaleString("it-IT");

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f0eb;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:32px 24px;">

    <div style="background:#474747;border-radius:16px;padding:32px;margin-bottom:24px;">
      <p style="color:#ee826d;font-size:12px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;margin:0 0 12px;">
        IL Tuo REPORT GRATUITO
      </p>
      <h1 style="color:#f5f0eb;font-size:26px;margin:0 0 8px;line-height:1.3;">
        ${result.titolo}
      </h1>
      <p style="color:rgba(245,240,235,0.5);font-size:13px;margin:0;">
        ${settore}${nome ? ` · ${nome}` : ""}
      </p>
    </div>

    <div style="background:#ee826d15;border:1px solid #ee826d30;border-radius:12px;padding:20px;margin-bottom:24px;display:flex;justify-content:space-between;">
      <div>
        <p style="color:#474747;font-size:12px;margin:0 0 4px;opacity:0.5;">Tempo perso/anno</p>
        <p style="color:#474747;font-size:22px;font-weight:bold;margin:0;">${totalOre * 52} ore</p>
      </div>
      <div style="text-align:right;">
        <p style="color:#474747;font-size:12px;margin:0 0 4px;opacity:0.5;">Valore economico</p>
        <p style="color:#ee826d;font-size:22px;font-weight:bold;margin:0;">€${annualValue}/anno</p>
      </div>
    </div>

    <div style="background:white;border-radius:12px;padding:24px;margin-bottom:24px;">
      <p style="color:#474747;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;opacity:0.4;margin:0 0 12px;">
        SITUAZIONE ATTUALE
      </p>
      <p style="color:#474747;opacity:0.8;line-height:1.7;margin:0;">${result.problema_principale}</p>
    </div>

    <div style="margin-bottom:24px;">
      <p style="color:#474747;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;opacity:0.4;margin:0 0 16px;">
        LE 3 AUTOMAZIONI PER TE
      </p>
      ${result.automazioni
        .map(
          (a, i) => `
      <div style="background:white;border-radius:12px;padding:20px;margin-bottom:12px;">
        <p style="color:#474747;font-weight:bold;margin:0 0 6px;font-size:15px;">${i + 1}. ${a.nome}</p>
        <p style="color:#474747;opacity:0.65;font-size:14px;line-height:1.6;margin:0 0 10px;">${a.descrizione}</p>
        <span style="background:#3ad3ef15;color:#3ad3ef;font-size:12px;font-weight:bold;padding:4px 12px;border-radius:100px;">
          ${a.risparmio}
        </span>
      </div>`
        )
        .join("")}
    </div>

    <div style="background:#ee826d10;border:1px solid #ee826d25;border-radius:12px;padding:20px;margin-bottom:24px;">
      <p style="color:#ee826d;line-height:1.7;margin:0;font-weight:500;">${result.insight_finale}</p>
    </div>

    <div style="background:white;border-radius:12px;padding:24px;margin-bottom:32px;">
      <p style="color:#474747;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;opacity:0.4;margin:0 0 12px;">
        PROSSIMO PASSO
      </p>
      <p style="color:#474747;opacity:0.8;line-height:1.7;margin:0;">${result.prossimo_passo}</p>
    </div>

    <div style="text-align:center;padding:32px;background:#474747;border-radius:16px;margin-bottom:24px;">
      <p style="color:rgba(245,240,235,0.7);margin:0 0 20px;font-size:15px;">
        Vuoi approfondire questi risultati?<br>
        Parliamo 20 minuti, senza impegno.
      </p>
      <a href="https://lucavizza.it/contatti"
         style="display:inline-block;background:#ee826d;color:white;padding:14px 32px;border-radius:100px;text-decoration:none;font-weight:bold;font-size:16px;">
        Scrivimi ora →
      </a>
    </div>

    <p style="text-align:center;color:#474747;font-size:11px;opacity:0.3;margin:0;">
      Luca Vizza — lucavizza.it — Marketing Digitale &amp; AI Automation
    </p>
  </div>
</body>
</html>`;
}

function buildAdminEmailHtml(
  result: AuditResult,
  nome: string,
  emailAddress: string,
  settore: string,
  sliders: Sliders,
  sectorAnswers: Record<string, string>
): string {
  const totalOre = sliders.prenotazioni + sliders.preventivi + sliders.followup;
  const annualValue = (totalOre * sliders.tariffa * 52).toLocaleString("it-IT");

  return `
<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#474747;">
  <h2 style="color:#ee826d;">Nuovo audit completato</h2>

  <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
    <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Nome</td><td style="padding:8px;border-bottom:1px solid #eee;">${nome || "—"}</td></tr>
    <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Email</td><td style="padding:8px;border-bottom:1px solid #eee;">${emailAddress}</td></tr>
    <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Settore</td><td style="padding:8px;border-bottom:1px solid #eee;">${settore}</td></tr>
    <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Ore/sett.</td><td style="padding:8px;border-bottom:1px solid #eee;">${totalOre}h (prenotazioni: ${sliders.prenotazioni}h, preventivi: ${sliders.preventivi}h, follow-up: ${sliders.followup}h)</td></tr>
    <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Tariffa oraria</td><td style="padding:8px;border-bottom:1px solid #eee;">€${sliders.tariffa}/h</td></tr>
    <tr><td style="padding:8px;border-bottom:1px solid #eee;font-weight:bold;">Valore annuo</td><td style="padding:8px;border-bottom:1px solid #eee;color:#ee826d;font-weight:bold;">€${annualValue}</td></tr>
  </table>

  <h3>Risposte settore</h3>
  <ul>
    ${Object.entries(sectorAnswers)
      .map(([k, v]) => `<li><strong>${k}:</strong> ${v}</li>`)
      .join("")}
  </ul>

  <h3>Report generato</h3>
  <p><strong>Titolo:</strong> ${result.titolo}</p>
  <p><strong>Problema:</strong> ${result.problema_principale}</p>
  <ul>
    ${result.automazioni.map((a) => `<li><strong>${a.nome}</strong>: ${a.descrizione} (${a.risparmio})</li>`).join("")}
  </ul>
  <p><strong>Insight:</strong> ${result.insight_finale}</p>
  <p><strong>Prossimo passo:</strong> ${result.prossimo_passo}</p>

  <a href="mailto:${emailAddress}" style="display:inline-block;background:#ee826d;color:white;padding:12px 24px;border-radius:100px;text-decoration:none;font-weight:bold;margin-top:16px;">
    Rispondi a ${nome || emailAddress}
  </a>
</div>`;
}

export async function POST(req: NextRequest) {
  const { settore, sliders, sectorAnswers, nome, email } = await req.json();

  if (!settore || !sliders || !email) {
    return NextResponse.json({ error: "Dati mancanti" }, { status: 400 });
  }

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

  let result: AuditResult = FALLBACK_RESULT;

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1200,
      messages: [
        {
          role: "user",
          content: buildPrompt(settore, sliders, sectorAnswers ?? {}, nome ?? ""),
        },
      ],
    });

    const rawText =
      message.content[0]?.type === "text" ? message.content[0].text : "";

    const parsed = JSON.parse(extractJSON(rawText));
    if (parsed.titolo && parsed.automazioni?.length >= 3) {
      result = parsed as AuditResult;
    }
  } catch {
    // Use fallback result
  }

  if (process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL) {
    const resend = new Resend(process.env.RESEND_API_KEY);

    await Promise.allSettled([
      resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to: email,
        subject: `Il tuo report: ${result.titolo}`,
        html: buildUserEmailHtml(result, nome ?? "", settore, sliders),
      }),
      resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to: "make.luca.vizza@gmail.com",
        subject: `Nuovo audit: ${nome || email} — ${settore}`,
        html: buildAdminEmailHtml(
          result,
          nome ?? "",
          email,
          settore,
          sliders,
          sectorAnswers ?? {}
        ),
      }),
    ]);
  }

  return NextResponse.json(result);
}
