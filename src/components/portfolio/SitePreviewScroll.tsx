export default function SitePreviewScroll({
  src,
  alt,
  color,
}: {
  src: string;
  alt: string;
  color: string;
}) {
  return (
    <div className="mb-12">
      <div
        className="relative w-full h-[480px] md:h-[560px] rounded-2xl overflow-y-auto border-2"
        style={{ borderColor: color + "40", backgroundColor: color + "08" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- altezza naturale per lo scroll, non gestibile con next/image senza dimensioni fisse per ogni sito */}
        <img src={src} alt={alt} className="w-full h-auto block" />
      </div>
      <p className="text-primary/30 text-xs mt-2 flex items-center gap-2">
        <span>scorri per vedere il sito</span>
        <span>↓</span>
      </p>
    </div>
  );
}
