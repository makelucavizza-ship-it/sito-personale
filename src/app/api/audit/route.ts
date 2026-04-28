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

async function serperSearch(query: string, apiKey: string): Promise<string> {
  const res = await fetch("https://google.serper.dev/search", {
    method: "POST",
    headers: {
      "X-API-KEY": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ q: query, gl: "it", hl: "it", num: 5 }),
    signal: AbortSignal.timeout(7000),
  });
  if (!res.ok) throw new Error(`Serper ${res.status}`);
  const data = await res.json();
  const organic = (data.organic ?? []) as Array<{
    title: string;
    link: string;
    snippet?: string;
    sitelinks?: Array<{ title: string; link: string }>;
  }>;
  const knowledgeGraph = data.knowledgeGraph as
    | { title?: string; description?: string; rating?: number; reviews?: number; address?: string; website?: string }
    | undefined;

  const lines: string[] = [];
  if (knowledgeGraph?.description) {
    lines.push(
      `Scheda Google: ${knowledgeGraph.title ?? ""}` +
      (knowledgeGraph.rating ? ` — ★ ${knowledgeGraph.rating} (${knowledgeGraph.reviews ?? "?"} recensioni)` : "") +
      (knowledgeGraph.address ? ` — ${knowledgeGraph.address}` : "") +
      `\n${knowledgeGraph.description}` +
      (knowledgeGraph.website ? `\nSito: ${knowledgeGraph.website}` : "")
    );
  }
  lines.push(...organic.map((r) => `[${r.title}](${r.link})\n${r.snippet ?? ""}`));
  return lines.join("\n\n");
}

async function tavilySearch(query: string, apiKey: string): Promise<string> {
  const res = await fetch("https://api.tavily.com/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      api_key: apiKey,
      query,
      search_depth: "basic",
      include_answer: true,
      max_results: 5,
    }),
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) throw new Error(`Tavily ${res.status}`);
  const data = await res.json();
  const lines: string[] = [];
  if (data.answer) lines.push(`Risposta diretta: ${data.answer}`);
  const results = (data.results ?? []) as Array<{ title: string; url: string; content: string }>;
  lines.push(...results.map((r) => `[${r.title}](${r.url})\n${r.content?.slice(0, 400) ?? ""}`));
  return lines.join("\n\n");
}

async function jinaSearch(query: string): Promise<string> {
  const res = await fetch(
    `https://s.jina.ai/${encodeURIComponent(query)}`,
    {
      headers: {
        Accept: "application/json",
        "X-Retain-Images": "none",
        "X-No-Cache": "true",
      },
      signal: AbortSignal.timeout(12000),
    }
  );
  if (!res.ok) throw new Error(`Jina search ${res.status}`);
  const text = await res.text();
  return text.slice(0, 3000);
}

async function jinaReader(url: string): Promise<string> {
  const res = await fetch(`https://r.jina.ai/${url}`, {
    headers: {
      Accept: "text/plain",
      "X-Retain-Images": "none",
      "X-No-Cache": "true",
    },
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) throw new Error(`Jina reader ${res.status}`);
  const text = await res.text();
  return text.slice(0, 2000);
}

function extractFirstUrl(text: string): string | null {
  const match = text.match(/https?:\/\/[^\s\)\]"'<>]+/);
  return match ? match[0] : null;
}

async function scrapeBusinessInfo(
  nomeAttivita: string,
  citta: string
): Promise<string> {
  if (!nomeAttivita || !citta) return "";

  const parts: string[] = [];
  const query = `${nomeAttivita} ${citta}`;
  // Fallback query: solo prima parola significativa + città (cattura "Walter" da "Pizzeria Walter")
  const firstWord = nomeAttivita.split(" ").filter((w) => w.length > 3)[0] ?? nomeAttivita.split(" ")[0];
  const queryShort = `${firstWord} ${citta}`;
  const serperKey = process.env.SERPER_API_KEY;
  const tavilyKey = process.env.TAVILY_API_KEY;

  // 1a. Serper.dev — Google results + knowledge graph
  if (serperKey) {
    try {
      // Prova prima la query completa, poi quella corta se non trova knowledge graph
      const [reviewsFull, webFull] = await Promise.allSettled([
        serperSearch(`${query} recensioni`, serperKey),
        serperSearch(query, serperKey),
      ]);

      let reviewsText = reviewsFull.status === "fulfilled" ? reviewsFull.value : "";
      let webText = webFull.status === "fulfilled" ? webFull.value : "";

      // Se la query completa non ha trovato knowledge graph, prova con nome corto
      const hasKG = reviewsText.includes("Scheda Google:") || webText.includes("Scheda Google:");
      if (!hasKG && queryShort !== query) {
        const [r2, w2] = await Promise.allSettled([
          serperSearch(`${queryShort} recensioni`, serperKey),
          serperSearch(queryShort, serperKey),
        ]);
        if (r2.status === "fulfilled" && r2.value.includes("Scheda Google:")) reviewsText = r2.value;
        if (w2.status === "fulfilled" && w2.value.includes("Scheda Google:")) webText = w2.value;
        // usa comunque i risultati anche senza KG
        if (!reviewsText && r2.status === "fulfilled") reviewsText = r2.value;
        if (!webText && w2.status === "fulfilled") webText = w2.value;
      }

      if (reviewsText) parts.push(`Recensioni e presenza:\n${reviewsText}`);

      // Cerca sito web tra i risultati e scrapa con Jina
      const websiteUrl = extractFirstUrl(webText);
      if (websiteUrl && !websiteUrl.includes("google.") && !websiteUrl.includes("tripadvisor.com/Search")) {
        try {
          const content = await jinaReader(websiteUrl);
          parts.push(`Contenuto sito (${websiteUrl}):\n${content}`);
        } catch { /* skip */ }
      } else if (webText) {
        parts.push(`Risultati web:\n${webText}`);
      }
    } catch { /* fall through */ }
  }

  // 1b. Tavily (1.000 req/mese free)
  if (parts.length === 0 && tavilyKey) {
    try {
      const result = await tavilySearch(`${query} recensioni sito web presenza online`, tavilyKey);
      if (result) parts.push(`Risultati ricerca:\n${result}`);
    } catch { /* fall through */ }
  }

  // 2. Jina AI Search (free, no key)
  if (parts.length === 0) {
    try {
      const jinaResult = await jinaSearch(`${query} recensioni sito web presenza online`);
      if (jinaResult.trim()) {
        parts.push(`Risultati ricerca online:\n${jinaResult}`);
        const foundUrl = extractFirstUrl(jinaResult);
        if (foundUrl && !foundUrl.includes("jina.ai") && !foundUrl.includes("google.")) {
          try {
            const content = await jinaReader(foundUrl);
            parts.push(`Contenuto pagina trovata:\n${content}`);
          } catch { /* skip */ }
        }
      }
    } catch { /* fall through */ }
  }

  // 3. DuckDuckGo Instant Answer — last resort
  if (parts.length === 0) {
    try {
      const res = await fetch(
        `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`,
        { signal: AbortSignal.timeout(5000) }
      );
      if (res.ok) {
        const data = await res.json();
        if (data.Abstract) parts.push(`Descrizione: ${data.Abstract}`);
        if (data.Answer) parts.push(`Info: ${data.Answer}`);
      }
    } catch { /* ignore */ }
  }

  if (parts.length === 0) {
    return `Ricerca web: Nessuna informazione trovata online per "${nomeAttivita}" a ${citta}. L'attività potrebbe avere poca o nessuna presenza digitale.`;
  }

  return `=== DATI TROVATI ONLINE ===\n${parts.join("\n\n")}`;
}

function buildPrompt(
  settore: string,
  sliders: Sliders,
  sectorAnswers: Record<string, string>,
  nome: string,
  nomeAttivita: string,
  citta: string,
  webInfo: string
): string {
  const totalOre = sliders.prenotazioni + sliders.preventivi + sliders.followup;
  const annualValue = totalOre * sliders.tariffa * 52;

  const answersText = Object.entries(sectorAnswers)
    .map(([k, v]) => `- ${k}: ${v}`)
    .join("\n");

  const oggi = new Date().toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" });

  return `Sei Luca Vizza, esperto di marketing digitale e AI automation per PMI italiane.
Data di oggi: ${oggi}. Usa questa data se citi periodi, stagioni o aggiornamenti recenti.

Hai appena analizzato la situazione di ${nome || "un imprenditore"}${nomeAttivita ? `, titolare di "${nomeAttivita}"` : ""}${citta ? ` a ${citta}` : ""}, settore: ${settore}.

DATI CALCOLATORE:
- Ore/settimana su prenotazioni: ${sliders.prenotazioni}h
- Ore/settimana su preventivi: ${sliders.preventivi}h
- Ore/settimana su follow-up: ${sliders.followup}h
- Valore orario: €${sliders.tariffa}
- Totale ore perse/anno: ${totalOre * 52}h
- Valore economico annuo: €${annualValue.toLocaleString("it-IT")}

RISPOSTE ALLE DOMANDE:
${answersText}

${webInfo ? `${webInfo}\n` : ""}
ISTRUZIONI IMPORTANTI:
1. Usa il nome "${nomeAttivita || nome}" nella risposta — rendila ultra-personalizzata
2. Se hai trovato dati online (recensioni, sito, social), citali ESPLICITAMENTE: es. "Ho visto che hai X recensioni su Google" o "Sul tuo sito non c'è un sistema di prenotazione"
3. Se NON hai trovato dati online, citalo come problema: "Non ti ho trovato facilmente online — questo già dice qualcosa"
4. Usa i numeri reali del calcolatore (€${annualValue.toLocaleString("it-IT")}/anno, ${totalOre}h/settimana)
5. Sii diretto e specifico per il settore ${settore} a ${citta || "Italia"}
6. Scrivi come parleresti a questa persona specifica, non come un report generico

Rispondi SOLO con JSON valido, nient'altro.

{
  "titolo": "Titolo specifico per ${nomeAttivita || nome} — usa numeri reali e/o riferimenti a ciò che hai trovato online",
  "problema_principale": "2-3 frasi MOLTO specifiche. Cita la città, il nome attività, i dati trovati online, le ore perse. No genericità.",
  "automazioni": [
    {
      "nome": "Nome strumento concreto",
      "descrizione": "Come funziona SPECIFICAMENTE per ${nomeAttivita || "questa attività"} a ${citta || "questa città"}. Cita contesto reale se disponibile.",
      "risparmio": "Stima concreta es: '3h/settimana = €${sliders.tariffa * 3 * 52}/anno'"
    },
    { "nome": "...", "descrizione": "...", "risparmio": "..." },
    { "nome": "...", "descrizione": "...", "risparmio": "..." }
  ],
  "insight_finale": "1-2 frasi: verità scomoda basata su ciò che hai trovato (o non trovato) online. Prima persona come Luca.",
  "prossimo_passo": "Specifico per questa situazione. Puoi menzionare lucavizza.it/contatti"
}`;
}

function buildUserEmailHtml(
  result: AuditResult,
  nome: string,
  nomeAttivita: string,
  citta: string,
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
      <p style="color:#ee826d;font-size:12px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;margin:0 0 12px;">IL TUO REPORT</p>
      <h1 style="color:#f5f0eb;font-size:24px;margin:0 0 8px;line-height:1.3;">${result.titolo}</h1>
      <p style="color:rgba(245,240,235,0.5);font-size:13px;margin:0;">${nomeAttivita || nome}${citta ? ` · ${citta}` : ""} · ${settore}</p>
    </div>

    <div style="background:#ee826d15;border:1px solid #ee826d30;border-radius:12px;padding:20px;margin-bottom:24px;display:flex;justify-content:space-between;flex-wrap:wrap;gap:16px;">
      <div>
        <p style="color:#474747;font-size:12px;margin:0 0 4px;opacity:0.5;">Tempo perso/anno</p>
        <p style="color:#474747;font-size:22px;font-weight:bold;margin:0;">${totalOre * 52} ore</p>
      </div>
      <div>
        <p style="color:#474747;font-size:12px;margin:0 0 4px;opacity:0.5;">Valore economico</p>
        <p style="color:#ee826d;font-size:22px;font-weight:bold;margin:0;">€${annualValue}/anno</p>
      </div>
    </div>

    <div style="background:white;border-radius:12px;padding:24px;margin-bottom:24px;">
      <p style="color:#474747;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;opacity:0.4;margin:0 0 12px;">SITUAZIONE ATTUALE</p>
      <p style="color:#474747;opacity:0.8;line-height:1.7;margin:0;">${result.problema_principale}</p>
    </div>

    <div style="margin-bottom:24px;">
      <p style="color:#474747;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;opacity:0.4;margin:0 0 16px;">LE 3 AUTOMAZIONI PER TE</p>
      ${result.automazioni.map((a, i) => `
      <div style="background:white;border-radius:12px;padding:20px;margin-bottom:12px;">
        <p style="color:#474747;font-weight:bold;margin:0 0 6px;">${i + 1}. ${a.nome}</p>
        <p style="color:#474747;opacity:0.65;font-size:14px;line-height:1.6;margin:0 0 10px;">${a.descrizione}</p>
        <span style="background:#3ad3ef15;color:#3ad3ef;font-size:12px;font-weight:bold;padding:4px 12px;border-radius:100px;">${a.risparmio}</span>
      </div>`).join("")}
    </div>

    <div style="background:#ee826d10;border:1px solid #ee826d25;border-radius:12px;padding:20px;margin-bottom:24px;">
      <p style="color:#ee826d;line-height:1.7;margin:0;font-weight:500;">${result.insight_finale}</p>
    </div>

    <div style="background:white;border-radius:12px;padding:24px;margin-bottom:32px;">
      <p style="color:#474747;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;opacity:0.4;margin:0 0 12px;">PROSSIMO PASSO</p>
      <p style="color:#474747;opacity:0.8;line-height:1.7;margin:0;">${result.prossimo_passo}</p>
    </div>

    <div style="text-align:center;padding:32px;background:#474747;border-radius:16px;margin-bottom:24px;">
      <p style="color:rgba(245,240,235,0.7);margin:0 0 20px;font-size:15px;">Vuoi approfondire questi risultati?<br>Parliamo 20 minuti, senza impegno.</p>
      <a href="https://lucavizza.it/contatti" style="display:inline-block;background:#ee826d;color:white;padding:14px 32px;border-radius:100px;text-decoration:none;font-weight:bold;font-size:16px;">Scrivimi ora →</a>
    </div>

    <p style="text-align:center;color:#474747;font-size:11px;opacity:0.3;margin:0;">Luca Vizza — lucavizza.it — Marketing Digitale &amp; AI Automation</p>
  </div>
</body>
</html>`;
}

function buildAdminEmailHtml(
  result: AuditResult,
  nome: string,
  nomeAttivita: string,
  citta: string,
  emailAddress: string,
  settore: string,
  sliders: Sliders,
  sectorAnswers: Record<string, string>,
  webInfo: string
): string {
  const totalOre = sliders.prenotazioni + sliders.preventivi + sliders.followup;
  const annualValue = (totalOre * sliders.tariffa * 52).toLocaleString("it-IT");
  const now = new Date().toLocaleString("it-IT", { dateStyle: "full", timeStyle: "short" });

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f5f0eb;font-family:Arial,sans-serif;">
<div style="max-width:600px;margin:0 auto;padding:32px 24px;">

  <!-- Header -->
  <div style="background:#474747;border-radius:16px;padding:28px 32px;margin-bottom:24px;">
    <p style="color:#ee826d;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;margin:0 0 8px;">NUOVO CLIENTE</p>
    <h1 style="color:#f5f0eb;font-size:22px;margin:0 0 4px;">${nome || "Anonimo"}${nomeAttivita ? ` — ${nomeAttivita}` : ""}</h1>
    <p style="color:rgba(245,240,235,0.5);font-size:13px;margin:0;">${now}</p>
  </div>

  <!-- CONTATTI (focus principale) -->
  <div style="background:white;border-radius:12px;padding:24px;margin-bottom:16px;border-left:4px solid #ee826d;">
    <p style="color:#474747;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;opacity:0.4;margin:0 0 16px;">📋 DATI DI CONTATTO</p>
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#474747;opacity:0.5;font-size:13px;width:120px;">Nome</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:bold;font-size:15px;">${nome || "—"}</td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#474747;opacity:0.5;font-size:13px;">Email</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:15px;"><a href="mailto:${emailAddress}" style="color:#ee826d;font-weight:bold;text-decoration:none;">${emailAddress}</a></td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#474747;opacity:0.5;font-size:13px;">Attività</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:15px;">${nomeAttivita || "—"}</td></tr>
      <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;color:#474747;opacity:0.5;font-size:13px;">Città</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:15px;">${citta || "—"}</td></tr>
      <tr><td style="padding:10px 0;color:#474747;opacity:0.5;font-size:13px;">Settore</td><td style="padding:10px 0;font-size:15px;">${settore}</td></tr>
    </table>
    <a href="mailto:${emailAddress}" style="display:inline-block;background:#ee826d;color:white;padding:12px 28px;border-radius:100px;text-decoration:none;font-weight:bold;margin-top:20px;font-size:14px;">
      ✉️ Rispondi a ${nome || emailAddress}
    </a>
  </div>

  <!-- NUMERI CALCOLATORE -->
  <div style="background:white;border-radius:12px;padding:24px;margin-bottom:16px;">
    <p style="color:#474747;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;opacity:0.4;margin:0 0 16px;">📊 CALCOLATORE</p>
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;color:#474747;opacity:0.5;font-size:13px;width:120px;">Prenotazioni</td><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">${sliders.prenotazioni}h/sett.</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;color:#474747;opacity:0.5;font-size:13px;">Preventivi</td><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">${sliders.preventivi}h/sett.</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;color:#474747;opacity:0.5;font-size:13px;">Follow-up</td><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">${sliders.followup}h/sett.</td></tr>
      <tr><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;color:#474747;opacity:0.5;font-size:13px;">Tariffa oraria</td><td style="padding:8px 0;border-bottom:1px solid #f0f0f0;">€${sliders.tariffa}/h</td></tr>
      <tr><td style="padding:8px 0;color:#474747;opacity:0.5;font-size:13px;">Valore annuo</td><td style="padding:8px 0;color:#ee826d;font-weight:bold;font-size:18px;">€${annualValue}/anno</td></tr>
    </table>
  </div>

  <!-- RISPOSTE SETTORE -->
  ${Object.keys(sectorAnswers).length > 0 ? `
  <div style="background:white;border-radius:12px;padding:24px;margin-bottom:16px;">
    <p style="color:#474747;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;opacity:0.4;margin:0 0 16px;">💬 RISPOSTE</p>
    ${Object.entries(sectorAnswers).map(([k, v]) => `
    <div style="margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid #f0f0f0;">
      <p style="color:#474747;opacity:0.5;font-size:12px;margin:0 0 4px;">${k}</p>
      <p style="color:#474747;margin:0;font-size:14px;">${v}</p>
    </div>`).join("")}
  </div>` : ""}

  <!-- REPORT AI -->
  <div style="background:white;border-radius:12px;padding:24px;margin-bottom:16px;">
    <p style="color:#474747;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;opacity:0.4;margin:0 0 12px;">🤖 REPORT GENERATO</p>
    <p style="font-weight:bold;color:#474747;margin:0 0 8px;">${result.titolo}</p>
    <p style="color:#474747;opacity:0.7;font-size:14px;line-height:1.6;margin:0 0 16px;">${result.problema_principale}</p>
    ${result.automazioni.map((a, i) => `<p style="font-size:13px;color:#474747;margin:0 0 6px;"><strong>${i + 1}. ${a.nome}</strong> — ${a.risparmio}</p>`).join("")}
  </div>

  ${webInfo && !webInfo.includes("Nessuna informazione") ? `
  <div style="background:#f9f9f7;border-radius:12px;padding:20px;margin-bottom:16px;">
    <p style="color:#474747;font-size:11px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;opacity:0.4;margin:0 0 12px;">🌐 DATI WEB</p>
    <pre style="font-size:12px;white-space:pre-wrap;color:#474747;opacity:0.7;margin:0;">${webInfo.substring(0, 600)}${webInfo.length > 600 ? "…" : ""}</pre>
  </div>` : ""}

  <p style="text-align:center;color:#474747;font-size:11px;opacity:0.3;margin:24px 0 0;">lucavizza.it — Calcolatore Gratuito</p>
</div>
</body></html>`;
}

export async function POST(req: NextRequest) {
  const { settore, sliders, sectorAnswers, nome, nomeAttivita, citta, email } =
    await req.json();

  if (!settore || !sliders || !email) {
    return NextResponse.json({ error: "Dati mancanti" }, { status: 400 });
  }

  // Run web scraping and Claude call in parallel
  const [webInfo] = await Promise.all([
    scrapeBusinessInfo(nomeAttivita ?? "", citta ?? ""),
  ]);

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! });

  let result: AuditResult = FALLBACK_RESULT;

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1500,
      messages: [
        {
          role: "user",
          content: buildPrompt(
            settore,
            sliders,
            sectorAnswers ?? {},
            nome ?? "",
            nomeAttivita ?? "",
            citta ?? "",
            webInfo
          ),
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
    // use fallback
  }

  const resendKey = process.env.RESEND_API_KEY;
  const resendFrom = process.env.RESEND_FROM_EMAIL;

  if (resendKey && resendKey !== "placeholder" && resendFrom && resendFrom !== "placeholder") {
    const resend = new Resend(resendKey);

    const emailResults = await Promise.allSettled([
      resend.emails.send({
        from: resendFrom,
        to: email,
        subject: `Il tuo report: ${result.titolo}`,
        html: buildUserEmailHtml(result, nome ?? "", nomeAttivita ?? "", citta ?? "", settore, sliders),
      }),
      resend.emails.send({
        from: resendFrom,
        to: "make.luca.vizza@gmail.com",
        subject: "Nuovo Cliente per Luca",
        html: buildAdminEmailHtml(result, nome ?? "", nomeAttivita ?? "", citta ?? "", email, settore, sliders, sectorAnswers ?? {}, webInfo),
      }),
    ]);

    emailResults.forEach((r, i) => {
      if (r.status === "rejected") {
        console.error(`Email ${i === 0 ? "utente" : "admin"} fallita:`, r.reason);
      }
    });
  } else {
    console.warn("Resend non configurato — email non inviate. Verifica RESEND_API_KEY e RESEND_FROM_EMAIL in Vercel.");
  }

  return NextResponse.json(result);
}
