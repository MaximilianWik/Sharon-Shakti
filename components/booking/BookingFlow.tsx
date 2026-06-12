"use client";

import { useEffect, useRef, useState } from "react";
import { BOOKING, isWorkingDay } from "@/lib/booking-config";
import Button from "@/components/Button";
import Gargoyle from "@/components/ornaments/Gargoyle";

type Slot = { label: string; start: string; end: string; available: boolean };
type DayResponse = {
  date: string;
  isWorkingDay: boolean;
  slots: Slot[];
  mode: "live" | "mock";
};

const pad = (n: number) => n.toString().padStart(2, "0");
const ymd = (d: Date) =>
  `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

function buildDays() {
  const out: { iso: string; dow: number; working: boolean; date: Date }[] = [];
  const base = new Date();
  base.setHours(0, 0, 0, 0);
  for (let i = 0; i < BOOKING.horizonDays; i++) {
    const d = new Date(base);
    d.setDate(base.getDate() + i);
    out.push({ iso: ymd(d), dow: d.getDay(), working: isWorkingDay(d.getDay()), date: d });
  }
  return out;
}

type Status = "idle" | "loading" | "submitting" | "success" | "error";

export default function BookingFlow() {
  const days = useRef(buildDays()).current;
  const firstWorking = days.find((d) => d.working) ?? days[0];

  const [selectedDate, setSelectedDate] = useState<string>(firstWorking.iso);
  const [day, setDay] = useState<DayResponse | null>(null);
  const [slotsStatus, setSlotsStatus] = useState<Status>("loading");
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);

  const [form, setForm] = useState({ name: "", email: "", notes: "" });
  const [consent, setConsent] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submit, setSubmit] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<{ start: string; end: string; mode: string } | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const stripRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    setSlotsStatus("loading");
    setSelectedSlot(null);
    setError(null);
    fetch(`/api/slots?date=${selectedDate}`)
      .then((r) => r.json())
      .then((data: DayResponse) => {
        if (cancelled) return;
        setDay(data);
        setSlotsStatus("idle");
      })
      .catch(() => {
        if (!cancelled) setSlotsStatus("error");
      });
    return () => {
      cancelled = true;
    };
  }, [selectedDate, reloadKey]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedSlot) return;
    setSubmit("submitting");
    setError(null);
    setFieldErrors({});
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: selectedDate,
          start: selectedSlot.start,
          name: form.name,
          email: form.email,
          notes: form.notes,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setConfirmation({ start: data.start, end: data.end, mode: data.mode });
        setSubmit("success");
        return;
      }
      if (res.status === 422 && data.fields) {
        setFieldErrors(data.fields);
        setSubmit("error");
        return;
      }
      if (res.status === 409) {
        setError(data.error);
        setSelectedSlot(null);
        // Refresh availability.
        const fresh = await fetch(`/api/slots?date=${selectedDate}`).then((r) => r.json());
        setDay(fresh);
        setSubmit("error");
        return;
      }
      setError(data.error || "Something went wrong.");
      setSubmit("error");
    } catch {
      setError("Network error. Please try again.");
      setSubmit("error");
    }
  }

  function fmtDate(iso: string) {
    return new Date(iso + "T12:00:00").toLocaleDateString(undefined, {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  }

  // ---- success ----
  if (submit === "success" && confirmation) {
    const time = confirmation.start.split("T")[1].slice(0, 5);
    return (
      <div className="border border-ash-dim/40 bg-ink-raised p-10 md:p-16">
        <span className="label text-oxblood-bright">Requested</span>
        <h2 className="mt-6 font-heading text-3xl uppercase leading-tight tracking-heading text-bone md:text-4xl">
          Your consultation
          <br />
          is reserved.
        </h2>
        <dl className="mt-10 grid max-w-md grid-cols-[auto,1fr] gap-x-8 gap-y-4 border-t border-ash-dim/40 pt-8 text-bone/80">
          <dt className="label text-ash">When</dt>
          <dd>
            {fmtDate(selectedDate)} · {time}
          </dd>
          <dt className="label text-ash">Name</dt>
          <dd>{form.name}</dd>
          <dt className="label text-ash">Email</dt>
          <dd>{form.email}</dd>
        </dl>
        <p className="mt-8 max-w-md text-sm leading-relaxed text-ash">
          A calendar invitation has been sent to {form.email}. Sharon will
          confirm details before your session.
          {confirmation.mode === "mock" &&
            " (Demo mode — no live calendar connected; configure Google Calendar credentials to go live.)"}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr,0.9fr]">
      {/* Left: date + slots */}
      <div>
        <span className="label text-oxblood-bright">01 — Choose a day</span>

        <div
          ref={stripRef}
          className="mt-6 flex gap-2 overflow-x-auto pb-3"
          style={{ scrollbarWidth: "thin" }}
        >
          {days.map((d) => {
            const active = d.iso === selectedDate;
            return (
              <button
                key={d.iso}
                type="button"
                disabled={!d.working}
                onClick={() => setSelectedDate(d.iso)}
                data-cursor={d.working ? "hover" : undefined}
                className={`group relative flex min-w-[68px] shrink-0 flex-col items-center gap-1 overflow-hidden border px-3 py-4 transition-all duration-300 ${
                  active
                    ? "border-oxblood-bright bg-oxblood/20 text-bone shadow-[inset_0_0_0_1px_rgba(243,242,239,0.16),0_0_18px_rgba(154,22,32,0.22)]"
                    : d.working
                    ? "border-ash-dim/50 text-bone/80 hover:border-bone/60 hover:bg-bone/[0.03]"
                    : "cursor-not-allowed border-ash-dim/20 text-ash/40"
                }`}
              >
                {active && (
                  <span className="pointer-events-none absolute inset-1 border border-bone/15" aria-hidden />
                )}
                <span className="label text-[0.6rem]">
                  {d.date.toLocaleDateString(undefined, { weekday: "short" })}
                </span>
                <span className="font-serif text-2xl leading-none tracking-display">
                  {d.date.getDate()}
                </span>
                <span className="label text-[0.55rem] text-ash">
                  {d.date.toLocaleDateString(undefined, { month: "short" })}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-10">
          <span className="label text-oxblood-bright">02 — Pick a time</span>
          <div className="mt-6 min-h-[8rem]">
            {slotsStatus === "loading" && (
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-12 animate-pulse bg-ink-raised" />
                ))}
              </div>
            )}

            {slotsStatus === "error" && (
              <p className="text-ash">
                Couldn&rsquo;t load availability.{" "}
                <button
                  className="text-oxblood-bright underline underline-offset-4"
                  onClick={() => setReloadKey((k) => k + 1)}
                >
                  Retry
                </button>
              </p>
            )}

            {slotsStatus === "idle" && day && !day.isWorkingDay && (
              <p className="text-ash">The studio is closed this day. Choose another.</p>
            )}

            {slotsStatus === "idle" && day?.isWorkingDay && day.slots.every((s) => !s.available) && (
              <p className="text-ash">
                Fully booked on {fmtDate(selectedDate)}. Try another day.
              </p>
            )}

            {slotsStatus === "idle" && day?.isWorkingDay && day.slots.some((s) => s.available) && (
              <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                {day.slots.map((s) => {
                  const active = selectedSlot?.start === s.start;
                  return (
                    <button
                      key={s.start}
                      type="button"
                      disabled={!s.available}
                      onClick={() => setSelectedSlot(s)}
                      data-cursor={s.available ? "hover" : undefined}
                      className={`group relative h-12 overflow-hidden border text-sm transition-all duration-300 ${
                        active
                          ? "border-oxblood-bright bg-oxblood/85 text-bone shadow-[inset_0_0_0_1px_rgba(243,242,239,0.18),0_0_16px_rgba(154,22,32,0.24)]"
                          : s.available
                          ? "border-ash-dim/50 text-bone/80 hover:border-bone/60 hover:bg-bone/[0.03]"
                          : "cursor-not-allowed border-transparent text-ash/30 line-through"
                      }`}
                    >
                      {active && (
                        <>
                          <span className="absolute left-1 top-1 h-2 w-2 border-l border-t border-bone/45" aria-hidden />
                          <span className="absolute right-1 top-1 h-2 w-2 border-r border-t border-bone/45" aria-hidden />
                          <span className="absolute bottom-1 left-1 h-2 w-2 border-b border-l border-bone/45" aria-hidden />
                          <span className="absolute bottom-1 right-1 h-2 w-2 border-b border-r border-bone/45" aria-hidden />
                        </>
                      )}
                      <span className="relative z-10">{s.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
          {day?.mode === "mock" && (
            <p className="mt-4 text-xs text-ash/60">
              Demo availability — connect Google Calendar to show real free/busy.
            </p>
          )}
        </div>
      </div>

      {/* Right: details form */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 border-t border-ash-dim/40 pt-10 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0"
      >
        <span className="label text-oxblood-bright">03 — Your details</span>

        <div
          className={`transition-opacity duration-300 ${
            selectedSlot ? "opacity-100" : "pointer-events-none opacity-40"
          }`}
        >
          {selectedSlot && (
            <p className="mb-6 text-bone/80">
              <span className="text-ash">Requesting</span>{" "}
              {fmtDate(selectedDate)} at{" "}
              <span className="text-oxblood-bright">{selectedSlot.label}</span>
            </p>
          )}

          <div className="flex flex-col gap-7">
            <Field label="Name" error={fieldErrors.name}>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </Field>
            <Field label="Email" error={fieldErrors.email}>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </Field>
            <Field label="What do you want made?" error={fieldErrors.notes} optional>
              <textarea
                rows={3}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                placeholder="Concept, placement, size, references…"
              />
            </Field>
          </div>

          {/* Illuminated-manuscript consent checkbox */}
          <div className="mt-7 flex items-start gap-4">
            <button
              type="button"
              role="checkbox"
              aria-checked={consent}
              aria-label="I understand this is a consultation request"
              onClick={() => setConsent((v) => !v)}
              className="illuminated-check"
              data-cursor="hover"
            >
              {consent ? "S" : ""}
            </button>
            <p className="max-w-xs text-sm leading-relaxed text-ash">
              I understand this is a request for a consultation, and that Sharon
              confirms every booking personally before it is final.
            </p>
          </div>

          {error && <p className="mt-5 text-sm text-oxblood-bright">{error}</p>}

          <Button
            type="submit"
            disabled={!selectedSlot || !consent || submit === "submitting"}
            className="mt-8 w-full"
          >
            {submit === "submitting" ? "Requesting…" : "Request this session"}
          </Button>
          <p className="mt-4 text-xs leading-relaxed text-ash/60">
            This sends a consultation request. Sharon confirms every booking
            personally before it&rsquo;s final.
          </p>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  error,
  optional,
  children,
}: {
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="label flex items-center gap-2 text-ash">
        {label}
        {optional && <span className="text-ash/50">(optional)</span>}
      </span>
      <div className="field-gothic mt-1">
        {children}
        <Gargoyle className="gargoyle" />
      </div>
      {error && <span className="mt-1 block text-xs text-oxblood-bright">{error}</span>}
    </label>
  );
}
