# Product

## Register

brand

## Users

Two audiences, one surface:

- **Prospective collectors** — people seeking a serious horror-realism / dark-art / blackwork tattoo. They arrive to judge the work, feel the artist's world, and decide whether to commit skin to it. Context: scrolling deliberately, often at night, on phone or desktop, evaluating craft and trust before booking a permanent mark.
- **Returning / booked clients** — checking availability and reserving a slot. Context: focused, transactional, want the booking to be fast and unambiguous against real calendar availability.

The job to be done: *see the work the way it deserves to be seen, believe in the artist, then book without friction.*

## Product Purpose

A single-artist portfolio + booking site for **Sharon Shakti** (@sharonnshakti) — a horror-realism, dark-art, blackwork tattoo artist based in Stockholm. The site exists to present her tattoo work as gallery pieces, establish her as a serious dark-art practitioner, and convert belief into a booked appointment synced live to her Google Calendar.

Success = the work lands with weight, the artist feels singular and credible, and a qualified visitor books a real available slot in under a minute. Booking persists to Google Calendar as the source of truth — no database.

**Live:** https://sharon-shakti.vercel.app/ (custom domain `sharon.ink` pending)

## Current Pages

| Route | Status |
|---|---|
| `/` | Live — 3D hero, statement, auto-populating selected work gallery |
| `/work` | Live — full gallery, image lightbox |
| `/about` | Live — bio, facets, Instagram section (@sharonnshakti) |
| `/book` | Live — calendar-synced availability, consultation form, email confirmation |
| `/care` | Live — FAQ accordion + aftercare guide (generic copy, needs Sharon's review) |

## Content Pending from Sharon

- [ ] Real tattoo images for `public/work/selected/` and `public/work/gallery/`
- [ ] A photo of her for `public/about/` (any filename)
- [ ] Bio text in first person
- [ ] FAQ answers to replace the generic placeholders in `/care`
- [ ] Aftercare instructions in her own words
- [ ] Booking system confirmation: working days, hours, slot length, deposit policy
- [ ] Studio details (name, address, link) if applicable
- [ ] Pricing info (if any to display)


## Brand Personality

**Horror gallery-grade.** Three words: **visceral · refined · ritualistic.**

Horror realism treated like fine art, not shock content. The dread is in the craft and the restraint — high-contrast monochrome, deliberate pacing, work given room to breathe. Voice is sparse and confident; the imagery does the talking. Closer to a museum of the macabre than a tattoo-shop flyer. Reference north star: kayiseisagu.com — pure black/white, canvas/GSAP motion, gallery cadence — bent toward the visceral.

## Anti-references

- Generic Squarespace / template tattoo-shop sites (price lists, stock flames, "BOOK NOW" buttons)
- Neon / cyberpunk "dark mode" — this is monochrome, not RGB-edgy
- Skulls-and-barbed-wire / tribal-clipart cliché horror
- Link-in-bio minimalism — this is an immersive site, not a landing card
- Edgelord shock-for-shock's-sake — the horror is refined, not adolescent

## Design Principles

1. **The work is the spectacle.** UI recedes; imagery commands. Every layout decision asks "does this make the tattoo land harder?"
2. **Restraint amplifies dread.** Monochrome, negative space, slow deliberate motion. Horror through control, not clutter.
3. **Gallery, not shop.** Treat each piece like a hung artwork — framing, pacing, reverence. Never a product grid.
4. **Motion is the medium.** Interactive and visually stunning is a requirement, not a garnish. Canvas/WebGL/GSAP carry the experience; the site should feel alive and crafted, awwwards-grade.
5. **Booking is sacred and frictionless.** The path from belief to booked slot is short, clear, and honest about real availability.

## Accessibility & Inclusion

- **Target:** WCAG AA contrast (trivial in pure monochrome), full keyboard navigation, semantic structure, focus states that fit the aesthetic.
- **Reduced motion:** Per owner's explicit direction, the site does **not** ship a reduced-motion fallback — motion is core to the experience and intentionally non-negotiable here. (Noted as a deliberate trade-off against the usual `prefers-reduced-motion` baseline.)
- **Content warning:** None. Horror imagery loads directly by design.
