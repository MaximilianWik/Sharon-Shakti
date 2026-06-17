"use client";

import { useState } from "react";
import Button from "@/components/Button";
import TraceryCorner from "@/components/ornaments/TraceryCorner";

const PRESETS = [1000, 2000, 3500, 5000] as const;

/**
 * Denomination selector + purchase CTA.
 * Stripe integration is wired up separately — this component emits the
 * selected amount via onPurchase when that's ready.
 */
export default function GiftCardPurchase({
  onPurchase,
}: {
  onPurchase?: (amountSEK: number) => void;
}) {
  const [selected, setSelected] = useState<number>(PRESETS[1]);
  const [custom, setCustom] = useState("");
  const [useCustom, setUseCustom] = useState(false);

  const effectiveAmount = useCustom
    ? Math.max(0, parseInt(custom || "0", 10))
    : selected;

  const valid = effectiveAmount >= 500;

  function handleClick() {
    if (!valid || !onPurchase) return;
    onPurchase(effectiveAmount);
  }

  return (
    <div className="space-y-8">
      {/* Preset amounts */}
      <div>
        <p className="label mb-4 text-oxblood-bright">Choose an amount</p>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {PRESETS.map((amt) => {
            const active = !useCustom && selected === amt;
            return (
              <button
                key={amt}
                type="button"
                onClick={() => { setSelected(amt); setUseCustom(false); }}
                className={`relative border py-4 font-heading text-sm uppercase tracking-heading transition-all duration-300 ${
                  active
                    ? "border-oxblood-bright bg-oxblood/20 text-bone shadow-[0_0_18px_rgba(154,22,32,0.28)]"
                    : "border-ash-dim/50 bg-ink text-bone/60 hover:border-ash/60 hover:text-bone"
                }`}
              >
                <TraceryCorner
                  corner="tl"
                  className={`pointer-events-none absolute left-1 top-1 h-5 w-5 transition-colors duration-300 ${active ? "text-oxblood-bright/70" : "text-ash/25"}`}
                  strokeWidth={1.5}
                />
                <TraceryCorner
                  corner="br"
                  className={`pointer-events-none absolute bottom-1 right-1 h-5 w-5 transition-colors duration-300 ${active ? "text-oxblood-bright/70" : "text-ash/25"}`}
                  strokeWidth={1.5}
                />
                {amt.toLocaleString("sv-SE")}&nbsp;kr
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom amount */}
      <div>
        <p className="label mb-4 text-oxblood-bright">Or enter a custom amount</p>
        <div className="field-gothic">
          <input
            type="number"
            min={500}
            step={100}
            placeholder="e.g. 4 500"
            value={custom}
            onChange={(e) => {
              setCustom(e.target.value);
              setUseCustom(e.target.value.trim().length > 0);
            }}
            onFocus={() => { if (custom) setUseCustom(true); }}
            className="pr-16"
          />
          <span className="pointer-events-none absolute bottom-[0.85rem] right-1 font-heading text-xs uppercase tracking-heading text-ash/60">
            SEK
          </span>
        </div>
        {useCustom && effectiveAmount < 500 && (
          <p className="mt-2 font-heading text-[0.65rem] uppercase tracking-heading text-oxblood-bright">
            Minimum 500 kr
          </p>
        )}
      </div>

      {/* Summary + CTA */}
      <div className="flex flex-col gap-6 border-t border-ash-dim/30 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="label text-ash/70">Total</p>
          <p className="mt-1 font-heading text-2xl uppercase tracking-heading text-bone">
            {valid ? `${effectiveAmount.toLocaleString("sv-SE")} kr` : "—"}
          </p>
        </div>

        <Button
          onClick={handleClick}
          disabled={!valid || !onPurchase}
          type="button"
        >
          {onPurchase ? "Purchase gift card" : "Coming soon"}
        </Button>
      </div>

      {!onPurchase && (
        <p className="font-heading text-[0.65rem] uppercase tracking-heading text-ash/45">
          Online purchase launching shortly — or contact directly to arrange.
        </p>
      )}
    </div>
  );
}
