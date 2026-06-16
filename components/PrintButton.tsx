"use client";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="print:hidden label mt-10 inline-flex items-center gap-3 border border-ash-dim/50 px-6 py-3 text-bone/70 transition-colors hover:border-bone/60 hover:text-bone"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
        <path d="M6 9V3h12v6M6 18H4a1 1 0 01-1-1v-6a1 1 0 011-1h16a1 1 0 011 1v6a1 1 0 01-1 1h-2M6 14h12v7H6z" />
      </svg>
      Print aftercare
    </button>
  );
}
