---
name: Sharon Shakti
description: Horror gallery-grade portfolio + booking for a blackwork / horror-realism / dark-art tattoo artist. Drenched monochrome, oxblood as the one voice.
---

# Design System: Sharon Shakti

## 1. Overview

**Creative North Star: "The Black Gallery"**

A morgue-quiet exhibition hall hung with horror-realism and blackwork. The walls are absolute black, the labels are bone-white, and the only color in the entire building is blood. Work is hung like art, lit like art, paced like art — the visitor moves through it slowly, deliberately, in the dark. This is a gallery of the macabre, not a tattoo shop; reverence and restraint do the work that shock would cheapen.

The system is **drenched monochrome**: black is the field, bone-white is the type and frame, and a single dark-red oxblood is the one voice — rare enough that every appearance reads as intentional, like blood on skin. Motion is **choreographed** (canvas / WebGL / GSAP, scroll-driven sequences) — the experience must feel alive, crafted, and singular.

**Key Characteristics:**
- Drenched black field; bone-white type; oxblood as the sole accent (≤10%)
- Three-family type system: SingleGhost display / Cinzel heading / EB Garamond body
- Choreographed, scroll-driven motion as the medium, not garnish
- Gallery cadence: negative space, slow reveals, work hung not gridded
- Gothic architecture vocabulary for ornaments and UI chrome

---

## 2. Colors

Drenched monochrome. No hue other than oxblood ever appears.

### Palette tokens (Tailwind + CSS custom properties)

| Token | Value | Role |
|---|---|---|
| `void` | `#000000` | Absolute black — hero overlays, lightbox backdrop |
| `ink` | `#0a0a0a` | Primary background — the gallery wall |
| `ink-raised` | `#141414` | Elevated surfaces — cards, booking container |
| `bone` | `#f3f2ef` | Primary text, frames, labels — the light |
| `ash` | `#7d7d7d` | Secondary text, captions, inactive states |
| `ash-dim` | `#3a3a3a` | Borders, dividers, subtle structure |
| `oxblood` | `#6e1014` | Hover fills, destructive states, deeper blood |
| `oxblood-bright` | `#9a1620` | **The one voice** — active states, CTAs, labels |

### CSS custom properties
```css
--oxblood-glow: 0 0 22px rgba(154, 22, 32, 0.45);
```

### Named Rules

**The One Voice Rule.** Oxblood (`#9a1620` / `#6e1014`) appears on ≤10% of any screen. It is the only colour in the system. When in doubt, it stays black and white.

**The No-Hue Rule.** No second accent. No blue, green, gold. Ink · bone · ash · oxblood — nothing else.

**The Dark-Swallow Rule.** Surface separation via a near-black tonal step or 1px bone/ash hairline — never a floating grey card shadow.

---

## 3. Typography

Three families, strict role assignment. No crossover.

| Family | Variable | Source | Role |
|---|---|---|---|
| **SingleGhost** | `--font-display` / `font-display` | Local (`app/fonts/SingleGhost.ttf`) | H1 display — hero, about, page headers |
| **Cinzel** | `--font-heading` / `font-heading` | Google Fonts | Section headings, nav links, labels, booking steps |
| **EB Garamond** | `--font-body` / `font-serif` | Google Fonts | Body copy, captions, italic accents |

### Scale

```
Display (h1):   clamp(1.75rem, 8vw, 6rem) / leading-[0.9–0.92] / tracking-display (-0.01em)
Heading (h2):   text-3xl–text-5xl / uppercase / tracking-heading (0.16em)
Label:          text-[0.7rem] / uppercase / tracking-[0.28em] / font-heading
Body:           text-[1.0625rem] (17px) / leading-relaxed / max-w-[68ch]
```

### Named Rules

**The Two-Voice Rule.** SingleGhost/Cinzel for display/heading only. EB Garamond for body only. They never swap roles.

**The Label System.** `.label` class: Cinzel, 0.7rem, uppercase, tracking 0.28em. Used for eyebrows, step numbers, captions. Use sparingly — an eyebrow on every section is AI grammar, not brand voice.

---

## 4. Spacing & Layout

- Max content width: `max-w-[1600px]`
- Horizontal page padding: `px-6 md:px-12`
- Section vertical rhythm: `py-24 md:py-32` to `py-32 md:py-48` (breathe; don't compress)
- Body text max width: `max-w-measure` = `68ch`
- Grid: `grid-cols-1 md:grid-cols-3` for gallery; `md:grid-cols-12` for bio layout
- Booking inner container: `p-4 sm:p-8 md:p-[5.5rem]`

---

## 5. Motion

| Layer | Tool | Character |
|---|---|---|
| Hero 3D | R3F / Three.js | Breathing displaced mass + ash particle shell |
| Page entrance | Framer Motion | `opacity 0→1, y 12→0, 0.6s expo-out` |
| Scroll reveals | GSAP + ScrollTrigger | `opacity 0→1, y 40→0, clipPath inset` |
| Gallery plates | GSAP | `opacity 0→1, y 56→0, clipPath 8%→0` |
| Lightbox | Framer Motion | `scale 0.92→1, y 24→0, clipPath, backdrop blur` |
| Smooth scroll | Lenis | `duration 1.2, expo easing` |
| Ember particles | canvas2D | `oxblood radial gradients, 16–26 particles, drift upward` |

---

## 6. Components

### Button (`Button.tsx` + `.btn-reliquary`)
Pointed-arch silhouette via `clip-path`. Corner pins, oxblood wash on hover, animated arrow. Bone rim on dark fill; oxblood fill for destructive variant.

### Gallery plate (`WorkPlate.tsx`)
`next/image` fill + `object-cover` inside an aspect-ratio container. Four `TraceryCorner` filigrees animate inward on hover. Oxblood hairlines draw across all four edges. Leaded-glass tint overlay. GSAP scroll entrance with clipPath.

### Lightbox (`Lightbox.tsx`)
Framer Motion `AnimatePresence`. Backdrop: `bg-void/88 backdrop-blur-md` + oxblood radial underglow. Image: `scale 0.92→1` + `clipPath` reveal + tracery corner overlays. Prev/next arrows + keyboard (←/→/Esc). Body scroll lock on open.

### FAQ Accordion (`FaqAccordion.tsx`)
`grid-rows-[0fr→1fr]` CSS transition. Oxblood diamond marker on active item, `+` → rotated `×` icon.

### Ember field (`EmberField.tsx`)
canvas2D, DPR-aware, rAF loop. `~20–26` oxblood radial-gradient particles, sine-envelope alpha, upward drift. Used on Care page header + aftercare section, Instagram section.

### Form fields (`.field-gothic`)
Bottom border only, flanked by 9px gothic corner clips. Focus: oxblood border + `--oxblood-glow`. Gargoyle watermark fades in at 10% on focus.

### Checkbox (`.illuminated-check`)
38×38px illuminated-manuscript square. Lights oxblood when checked, shows `S` character (SingleGhost). Inner border inset. Glow on checked state.

### Dividers (`Divider.tsx`)
`quatrefoil` · `rose` · `fleur` · `diamond`. Bone/ash rules flanking an SVG ornament. `RibbedColumn` for vertical separation.

### Nav (`Nav.tsx`)
Sticky, `bg-ink/80 backdrop-blur-md` on scroll. **"Sharon Shakti"** wordmark in Cinzel (`font-heading`) with `tracking-heading`. Links in Cinzel label style. Active underline: oxblood hairline with diamond tip. Mobile: `Portcullis` hamburger → full-height drawer.

### Ornaments (`components/ornaments/`)
`TraceryCorner` (4 rotations), `Quatrefoil`, `RoseWindow`, `Arcade`, `Arch`, `DiamondChain`, `FleurDeLis`, `Gargoyle`, `Portcullis`, `RibbedColumn`. All SVG, `stroke="currentColor"`, transparent background.

---

## 7. Globals (CSS primitives)

```css
/* Pointed-arch clip */
--arch: polygon(0% 100%, 0% 22%, 8% 13%, 22% 6%, 37% 1.5%, 50% 0%, …);

/* Decorative primitives */
.grain          Film grain overlay (grain.svg, 0.07 opacity, animated)
.crenellation   Battlement strip via CSS mask
.field-gothic   Bottom-rule input + corner clips + gargoyle
.illuminated-check  Oxblood manuscript checkbox
.btn-reliquary  Full button system (wash, pins, arrow, variants)
.leaded-glass   Diamond-lead tint overlay (::after)
.cross-tiles    Repeating SVG cross tile background (footer base)
.dropcap        SingleGhost illuminated drop capital
.label          Cinzel 0.7rem uppercase tracking-[0.28em]
.footer-crypt-link  Hover: translate + oxblood underline + diamond marker
```

---

## 8. Do / Don't

### Do
- Keep oxblood ≤10% of any screen. Scarcity is the point.
- Let the tattoo imagery command. UI recedes.
- Use choreographed, scroll-driven motion as a core material.
- Verify bone-on-ink body text (trivially ≥4.5:1).
- Pair SingleGhost/Cinzel with EB Garamond only.

### Don't
- Introduce any second accent color.
- Use eyebrow labels on every section — one deliberate system or none.
- Float surfaces on soft grey shadows.
- Use a uniform product grid for the gallery.
- Apply neon, RGB glow, or cyberpunk "dark mode" treatments.
- Use skulls-and-barbed-wire / tribal / shock-value horror clichés.
