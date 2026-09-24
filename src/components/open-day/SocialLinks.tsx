import { SOCIAL_LINKS } from "@/data/open-day";

// Stesse icone inline usate nel Footer del sito, per coerenza visiva.
export default function SocialLinks({ size = 36 }: { size?: number }) {
  const iconSize = Math.round(size * 0.45);

  return (
    <div className="flex items-center gap-3">
      <a
        href={SOCIAL_LINKS.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
        className="rounded-full border border-primary/15 flex items-center justify-center text-primary/60 hover:border-[#0077B5] hover:text-[#0077B5] active:scale-95 transition-colors flex-shrink-0"
        style={{ width: size, height: size }}
      >
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z" />
        </svg>
      </a>
      <a
        href={SOCIAL_LINKS.instagram}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className="rounded-full border border-primary/15 flex items-center justify-center text-primary/60 hover:border-[#E1306C] hover:text-[#E1306C] active:scale-95 transition-colors flex-shrink-0"
        style={{ width: size, height: size }}
      >
        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      </a>
    </div>
  );
}
