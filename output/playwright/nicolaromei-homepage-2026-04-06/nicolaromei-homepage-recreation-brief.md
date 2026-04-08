# Nicola Romei Homepage Recreation Brief

Source URL: https://www.nicolaromei.com/
Capture date: 2026-04-06
Tech target: Next.js App Router + Tailwind CSS v4 + selective shadcn/ui primitives + GSAP + Framer Motion

This brief covers the homepage only. It is evidence-driven from rendered HTML, captured screenshots, computed-style probes, network/script inspection, and direct source reads. One artifact caveat matters: the desktop captures stayed in the live preloader state because the loader counts to `100` before releasing the page. The mobile capture exposes the post-loader artboard layout more clearly.

## 1. Artifact Index

- Rendered HTML snapshot: `source.html`
- Desktop full-page screenshot: `desktop-full.png`
- Desktop hero screenshot: `desktop-hero.png`
- Desktop mid-page screenshot: `desktop-mid.png`
- Desktop lower-page screenshot: `desktop-lower.png`
- Desktop footer screenshot: `desktop-footer.png`
- Mobile full-page screenshot: `mobile-full.png`
- Mobile hero screenshot: `mobile-hero.png`
- Mobile mid-page screenshot: `mobile-mid.png`
- DOM extraction: `dom-desktop.json`
- Desktop style probe: `style-probe.json`
- Mobile style probe: `style-probe-mobile.json`
- Script inventory: `scripts.json`
- Network requests: `network-requests.json`
- Combined JS bundle capture: `site.bundle.js`
- Capture metadata: `capture-metadata.json`

## 2. Master Recreation Prompt

Rebuild the Nicola Romei homepage as a bespoke fullscreen portfolio landing page, not a generic portfolio template. The experience starts with a fixed, cinematic preloader on a pale grey background using CRT scanlines, a center-stacked image sequence, a numeric counter from `0` to `100`, a progress line, and split-text intro copy. After the loader exits, reveal a fullscreen hero/artboard composition. The live page uses Webflow for structure and custom scripts for motion and rendering, with `data-barba` wrappers, GSAP plugins, Lenis, Three.js, virtual-scroll, and HLS video support all present in source. Preserve the asymmetric information layout: left-aligned microcopy columns for geography, live time, expertise, and social links; a short manifesto paragraph; two full-width CTA buttons for `THE ARCHIVE` and `THE PROFILE`; a large interactive canvas/grid artboard made from many image planes; a demo/video tab explaining how to interact; and a blurred display wordmark `the artboard™` anchoring the lower area. Use GSAP for loader sequencing, split-text reveals, blink/flicker treatment, and page transitions. Use a custom Three.js canvas layer for the draggable/scrollable infinite image board. Do not flatten the experience into cards, a standard masonry gallery, or a typical hero-plus-grid landing page. Keep the typography uppercase, compact, and editorial; preserve the pale grey versus matte-black contrast; keep the blur, scanline, and CRT noise treatment; keep the animated underline links and character-split buttons; and preserve the sense that the page is an interface object rather than a simple website section stack.

## 3. Screenshot References

- `desktop-full.png` is most useful for the loader state, negative space, and intro pacing on large screens.
- `desktop-hero.png` captures the centered preloader image, numeric counter, progress line, and the intro copy beginning to surface.
- `desktop-mid.png` is less valuable visually because the live desktop loader still dominated the captured state; use it only as corroboration that the loader remains fullscreen during the count-up.
- `desktop-lower.png` and `desktop-footer.png` are supplementary crops from the full capture and mainly document how much white space the preloader owns before the release.
- `mobile-full.png` is the best visual reference for the post-loader composition. It exposes the artboard grid, microcopy columns, CTA buttons, grayscale imagery, and the large `THE ARTBOARD™` label.
- `mobile-hero.png` and `mobile-mid.png` are duplicates of the captured mobile viewport because the mobile headless render settled into a single-screen composition rather than a taller scroll document.

## 4. High-Level Design Read

Observed: the page behaves like an authored digital object, not a standard portfolio homepage. The preloader is not incidental. It establishes mood, rhythm, and signature before the visitor is allowed into the interface. The palette is almost entirely pale grey, off-white, charcoal, and black. The text system is compact, uppercase, and graphic. The imagery is monochrome or near-monochrome and treated as a texture field rather than a set of independent thumbnails.

Observed: attention is controlled in phases. Phase one is the loader image stack, numeric counter, and intro sentence. Phase two is the utility microcopy band that frames Nicola Romei as a globally working digital experience designer. Phase three is the interactive artboard itself, which is the real hero. Phase four is the explanatory demo tab and the `THE ARCHIVE` / `THE PROFILE` exits.

Inferred: the intended feeling is editorial, technical, cinematic, and slightly archival. The page wants to feel like a hybrid of exhibition interface, design lab, and image operating system. The most distinctive move is that the gallery is not presented as a static list. It is a field of planes inside a custom Three.js canvas that the visitor scrolls or drags.

## 5. Source-Backed Design Tokens

Observed:

- Root CSS variables define `--matte-black: #202020` and `--soft_grey: #f3f3f3`.
- Frequent colors in CSS include `#f3f3f3`, `#e7e7e7`, `#202020`, `#131313`, `#fff`, and translucent whites such as `#ffffff24`.
- The page body background in the style probe is `rgb(243, 243, 243)`.
- The primary display face is `Easegeometricb`. The main utility/body face is `Host Grotesk`.
- Additional loaded families include `prestige-elite-std`, `itc-avant-garde-gothic-pro`, and `neue-haas-grotesk-*`, but the homepage relies most visibly on `Easegeometricb` and `Host Grotesk`.
- `.h-h1` uses `font-size: clamp(2em, 5vw, 4em)` with `letter-spacing: -.06em`, uppercase, and `filter: blur(1.5px)`.
- `.paragraph` uses `Host Grotesk`, uppercase, `font-size: clamp(.625rem, .5rem + .5vw, .75rem)`, `font-weight: 500`, and `line-height: 1`.
- `.btn-animate-chars` uses translucent borders, zero radius, blurred background fills, and split-character text.
- `.preloader` is fixed, fullscreen, pale grey, and sits at `z-index: 999`.
- `.section.is--hero` is `width: 100%`, `height: 100%`, `position: relative`, and `overflow: hidden`.
- The home body explicitly sets `overflow: hidden`.

Inferred:

- The practical token set for reconstruction should stay narrow. This page does not read as a broad design system. It reads as a tightly art-directed one-page interface.
- Border radius should remain effectively square or near-square.
- Spacing is driven by clamp-based utility tokens rather than a rigid 4px or 8px scale.
- Imagery should remain grayscale or heavily muted unless a specific art asset clearly introduces color.

## 6. Page Inventory

- Preloader: fixed intro layer with center image stack, numeric counter, progress line, and split-text statement.
- CRT overlay: fullscreen scanline/vignette/flicker effect applied over the experience.
- Landscape warning: `ROTATE YOUR DEVICE FOR A BETTER EXPERIENCE`.
- Hero text rail: geography, live time, expertise list, and social/contact links.
- Intro manifesto block: short description of Nicola Romei’s practice.
- Primary CTAs: `THE ARCHIVE` and `THE PROFILE`.
- Artboard canvas/grid: `.grid.js-grid` containing many `.js-plane` image figures that are converted into a Three.js field.
- Demo/video tab: `hero__tab-wrap` with HLS background video, explanatory copy, and a close control.
- Bottom wordmark: `the artboard™`.
- Custom cursor prompt: `SCROLL OR CLICK`.

## 7. Section-by-Section Breakdown

### Preloader

Observed:

- The desktop artifact shows the live preloader still active.
- `loader.js` animates a counter from `0` to `100`, scales a progress line, reveals stacked images with clipping, runs split-text on the intro phrase, fades out UI, then hides `.preloader`.
- The copy reads: `WHAT APPEARS HERE IS NOT A SHOWCASE, BUT THE TRACE OF A PRACTICE`.
- The background is pale grey and the central image column is very small relative to the screen.

Must not be simplified:

- Do not replace this with a generic spinner or a short fade.
- Keep the numeric count, line-fill, and stacked image reveal.
- Preserve the exaggerated negative space.

### CRT Surface Layer

Observed:

- Source contains `.crt-overlay::before` scanlines, `.crt-overlay::after` vignette/flicker, and a slow `crt-scan` animation.

Must not be simplified:

- The CRT treatment is part of the page identity, not decoration. Keep it subtle but always present.

### Utility Hero Rail

Observed:

- The left/top information blocks include `Based in Italy, working globally.`
- Live time is driven by `[data-current-time="Europe/Rome"]`.
- Expertise items include `Art Direction`, `Web Design + Dev`, and `Webflow Development`.
- Social links are `Awwards`, `Linkedin`, and `contacts`.
- Underline interactions are custom CSS pseudo-element animations.

Desktop layout model:

- Small uppercase utility text arranged in narrow columns over the hero area.

Mobile layout model:

- The same content compresses into a stacked grid above the artboard tiles in `mobile-full.png`.

Must not be simplified:

- Keep the live time widget.
- Keep the underline animation behavior.
- Keep the microcopy tone and uppercase styling.

### Manifesto + CTAs

Observed:

- Intro copy: `Digital Experience Designer and Awwwards Judge. I create immersive websites defined by strong visual direction, refined motion, and a distinct design signature.`
- CTA buttons are full-width, split-character buttons.

Desktop layout model:

- Manifesto and CTAs sit inside the hero text system rather than below it as a standard stacked section.

Mobile layout model:

- The manifesto becomes a strong central text block above two side-by-side CTA bars.

Must not be simplified:

- Do not replace the buttons with default rounded primary buttons.
- Preserve the split-character implementation and translucent framed treatment.

### Interactive Artboard

Observed:

- Source contains `.grid.js-grid` and many `.js-plane` figures with `data-src` image URLs.
- `bundle.js` initializes `initHomeCanvas()` for the `home` namespace.
- The home canvas uses Three.js, `virtual-scroll`, and GSAP.
- The renderer clear color is `0xE7E7E7`.
- Each image is mapped to a plane with shader uniforms for texture, size, velocity, and viewport size.
- The copy explicitly instructs: `SCROLL / DRAG TO INTERACT W/ THE ARTBOARD`.

Desktop layout model:

- Inferred from source: fullscreen custom canvas with draggable or scrollable inertial movement and many wrapped image planes.

Mobile layout model:

- Observed in `mobile-full.png`: the field presents as a dense tiled collage with visible image boundaries and grayscale content.

Must not be simplified:

- Do not rebuild this as a CSS masonry grid.
- Do not swap it for a carousel.
- Preserve inertial movement and velocity-based shader distortion.

### Demo / Explanation Tab

Observed:

- `hero__tab-wrap` contains a Bunny HLS background player and explanatory copy.
- `home.js` initializes HLS playback, autoplay behavior, and an `IntersectionObserver` for smart play/pause.
- The demo copy explains the artboard as a structured environment for creations, systems, and design research.

Must not be simplified:

- Keep the explanatory panel feeling like a system utility, not a marketing card.
- Keep media fallback behavior and lazy/autoplay logic.

### Bottom Wordmark + Cursor

Observed:

- Bottom section contains `the artboard™`.
- A floating cursor label reads `SCROLL OR CLICK`.
- `data-blink-text` appears on the main wordmark.

Must not be simplified:

- Keep the lower anchor wordmark oversized, blurred, and slightly unstable.
- Keep the interaction cue as a cursor/system label.

## 8. Animation and Interaction Breakdown

Observed:

- Loader sequencing is explicitly handled in `loader.js` with GSAP timelines.
- Page transitions are handled through `.page-transition` plus session storage flags and internal-link interception.
- `data-barba="wrapper"` and `data-barba="container"` are present in the HTML.
- Split text is used both in the loader and in content reveal animations.
- Blink/flicker text treatment exists for `[data-blink-text]`.
- Lenis is initialized for smooth scroll.
- The homepage canvas uses Three.js plus virtual-scroll and GSAP velocity smoothing.
- HLS video autoplay is managed with an `IntersectionObserver`.

Inferred ownership guidance:

- GSAP should own the preloader, split-text reveals, button character staggers, blink/flicker bursts, page transitions, and any entrance choreography.
- The interactive artboard should remain custom Three.js logic. Framer Motion is not the right tool for this core interaction.
- Framer Motion is optional only for small React mount transitions or simple opacity transitions around non-canvas UI.
- Structural interactions are the artboard drag/scroll, demo panel state, internal page transitions, and live media behavior. These are not decorative microinteractions.

## 9. Implementation Notes For Next.js + Tailwind v4

Observed:

- The live site is Webflow-generated but driven by custom JS modules layered on top.
- The homepage is namespace-specific and should be treated as a bespoke route rather than a generic site shell.

Recommended component boundaries:

- `HomeLoader`
- `CrtOverlay`
- `HomeMetaRail`
- `HomeManifesto`
- `SplitCharButton`
- `ArtboardCanvas`
- `ArtboardDemoPanel`
- `BlinkWordmark`
- `PageTransitionOverlay`

Guidance:

- Keep the page as a fullscreen composition with controlled overflow.
- Use Tailwind for layout scaffolding, spacing tokens, and typography utilities, but move the scanline, flicker, blur-gradient, and canvas-related styling into targeted global CSS.
- Treat the artboard as a client-only component with explicit cleanup on route change.
- Preserve exact line breaks only where they are part of the composition. The manifesto can be responsive, but the utility labels should stay compact.
- Use image preloading intentionally for the loader stack and the canvas plane sources.
- Build the page transition layer at the app-shell level so archive/profile routes can inherit the same overlay behavior.

## 10. shadcn/ui Guidance

Observed:

- The homepage is strongly bespoke and intentionally anti-generic.

Guidance:

- `shadcn/ui` is acceptable for invisible primitives only.
- Dialog, sheet, or focus-lock primitives are acceptable if the demo panel or future overlays require them.
- Do not use stock `Button`, `Card`, `Carousel`, `Tabs`, or `Badge` components here.
- If an accordion or drawer is ever needed on small screens, use the primitive only and fully reskin it.

## 11. Tailwind v4 Global CSS Starter

```css
@theme {
  --color-soft-grey: #f3f3f3;
  --color-matte-black: #202020;
  --color-panel-grey: #e7e7e7;
  --color-ink: #131313;
  --color-border-soft: #ffffff24;

  --font-display: "Easegeometricb", Impact, sans-serif;
  --font-body: "Host Grotesk", sans-serif;

  --radius-none: 0px;

  --ease-signature: cubic-bezier(0.625, 0.05, 0, 1);
}

:root {
  --space-xxs: clamp(0.5rem, 0.26rem + 1vw, 1.5rem);
  --space-xs: clamp(1rem, 0.5rem + 2.1vw, 3rem);
  --space-sm: clamp(2rem, 1.25rem + 3.1vw, 5rem);
  --space-md: clamp(4rem, 2.5rem + 6.2vw, 10rem);
  --space-lg: clamp(6rem, 3.5rem + 10.4vw, 16rem);
}

html,
body {
  background: var(--color-soft-grey);
  color: var(--color-matte-black);
}

.type-display {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 5vw, 4rem);
  line-height: 1;
  letter-spacing: -0.06em;
  text-transform: uppercase;
  filter: blur(1.5px);
}

.type-meta {
  font-family: var(--font-body);
  font-size: clamp(0.625rem, 0.5rem + 0.5vw, 0.75rem);
  font-weight: 500;
  line-height: 1;
  text-transform: uppercase;
}

.btn-split {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border-soft);
  background: transparent;
  color: var(--color-matte-black);
  padding: 0.25em 1em;
}

.btn-split::before {
  content: "";
  position: absolute;
  inset: 0;
  backdrop-filter: blur(2px);
  background: var(--color-soft-grey);
}

.crt-overlay::before,
.crt-overlay::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.page-loader,
.page-transition {
  position: fixed;
  inset: 0;
}
```

## 12. Build Checklist

- Recreate the fullscreen preloader with counter, line-fill, split text, and stacked clipped images.
- Add CRT scanlines, vignette, and flicker as persistent overlays.
- Preserve the hero’s utility microcopy, live time, expertise, and social links.
- Rebuild the split-character CTA buttons instead of using stock button styling.
- Implement a custom Three.js artboard using plane textures, inertial movement, and velocity-reactive distortion.
- Keep body overflow behavior intentional and route-level page transitions intact.
- Add Lenis-backed smooth scroll only where it does not fight the canvas drag model.
- Implement HLS/video logic for the demo panel with autoplay and intersection-based pause/resume.
- Keep the blurred `the artboard™` wordmark and cursor prompt.
- Validate desktop, mobile portrait, and landscape-warning behavior separately.
- Treat any missing motion as a functional regression, not a cosmetic one.

## Observed vs Inferred Summary

Observed:

- Webflow structure with `data-barba` wrappers.
- GSAP, ScrollTrigger, CustomEase, Observer, Draggable, InertiaPlugin, TextPlugin, SplitText, and ScrambleText loaded.
- Lenis, Three.js, virtual-scroll, and HLS loaded.
- Custom scripts for loader, page transitions, button character splitting, home canvas, HLS background video, parallax, and namespace-specific initialization.
- Root tokens include `--matte-black` and `--soft_grey`.

Inferred:

- Barba.js is the likely router/transition layer because of the DOM attributes, even though the actual runtime initialization is not directly surfaced in the captured snippets.
- The desktop artboard state would become more visible after the loader completes; the mobile artifact already shows the intended post-loader composition.
- Framer Motion should play a minor supporting role at most. The page’s core movement language belongs to GSAP and Three.js.
