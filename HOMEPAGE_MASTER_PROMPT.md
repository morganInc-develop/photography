# MASTER HOMEPAGE RECREATION PROMPT

### Nicola Romei — nicolaromei.com

### Target Stack: Next.js App Router · Tailwind CSS v4 · GSAP 3.14.2 · Three.js · Framer Motion · shadcn/ui (primitives only)

---

## PRIMARY DATA SOURCES — ALWAYS REFER BACK TO THESE

Before building anything, load and cross-reference both of the following source archives. Every design decision in this prompt is derived from them. When in doubt, the source files are the ground truth — not this document.

**Source 1 — Playwright Capture (HTML, CSS, DOM, screenshots)**

```
/Users/damionmorgan/Documents/GottabeAway/photography/output/playwright/nicolaromei-homepage-2026-04-06/
```

Files inside:

- `source.html` — full rendered HTML with all inline styles and scripts
- `style-probe.json` — computed styles extracted from desktop viewport (1440×900)
- `style-probe-mobile.json` — computed styles extracted from mobile viewport
- `dom-desktop.json` — DOM tree, headings, CTAs, section structure
- `capture-metadata.json` — page dimensions, capture timestamp
- `desktop-hero.png` — preloader state on desktop (key for loader composition)
- `desktop-full.png` — full desktop page height during loader
- `mobile-full.png` — **best post-loader reference** showing the complete artboard layout
- `mobile-hero.png`, `mobile-mid.png` — mobile viewport states
- `desktop-mid.png`, `desktop-lower.png`, `desktop-footer.png` — supplementary crops
- `nicolaromei-homepage-recreation-brief.md` — extended evidence-backed brief

**Source 2 — Extracted Video Frames (screen recording, ~2.6s apart)**

```
/Users/damionmorgan/Desktop/extracted photos/
```

Files inside:

- `frame_01.jpg` through `frame_20.jpg` — 20 frames extracted from a ~50-second screen recording
- `ANALYSIS_PROMPT.md` — analysis instructions for the frame set
- Frames 01–07 and 19–20: artboard fully active, dark canvas, image planes visible, UI overlay in place
- Frames 08 and 17–18: pure preloader state, pale grey field with CRT scanlines
- Frames 09–16: archive page (secondary reference — not the homepage, but shows the broader design language)

---

## SECTION 1 — DESIGN PHILOSOPHY AND INTENT

This is not a portfolio website in the conventional sense. It is an authored digital object — an interface that behaves like a hybrid of exhibition catalogue, design operating system, and cinematic title sequence. The page must never feel like a template. Every element has intentional weight.

The experience is structured in four phases:

1. **Loader phase** — A fixed fullscreen preloader on pale grey establishes rhythm, mood, and authorial voice before the visitor enters. It counts from 0 to 100, stacks and reveals five images with clip-path, and types out a manifesto sentence character by character.

2. **Interface reveal phase** — Once the loader exits, the full artboard composition reveals itself: a Three.js WebGL canvas full of floating image planes fills the viewport below a persistent utility information rail.

3. **Interaction phase** — The visitor scrolls or drags the artboard. The planes respond inertially with velocity-based distortion. A custom cursor reads "SCROLL OR CLICK."

4. **Exit phase** — Two full-width split-character CTA buttons — THE ARCHIVE and THE PROFILE — provide the only navigational exits. The bottom wordmark "the artboard™" anchors the page footer.

The page body keeps `overflow: hidden` at all times. The entire experience is self-contained within a single viewport-height composition. Do not treat this as a scrolling page. Treat it as an interface screen.

---

## SECTION 2 — COLOR PALETTE

All color values are sourced directly from `style-probe.json` and inline CSS in `source.html`.

| Token             | Hex                         | Usage                                              |
| ----------------- | --------------------------- | -------------------------------------------------- |
| `--soft-grey`     | `#f3f3f3`                   | Page background, preloader background, button fill |
| `--panel-grey`    | `#e7e7e7`                   | Three.js renderer clear color, secondary surfaces  |
| `--matte-black`   | `#202020`                   | Primary text, artboard dark areas                  |
| `--ink`           | `#131313`                   | Deep background, darkest UI areas                  |
| `--body-text`     | `rgb(51, 51, 51)`           | Default computed body text color                   |
| `--nav-text`      | `rgb(243, 243, 243)`        | Link text color (appears on dark artboard)         |
| `--border-soft`   | `#ffffff24`                 | Translucent button borders                         |
| `--selection`     | `#ff564a`                   | Text selection highlight (coral/red)               |
| `--scanline-dark` | `rgba(0, 0, 0, 0.25)`       | CRT scanline stripe                                |
| `--vignette`      | `rgba(0, 0, 0, 0.4)`        | CRT edge vignette                                  |
| `--flicker-light` | `rgba(255, 255, 255, 0.02)` | CRT scan flash                                     |

**Important:** The page lives almost entirely in a pale grey / near-black duotone. The only color that appears outside this palette is the `#ff564a` text selection highlight and occasional image content bleeding through. All imagery must be rendered as grayscale or near-monochrome. Do not introduce any accent colors.

Apply to your Tailwind v4 `@theme` block:

```css
@theme {
  --color-soft-grey: #f3f3f3;
  --color-matte-black: #202020;
  --color-panel-grey: #e7e7e7;
  --color-ink: #131313;
  --color-border-soft: #ffffff24;
  --color-selection: #ff564a;
  --radius-none: 0px;
  --ease-signature: cubic-bezier(0.625, 0.05, 0, 1);
}

::selection {
  background-color: #ff564a;
  color: white;
}
```

---

## SECTION 3 — TYPOGRAPHY

Sourced from `style-probe.json` (loaded font status), `source.html` inline styles, and computed styles.

### Primary Display Face — Easegeometricb

- **Weight:** 700
- **Style:** Normal
- **Status:** Confirmed loaded at page render time
- **Usage:** Main wordmark `the artboard™`, landscape warning H1, all oversized display text
- **Fallback stack:** `Easegeometricb, Impact, sans-serif`
- **Desktop H1 computed:** `font-size: 56px`, `line-height: 56px`, `letter-spacing: -3.36px` (`-0.06em` equivalent)
- **Mobile H1 computed:** `font-size: 35px`, `line-height: 35px`, `letter-spacing: -2.1px`
- **Text transform:** uppercase
- **Filter:** `blur(1.5px)` applied to `.h-h1` — this blur is intentional and part of the display treatment. Do not remove it.
- **clamp version for responsive:** `font-size: clamp(2rem, 5vw, 4rem)`

### Utility / Body Face — Host Grotesk

- **Weights loaded:** 300, 400, 500, 600, 700
- **Style:** Normal
- **Status:** All weights confirmed loaded
- **Usage:** All microcopy, labels, manifesto, button text, counter, intro statement
- **Fallback stack:** `"Host Grotesk", sans-serif`
- **Paragraph / meta utility text:**
  - `font-size: clamp(0.625rem, 0.5rem + 0.5vw, 0.75rem)`
  - `font-weight: 500`
  - `line-height: 1`
  - `text-transform: uppercase`
- **Nav link computed desktop:** `font-size: 12px`, `line-height: 12px`, `font-weight: 500`, uppercase
- **Nav link computed mobile:** `font-size: 10px`, `line-height: 10px`

### Additional Loaded Families (supporting roles, not homepage-primary)

- `prestige-elite-std` — weights 400/700, normal/italic
- `itc-avant-garde-gothic-pro` — weights 300/700, normal/italic
- `neue-haas-grotesk-display` — weights 400/700, normal/italic
- `neue-haas-grotesk-text` — weights 400/700, normal/italic
- `trade-gothic-next` / `trade-gothic-next-compressed` / `trade-gothic-next-condensed`
- `typeka`, `john-doe`, `secret-service-typewriter`

These are all loaded globally but are not the primary homepage faces. Do not use them on the homepage unless a specific element demands it.

### Typography Rules

- Zero border radius on all text containers.
- No decorative quotation marks, no drop caps, no ornamental typography.
- All labels and utility text are uppercase. No exceptions on the homepage.
- The manifesto paragraph is mixed-case prose — the only body text that is not forced uppercase.
- Letter spacing on display text is always negative and tight (`-0.06em`).
- The `.paragraph` class is the universal utility text class — small, uppercase, tight line-height.

---

## SECTION 4 — LAYOUT AND STRUCTURE

Sourced from `dom-desktop.json`, `source.html`, `mobile-full.png`, and frames 01–07.

### DOM Hierarchy (exact)

```
<body class="body is--home">
  <main data-barba="wrapper" class="page-wrapper">
    <div data-barba-namespace="home" data-barba="container" class="app">
      <div class="page-transition" />           ← route transition overlay
      <div class="crt-overlay" />               ← persistent CRT surface
      <div class="preloader" />                 ← fixed fullscreen loader
      <div class="progressive-blur_wrap is--bottom" />  ← bottom blur mask
      <div class="progressive-blur_wrap is--top" />     ← top blur mask
      <div class="section__landscape" />        ← landscape rotation warning
      <section class="section is--hero">
        <nav class="section__text">             ← microcopy rail
          <div class="overlay" />
          <div class="text__col is--no-grow" /> ← location + time
          <div class="text__col is--no-grow" /> ← expertise
          <div class="text__col is--no-grow" /> ← social links
          <div class="text__col is--no-grow" /> ← manifesto
          <div class="text__col is--cta" />     ← CTA buttons
        </nav>
        <div class="canvas__webgl-list-wrap">
          <div class="grid js-grid">            ← 25 js-plane figures
            <figure class="js-plane" data-src="..." />
            ...
          </div>
        </div>
        <div class="hero__tab-wrap" />          ← demo explanation panel
        <div class="st__bottom">
          <div class="text__row">
            <h1 data-blink-text class="h-h1">the artboard™</h1>
          </div>
        </div>
      </section>
      <div class="cursor">
        <div class="paragraph">SCROLL OR CLICK</div>
      </div>
    </div>
  </main>
  <canvas id="home-canvas-webgl" />            ← fixed Three.js canvas, z-index: -1
</body>
```

### Section: `body.is--home`

- `overflow: hidden`
- `overscroll-behavior: none`
- `background: #f3f3f3`
- `color: rgb(51, 51, 51)`

### Section: `.section.is--hero`

- `width: 100%`, `height: 100%`
- `position: relative`, `overflow: hidden`
- Contains everything visible after the loader exits

### Section: `nav.section__text` (Microcopy Rail)

This nav sits absolutely positioned over the artboard canvas, typically along the top edge of the viewport. It contains five columns arranged horizontally:

**Column 1 — Location + Live Time**

- Text: `Based in Italy,\nworking globally.`
- Below that: a live clock `[data-current-time="Europe/Rome"]`
- Clock format: `HH:MM:SS GMT+2` (24-hour, live, updates every 1 second via `setInterval`)
- Implementation: `data-current-time-hours`, `data-current-time-minutes`, `data-current-time-seconds`, `data-current-time-timezone` child spans populated by `initDynamicCurrentTime()`

**Column 2 — Expertise**

- Label: `(my.expertise)` — styled with `.is--tag`
- Items: `Art Direction` / `Web Design + Dev` / `Webflow Development`
- Items have `data-square` attribute — likely a hover square/dot treatment

**Column 3 — Social Links**

- Label: `(social.contacts)`
- Links: `Awwards` → `https://www.awwwards.com/nicolaromei/`, `Linkedin` → `https://www.linkedin.com/in/nicolaromei/`, `contacts` → `mailto:info@nicolaromei.com?subject=New%20project%20together`
- All use `data-underline-link="alt"` — see underline animation spec in Section 8

**Column 4 — Manifesto**

- Inside `.hero__desc`
- Text: `Digital Experience Designer and Awwwards Judge. I create immersive websites defined by strong visual direction, refined motion, and a distinct design signature.`
- Uses GSAP SplitText line masking on `[data-split="heading"]` — lines slide up from `yPercent: 100` on scroll trigger

**Column 5 — CTAs**

- Two full-width buttons inside `.tc__utils.is--home`
- Button 1: `THE ARCHIVE` → `/the-archive`
- Button 2: `THE PROFILE` → `/the-profile`
- Both use `.btn-animate-chars.is--full` — see button spec in Section 7

### Desktop vs Mobile Layout

**Desktop (1440×900 reference):**

- The microcopy nav columns are arranged in a horizontal strip across the top of the viewport, pinned above the canvas artboard
- The artboard canvas fills the remaining 75–80% of viewport height
- The bottom wordmark sits at the very bottom edge of the viewport
- The CTA buttons appear in the top-right area of the text rail

**Mobile (375px reference — `mobile-full.png` is the ground truth):**

- The microcopy columns stack vertically above the artboard tile field
- The artboard appears as a dense tiled collage with visible image boundaries
- The manifesto and CTAs appear as a strong central text block with two side-by-side CTA bars below
- The bottom wordmark compresses but remains legible
- Reference `mobile-full.png` for exact proportions

---

## SECTION 5 — THE CRT OVERLAY

This layer is always present. It is a fixed fullscreen div with `class="crt-overlay"` that sits above the entire page content via z-index stacking. It is purely visual — `pointer-events: none` on all pseudo-elements.

Implement it exactly as extracted from `source.html`:

```css
.crt-overlay {
  position: fixed;
  inset: 0;
  z-index: 100;
  pointer-events: none;
  animation: crt-scan 8s linear infinite;
}

/* Horizontal scanlines — 4px repeating stripes */
.crt-overlay::before {
  content: " ";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: linear-gradient(
    to bottom,
    rgba(18, 16, 16, 0) 50%,
    rgba(0, 0, 0, 0.25) 50%
  );
  background-size: 100% 4px;
  z-index: 2;
  pointer-events: none;
}

/* Radial vignette + flicker */
.crt-overlay::after {
  content: " ";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: radial-gradient(
    circle,
    rgba(0, 0, 0, 0) 50%,
    rgba(0, 0, 0, 0.4) 100%
  );
  z-index: 2;
  pointer-events: none;
  animation: flicker 0.15s infinite;
}

@keyframes flicker {
  0% {
    opacity: 0.95;
  }
  50% {
    opacity: 0.92;
  }
  100% {
    opacity: 0.96;
  }
}

@keyframes crt-scan {
  0% {
    background-color: rgba(255, 255, 255, 0);
  }
  50% {
    background-color: rgba(255, 255, 255, 0.02);
  }
  100% {
    background-color: rgba(255, 255, 255, 0);
  }
}
```

The CRT effect must be visible during the preloader, during the artboard state, and during all page transitions. It never turns off.

Refer to `desktop-hero.png` to see exactly how the scanline grid sits over the pale grey loader background — it is subtle but unmistakable. Refer to `frame_08.jpg` and `frame_17.jpg` from the extracted frames folder for additional preloader CRT confirmation.

---

## SECTION 6 — THE PRELOADER

This is the most important element on the page. Do not simplify it. Do not replace it with a spinner, fade, or generic loading state. The preloader IS the first impression.

### Visual composition (from `desktop-hero.png` and `source.html`):

The preloader is fixed, fullscreen, at `z-index: 999`. Background is `#f3f3f3`. The composition is deliberately centered and small — exaggerated negative space is intentional.

**Image stack (`.preloader__img-wrap`):**

- Five `.pi__img` divs stacked absolutely, each containing one `<img>`
- Each image starts with `clip-path: inset(0px 0px 100%)` — fully hidden (clipped from bottom)
- They reveal sequentially bottom-to-top: `clip-path` animates to `inset(0px 0px 0%)` using GSAP
- Higher `z-index` images sit on top of lower ones — creating a layered stack reveal
- The image column is narrow — approximately 10–12% of viewport width, centered horizontally
- The exact five preloader images (from `source.html`, Webflow CDN):
  1. `https://cdn.prod.website-files.com/6928a718958d854622ebb4f7/69452788e703150440dd4180_nr__made.avif`
  2. `https://cdn.prod.website-files.com/6928a718958d854622ebb4f7/69450a8530b7cb5397f735b1_imgi_2_...made.avif`
  3. `https://cdn.prod.website-files.com/6928a718958d854622ebb4f7/6945261f9b350c9f511e4300_nr__works.avif`
  4. `https://cdn.prod.website-files.com/6928a718958d854622ebb4f7/69450a858ed0e64cbb06769b_...creative__cover.avif`
  5. `https://cdn.prod.website-files.com/6928a718958d854622ebb4f7/69450a859b114fff691426d7_...NR__STUDIO.avif`
     Use these exact URLs or replace with your own equivalent grayscale photography assets at the same aspect ratio and column width.

**Numeric counter (`.preloader__counter-wrap`):**

- A `.paragraph.counter-element` div showing the current number (`7` captured mid-load)
- Animates from `0` to `100` using GSAP ticker or `gsap.to({val: 0}, {val: 100, ...})`
- Below the number: `.preloader__line` containing `.line__animate`
- The line starts at `transform: scale(0.07, 1)` (transform-origin: 0% 50%) and scales to `scale(1, 1)` — a horizontal progress bar that grows from left to right in sync with the counter

**Intro text (`.preloader__intro-wrap`):**

- The full sentence: `WHAT APPEARS HERE IS NOT A SHOWCASE, BUT THE TRACE OF A PRACTICE`
- Rendered inside `.iw__text` as a `.paragraph` with each character split into `.st-char` spans
- Each `.st-char` starts at `opacity: 0` and staggers to `opacity: 1` from left to right during the count sequence
- Positioned at the bottom-left of the preloader area — confirmed by `desktop-hero.png`

**GSAP Sequence (reconstruct from `loader.js` behavior):**

```
Timeline:
  t=0:    Counter starts counting 0→100 over ~2.5s
  t=0:    Progress line scales X 0→1 over ~2.5s
  t=0.5:  Image 1 clip-path reveals (0.6s ease)
  t=0.8:  Image 2 clip-path reveals (0.6s ease)
  t=1.1:  Image 3 clip-path reveals (0.6s ease)
  t=1.4:  Image 4 clip-path reveals (0.6s ease)
  t=1.7:  Image 5 clip-path reveals (0.6s ease)
  t=0.3:  Intro text characters stagger in, opacity 0→1, 0.01s between each
  t=2.5:  Counter reaches 100
  t=2.6:  All preloader UI fades out (opacity 0, ~0.4s)
  t=3.0:  .preloader display:none or opacity:0 pointer-events:none
  t=3.0:  Hero section / artboard begins to reveal
```

The ease on all loader animations is `cubic-bezier(0.625, 0.05, 0, 1)` — the signature easing used throughout the entire site.

---

## SECTION 7 — THE INTERACTIVE ARTBOARD (Three.js Canvas)

This is the core of the homepage. It is not a CSS grid. It is not a masonry layout. It is not a carousel. It is a custom Three.js WebGL canvas with draggable/scrollable image planes rendered as shader-mapped geometry.

### Canvas element

- `id="home-canvas-webgl"`
- Fixed position: `top: 0; left: 0; width: 100%; height: 100%`
- `pointer-events: none` (pointer events are intercepted by the grid overlay, then passed to canvas logic)
- `z-index: -1` — sits behind the HTML overlay (microcopy, buttons, wordmark)

### Source plane data (25 images from `source.html`):

Every `.js-plane` figure has a `data-src` attribute pointing to an avif image on the Webflow CDN. The full list in DOM order:

```
retronova-min.avif
color explandation.avif
Instagram post - 12.avif
ROBOT.avif
nicola_romei_alpine_valley_landscape_rough.avif
matte__black.avif
metro__guy.avif
mountain p3.avif
fashion-retro.avif
run.avif
retro__col.avif
helix-min.avif
oakley.avif
VALSA.avif
nrbrut.avif
img3 (1).avif
retromob.avif
img2-min (2).avif
nr.avif
visionary.avif
CREATIVE.avif
photo5.avif
ROBOT RUNNING.avif
DAVIDE.avif
Untitled-1-min.avif
```

Each plane element: `<figure class="js-plane" data-src="[CDN URL]" style="margin: 0.2vw;" />`

### WebGL behavior (from `bundle.js` / `home.js` analysis and frames 01–07, 19–20):

- **Renderer:** Three.js WebGLRenderer, `clearColor: 0xE7E7E7`
- **Planes:** Each image is mapped to a PlaneGeometry with ShaderMaterial
- **Shader uniforms:** `uTexture`, `uSize` (plane dimensions), `uVelocity` (scroll/drag speed for distortion), `uViewportSize`
- **Layout:** Planes arranged in a grid-like pattern across a virtual infinite canvas — NOT strictly aligned. There is organic spacing.
- **Interaction:** Virtual scroll library (`virtual-scroll`) captures wheel and touch events. GSAP smooths the velocity. The planes move as a unified field.
- **Inertial movement:** When the user stops scrolling/dragging, the field decelerates with inertia. Use GSAP `InertiaPlugin` or manual lerp dampening.
- **Velocity distortion:** At higher scroll/drag velocities, a warp/skew shader distortion is applied to each plane (visible in frames 01–07 as horizontal smear/blur on fast-moving planes). Implement as a `uVelocity` uniform controlling a vertex offset or UV warp.
- **Draggable axis:** Both X and Y axes — it is a 2D draggable infinite canvas, not just vertical scroll.
- **Plane links:** Each plane wraps an `<a class="js-plane-link" href="/archive">` — clicking navigates to the archive with a page transition.
- **Canvas interaction:** The canvas itself accepts `pointer-events: auto` for the drag behavior; the WebGL `<canvas>` has `pointer-events: none` but the `.grid.js-grid` overlay with `touch-action: none` handles events.

Visual reference: `mobile-full.png` shows the artboard in its settled state — a dense grid of grayscale images with slight gaps. Frames 01–07 show it in motion with velocity distortion and large text overlaid on some planes.

---

## SECTION 8 — ANIMATIONS AND INTERACTIONS

All primary animation is owned by GSAP. Framer Motion is acceptable only for small React component mount/unmount transitions on non-canvas UI elements.

### Signature Easing

Every transition in this project uses one easing curve:

```
cubic-bezier(0.625, 0.05, 0, 1)
```

Register it as a GSAP CustomEase:

```js
CustomEase.create("signature", "0.625, 0.05, 0, 1");
```

Use it everywhere: link hovers, button hovers, page transitions, split text, loader elements.

### Underline Link Animation (exact from `source.html`)

All links with `data-underline-link="alt"` use a two-pseudo-element animated underline that creates a "wipe out / wipe in" effect on hover:

```css
[data-underline-link] {
  text-decoration: none;
  position: relative;
}

/* Default state: line is fully visible (scaleX 1), origin left */
[data-underline-link="alt"]::before {
  content: "";
  position: absolute;
  bottom: -0.0625em;
  left: 0;
  width: 100%;
  height: 0.0625em;
  background-color: currentColor;
  transition: transform 0.735s cubic-bezier(0.625, 0.05, 0, 1);
  transform-origin: left;
  transform: scaleX(1) rotate(0.001deg);
  transition-delay: 0.3s;
}

/* Default state: second line is invisible (scaleX 0), origin right */
[data-underline-link="alt"]::after {
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
  transition-delay: 0s;
}

/* Hover: ::before wipes out from right, ::after wipes in from left */
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

The `rotate(0.001deg)` on all transforms is a deliberate subpixel antialiasing fix — keep it.

### Split Character Button Animation (`.btn-animate-chars`)

Both CTA buttons and the CLOSE button use character-level stagger animations.

**HTML structure:**

```html
<a href="/the-archive" class="btn-animate-chars is--full">
  <div class="btn-animate-chars__bg"></div>
  <span data-button-animate-chars="" class="btn-animate-chars__text paragraph">
    <span style="transition-delay: 0s;">T</span>
    <span style="transition-delay: 0.01s;">H</span>
    <span style="transition-delay: 0.02s;">E</span>
    <span style="transition-delay: 0.03s; white-space: pre;"> </span>
    <span style="transition-delay: 0.04s;">A</span>
    ...
  </span>
</a>
```

**CSS:**

```css
.btn-animate-chars {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ffffff24;
  background: transparent;
  color: #202020;
  padding: 0.25em 1em;
  text-decoration: none;
  overflow: hidden;
  border-radius: 0;
  width: 100%; /* .is--full */
}

.btn-animate-chars__bg {
  position: absolute;
  inset: 0;
  backdrop-filter: blur(2px);
  background: #f3f3f3;
  z-index: 0;
}

.btn-animate-chars__text {
  position: relative;
  z-index: 1;
  display: flex;
}

/* On hover: each character shifts up or shifts position */
/* The character stagger uses transition-delay on each span */
/* The transition property on each span handles the actual shift */
```

**JS — `initButtonCharacterStagger()` (from `source.html`):**

```js
function initButtonCharacterStagger() {
  const buttons = document.querySelectorAll("[data-button-animate-chars]");
  buttons.forEach((btn) => {
    const text = btn.textContent;
    btn.innerHTML = "";
    [...text].forEach((char, i) => {
      const span = document.createElement("span");
      span.textContent = char;
      span.style.transitionDelay = `${0.01 * i}s`;
      if (char === " ") span.style.whiteSpace = "pre";
      btn.appendChild(span);
    });
  });
}
document.addEventListener("DOMContentLoaded", initButtonCharacterStagger);
```

The `.btn-bubble-arrow` button style (used on the demo panel close area) uses a different interaction: content translates from `-1.1em` to `0em` on hover, and an arrow SVG scales from 0 to 1. Transition: `0.735s cubic-bezier(0.625, 0.05, 0, 1)`.

### SplitText Heading Reveal (from `source.html` inline script)

The manifesto paragraph uses GSAP SplitText to split by lines, then mask-reveal each line from `yPercent: 100`:

```js
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(SplitText, ScrollTrigger);
  const headings = document.querySelectorAll('[data-split="heading"]');
  headings.forEach((el) => {
    gsap.set(el, { autoAlpha: 1 });
    const split = new SplitText(el, { type: "lines", linesClass: "mask-line" });
    split.lines.forEach((line) => {
      const inner = document.createElement("div");
      inner.style.display = "block";
      while (line.firstChild) inner.appendChild(line.firstChild);
      line.appendChild(inner);
    });
    const lines = el.querySelectorAll(".mask-line > div");
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
});
```

```css
.mask-line {
  position: relative;
  display: block;
  overflow: hidden; /* critical — clips the sliding div */
}
```

### Blink/Flicker Text (`.h-h1[data-blink-text]` = "the artboard™")

The bottom wordmark uses a blink/flicker treatment. Implement as a GSAP timeline on the element:

```js
function initBlinkText() {
  document.querySelectorAll("[data-blink-text]").forEach((el) => {
    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: gsap.utils.random(2, 5),
    });
    tl.to(el, { opacity: 0.7, duration: 0.05, ease: "none" })
      .to(el, { opacity: 1, duration: 0.05, ease: "none" })
      .to(el, { opacity: 0.8, duration: 0.03, ease: "none" })
      .to(el, { opacity: 1, duration: 0.05, ease: "none" });
  });
}
```

The wordmark also has `filter: blur(1.5px)` as a persistent style (from `.h-h1` class). Keep it blurred.

### Custom Cursor (`.cursor`)

```html
<div class="cursor">
  <div class="paragraph">SCROLL OR CLICK</div>
</div>
```

```css
.cursor {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  pointer-events: none;
  transform: translate3d(-66.5px, -12px, 0);
}
```

```js
// Exact cursor logic from source.html
const cursor = document.querySelector(".cursor");
let mouseX = 0,
  mouseY = 0;
let cursorX = 0,
  cursorY = 0;
const speed = 0.05;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

// Hide on scroll
let scrollTimeout;
const handleScroll = () => {
  cursor.classList.add("cursor--hidden");
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(
    () => cursor.classList.remove("cursor--hidden"),
    150,
  );
};
window.addEventListener("wheel", handleScroll, { passive: true });
window.addEventListener("touchmove", handleScroll, { passive: true });

// Hide over standard links (not js-plane-links)
document.querySelectorAll("a").forEach((link) => {
  if (!link.classList.contains("js-plane-link")) {
    link.addEventListener("mouseenter", () =>
      cursor.classList.add("cursor--hidden"),
    );
    link.addEventListener("mouseleave", () =>
      cursor.classList.remove("cursor--hidden"),
    );
  }
});

// Smooth follow loop
function animateCursor() {
  cursorX += (mouseX - cursorX) * speed;
  cursorY += (mouseY - cursorY) * speed;
  const x = cursorX - cursor.offsetWidth / 2;
  const y = cursorY - cursor.offsetHeight / 2;
  cursor.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  requestAnimationFrame(animateCursor);
}
animateCursor();
```

```css
.cursor--hidden {
  opacity: 0;
  pointer-events: none;
}
```

### Live Time Widget

```js
function initDynamicCurrentTime() {
  const formatter = (tz) =>
    new Intl.DateTimeFormat([], {
      timeZone: tz,
      timeZoneName: "short",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });

  const parse = (str) => {
    const m = str.match(/(\d+):(\d+):(\d+)\s*([\w+]+)/);
    return m
      ? { hours: m[1], minutes: m[2], seconds: m[3], timezone: m[4] }
      : null;
  };

  const update = () => {
    document.querySelectorAll("[data-current-time]").forEach((el) => {
      const tz = el.getAttribute("data-current-time") || "Europe/Amsterdam";
      const parsed = parse(formatter(tz).format(new Date()));
      if (!parsed) return;
      const h = el.querySelector("[data-current-time-hours]");
      const m = el.querySelector("[data-current-time-minutes]");
      const s = el.querySelector("[data-current-time-seconds]");
      const t = el.querySelector("[data-current-time-timezone]");
      if (h) h.textContent = parsed.hours;
      if (m) m.textContent = parsed.minutes;
      if (s) s.textContent = parsed.seconds;
      if (t) t.textContent = parsed.timezone;
    });
  };

  update();
  setInterval(update, 1000);
}
document.addEventListener("DOMContentLoaded", initDynamicCurrentTime);
```

Usage in template:

```html
<p data-current-time="Europe/Rome" class="paragraph">
  <span data-current-time-hours="">00</span>:<span data-current-time-minutes=""
    >00</span
  >:<span data-current-time-seconds="">00</span>
  <span data-current-time-timezone="">GMT+2</span>
</p>
```

---

## SECTION 9 — PROGRESSIVE BLUR PANELS

At the top and bottom edges of the artboard canvas, there are multi-layer progressive blur masks that fade the image planes into the background color. This prevents the canvas from having harsh edges.

```html
<div
  style="--blur: 3rem; --ratio: 1.9;"
  class="progressive-blur_wrap is--bottom"
>
  <div style="--i: 6;" class="progressive-blur_panel is-1"></div>
  <div style="--i: 5;" class="progressive-blur_panel is-2"></div>
  <div style="--i: 4;" class="progressive-blur_panel is-3"></div>
  <div style="--i: 3;" class="progressive-blur_panel is-4"></div>
  <div style="--i: 2;" class="progressive-blur_panel is-5"></div>
  <div style="--i: 1;" class="progressive-blur_panel is-6"></div>
  <!-- panels is-7 through is-10 also with --i: 1 -->
</div>
```

```css
.progressive-blur_wrap {
  position: absolute;
  left: 0;
  right: 0;
  z-index: 10;
  pointer-events: none;
}
.progressive-blur_wrap.is--bottom {
  bottom: 0;
}
.progressive-blur_wrap.is--top {
  top: 0;
}

.progressive-blur_panel {
  position: absolute;
  left: 0;
  right: 0;
  height: calc(var(--blur) * var(--ratio));
  backdrop-filter: blur(calc(var(--blur) / var(--i)));
  -webkit-backdrop-filter: blur(calc(var(--blur) / var(--i)));
}
```

Each panel has a progressively weaker blur moving away from the edge, creating a soft gradient blur rather than a hard cutoff.

---

## SECTION 10 — DEMO/EXPLANATION TAB (`hero__tab-wrap`)

This panel starts hidden (`opacity: 0`, inert) and is revealed by GSAP after the loader exits. It appears as a floating panel — likely bottom-right or bottom-center of the viewport.

**Content:**

- An HLS background video player (Bunny CDN stream)
- Video `src`: `https://vz-015fe5e8-a53.b-cdn.net/559d3626-9339-4d4d-be69-06e5d4e0f4ea/playlist.m3u8`
- Fallback placeholder image: shows an iPhone screen render
- A `.tab__desc` block with text:

  ```
  SCROLL / DRAG TO INTERACT W/ THE ARTBOARD or click on the grid to explore the archive.

  THE ARTBOARD SERVES AS A STRUCTURED ENVIRONMENT WHERE CREATIONS, SYSTEMS, AND DESIGN RESEARCH ACCUMULATED OVER TIME ARE ORGANIZED, PRESERVED, AND CONTINUOUSLY REVISITED.
  ```

- A CLOSE split-char button (`href="#"`) that hides the panel via GSAP

**HLS video behavior (from `home.js`):**

- Uses `hls.js` for adaptive streaming
- `autoplay: true`, `muted: true`, `playsinline: true`, `loop: true`
- IntersectionObserver pauses playback when the panel leaves the viewport
- A loading SVG spinner shows while the video buffers

**Visual treatment:**

- The panel has a `.demo-section__fade-left` element — a gradient fade on the left edge of the video
- Placeholder fades out once video starts playing (`opacity: 0, visibility: hidden`)

---

## SECTION 11 — PAGE TRANSITIONS

Barba.js handles route transitions. The key structural attributes:

```html
<main data-barba="wrapper">
  <div data-barba-namespace="home" data-barba="container">...</div>
</main>
```

The `.page-transition` div is a fullscreen overlay that activates during navigation:

```css
.page-transition {
  position: fixed;
  inset: 0;
  z-index: 9998;
  pointer-events: none;
  opacity: 0;
  background: #f3f3f3;
}

.page-transition.is-active {
  pointer-events: all;
}
```

GSAP animates `.page-transition` opacity to 1 when leaving, then to 0 after the new page mounts. The CRT overlay stays on top throughout — it never transitions out.

In Next.js App Router: implement this as a client component at the layout level. Use Framer Motion's `AnimatePresence` for the overlay if Barba is not used — but keep the overlay fullscreen, pale grey, and synced to the CRT layer.

---

## SECTION 12 — LANDSCAPE WARNING

Shown only when viewport is landscape on mobile:

```html
<div class="section__landscape">
  <h1 class="h-h1 is--landscape">ROTATE YOUR DEVICE FOR A BETTER EXPERIENCE</h1>
</div>
```

```css
.section__landscape {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 9997;
  background: #f3f3f3;
  align-items: center;
  justify-content: center;
}

@media (orientation: landscape) and (max-width: 768px) {
  .section__landscape {
    display: flex;
  }
}
```

The H1 uses `Easegeometricb`, uppercase, blurred — same as the main wordmark. On mobile computed: `font-size: 35px`, `letter-spacing: -2.1px`.

---

## SECTION 13 — COMPONENT BREAKDOWN FOR NEXT.JS

Build the homepage as a composition of these named client components:

| Component               | File                                          | Responsibility                                                              |
| ----------------------- | --------------------------------------------- | --------------------------------------------------------------------------- |
| `HomeLoader`            | `components/home/HomeLoader.tsx`              | Fullscreen preloader: image stack, counter, progress line, split-text intro |
| `CrtOverlay`            | `components/home/CrtOverlay.tsx`              | Fixed CRT scanline/vignette/flicker layer — always mounted                  |
| `ArtboardCanvas`        | `components/home/ArtboardCanvas.tsx`          | Three.js WebGL canvas, plane management, virtual-scroll, GSAP velocity      |
| `HomeMetaRail`          | `components/home/HomeMetaRail.tsx`            | The 5-column microcopy nav: location, time, expertise, social, manifesto    |
| `LiveClock`             | `components/home/LiveClock.tsx`               | `data-current-time` widget, setInterval every 1000ms                        |
| `SplitCharButton`       | `components/ui/SplitCharButton.tsx`           | Reusable character-stagger button — used for CTAs and CLOSE                 |
| `ArtboardDemoPanel`     | `components/home/ArtboardDemoPanel.tsx`       | The HLS video tab, description text, CLOSE button                           |
| `BlinkWordmark`         | `components/home/BlinkWordmark.tsx`           | "the artboard™" H1 with blink GSAP animation                                |
| `ProgressiveBlur`       | `components/home/ProgressiveBlur.tsx`         | Top and bottom multi-panel blur masks                                       |
| `HomeCursor`            | `components/home/HomeCursor.tsx`              | "SCROLL OR CLICK" smooth cursor with lerp loop                              |
| `LandscapeWarning`      | `components/home/LandscapeWarning.tsx`        | Fixed overlay shown on landscape mobile                                     |
| `PageTransitionOverlay` | `components/layout/PageTransitionOverlay.tsx` | Route transition fade layer — shared across routes                          |

**Page route:** `app/page.tsx` — all `"use client"` components, no SSR for animation-heavy elements.

**Critical:** `ArtboardCanvas` must have explicit cleanup on unmount — call `renderer.dispose()`, cancel all RAF loops, and destroy the Lenis/virtual-scroll instances.

---

## SECTION 14 — LENIS SMOOTH SCROLL

Lenis 1.3.15 is loaded globally. Initialize it in the root layout or a client wrapper:

```js
import Lenis from "@studio-freight/lenis";

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: "vertical",
  gestureOrientation: "vertical",
  smoothWheel: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
```

**Important:** Lenis must not fight with the Three.js virtual-scroll canvas interaction. The artboard plane movement is handled entirely by `virtual-scroll`, not Lenis. Lenis should only govern any HTML scroll content outside the canvas. On the homepage, with `overflow: hidden` on the body, Lenis is largely idle — it becomes more active on archive and profile pages.

---

## SECTION 15 — TAILWIND v4 GLOBAL CSS STARTER

```css
@import "tailwindcss";

@theme {
  --color-soft-grey: #f3f3f3;
  --color-panel-grey: #e7e7e7;
  --color-matte-black: #202020;
  --color-ink: #131313;
  --color-body: rgb(51, 51, 51);
  --color-nav: rgb(243, 243, 243);
  --color-border-soft: rgba(255, 255, 255, 0.141);
  --color-selection: #ff564a;

  --font-display: "Easegeometricb", Impact, sans-serif;
  --font-body: "Host Grotesk", sans-serif;

  --radius-none: 0px;

  --ease-signature: cubic-bezier(0.625, 0.05, 0, 1);

  --space-xxs: clamp(0.5rem, 0.26rem + 1vw, 1.5rem);
  --space-xs: clamp(1rem, 0.5rem + 2.1vw, 3rem);
  --space-sm: clamp(2rem, 1.25rem + 3.1vw, 5rem);
  --space-md: clamp(4rem, 2.5rem + 6.2vw, 10rem);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

::selection {
  background-color: #ff564a;
  color: white;
}

html,
body {
  background: #f3f3f3;
  color: rgb(51, 51, 51);
  margin: 0;
  padding: 0;
}

body.is--home {
  overflow: hidden;
  overscroll-behavior: none;
}

.h-h1 {
  font-family: "Easegeometricb", Impact, sans-serif;
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.06em;
  text-transform: uppercase;
  filter: blur(1.5px);
}

.paragraph {
  font-family: "Host Grotesk", sans-serif;
  font-size: clamp(0.625rem, 0.5rem + 0.5vw, 0.75rem);
  font-weight: 500;
  line-height: 1;
  text-transform: uppercase;
}

.mask-line {
  position: relative;
  display: block;
  overflow: hidden;
}
```

---

## SECTION 16 — SHADCN/UI GUIDANCE

The homepage is strongly bespoke. Do not use stock shadcn components visually.

**Acceptable:** `Dialog`, `Sheet`, `FocusTrap`, or `Slot` primitives if the demo panel or any overlay needs accessible focus management.

**Forbidden on this page:** `Button`, `Card`, `Carousel`, `Tabs`, `Badge`, `Input`, `Separator`. These components carry default visual styling that conflicts with the design language. If any primitive is needed, install it and strip all visual styles, keeping only the behavioral logic.

---

## SECTION 17 — SCRIPTS AND LIBRARY VERSIONS (exact from `source.html`)

| Library            | Version | CDN                                                   |
| ------------------ | ------- | ----------------------------------------------------- |
| GSAP core          | 3.14.2  | `cdn.prod.website-files.com/gsap/3.14.2/gsap.min.js`  |
| ScrollTrigger      | 3.14.2  | same CDN                                              |
| CustomEase         | 3.14.2  | same CDN                                              |
| Observer           | 3.14.2  | same CDN                                              |
| Draggable          | 3.14.2  | same CDN                                              |
| InertiaPlugin      | 3.14.2  | same CDN                                              |
| TextPlugin         | 3.14.2  | same CDN                                              |
| SplitText          | 3.14.2  | same CDN                                              |
| ScrambleTextPlugin | 3.14.2  | same CDN                                              |
| Lenis              | 1.3.15  | unpkg.com                                             |
| Three.js           | r128    | cdnjs cloudflare (also referenced as `three.min.txt`) |
| virtual-scroll     | 2.1.1   | cdn.jsdelivr.net                                      |
| HLS.js             | 1.6.11  | cdn.jsdelivr.net                                      |

Register all GSAP plugins immediately after load:

```js
gsap.registerPlugin(
  ScrollTrigger,
  CustomEase,
  Observer,
  Draggable,
  InertiaPlugin,
  TextPlugin,
  SplitText,
  ScrambleTextPlugin,
);
```

---

## SECTION 18 — VISUAL IDENTITY SUMMARY (FROM FRAMES)

Cross-reference `frame_01.jpg` through `frame_07.jpg` and `frame_19.jpg`–`frame_20.jpg` in `/Users/damionmorgan/Desktop/extracted photos/` for the following confirmed visual truths:

- **The artboard is dark.** The canvas background is `#e7e7e7` (renderer clear color) but the image planes, which are predominantly dark photography and 3D renders, make the overall canvas appear very dark — near-black in motion.
- **Large display text inside the artboard.** Some image planes contain editorial text treatments — phrases like "HARMONY", "SHAPES IN A PLAYFUL HARMONY", "VISIONARY TRIBUTES", "LIQUID GEOMETRY MEETING BOLD SHAPES" — rendered in very large, heavy, uppercase white type against dark image backgrounds. This is the artwork content within the planes, not UI text. Source it from the actual image assets.
- **The UI chrome is light.** The microcopy rail (location, time, expertise, social, manifesto, CTAs) appears in the pale grey `#f3f3f3` zone, contrasting sharply with the dark canvas below.
- **The bottom wordmark "THE ARTBOARD™" is always visible** at the very bottom of the viewport in large, blurred Easegeometricb type.
- **THE ARCHIVE / THE PROFILE buttons appear at top-right** of the viewport — confirmed in all artboard frames as small-ish uppercase split-char bars in the upper right corner.
- **CRT effect is always on.** Visible as horizontal scanlines over the pale grey preloader (frames 08, 17, 18) and as a texture over the dark artboard (frames 01–07).
- **The artboard planes have visible gaps** — approximately `0.2vw` margin between each, as specified in the CSS.
- **Motion blur / velocity distortion** is visible on planes in frames 01–07 when the canvas is being dragged — implement as a UV warp shader uniform tied to scroll velocity.
- **Frames 09–16 show the Archive page** — note the layout uses the same pale grey background, same typography system, and same CRT layer. The archive has a large centered hero image, a numbered project list on the left (`(001) RETRONOVA`, `(002) NICOLA ROMEI©`, etc.), a right-side thumbnail strip, and large horizontal ticker text at the bottom. This is NOT the homepage but confirms the broader design system.

---

## SECTION 19 — ABSOLUTE NON-NEGOTIABLES

These are the things that must never be simplified, replaced, or approximated:

1. **The preloader must count to 100** with a real progress line and stacked clip-path image reveals. No spinner. No fade-in logo.
2. **The CRT overlay is always present.** It does not turn off between pages.
3. **The artboard is Three.js.** Do not substitute CSS grid, masonry, or any other layout mechanism.
4. **The planes must respond to drag velocity with shader distortion.** The inertial feel is the product.
5. **The underline animation is two-pseudo-element wipe.** Not a single underline fade.
6. **Buttons are split-character with staggered transition-delay.** Not CSS `letter-spacing` or a generic hover.
7. **"the artboard™" is blurred.** `filter: blur(1.5px)` is not a mistake.
8. **Body overflow is hidden.** The page does not scroll in the traditional sense.
9. **The live clock is always ticking** in real time for Europe/Rome timezone.
10. **Zero border radius on every element.** Everywhere. No rounded corners, no `rounded-lg`, nothing.
11. **Typography is uppercase everywhere** except the manifesto prose paragraph.
12. **The selection color is `#ff564a`.** Keep it.
13. **The progressive blur panels at top and bottom of the canvas** must exist — they prevent the Three.js planes from hard-cutting against the page edge.

---

## SECTION 20 — BUILD CHECKLIST

Use this as a completion gate. Do not mark the homepage as done until every item passes:

- [ ] Preloader: counter 0→100, progress line, 5-image clip-path stack, split-char intro text, all sequenced by GSAP
- [ ] CRT scanlines, vignette, flicker — present on both pale grey AND dark artboard states
- [ ] Three.js artboard: 25 image planes, virtual-scroll input, GSAP velocity smoothing, UV distortion shader
- [ ] Inertial deceleration on artboard after drag/scroll release
- [ ] Plane links navigate to `/archive` with page transition overlay
- [ ] Microcopy rail: location column, live Europe/Rome clock, expertise list, social links, manifesto paragraph
- [ ] Manifesto uses GSAP SplitText line-mask reveal on scroll trigger
- [ ] Social links use `data-underline-link="alt"` two-pseudo-element wipe animation
- [ ] THE ARCHIVE and THE PROFILE: full-width split-character buttons with 10ms per character delay stagger
- [ ] Demo panel: HLS video, description text, CLOSE button, hidden by default, revealed by GSAP
- [ ] Progressive blur panels top and bottom of artboard canvas
- [ ] Bottom wordmark "the artboard™" — blurred, blink/flicker GSAP loop
- [ ] Custom cursor "SCROLL OR CLICK" — smooth lerp follow, hides on scroll, hides over standard links
- [ ] Landscape warning overlay shown on landscape mobile orientation
- [ ] Page transition overlay — pale grey fullscreen, synced to route change
- [ ] Lenis initialized (not conflicting with virtual-scroll)
- [ ] `body.is--home` has `overflow: hidden` and `overscroll-behavior: none`
- [ ] Zero border radius on all elements
- [ ] Text selection highlight `#ff564a`
- [ ] Fonts confirmed loading: Easegeometricb (700) and Host Grotesk (300–700)
- [ ] Desktop layout validated at 1440×900
- [ ] Mobile layout validated against `mobile-full.png`
- [ ] Landscape mobile shows rotation warning only

---

_This prompt is derived entirely from the two primary data sources listed at the top. When this document and the source files conflict, the source files win._
