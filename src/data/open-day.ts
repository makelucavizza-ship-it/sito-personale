// Contenuti e macchina a stati per /open-day — Open Day ITS Cesena, 2026-09-24.
// Domande e slide dal documento "Discorso Open Day ITS Cesena — 1h15" e dalla scheda "Slide da proiettare (LIM)".

export interface QuestionOption {
  key: string;
  label: string;
}

export interface OpenDayQuestion {
  id: string;
  text: string;
  options: QuestionOption[];
  // Emoji mostrata SOLO in regia, accanto alla domanda — richiesta per le 3 domande conoscitive di apertura.
  emoji?: string;
}

// Le opzioni delle prime 3 domande (conoscitive) non sono elencate nel documento originale:
// sono state dedotte dal contesto (i commenti che Luca dà a voce dopo il grafico) — da rivedere/adattare se serve.
export const QUESTIONS: OpenDayQuestion[] = [
  {
    id: "q1-scuola",
    text: "Che scuola hai frequentato?",
    emoji: "🏫",
    options: [
      { key: "a", label: "Liceo scientifico" },
      { key: "b", label: "Liceo artistico" },
      { key: "c", label: "Liceo linguistico" },
      { key: "d", label: "Istituto tecnico turismo" },
      { key: "e", label: "Istituto alberghiero" },
      { key: "f", label: "Grafico pubblicitario" },
      { key: "g", label: "Istituto tecnico informatico" },
      { key: "h", label: "Altro" },
    ],
  },
  {
    id: "q2-eta",
    text: "Quanti anni hai?",
    emoji: "🎂",
    options: [
      { key: "a", label: "18-21 anni" },
      { key: "b", label: "22-25 anni" },
      { key: "c", label: "26-30 anni" },
      { key: "d", label: "31+ anni" },
    ],
  },
  {
    id: "q3-interessi",
    text: "Cosa ti interessa di più?",
    emoji: "❤️",
    options: [
      { key: "a", label: "Social" },
      { key: "b", label: "Grafica" },
      { key: "c", label: "Foto e video" },
      { key: "d", label: "Tecnologia" },
      { key: "e", label: "Viaggi" },
      { key: "f", label: "Comunicazione" },
      { key: "g", label: "Sport" },
      { key: "h", label: "Altro" },
    ],
  },
  {
    id: "q4-problema-turismo",
    text: "Secondo te qual è il problema più grande per un'attività turistica romagnola oggi?",
    options: [
      { key: "a", label: "Non si fa trovare online" },
      { key: "b", label: "Non sa raccontare l'esperienza" },
      { key: "c", label: "Non fa prenotare direttamente" },
      { key: "d", label: "Non usa l'intelligenza artificiale" },
    ],
  },
  {
    id: "q5-ambiti-lavorativi",
    text: "Quale di questi ambiti lavorativi ti incuriosisce di più?",
    options: [
      { key: "a", label: "Agenzia di marketing" },
      { key: "b", label: "Azienda, team marketing interno" },
      { key: "c", label: "Libero professionista" },
      { key: "d", label: "Ruoli legati all'intelligenza artificiale" },
    ],
  },
  {
    id: "q6-paura-project-work",
    text: "Cosa ti spaventerebbe di più nel realizzare un progetto vero per un cliente vero?",
    options: [
      { key: "a", label: "Non sapere da dove iniziare" },
      { key: "b", label: "Il rapporto con il cliente" },
      { key: "c", label: "Le scadenze" },
      { key: "d", label: "Parlare in pubblico / presentare il lavoro" },
    ],
  },
];

// Dopo la domanda con questo indice parte il blocco di slide con lo stesso indice in SLIDE_BLOCKS.
// Le prime 3 domande (conoscitive) non hanno slide dopo: si passa subito alla domanda successiva.
export const QUESTION_SLIDE_BLOCK: (number | null)[] = [null, null, null, 0, 1, 2];

export type SlideLayout = "keyword" | "quote" | "split" | "icon-row" | "role-list";

export interface KeywordSlide {
  layout: "keyword";
  keyword: string;
  lines?: string[];
  emoji?: string;
}

export interface QuoteSlide {
  layout: "quote";
  text: string;
}

export interface SplitSlide {
  layout: "split";
  heading?: string;
  left: { emoji: string; label: string };
  right: { emoji: string; label: string };
}

export interface IconRowSlide {
  layout: "icon-row";
  items: { emoji: string; label?: string }[];
  connectArrows?: boolean;
}

export interface RoleListSlide {
  layout: "role-list";
  title: string;
  roles: { emoji: string; label: string }[];
}

export type OpenDaySlide = KeywordSlide | QuoteSlide | SplitSlide | IconRowSlide | RoleListSlide;

export interface SlideBlock {
  title: string;
  slides: OpenDaySlide[];
}

export const SLIDE_BLOCKS: SlideBlock[] = [
  {
    title: "Di cosa hanno bisogno aziende, enti e professionisti",
    slides: [
      {
        layout: "split",
        heading: "Non solo riviera",
        left: { emoji: "🏖️", label: "Riviera" },
        right: { emoji: "🏔️", label: "Entroterra" },
      },
      {
        layout: "icon-row",
        items: [
          { emoji: "🔍", label: "Visibilità" },
          { emoji: "📣", label: "Racconto" },
          { emoji: "🛎", label: "Prenotazioni" },
          { emoji: "🤖", label: "AI" },
        ],
      },
    ],
  },
  {
    title: "I mestieri che puoi fare dopo il corso",
    slides: [
      {
        layout: "role-list",
        title: "In agenzia di marketing",
        roles: [
          { emoji: "📱", label: "Social Media" },
          { emoji: "🎯", label: "Advertising" },
          { emoji: "🔍", label: "SEO" },
          { emoji: "📊", label: "Strategist" },
        ],
      },
      {
        layout: "role-list",
        title: "In azienda, team marketing",
        roles: [
          { emoji: "🏨", label: "Marketing interno" },
          { emoji: "📸", label: "Content & Social" },
          { emoji: "💌", label: "CRM & Email" },
          { emoji: "📈", label: "Revenue & Analyst" },
        ],
      },
      {
        layout: "role-list",
        title: "Da liberi professionisti",
        roles: [
          { emoji: "💻", label: "Consulente digital" },
          { emoji: "🎨", label: "Grafico / video maker" },
          { emoji: "🌐", label: "Web designer" },
        ],
      },
      {
        layout: "role-list",
        title: "I nuovi ruoli con l'AI",
        roles: [
          { emoji: "🤖", label: "AI Content Specialist" },
          { emoji: "⚙️", label: "Marketing Automation" },
          { emoji: "🧭", label: "AI Workflow Designer" },
        ],
      },
      {
        layout: "split",
        heading: "Due strade in più",
        left: { emoji: "🎥", label: "Creator indipendente" },
        right: { emoji: "📝", label: "Bandi" },
      },
    ],
  },
  {
    title: "Project work",
    slides: [
      {
        layout: "icon-row",
        connectArrows: true,
        items: [
          { emoji: "🔍", label: "Analisi" },
          { emoji: "🎯", label: "Mercato" },
          { emoji: "👥", label: "Persone" },
          { emoji: "🧭", label: "Obiettivi" },
          { emoji: "📣", label: "Canali" },
          { emoji: "📊", label: "Risultati" },
        ],
      },
      { layout: "quote", text: "Il tuo primo cliente vero." },
    ],
  },
];

export const FINAL_SLIDE = {
  title: "Vi aspettiamo in aula!",
};

// Le prime 5 domande (tutte tranne l'ultima, sulla paura del project work) alimentano
// il prompt del messaggio personalizzato — riferite per id, non per indice, per restare
// valide anche se QUESTIONS viene riordinato.
export const AI_MESSAGE_QUESTION_IDS = QUESTIONS.slice(0, 5).map((q) => q.id);

// La sotto-sezione "nuovi ruoli con l'AI" dentro il blocco slide dei mestieri (indice 3
// su 5: agenzia, azienda, freelance, AI, creator/bandi) è il momento in cui lo smartphone
// mostra il messaggio personalizzato al posto di "Guarda lo schermo".
export const AI_MOMENT_BLOCK_INDEX = 1;
export const AI_MOMENT_SLIDE_INDEX = 3;

export function isAiMoment(step: OpenDayStep): boolean {
  return step.kind === "slide" && step.blockIndex === AI_MOMENT_BLOCK_INDEX && step.slideIndex === AI_MOMENT_SLIDE_INDEX;
}

// Riga fissa, sempre uguale, mai generata.
export const AI_MESSAGE_INTRO = "Noi AI sappiamo come siete fatti voi umani.";

// Mostrato se la generazione va in timeout o fallisce — mai uno spinner o un errore davanti alla classe.
export const AI_MESSAGE_FALLBACK = "Il tuo profilo dice che vuoi imparare facendo: qui lo farai davvero.";

// Stessi link social già usati nel Footer del sito.
export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/makevizza/",
  linkedin: "https://www.linkedin.com/in/luca-vizza",
};

// Un accento per blocco tematico, usato in regia per titoletti, icone e dettagli — mai come sfondo pieno.
export const BLOCK_ACCENTS = ["#3ad3ef", "#544fb3", "#ee826d"];

export type OpenDayStep =
  | { kind: "opening" }
  | { kind: "question"; questionIndex: number }
  | { kind: "slide"; blockIndex: number; slideIndex: number }
  | { kind: "final" };

export const STEPS: OpenDayStep[] = [
  { kind: "opening" },
  ...QUESTIONS.flatMap((_, i): OpenDayStep[] => {
    const steps: OpenDayStep[] = [{ kind: "question", questionIndex: i }];
    const blockIndex = QUESTION_SLIDE_BLOCK[i];
    if (blockIndex !== null) {
      steps.push(
        ...SLIDE_BLOCKS[blockIndex].slides.map((_, si): OpenDayStep => ({ kind: "slide", blockIndex, slideIndex: si }))
      );
    }
    return steps;
  }),
  { kind: "final" },
];

export function getStepAt(index: number): OpenDayStep {
  const clamped = Math.min(Math.max(index, 0), STEPS.length - 1);
  return STEPS[clamped];
}

export function clampStep(index: number): number {
  return Math.min(Math.max(index, 0), STEPS.length - 1);
}
