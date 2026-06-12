# Changelog

All notable changes to this project will be documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
This project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

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
