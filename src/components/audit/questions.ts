export const SETTORI = [
  "Ristorazione",
  "Turismo e ospitalità",
  "Benessere e salute",
  "Commercio",
  "Artigianato",
  "Servizi professionali",
  "Altro",
] as const;

export type Settore = (typeof SETTORI)[number];

export interface Question {
  id: string;
  text: string;
  type: "scale" | "select" | "text";
  options?: string[];
  scaleLabels?: [string, string];
}

const COMMON_QUESTIONS: Question[] = [
  {
    id: "automazione_attuale",
    text: "Attualmente usi strumenti digitali per gestire la tua attività?",
    type: "select",
    options: [
      "No, quasi tutto è fatto a mano o su carta",
      "Sì, uso qualche software base (gestionale, email)",
      "Sì, ho diversi strumenti ma non comunicano tra loro",
      "Sì, ho un sistema digitale abbastanza strutturato",
    ],
  },
  {
    id: "presenza_online",
    text: "Quanto è strutturata la tua presenza online?",
    type: "select",
    options: [
      "Non ho un sito web né social attivi",
      "Ho solo una pagina social, non aggiornata regolarmente",
      "Ho un sito e almeno un social attivo",
      "Ho sito, social, e qualche attività pubblicitaria online",
    ],
  },
  {
    id: "fiducia_ai",
    text: "Come descriveresti il tuo rapporto con l'intelligenza artificiale?",
    type: "select",
    options: [
      "Non so bene cosa sia o come funzioni",
      "Ne ho sentito parlare ma non l'ho mai usata",
      "Ci ho giocato un po' (ChatGPT, ecc.) ma non in modo strutturato",
      "La uso già per qualche attività nella mia azienda",
    ],
  },
  {
    id: "obiettivo_principale",
    text: "Qual è il tuo obiettivo principale in questo momento?",
    type: "select",
    options: [
      "Trovare nuovi clienti",
      "Mantenere i clienti attuali e aumentare la fidelizzazione",
      "Risparmiare tempo su attività ripetitive",
      "Migliorare la visibilità online",
      "Capire dove sono e cosa fare",
    ],
  },
];

const SECTOR_QUESTIONS: Record<Settore, Question[]> = {
  Ristorazione: [
    {
      id: "gestione_prenotazioni",
      text: "Come gestisci le prenotazioni?",
      type: "select",
      options: [
        "Solo telefono",
        "Telefono + WhatsApp",
        "Ho un sistema di prenotazione online",
        "Non accetto prenotazioni",
      ],
    },
  ],
  "Turismo e ospitalità": [
    {
      id: "canali_prenotazione",
      text: "Su quali canali ricevi prenotazioni?",
      type: "select",
      options: [
        "Solo diretto (telefono/email)",
        "Booking.com / Airbnb",
        "OTA + sito proprio",
        "Ho un sistema di channel manager",
      ],
    },
  ],
  "Benessere e salute": [
    {
      id: "gestione_appuntamenti",
      text: "Come gestisci gli appuntamenti?",
      type: "select",
      options: [
        "Agenda cartacea o telefono",
        "Agenda digitale personale",
        "Software specifico per il settore",
        "Sistema online dove i clienti prenotano da soli",
      ],
    },
  ],
  Commercio: [
    {
      id: "ecommerce",
      text: "Hai un canale di vendita online?",
      type: "select",
      options: [
        "No, vendo solo in negozio",
        "Ho marketplace (Amazon, eBay, ecc.)",
        "Ho un e-commerce proprio",
        "Ho sia marketplace che e-commerce",
      ],
    },
  ],
  Artigianato: [
    {
      id: "vendita_online",
      text: "Vendi i tuoi prodotti online?",
      type: "select",
      options: [
        "No, solo locale/passaparola",
        "Instagram / Facebook shop",
        "Etsy o marketplace di settore",
        "E-commerce proprio",
      ],
    },
  ],
  "Servizi professionali": [
    {
      id: "gestione_clienti",
      text: "Come gestisci i tuoi clienti e le loro pratiche?",
      type: "select",
      options: [
        "Email e file su PC/carta",
        "CRM base o Excel strutturato",
        "Software specifico di settore",
        "CRM avanzato con automazioni",
      ],
    },
  ],
  Altro: [
    {
      id: "sfida_principale",
      text: "Qual è la sfida principale della tua attività in questo momento?",
      type: "text",
    },
  ],
};

export function getQuestionsForSector(settore: Settore): Question[] {
  return [...COMMON_QUESTIONS, ...(SECTOR_QUESTIONS[settore] ?? [])];
}
