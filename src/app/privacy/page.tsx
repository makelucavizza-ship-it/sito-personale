import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Informativa sulla Privacy",
  description: "Informativa sul trattamento dei dati personali di lucavizza.it, ai sensi del GDPR (Reg. UE 2016/679).",
};

export default function PrivacyPage() {
  return (
    <div className="pt-24 pb-24 px-6">
      <div className="max-w-3xl mx-auto">
        <span
          className="inline-block text-sm font-bold text-primary/40 uppercase tracking-widest mb-4"
          style={{ fontFamily: "Phenomena, sans-serif" }}
        >
          Documenti legali
        </span>
        <h1
          className="text-5xl font-bold text-primary mb-4 leading-none"
          style={{ fontFamily: "Phenomena, sans-serif" }}
        >
          Informativa sulla Privacy
        </h1>
        <p className="text-primary/50 text-sm mb-12">
          Ultimo aggiornamento: 28 aprile 2026 — ai sensi del Reg. UE 2016/679 (GDPR)
        </p>

        <div className="prose-custom space-y-10 text-primary/80 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3" style={{ fontFamily: "Phenomena, sans-serif" }}>
              1. Titolare del trattamento
            </h2>
            <p className="text-sm leading-relaxed">
              Luca Vizza — freelance marketing digitale e AI automation.<br />
              Email: <a href="mailto:info@lucavizza.it" className="text-coral underline underline-offset-2">info@lucavizza.it</a><br />
              P.IVA: in fase di attivazione.<br />
              Per qualsiasi richiesta relativa ai tuoi dati, scrivi all&apos;indirizzo sopra.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3" style={{ fontFamily: "Phenomena, sans-serif" }}>
              2. Dati raccolti e finalità
            </h2>
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-bold text-primary mb-1">Calcolatore gratuito (/audit)</p>
                <p>
                  Raccogliamo: nome, email, nome dell&apos;attività, città, settore, risposte ai
                  questionari (livello di automazione, numero di prenotazioni/preventivi, tariffa
                  oraria, fiducia verso l&apos;AI). Questi dati vengono usati per:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-primary/70">
                  <li>Generare un report personalizzato tramite intelligenza artificiale (Claude di Anthropic);</li>
                  <li>Effettuare ricerche online sulla tua attività tramite API di terze parti (SerpAPI, Jina AI) per personalizzare il report;</li>
                  <li>Inviarti il report via email;</li>
                  <li>Inviarmi una notifica interna con i tuoi dati di contatto.</li>
                </ul>
                <p className="mt-2">
                  Base giuridica: esecuzione di misure precontrattuali su richiesta dell&apos;interessato (art. 6.1.b GDPR).
                </p>
              </div>

              <div>
                <p className="font-bold text-primary mb-1">Modulo di contatto (/contatti)</p>
                <p>
                  Raccogliamo: nome, email, messaggio. Usati esclusivamente per rispondere alla tua richiesta.
                </p>
                <p className="mt-2">
                  Base giuridica: esecuzione di misure precontrattuali su richiesta dell&apos;interessato (art. 6.1.b GDPR).
                </p>
              </div>

              <div>
                <p className="font-bold text-primary mb-1">Dati di navigazione</p>
                <p>
                  Come tutti i siti web, i server registrano automaticamente indirizzo IP, browser,
                  pagine visitate e ora di accesso. Questi dati sono trattati in forma aggregata e
                  anonima esclusivamente per scopi tecnici e di sicurezza. Non vengono conservati
                  oltre 30 giorni.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3" style={{ fontFamily: "Phenomena, sans-serif" }}>
              3. Cookie e strumenti di analisi
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              Questo sito utilizza le seguenti categorie di cookie:
            </p>
            <div className="text-sm space-y-4">
              <div>
                <p className="font-bold text-primary">Cookie tecnici / necessari</p>
                <p className="text-primary/70">
                  Indispensabili per il funzionamento del sito (es. memorizzazione delle tue preferenze
                  cookie in <code className="text-xs bg-primary/5 px-1 py-0.5 rounded">localStorage</code>).
                  Non richiedono consenso. Non vengono trasferiti a terzi.
                </p>
              </div>
              <div>
                <p className="font-bold text-primary">Cookie analitici — Google Analytics 4 (solo con consenso)</p>
                <p className="text-primary/70 mb-2">
                  Utilizziamo Google Analytics 4 (GA4) per raccogliere statistiche aggregate sull&apos;utilizzo
                  del sito (pagine visitate, durata della sessione, provenienza geografica). I dati sono
                  pseudoanonimizzati e non permettono di identificare il singolo utente.
                </p>
                <p className="text-primary/70">
                  Questi cookie vengono attivati <strong>solo se hai prestato consenso</strong> tramite il
                  banner cookie. Implementiamo Google Consent Mode v2: in assenza di consenso, GA4 non
                  installa cookie di tracciamento e raccoglie solo dati aggregati e non identificabili
                  (modalità &quot;cookieless&quot;).
                </p>
              </div>
              <div>
                <p className="font-bold text-primary">Cookie di marketing (solo con consenso)</p>
                <p className="text-primary/70">
                  Cookie utilizzati per campagne pubblicitarie personalizzate. Attivi solo se hai prestato
                  esplicito consenso. Attualmente non utilizziamo reti pubblicitarie di terze parti su
                  questo sito.
                </p>
              </div>
            </div>
            <div className="mt-4 p-4 rounded-xl bg-primary/[0.03] border border-primary/10 text-sm">
              <p className="font-bold text-primary mb-1">Gestione del consenso ai cookie</p>
              <p className="text-primary/70">
                Puoi modificare le tue preferenze in qualsiasi momento tramite il banner cookie (cancella
                i dati del sito nel tuo browser per riaprirlo) oppure scrivendoci a{" "}
                <a href="mailto:info@lucavizza.it" className="text-coral underline underline-offset-2">
                  info@lucavizza.it
                </a>.
                Il consenso ha durata di 12 mesi, dopodiché verrà richiesto nuovamente.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3" style={{ fontFamily: "Phenomena, sans-serif" }}>
              4. Responsabili del trattamento (sub-processor)
            </h2>
            <div className="text-sm space-y-4">
              <div>
                <p className="font-bold text-primary">Anthropic, PBC (Claude AI)</p>
                <p className="text-primary/70">
                  Le risposte del calcolatore gratuito vengono elaborate dall&apos;API di Anthropic per
                  generare il report personalizzato. I dati trasmessi includono le risposte al
                  questionario. Per dettagli:{" "}
                  <a href="https://www.anthropic.com/privacy" target="_blank" rel="noopener noreferrer" className="text-coral underline underline-offset-2">
                    anthropic.com/privacy
                  </a>.
                </p>
              </div>
              <div>
                <p className="font-bold text-primary">SerpAPI, LLC</p>
                <p className="text-primary/70">
                  Utilizzato dal calcolatore gratuito per recuperare informazioni pubbliche sull&apos;attività
                  dell&apos;utente (scheda Google My Business, risultati di ricerca) al fine di personalizzare
                  il report. I dati trasmessi includono nome dell&apos;attività e città. Per dettagli:{" "}
                  <a href="https://serpapi.com/privacy" target="_blank" rel="noopener noreferrer" className="text-coral underline underline-offset-2">
                    serpapi.com/privacy
                  </a>.
                </p>
              </div>
              <div>
                <p className="font-bold text-primary">Jina AI GmbH</p>
                <p className="text-primary/70">
                  Utilizzato dal calcolatore gratuito per la lettura di pagine web pubbliche al fine di
                  arricchire il report con informazioni sull&apos;attività. Per dettagli:{" "}
                  <a href="https://jina.ai/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-coral underline underline-offset-2">
                    jina.ai/privacy-policy
                  </a>.
                </p>
              </div>
              <div>
                <p className="font-bold text-primary">Google LLC (Google Analytics 4)</p>
                <p className="text-primary/70">
                  Utilizziamo Google Analytics 4 per statistiche di navigazione aggregate, solo con il tuo
                  consenso. Implementiamo Google Consent Mode v2 per garantire il rispetto delle preferenze
                  espresse. Per dettagli:{" "}
                  <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-coral underline underline-offset-2">
                    policies.google.com/privacy
                  </a>.
                  Per opt-out: <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-coral underline underline-offset-2">
                    Google Analytics Opt-out
                  </a>.
                </p>
              </div>
              <div>
                <p className="font-bold text-primary">Resend, Inc.</p>
                <p className="text-primary/70">
                  Utilizziamo Resend per l&apos;invio delle email (report del calcolatore e notifiche
                  interne). I dati trasmessi includono nome, email e contenuto del report. Per dettagli:{" "}
                  <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-coral underline underline-offset-2">
                    resend.com/legal/privacy-policy
                  </a>.
                </p>
              </div>
              <div>
                <p className="font-bold text-primary">Vercel, Inc.</p>
                <p className="text-primary/70">
                  Il sito è ospitato su Vercel. I server Vercel elaborano le richieste HTTP in Europa
                  (Frankfurt, de1). Per dettagli:{" "}
                  <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-coral underline underline-offset-2">
                    vercel.com/legal/privacy-policy
                  </a>.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3" style={{ fontFamily: "Phenomena, sans-serif" }}>
              5. Trasferimento dati extra-UE
            </h2>
            <p className="text-sm leading-relaxed">
              Anthropic, SerpAPI, Jina AI, Google e Resend hanno sede negli USA. Il trasferimento è
              coperto da clausole contrattuali standard (SCC) approvate dalla Commissione Europea o da
              meccanismi equivalenti (es. Data Privacy Framework UE-USA). Non vengono trasferiti altri
              dati al di fuori dell&apos;UE.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3" style={{ fontFamily: "Phenomena, sans-serif" }}>
              6. Conservazione dei dati
            </h2>
            <p className="text-sm leading-relaxed">
              I dati del calcolatore e del modulo contatti sono conservati nelle email ricevute per
              un massimo di 24 mesi, salvo obblighi di legge o richiesta di cancellazione anticipata.
              Le preferenze cookie vengono memorizzate nel tuo browser (localStorage) con durata di
              12 mesi e non su server.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3" style={{ fontFamily: "Phenomena, sans-serif" }}>
              7. I tuoi diritti (artt. 15–22 GDPR)
            </h2>
            <p className="text-sm leading-relaxed mb-3">Hai il diritto di:</p>
            <ul className="text-sm list-disc list-inside space-y-1 text-primary/70">
              <li>Accedere ai tuoi dati personali;</li>
              <li>Rettificare dati inesatti;</li>
              <li>Richiedere la cancellazione (diritto all&apos;oblio);</li>
              <li>Limitare il trattamento;</li>
              <li>Portabilità dei dati;</li>
              <li>Opporti al trattamento;</li>
              <li>Revocare il consenso in qualsiasi momento (senza effetti retroattivi);</li>
              <li>Proporre reclamo all&apos;Autorità Garante per la protezione dei dati personali
                  (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-coral underline underline-offset-2">garanteprivacy.it</a>).
              </li>
            </ul>
            <p className="text-sm mt-4">
              Per esercitare i tuoi diritti, scrivi a:{" "}
              <a href="mailto:info@lucavizza.it" className="text-coral underline underline-offset-2">
                info@lucavizza.it
              </a>. Rispondo entro 30 giorni.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3" style={{ fontFamily: "Phenomena, sans-serif" }}>
              8. Sicurezza
            </h2>
            <p className="text-sm leading-relaxed">
              Il sito è servito esclusivamente via HTTPS. Le chiavi API e le credenziali non sono
              mai esposte lato client. I dati sono trattati solo per le finalità descritte e non
              vengono venduti né ceduti a terzi per finalità commerciali.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3" style={{ fontFamily: "Phenomena, sans-serif" }}>
              9. Modifiche a questa informativa
            </h2>
            <p className="text-sm leading-relaxed">
              Questa informativa può essere aggiornata periodicamente. La data di &quot;ultimo
              aggiornamento&quot; in cima alla pagina indica la versione in vigore. Per modifiche
              sostanziali invieremo una comunicazione agli indirizzi email con cui sei entrato in
              contatto con noi.
            </p>
          </section>

        </div>

        <div className="mt-16 pt-8 border-t border-primary/10">
          <Link
            href="/"
            className="text-sm text-primary/50 hover:text-primary transition-colors"
          >
            ← Torna alla home
          </Link>
        </div>
      </div>
    </div>
  );
}
