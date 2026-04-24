import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-primary text-bg mt-20">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="mb-6">
              <Image
                src="/logo-full.png"
                alt="Luca Vizza"
                width={260}
                height={55}
                className="brightness-0 invert"
              />
            </div>
            <p className="text-bg/70 text-sm leading-relaxed">
              Marketing digitale e automazione AI
              <br />
              per PMI italiane.
            </p>
            <p className="text-bg/40 text-xs mt-4">
              P.IVA in fase di attivazione
            </p>
          </div>

          {/* Links */}
          <div>
            <h4
              className="text-bg/50 text-xs uppercase tracking-widest mb-4"
              style={{ fontFamily: "Phenomena, sans-serif" }}
            >
              Pagine
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/servizi/marketing-digitale", label: "Marketing Digitale" },
                { href: "/servizi/automazione-ai", label: "AI Automation" },
                { href: "/portfolio", label: "Portfolio" },
                { href: "/chi-sono", label: "Chi sono" },
                { href: "/agenzie", label: "Per le agenzie" },
                { href: "/audit", label: "Audit gratuito" },
                { href: "/contatti", label: "Contatti" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-bg/70 hover:text-bg transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4
              className="text-bg/50 text-xs uppercase tracking-widest mb-4"
              style={{ fontFamily: "Phenomena, sans-serif" }}
            >
              Seguimi
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="https://linkedin.com/in/lucavizza"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="linkedin"
                className="flex items-center gap-3 text-sm text-bg/70 hover:text-bg transition-colors group"
              >
                <span className="w-8 h-8 rounded-full border border-bg/20 flex items-center justify-center group-hover:border-[#0077B5] group-hover:bg-[#0077B5]/10 transition-all">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z" />
                  </svg>
                </span>
                LinkedIn
              </a>
              <a
                href="https://instagram.com/lucavizza"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="instagram"
                className="flex items-center gap-3 text-sm text-bg/70 hover:text-bg transition-colors group"
              >
                <span className="w-8 h-8 rounded-full border border-bg/20 flex items-center justify-center group-hover:border-[#E1306C] group-hover:bg-[#E1306C]/10 transition-all">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </span>
                Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-bg/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative">
          <div className="absolute right-0 bottom-0 pointer-events-none opacity-30 hidden md:block">
            <Image src="/pesce-mandarino-2-nobg.png" alt="" width={110} height={57} className="brightness-0 invert drop-shadow-sm" />
          </div>
          <p className="text-bg/40 text-xs">
            © {new Date().getFullYear()} Luca Vizza. Tutti i diritti riservati.
          </p>
          <Link
            href="/contatti"
            className="text-xs text-bg/40 hover:text-bg/70 transition-colors"
          >
            contatti →
          </Link>
        </div>
      </div>
    </footer>
  );
}
