import Image from "next/image";

export default function BrandCorner({ dark = false }: { dark?: boolean }) {
  return (
    <>
      <div className="fixed top-4 left-4 md:top-6 md:left-6 z-40 opacity-90">
        <Image
          src="/logo-lv.png"
          alt="Luca Vizza"
          width={40}
          height={44}
          className={dark ? "brightness-0 invert" : ""}
        />
      </div>
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 opacity-40 pointer-events-none">
        <Image
          src="/pesce-mandarino-1-nobg.png"
          alt=""
          width={64}
          height={33}
          className={dark ? "brightness-0 invert" : ""}
        />
      </div>
    </>
  );
}
