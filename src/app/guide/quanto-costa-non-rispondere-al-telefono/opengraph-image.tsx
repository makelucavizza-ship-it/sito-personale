import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Quanto Costa Non Rispondere al Telefono | Luca Vizza";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    <div
      style={{
        backgroundColor: "#474747",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        fontFamily: "sans-serif",
        position: "relative",
      }}
    >
      <div style={{ display: "flex", gap: "8px", marginBottom: "32px" }}>
        {["#ee826d", "#ffbd59", "#5bc783", "#3ad3ef", "#544fb3", "#5ed5bf"].map((c) => (
          <div key={c} style={{ width: 36, height: 6, backgroundColor: c, borderRadius: 3 }} />
        ))}
      </div>
      <div style={{ fontSize: 16, color: "#ee826d", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "20px" }}>
        Analisi
      </div>
      <div style={{ fontSize: 56, color: "#f5f0eb", fontWeight: 700, lineHeight: 1.1, marginBottom: "24px" }}>
        Quanto costa non rispondere
        al telefono
      </div>
      <div style={{ fontSize: 22, color: "#f5f0ebaa", lineHeight: 1.4 }}>
        Il calcolo che la maggior parte delle attività non fa
      </div>
      <div style={{ position: "absolute", bottom: 60, right: 80, fontSize: 16, color: "#f5f0eb40" }}>
        lucavizza.it
      </div>
    </div>,
    { ...size }
  );
}
