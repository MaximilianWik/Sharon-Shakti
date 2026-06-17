"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * 3D flip card — front face by default, reveals back on hover / tap.
 * Sized to match the physical gift card aspect ratio (85.6 × 54 mm ≈ 1.585:1).
 */
export default function GiftCardFlip() {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="group relative w-full cursor-pointer select-none"
      style={{ perspective: "1200px" }}
      onClick={() => setFlipped((v) => !v)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      aria-label="Gift card — hover to see reverse"
      role="img"
    >
      {/* Aspect box: standard credit-card ratio */}
      <div className="relative w-full" style={{ paddingBottom: "63%" }}>
        <div
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
            transition: "transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 overflow-hidden border border-ash-dim/40"
            style={{ backfaceVisibility: "hidden" }}
          >
            <Image
              src="/giftcard/Giftcard front.png"
              alt="Gift card — front"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 overflow-hidden border border-ash-dim/40"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <Image
              src="/giftcard/Giftcard back.png"
              alt="Gift card — back"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>

      {/* Flip hint */}
      <p className="mt-3 text-center font-heading text-[0.62rem] uppercase tracking-[0.22em] text-ash/60">
        {flipped ? "· back ·" : "hover to turn over"}
      </p>
    </div>
  );
}
