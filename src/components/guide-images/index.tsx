// Guide SVG illustrations — hero, inline and card variants.
// Each exports a component that accepts optional className and size ("hero" | "card" | "inline").

type IllustrationProps = {
  className?: string;
  size?: "hero" | "card" | "inline";
};

const dims = {
  hero: { w: 320, h: 200 },
  card: { w: 80, h: 56 },
  inline: { w: 240, h: 150 },
};

// ─── 1. Agente vocale AI ────────────────────────────────────────────────────
export function AgenteVocaleIllustration({ className, size = "hero" }: IllustrationProps) {
  const c = "#3ad3ef";
  const { w, h } = dims[size];
  return (
    <svg viewBox="0 0 320 200" width={w} height={h} fill="none" className={className} aria-hidden="true">
      {/* Phone body */}
      <rect x="120" y="30" width="80" height="140" rx="14" stroke={c} strokeWidth="2.5" fill={c + "0d"} />
      {/* Screen */}
      <rect x="130" y="50" width="60" height="80" rx="5" fill={c + "20"} />
      {/* Waveform on screen */}
      <path d="M140 90 L145 75 L152 105 L158 68 L164 112 L170 78 L176 95 L180 90" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Home button */}
      <circle cx="160" cy="148" r="6" stroke={c} strokeWidth="2" />
      {/* Speaker grill */}
      <path d="M148 38 h24" stroke={c} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      {/* Left sound waves */}
      <path d="M104 100 Q110 85 110 100 Q110 115 104 100" stroke={c} strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
      <path d="M90 100 Q100 75 100 100 Q100 125 90 100" stroke={c} strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
      <path d="M76 100 Q90 65 90 100 Q90 135 76 100" stroke={c} strokeWidth="2.5" strokeLinecap="round" opacity="0.3" />
      {/* Right sound waves */}
      <path d="M216 100 Q210 85 210 100 Q210 115 216 100" stroke={c} strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
      <path d="M230 100 Q220 75 220 100 Q220 125 230 100" stroke={c} strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
      <path d="M244 100 Q230 65 230 100 Q230 135 244 100" stroke={c} strokeWidth="2.5" strokeLinecap="round" opacity="0.3" />
      {/* AI label chip */}
      <rect x="140" y="104" width="40" height="16" rx="4" fill={c + "30"} />
      <text x="160" y="116" textAnchor="middle" fill={c} fontSize="9" fontFamily="sans-serif" fontWeight="700">AI</text>
    </svg>
  );
}

// ─── 2. Chiamate ristorante ──────────────────────────────────────────────────
export function ChiamateRistoranteIllustration({ className, size = "hero" }: IllustrationProps) {
  const c = "#ee826d";
  const { w, h } = dims[size];
  return (
    <svg viewBox="0 0 320 200" width={w} height={h} fill="none" className={className} aria-hidden="true">
      {/* Phone ringing */}
      <rect x="100" y="40" width="70" height="120" rx="12" stroke={c} strokeWidth="2.5" fill={c + "0d"} />
      <rect x="110" y="56" width="50" height="68" rx="4" fill={c + "18"} />
      <circle cx="135" cy="148" r="6" stroke={c} strokeWidth="2" />
      <path d="M123 48 h24" stroke={c} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      {/* Missed call X */}
      <circle cx="135" cy="90" r="14" fill="#ee826d20" stroke={c} strokeWidth="2" />
      <path d="M128 83 L142 97 M142 83 L128 97" stroke={c} strokeWidth="2.5" strokeLinecap="round" />
      {/* Ring arcs */}
      <path d="M84 65 Q72 80 80 100" stroke={c} strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
      <path d="M73 55 Q56 75 66 105" stroke={c} strokeWidth="2.5" strokeLinecap="round" opacity="0.35" />
      {/* Fork */}
      <path d="M210 50 L210 90" stroke={c} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M205 50 L205 65" stroke={c} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M215 50 L215 65" stroke={c} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <path d="M205 65 Q210 72 215 65" stroke={c} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
      {/* Knife */}
      <path d="M235 50 L235 95" stroke={c} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M235 50 Q245 60 240 70 Q235 75 235 75" stroke={c} strokeWidth="2" fill={c + "20"} />
      {/* Plate */}
      <ellipse cx="222" cy="140" rx="40" ry="12" stroke={c} strokeWidth="2" fill={c + "08"} />
      <ellipse cx="222" cy="140" rx="26" ry="7" stroke={c} strokeWidth="1.5" opacity="0.5" />
      {/* Coins falling */}
      <circle cx="270" cy="80" r="8" stroke={c} strokeWidth="1.5" fill={c + "15"} />
      <text x="270" y="84" textAnchor="middle" fill={c} fontSize="8" fontFamily="sans-serif">€</text>
      <circle cx="280" cy="110" r="8" stroke={c} strokeWidth="1.5" fill={c + "15"} opacity="0.7" />
      <text x="280" y="114" textAnchor="middle" fill={c} fontSize="8" fontFamily="sans-serif">€</text>
      <circle cx="265" cy="135" r="8" stroke={c} strokeWidth="1.5" fill={c + "15"} opacity="0.5" />
      <text x="265" y="139" textAnchor="middle" fill={c} fontSize="8" fontFamily="sans-serif">€</text>
    </svg>
  );
}

// ─── 3. Automazione AI ristoranti ────────────────────────────────────────────
export function AIRistorantiIllustration({ className, size = "hero" }: IllustrationProps) {
  const c = "#5bc783";
  const { w, h } = dims[size];
  return (
    <svg viewBox="0 0 320 200" width={w} height={h} fill="none" className={className} aria-hidden="true">
      {/* Center gear */}
      <circle cx="160" cy="100" r="28" stroke={c} strokeWidth="2.5" fill={c + "10"} />
      <circle cx="160" cy="100" r="14" stroke={c} strokeWidth="2" fill={c + "20"} />
      {/* Gear teeth */}
      {[0,45,90,135,180,225,270,315].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x1 = 160 + 28 * Math.cos(rad);
        const y1 = 100 + 28 * Math.sin(rad);
        const x2 = 160 + 36 * Math.cos(rad);
        const y2 = 100 + 36 * Math.sin(rad);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth="4" strokeLinecap="round" />;
      })}
      {/* Fork in center of gear */}
      <path d="M155 93 L155 107 M160 93 L160 107 M165 93 L165 107" stroke={c} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      {/* Connected nodes with dotted lines */}
      {/* Phone node - top left */}
      <circle cx="68" cy="50" r="20" stroke={c} strokeWidth="2" fill={c + "0d"} />
      <path d="M60 44 Q59 52 63 56 Q67 60 75 59 L73 55 Q70 55 67 52 Q65 49 65 46 Z" stroke={c} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <line x1="88" y1="56" x2="135" y2="82" stroke={c} strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" />
      {/* Calendar node - top right */}
      <circle cx="252" cy="50" r="20" stroke={c} strokeWidth="2" fill={c + "0d"} />
      <rect x="242" y="43" width="20" height="16" rx="2" stroke={c} strokeWidth="1.5" />
      <path d="M242 48 h20" stroke={c} strokeWidth="1.5" />
      <rect x="245" y="52" width="4" height="4" rx="1" fill={c} opacity="0.6" />
      <rect x="252" y="52" width="4" height="4" rx="1" fill={c} />
      <line x1="232" y1="56" x2="185" y2="82" stroke={c} strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" />
      {/* WhatsApp-like chat node - bottom left */}
      <circle cx="68" cy="150" r="20" stroke={c} strokeWidth="2" fill={c + "0d"} />
      <path d="M58 145 Q58 156 64 160 L60 165 L67 161 Q75 163 78 157 Q82 148 75 143 Q65 138 58 145 Z" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <line x1="88" y1="144" x2="135" y2="118" stroke={c} strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" />
      {/* Star/review node - bottom right */}
      <circle cx="252" cy="150" r="20" stroke={c} strokeWidth="2" fill={c + "0d"} />
      <path d="M252 140 L254.5 146.5 L262 146.5 L256 151 L258 158 L252 154 L246 158 L248 151 L242 146.5 L249.5 146.5 Z" stroke={c} strokeWidth="1.5" fill={c + "30"} strokeLinejoin="round" />
      <line x1="232" y1="144" x2="185" y2="118" stroke={c} strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6" />
      {/* Check mark in gear center */}
      <path d="M154 100 L158 104 L166 96" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── 4. Saloni e centri estetici ─────────────────────────────────────────────
export function SaloniIllustration({ className, size = "hero" }: IllustrationProps) {
  const c = "#544fb3";
  const { w, h } = dims[size];
  return (
    <svg viewBox="0 0 320 200" width={w} height={h} fill="none" className={className} aria-hidden="true">
      {/* Scissors - large, center */}
      <circle cx="148" cy="92" r="8" stroke={c} strokeWidth="2.5" fill={c + "20"} />
      <circle cx="172" cy="92" r="8" stroke={c} strokeWidth="2.5" fill={c + "20"} />
      <line x1="144" y1="88" x2="100" y2="50" stroke={c} strokeWidth="3" strokeLinecap="round" />
      <line x1="152" y1="96" x2="100" y2="145" stroke={c} strokeWidth="3" strokeLinecap="round" />
      <line x1="176" y1="88" x2="220" y2="50" stroke={c} strokeWidth="3" strokeLinecap="round" />
      <line x1="168" y1="96" x2="220" y2="145" stroke={c} strokeWidth="3" strokeLinecap="round" />
      <line x1="155" y1="92" x2="165" y2="92" stroke={c} strokeWidth="2" />
      {/* Phone with green check - left */}
      <rect x="38" y="55" width="44" height="76" rx="8" stroke={c} strokeWidth="2" fill={c + "08"} />
      <rect x="44" y="66" width="32" height="42" rx="3" fill={c + "15"} />
      <circle cx="60" cy="120" r="4" stroke={c} strokeWidth="1.5" />
      {/* Green tick on phone screen */}
      <circle cx="60" cy="87" r="12" fill="#5bc78320" stroke="#5bc783" strokeWidth="1.5" />
      <path d="M54 87 L58 91 L66 83" stroke="#5bc783" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Calendar - right */}
      <rect x="238" y="55" width="50" height="56" rx="6" stroke={c} strokeWidth="2" fill={c + "08"} />
      <path d="M238 68 h50" stroke={c} strokeWidth="1.5" />
      <path d="M250 55 v-8 M276 55 v-8" stroke={c} strokeWidth="2" strokeLinecap="round" />
      {/* Calendar dots */}
      {[0,1,2,3,4,5,6,7,8].map((i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const filled = [1,3,4,7].includes(i);
        return (
          <circle key={i} cx={246 + col * 14} cy={78 + row * 14} r="4"
            fill={filled ? c : c + "20"}
            stroke={c} strokeWidth="1" />
        );
      })}
      {/* Comb */}
      <rect x="130" y="150" width="60" height="6" rx="3" stroke={c} strokeWidth="1.5" fill={c + "20"} />
      {[135,142,149,156,163,170,177].map((x, i) => (
        <line key={i} x1={x} y1="156" x2={x} y2="168" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
      ))}
    </svg>
  );
}

// ─── 5. Quanto costa non rispondere ─────────────────────────────────────────
export function CostoChamateIllustration({ className, size = "hero" }: IllustrationProps) {
  const c = "#ee826d";
  const { w, h } = dims[size];
  return (
    <svg viewBox="0 0 320 200" width={w} height={h} fill="none" className={className} aria-hidden="true">
      {/* Declining bar chart background */}
      <rect x="40" y="140" width="30" height="40" rx="3" fill={c + "30"} />
      <rect x="80" y="115" width="30" height="65" rx="3" fill={c + "40"} />
      <rect x="120" y="85" width="30" height="95" rx="3" fill={c + "55"} />
      <path d="M35 145 L165 145" stroke={c} strokeWidth="1.5" opacity="0.4" />
      {/* Downward arrow */}
      <path d="M55 50 L55 130" stroke={c} strokeWidth="2" strokeDasharray="5 3" opacity="0.4" />
      <path d="M48 122 L55 132 L62 122" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.4" />
      {/* Phone with X - center right */}
      <rect x="175" y="48" width="58" height="100" rx="10" stroke={c} strokeWidth="2.5" fill={c + "0d"} />
      <rect x="183" y="62" width="42" height="56" rx="4" fill={c + "18"} />
      <circle cx="204" cy="134" r="5" stroke={c} strokeWidth="2" />
      {/* X on screen */}
      <circle cx="204" cy="90" r="16" fill="#ee826d25" stroke={c} strokeWidth="2" />
      <path d="M196 82 L212 98 M212 82 L196 98" stroke={c} strokeWidth="2.5" strokeLinecap="round" />
      {/* Falling coins */}
      <circle cx="255" cy="65" r="10" stroke={c} strokeWidth="1.5" fill={c + "15"} />
      <text x="255" y="70" textAnchor="middle" fill={c} fontSize="11" fontFamily="sans-serif" fontWeight="bold">€</text>
      <circle cx="268" cy="95" r="10" stroke={c} strokeWidth="1.5" fill={c + "12"} />
      <text x="268" y="100" textAnchor="middle" fill={c} fontSize="11" fontFamily="sans-serif" fontWeight="bold">€</text>
      <circle cx="258" cy="125" r="10" stroke={c} strokeWidth="1.5" fill={c + "10"} />
      <text x="258" y="130" textAnchor="middle" fill={c} fontSize="11" fontFamily="sans-serif" fontWeight="bold">€</text>
      {/* Formula label */}
      <rect x="38" y="30" width="110" height="22" rx="4" fill={c + "15"} />
      <text x="93" y="45" textAnchor="middle" fill={c} fontSize="10" fontFamily="sans-serif" fontWeight="600">chiamate perse × €</text>
    </svg>
  );
}

// ─── 6. Studi medici e ambulatori ────────────────────────────────────────────
export function StudiMediciIllustration({ className, size = "hero" }: IllustrationProps) {
  const c = "#5bc783";
  const { w, h } = dims[size];
  return (
    <svg viewBox="0 0 320 200" width={w} height={h} fill="none" className={className} aria-hidden="true">
      {/* Medical cross */}
      <rect x="138" y="60" width="44" height="80" rx="6" fill={c + "15"} stroke={c} strokeWidth="2.5" />
      <rect x="118" y="80" width="84" height="40" rx="6" fill={c + "15"} stroke={c} strokeWidth="2.5" />
      <rect x="148" y="70" width="24" height="60" rx="4" fill={c + "30"} />
      <rect x="128" y="88" width="64" height="24" rx="4" fill={c + "30"} />
      {/* Calendar - top right */}
      <rect x="222" y="40" width="62" height="60" rx="7" stroke={c} strokeWidth="2" fill={c + "08"} />
      <path d="M222 54 h62" stroke={c} strokeWidth="1.5" />
      <path d="M236 40 v-10 M268 40 v-10" stroke={c} strokeWidth="2" strokeLinecap="round" />
      {[0,1,2,3,4,5].map((i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        return <circle key={i} cx={232 + col * 16} cy={64 + row * 14} r="4" fill={i === 1 || i === 4 ? c : c + "25"} stroke={c} strokeWidth="1" />;
      })}
      {/* GDPR Shield - bottom right */}
      <path d="M240 120 Q240 115 253 110 Q266 115 266 120 L266 140 Q266 150 253 155 Q240 150 240 140 Z" stroke={c} strokeWidth="2" fill={c + "12"} />
      <path d="M248 133 L252 137 L260 127" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <text x="253" y="148" textAnchor="middle" fill={c} fontSize="7" fontFamily="sans-serif" fontWeight="700">GDPR</text>
      {/* Stethoscope - left */}
      <path d="M55 55 Q55 85 75 90 Q95 95 95 120 Q95 140 80 145" stroke={c} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M75 55 Q75 85 75 90" stroke={c} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="80" cy="148" r="10" stroke={c} strokeWidth="2.5" fill={c + "15"} />
      <circle cx="80" cy="148" r="4" fill={c} opacity="0.5" />
      <circle cx="55" cy="55" r="5" fill={c + "30"} stroke={c} strokeWidth="1.5" />
      <circle cx="75" cy="55" r="5" fill={c + "30"} stroke={c} strokeWidth="1.5" />
    </svg>
  );
}

// ─── 7. Automatizzare gli appuntamenti ──────────────────────────────────────
export function AppuntamentiIllustration({ className, size = "hero" }: IllustrationProps) {
  const c = "#3ad3ef";
  const { w, h } = dims[size];
  return (
    <svg viewBox="0 0 320 200" width={w} height={h} fill="none" className={className} aria-hidden="true">
      {/* Central calendar */}
      <rect x="100" y="40" width="120" height="120" rx="10" stroke={c} strokeWidth="2.5" fill={c + "08"} />
      <path d="M100 62 h120" stroke={c} strokeWidth="2" />
      <path d="M122 40 v-14 M198 40 v-14" stroke={c} strokeWidth="2.5" strokeLinecap="round" />
      {/* Calendar header */}
      <text x="160" y="58" textAnchor="middle" fill={c} fontSize="10" fontFamily="sans-serif" fontWeight="700">MAGGIO</text>
      {/* Calendar cells with checkmarks */}
      {[
        [0,0,false],[1,0,true],[2,0,true],[3,0,false],
        [0,1,true],[1,1,true],[2,1,false],[3,1,true],
        [0,2,false],[1,2,true],[2,2,true],[3,2,true],
      ].map(([col, row, checked], i) => {
        const x = 112 + (col as number) * 26;
        const y = 74 + (row as number) * 26;
        return (
          <g key={i}>
            <rect x={x} y={y} width="20" height="20" rx="3" fill={checked ? c + "20" : "none"} stroke={c} strokeWidth="1" opacity="0.6" />
            {checked && <path d={`M${x+4} ${y+10} L${x+8} ${y+14} L${x+16} ${y+6}`} stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />}
          </g>
        );
      })}
      {/* Circular automation arrows */}
      <path d="M52 100 Q44 60 80 48" stroke={c} strokeWidth="2" strokeLinecap="round" fill="none" strokeDasharray="5 3" opacity="0.6" />
      <path d="M80 48 L74 42 M80 48 L74 54" stroke={c} strokeWidth="2" strokeLinecap="round" />
      <path d="M52 100 Q44 140 80 152" stroke={c} strokeWidth="2" strokeLinecap="round" fill="none" strokeDasharray="5 3" opacity="0.6" />
      <path d="M80 152 L74 146 M80 152 L86 148" stroke={c} strokeWidth="2" strokeLinecap="round" />
      {/* Right side arrows */}
      <path d="M268 100 Q276 60 240 48" stroke={c} strokeWidth="2" strokeLinecap="round" fill="none" strokeDasharray="5 3" opacity="0.6" />
      <path d="M268 100 Q276 140 240 152" stroke={c} strokeWidth="2" strokeLinecap="round" fill="none" strokeDasharray="5 3" opacity="0.6" />
      {/* Phone icon - left */}
      <circle cx="46" cy="100" r="18" fill={c + "10"} stroke={c} strokeWidth="2" />
      <path d="M39 95 Q38 101 41 105 Q44 109 50 108 L49 105 Q47 105 45 103 Q43 101 43 98 Z" stroke={c} strokeWidth="1.8" fill="none" strokeLinecap="round" />
      {/* WhatsApp icon - right */}
      <circle cx="274" cy="100" r="18" fill={c + "10"} stroke={c} strokeWidth="2" />
      <path d="M265 96 Q265 105 270 108 L267 114 L274 110 Q281 111 283 105 Q285 96 278 92 Q268 88 265 96 Z" stroke={c} strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// ─── 8. Marketing digitale PMI ──────────────────────────────────────────────
export function MarketingPMIIllustration({ className, size = "hero" }: IllustrationProps) {
  const c = "#ffbd59";
  const { w, h } = dims[size];
  return (
    <svg viewBox="0 0 320 200" width={w} height={h} fill="none" className={className} aria-hidden="true">
      {/* Growing bar chart */}
      <line x1="55" y1="155" x2="220" y2="155" stroke={c} strokeWidth="2" opacity="0.5" />
      <line x1="55" y1="155" x2="55" y2="40" stroke={c} strokeWidth="2" opacity="0.5" />
      {/* Bars */}
      <rect x="68" y="120" width="22" height="35" rx="3" fill={c + "30"} stroke={c} strokeWidth="1.5" />
      <rect x="100" y="100" width="22" height="55" rx="3" fill={c + "40"} stroke={c} strokeWidth="1.5" />
      <rect x="132" y="78" width="22" height="77" rx="3" fill={c + "55"} stroke={c} strokeWidth="1.5" />
      <rect x="164" y="55" width="22" height="100" rx="3" fill={c + "70"} stroke={c} strokeWidth="1.5" />
      <rect x="196" y="38" width="22" height="117" rx="3" fill={c} stroke={c} strokeWidth="1.5" />
      {/* Growth arrow over bars */}
      <path d="M65 125 L95 105 L128 83 L160 60 L193 42" stroke={c} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <circle cx="193" cy="42" r="4" fill={c} />
      {/* Megaphone - right side */}
      <path d="M240 80 L260 68 L260 132 L240 120 Z" stroke={c} strokeWidth="2" fill={c + "20"} strokeLinejoin="round" />
      <rect x="228" y="88" width="14" height="24" rx="3" stroke={c} strokeWidth="2" fill={c + "15"} />
      <path d="M248 132 L244 148 Q242 155 248 157 Q254 157 256 150 L258 132" stroke={c} strokeWidth="2" strokeLinecap="round" fill={c + "20"} />
      {/* Sound dots from megaphone */}
      <circle cx="270" cy="88" r="3" fill={c} opacity="0.7" />
      <circle cx="278" cy="96" r="3" fill={c} opacity="0.5" />
      <circle cx="282" cy="106" r="3" fill={c} opacity="0.35" />
      <circle cx="278" cy="116" r="3" fill={c} opacity="0.5" />
      <circle cx="270" cy="124" r="3" fill={c} opacity="0.7" />
      {/* Funnel - top left */}
      <path d="M38 42 L80 42 L67 62 L67 82 L51 82 L51 62 Z" stroke={c} strokeWidth="2" fill={c + "12"} strokeLinejoin="round" />
      <text x="59" y="58" textAnchor="middle" fill={c} fontSize="8" fontFamily="sans-serif">→</text>
    </svg>
  );
}
