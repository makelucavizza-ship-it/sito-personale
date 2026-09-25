// Emoji decorative a tema digital marketing / turismo, posizioni e tempi fissi (non random)
// per evitare mismatch di idratazione tra server e client.
const EMOJIS = [
  { emoji: "📱", top: "14%", left: "8%", size: "text-4xl", duration: 6, delay: 0 },
  { emoji: "🎯", top: "20%", left: "86%", size: "text-3xl", duration: 5, delay: 0.6 },
  { emoji: "📊", top: "72%", left: "10%", size: "text-4xl", duration: 7, delay: 1.2 },
  { emoji: "✈️", top: "12%", left: "46%", size: "text-3xl", duration: 5.5, delay: 0.3 },
  { emoji: "🏖️", top: "76%", left: "82%", size: "text-4xl", duration: 6.5, delay: 1.8 },
  { emoji: "🤖", top: "58%", left: "92%", size: "text-3xl", duration: 6, delay: 0.9 },
  { emoji: "📸", top: "84%", left: "45%", size: "text-3xl", duration: 5, delay: 2.1 },
  { emoji: "💡", top: "38%", left: "5%", size: "text-3xl", duration: 6.8, delay: 1.5 },
  { emoji: "📣", top: "42%", left: "94%", size: "text-2xl", duration: 5.2, delay: 0.4 },
  { emoji: "🌐", top: "6%", left: "70%", size: "text-2xl", duration: 6.2, delay: 2.4 },
] as const;

// Solo decorazione: nessun contenuto informativo, quindi fuori dall'albero di accessibilità.
export default function FloatingEmojis() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {EMOJIS.map((e, i) => (
        <span
          key={i}
          className={`absolute opacity-20 leading-none animate-float ${e.size}`}
          style={{ top: e.top, left: e.left, animationDuration: `${e.duration}s`, animationDelay: `${e.delay}s` }}
        >
          {e.emoji}
        </span>
      ))}
    </div>
  );
}
