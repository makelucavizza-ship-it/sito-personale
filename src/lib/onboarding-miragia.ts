// Onboarding Miragià: tipi, limiti e validazione condivisi tra il form (client)
// e la route /api/onboarding/miragia (server). Nessuna dipendenza da Node o dal DOM.

export const CALENDAR_TYPES = [
  "Evento in negozio",
  "Chiusura",
  "Arrivo merce",
  "Promozione",
  "Altro",
] as const;

export const PHOTO_TOOLS = [
  "Smartphone",
  "Fotocamera",
  "Luce naturale da finestra",
  "Lampada o luce LED",
  "Sfondo bianco o neutro",
  "Espositore o busto",
  "Altro",
] as const;

export const PRODUCT_SLOTS = 5;
export const VIDEO_SLOTS = 4;

export const LIMITS = {
  nome: 80,
  short: 200, // username, password, "altro"
  note: 2000,
  descrizione: 300,
  prodotto: 300,
  spazio: 1000,
  info: 5000,
  url: 500,
  commento: 500,
  calendarRows: 60,
} as const;

export interface CalendarRow {
  id: string;
  start: string; // YYYY-MM-DD
  end: string; // YYYY-MM-DD o ""
  tipo: string;
  descrizione: string;
}

export interface VideoRow {
  url: string;
  commento: string;
}

export interface OnboardingData {
  nome: string;
  sms: { user: string; password: string; note: string };
  calendario: CalendarRow[];
  wp: { loginUrl: string; user: string; password: string; note: string };
  prodotti: string[];
  foto: { strumenti: string[]; altro: string; spazio: string };
  info: string;
  video: VideoRow[];
}

export function emptyCalendarRow(): CalendarRow {
  return {
    id: Math.random().toString(36).slice(2, 10),
    start: "",
    end: "",
    tipo: CALENDAR_TYPES[0],
    descrizione: "",
  };
}

export function initialData(): OnboardingData {
  return {
    nome: "Catia",
    sms: { user: "", password: "", note: "" },
    calendario: [emptyCalendarRow()],
    wp: { loginUrl: "", user: "", password: "", note: "" },
    prodotti: Array(PRODUCT_SLOTS).fill(""),
    foto: { strumenti: [], altro: "", spazio: "" },
    info: "",
    video: Array.from({ length: VIDEO_SLOTS }, () => ({ url: "", commento: "" })),
  };
}

// ---------- Step ----------

export const STEPS = [
  { id: "sms", title: "Accesso a SMSHosting" },
  { id: "calendario", title: "Il calendario del negozio fino a fine anno" },
  { id: "wp", title: "Accesso al sito WordPress" },
  { id: "prodotti", title: "I prodotti per la formazione" },
  { id: "foto", title: "Come e dove fotograferai" },
  { id: "info", title: "Le informazioni che hai su ogni gioiello" },
  { id: "video", title: "Video che ti piacciono" },
] as const;

export type StepId = (typeof STEPS)[number]["id"];

const filled = (s: string | undefined) => !!s && s.trim().length > 0;

export function isCalendarRowEmpty(r: CalendarRow): boolean {
  return !filled(r.start) && !filled(r.end) && !filled(r.descrizione);
}

export function isStepEmpty(id: StepId, d: OnboardingData): boolean {
  switch (id) {
    case "sms":
      return !filled(d.sms.user) && !filled(d.sms.password) && !filled(d.sms.note);
    case "calendario":
      return d.calendario.every(isCalendarRowEmpty);
    case "wp":
      return (
        !filled(d.wp.loginUrl) && !filled(d.wp.user) && !filled(d.wp.password) && !filled(d.wp.note)
      );
    case "prodotti":
      return d.prodotti.every((p) => !filled(p));
    case "foto":
      return d.foto.strumenti.length === 0 && !filled(d.foto.altro) && !filled(d.foto.spazio);
    case "info":
      return !filled(d.info);
    case "video":
      return d.video.every((v) => !filled(v.url) && !filled(v.commento));
  }
}

// ---------- URL ----------

/** Aggiunge https:// se manca, poi controlla che sia un URL http(s) plausibile. */
export function normalizeUrl(raw: string): string | null {
  const s = raw.trim();
  if (!s) return "";
  const withScheme = /^[a-z][a-z0-9+.-]*:\/\//i.test(s) ? s : `https://${s}`;
  try {
    const u = new URL(withScheme);
    if (u.protocol !== "http:" && u.protocol !== "https:") return null;
    if (!u.hostname.includes(".") || /\s/.test(s)) return null;
    return u.toString();
  } catch {
    return null;
  }
}

// ---------- Validazione ----------

export interface ValidationIssue {
  step: StepId | "nome";
  message: string;
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function isValidDate(s: string): boolean {
  if (!DATE_RE.test(s)) return false;
  const d = new Date(`${s}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === s;
}

/** Problemi che bloccano l'invio. Usata sia nel riepilogo sia lato server. */
export function findIssues(d: OnboardingData): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const tooLong = (step: ValidationIssue["step"], label: string, v: string, max: number) => {
    if (v.length > max) issues.push({ step, message: `${label}: massimo ${max} caratteri` });
  };

  if (!filled(d.nome)) issues.push({ step: "nome", message: "Manca il nome" });
  tooLong("nome", "Nome", d.nome, LIMITS.nome);

  tooLong("sms", "Email/username", d.sms.user, LIMITS.short);
  tooLong("sms", "Password", d.sms.password, LIMITS.short);
  tooLong("sms", "Note", d.sms.note, LIMITS.note);

  if (d.calendario.length > LIMITS.calendarRows) {
    issues.push({ step: "calendario", message: `Massimo ${LIMITS.calendarRows} date` });
  }
  d.calendario.forEach((r, i) => {
    if (isCalendarRowEmpty(r)) return;
    const n = i + 1;
    if (!filled(r.start)) {
      issues.push({ step: "calendario", message: `Riga ${n}: manca la data di inizio` });
    } else if (!isValidDate(r.start)) {
      issues.push({ step: "calendario", message: `Riga ${n}: data di inizio non valida` });
    }
    if (filled(r.end)) {
      if (!isValidDate(r.end)) {
        issues.push({ step: "calendario", message: `Riga ${n}: data di fine non valida` });
      } else if (filled(r.start) && r.end < r.start) {
        issues.push({ step: "calendario", message: `Riga ${n}: la fine è prima dell'inizio` });
      }
    }
    if (!(CALENDAR_TYPES as readonly string[]).includes(r.tipo)) {
      issues.push({ step: "calendario", message: `Riga ${n}: tipo non valido` });
    }
    tooLong("calendario", `Riga ${n}, descrizione`, r.descrizione, LIMITS.descrizione);
  });

  if (filled(d.wp.loginUrl) && normalizeUrl(d.wp.loginUrl) === null) {
    issues.push({ step: "wp", message: "L'indirizzo della pagina di login non sembra un link valido" });
  }
  tooLong("wp", "Indirizzo di login", d.wp.loginUrl, LIMITS.url);
  tooLong("wp", "Username", d.wp.user, LIMITS.short);
  tooLong("wp", "Password", d.wp.password, LIMITS.short);
  tooLong("wp", "Note", d.wp.note, LIMITS.note);

  d.prodotti.forEach((p, i) => tooLong("prodotti", `Prodotto ${i + 1}`, p, LIMITS.prodotto));

  d.foto.strumenti.forEach((s) => {
    if (!(PHOTO_TOOLS as readonly string[]).includes(s)) {
      issues.push({ step: "foto", message: "Opzione non valida" });
    }
  });
  tooLong("foto", "Altro", d.foto.altro, LIMITS.short);
  tooLong("foto", "Spazio del negozio", d.foto.spazio, LIMITS.spazio);

  tooLong("info", "Informazioni", d.info, LIMITS.info);

  d.video.forEach((v, i) => {
    if (filled(v.url) && normalizeUrl(v.url) === null) {
      issues.push({ step: "video", message: `Video ${i + 1}: il link non sembra valido` });
    }
    tooLong("video", `Video ${i + 1}, link`, v.url, LIMITS.url);
    tooLong("video", `Video ${i + 1}, commento`, v.commento, LIMITS.commento);
  });

  return issues;
}

// ---------- Parsing lato server ----------

const str = (v: unknown): string => (typeof v === "string" ? v : "");
const obj = (v: unknown): Record<string, unknown> =>
  v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : {};
const arr = (v: unknown): unknown[] => (Array.isArray(v) ? v : []);

/** Ricostruisce i dati da un JSON non fidato, tenendo solo i campi attesi. */
export function parseData(raw: unknown): OnboardingData {
  const r = obj(raw);
  const sms = obj(r.sms);
  const wp = obj(r.wp);
  const foto = obj(r.foto);
  return {
    nome: str(r.nome),
    sms: { user: str(sms.user), password: str(sms.password), note: str(sms.note) },
    calendario: arr(r.calendario)
      .slice(0, LIMITS.calendarRows + 1)
      .map((x) => {
        const row = obj(x);
        return {
          id: "",
          start: str(row.start),
          end: str(row.end),
          tipo: str(row.tipo),
          descrizione: str(row.descrizione),
        };
      }),
    wp: {
      loginUrl: str(wp.loginUrl),
      user: str(wp.user),
      password: str(wp.password),
      note: str(wp.note),
    },
    prodotti: Array.from({ length: PRODUCT_SLOTS }, (_, i) => str(arr(r.prodotti)[i])),
    foto: {
      strumenti: Array.from(new Set(arr(foto.strumenti).map(str))).slice(0, PHOTO_TOOLS.length + 1),
      altro: str(foto.altro),
      spazio: str(foto.spazio),
    },
    info: str(r.info),
    video: Array.from({ length: VIDEO_SLOTS }, (_, i) => {
      const v = obj(arr(r.video)[i]);
      return { url: str(v.url), commento: str(v.commento) };
    }),
  };
}

// ---------- Testo dell'email ----------

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

function line(label: string, value: string): string {
  const v = value.trim();
  if (!v) return `${label}: —`;
  // Testi su più righe: vanno a capo e rientrano sotto l'etichetta
  if (v.includes("\n")) return `${label}:\n${v.replace(/\r\n/g, "\n").replace(/^/gm, "  ")}`;
  return `${label}: ${v}`;
}

function stepBody(id: StepId, d: OnboardingData): string {
  switch (id) {
    case "sms":
      return [
        line("Email/username", d.sms.user),
        line("Password", d.sms.password),
        line("Note", d.sms.note),
      ].join("\n");
    case "calendario": {
      const rows = d.calendario
        .filter((r) => !isCalendarRowEmpty(r))
        .sort((a, b) => (a.start + a.end).localeCompare(b.start + b.end));
      return rows
        .map((r, i) => {
          const when = r.end && r.end !== r.start
            ? `dal ${formatDate(r.start)} al ${formatDate(r.end)}`
            : formatDate(r.start);
          const desc = r.descrizione.trim();
          return `${i + 1}. ${when} · ${r.tipo}${desc ? `\n   ${desc}` : ""}`;
        })
        .join("\n");
    }
    case "wp":
      return [
        line("Pagina di login", normalizeUrl(d.wp.loginUrl) || d.wp.loginUrl),
        line("Username", d.wp.user),
        line("Password", d.wp.password),
        line("Note", d.wp.note),
      ].join("\n");
    case "prodotti":
      return d.prodotti
        .map((p, i) => ({ p: p.trim(), i }))
        .filter(({ p }) => p)
        .map(({ p, i }) => `Prodotto ${i + 1}: ${p}`)
        .join("\n");
    case "foto": {
      const tools = d.foto.strumenti
        .filter((s) => s !== "Altro")
        .concat(
          d.foto.strumenti.includes("Altro") || d.foto.altro.trim()
            ? [`Altro${d.foto.altro.trim() ? ` (${d.foto.altro.trim()})` : ""}`]
            : [],
        );
      return [
        line("Cosa ha a disposizione", tools.join(", ")),
        line("Spazio del negozio per gli scatti", d.foto.spazio),
      ].join("\n");
    }
    case "info":
      return d.info.trim().replace(/\r\n/g, "\n");
    case "video":
      return d.video
        .map((v, i) => ({ v, i }))
        .filter(({ v }) => v.url.trim() || v.commento.trim())
        .map(({ v, i }) =>
          [
            `Video ${i + 1}`,
            `  Link: ${v.url.trim() ? normalizeUrl(v.url) || v.url.trim() : "—"}`,
            `  Cosa le piace: ${v.commento.trim() || "—"}`,
          ].join("\n"),
        )
        .join("\n\n");
  }
}

export function buildEmailText(d: OnboardingData, sentAt: Date): string {
  const when = sentAt.toLocaleString("it-IT", {
    timeZone: "Europe/Rome",
    dateStyle: "long",
    timeStyle: "short",
  });
  const out: string[] = [
    "ONBOARDING MIRAGIÀ",
    `Risposte di: ${d.nome.trim()}`,
    `Inviato il: ${when}`,
  ];
  const empty = STEPS.filter((s) => isStepEmpty(s.id, d));
  if (empty.length) {
    out.push(`Sezioni non compilate: ${empty.map((s) => STEPS.indexOf(s) + 1).join(", ")}`);
  }
  STEPS.forEach((s, i) => {
    const title = `${i + 1} · ${s.title}`;
    out.push("", "=".repeat(Math.min(title.length, 60)), title, "=".repeat(Math.min(title.length, 60)));
    out.push(isStepEmpty(s.id, d) ? "(non compilato)" : stepBody(s.id, d));
  });
  return out.join("\n") + "\n";
}
