import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Come non perdere chiamate al ristorante";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#474747",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", gap: 8, marginBottom: 40 }}>
          {["#3ad3ef", "#ffbd59", "#5bc783", "#544fb3", "#5ed5bf", "#ee826d"].map((c) => (
            <div key={c} style={{ width: 36, height: 6, borderRadius: 3, backgroundColor: c }} />
          ))}
        </div>
        <div style={{ fontSize: 20, color: "#ee826d", fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 24 }}>
          Ristorazione
        </div>
        <div style={{ fontSize: 60, fontWeight: 800, color: "#f5f0eb", lineHeight: 1.15, marginBottom: 32, maxWidth: 900 }}>
          Come non perdere chiamate quando sei in servizio
        </div>
        <div style={{ fontSize: 24, color: "#f5f0eb70", maxWidth: 700 }}>
          Guida pratica per ristoratori
        </div>
        <div style={{ position: "absolute", bottom: 80, right: 80, fontSize: 20, color: "#f5f0eb40" }}>
          lucavizza.it
        </div>
      </div>
    ),
    { ...size }
  );
}
