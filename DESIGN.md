<!-- SEED: re-run $impeccable document once there's code to capture the actual tokens and components. -->
---
name: Sharon
description: Horror gallery-grade portfolio + booking for a blackwork / horror-realism / dark-art tattoo artist. Drenched monochrome, oxblood as the one voice.
---

# Design System: Sharon

## 1. Overview

**Creative North Star: "The Black Gallery"**

A morgue-quiet exhibition hall hung with horror-realism and blackwork. The walls are absolute black, the labels are bone-white, and the only color in the entire building is blood. Work is hung like art, lit like art, paced like art — the visitor moves through it slowly, deliberately, in the dark. This is a gallery of the macabre, not a tattoo shop; reverence and restraint do the work that shock would cheapen.

The system is **drenched monochrome**: black is the field, bone-white is the type and frame, and a single dark-red oxblood is the one voice — rare enough that every appearance reads as intentional, like blood on skin. Motion is **choreographed** (canvas / WebGL / GSAP, scroll-driven sequences, awwwards-grade) — the experience is meant to feel alive, crafted, and singular, taking direct inspiration from kayiseisagu.com's canvas-driven black/white restraint and bent toward the visceral. The imagery — high-contrast blackwork, dotwork, dark realism — supplies all the texture; the UI recedes so the ink commands.

This system explicitly rejects: generic Squarespace tattoo templates, neon / cyberpunk "dark mode" (this is monochrome, never RGB-edgy), skulls-and-barbed-wire / tribal-clipart horror cliché, link-in-bio minimalism, and adolescent edgelord shock. The horror here is refined.

**Key Characteristics:**
- Drenched black field; bone-white type; oxblood as the sole accent (≤10%)
- High-contrast serif display against grotesque sans body
- Choreographed, scroll-driven motion as the medium, not garnish
- Gallery cadence: negative space, slow reveals, work hung not gridded
- No reduced-motion fallback, no content warning (deliberate owner direction)

## 2. Colors

Drenched monochrome — a black surface, bone-white ink, and a single dark-red voice. No other hue ever appears.

### Primary
- **Oxblood** (`[exact value to be resolved during implementation]` — a deep, dried-blood dark red; *not* bright crimson): The one voice. Booking CTAs, the active/critical state, a hairline under a hovered piece, the occasional drawn line. Rare by doctrine — its scarcity is the point.

### Neutral
- **Ink Black** (`[to be resolved]` — pure or near-pure black): The field. Backgrounds, the gallery walls, the void between works.
- **Bone White** (`[to be resolved]` — pure or faintly warm off-white): All body type, frames, labels, dividers. The light in the dark room.
- **Ash** (`[to be resolved]` — mid-grey): Secondary type, muted captions, inactive states. Sits between ink and bone.

### Named Rules
**The One Voice Rule.** Oxblood appears on ≤10% of any screen. It is the only color in the system; everything else is black, white, or grey. When in doubt, it stays black-and-white — blood is spent, not spilled.

**The No-Hue Rule.** There is no second accent. No blue, no green, no gold. Any color that is not ink, bone, ash, or oxblood is forbidden.

## 3. Typography

**Display Font:** `[high-contrast serif / Didone — to be chosen at implementation]` (with a serif fallback)
**Body Font:** `[grotesque sans — to be chosen at implementation]` (with a sans fallback)

**Character:** A high-contrast display serif whose thick/thin stroke contrast mirrors blackwork's own solid-black-vs-fine-line duality, set against a clean, cold grotesque sans for everything functional. Gallery-grade gravitas up top; clinical legibility below.

### Hierarchy
- **Display** (light/regular weight, large clamp — ceiling ≤6rem, line-height ~1): Artist name, section titles, the few words that hang on the wall. Letter-spacing ≥ -0.04em floor; the serif's contrast carries the weight, not tracking.
- **Headline** (regular, mid-large): Piece titles, gallery-room headers.
- **Body** (regular, 16–18px, line-height ~1.6, max 65–75ch): Bio, process, the rare paragraph. Bone-white on ink — verify ≥4.5:1 (trivial in monochrome).
- **Label** (grotesque sans, small, mild uppercase tracking): Booking UI, timestamps, captions, nav.

### Named Rules
**The Two-Voice Rule.** Serif speaks only in display and headline. Sans speaks everywhere functional. They never trade places, and no third family ever enters.

## 4. Elevation

Layered, not lifted. Depth comes from the choreographed motion and the black-on-black tonal stacking (ink vs. a marginally lighter near-black surface), not from drop shadows. Shadows, when they exist at all, are deep and diffuse — the dark swallowing an edge — never the soft grey card-shadow of a 2014 app. If a surface looks like it's floating on a light-grey halo, it's wrong.

### Named Rules
**The Dark-Swallow Rule.** Separation between surfaces is achieved by a near-black tonal step or a 1px bone/ash hairline — never by a glowing drop shadow.

## 5. Components

<!-- No components exist yet. Re-run $impeccable document once the UI is built to capture real button / input / nav / gallery-frame primitives. -->

## 6. Do's and Don'ts

### Do:
- **Do** keep oxblood rare — ≤10% of any screen, reserved for the booking CTA and critical/active states. Blood is spent, not spilled.
- **Do** let the imagery be the only texture; hang each tattoo like a framed work with negative space around it.
- **Do** use choreographed, scroll-driven motion (canvas / GSAP) as a core material — the site must feel alive and crafted.
- **Do** pair the high-contrast serif display with a cold grotesque sans, and keep them in their lanes.
- **Do** verify bone-white-on-ink body text hits ≥4.5:1 (trivial here) and ship full keyboard navigation with focus states that fit the dark aesthetic.

### Don't:
- **Don't** use a generic Squarespace tattoo-shop template, price lists, or stock "BOOK NOW" chrome.
- **Don't** do neon / cyberpunk "dark mode" — this is monochrome, never RGB-edgy.
- **Don't** use skulls-and-barbed-wire / tribal-clipart horror cliché, or adolescent edgelord shock.
- **Don't** ship link-in-bio minimalism — this is an immersive site, not a landing card.
- **Don't** introduce any second accent color. No blue, gold, green. Ink, bone, ash, oxblood — nothing else.
- **Don't** lay the work out as a uniform product grid; it's a gallery, not a shop.
- **Don't** float surfaces on soft grey card-shadows; separate with tonal steps or hairlines (The Dark-Swallow Rule).
