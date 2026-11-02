"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Eye, EyeOff, Plus, Trash2 } from "lucide-react";
import {
  CALENDAR_TYPES,
  LIMITS,
  PHOTO_TOOLS,
  STEPS,
  emptyCalendarRow,
  findIssues,
  initialData,
  isCalendarRowEmpty,
  isStepEmpty,
  type OnboardingData,
  type StepId,
  type ValidationIssue,
} from "@/lib/onboarding-miragia";

const DRAFT_KEY = "lv_onboarding_miragia_v1";
const INTRO = -1;
const SUMMARY = STEPS.length;
const DONE = STEPS.length + 1;

const ACCENTS = ["#3ad3ef", "#ffbd59", "#5bc783", "#544fb3", "#5ed5bf", "#ee826d", "#3ad3ef"];

// ---------- Bozza in localStorage (mai le password) ----------

function stripPasswords(d: OnboardingData): OnboardingData {
  return { ...d, sms: { ...d.sms, password: "" }, wp: { ...d.wp, password: "" } };
}

function loadDraft(): { data: OnboardingData; step: number } | null {
  try {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { data?: Partial<OnboardingData>; step?: number };
    if (!parsed?.data) return null;
    const base = initialData();
    const d = parsed.data;
    const data: OnboardingData = {
      ...base,
      ...d,
      sms: { ...base.sms, ...d.sms, password: "" },
      wp: { ...base.wp, ...d.wp, password: "" },
      foto: { ...base.foto, ...d.foto },
      calendario:
        Array.isArray(d.calendario) && d.calendario.length
          ? d.calendario.map((r) => ({ ...emptyCalendarRow(), ...r }))
          : base.calendario,
      prodotti: base.prodotti.map((_, i) => d.prodotti?.[i] ?? ""),
      video: base.video.map((v, i) => ({ ...v, ...d.video?.[i] })),
    };
    const step = typeof parsed.step === "number" && parsed.step >= INTRO && parsed.step <= SUMMARY
      ? parsed.step
      : INTRO;
    return { data, step };
  } catch {
    return null;
  }
}

function saveDraft(data: OnboardingData, step: number) {
  try {
    localStorage.setItem(DRAFT_KEY, JSON.stringify({ data: stripPasswords(data), step }));
  } catch {
    // Storage pieno o bloccato (navigazione privata): il form funziona lo stesso
  }
}

function clearDraft() {
  try {
    localStorage.removeItem(DRAFT_KEY);
  } catch {
    /* niente da fare */
  }
}

// ---------- Componenti base ----------

const inputCls =
  "block w-full min-w-0 rounded-xl border border-primary/20 bg-white px-4 py-3 text-base text-primary placeholder-primary/35 focus:border-coral focus:outline-none focus:ring-2 focus:ring-coral/20 font-phenomena";

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block font-phenomena text-sm font-bold text-primary/80">
      {children}
    </label>
  );
}

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  );
}

const noAuto = { autoCapitalize: "none", autoCorrect: "off", spellCheck: false } as const;

function PasswordInput({
  id,
  value,
  onChange,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div className="relative">
        <input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          maxLength={LIMITS.short}
          onChange={(e) => onChange(e.target.value)}
          autoComplete="off"
          {...noAuto}
          className={`${inputCls} pr-14`}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Nascondi password" : "Mostra password"}
          aria-pressed={show}
          className="absolute inset-y-0 right-0 flex w-14 items-center justify-center rounded-r-xl text-primary/60 hover:text-primary"
        >
          {show ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
      <p className="mt-2 text-sm text-primary/55">
        Per sicurezza la password non viene salvata nella bozza: se chiudi la pagina prima di
        inviare, dovrai riscriverla.
      </p>
    </div>
  );
}

function Explanation({ children }: { children: React.ReactNode }) {
  return <p className="text-[17px] leading-relaxed text-primary/80">{children}</p>;
}

// ---------- Componente principale ----------

export default function MiragiaOnboarding() {
  const [data, setData] = useState<OnboardingData>(initialData);
  const [step, setStep] = useState<number>(INTRO);
  const [loaded, setLoaded] = useState(false);
  const [restored, setRestored] = useState(false);
  const [backToSummary, setBackToSummary] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [serverIssues, setServerIssues] = useState<ValidationIssue[]>([]);
  const [sentName, setSentName] = useState("");
  const submitted = useRef(false);

  // Ripristino bozza al primo caricamento
  useEffect(() => {
    const draft = loadDraft();
    if (draft) {
      setData(draft.data);
      setStep(draft.step);
      setRestored(true);
    }
    setLoaded(true);
  }, []);

  // Salvataggio automatico a ogni modifica
  useEffect(() => {
    if (!loaded || submitted.current) return;
    saveDraft(data, step);
  }, [data, step, loaded]);

  const goTo = useCallback((s: number) => {
    setStep(s);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  const update = <K extends keyof OnboardingData>(key: K, value: OnboardingData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const nameOk = data.nome.trim().length > 0;
  const issues = findIssues(data);
  const firstName = data.nome.trim().split(/\s+/)[0] || "";

  const next = () => {
    if (backToSummary) {
      setBackToSummary(false);
      goTo(SUMMARY);
    } else {
      goTo(step + 1);
    }
  };

  const jumpFromSummary = (s: number) => {
    setBackToSummary(true);
    goTo(s);
  };

  async function submit() {
    setSendError(null);
    setServerIssues([]);
    if (issues.length) return;
    setSending(true);
    try {
      const res = await fetch("/api/onboarding/miragia", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website: honeypot }),
      });
      const body = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        issues?: ValidationIssue[];
      };
      if (!res.ok || !body.ok) {
        setServerIssues(body.issues ?? []);
        setSendError(
          `${body.error ?? "Invio non riuscito."} Le tue risposte sono ancora qui: riprova tra qualche minuto, oppure scrivimi a info@lucavizza.it.`,
        );
        return;
      }
      submitted.current = true;
      clearDraft();
      setSentName(firstName);
      goTo(DONE);
    } catch {
      setSendError(
        "Non sono riuscito a inviare le risposte: controlla la connessione e riprova. Quello che hai scritto è ancora qui.",
      );
    } finally {
      setSending(false);
    }
  }

  const isStep = step >= 0 && step < STEPS.length;
  const stepIndexOf = (id: StepId | "nome") =>
    id === "nome" ? INTRO : STEPS.findIndex((s) => s.id === id);

  return (
    <div className="min-h-screen bg-bg">
      {/* Header minimale */}
      <header className="border-b border-primary/10 bg-bg/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-4">
          <Image src="/logo-lv.png" alt="Luca Vizza" width={40} height={45} priority />
          <span className="font-phenomena text-xs font-bold uppercase tracking-[0.18em] text-primary/50">
            Onboarding Miragià
          </span>
        </div>
        <div className="flex h-1">
          {ACCENTS.slice(0, 5).map((c) => (
            <span key={c} className="flex-1" style={{ background: c }} />
          ))}
        </div>
      </header>

      {/* Barra di avanzamento */}
      {(isStep || step === SUMMARY) && (
        <div className="sticky top-0 z-30 border-b border-primary/10 bg-bg/95 backdrop-blur-sm">
          <div className="mx-auto max-w-2xl px-4 py-3">
            <div className="mb-2 flex items-center justify-between font-phenomena text-xs font-bold text-primary/60">
              <span>{isStep ? `Passaggio ${step + 1} di ${STEPS.length}` : "Riepilogo"}</span>
              <span>{Math.round(((step + 1) / (STEPS.length + 1)) * 100)}%</span>
            </div>
            <div
              className="h-2 overflow-hidden rounded-full bg-primary/10"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={STEPS.length + 1}
              aria-valuenow={step + 1}
            >
              <motion.div
                className="h-full rounded-full bg-coral"
                initial={false}
                animate={{ width: `${((step + 1) / (STEPS.length + 1)) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>
      )}

      <main className="mx-auto max-w-2xl px-4 pb-36 pt-8">
        {restored && isStep && (
          <div className="mb-6 rounded-xl border border-accent-3/40 bg-accent-3/10 p-4 text-[15px] text-primary/80">
            Ho ripreso le risposte che avevi già scritto. Le password non vengono salvate: se le
            avevi inserite, riscrivile.
            <button
              type="button"
              onClick={() => setRestored(false)}
              className="ml-1 font-phenomena text-sm font-bold underline"
            >
              Ok
            </button>
          </div>
        )}

        {/* Honeypot: nascosto agli utenti, solo i bot lo compilano */}
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="website">Sito web</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        {/* Finché la bozza non è stata letta non mostro nulla, per evitare il flash dell'intro */}
        {loaded && (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {step === INTRO && (
              <section className="space-y-6">
                <h1 className="font-phenomena text-3xl font-bold leading-tight text-primary">
                  Ciao Catia, iniziamo
                </h1>
                <p className="text-[17px] leading-relaxed text-primary/80">
                  Qui raccolgo tutto quello che mi serve per partire con Miragià: accessi,
                  calendario, prodotti e qualche idea per i video. Sono 7 passaggi brevi.
                </p>
                <Field id="nome" label="Il tuo nome">
                  <input
                    id="nome"
                    type="text"
                    value={data.nome}
                    maxLength={LIMITS.nome}
                    autoComplete="given-name"
                    onChange={(e) => update("nome", e.target.value)}
                    className={inputCls}
                  />
                </Field>
                {!nameOk && <p className="text-sm text-coral">Scrivi il tuo nome per continuare.</p>}
              </section>
            )}

            {isStep && (
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <span
                    className="h-8 w-1.5 rounded-full"
                    style={{ background: ACCENTS[step % ACCENTS.length] }}
                  />
                  <h1 className="font-phenomena text-2xl font-bold leading-tight text-primary sm:text-3xl">
                    {STEPS[step].title}
                  </h1>
                </div>
                <StepContent id={STEPS[step].id} data={data} setData={setData} />
              </section>
            )}

            {step === SUMMARY && (
              <Summary
                data={data}
                issues={[...issues, ...serverIssues]}
                onJump={jumpFromSummary}
                stepIndexOf={stepIndexOf}
                sendError={sendError}
              />
            )}

            {step === DONE && (
              <section className="space-y-6 pt-10 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent-3/15 text-accent-3">
                  <Check size={32} strokeWidth={2.5} />
                </div>
                <p className="font-phenomena text-2xl font-bold leading-snug text-primary">
                  Grazie {sentName || "Catia"}, ho ricevuto tutto. Ti scrivo appena ho dato
                  un&apos;occhiata.
                </p>
              </section>
            )}
          </motion.div>
        )}
      </main>

      {/* Pulsanti in basso, sempre a portata di pollice */}
      {step !== DONE && (
        <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-primary/10 bg-bg/95 backdrop-blur-sm pb-[env(safe-area-inset-bottom)]">
          <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3">
            {step > INTRO && (
              <button
                type="button"
                onClick={() => goTo(step - 1)}
                className="flex h-14 items-center justify-center gap-2 rounded-full border border-primary/20 px-5 font-phenomena text-base font-bold text-primary"
              >
                <ArrowLeft size={18} />
                <span>Indietro</span>
              </button>
            )}

            {step === INTRO && (
              <button
                type="button"
                disabled={!nameOk}
                onClick={() => goTo(0)}
                className="flex h-14 flex-1 items-center justify-center gap-2 rounded-full bg-coral px-6 font-phenomena text-base font-bold text-white disabled:opacity-40"
              >
                Inizia <ArrowRight size={18} />
              </button>
            )}

            {isStep && (
              <button
                type="button"
                onClick={next}
                className="flex h-14 flex-1 items-center justify-center gap-2 rounded-full bg-coral px-6 font-phenomena text-base font-bold text-white"
              >
                {backToSummary
                  ? "Torna al riepilogo"
                  : isStepEmpty(STEPS[step].id, data)
                    ? "Salta"
                    : step === STEPS.length - 1
                      ? "Riepilogo"
                      : "Avanti"}
                <ArrowRight size={18} />
              </button>
            )}

            {step === SUMMARY && (
              <button
                type="button"
                onClick={submit}
                disabled={sending || issues.length > 0}
                className="flex h-14 flex-1 items-center justify-center gap-2 rounded-full bg-coral px-6 font-phenomena text-base font-bold text-white disabled:opacity-40"
              >
                {sending ? "Invio in corso…" : "Invia"}
              </button>
            )}
          </div>
        </nav>
      )}
    </div>
  );
}

// ---------- Riepilogo ----------

function Summary({
  data,
  issues,
  onJump,
  stepIndexOf,
  sendError,
}: {
  data: OnboardingData;
  issues: ValidationIssue[];
  onJump: (s: number) => void;
  stepIndexOf: (id: StepId | "nome") => number;
  sendError: string | null;
}) {
  const empty = STEPS.map((s, i) => ({ ...s, i })).filter((s) => isStepEmpty(s.id, data));
  return (
    <section className="space-y-6">
      <h1 className="font-phenomena text-3xl font-bold leading-tight text-primary">Riepilogo</h1>

      {empty.length === 0 ? (
        <p className="rounded-xl border border-accent-3/40 bg-accent-3/10 p-4 text-[17px] text-primary/80">
          Hai compilato tutte le sezioni.
        </p>
      ) : (
        <div className="space-y-3">
          <p className="text-[17px] leading-relaxed text-primary/80">
            {empty.length === 1
              ? "Questa sezione è rimasta vuota. Puoi tornarci adesso oppure inviare lo stesso:"
              : "Queste sezioni sono rimaste vuote. Puoi tornarci adesso oppure inviare lo stesso:"}
          </p>
          <ul className="space-y-2">
            {empty.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => onJump(s.i)}
                  className="flex w-full items-center justify-between gap-3 rounded-xl border border-primary/15 bg-white px-4 py-4 text-left"
                >
                  <span className="font-phenomena text-[15px] font-bold text-primary">
                    {s.i + 1} · {s.title}
                  </span>
                  <span className="shrink-0 font-phenomena text-sm font-bold text-coral">Vai →</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {issues.length > 0 && (
        <div className="space-y-3 rounded-xl border border-coral/40 bg-coral/10 p-4">
          <p className="font-phenomena text-[15px] font-bold text-primary">
            Prima di inviare, sistema questi punti:
          </p>
          <ul className="space-y-2">
            {issues.map((iss, k) => (
              <li key={k}>
                <button
                  type="button"
                  onClick={() => onJump(stepIndexOf(iss.step))}
                  className="text-left text-[15px] text-primary underline decoration-coral underline-offset-4"
                >
                  {iss.message}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {sendError && (
        <div role="alert" className="rounded-xl border border-coral/50 bg-coral/10 p-4 text-[15px] leading-relaxed text-primary">
          {sendError}
        </div>
      )}

      <p className="text-[15px] text-primary/60">
        Quando sei pronta, premi Invia: le risposte arrivano direttamente a me.
      </p>
    </section>
  );
}

// ---------- Contenuto dei singoli step ----------

function StepContent({
  id,
  data,
  setData,
}: {
  id: StepId;
  data: OnboardingData;
  setData: React.Dispatch<React.SetStateAction<OnboardingData>>;
}) {
  switch (id) {
    case "sms":
      return (
        <>
          <Explanation>
            Mi servono per entrare nel tuo account, analizzare il database delle clienti, impostare
            i filtri e preparare le campagne. Non cambierò impostazioni dell&apos;account né invierò
            nulla senza il tuo ok scritto. Se sull&apos;account è attiva la verifica in due passaggi,
            scrivimelo nel campo note: ci accordiamo su come passarmi il codice al primo accesso.
          </Explanation>
          <Field id="sms-user" label="Email o username">
            <input
              id="sms-user"
              type="text"
              inputMode="email"
              value={data.sms.user}
              maxLength={LIMITS.short}
              autoComplete="off"
              {...noAuto}
              onChange={(e) => setData((d) => ({ ...d, sms: { ...d.sms, user: e.target.value } }))}
              className={inputCls}
            />
          </Field>
          <Field id="sms-pass" label="Password">
            <PasswordInput
              id="sms-pass"
              value={data.sms.password}
              onChange={(v) => setData((d) => ({ ...d, sms: { ...d.sms, password: v } }))}
            />
          </Field>
          <Field id="sms-note" label="Note (facoltativo)">
            <textarea
              id="sms-note"
              rows={3}
              value={data.sms.note}
              maxLength={LIMITS.note}
              onChange={(e) => setData((d) => ({ ...d, sms: { ...d.sms, note: e.target.value } }))}
              className={`${inputCls} resize-y`}
            />
          </Field>
        </>
      );

    case "calendario":
      return <CalendarStep data={data} setData={setData} />;

    case "wp":
      return (
        <>
          <Explanation>
            Mi serve per verificare il sito, fare un backup e inserire la funzione di recesso online
            e l&apos;avviso sulla garanzia legale, che oggi sono obbligatori per chi vende online.
            Prima di qualsiasi modifica faccio sempre una copia di sicurezza del sito.
          </Explanation>
          <Field id="wp-url" label="Indirizzo della pagina di login">
            <input
              id="wp-url"
              type="text"
              inputMode="url"
              placeholder="https://.../wp-admin"
              value={data.wp.loginUrl}
              maxLength={LIMITS.url}
              autoComplete="off"
              {...noAuto}
              onChange={(e) => setData((d) => ({ ...d, wp: { ...d.wp, loginUrl: e.target.value } }))}
              className={inputCls}
            />
          </Field>
          <Field id="wp-user" label="Username">
            <input
              id="wp-user"
              type="text"
              value={data.wp.user}
              maxLength={LIMITS.short}
              autoComplete="off"
              {...noAuto}
              onChange={(e) => setData((d) => ({ ...d, wp: { ...d.wp, user: e.target.value } }))}
              className={inputCls}
            />
          </Field>
          <Field id="wp-pass" label="Password">
            <PasswordInput
              id="wp-pass"
              value={data.wp.password}
              onChange={(v) => setData((d) => ({ ...d, wp: { ...d.wp, password: v } }))}
            />
          </Field>
          <Field id="wp-note" label="Note (facoltativo)">
            <textarea
              id="wp-note"
              rows={3}
              value={data.wp.note}
              maxLength={LIMITS.note}
              onChange={(e) => setData((d) => ({ ...d, wp: { ...d.wp, note: e.target.value } }))}
              className={`${inputCls} resize-y`}
            />
          </Field>
        </>
      );

    case "prodotti":
      return (
        <>
          <Explanation>
            Scegli 4 o 5 pezzi nuovi che non sono ancora sul sito. Durante la giornata di formazione
            li fotograferemo e li pubblicheremo insieme, così impari il metodo su prodotti veri e
            alla fine sono già online. Meglio se sono diversi tra loro: per esempio una collana, un
            paio di orecchini, un bracciale e un accessorio moda.
          </Explanation>
          {data.prodotti.map((p, i) => (
            <Field
              key={i}
              id={`prodotto-${i}`}
              label={i === 4 ? `Prodotto ${i + 1} (facoltativo)` : `Prodotto ${i + 1}`}
            >
              <input
                id={`prodotto-${i}`}
                type="text"
                value={p}
                maxLength={LIMITS.prodotto}
                onChange={(e) =>
                  setData((d) => ({
                    ...d,
                    prodotti: d.prodotti.map((x, j) => (j === i ? e.target.value : x)),
                  }))
                }
                className={inputCls}
              />
            </Field>
          ))}
        </>
      );

    case "foto": {
      const toggle = (tool: string) =>
        setData((d) => {
          const has = d.foto.strumenti.includes(tool);
          return {
            ...d,
            foto: {
              ...d.foto,
              strumenti: has ? d.foto.strumenti.filter((t) => t !== tool) : [...d.foto.strumenti, tool],
            },
          };
        });
      return (
        <>
          <Explanation>
            Non serve attrezzatura costosa. Mi serve sapere cosa hai già a disposizione per costruire
            un metodo che tu possa ripetere in 5 minuti a prodotto, sempre uguale, così il catalogo
            ha un aspetto ordinato.
          </Explanation>
          <fieldset className="space-y-2">
            <legend className="mb-2 font-phenomena text-sm font-bold text-primary/80">
              Cosa hai a disposizione
            </legend>
            {PHOTO_TOOLS.map((tool) => {
              const checked = data.foto.strumenti.includes(tool);
              return (
                <label
                  key={tool}
                  className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
                    checked ? "border-coral bg-coral/10" : "border-primary/15 bg-white"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggle(tool)}
                    className="h-5 w-5 shrink-0 accent-[#ee826d]"
                  />
                  <span className="font-phenomena text-base text-primary">{tool}</span>
                </label>
              );
            })}
          </fieldset>
          {data.foto.strumenti.includes("Altro") && (
            <Field id="foto-altro" label="Altro: cosa?">
              <input
                id="foto-altro"
                type="text"
                value={data.foto.altro}
                maxLength={LIMITS.short}
                onChange={(e) => setData((d) => ({ ...d, foto: { ...d.foto, altro: e.target.value } }))}
                className={inputCls}
              />
            </Field>
          )}
          <Field id="foto-spazio" label="In che spazio del negozio pensi di scattare?">
            <textarea
              id="foto-spazio"
              rows={3}
              value={data.foto.spazio}
              maxLength={LIMITS.spazio}
              onChange={(e) => setData((d) => ({ ...d, foto: { ...d.foto, spazio: e.target.value } }))}
              className={`${inputCls} resize-y`}
            />
          </Field>
        </>
      );
    }

    case "info":
      return (
        <>
          <Explanation>
            Scrivimi quali informazioni hai di solito quando arriva o crei un pezzo. Mi serve per
            preparare una scheda prodotto tipo, uguale per tutti gli articoli. Prendi come esempio
            un gioiello che hai in negozio e descrivilo così:
          </Explanation>
          <div className="rounded-xl border border-accent-2/40 bg-accent-2/10 p-4 font-phenomena text-[15px] leading-relaxed text-primary/85">
            <p className="font-bold">Collana Luna</p>
            <p>Metallo: argento 925 placcato oro</p>
            <p>Pietra: ametista naturale, sfera da 12 mm</p>
            <p>Lunghezza: 45 cm più 5 cm di catenella regolabile</p>
            <p>Chiusura: moschettone</p>
            <p>Provenienza della pietra: Brasile</p>
            <p>Lavorazione: fatta a mano in negozio</p>
            <p>Pezzi disponibili: 2</p>
            <p>Prezzo: 68 €</p>
            <p>Cura: evitare il contatto con profumi e acqua</p>
          </div>
          <Explanation>
            Se non hai tutte queste informazioni va benissimo, scrivi solo quelle che hai di solito.
          </Explanation>
          <Field id="info" label="Le tue informazioni">
            <textarea
              id="info"
              rows={10}
              value={data.info}
              maxLength={LIMITS.info}
              onChange={(e) => setData((d) => ({ ...d, info: e.target.value }))}
              className={`${inputCls} resize-y`}
            />
          </Field>
        </>
      );

    case "video":
      return (
        <>
          <Explanation>
            Mandami 3 o 4 video o profili che ti piacciono come stile, anche se non c&apos;entrano
            niente con i gioielli: un modo di parlare in camera, un montaggio, una luce, un formato.
            Mi aiuta a capire cosa hai in mente prima della giornata di riprese e a preparare script
            e ganci iniziali che ti somiglino.
          </Explanation>
          {data.video.map((v, i) => {
            const setVideo = (patch: Partial<typeof v>) =>
              setData((d) => ({
                ...d,
                video: d.video.map((x, j) => (j === i ? { ...x, ...patch } : x)),
              }));
            return (
              <div key={i} className="space-y-4 rounded-2xl border border-primary/15 bg-white/60 p-4">
                <p className="font-phenomena text-sm font-bold uppercase tracking-wider text-primary/50">
                  Video {i + 1}
                </p>
                <Field id={`video-url-${i}`} label="Link al video o al profilo">
                  <input
                    id={`video-url-${i}`}
                    type="text"
                    inputMode="url"
                    placeholder="https://www.instagram.com/..."
                    value={v.url}
                    maxLength={LIMITS.url}
                    autoComplete="off"
                    {...noAuto}
                    onChange={(e) => setVideo({ url: e.target.value })}
                    className={inputCls}
                  />
                </Field>
                <Field id={`video-com-${i}`} label="Cosa ti piace di questo?">
                  <input
                    id={`video-com-${i}`}
                    type="text"
                    value={v.commento}
                    maxLength={LIMITS.commento}
                    onChange={(e) => setVideo({ commento: e.target.value })}
                    className={inputCls}
                  />
                </Field>
              </div>
            );
          })}
        </>
      );
  }
}

function CalendarStep({
  data,
  setData,
}: {
  data: OnboardingData;
  setData: React.Dispatch<React.SetStateAction<OnboardingData>>;
}) {
  const setRow = (id: string, patch: Partial<OnboardingData["calendario"][number]>) =>
    setData((d) => ({
      ...d,
      calendario: d.calendario.map((r) => (r.id === id ? { ...r, ...patch } : r)),
    }));

  const removeRow = (id: string) =>
    setData((d) => {
      const rest = d.calendario.filter((r) => r.id !== id);
      return { ...d, calendario: rest.length ? rest : [emptyCalendarRow()] };
    });

  const addRow = () =>
    setData((d) =>
      d.calendario.length >= LIMITS.calendarRows
        ? d
        : { ...d, calendario: [...d.calendario, emptyCalendarRow()] },
    );

  return (
    <>
      <Explanation>
        Segna tutto quello che succede da qui al 31 dicembre: eventi, giorni di chiusura, arrivi di
        nuove collezioni, promozioni che hai già in mente. Serve a costruire il calendario dei
        messaggi alle clienti: un SMS che annuncia un arrivo il giorno in cui la merce è in negozio
        rende molto di più di uno mandato a caso.
      </Explanation>

      <div className="space-y-4">
        {data.calendario.map((r, i) => {
          const missingStart = !isCalendarRowEmpty(r) && !r.start;
          const badEnd = !!r.start && !!r.end && r.end < r.start;
          return (
            <div key={r.id} className="space-y-4 rounded-2xl border border-primary/15 bg-white/60 p-4">
              <div className="flex items-center justify-between">
                <p className="font-phenomena text-sm font-bold uppercase tracking-wider text-primary/50">
                  Data {i + 1}
                </p>
                {(data.calendario.length > 1 || !isCalendarRowEmpty(r)) && (
                  <button
                    type="button"
                    onClick={() => removeRow(r.id)}
                    className="flex h-10 items-center gap-1 rounded-full px-3 font-phenomena text-sm font-bold text-primary/60 hover:text-coral"
                  >
                    <Trash2 size={16} /> Rimuovi
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field id={`cal-start-${r.id}`} label="Data o inizio">
                  <input
                    id={`cal-start-${r.id}`}
                    type="date"
                    value={r.start}
                    onChange={(e) => setRow(r.id, { start: e.target.value })}
                    className={`${inputCls} min-h-12 px-3 ${missingStart ? "border-coral" : ""}`}
                  />
                </Field>
                <Field id={`cal-end-${r.id}`} label="Fine (facoltativa)">
                  <input
                    id={`cal-end-${r.id}`}
                    type="date"
                    value={r.end}
                    min={r.start || undefined}
                    onChange={(e) => setRow(r.id, { end: e.target.value })}
                    className={`${inputCls} min-h-12 px-3 ${badEnd ? "border-coral" : ""}`}
                  />
                </Field>
              </div>
              {missingStart && (
                <p className="text-sm text-coral">Inserisci almeno la data di inizio.</p>
              )}
              {badEnd && <p className="text-sm text-coral">La fine è prima dell&apos;inizio.</p>}
              <Field id={`cal-tipo-${r.id}`} label="Tipo">
                <select
                  id={`cal-tipo-${r.id}`}
                  value={r.tipo}
                  onChange={(e) => setRow(r.id, { tipo: e.target.value })}
                  className={`${inputCls} min-h-12`}
                >
                  {CALENDAR_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id={`cal-desc-${r.id}`} label="Descrizione breve">
                <input
                  id={`cal-desc-${r.id}`}
                  type="text"
                  value={r.descrizione}
                  maxLength={LIMITS.descrizione}
                  onChange={(e) => setRow(r.id, { descrizione: e.target.value })}
                  className={inputCls}
                />
              </Field>
            </div>
          );
        })}
      </div>

      {data.calendario.length < LIMITS.calendarRows && (
        <button
          type="button"
          onClick={addRow}
          className="flex h-14 w-full items-center justify-center gap-2 rounded-full border-2 border-dashed border-primary/25 font-phenomena text-base font-bold text-primary/70 hover:border-coral hover:text-coral"
        >
          <Plus size={18} /> Aggiungi data
        </button>
      )}
    </>
  );
}
