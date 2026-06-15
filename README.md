# Sharon Shakti

## Live: https://sharon-shakti.vercel.app/

**Horror realism · Blackwork · Dark art**

A single-artist tattoo portfolio with a live calendar-synced booking system. No database — Google Calendar is the sole source of truth for availability and appointments.

![Next.js](https://img.shields.io/badge/Next.js_14-black?style=flat-square&logo=next.js)
![React Three Fiber](https://img.shields.io/badge/React_Three_Fiber-black?style=flat-square&logo=threedotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-black?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-black?style=flat-square&logo=tailwindcss)

---

## Quick start

> Requires **Node.js 18.18+** (20 or 22 recommended).

```bash
npm install
npm run dev
```

Open **http://localhost:3000**

The booking system works immediately in **mock mode** — no credentials needed. Simulated availability is shown; no calendar events are created. See [Google Calendar setup](#google-calendar-setup) to go live.

```bash
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # TypeScript check (tsc --noEmit)
npm run lint       # ESLint
```

---

## Tech stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router, TypeScript) |
| 3D | React Three Fiber + Three.js |
| Animation | GSAP + Lenis (scroll), Framer Motion (transitions) |
| Styling | Tailwind CSS — drenched monochrome, oxblood accent |
| Booking | Google Calendar API (service account, no DB) |
| Deploy | Vercel (free tier) + Cloudflare DNS |

---

## Project structure

```
sharon/
├── app/
│   ├── layout.tsx              Root layout — fonts, Lenis, cursor, nav, footer
│   ├── template.tsx            Per-route enter transition (Framer Motion)
│   ├── page.tsx                Home — 3D hero, statement, featured work, CTA
│   ├── work/page.tsx           Full gallery
│   ├── about/page.tsx          Artist bio
│   ├── book/page.tsx           Booking — date strip, slot grid, form
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
│   ├── calendar.ts             Google Calendar — free/busy + event creation
│   ├── booking-config.ts       Working hours / days / slot length (client-safe)
│   └── works.ts                Gallery catalogue (placeholder data)
├── public/
│   └── grain.svg               Film grain overlay texture
├── PRODUCT.md                  Strategic design context
├── DESIGN.md                   Visual system — palette, typography, components
└── .env.example                Environment variable template
```

### Replacing placeholder imagery

The gallery renders deterministic grayscale plates via `Placeholder.tsx`. To use real photographs:

1. Drop image files into `public/works/`
2. Update `lib/works.ts` to reference file paths
3. Replace `<Placeholder>` with `<Image>` (next/image) in `components/WorkPlate.tsx`

---

## Google Calendar setup

The booking system uses a **service account** — no OAuth flow, no user login, no token refresh. The account is granted access to your calendar and reads free/busy slots + writes bookings as events.

SharonShaktiTattoo@gmail.com
Temporarypass1327

### 1. Create a Google Cloud project

Go to <https://console.cloud.google.com> and create a new project.

### 2. Enable the Calendar API

**APIs & Services → Library → Google Calendar API → Enable**

### 3. Create a service account

**APIs & Services → Credentials → Create credentials → Service account**

Name it `booking` (or anything). Once created, go to **Keys → Add key → JSON**, download the file. You need two values from it: `client_email` and `private_key`.

### 4. Share your calendar with the service account

Open **Google Calendar → Settings → [your calendar] → Share with specific people**, add the service account email (e.g. `booking@project-id.iam.gserviceaccount.com`) with permission **"Make changes to events"**.

### 5. Find the calendar ID

**Settings → [your calendar] → Integrate calendar → Calendar ID**. For your primary calendar this is your email address.

### 6. Configure environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in:

```bash
GOOGLE_CLIENT_EMAIL=booking@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE…\n-----END PRIVATE KEY-----\n"
GOOGLE_CALENDAR_ID=you@example.com
BOOKING_TIMEZONE=Europe/Stockholm
```

> **Important:** the private key must be on a single line with literal `\n` escapes (not real newlines). The app converts them at runtime. Keep the surrounding quotes.

Restart `npm run dev` — the booking page now reads real availability and creates real calendar events with email invitations.

### Customising booking hours

Edit `lib/booking-config.ts`:

```ts
workingDays: [2, 3, 4, 5, 6], // Tue–Sat  (0 = Sun … 6 = Sat)
dayStartHour: 11,              // 11:00
dayEndHour: 17,                // 17:00
slotMinutes: 45,               // 45-min consultation slots
horizonDays: 28,               // how far ahead to show availability
```

---

## Deploy

### Vercel (recommended)

1. Push the repo to GitHub
2. Import at <https://vercel.com/new>
3. Add the four environment variables under **Settings → Environment Variables**
4. Deploy — API routes run as Node.js serverless functions automatically

### Custom domain via Cloudflare

If your domain's DNS is managed by Cloudflare, point it at Vercel:

1. In Vercel → **Settings → Domains**, add your domain
2. In Cloudflare DNS, add the records Vercel gives you:
   - **Apex** (`example.com`): `A` record to Vercel's IP, or a flattened `CNAME` to `cname.vercel-dns.com`
   - **www**: `CNAME` to `cname.vercel-dns.com`
3. Set both records to **DNS only** (grey cloud, not proxied) — Vercel must be able to verify the domain and issue TLS directly

---

## Design

The visual system is documented in [`DESIGN.md`](./DESIGN.md). Strategic context in [`PRODUCT.md`](./PRODUCT.md).

**North star:** *The Black Gallery* — drenched monochrome, oxblood as the single accent, horror treated as fine art.

| Token | Value |
|---|---|
| Ink (background) | `#0a0a0a` |
| Bone (type) | `#f3f2ef` |
| Oxblood (accent) | `#6e1014` |
| Display font | Bodoni Moda (variable serif) |
| Body font | Inter |

---

## Notes

- No reduced-motion fallback and no content warning — deliberate product decisions, documented in `PRODUCT.md`.
- ESLint is disabled during `next build` (`eslint.ignoreDuringBuilds: true`). Run `npm run lint` separately.




