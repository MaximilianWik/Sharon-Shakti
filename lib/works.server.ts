import fs from "node:fs";
import path from "node:path";
import {
  type Work,
  type WorkSpan,
  titleFromFile,
  slugFromFile,
  spanFromRatio,
} from "./works";

// Server-only: scans public/work/<folder> at build/render time.
// Drop images into the folder and they auto-populate — no code changes.
//
// Optional captions: a meta.json in the folder, keyed by slug:
//   { "the-mourner": { "title": "The Mourner", "style": "Horror Realism",
//                      "placement": "Full back", "year": 2025, "span": "tall" } }

const IMAGE_RE = /\.(png|jpe?g|webp|avif|gif)$/i;

type Meta = Partial<Pick<Work, "title" | "style" | "placement" | "year" | "span">>;

function readMeta(dir: string): Record<string, Meta> {
  try {
    const raw = fs.readFileSync(path.join(dir, "meta.json"), "utf-8");
    return JSON.parse(raw) as Record<string, Meta>;
  } catch {
    return {};
  }
}

/** Minimal dimension reader for png / jpeg / webp. Returns null on failure. */
function imageSize(buf: Buffer): { width: number; height: number } | null {
  try {
    // PNG: 89 50 4E 47 ... IHDR width/height at bytes 16..24 (BE uint32)
    if (buf.length >= 24 && buf[0] === 0x89 && buf[1] === 0x50) {
      return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
    }
    // WebP: "RIFF"...."WEBP"
    if (buf.length >= 30 && buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") {
      const fmt = buf.toString("ascii", 12, 16);
      if (fmt === "VP8X") {
        const w = (buf[24] | (buf[25] << 8) | (buf[26] << 16)) + 1;
        const h = (buf[27] | (buf[28] << 8) | (buf[29] << 16)) + 1;
        return { width: w, height: h };
      }
      if (fmt === "VP8 ") {
        const w = (buf.readUInt16LE(26) & 0x3fff) + 1;
        const h = (buf.readUInt16LE(28) & 0x3fff) + 1;
        return { width: w, height: h };
      }
      if (fmt === "VP8L") {
        const b = buf.readUInt32LE(21);
        const w = (b & 0x3fff) + 1;
        const h = ((b >> 14) & 0x3fff) + 1;
        return { width: w, height: h };
      }
    }
    // JPEG: scan SOF markers
    if (buf[0] === 0xff && buf[1] === 0xd8) {
      let o = 2;
      while (o < buf.length - 8) {
        if (buf[o] !== 0xff) { o++; continue; }
        const m = buf[o + 1];
        const len = buf.readUInt16BE(o + 2);
        if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) {
          return { height: buf.readUInt16BE(o + 5), width: buf.readUInt16BE(o + 7) };
        }
        o += 2 + len;
      }
    }
  } catch {
    /* fall through */
  }
  return null;
}

function scan(folder: string): Work[] {
  const dir = path.join(process.cwd(), "public", "work", folder);
  let entries: string[];
  try {
    entries = fs.readdirSync(dir);
  } catch {
    return []; // folder missing -> empty gallery, never throws
  }

  const meta = readMeta(dir);
  const files = entries.filter((f) => IMAGE_RE.test(f)).sort();

  return files.map((file) => {
    const slug = slugFromFile(file);
    const m = meta[slug] ?? {};
    let width = 1200;
    let height = 1500;
    try {
      const dims = imageSize(fs.readFileSync(path.join(dir, file)));
      if (dims) { width = dims.width; height = dims.height; }
    } catch {
      /* keep defaults */
    }
    const span: WorkSpan = m.span ?? spanFromRatio(width, height);
    return {
      src: `/work/${folder}/${file}`,
      slug,
      title: m.title ?? titleFromFile(file),
      width,
      height,
      span,
      style: m.style,
      placement: m.placement,
      year: m.year,
    };
  });
}

/** Homepage "Selected Work" — public/work/selected/ */
export function getSelectedWorks(): Work[] {
  return scan("selected");
}

/** Work page gallery — public/work/gallery/ */
export function getGalleryWorks(): Work[] {
  return scan("gallery");
}
