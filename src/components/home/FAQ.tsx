"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQS = [
  {
    q: "Chi sei e perché dovrei fidarmi di te?",
    a: "Mi chiamo Luca Vizza, ho 36 anni e a settembre 2026 apro la partita IVA. Ho lavorato nella scuola, nel turismo, negli eventi e nella comunicazione. Ho scelto questo percorso tardi — ma consapevolmente. Non sono un ragazzo che ha aperto un'agenzia a 22 anni: so cosa vuol dire lavorare in un'azienda, gestire persone, adattarsi. Mi diploma all'ITS Academy Turismo Emilia-Romagna a giugno 2026.",
    highlight: false,
  },
  {
    q: "Cosa fai esattamente?",
    a: "Due cose principali: marketing digitale (social, ads, email, SEO) e automazioni AI (agenti vocali, CRM, WhatsApp, flussi automatici). Non vendo consulenza generica — costruisco strumenti concreti e gestisco attività operative. Quello che facciamo insieme deve cambiare la tua giornata lavorativa, non finire in un cassetto.",
    highlight: false,
  },
  {
    q: "Cos'è un agente vocale AI e mi serve davvero?",
    a: "È un assistente che risponde al telefono al posto tuo: raccoglie prenotazioni, risponde alle domande frequenti, smista le chiamate. Se perdi clienti perché non riesci a rispondere sempre al telefono, o se passi troppo tempo a rispondere alle stesse domande — sì, probabilmente ti serve.",
    highlight: false,
  },
  {
    q: "Non sono molto pratico di digitale. È un problema?",
    a: "No, è esattamente il tipo di cliente con cui lavoro meglio. Parto da zero, spiego tutto senza gergo tecnico e costruisco cose che sai usare da solo. Il mio obiettivo non è renderti dipendente da me — è darti strumenti che puoi gestire.",
    highlight: false,
  },
  {
    q: "Come lavori con i clienti? Sparisci dopo il primo mese?",
    a: "No. Lavoro in modo continuativo, con aggiornamenti regolari e report mensili chiari. Scrivi e rispondo io — non un assistente, non un account manager. Almeno per ora. Se in futuro dovesse cambiare qualcosa, te lo dico in anticipo.",
    highlight: false,
  },
  {
    q: "Quanto costa lavorare con te?",
    a: "Non ho listini fissi perché ogni situazione è diversa. Parto sempre dall'audit gratuito per capire cosa ti serve davvero, poi faccio una proposta su misura. Quello che posso garantire: niente pacchetti gonfiati, niente costi nascosti.",
    highlight: false,
  },
  {
    q: "✦ Cos'è il progetto pilota gratuito?",
    a: "Sto costruendo il mio portfolio. Fino a settembre 2026 lavoro gratis con 3-5 aziende selezionate, in cambio di feedback onesto e la possibilità di pubblicare il caso studio. Non è un assaggio — è il lavoro completo. I posti sono davvero limitati.",
    highlight: true,
  },
  {
    q: "Lavori solo in Romagna?",
    a: "No, lavoro da remoto con aziende in tutta Italia. Sono di base in Romagna ma non è un limite. Per alcuni progetti posso spostarmi, se ha senso.",
    highlight: false,
  },
  {
    q: "Da dove si parte?",
    a: "Compila l'audit gratuito — 5 minuti, nessun obbligo. Ricevi un report personalizzato e poi decidiamo insieme se e come andare avanti. Non ti chiamo dieci volte per venderti qualcosa.",
    highlight: false,
  },
  {
    q: "Lavori anche con le agenzie?",
    a: "Sì. Collaboro come freelance esterno per agenzie che hanno bisogno di supporto su progetti specifici o per overflow di lavoro. White label disponibile. Ho una pagina dedicata.",
    highlight: false,
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
            Domande su di me
          </h2>
          <p className="text-primary/60 text-lg">
            Quello che ti staresti chiedendo. Se manca qualcosa,{" "}
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
                className={`w-full text-left px-6 py-5 rounded-xl border transition-all duration-200 flex items-start justify-between gap-4 group ${
                  faq.highlight
                    ? "border-coral/40 bg-coral/5 hover:bg-coral/10 hover:border-coral/60"
                    : "border-primary/10 bg-white/50 hover:border-primary/20 hover:bg-white/80"
                }`}
              >
                <span
                  className={`text-base font-bold transition-colors ${
                    faq.highlight
                      ? "text-coral group-hover:text-coral/80"
                      : "text-primary group-hover:text-coral"
                  }`}
                  style={{ fontFamily: "Phenomena, sans-serif" }}
                >
                  {faq.q}
                </span>
                <motion.span
                  className={`text-xl leading-none mt-0.5 flex-shrink-0 ${faq.highlight ? "text-coral/60" : "text-primary/40"}`}
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
                    <div
                      className={`px-6 pb-5 pt-3 text-sm leading-relaxed border border-t-0 rounded-b-xl ${
                        faq.highlight
                          ? "text-primary/70 border-coral/30 bg-coral/5"
                          : "text-primary/70 border-primary/10 bg-white/30"
                      }`}
                    >
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
