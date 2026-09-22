// Contenuti e macchina a stati per /open-day — Open Day ITS Cesena, 2026-09-22.
// Domande dal documento "Discorso Open Day ITS Cesena", slide dal documento "Slide da proiettare (Canva)".

export interface QuestionOption {
  key: string;
  label: string;
}

export interface OpenDayQuestion {
  id: string;
  text: string;
  options: QuestionOption[];
}

export const QUESTIONS: OpenDayQuestion[] = [
  {
    id: "q1-eta-its",
    text: "Secondo te, che età ha in media chi si iscrive a un percorso ITS?",
    options: [
      { key: "a", label: "18-19 anni, appena diplomati" },
      { key: "b", label: "Un mix di età diverse, anche persone che già lavorano" },
      { key: "c", label: "Non lo so" },
    ],
  },
  {
    id: "q2-lavoro-comune",
    text: "Secondo te, qual è il lavoro più comune per chi finisce questo corso?",
    options: [
      { key: "a", label: "Fare foto e video per i social" },
      { key: "b", label: "Gestire campagne pubblicitarie" },
      { key: "c", label: "Costruire siti e gestire dati" },
      { key: "d", label: "Non ne ho idea" },
    ],
  },
  {
    id: "q3-frequenza-social",
    text: "Quante volte a settimana pensi che un'azienda debba pubblicare sui social per funzionare davvero?",
    options: [
      { key: "a", label: "Tutti i giorni" },
      { key: "b", label: "2-3 volte, ma con costanza" },
      { key: "c", label: "Quando capita, se c'è tempo" },
      { key: "d", label: "Non lo so" },
    ],
  },
  {
    id: "q4-budget-ads",
    text: "Secondo te, quanto budget minimo serve per una campagna pubblicitaria efficace?",
    options: [
      { key: "a", label: "Serve un budget alto, migliaia di euro" },
      { key: "b", label: "Bastano anche poche decine o centinaia di euro se è mirata" },
      { key: "c", label: "Non serve budget, basta il contenuto" },
      { key: "d", label: "Non lo so" },
    ],
  },
  {
    id: "q5-clienti-persi",
    text: "Secondo te, cosa fa perdere più clienti a una piccola azienda?",
    options: [
      { key: "a", label: "Non avere abbastanza follower" },
      { key: "b", label: "Avere un sito lento o vecchio" },
      { key: "c", label: "Non rispondere in tempo alle richieste" },
      { key: "d", label: "Non lo so" },
    ],
  },
  {
    id: "q6-dopo-corso",
    text: "Dopo questo corso pensi che lavorerai:",
    options: [
      { key: "a", label: "Per una grande azienda" },
      { key: "b", label: "In proprio, come libero professionista" },
      { key: "c", label: "Non lo so ancora" },
    ],
  },
  {
    id: "q7-ai-lavoro",
    text: "L'intelligenza artificiale, nel lavoro che farai dopo questo corso, sarà:",
    options: [
      { key: "a", label: "Il tuo lavoro principale" },
      { key: "b", label: "Uno strumento che userai ogni giorno" },
      { key: "c", label: "Qualcosa che non ti riguarda" },
      { key: "d", label: "Non lo so" },
    ],
  },
];

export type SlideIcon =
  | "sparkles" | "buildings" | "palette" | "repeat" | "calendar" | "grid"
  | "message" | "megaphone" | "funnel" | "target" | "crm" | "numbers"
  | "stage" | "case-study" | "site" | "news" | "clock" | "quote";

export interface OpenDaySlide {
  keyword: string;
  lines?: string[];
  icon?: SlideIcon;
  image?: string;
  imageFit?: "cover" | "contain";
}

export interface SlideBlock {
  title: string;
  slides: OpenDaySlide[];
}

export const SLIDE_BLOCKS: SlideBlock[] = [
  {
    title: "Apertura e storia personale",
    slides: [
      { keyword: "18 → 34", lines: ["due età, un solo percorso"], icon: "sparkles" },
      {
        keyword: "Clienti veri",
        lines: ["CAPS · DLSolarClean · Famiglia Pecci", "Alessandra Spadaro · Novagulp"],
        icon: "buildings",
      },
    ],
  },
  {
    title: "Content, grafica e brand",
    slides: [
      { keyword: "CAPS Security & Services", lines: ["content reale, ogni settimana"], image: "/open-day/caps-instagram.png", imageFit: "contain" },
      { keyword: "Brand system", lines: ["colori · font · logo"], icon: "palette" },
      { keyword: "Coerenza", icon: "repeat" },
    ],
  },
  {
    title: "Social media management",
    slides: [
      { keyword: "Calendario editoriale", lines: ["si pianifica, non si improvvisa"], icon: "calendar" },
      { keyword: "Caotico → Pianificato", icon: "grid" },
      { keyword: "Rispondere conta", icon: "message" },
    ],
  },
  {
    title: "Advertising",
    slides: [
      { keyword: "Famiglia Pecci", lines: ["sponsorizzata attiva, ora"], icon: "megaphone" },
      { keyword: "Dalla ricerca al carrello", icon: "funnel" },
      { keyword: "Budget mirato, risultati veri", icon: "target" },
    ],
  },
  {
    title: "Web design e CRM",
    slides: [
      { keyword: "DLSolarClean", lines: ["da invisibile a online"], image: "/portfolio/dl-solar-clean-full.jpg" },
      { keyword: "Richiesta → Contatto → Follow-up → Cliente", icon: "crm" },
      { keyword: "100 richieste — 50 perse", icon: "numbers" },
    ],
  },
  {
    title: "Stage e portfolio",
    slides: [
      { keyword: "Febbraio → Maggio 2026", lines: ["stage in azienda"], icon: "stage" },
      { keyword: "Cliente → Problema → Soluzione → Risultato", icon: "case-study" },
      { keyword: "lucavizza.it", lines: ["il mio sito, il mio primo caso studio"], icon: "site" },
    ],
  },
  {
    title: "Intelligenza artificiale",
    slides: [
      { keyword: "\"Specie al silicio\"", lines: ["la notizia di oggi"], icon: "news" },
      { keyword: "1 settimana → 1 giorno", icon: "clock" },
      { keyword: "AI first, poi marketing.", icon: "quote" },
    ],
  },
];

export const FINAL_SLIDE = {
  title: "Vi aspettiamo in aula!",
  subtitle: "Luca Vizza — Consulente digital marketing e AI",
};

export type OpenDayStep =
  | { kind: "question"; questionIndex: number }
  | { kind: "slides"; blockIndex: number }
  | { kind: "final" };

export const STEPS: OpenDayStep[] = [
  ...QUESTIONS.flatMap((_, i): OpenDayStep[] => [
    { kind: "question", questionIndex: i },
    { kind: "slides", blockIndex: i },
  ]),
  { kind: "final" },
];

export function getStepAt(index: number): OpenDayStep {
  const clamped = Math.min(Math.max(index, 0), STEPS.length - 1);
  return STEPS[clamped];
}

export function clampStep(index: number): number {
  return Math.min(Math.max(index, 0), STEPS.length - 1);
}
