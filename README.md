# SHARON

The black gallery — a horror-realism, blackwork & dark-art tattoo portfolio with
a calendar-synced booking system. **No database.** Your Google Calendar is the
single source of truth for availability and bookings.

Built with **Next.js 14 (App Router)**, **React Three Fiber**, **GSAP + Lenis**,
**Framer Motion**, **Tailwind CSS**, and the **Google Calendar API**.

---

## Run it locally (Windows / macOS / Linux)

> Requires Node.js 18.18+ (Node 20 or 22 recommended).

```bash
npm install
npm run dev
```

Open **http://localhost:3000**.

The booking system works immediately in **mock mode** — no credentials needed.
Availability is simulated and no real events are created. Connect Google
Calendar (below) to go live.

Other scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run typecheck  # tsc --noEmit
npm run lint       # next lint
```

---

## Project structure

```
app/
  layout.tsx            Root layout: fonts, smooth scroll, cursor, nav, footer
  template.tsx          Per-route enter transition (Framer Motion)
  page.tsx              Home — 3D hero + statement + featured work + CTA
  work/page.tsx         Gallery
  about/page.tsx        Artist bio
  book/page.tsx         Booking page
  api/slots/route.ts    GET availability for a date
  api/book/route.ts     POST a booking
  globals.css           Tokens, grain overlay, base styles
components/
  hero/                 R3F canvas, displacement shader, ash particles
  booking/BookingFlow   Date strip + slot grid + form + states
  Nav, Footer, Cursor, SmoothScroll, Reveal, WorkPlate, Placeholder
lib/
  calendar.ts           Google Calendar: free/busy + event creation (+ mock)
  booking-config.ts     Working days / hours / slot length (client-safe)
  works.ts              Gallery catalogue (placeholder data)
```

### Placeholder imagery

The gallery uses generated grayscale "plates" (`components/Placeholder.tsx`).
To use real photographs: drop files in `public/works/`, then swap `<Placeholder>`
for `next/image` in `components/WorkPlate.tsx` and reference the file paths from
`lib/works.ts`.

---

## Google Calendar setup (go live)

The booking system uses a **service account** — no OAuth flow, no user login,
no tokens to refresh. The service account is granted access to one calendar; it
reads free/busy and writes bookings as events.

1. **Create a Google Cloud project** → <https://console.cloud.google.com>
2. **Enable the Google Calendar API** (APIs & Services → Library → Calendar API → Enable).
3. **Create a service account** (APIs & Services → Credentials → Create
   credentials → Service account). Name it e.g. `booking`.
4. **Create a JSON key** for that service account (Keys → Add key → JSON).
   Download it. You need two values from the file: `client_email` and
   `private_key`.
5. **Share your calendar with the service account.** Open Google Calendar →
   the calendar's *Settings and sharing* → *Share with specific people* → add
   the service account email (`booking@…iam.gserviceaccount.com`) with
   **"Make changes to events"**.
6. **Find the calendar ID** in the same settings page (*Integrate calendar →
   Calendar ID*). For your primary calendar this is just your email address.

### Environment variables

Copy `.env.example` to `.env.local` and fill in:

```bash
GOOGLE_CLIENT_EMAIL=booking@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE…\n-----END PRIVATE KEY-----\n"
GOOGLE_CALENDAR_ID=you@example.com
BOOKING_TIMEZONE=Europe/Stockholm
```

> **The private key must stay on one line with literal `\n`** escapes (the app
> converts them to newlines at runtime). Keep the surrounding quotes.

Restart `npm run dev`. The booking page will now show real availability and
create real calendar events (with invitations emailed to the client).

### Booking rules

Edit `lib/booking-config.ts`:

```ts
workingDays: [2, 3, 4, 5, 6], // Tue–Sat (0=Sun … 6=Sat)
dayStartHour: 11,
dayEndHour: 17,
slotMinutes: 45,
horizonDays: 28,
```

---

## Deploy

### Vercel (recommended, free tier)

1. Push this repo to GitHub.
2. Import the repo at <https://vercel.com/new>.
3. Add the four environment variables (Settings → Environment Variables).
   Paste the private key exactly as in `.env.local`, quotes and `\n` included.
4. Deploy. The API routes run as serverless functions automatically.

### Custom domain via Cloudflare

If your domain's DNS is on Cloudflare, point it at Vercel:

1. In Vercel → Project → Settings → Domains, add your domain.
2. In Cloudflare DNS, add the records Vercel shows you:
   - Apex (`example.com`): an `A` record to Vercel's IP, **or** a `CNAME`
     flattened to `cname.vercel-dns.com`.
   - `www`: a `CNAME` to `cname.vercel-dns.com`.
3. Set those records' proxy status to **DNS only** (grey cloud) so Vercel can
   issue and serve TLS. Vercel verifies and provisions the certificate.

---

## Notes

- **No reduced-motion fallback** and **no content warning** — deliberate design
  decisions (see `PRODUCT.md` / `DESIGN.md`).
- Design system: drenched monochrome, oxblood as the single accent, Bodoni Moda
  display + Inter body. See `DESIGN.md`.
