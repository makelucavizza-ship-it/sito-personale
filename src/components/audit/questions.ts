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
  type: "select" | "text";
  options?: string[];
}

export const SECTOR_QUESTIONS: Record<Settore, Question[]> = {
  Ristorazione: [
    {
      id: "gestione_prenotazioni",
      text: "Come gestisci le prenotazioni oggi?",
      type: "select",
      options: [
        "Solo telefono",
        "Telefono + WhatsApp",
        "App (TheFork, ecc.)",
        "Non accetto prenotazioni",
      ],
    },
    {
      id: "telefonate_fuori_orario",
      text: "Rispondi anche alle telefonate fuori orario?",
      type: "select",
      options: [
        "Sì, sempre",
        "Solo a volte",
        "No, le perdo",
        "Ho un voicemail",
      ],
    },
    {
      id: "presenza_online",
      text: "I tuoi clienti sanno che esisti online?",
      type: "select",
      options: [
        "Ho sito + Google Business",
        "Solo social",
        "Solo Google Business",
        "No, mi trovano solo di persona",
      ],
    },
  ],
  "Turismo e ospitalità": [
    {
      id: "canali_prenotazione",
      text: "Su quanti canali ricevi prenotazioni?",
      type: "select",
      options: [
        "Solo diretto (telefono/email)",
        "Booking.com / Airbnb",
        "Più OTA + sito proprio",
        "Ho un channel manager",
      ],
    },
    {
      id: "gestione_richieste",
      text: "Come gestisci le richieste di informazioni?",
      type: "select",
      options: [
        "Rispondo a mano a tutto",
        "Uso template email",
        "Sistema semiautomatico",
        "CRM dedicato",
      ],
    },
    {
      id: "recensioni",
      text: "I tuoi ospiti lasciano recensioni online?",
      type: "select",
      options: [
        "Spesso, senza che io faccia nulla",
        "A volte",
        "Raramente",
        "Non le monitoro",
      ],
    },
  ],
  "Benessere e salute": [
    {
      id: "gestione_appuntamenti",
      text: "Come gestisci gli appuntamenti?",
      type: "select",
      options: [
        "Agenda cartacea",
        "Agenda digitale personale",
        "App di prenotazione",
        "Sistema online self-service",
      ],
    },
    {
      id: "promemoria",
      text: "Mandi conferme e promemoria ai clienti?",
      type: "select",
      options: [
        "No, se ne ricordano loro",
        "Sì, a mano via WhatsApp",
        "Sì, in modo automatico",
        "Ho un gestionale che lo fa",
      ],
    },
    {
      id: "prenotazione_online",
      text: "I clienti possono prenotare da soli online?",
      type: "select",
      options: [
        "No",
        "Sì ma pochi lo usano",
        "Sì, è il canale principale",
      ],
    },
  ],
  Commercio: [
    {
      id: "vendita_online",
      text: "Hai un canale di vendita online?",
      type: "select",
      options: [
        "No, solo negozio fisico",
        "Marketplace (Amazon, ecc.)",
        "E-commerce proprio",
        "Entrambi",
      ],
    },
    {
      id: "comunicazione_promozioni",
      text: "Come comunichi le promozioni ai clienti?",
      type: "select",
      options: [
        "Solo in negozio",
        "Social sporadici",
        "Newsletter o WhatsApp",
        "Sistema strutturato multicanale",
      ],
    },
    {
      id: "analisi_vendite",
      text: "Sai quali prodotti vendono di più e perché?",
      type: "select",
      options: [
        "No, vado a sensazione",
        "Ho i dati ma non li analizzo",
        "Analizzo spesso",
        "Ho un sistema automatico",
      ],
    },
  ],
  Artigianato: [
    {
      id: "acquisizione_clienti",
      text: "Come trovi nuovi clienti?",
      type: "select",
      options: [
        "Solo passaparola",
        "Social fatti da me",
        "Qualche pubblicità online",
        "Strategia strutturata",
      ],
    },
    {
      id: "tempo_preventivi",
      text: "Quanto tempo perdi a fare preventivi?",
      type: "select",
      options: [
        "Pochissimo, sono semplici",
        "1–2 ore a settimana",
        "3–5 ore a settimana",
        "Più di 5 ore",
      ],
    },
    {
      id: "portfolio_online",
      text: "Mostri il tuo lavoro online?",
      type: "select",
      options: [
        "No",
        "Solo su Instagram",
        "Ho un sito portfolio",
        "Più canali coordinati",
      ],
    },
  ],
  "Servizi professionali": [
    {
      id: "gestione_clienti",
      text: "Come gestisci i tuoi clienti e le pratiche?",
      type: "select",
      options: [
        "Email e file locali",
        "Excel strutturato",
        "Software di settore",
        "CRM con automazioni",
      ],
    },
    {
      id: "tempo_amministrativo",
      text: "Quanto tempo dedichi ad attività amministrative ogni settimana?",
      type: "select",
      options: [
        "Meno di 2 ore",
        "2–5 ore",
        "5–10 ore",
        "Più di 10 ore",
      ],
    },
    {
      id: "visibilita_online",
      text: "I tuoi clienti ti trovano facilmente online?",
      type: "select",
      options: [
        "No, solo passaparola",
        "Ho LinkedIn",
        "Ho un sito base",
        "Sito + contenuti + ads",
      ],
    },
  ],
  Altro: [
    {
      id: "attivita_principale",
      text: "Raccontami in due parole la tua attività principale.",
      type: "text",
    },
    {
      id: "sfida_principale",
      text: "Qual è la tua sfida principale in questo momento?",
      type: "select",
      options: [
        "Trovare nuovi clienti",
        "Mantenere quelli attuali",
        "Risparmiare tempo su ripetizioni",
        "Migliorare la visibilità online",
      ],
    },
    {
      id: "strumenti_digitali",
      text: "Usi già strumenti digitali per il tuo lavoro?",
      type: "select",
      options: [
        "No, quasi tutto a mano",
        "Qualcosa di base",
        "Diversi strumenti non collegati",
        "Sistema strutturato",
      ],
    },
  ],
};
