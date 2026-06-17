import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const runtime = "nodejs";
export const alt = "Sharon Shakti — Horror Realism · Blackwork · Dark Art";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://sharon-shakti.vercel.app";

  const fontData = readFileSync(
    join(process.cwd(), "app/fonts/SingleGhost.ttf")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#080808",
        }}
      >
        {/* Full-bleed banner image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${base}/banner/banner-desktop-ratio.png`}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center 30%",
          }}
        />

        {/* Base darkening */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(8,8,8,0.52)",
          }}
        />
        {/* Left vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.72) 42%, rgba(8,8,8,0.15) 100%)",
          }}
        />
        {/* Bottom vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(8,8,8,0.88) 0%, rgba(8,8,8,0.0) 55%)",
          }}
        />

        {/* Oxblood top bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 3,
            background: "#9a1620",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "absolute",
            bottom: 72,
            left: 88,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {/* Label */}
          <div
            style={{
              fontSize: 12,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "#9a1620",
              marginBottom: 22,
              fontFamily: "Georgia, serif",
            }}
          >
            Stockholm · Sweden
          </div>

          {/* Name — SingleGhost display font */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 108,
              fontWeight: 400,
              color: "#f3f2ef",
              lineHeight: 0.88,
              letterSpacing: "0.01em",
              marginBottom: 36,
              fontFamily: "SingleGhost",
            }}
          >
            <div>Sharon</div>
            <div>Shakti</div>
          </div>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 26,
            }}
          >
            <div style={{ height: 1, width: 56, background: "#4a4a4a" }} />
            <div
              style={{
                width: 6,
                height: 6,
                background: "#9a1620",
                transform: "rotate(45deg)",
              }}
            />
            <div style={{ height: 1, width: 56, background: "#4a4a4a" }} />
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 16,
              color: "#9a9a9a",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              fontFamily: "Georgia, serif",
            }}
          >
            Horror Realism · Blackwork · Dark Art
          </div>
        </div>

        {/* Bottom oxblood hairline */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 1,
            background: "#9a1620",
            opacity: 0.35,
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "SingleGhost",
          data: fontData,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
