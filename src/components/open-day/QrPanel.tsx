"use client";

import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";

export default function QrPanel() {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    setUrl(`${window.location.origin}/open-day/vota`);
  }, []);

  if (!url) return null;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-xl border border-primary/5">
        <QRCodeSVG value={url} size={220} bgColor="#ffffff" fgColor="#474747" level="M" />
      </div>
      <p className="text-lg md:text-2xl opacity-70" style={{ fontFamily: "Sailors, Georgia, serif" }}>
        Inquadra il QR e vota dal telefono
      </p>
    </div>
  );
}
