import Image from "next/image";

export default function BrandCorner() {
  return (
    <>
      <div className="fixed top-4 left-4 md:top-6 md:left-6 z-40 flex items-center gap-2 md:gap-3 opacity-90">
        <Image
          src="/logo-luca-vizza-wide.png"
          alt="Luca Vizza"
          width={1034}
          height={488}
          className="h-7 md:h-9 w-auto"
          priority
        />
        <Image
          src="/logo-its-academy.png"
          alt="ITS Academy Turismo Emilia-Romagna"
          width={320}
          height={320}
          className="h-7 md:h-9 w-auto"
          priority
        />
      </div>
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 opacity-40 pointer-events-none">
        <Image src="/pesce-mandarino-1-nobg.png" alt="" width={64} height={33} />
      </div>
    </>
  );
}
