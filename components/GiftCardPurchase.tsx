"use client";

import { useState } from "react";
import Button from "@/components/Button";
import TraceryCorner from "@/components/ornaments/TraceryCorner";

const PRESETS = [1000, 2000, 3500, 5000] as const;

export default function GiftCardPurchase() {
  // Amount
  const [selected, setSelected] = useState<number>(PRESETS[1]);
  const [custom, setCustom] = useState("");
  const [useCustom, setUseCustom] = useState(false);

  // Buyer / recipient fields
  const [buyerEmail, setBuyerEmail] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [message, setMessage] = useState("");

  // Form state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const effectiveAmount = useCustom
    ? Math.max(0, parseInt(custom || "0", 10))
    : selected;

  const amountValid = effectiveAmount >= 500;
  const formValid =
    amountValid &&
    buyerEmail.includes("@") &&
    recipientName.trim().length > 0;

  async function handleSubmit() {
    if (!formValid || loading) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/giftcard/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amountSEK: effectiveAmount,
          buyerEmail: buyerEmail.trim(),
          recipientName: recipientName.trim(),
          message: message.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? "Checkout failed");
      }

      const { url } = (await res.json()) as { url: string };
      window.location.href = url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="space-y-10">

      {/* ── Amount picker ───────────────────────────── */}
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

      {/* Studio minimum notice */}
      <div className="border border-oxblood-bright/35 bg-oxblood/10 p-4">
        <p className="label text-oxblood-bright">Studio minimum: 1,500 kr</p>
        <p className="mt-1 text-sm leading-relaxed text-bone/70">
          Sessions start at 1,500 kr. A gift card of this value typically covers a small piece in full.
        </p>
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

      {/* ── Recipient details ───────────────────────── */}
      <div className="space-y-6 border-t border-ash-dim/30 pt-8">
        <p className="label text-oxblood-bright">Recipient details</p>

        {/* Buyer email */}
        <div>
          <label className="label mb-2 block text-ash/70">Your email</label>
          <div className="field-gothic">
            <input
              type="email"
              placeholder="you@example.com"
              value={buyerEmail}
              onChange={(e) => setBuyerEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <p className="mt-1 font-heading text-[0.6rem] uppercase tracking-heading text-ash/45">
            Your unique code is emailed here — bring it to the studio to collect the physical card
          </p>
        </div>

        {/* Recipient name */}
        <div>
          <label className="label mb-2 block text-ash/70">Recipient name</label>
          <div className="field-gothic">
            <input
              type="text"
              placeholder="e.g. Alex"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
            />
          </div>
          <p className="mt-1 font-heading text-[0.6rem] uppercase tracking-heading text-ash/45">
            Printed on the certificate
          </p>
        </div>

        {/* Personal message */}
        <div>
          <label className="label mb-2 block text-ash/70">Personal message <span className="text-ash/40">(optional)</span></label>
          <div className="field-gothic">
            <textarea
              rows={3}
              maxLength={300}
              placeholder="A short note to accompany the gift…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="resize-none"
            />
          </div>
        </div>
      </div>

      {/* ── Error ───────────────────────────────────── */}
      {error && (
        <div className="border border-oxblood-bright/60 bg-oxblood/10 p-4">
          <p className="font-heading text-[0.65rem] uppercase tracking-heading text-oxblood-bright">
            {error}
          </p>
        </div>
      )}

      {/* ── Summary + CTA ───────────────────────────── */}
      <div className="flex flex-col gap-6 border-t border-ash-dim/30 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="label text-ash/70">Total</p>
          <p className="mt-1 font-heading text-2xl uppercase tracking-heading text-bone">
            {amountValid ? `${effectiveAmount.toLocaleString("sv-SE")} kr` : "—"}
          </p>
        </div>

        <Button
          onClick={handleSubmit}
          disabled={!formValid || loading}
          type="button"
        >
          {loading ? "Redirecting…" : "Purchase gift card"}
        </Button>
      </div>

      <p className="font-heading text-[0.6rem] uppercase tracking-heading text-ash/45">
        Secure checkout via Stripe. You will be redirected to complete payment.
      </p>
    </div>
  );
}
