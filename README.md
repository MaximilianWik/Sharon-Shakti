# Sharon Shakti

## Live: https://sharon-shakti.vercel.app/

**Horror realism · Blackwork · Dark art**

A single-artist tattoo portfolio with a live calendar-synced booking system. No database. Google Calendar is the sole source of truth for availability and appointments.

![Next.js](https://img.shields.io/badge/Next.js_14-black?style=flat-square&logo=next.js)
![React Three Fiber](https://img.shields.io/badge/React_Three_Fiber-black?style=flat-square&logo=threedotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-black?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-black?style=flat-square&logo=tailwindcss)

---

## Tech stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router, TypeScript) |
| 3D | React Three Fiber + Three.js |
| Animation | GSAP + Lenis (scroll), Framer Motion (transitions) |
| Styling | Tailwind CSS, drenched monochrome, oxblood accent |
| Booking | Google Calendar API (service account, no DB) |
| Deploy | Vercel (free tier) + Cloudflare DNS |

---

## Project structure

```
sharon/
├── app/
│   ├── layout.tsx              Root layout: fonts, Lenis, cursor, nav, footer
│   ├── template.tsx            Per-route enter transition (Framer Motion)
│   ├── page.tsx                Home: 3D hero, statement, featured work, CTA
│   ├── work/page.tsx           Full gallery
│   ├── about/page.tsx          Artist bio
│   ├── book/page.tsx           Booking: date strip, slot grid, form
│   ├── api/slots/route.ts      GET /api/slots?date=YYYY-MM-DD
│   ├── api/book/route.ts       POST /api/book
│   └── globals.css             Design tokens, grain overlay, base styles
├── components/
│   ├── hero/                   R3F canvas, simplex-noise shader, ash particles
│   ├── booking/BookingFlow.tsx Date picker, slot grid, form, all states
│   ├── WorkPlate.tsx           Gallery card with per-plate scroll reveal
│   ├── Placeholder.tsx         Grayscale grain plates (swap for real photos)
│   ├── Reveal.tsx              GSAP ScrollTrigger entrance wrapper
│   ├── Cursor.tsx              Custom bleed cursor (desktop only)
│   ├── Nav.tsx                 Sticky navigation with mobile menu
│   ├── Footer.tsx              Footer with booking CTA
│   └── SmoothScroll.tsx        Lenis + GSAP ScrollTrigger integration
├── lib/
│   ├── calendar.ts             Google Calendar: free/busy + event creation
│   ├── booking-config.ts       Working hours / days / slot length (client-safe)
│   └── works.ts                Gallery catalogue (placeholder data)
├── public/
│   └── grain.svg               Film grain overlay texture
├── PRODUCT.md                  Strategic design context
├── DESIGN.md                   Visual system: palette, typography, components
└── .env.example                Environment variable template
```

---

## Booking system

Availability and bookings are backed entirely by Google Calendar. No separate database. The server runs as a service account (`booking@tattoo-appointments.iam.gserviceaccount.com`) with write access to Sharon's calendar. No OAuth flow, no user login, no token refresh.

**Availability** is derived from a FreeBusy query against the calendar. Any existing event blocks that time window. Slots in the past are always unavailable.

**Booking** calls `calendar.events.insert`, re-checking availability immediately before writing to guard against race conditions. A 409 is returned if the slot was taken in the interim. Google sends email invitations to both parties automatically.

**Working hours** are defined in `lib/booking-config.ts`: Tuesday–Saturday, 11:00–17:00, 45-minute slots, 28-day horizon. This file is client-safe (no secrets, no server imports) and is shared between the UI and the API layer.

**Mock mode** activates automatically when the environment variables are absent. Availability is simulated deterministically; no calendar events are created. The full UI is functional in mock mode.

The four required environment variables are documented in `.env.example`.

---

## Deploy

The site runs on Vercel (Node.js serverless functions for the API routes). DNS is managed through Cloudflare, pointed at Vercel with DNS-only records (no proxy) so Vercel can handle TLS directly.

---

## Design

The visual system is documented in [`DESIGN.md`](./DESIGN.md). Strategic context in [`PRODUCT.md`](./PRODUCT.md).

**North star:** *The Black Gallery*: drenched monochrome, oxblood as the single accent, horror treated as fine art.

| Token | Value |
|---|---|
| Ink (background) | `#0a0a0a` |
| Bone (type) | `#f3f2ef` |
| Oxblood (accent) | `#6e1014` |
| Display font | SingleGhost |
| Title font | Cinzel |
| Body font | EB Garamond |

---

## Notes

- No reduced-motion fallback and no content warning, deliberate product decisions, documented in `PRODUCT.md`.
- ESLint is disabled during `next build` (`eslint.ignoreDuringBuilds: true`). Run `npm run lint` separately.
