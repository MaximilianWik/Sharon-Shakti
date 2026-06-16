# Sharon Shakti

## Live: https://sharon-shakti.vercel.app/

**Horror realism · Blackwork · Dark art**

A single-artist tattoo portfolio with a live calendar-synced booking system, FAQ & aftercare guide, and Instagram feed section. No database. Google Calendar is the sole source of truth for availability and appointments.

![Next.js](https://img.shields.io/badge/Next.js_14-black?style=flat-square&logo=next.js)
![React Three Fiber](https://img.shields.io/badge/React_Three_Fiber-black?style=flat-square&logo=threedotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-black?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-black?style=flat-square&logo=tailwindcss)

---

## Tech stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router, TypeScript) |
| 3D / Canvas | React Three Fiber + Three.js (hero), canvas2D (ember particles) |
| Animation | GSAP + Lenis (scroll), Framer Motion (page transitions, lightbox) |
| Styling | Tailwind CSS, drenched monochrome, oxblood accent |
| Booking | Google Calendar API (service account, no DB) |
| Email | Nodemailer + Gmail SMTP (booking confirmations) |
| Deploy | Vercel (free tier) |

---

## Routes

| Route | Description |
|---|---|
| `/` | Home — 3D hero, statement, selected work gallery |
| `/work` | Full gallery |
| `/about` | Artist bio, facets, Instagram section |
| `/book` | Live booking — date strip, slot grid, consultation form |
| `/care` | FAQ accordion + aftercare guide |
| `/_next/…` | Next.js internals |

## API routes

| Route | Method | Description |
|---|---|---|
| `/api/slots?date=YYYY-MM-DD` | GET | Day availability — slots for a single date |
| `/api/availability` | GET | Horizon availability — fully-booked flags for all 28 days |
| `/api/book` | POST | Create a booking + send confirmation emails |

---

## Project structure

```
sharon/
├── app/
│   ├── layout.tsx              Root layout: fonts, Lenis, nav, footer
│   ├── template.tsx            Per-route enter transition (Framer Motion)
│   ├── page.tsx                Home: 3D hero, statement, selected work
│   ├── work/page.tsx           Full gallery page
│   ├── about/page.tsx          Artist bio + Instagram section
│   ├── book/page.tsx           Booking page
│   ├── care/page.tsx           FAQ & aftercare
│   ├── api/slots/route.ts      GET /api/slots?date=YYYY-MM-DD
│   ├── api/availability/route.ts  GET /api/availability (horizon summary)
│   ├── api/book/route.ts       POST /api/book
│   ├── not-found.tsx           404 page
│   └── globals.css             Design tokens, gothic primitives, base styles
├── components/
│   ├── hero/                   R3F canvas, simplex-noise shader, ash particles
│   ├── booking/BookingFlow.tsx Date strip, slot grid, form, success/error states
│   ├── WorkPlate.tsx           Gallery card: next/image + GSAP scroll reveal
│   ├── WorkGallery.tsx         Client grid wrapper — manages lightbox state
│   ├── Lightbox.tsx            Framer Motion full-screen image viewer
│   ├── FaqAccordion.tsx        Interactive FAQ accordion
│   ├── EmberField.tsx          Canvas2D oxblood ember particles
│   ├── InstagramSection.tsx    Dark feed-teaser grid linking to @sharonnshakti
│   ├── Reveal.tsx              GSAP ScrollTrigger entrance wrapper
│   ├── Nav.tsx                 Sticky nav with Cinzel wordmark + mobile menu
│   ├── Footer.tsx              Footer: CTA, nav, Instagram link
│   ├── Button.tsx              Reliquary button (pointed-arch clip-path)
│   ├── Divider.tsx             Gothic dividers: quatrefoil · rose · fleur · diamond
│   ├── SmoothScroll.tsx        Lenis + GSAP ScrollTrigger integration
│   └── ornaments/              SVG ornaments: TraceryCorner, Quatrefoil,
│                               RoseWindow, Arcade, Arch, DiamondChain,
│                               FleurDeLis, Gargoyle, Portcullis, RibbedColumn
├── lib/
│   ├── calendar.ts             Google Calendar: free/busy, booking, horizon availability
│   ├── booking-config.ts       Working hours/days/slot length (client-safe)
│   ├── email.ts                Nodemailer: client confirmation + Sharon notification
│   ├── works.ts                Work type + filename helpers (client-safe)
│   └── works.server.ts         Build-time folder scanner for gallery/portrait
├── public/
│   ├── work/
│   │   ├── selected/           Homepage "Selected Work" — drop images here
│   │   └── gallery/            Work page gallery — drop images here
│   ├── about/                  About portrait — drop any image here
│   ├── Email/                  Email header image (EmailHeader.png)
│   ├── placeholder/            Legacy seed images (to be deleted once real work confirmed)
│   └── grain.svg               Film grain overlay texture
├── PRODUCT.md                  Strategic design context
├── DESIGN.md                   Visual system: palette, typography, components
├── CHANGELOG.md                Change history
└── .env.example                Environment variable template
```

---

## Image system

Drop images into a folder, commit, push — they appear automatically on next deploy. No code changes needed.

| Folder | Surface | Notes |
|---|---|---|
| `public/work/selected/` | Homepage "Selected Work" | Filename order: prefix with `01-`, `02-` etc. |
| `public/work/gallery/` | Work page | Same ordering convention |
| `public/about/` | About portrait | Any filename — first image in folder is used |

**Optional captions:** add `meta.json` in any folder keyed by slug:
```json
{ "the-mourner": { "title": "The Mourner", "style": "Horror Realism", "placement": "Full back", "year": 2025, "span": "tall" } }
```
Without it, the title is derived from the filename (`01-the-mourner.png` → "The Mourner"). `span` controls masonry layout (`tall`/`wide`/`normal`) and is auto-detected from aspect ratio if omitted.

---

## Booking system

Availability and bookings are backed entirely by Google Calendar. No separate database.

**Availability** is derived from a FreeBusy query against the calendar. Any existing event blocks that time window. Slots in the past are always unavailable.

**Horizon summary** (`/api/availability`) runs a single FreeBusy query across the full 28-day window and returns per-day `{ fullyBooked }` flags. The booking calendar strip greys out and disables fully-booked days automatically.

**Booking** calls `calendar.events.insert`, re-checking availability immediately before writing to guard against race conditions. A 409 is returned if the slot was taken in the interim.

**Confirmation emails** are sent to both the client and Sharon via Gmail SMTP (Nodemailer). Requires `GMAIL_USER` and `GMAIL_APP_PASSWORD` in Vercel environment variables.

**Working hours** are defined in `lib/booking-config.ts`: Tuesday–Saturday, 11:00–17:00, 45-minute slots, 28-day horizon.

**Mock mode** activates automatically when the Google Calendar environment variables are absent. All future slots are available; no calendar events are created. The full UI is functional in mock mode.

---

## Environment variables

See `.env.example` for the full list. Required for live bookings:

```
GOOGLE_CLIENT_EMAIL=
GOOGLE_PRIVATE_KEY=
GOOGLE_CALENDAR_ID=
BOOKING_TIMEZONE=Europe/Stockholm

# Optional: block personal calendar events too
GOOGLE_PERSONAL_CALENDAR_ID=

# Confirmation emails
GMAIL_USER=sharonshaktitattoo@gmail.com
GMAIL_APP_PASSWORD=
```

---

## Google Calendar setup

1. Create a GCP project and enable the Calendar API.
2. Create a service account; download the JSON key.
3. Share Sharon's Google Calendar with the service account email (give "Make changes to events" permission).
4. Set `GOOGLE_CLIENT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_CALENDAR_ID` in Vercel.

---

## Development

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
npm run typecheck # tsc --noEmit
```


## Sync to personal calendar (read only)
1. Share her personal calendar with the service account
Google Calendar → Settings → her personal calendar → Share with specific people → add booking@tattoo-appointments.iam.gserviceaccount.com → permission: "See only free/busy (hide details)" is enough.
---

2. Add the env var in Vercel
GOOGLE_PERSONAL_CALENDAR_ID → her personal calendar ID (found under Settings → her calendar → Integrate calendar → Calendar ID — usually her personal Gmail address).
## Google Calendar setup

Redeploy and her personal events will block slots automatically.
1. Create a GCP project and enable the Calendar API.
2. Create a service account; download the JSON key.
3. Share Sharon's Google Calendar with the service account email (give "Make changes to events" permission).
4. Set `GOOGLE_CLIENT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_CALENDAR_ID` in Vercel.

## Add appointments to personal calendar
From the sharonshaktitattoo@gmail.com account:
---

Google Calendar → Settings → sharonshaktitattoo@gmail.com calendar → Share with specific people → add her personal email → "Make changes to events"
## Development

Once she accepts, the tattoo appointments calendar appears as an overlay in her personal Google Calendar. She sees everything in one place, in a different colour. Any events she adds from her personal calendar also show up there, and since we're already reading both calendars for free/busy, the blocking stays in sync too.
