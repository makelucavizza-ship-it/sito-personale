import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Luca Vizza — Marketing Digitale & AI Automation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#f5f0eb",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
          {["#3ad3ef", "#ffbd59", "#5bc783", "#544fb3", "#5ed5bf", "#ffbd59", "#5bc783", "#544fb3"].map(
            (c, i) => (
              <div key={i} style={{ width: 48, height: 6, background: c, borderRadius: 3 }} />
            )
          )}
        </div>
        <div style={{ fontSize: 96, fontWeight: 800, color: "#474747", lineHeight: 1 }}>
          LUCA VIZZA
        </div>
        <div style={{ fontSize: 40, color: "#ee826d", marginTop: 16 }}>
          Marketing Digitale &amp; AI Automation
        </div>
        <div style={{ fontSize: 28, color: "#474747", opacity: 0.5, marginTop: 24 }}>
          Cresciamo insieme con l&apos;AI — lucavizza.it
        </div>
      </div>
    ),
    size
  );
}
