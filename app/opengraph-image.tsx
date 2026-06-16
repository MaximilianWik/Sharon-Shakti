import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Sharon Shakti — Horror Realism · Blackwork · Dark Art";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px 96px",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Oxblood top accent */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "#9a1620" }} />

        {/* Label */}
        <div style={{ fontSize: 14, letterSpacing: "0.28em", textTransform: "uppercase", color: "#9a1620", marginBottom: 28 }}>
          Sharon Shakti Tattoo · Stockholm
        </div>

        {/* Name */}
        <div style={{ fontSize: 96, fontWeight: 300, color: "#f3f2ef", lineHeight: 0.92, letterSpacing: "-0.01em", marginBottom: 32 }}>
          Sharon Shakti
        </div>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
          <div style={{ height: 1, width: 80, background: "#3a3a3a" }} />
          <div style={{ width: 8, height: 8, background: "#9a1620", transform: "rotate(45deg)" }} />
          <div style={{ height: 1, width: 80, background: "#3a3a3a" }} />
        </div>

        {/* Subtitle */}
        <div style={{ fontSize: 22, color: "#7d7d7d", letterSpacing: "0.06em" }}>
          Horror Realism · Blackwork · Dark Art
        </div>

        {/* Bottom accent */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "#1c1c1c" }} />
      </div>
    ),
    { ...size }
  );
}
