"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    q: "Cos'è esattamente il marketing digitale?",
    a: "È l'insieme delle attività di comunicazione e vendita che si svolgono online: social media, email, advertising, SEO, contenuti. L'obiettivo è portare persone giuste nel momento giusto verso la tua azienda.",
  },
  {
    q: "Cosa può fare l'AI per la mia azienda?",
    a: "L'AI può automatizzare attività ripetitive (risposte email, aggiornamento CRM, reportistica), creare contenuti in modo più veloce, analizzare dati e aiutarti a prendere decisioni più informate. Non sostituisce le persone — le libera dal lavoro manuale.",
  },
  {
    q: "Lavori solo con aziende della Romagna?",
    a: "No, lavoro in tutta Italia e anche con aziende estere. La mia base è in Romagna, ma il lavoro è quasi sempre remoto. Disponibile per incontri in presenza su richiesta.",
  },
  {
    q: "Quanto costa lavorare con te?",
    a: "Dipende dalla portata del progetto. Non pubblico listini perché ogni situazione è diversa. Quello che posso dirti: non vendo pacchetti standard. Prima faccio un audit gratuito per capire cosa ti serve davvero, poi ti faccio una proposta personalizzata.",
  },
  {
    q: "Cos'è il progetto pilota gratuito?",
    a: "Fino a settembre 2026 sto selezionando 3-5 aziende con cui lavorare a costo zero in cambio di feedback onesto e la possibilità di pubblicare il caso studio (con il tuo consenso). È un'opportunità reale, non un assaggio.",
  },
  {
    q: "Hai esperienza con il mio settore?",
    a: "Ho lavorato con ristorazione, turismo, benessere, commercio, artigianato e servizi professionali. Il marketing funziona su principi universali — si adatta al settore, non si reinventa. L'audit iniziale serve proprio a capire le specificità del tuo contesto.",
  },
  {
    q: "Gestisci i social in autonomia o mi coinvolgi?",
    a: "Dipende da come lavoriamo. Posso gestire tutto io o coinvolgerti nella creazione dei contenuti. L'importante è che il tono di voce sia autentico. Non mi piace pubblicare contenuti che potrebbero venire da qualsiasi azienda.",
  },
  {
    q: "Come faccio a sapere se stai producendo risultati?",
    a: "Report mensili chiari, con i KPI che contano per te (non quelli che fanno bella figura). Prima di iniziare definiamo insieme cosa misurare e cosa vuol dire 'funzionare' per il tuo caso specifico.",
  },
  {
    q: "Posso lavorare con te se ho già un'agenzia?",
    a: "Sì. Collaboro come freelance esterno con agenzie che hanno bisogno di risorse in più, sia su progetti specifici che in modo continuativo. C'è una pagina dedicata alle agenzie.",
  },
  {
    q: "Da dove si parte?",
    a: "Dal tool di audit gratuito. In 5 minuti analizzi la tua situazione attuale e ricevi un report personalizzato via email. Da lì decidiamo insieme se e come procedere. Zero impegno.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2
            className="text-4xl md:text-5xl font-bold text-primary mb-4"
            style={{ fontFamily: "Phenomena, sans-serif" }}
          >
            Domande frequenti
          </h2>
          <p className="text-primary/60 text-lg">
            Le cose che mi chiedono di più. Se la tua non c&apos;è,{" "}
            <a href="/contatti" className="text-coral underline underline-offset-2">
              scrivimi
            </a>
            .
          </p>
        </motion.div>

        <div className="space-y-2">
          {FAQS.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
            >
              <button
                data-cursor="faq"
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left px-6 py-5 rounded-xl border border-primary/10 hover:border-primary/20 bg-white/50 hover:bg-white/80 transition-all duration-200 flex items-start justify-between gap-4 group"
              >
                <span
                  className="text-base font-bold text-primary group-hover:text-coral transition-colors"
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  {faq.q}
                </span>
                <motion.span
                  className="text-primary/40 text-xl leading-none mt-0.5 flex-shrink-0"
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5 pt-3 text-primary/70 leading-relaxed text-sm border border-t-0 border-primary/10 rounded-b-xl bg-white/30">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
