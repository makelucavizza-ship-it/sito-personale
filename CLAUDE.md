# CLAUDE.md — Sito Personale Luca Vizza

## Progetto
Sito personale professionale di Luca Vizza — freelance marketing digitale e AI automation.
Target: PMI italiane e agenzie che cercano freelance esterni per subappalti.

## Stack tecnico
- Framework: Next.js 14 App Router
- Hosting: Vercel (piano gratuito)
- Dominio: lucavizza.it (IONOS)
- Email: Resend
- Contenuti: file markdown nella cartella /content
- Stile: Tailwind CSS
- Animazioni: Framer Motion
- Font: Google Fonts (Phenomena non disponibile su Google — usare self-hosted o alternativa; Sailors — self-hosted)

## Identità visiva
- Payoff: "Cresciamo insieme con l'AI"
- Logo: LV con linea di colori multipli
- Font titoli: Phenomena (self-hosted in /public/fonts)
- Font body: Sailors (self-hosted in /public/fonts)
- Background: #f5f0eb (warm off-white, dal brand)

### Palette colori
```
--color-primary:   #474747   /* grigio scuro — testo principale */
--color-accent-1:  #3ad3ef   /* azzurro */
--color-accent-2:  #ffbd59   /* giallo */
--color-accent-3:  #5bc783   /* verde */
--color-accent-4:  #544fb3   /* viola */
--color-accent-5:  #5ed5bf   /* turchese */
--color-coral:     #ee826d   /* corallo — CTA principale */
--color-bg:        #f5f0eb   /* sfondo warm off-white */
```

### Stile
Minimale, moderno, professionale. Aria bianca tra le sezioni. Tipografia forte.
Le card e le sezioni usano colori accent come bordi o highlights, mai come sfondi pieni (eccetto hero/banner).

## Cursore personalizzato
Componente React globale (`CustomCursor`) che traccia il mouse.
- Default: cerchio vuoto 20px, bordo 1.5px `#474747`
- Hover su link/bottoni: scala a 2.5x, riempito `#ee826d` opacità 0.15
- Hover su carosello servizi: mostra testo "scopri →"
- Hover su FAQ: mostra "+"
- Hover su zona social LinkedIn: bordo `#0077B5`
- Hover su zona social Instagram: bordo `#E1306C`
- Mobile (< 768px): disabilitato completamente

## Struttura pagine
```
/                           → Home
/servizi/automazione-ai     → Servizio AI Automation
/servizi/marketing-digitale → Servizio Marketing Digitale
/portfolio                  → Portfolio con case study
/chi-sono                   → About
/agenzie                    → Pagina per agenzie (subappalto)
/risorse/bandi-digitalizzazione-romagna → Bandi e finanziamenti
/audit                      → Tool Audit (form + Claude API + Resend)
/contatti                   → Contatti
```

## Home — struttura sezioni
1. Navigation top (sticky) con link a tutte le pagine + CTA "Audit gratuito"
2. Hero: animazione typewriter delle competenze + headline "Cresciamo insieme con l'AI" + CTA
3. Carosello servizi: card con 5-10 parole, scroll orizzontale
4. FAQ: 9 domande in accordion (Framer Motion per apertura/chiusura)
5. Footer con social (LinkedIn, Instagram) + cursore personalizzato per social + P.IVA placeholder

## Tool Audit (/audit)
Form condizionale a step per settore:
- Ristorazione
- Turismo e ospitalità
- Benessere e salute
- Commercio
- Artigianato
- Servizi professionali
- Altro (campo libero)

Ogni settore → domande specifiche su:
1. Livello automazione attuale (scala 1-5 + domande aperte)
2. Fiducia verso l'AI (scala + contesto)

Flusso:
1. Utente compila form multi-step
2. Submit → chiamata API route `/api/audit`
3. API route chiama Claude API (streaming)
4. Report mostrato in tempo reale con streaming
5. Report inviato via email con Resend

Il report ha 4 sezioni:
1. Livello maturità digitale
2. Servizi consigliati
3. Bandi applicabili
4. 3 azioni immediate

## Contenuti
- Gestiti tramite file markdown in `/content/`
- Struttura: `/content/portfolio/`, `/content/servizi/`, `/content/pagine/`
- Niente CMS esterno — aggiornati direttamente con Claude Code
- Frontmatter YAML per metadati (titolo, data, tags, ecc.)

## Note importanti
- P.IVA: placeholder nel footer "P.IVA in fase di attivazione"
- Prezzi: NON visibili sul sito
- Pesce mandarino: non inserire per ora
- Il payoff ufficiale è "Cresciamo insieme con l'AI" (non "Marketing fatto insieme")
- Ogni modifica ai contenuti avviene sui file markdown, non sul codice

## Variabili d'ambiente richieste
```
ANTHROPIC_API_KEY=       # Per Tool Audit
RESEND_API_KEY=          # Per invio email
RESEND_FROM_EMAIL=       # Email mittente (es. noreply@lucavizza.it)
```

## Ordine di sviluppo
1. [x] CLAUDE.md creato
2. [ ] Inizializza progetto Next.js con Tailwind e Framer Motion
3. [ ] Componente cursore personalizzato globale
4. [ ] Layout base con navigation
5. [ ] Home page completa
6. [ ] Pagine servizi
7. [ ] Portfolio con file markdown
8. [ ] Chi sono
9. [ ] Agenzie
10. [ ] Bandi
11. [ ] Tool Audit con Claude API e Resend
12. [ ] Contatti
13. [ ] Ottimizzazione SEO su tutte le pagine

## Decisioni tecniche (aggiornare ad ogni step)
- 2026-07-06: Rimossa la sezione "Guide" (/guide e tutte le pagine correlate) e i link ad essa da Navigation, sitemap e pagine servizi.
- 2026-07-06: Rimossa la sezione "collab gratuita con 5 aziende" (PilotBanner in home, FAQ dedicata, riferimenti in portfolio) e tutti i riferimenti nel resto del sito.
- 2026-04-20: Inizializzato progetto. Scelto Next.js 14 App Router per SSR/SSG e routing nativo.
- 2026-04-20: Tailwind CSS v3 per utility-first styling coerente con design system.
- 2026-04-20: Framer Motion per animazioni (typewriter, accordion FAQ, carosello).
- 2026-04-20: Font self-hosted in /public/fonts (Phenomena + Sailors non su Google Fonts).
- 2026-04-20: Gray-based palette con accents multipli — usati come highlights, non sfondi pieni.
