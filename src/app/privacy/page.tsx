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
          Ultimo aggiornamento: aprile 2026 — ai sensi del Reg. UE 2016/679 (GDPR)
        </p>

        <div className="prose-custom space-y-10 text-primary/80 leading-relaxed">

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3" style={{ fontFamily: "Phenomena, sans-serif" }}>
              1. Titolare del trattamento
            </h2>
            <p className="text-sm leading-relaxed">
              Luca Vizza — freelance marketing digitale e AI automation.<br />
              Email: <a href="mailto:make.luca.vizza@gmail.com" className="text-coral underline underline-offset-2">make.luca.vizza@gmail.com</a><br />
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
              3. Cookie
            </h2>
            <p className="text-sm leading-relaxed mb-3">
              Questo sito utilizza le seguenti categorie di cookie:
            </p>
            <div className="text-sm space-y-3">
              <div>
                <p className="font-bold text-primary">Cookie tecnici / necessari</p>
                <p className="text-primary/70">
                  Indispensabili per il funzionamento del sito (es. memorizzazione delle tue preferenze
                  cookie). Non richiedono consenso. Non vengono trasferiti a terzi.
                </p>
              </div>
              <div>
                <p className="font-bold text-primary">Cookie analitici (solo con consenso)</p>
                <p className="text-primary/70">
                  Ci permettono di capire come gli utenti usano il sito, in forma aggregata e anonima.
                  Non sono attualmente attivi.
                </p>
              </div>
              <div>
                <p className="font-bold text-primary">Cookie di marketing (solo con consenso)</p>
                <p className="text-primary/70">
                  Usati per mostrare annunci pertinenti. Non sono attualmente attivi.
                </p>
              </div>
            </div>
            <p className="text-sm mt-4 text-primary/60">
              Puoi modificare o revocare il consenso ai cookie in qualsiasi momento svuotando i dati
              del browser o contattandoci via email.
            </p>
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
                  questionario. Anthropic è certificata per il trattamento dati ai sensi delle normative
                  vigenti. Per dettagli:{" "}
                  <a href="https://www.anthropic.com/privacy" target="_blank" rel="noopener noreferrer" className="text-coral underline underline-offset-2">
                    anthropic.com/privacy
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
              Anthropic e Resend hanno sede negli USA. Il trasferimento è coperto da clausole
              contrattuali standard (SCC) approvate dalla Commissione Europea. Non vengono
              trasferiti altri dati al di fuori dell&apos;UE.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-3" style={{ fontFamily: "Phenomena, sans-serif" }}>
              6. Conservazione dei dati
            </h2>
            <p className="text-sm leading-relaxed">
              I dati del calcolatore e del modulo contatti sono conservati nelle email ricevute per
              un massimo di 24 mesi, salvo obblighi di legge o richiesta di cancellazione anticipata.
              Le preferenze cookie vengono memorizzate nel tuo browser e non su server (localStorage).
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
              <a href="mailto:make.luca.vizza@gmail.com" className="text-coral underline underline-offset-2">
                make.luca.vizza@gmail.com
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
