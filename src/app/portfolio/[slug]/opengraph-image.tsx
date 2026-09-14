import { ImageResponse } from "next/og";
import { getPortfolioItem, getPortfolioItems } from "@/lib/markdown";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return getPortfolioItems().map((item) => ({ slug: item.slug }));
}

export async function alt({ params }: { params: { slug: string } }) {
  const item = getPortfolioItem(params.slug);
  return item ? item.title : "Luca Vizza — Portfolio";
}

export default function OGImage({ params }: { params: { slug: string } }) {
  const item = getPortfolioItem(params.slug);
  const color = item?.color ?? "#ee826d";

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

        <div style={{ display: "flex", fontSize: 20, color, marginBottom: 16, textTransform: "uppercase", letterSpacing: 2 }}>
          {`Portfolio — ${item?.sector ?? ""}`}
        </div>
        <div style={{ fontSize: 64, fontWeight: 800, color: "#f5f0eb", lineHeight: 1.1, marginBottom: 24, maxWidth: 900 }}>
          {item?.client ?? "Luca Vizza"}
        </div>
        <div style={{ fontSize: 26, color: "#f5f0eb99", maxWidth: 800, lineHeight: 1.5 }}>
          {item?.summary ?? "Marketing Digitale & AI Automation"}
        </div>

        <div style={{ position: "absolute", bottom: 80, right: 80, fontSize: 20, color: "#f5f0eb40" }}>
          lucavizza.it
        </div>
      </div>
    ),
    { ...size }
  );
}
