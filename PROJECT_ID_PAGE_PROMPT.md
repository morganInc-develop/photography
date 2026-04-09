# PROJECT ID PAGE — THE ARCHIVE (`/the-archive`)

## Implementation Master Prompt

**Data Sources Referenced:**

- Playwright capture: `output/playwright/nicolaromei-the-archive-2026-04-07/`
  - `source.html` — full DOM with embedded CSS, JS, and all copy
  - `dom-desktop.json` — computed layout tree
  - `style-probe.json` + `style-probe-mobile.json` — computed styles
  - `capture-metadata.json` — viewport metadata
  - `nicolaromei-the-archive-recreation-brief.md` — behavioral brief
  - Screenshots: `desktop-hero.png`, `desktop-full.png`, `desktop-mid.png`, `desktop-lower.png`, `desktop-footer.png`, `mobile-hero.png`, `mobile-full.png`, `mobile-mid.png`
- Reference site: `https://www.nicolaromei.com/the-archive`

---

## 0. Goal

Build a one-to-one pixel-faithful recreation of the Nicola Romei `/the-archive` page as a Next.js App Router page at `src/app/the-archive/page.tsx`. The page must be fully client-rendered (`"use client"`), using GSAP 3.14.2, Tailwind CSS v4, and the global styles already in `globals.css`.

This is not a simplified approximation. Every animation, timing, CSS state, copy fragment, and data value documented below must be implemented. Match the reference screenshots exactly.

---

## 1. Route & File Structure

```
src/
  app/
    the-archive/
      page.tsx           ← main page (client component)
  components/
    archive/
      ArchivePage.tsx    ← main wrapper (client, imports everything)
      GalleryMode.tsx    ← desktop gallery panel (image list + minimap + site-info)
      ClientsMode.tsx    ← desktop client-name list with hover preview
      WorksControls.tsx  ← gallery/clients toggle buttons
      WorksTags.tsx      ← two text tag blocks at bottom
      MobileWorks.tsx    ← mobile-only vertical card list
      ArchiveHeader.tsx  ← back link + clock + THE PROFILE link (shared top rail)
    home/
      BlinkWordmark.tsx  ← reuse existing blink text logic for ( THE ARCHIVE ) title
```

`app/the-archive/page.tsx`:

```tsx
import ArchivePage from "@/components/archive/ArchivePage";
export default function TheArchive() {
  return <ArchivePage />;
}
```

---

## 2. Typography & Color Tokens

All values verified against `style-probe.json` and `style-probe-mobile.json`.

| Token                    | Value                                                         |
| ------------------------ | ------------------------------------------------------------- |
| `--color-bg`             | `#f3f3f3` (rgb 243,243,243)                                   |
| `--color-text`           | `#333333` (rgb 51,51,51)                                      |
| `--color-white`          | `#ffffff`                                                     |
| `--color-black`          | `#1a1a1a`                                                     |
| Body font                | `"Host Grotesk", Arial, sans-serif` (400/500/600/700 weights) |
| Display/H1 font          | `"Easegeometricb", Impact, sans-serif` (700 weight)           |
| Mono accent              | `"prestige-elite-std", monospace` (400/700 weight)            |
| `h1` `font-size`         | `35px` desktop, `2rem` mobile (≤1000px)                       |
| `h1` `letter-spacing`    | `-2.1px`                                                      |
| `h1` `line-height`       | `35px` (1:1 leading)                                          |
| `h1` `text-transform`    | `uppercase`                                                   |
| `.paragraph`             | `14px`, weight 400, line-height `20px`, letter-spacing normal |
| `.paragraph-8`           | Same as `.paragraph` but used in nav/header contexts          |
| `.paragraph-9`           | Used for client list names — larger, display treatment        |
| `.paragraph.is--medium`  | Medium-weight manifesto body text                             |
| `.paragraph.is--eyebrow` | Small caps / mono eyebrow text, uppercase                     |
| `.paragraph.is--list`    | Large H1-scale paragraph used in client name list             |

**Font loading (Google Fonts / Adobe Fonts fallbacks):**
Use `next/font/google` for Host Grotesk. Easegeometricb and prestige-elite-std are custom fonts — add as `@font-face` in `globals.css` using CDN URLs or local files. If unavailable, use `Impact` and `Courier New` as fallbacks respectively.

---

## 3. Page Structure Overview

The page has **two entirely separate layout sections** — desktop and mobile — rendered simultaneously in the DOM. CSS `display: none` hides each at the appropriate breakpoint.

```
<main>
  <div class="page-wrapper">

    <!-- DESKTOP SECTION: hidden on mobile -->
    <section class="section is--works">
      <ArchiveHeader />          ← top-left nav rail
      <GalleryContainer />       ← gallery mode (images, names, minimap)
      <ClientsMode />            ← clients/list mode
      <WorksControls />          ← gallery | clients toggle
      <WorksTags />              ← two bottom tags
    </section>

    <!-- MOBILE SECTION: hidden on desktop -->
    <section class="section is--mobile">
      <MobileWorks />            ← full vertical card feed
    </section>

  </div>
</main>
```

Desktop breakpoint: shown above `@media (min-width: 1001px)`.
Mobile breakpoint: shown at `@media (max-width: 1000px)`.

---

## 4. Color & Background

- `body`, `html`: `background: #f3f3f3`
- Desktop section `.section.is--works`: `background: #f3f3f3`, full viewport height, `position: relative`
- The desktop section uses a **dark overlay** with `background: #1a1a1a` or `#000` painted on the gallery container — refer to screenshots. The gallery panel sits on a dark background while the page bg is light.
- Mobile section: `background: #f3f3f3`, matches page bg

---

## 5. Archive Header (Desktop Top Rail)

The header occupies the top of the desktop section. It's a single row with three columns:

**Left — Back link:**

```tsx
<a href="/" data-underline-link="alt" className="link-group is--dark">
  <p className="paragraph-8">back to artboard™</p>
</a>
```

Underline animation: see Section 12 (Underline Wipe CSS).

**Center — Live clock:**

```tsx
<p data-current-time="Europe/Rome" className="paragraph-8">
  <span data-current-time-hours>10</span>:
  <span data-current-time-minutes>11</span>:
  <span data-current-time-seconds>48</span>{" "}
  <span data-current-time-timezone>GMT+2</span>
</p>
```

Clock updates every 1 second via `setInterval` in a `useEffect`. Use `Intl.DateTimeFormat` with `timeZone: "Europe/Rome"`. Parse hours/minutes/seconds/timezone from the formatted string.

**Right — Profile link:**

```tsx
<a href="#" data-underline-link="alt" className="link-group is--dark">
  <p className="paragraph-8">THE PROFILE</p>
</a>
```

Layout: `display: flex; justify-content: space-between; align-items: center; padding: 1.5rem 2rem; position: absolute; top: 0; left: 0; right: 0; z-index: 50;`

---

## 6. Gallery Mode — Desktop

The gallery container is the **default visible mode** on desktop. It is a fixed or sticky panel, dark background, that takes up the full viewport. When the page mode switches to "clients", this panel **slides out** (hidden via margin or transform).

### 6.1 Gallery Container State Machine

CSS classes drive visibility:

```css
.gallery__container {
  transition: transform 850ms cubic-bezier(0.596, 0.002, 0, 1.002);
}

/* NOT ACTIVE state — panels offset below/above */
.gallery__container:not(.active) .minimap {
  margin-top: -5vw;
}
.gallery__container:not(.active) .site-info {
  margin-top: -15vw;
}
.gallery__container:not(.active) .img-site__list {
  transform: translateY(-10vw);
}

/* ACTIVE state — all return to natural position */
.gallery__container.active .minimap,
.gallery__container.active .site-info {
  margin-top: 0vw;
}
.gallery__container.active .img-site__list {
  transform: translateY(0vw);
}
```

On mount: `.gallery__container` has class `active`.
On toggle to clients mode: remove `active` → panels fly out via CSS transition.

### 6.2 Gallery Names List (`.gallery__names`)

An absolutely positioned column on the left side of the gallery panel. Lists all 8 project names as clickable items.

Each `.gallery__item`:

- Default: `opacity: 0.5`
- Active (currently focused by wheel): `opacity: 1`
- Transition: `opacity 300ms ease`
- Click → navigate to `/works/[slug]`

```tsx
const items = [
  { name: "RETRONOVA", slug: "retronova" },
  { name: "NICOLA ROMEI", slug: "nicola-romei" },
  { name: "CREATIVE LEAP", slug: "creative-leap" },
  { name: "MADE IN EVOLVE", slug: "made-in-evolve" },
  { name: "VALSAVARENCHE", slug: "valsavarenche" },
  { name: "DAVIDE CATTANEO", slug: "davide-cattaneo" },
  { name: "Studies in Form", slug: "studies-in-form" },
  { name: "GEOTAB SIGNALS", slug: "geotab-signals" },
];
```

Rendered as:

```html
<div class="gallery__names">
  <div class="gallery__item" data-index="0" style="opacity: 1">RETRONOVA</div>
  <div class="gallery__item" data-index="1" style="opacity: 0.5">
    NICOLA ROMEI
  </div>
  ...
</div>
```

### 6.3 Image List (`.img-site__list`)

The main center/right image panel. Contains 8 `.img-preview` items, one per project. Only **one is visible** at a time — the one corresponding to the active gallery name.

Each `.img-preview`:

- `width: 100%; height: 100%; object-fit: cover`
- Use Unsplash/Pexels images (see Section 8 for image data)
- Clip-path reveal animation on activation: start `inset(50% round 0.2em)` → end `inset(0% round 0.2em)`
- GSAP tween the clip-path on active change with duration 0.9s, ease `"power4.out"`

Image reveal snippet:

```ts
gsap.fromTo(
  nextImage,
  { clipPath: "inset(50% round 0.2em)" },
  { clipPath: "inset(0% round 0.2em)", duration: 0.9, ease: "power4.out" },
);
```

### 6.4 Minimap

A vertical strip on the far right of the gallery panel showing all 8 images as small thumbnails. Has an indicator (`div.indicator`) that moves vertically to show the current active index.

```
.minimap
  .items
    .item (x8 — thumbnail images)
  .indicator
```

**Indicator positioning:**

- Height = `(100% / 8)` of the minimap height
- `translateY`: `activeIndex * (minimapHeight / 8)`
- Transition: `transform 400ms ease`

### 6.5 Site Info (`.site-info`)

A small info block that appears below the minimap or in the lower section of the gallery. Contains:

```
( 001 )
RETRONOVA
```

Updates with the active index and name. Format: `( 00${activeIndex + 1} )` and the project name.

### 6.6 Inertial Wheel Scroll

The gallery uses GSAP Observer or raw `wheel` events with **lerp (linear interpolation)** to drive the active index. This is NOT a scroll — it's a custom inertial system.

```ts
let targetIndex = 0;
let currentIndex = 0;
let velocity = 0;

const onWheel = (e: WheelEvent) => {
  velocity += e.deltaY * 0.003;
};

// In gsap.ticker.add():
const tick = () => {
  velocity *= 0.88; // friction
  targetIndex += velocity;
  targetIndex = Math.max(0, Math.min(7, targetIndex));
  currentIndex += (targetIndex - currentIndex) * 0.08; // lerp

  const snappedIndex = Math.round(currentIndex);
  // Update active gallery item, image, minimap indicator
};
```

Active index snaps to nearest integer. Transition between images uses the clip-path reveal (Section 6.3).

---

## 7. Clients / List Mode — Desktop

Toggled by clicking the `data-control="clients"` button. Slides in from below (or fades in) while the gallery mode slides out.

### 7.1 Layout

Full dark-background panel with a vertical list of all 8 project names in large type.

```
.clients
  .clients__tag              ← two small text labels
  .clients-list              ← the 8 names
  .client__preview--wrap     ← absolute-positioned preview image area
```

### 7.2 Client Tag

```html
<div class="clients__tag">
  <p class="paragraph">( HOVER TO REVEAL )</p>
  <p class="paragraph">( CLICK TO EXPLORE )</p>
</div>
```

Position: top-right of the panel.

### 7.3 Client Name List

Each `.client-name` is a full-width row link:

```html
<div class="client-name" role="listitem">
  <a href="/works/retronova" class="cn__wrap">
    <h1 class="paragraph is--list">RETRONOVA</h1>
  </a>
</div>
```

- Font: uses `.paragraph.is--list` — large H1 display scale
- `position: relative` on `.client-name` for the `::after` underline
- Underline `::after` via CSS (not `data-underline-link`):
  ```css
  .client-name::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0.15rem;
    background: #fff;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 300ms ease-out;
  }
  .client-name:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
  ```

**Entry animation (on mode switch to clients):**
Each `.cn__wrap` starts with `opacity: 0; transform: translate(0px, 100%)` and staggers in via GSAP:

```ts
gsap.to(".cn__wrap", {
  opacity: 1,
  y: 0,
  stagger: 0.05,
  duration: 0.7,
  ease: "power3.out",
});
```

### 7.4 Hover Preview (`.clients-preview`)

An absolute-positioned `div` that follows or appears at a fixed position inside `.client__preview--wrap`. On hover over a `.client-name`, the corresponding project image reveals using clip-path:

**Initial state:** `clip-path: polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)` — collapsed to center point, invisible.

**Hover in:** Animate to full rectangle: `clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)` — duration 0.5s, ease `power4.out`.

**Hover out:** Collapse back to polygon(50%...) — duration 0.35s, ease `power2.in`.

Image inside `.client-img-wrapper`:

```css
.client-img-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  clip-path: polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%);
  will-change: clip-path;
  overflow: hidden;
}
.client-img-wrapper img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  will-change: transform, opacity;
}
```

GSAP tween on mouseenter:

```ts
gsap.to(wrapper, {
  clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
  duration: 0.5,
  ease: "power4.out",
});
```

On mouseleave:

```ts
gsap.to(wrapper, {
  clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
  duration: 0.35,
  ease: "power2.in",
});
```

The image source for each project must be loaded from the hidden `.cms-image-url` div or from a data structure (see Section 8).

---

## 8. Project Data

All 8 projects with exact copy from source HTML. Use Unsplash/Pexels replacements since Webflow CDN is CORS-blocked.

```ts
export const ARCHIVE_PROJECTS = [
  {
    index: "001",
    slug: "retronova",
    name: "RETRONOVA",
    href: "/works/retronova",
    description:
      "A retro-futurist vision shaped through AI imagery, cinematic motion and luminous soundscapes. Metallic silhouettes, fashion influences and synthetic memories merge into an immersive environment where nostalgia bends toward a future that never existed but still feels strangely real.",
    coverImage:
      "https://images.unsplash.com/photo-1518818419601-72c8673f5852?w=1200&auto=format&fit=crop&q=80",
  },
  {
    index: "002",
    slug: "nicola-romei",
    name: "NICOLA ROMEI",
    href: "/works/nicola-romei",
    description:
      "This portfolio unfolds as an exposed process, gathering AI sketches, drafts, typographic tests and structural studies into a single immersive artboard. A brutalist grid and subtle WebGL depth shape a space where experimentation and identity quietly define each other.",
    coverImage:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
  },
  {
    index: "003",
    slug: "creative-leap",
    name: "CREATIVE LEAP",
    href: "/works/creative-leap",
    description:
      "A calm digital narrative built from soft gradients, gentle transitions and a restrained visual rhythm. Innovation becomes tactile as AI integrates into each scene with quiet clarity, shaping an elegant experience that turns complexity into a natural and intuitive flow.",
    coverImage:
      "https://images.pexels.com/photos/3109807/pexels-photo-3109807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    index: "004",
    slug: "made-in-evolve",
    name: "MADE IN EVOLVE",
    href: "/works/made-in-evolve",
    description:
      "A tech-editorial environment defined by bold typography, clean imagery and sharp structural clarity. Each layout balances discipline and momentum, creating a refined digital presence where innovation becomes a precise visual language that moves confidently forward.",
    coverImage:
      "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    index: "005",
    slug: "valsavarenche",
    name: "VALSAVARENCHE",
    href: "/works/valsavarenche",
    description:
      "A landscape of grain, muted tones and cartographic textures evokes the rugged stillness of alpine territory. Vintage-park cues and weathered visuals form an atmosphere of exploration, transforming the valley's geography into a quiet, immersive field of memory and terrain.",
    coverImage:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&auto=format&fit=crop&q=80",
  },
  {
    index: "006",
    slug: "davide-cattaneo",
    name: "DAVIDE CATTANEO",
    href: "/works/davide-cattaneo",
    description:
      "A data-driven digital environment built around clarity, precision, and controlled intensity. Dark surfaces, neon accents, and immersive scroll interactions translate analytical thinking into a visual system where information feels alive, dynamic, and intentionally structured.",
    coverImage:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&auto=format&fit=crop&q=80",
  },
  {
    index: "007",
    slug: "studies-in-form",
    name: "Studies in Form",
    href: "/works/studies-in-form",
    description:
      "An ongoing visual exploration where AI-generated imagery becomes a tool for studying shape, balance and visual tension, transforming raw experimentation into controlled aesthetic research.",
    coverImage:
      "https://images.pexels.com/photos/3761509/pexels-photo-3761509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    index: "008",
    slug: "geotab-signals",
    name: "GEOTAB SIGNALS",
    href: "/works/geotab-signals",
    description:
      "Corporate experience turning data into clarity. Deep tech blues and neon accents create a sophisticated narrative, signaling intelligence before explaining it.",
    coverImage:
      "https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];
```

---

## 9. Mode Toggle Controls (`.works__controls`)

A small two-button control rail that switches between Gallery mode and Clients mode. Position: **bottom-left or mid-left** of the desktop viewport (refer to `desktop-mid.png`).

```html
<div class="works__controls">
  <button data-control="gallery" class="active">GALLERY</button>
  <button data-control="clients">CLIENTS</button>
</div>
```

- Active button: full opacity, some indicator (border or underline)
- Inactive button: `opacity: 0.4`
- Clicking `data-control="gallery"`: adds `active` to `.gallery__container`, removes from `.clients`
- Clicking `data-control="clients"`: removes `active` from `.gallery__container`, adds to `.clients`

State management in React:

```ts
const [mode, setMode] = useState<"gallery" | "clients">("gallery");
```

The `.gallery__container` div gets `className={mode === "gallery" ? "gallery__container active" : "gallery__container"}`.
The `.clients` div gets `className={mode === "clients" ? "clients active" : "clients"}`.

---

## 10. Works Tags (`.works-tags__wrap`)

Two small label blocks positioned at the **bottom** of the desktop section. Verified exact copy from source HTML.

```html
<div class="works-tags__wrap">
  <div class="tag">
    <div class="paragraph is--eyebrow">
      THIS ARCHIVE DOES NOT<br />
      COLLECT RESULTS.<br />
      IT PRESERVES PROCESS.
    </div>
  </div>
  <div class="tag is--2">
    <div class="paragraph is--eyebrow">
      THIS SPACE HOLDS<br />
      PROJECTS_ <br />
      TESTS_<br />
      VISUAL SYSTEMS_
    </div>
  </div>
</div>
```

Layout: `display: flex; gap: 2rem; position: absolute; bottom: 2rem; left: 2rem;`
Font: eyebrow monospace treatment — `prestige-elite-std` or fallback `Courier New`, `font-size: 10px`, `letter-spacing: 0.08em`, `text-transform: uppercase`.

---

## 11. Mobile Layout (`.section.is--mobile`)

Shown only on `@media (max-width: 1000px)`. A vertically scrolling page with:

### 11.1 Mobile Header (`.wm__top` row x2)

Two rows at the top:

1. **Row 1** (left=back link, right=clock):
   - `<a href="/" data-underline-link="alt">back to artboard™</a>`
   - `<p data-current-time="Europe/Rome">10:11:48 GMT+2</p>` (same live clock component)
2. **Row 2** (right=profile link):
   - `<a href="#" data-underline-link="alt">THE PROFILE</a>`

### 11.2 Mobile Title Block (`.wm__title-mobile`)

```html
<div class="wm__title-mobile">
  <p data-split="heading" class="paragraph is--medium">
    What appears here is not a sequence of outcomes, but a record of decisions.
    Different contexts, different constraints, the same insistence on clarity,
    structure, and presence.
  </p>
  <div class="paragraph is--eyebrow">
    THIS ARCHIVE DOES NOT<br />
    COLLECT RESULTS.<br />
    IT PRESERVES PROCESS.
  </div>
  <h1 data-blink-text class="h-h1 is--huge is--black">( THE ARCHIVE )</h1>
</div>
```

`data-blink-text` uses the same blink animation as the homepage wordmark (reuse `BlinkWordmark` logic or the blink CSS). The `h1` with `.is--huge` is very large — match the homepage `( ARTBOARD™ )` scale. Color: `#1a1a1a` (`.is--black`).

`data-split="heading"` paragraphs receive the GSAP SplitText scroll-triggered mask animation (same as homepage): lines split, each line wraps in a `div`, then `gsap.from(lines, { yPercent: 100, ... })` on scroll trigger at `"top 95%"`.

### 11.3 Mobile Cards (`.works__mobile-list`)

8 cards, vertically stacked. Each card structure:

```html
<div class="collection-item-5 w-dyn-item">
  <div class="wm__img">
    <img loading="lazy" src="[coverImage]" alt="" class="img is--cover" />
  </div>
  <div class="wm__content-2">
    <div class="wm__title">
      <p class="paragraph">(001)</p>
      <p class="paragraph-9">RETRONOVA</p>
    </div>
  </div>
  <div class="wm__content-2 is--desc">
    <p data-split="heading" class="paragraph">[description text]</p>
  </div>
  <a
    href="/works/retronova"
    aria-label="staggering button"
    class="btn-animate-chars"
  >
    <div class="btn-animate-chars__bg-3"></div>
    <span data-button-animate-chars class="btn-animate-chars__text paragraph">
      EXPLORE CASE
    </span>
  </a>
</div>
```

- `.wm__img`: `aspect-ratio: 16/9` or `height: 50vw`, image `object-fit: cover`
- `.paragraph-9`: larger font, used for the project title inside the card
- Description: `data-split="heading"` receives scroll-triggered SplitText animation (same as above)
- "EXPLORE CASE" button: character stagger animation (see Section 13)

**Card layout:**

- `width: 100%`
- `display: flex; flex-direction: column; gap: 1rem`
- `padding: 1.5rem 0`
- `border-top: 1px solid rgba(51,51,51,0.2)`

---

## 12. Underline Wipe CSS Animation

Used on `data-underline-link` and `data-underline-link="alt"` elements. **Exact CSS from source:**

```css
[data-underline-link] {
  text-decoration: none;
  position: relative;
}

/* STANDARD variant — single underline appears on hover */
[data-underline-link]::before {
  content: "";
  position: absolute;
  bottom: -0.0625em;
  left: 0;
  width: 100%;
  height: 0.0625em;
  background-color: currentColor;
  transition: transform 0.735s cubic-bezier(0.625, 0.05, 0, 1);
  transform-origin: right;
  transform: scaleX(0) rotate(0.001deg);
}

@media (hover: hover) and (pointer: fine) {
  [data-underline-link]:hover::before {
    transform-origin: left;
    transform: scaleX(1) rotate(0.001deg);
  }
}

/* ALT variant — two-phase wipe: first line exits right, second enters from left */
[data-underline-link="alt"]::before,
[data-underline-link="alt"]::after {
  content: "";
  position: absolute;
  bottom: -0.0625em;
  left: 0;
  width: 100%;
  height: 0.0625em;
  background-color: currentColor;
  transition: transform 0.735s cubic-bezier(0.625, 0.05, 0, 1);
}

[data-underline-link="alt"]::before {
  transform-origin: left;
  transform: scaleX(1) rotate(0.001deg);
  transition-delay: 0.3s;
}

[data-underline-link="alt"]::after {
  transform-origin: right;
  transform: scaleX(0) rotate(0.001deg);
  transition-delay: 0s;
}

@media (hover: hover) and (pointer: fine) {
  [data-underline-link="alt"]:hover::before {
    transform-origin: right;
    transform: scaleX(0) rotate(0.001deg);
    transition-delay: 0s;
  }
  [data-underline-link="alt"]:hover::after {
    transform-origin: left;
    transform: scaleX(1) rotate(0.001deg);
    transition-delay: 0.3s;
  }
}
```

This CSS should be in `globals.css` (not component-scoped) since `data-underline-link` is used globally.

---

## 13. Button Character Stagger Animation

Used on all "EXPLORE CASE" buttons (`[data-button-animate-chars]`). Characters are split into individual `<span>` elements with incremental `transition-delay`.

**Initialization (runs on mount):**

```ts
function initButtonCharacterStagger() {
  const targets = document.querySelectorAll("[data-button-animate-chars]");
  targets.forEach((el) => {
    const text = el.textContent ?? "";
    el.innerHTML = "";
    [...text].forEach((char, i) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.transitionDelay = `${0.01 * i}s`;
      if (char === " ") span.style.whiteSpace = "pre";
      el.appendChild(span);
    });
  });
}
```

**Button CSS:**

```css
.btn-animate-chars {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 0.75rem 1.5rem;
  border: 1px solid currentColor;
  overflow: hidden;
  cursor: pointer;
  text-decoration: none;
}

.btn-animate-chars__bg-3 {
  position: absolute;
  inset: 0;
  background: #333;
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.4s cubic-bezier(0.625, 0.05, 0, 1);
}

.btn-animate-chars:hover .btn-animate-chars__bg-3 {
  transform: scaleY(1);
}

.btn-animate-chars__text {
  position: relative;
  z-index: 1;
  transition: color 0.3s ease;
}

.btn-animate-chars:hover .btn-animate-chars__text span {
  color: #f3f3f3;
}
```

---

## 14. GSAP SplitText Scroll Animation

Used on all `[data-split="heading"]` elements on both desktop and mobile. **Exact logic from source.html inline script:**

```ts
// Run in useEffect after mount
gsap.registerPlugin(SplitText, ScrollTrigger);

const headings = document.querySelectorAll<HTMLElement>(
  '[data-split="heading"]',
);
headings.forEach((el) => {
  gsap.set(el, { autoAlpha: 1 });

  const split = new SplitText(el, { type: "lines", linesClass: "mask-line" });

  split.lines.forEach((line) => {
    const inner = document.createElement("div");
    inner.style.display = "block";
    while (line.firstChild) {
      inner.appendChild(line.firstChild);
    }
    line.appendChild(inner);
  });

  const lines = el.querySelectorAll<HTMLElement>(".mask-line > div");
  gsap.from(lines, {
    yPercent: 100,
    duration: 0.85,
    stagger: 0.05,
    ease: "power4.out",
    scrollTrigger: {
      trigger: el,
      start: "top 95%",
      toggleActions: "play none none none",
    },
  });
});
```

`.mask-line` CSS:

```css
.mask-line {
  position: relative;
  overflow: hidden;
  display: block;
}
```

---

## 15. Live Clock Implementation

**Exact implementation from source.html inline script** (must be replicated in React):

```ts
function initDynamicCurrentTime() {
  const formatter = (tz: string) =>
    new Intl.DateTimeFormat([], {
      timeZone: tz,
      timeZoneName: "short",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

  const parse = (str: string) => {
    const m = str.match(/(\d+):(\d+):(\d+)\s*([\w+]+)/);
    return m
      ? { hours: m[1], minutes: m[2], seconds: m[3], timezone: m[4] }
      : null;
  };

  const update = () => {
    document
      .querySelectorAll<HTMLElement>("[data-current-time]")
      .forEach((el) => {
        const tz = el.getAttribute("data-current-time") ?? "Europe/Amsterdam";
        const formatted = formatter(tz).format(new Date());
        const parsed = parse(formatted);
        if (!parsed) return;
        const h = el.querySelector("[data-current-time-hours]");
        const m = el.querySelector("[data-current-time-minutes]");
        const s = el.querySelector("[data-current-time-seconds]");
        const z = el.querySelector("[data-current-time-timezone]");
        if (h) h.textContent = parsed.hours;
        if (m) m.textContent = parsed.minutes;
        if (s) s.textContent = parsed.seconds;
        if (z) z.textContent = parsed.timezone;
      });
  };

  update();
  return setInterval(update, 1000);
}
```

In React, call this in `useEffect` and return `clearInterval` from the cleanup.

---

## 16. Blink Text (`( THE ARCHIVE )`)

The mobile title `<h1 data-blink-text>( THE ARCHIVE )</h1>` uses the same blink/glitch animation as the homepage `( ARTBOARD™ )` wordmark. Reuse the `BlinkWordmark` component or its underlying CSS animation logic. The text color is `#1a1a1a` (`.is--black` modifier).

CSS class `.is--huge` should set `font-size: clamp(3rem, 10vw, 8rem)` on mobile and larger on desktop.

---

## 17. GSAP Plugin Registration

Register all GSAP plugins once at module level or in the top-level `useEffect` of `ArchivePage.tsx`:

```ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
import { Observer } from "gsap/Observer";

// In useEffect:
gsap.registerPlugin(ScrollTrigger, SplitText, CustomEase, Observer);
```

GSAP CustomEase "hop" (used in gallery transitions):

```ts
CustomEase.create("hop", "0.9, 0, 0.1, 1");
```

---

## 18. Lenis Smooth Scroll

The mobile section uses Lenis for smooth scroll. Desktop gallery uses wheel interception (not Lenis). Initialize Lenis globally but disable it when in gallery mode (gallery intercepts wheel events via `preventDefault`).

```ts
import Lenis from "lenis";

// In useEffect:
const lenis = new Lenis();
const raf = (time: number) => {
  lenis.raf(time);
  requestAnimationFrame(raf);
};
requestAnimationFrame(raf);
```

---

## 19. Desktop Layout Geometry

Exact layout measurements from `desktop-hero.png` and `capture-metadata.json` (viewport: 1440×1044):

| Element       | Position                                                                                           |
| ------------- | -------------------------------------------------------------------------------------------------- |
| Header rail   | `position: absolute; top: 0; width: 100%; height: ~60px; padding: 1.5rem 2rem`                     |
| Gallery names | `position: absolute; left: 2rem; top: 50%; transform: translateY(-50%); width: ~20%`               |
| Image list    | `position: absolute; right: 15%; top: 10%; width: ~55%; height: ~80%`                              |
| Minimap       | `position: absolute; right: 2rem; top: 50%; transform: translateY(-50%); width: ~8%; height: ~60%` |
| Site info     | `position: absolute; bottom: 3rem; left: 2rem`                                                     |
| Controls      | `position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%)`                         |
| Tags          | `position: absolute; bottom: 2rem; right: 2rem; display: flex; gap: 2rem`                          |

---

## 20. CSS Architecture

Add all archive-specific classes to `globals.css` or an archive-specific CSS import. Core classes:

```css
/* Section visibility */
.section.is--works {
  display: block;
}
.section.is--mobile {
  display: none;
}

@media (max-width: 1000px) {
  .section.is--works {
    display: none;
  }
  .section.is--mobile {
    display: block;
  }

  h1 {
    font-size: 2rem;
  }

  .clients-preview {
    width: 100%;
    height: 100%;
  }
  .clients-list {
    width: 100%;
  }
}

/* Gallery container transitions */
.gallery__container {
  transition: transform 850ms cubic-bezier(0.596, 0.002, 0, 1.002);
  position: absolute;
  inset: 0;
}
.gallery__container:not(.active) .minimap {
  margin-top: -5vw;
}
.gallery__container:not(.active) .site-info {
  margin-top: -15vw;
}
.gallery__container:not(.active) .img-site__list {
  transform: translateY(-10vw);
}
.gallery__container.active .minimap,
.gallery__container.active .site-info {
  margin-top: 0vw;
}
.gallery__container.active .img-site__list {
  transform: translateY(0vw);
}

/* Mask line (SplitText container) */
.mask-line {
  position: relative;
  overflow: hidden;
  display: block;
}

/* Client hover preview */
.client-img-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  clip-path: polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%);
  will-change: clip-path;
  overflow: hidden;
}
.client-img-wrapper img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  will-change: transform, opacity;
}

/* Client name underline rule */
.client-name {
  position: relative;
  cursor: pointer;
}
.client-name::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0.15rem;
  background: #fff;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 300ms ease-out;
}
.client-name:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

/* Gallery item opacity */
.gallery__item {
  opacity: 0.5;
  transition: opacity 300ms ease;
  cursor: pointer;
}
.gallery__item.active {
  opacity: 1;
}

/* Image cover utility */
.img.is--cover {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
```

---

## 21. Manifesto Text (Desktop Header)

The desktop section has a manifesto text block (visible in `desktop-hero.png` near the top). Exact copy:

```
WHAT APPEARS HERE IS NOT A SHOWCASE, BUT THE TRACE OF A PRACTICE
```

Positioned as a large heading above the gallery names or spanning the full width at the top of the gallery panel (below the header rail). Uses `data-blink-text` or a scramble text animation on the word "PRACTICE" (source uses GSAP ScrambleTextPlugin for rotating alternate words).

ScrambleText on a span with alternating words:

```ts
const words = ["PRACTICE", "PROCESS", "RESEARCH", "SYSTEM"];
let i = 0;
gsap.registerPlugin(ScrambleTextPlugin);

setInterval(() => {
  i = (i + 1) % words.length;
  gsap.to(scrambleTarget, {
    duration: 0.8,
    scrambleText: {
      text: words[i],
      chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      speed: 0.5,
    },
  });
}, 2500);
```

---

## 22. Page Enter Animation

On initial load (after loader if shared from homepage, or on direct navigation):

1. Header links: `opacity: 0` → `opacity: 1`, `y: -10` → `y: 0`, duration 0.6s, ease `power3.out`, stagger 0.1s
2. Gallery names: `opacity: 0` → `opacity: [0.5 or 1]`, `x: -20` → `x: 0`, duration 0.7s, stagger 0.05s
3. Active image: clip-path reveal `inset(50% round 0.2em)` → `inset(0% round 0.2em)`, duration 1s, ease `power4.out`
4. Minimap: `opacity: 0` → `opacity: 1`, `x: 20` → `x: 0`, duration 0.6s
5. Works controls + tags: `opacity: 0` → `opacity: 1`, duration 0.5s, delay 0.4s

Use `gsap.timeline()` to sequence the enter animation.

---

## 23. Cleanup & Memory Management

In the `useEffect` cleanup:

```ts
return () => {
  ScrollTrigger.getAll().forEach((t) => t.kill());
  splits.forEach((s) => s.revert());
  animations.forEach((a) => a.kill());
  clearInterval(clockInterval);
  gsap.ticker.remove(tick); // if using ticker for lerp
  window.removeEventListener("wheel", onWheel);
};
```

---

## 24. Complete Build Checklist

Before calling this page done, verify each item against the reference screenshots:

- [ ] Desktop gallery mode visible by default; clients mode hidden
- [ ] Switching modes via controls animates gallery out (CSS transition 850ms cubic-bezier)
- [ ] Gallery names list shows 8 items, active=opacity 1, inactive=opacity 0.5
- [ ] Mousewheel drives inertial index with lerp, snaps to integer
- [ ] Active index change triggers clip-path reveal on new image
- [ ] Minimap indicator moves to correct position for active index
- [ ] Site info updates with `( 00N )` and project name
- [ ] Clients mode: 8 names appear with stagger animation on mode switch
- [ ] Clients mode: hover over name triggers clip-path polygon expand on preview image
- [ ] Clients mode: hover out triggers clip-path collapse
- [ ] Client name underline `::after` wipes in on hover, wipes out on leave
- [ ] Header: back link underline wipe (alt variant — two-phase)
- [ ] Header: live clock updates every second in Rome timezone
- [ ] Mobile: hidden above 1000px, shown below
- [ ] Mobile: all 8 cards render with image, number, name, description, button
- [ ] Mobile: "EXPLORE CASE" button has character stagger on hover
- [ ] Mobile: SplitText scroll reveal on all `data-split="heading"` paragraphs
- [ ] Mobile: `( THE ARCHIVE )` blink animation active
- [ ] Tags block visible at bottom of desktop section
- [ ] Manifesto scramble text cycling every 2.5s
- [ ] All Unsplash/Pexels images load without CORS errors (next.config.ts remotePatterns set)
- [ ] No TypeScript errors (strict mode)
- [ ] `"use client"` at top of all components using hooks or browser APIs
- [ ] Lenis smooth scroll works on mobile section
- [ ] Wheel events in gallery mode call `preventDefault()` to block native scroll

---

## 25. Notes on the Individual Project Route (`/works/[slug]`)

The links in both gallery mode and clients mode point to `/works/[slug]` (e.g. `/works/retronova`). This is a **separate page** not covered by this prompt. Create a stub `app/works/[slug]/page.tsx` that:

- Reads `params.slug`
- Looks up the project from `ARCHIVE_PROJECTS`
- Renders the project title and description (placeholder layout)
- Has a "back to archive" link

The full `/works/[slug]` implementation will be a future prompt.
