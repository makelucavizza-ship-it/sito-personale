import Image from "next/image";

export default function BrandCorner() {
  return (
    <>
      <div className="fixed top-4 left-4 md:top-6 md:left-6 z-40 flex items-center gap-3 md:gap-5">
        <Image
          src="/logo-luca-vizza-wide.png"
          alt="Luca Vizza"
          width={928}
          height={296}
          className="h-12 md:h-20 w-auto"
          priority
        />
        <Image
          src="/logo-its-academy.png"
          alt="ITS Academy Turismo Emilia-Romagna"
          width={236}
          height={172}
          className="h-16 md:h-28 w-auto"
          priority
        />
      </div>
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 opacity-40 pointer-events-none">
        <Image src="/pesce-mandarino-1-nobg.png" alt="" width={64} height={33} />
      </div>
    </>
  );
}
