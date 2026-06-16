# Changelog

All notable changes to this project will be documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- **Auto-populating galleries** — drop images into `public/work/selected/` (homepage) or `public/work/gallery/` (Work page) and they appear on next deploy. Build-time directory scan (`lib/works.server.ts`), dependency-free PNG/JPEG/WebP dimension reader, optional `meta.json` for captions, auto masonry span from aspect ratio
- **Image lightbox** — click any plate to open a full-screen framer-motion view with scale/clip reveal, oxblood glow, tracery corners, prev/next + keyboard (←/→/Esc) nav and body scroll-lock
- Home link in the primary nav (desktop + mobile)

### Changed
- All visible copy converted from third to first person (about, home statement, booking flow)
- About portrait now a real image (`next/image`) instead of the generated placeholder
- Removed the custom cursor entirely — native pointer restored (deleted `Cursor.tsx`, dropped `cursor:none`, stripped orphaned `data-cursor` attributes)

### Added (prior)
- **Styled confirmation emails** — client confirmation and Sharon notification now use a branded dark-ink HTML template (Cinzel headings, EB Garamond body, oxblood accents) matching the site aesthetic; plain-text fallback included
- Standalone `grunge-texture-index.html` preview for tuning a transplantable CSS-only grunge texture overlay
- **SingleGhost** display font (local, `app/fonts/`) for H1 / hero titles
- **Cinzel** (engraved caps) for H2 section titles, nav wordmark, and labels
- **EB Garamond** (old-style serif) for body and long-form
- `Divider` component — ornamental gothic separator (now centred on a quatrefoil)
- Illuminated drop caps (`.dropcap`) on the home statement and About long-form
- **Gothic architecture ornaments** (`components/ornaments/`): `Quatrefoil`,
  `RoseWindow` (rose-window tracery), `Arcade` (blind row of pointed arches),
  `Arch` (pointed-arch frame)
- Rose-window backdrops behind the home booking CTA and in the footer
- Pointed-arch (cathedral) frame around the About portrait
- Gothic UI kit `TraceryCorner` markers for statement blocks, panels, gallery sections,
  booking surfaces, footer CTA, and CTA bands; removed plain CSS corner pseudo-elements
- **Gothic UI kit (monochrome integration)** — new components rendered in
  bone/ash/oxblood (no gold/stone): `Button` (reliquary primary with notched
  bone frame, oxblood underglow, tracery pins, destructive variant, rose-window
  `IconButton`), `TraceryCorner` (4-way), `FleurDeLis`, `RibbedColumn`,
  `DiamondChain`, `Portcullis`, `Gargoyle`
- `Divider` variants: `rose`, `fleur`, `diamond` (alongside `quatrefoil`)

### Removed
- `Grunge` component and all usages — removed at owner's direction
- `CathedralFacade` — removed (silhouette rendered as house shapes, not a cathedral)

### Fixed
- Nav: removed red crenellation strip that appeared on scroll / mobile-menu open — rendered as a jarring oxblood battlement bar above the nav content
- Work page header: added top padding so "The Gallery" label no longer overlaps the `tl` TraceryCorner ornament
- Work gallery grid: increased container padding (`p-3→p-10` / `md:p-4→md:p-14`) so grid cells clear all four corner ornaments
- Home statement: inner div `px-4 py-8 md:px-10 md:py-12` → `p-14 md:p-20` — clears the 56px/80px tl/br TraceryCorners; dropcap was rendering directly over corner strokes
- Book container: `p-4 sm:p-5 md:p-8` → `p-14 md:p-[5.5rem]` — "01 — Choose a day" label now clears the 48px/80px corner ornaments (offset 8px, full clearance at 56px/88px)
- Footer: hide decorative bottom label on mobile (`hidden sm:block`) — "Horror Realism · Blackwork · Dark Art" at 0.28em tracking wraps on 375px viewports

### Changed
- Nav: crenellation (battlement) top border, portcullis mobile icon,
  reliquary hairline hover underline
- Footer: crypt-nave layout with ribbed-column dividers, reliquary CTA,
  animated footer links, softened cross-tile base row
- Gallery plates: tracery corners + leaded-glass tint overlay, now tightening into
  a restrained frame on hover
- Home page: removed duplicate booking CTAs so booking appears once via footer
- Booking form: responsive date grid, responsive slot grid, non-overflowing details
  panel, gothic fields (corner clips + oxblood focus glow + gargoyle watermark),
  illuminated-manuscript consent checkbox, reliquary submit, selected day/slot
  reliquary states
- Reliquary button hover now keeps fixed grid geometry so label and arrow do not
  shift layout
- Scrollbar: stacked stone-block thumb + cracked-stone track, oxblood border
- All page CTAs now use the reliquary `Button`
- Replaced the Bodoni Moda + Inter type system with a three-role gothic system
  (SingleGhost / Cinzel / EB Garamond); Inter (sans) removed entirely
- All expressive headings (statements, CTAs, piece titles, nav links) moved from
  EB Garamond italic to **Cinzel** uppercase caps
- Labels are now engraved Cinzel caps with wider tracking
- Deepened the hero vignette and increased film-grain opacity for a darker mood
- Body type set in EB Garamond at a larger base size for literary legibility

---

## [0.1.0] — 2026-06-12

Initial scaffold.

### Added

**Core**
- Next.js 14 (App Router, TypeScript, Tailwind CSS) project structure
- `PRODUCT.md` — strategic design context: register, users, brand personality, anti-references, design principles
- `DESIGN.md` — visual system seed: North Star *"The Black Gallery"*, drenched monochrome palette, Bodoni Moda + Inter type direction, motion strategy
- Design tokens wired into Tailwind config: `ink`, `bone`, `ash`, `oxblood`, `oxblood-bright`, display/body font families, `tracking-display`, `tracking-label`, `max-w-measure`, easing functions

**Pages**
- `/` — home: 3D hero section, statement with three-column pillars, featured-work grid, booking CTA band
- `/work` — full gallery grid with all catalogue pieces and tail CTA
- `/about` — artist bio with portrait placeholder, facets panel (ink / stage / performance), long-form prose, booking CTA
- `/book` — booking interface: date strip, slot grid, consultation form, all UI states (loading, empty, fully-booked, error, success)
- `404` — custom not-found page

**3D hero**
- React Three Fiber + Three.js canvas (SSR-disabled, dynamic import)
- Displaced icosahedron: 3D simplex-noise vertex displacement with finite-difference normal recomputation, oxblood Fresnel rim, layered noise for organic morphing
- Ash particle field (900 points) orbiting the mass
- Mouse parallax: mass tilts toward cursor; hover ramps displacement amplitude
- GSAP-powered staggered headline entrance animation (clip + translate)

**Animation & interaction**
- Lenis smooth scroll integrated with GSAP `ScrollTrigger` via RAF loop
- Framer Motion per-route enter transition (`app/template.tsx`)
- `Reveal` component — GSAP `ScrollTrigger` entrance (visible by default, JS-enhanced)
- `WorkPlate` per-card reveal with `clipPath` + translate
- Custom desktop cursor: bone dot + bone/oxblood ring that swells and bleeds on hover targets
- Nav scroll-aware background (transparent → blurred ink on scroll)
- Mobile nav with animated hamburger toggle
- Film grain overlay (fixed, animated, `feTurbulence` SVG)
- Scroll cue animation in hero

**Booking system**
- `lib/calendar.ts` — Google Calendar service-account integration (no OAuth, no DB)
  - `getDayAvailability(date)` — FreeBusy query → returns slot array with `available` flags
  - `createBooking(input)` — events.insert with race-condition guard (re-checks slot before writing)
  - **Mock mode** — deterministic pseudo-availability when credentials absent; full UI usable without secrets
- `lib/booking-config.ts` — client-safe working hours / days / slot length constants
- `GET /api/slots?date=YYYY-MM-DD` — availability endpoint with input validation
- `POST /api/book` — booking endpoint with field validation (422), race guard (409), and error propagation
- `BookingFlow` client component — date strip (28-day horizon), slot grid, consultation form, success confirmation, all error states

**Content**
- `lib/works.ts` — 9-piece placeholder gallery catalogue (Horror Realism · Blackwork · Dark Art, 2022–2025)
- `Placeholder` component — deterministic grayscale grain plates (radial gradient + `feTurbulence` + vignette, seed-varied per piece)
- `public/grain.svg` — tiling film-grain overlay texture

**Developer experience**
- `.env.example` — documented environment variable template
- `README.md` — quick start, project structure, Google Calendar setup walkthrough, Vercel + Cloudflare deploy instructions
- `eslint.ignoreDuringBuilds: true` — lint decoupled from production build

[Unreleased]: https://github.com/MaximilianWik/Sharon/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/MaximilianWik/Sharon/releases/tag/v0.1.0
