// Client-safe types & helpers for the work galleries.
// NO Node/fs imports here — this file is importable from client components.
// Filesystem scanning lives in works.server.ts (server components only).

export type WorkSpan = "tall" | "wide" | "normal";

export type Work = {
  /** Public URL, e.g. /work/gallery/01-relic.png */
  src: string;
  /** Stable id derived from filename (ordering prefix stripped). */
  slug: string;
  /** Display title. */
  title: string;
  /** Natural pixel dimensions (for next/image + lightbox). */
  width: number;
  height: number;
  /** Masonry hint, auto-derived from aspect ratio unless overridden. */
  span: WorkSpan;
  /** Optional caption metadata (from meta.json). */
  style?: string;
  placement?: string;
  year?: number;
};

/** "01-the-mourner.png" -> "The Mourner" */
export function titleFromFile(filename: string): string {
  return filename
    .replace(/\.[^.]+$/, "")
    .replace(/^\d+[-_]/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** "01-the-mourner.png" -> "the-mourner" */
export function slugFromFile(filename: string): string {
  return filename.replace(/\.[^.]+$/, "").replace(/^\d+[-_]/, "");
}

/** Aspect ratio -> masonry span. */
export function spanFromRatio(width: number, height: number): WorkSpan {
  if (!width || !height) return "normal";
  const r = width / height;
  if (r >= 1.3) return "wide";
  if (r <= 0.78) return "tall";
  return "normal";
}
