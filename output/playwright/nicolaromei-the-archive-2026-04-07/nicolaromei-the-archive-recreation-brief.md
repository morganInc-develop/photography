# Nicola Romei Archive Page Recreation Brief

Source URL: https://www.nicolaromei.com/the-archive
Capture date: 2026-04-07
Tech target: Next.js App Router + Tailwind CSS v4 + selective shadcn/ui primitives + GSAP

This brief covers the archive page only. It is evidence-driven from rendered HTML, post-loader screenshots, computed-style probes, network/script inspection, and direct source reads. One artifact caveat matters: the first desktop automation remained trapped in the live preloader, so the final desktop screenshots in this folder were recaptured after an explicit wait of roughly 27 seconds. Those updated desktop images are the correct visual reference for the page state that should be rebuilt.

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

Rebuild Nicola Romei’s archive page as a controlled editorial index rather than a generic portfolio listing. On desktop, the page should behave like a fullscreen archive console: pale grey background, persistent CRT scanlines and vignette, compact utility text at the upper left, a manifesto paragraph at the upper right, a large central featured image, a numbered project list on the left, a minimap-style vertical thumbnail strip on the right, and a bottom control rail that switches between `GALLERY` and `LIST`. The active gallery mode should feel kinetic and curated, not like a static CMS grid. As the user scrolls the mouse wheel, the right-side minimap strip should move with inertial lerp behavior, the central preview image should update with a clipped reveal animation, and the left-side project list should dim non-active items. The page must preserve the authored microcopy, uppercase editorial typography, pale grey versus matte-black palette, and archive-as-process framing. On mobile, the experience collapses into a vertical sequence of case cards with large images, numbered titles, editorial descriptions, and split-character `EXPLORE CASE` buttons beneath a compact archive header. Do not rebuild this route as a standard “work archive” with filter chips, cards, or a masonry layout. Keep the system-like feeling, the gallery/list toggle, the minimap logic, the clipped image transitions, and the sense that the page is an operating interface for browsing work rather than a decorative gallery.

## 3. Screenshot References

- `desktop-full.png` is the best desktop reference. It shows the post-loader archive composition with the manifesto, back link, live Rome time, large feature image, numbered list, bottom controls, and right minimap.
- `desktop-hero.png` is useful for proportion and upper-frame spacing. It captures the manifesto and top navigation more clearly.
- `desktop-mid.png` is useful for the main balance of image, left list, and minimap.
- `desktop-lower.png` and `desktop-footer.png` help confirm the lower control rail and how tightly the page is framed within a short desktop viewport.
- `mobile-full.png` is the best mobile reference. It exposes the vertical archive stack, `( THE ARCHIVE )` heading, per-project descriptions, and repeated `EXPLORE CASE` buttons.
- `mobile-hero.png` and `mobile-mid.png` are supporting crops for card rhythm, image treatment, and typography scale on small screens.

## 4. High-Level Design Read

Observed: this is not the homepage artboard. It is a dedicated archive route with a stronger sense of curation and indexing. The desktop experience behaves like an editorial control panel for navigating projects. The central image is the anchor, but the page is really a synchronized system made of list, preview, minimap, and mode controls.

Observed: the visual language remains consistent with the homepage. The background is pale grey. The surface still carries CRT scanlines and a faint flicker/vignette treatment. Typography is uppercase, dense, and graphic. Borders remain sharp rather than rounded. The page uses negative space and alignment more than decorative framing.

Observed: the mobile route is not a shrunken desktop control panel. It is a structural reformat into a stacked list of archive entries, each with image, number, title, editorial summary, and action button. Desktop is an interactive browsing console; mobile is an authored archive feed.

Inferred: the intended feeling is archival, technical, and self-aware. The page frames the work as process and decision-making rather than finished outcomes. That framing is not only copywriting. It is encoded in the UI, especially the numbered list, minimap, and `GALLERY` / `LIST` switch.

## 5. Source-Backed Design Tokens

Observed:

- Root CSS variables on the site define `--matte-black: #202020` and `--soft_grey: #f3f3f3`.
- The desktop body background from the style probe is `rgb(243, 243, 243)`.
- Frequent site colors still include `#f3f3f3`, `#e7e7e7`, `#202020`, `#131313`, and translucent whites such as `#ffffff24`.
- The primary display face remains `Easegeometricb`.
- The primary body/meta face remains `Host Grotesk`.
- The first `h1` probe on desktop resolves to `Easegeometricb, Impact, sans-serif`, `56px`, uppercase, with `letter-spacing: -3.36px`.
- Utility copy across the page is predominantly uppercase and compact.
- The archive gallery animation script uses `clipRadius: "0.2em"` when revealing the active image, which implies a very small but non-zero corner treatment for that clipped preview.

Inferred:

- Reconstruction should keep the palette narrow and disciplined. This page does not want accent-color UI chrome.
- Radius should stay square almost everywhere, with only the preview clip reveal carrying a faint rounded inset.
- Type contrast should be sharp: large compressed display text for major labels and small uppercase grotesk for system/meta text.

## 6. Page Inventory

- Preloader inherited from the shared site loader.
- Persistent CRT overlay with scanlines and vignette/flicker treatment.
- Upper-left navigation cluster with `back to artboard™` and live Rome time.
- Manifesto paragraph describing the archive as a record of decisions.
- Secondary return link: `back to works`.
- Bottom archive control rail: `LATEST WORKS`, `GALLERY`, `LIST`, `ARCHIVE 2025©`.
- Desktop gallery mode with:
  - numbered left-side project list
  - large central preview image
  - right-side minimap thumbnail strip with indicator
- Desktop list mode with:
  - `.clients` panel
  - animated client-name reveal
  - hover-driven image preview
- Archive tag line block:
  - `THIS ARCHIVE DOES NOT COLLECT RESULTS. IT PRESERVES PROCESS.`
  - `THIS SPACE HOLDS PROJECTS_ TESTS_ VISUAL SYSTEMS_`
- Mobile archive header with `( THE ARCHIVE )`.
- Mobile project card list with descriptions and `EXPLORE CASE` actions.

## 7. Section-by-Section Breakdown

### Shared Loader + Surface Layer

Observed:

- The page still runs through the shared loader from `loader.js`.
- Capture metadata shows the loader copy and the desktop probe initially saw the preloader before the later recapture.
- The site still applies CRT overlay styling across the experience.

Must not be simplified:

- Do not remove the loader if rebuilding this route inside the same site shell.
- Keep the CRT layer subtle but persistent.

### Desktop Header + Manifesto

Observed:

- Upper-left cluster includes `back to artboard™` and a time widget driven by `[data-current-time="Europe/Rome"]`.
- The top-right manifesto reads:
  `What appears here is not a sequence of outcomes, but a record of decisions. Different contexts, different constraints, the same insistence on clarity, structure, and presence.`
- A secondary return link labeled `back to works` appears near the manifesto block.

Desktop layout model:

- Navigation and live time occupy the left edge.
- The manifesto sits opposite, creating a diagonal tension across the page before the eye drops into the image-and-list system.

Must not be simplified:

- Keep the live time behavior.
- Keep the exact microcopy tone and uppercase treatment.
- Do not collapse the manifesto into a generic intro paragraph above a grid.

### Control Rail

Observed:

- The bottom control strip contains `LATEST WORKS`, `GALLERY`, `LIST`, and `ARCHIVE 2025©`.
- `data-control="gallery"` and `data-control="clients"` are wired in `archive.js`.
- The active state is class-based. `switchTab()` removes `active` from one group and applies it to the other.

Behavior model:

- The rail is not just visual decoration. It controls the page’s structural mode.
- `GALLERY` shows the image/list/minimap composition.
- `LIST` reveals the clients/list mode with its own animation system.

Must not be simplified:

- Do not replace this with segmented controls styled as a modern SaaS toggle.
- Preserve the feeling of a system switch embedded in the composition.

### Desktop Gallery Mode

Observed:

- `.gallery__container` is the active default desktop mode.
- The left-side list is made of `.gallery__item` entries, each carrying `(001)` through `(008)`, project title, and `see case`.
- The current item is fully opaque while others are reduced to `0.5` opacity.
- The center preview swaps by inserting a new image and animating `clipPath` from `inset(50% round 0.2em)` to `inset(0% round 0.2em)`.
- The right minimap is a stacked list of `.item` thumbnails inside `.items` with an `.indicator`.
- `wheel` input is intercepted on `.gallery__container`, translated into inertial movement, then snapped to the nearest item after a short timeout.
- The system switches to horizontal behavior when `window.innerWidth <= 900`.

Desktop layout model:

- Left column: numbered names and deep links.
- Center: dominant image viewport.
- Right column: thin minimap strip with indicator window.
- Bottom: archive control rail.

Must not be simplified:

- Do not rebuild gallery mode as a carousel.
- Do not rebuild it as a CSS-only scroll list.
- Keep the minimap logic, inertial lerp, snap behavior, and clipped preview transition.
- Keep the dimming of non-active list items.

### Desktop List Mode

Observed:

- The alternate mode is referred to in source as `.clients`.
- `.client-name .cn__wrap` elements are initially set to `y: "100%"` and `opacity: 0`.
- A `MutationObserver` watches the `.clients` element’s class changes and animates names in when the mode becomes active.
- Hovering a client name generates a `.client-img-wrapper` inside `.clients-preview`.
- The preview image reveals with a clip-path polygon animation and scales down from `1.25` to `1`.
- Mouseout fades and removes preview wrappers.
- Supporting copy in the capture metadata includes `( HOVER TO REVEAL )` and `( CLICK TO EXPLORE )`.

Behavior model:

- This is a distinct archive browsing mode, not just a different styling of the same gallery.
- It behaves more like an editorial index with hover preview.

Must not be simplified:

- Preserve the revealed-on-hover preview behavior.
- Preserve the y-translate entrance animation for the names.
- Do not merge gallery and list into the same generic layout.

### Archive Tag Block

Observed:

- The desktop page includes:
  `THIS ARCHIVE DOES NOT COLLECT RESULTS. IT PRESERVES PROCESS.`
- It also includes:
  `THIS SPACE HOLDS PROJECTS_ TESTS_ VISUAL SYSTEMS_`

Layout model:

- These tags sit as declarative footer-side anchors rather than as decorative badges.

Must not be simplified:

- Keep these as integral compositional text blocks.
- Do not style them as pills, chips, or labels.

### Mobile Archive Layout

Observed:

- Mobile has a dedicated `.section.is--mobile`.
- The top cluster includes `back to artboard™`, live time, and `THE PROFILE`.
- The manifesto remains, but the page shifts into a clearer single-column narrative.
- A large blink-treated heading reads `( THE ARCHIVE )`.
- The same tag line `THIS ARCHIVE DOES NOT COLLECT RESULTS. IT PRESERVES PROCESS.` appears near the top.
- Each mobile item includes:
  - large image
  - number and title
  - editorial summary
  - split-character `EXPLORE CASE` button

Mobile layout model:

- Strong vertical stack with generous image blocks and dense uppercase descriptions.
- More like an editorial project feed than a miniature control room.

Must not be simplified:

- Do not force the desktop minimap/list structure onto mobile.
- Preserve the long-form summaries and repeated action buttons.
- Keep the mobile archive feeling authored, not templated.

## 8. Animation and Interaction Breakdown

Observed:

- GSAP, ScrollTrigger, CustomEase, Observer, Draggable, InertiaPlugin, TextPlugin, SplitText, and ScrambleText are loaded on the site.
- Archive-specific logic lives in the captured `archive.js` section of `site.bundle.js`.
- `CustomEase.create("hop", ...)` defines the reveal timing signature for archive transitions.
- Gallery/list mode changes are handled by toggling `active` classes across grouped elements.
- The client list mode uses a `MutationObserver` to trigger reveal animation only when the list becomes active.
- Hover preview images are created dynamically rather than pre-rendered in place.
- The gallery mode uses `requestAnimationFrame` for continuous lerp updates.
- Wheel events are prevented and remapped into custom translation logic.
- Clicking a minimap item recenters the gallery on that index.
- Resize recalculates dimensions and re-snaps the active item.

Inferred ownership guidance:

- GSAP should own all archive choreography, including tab switching, clip-path reveals, hover-image entry, list-item opacity changes, and heading/button split-text behavior.
- Framer Motion is unnecessary for the core archive interactions. If used at all, it should stay peripheral.
- The gallery should be rebuilt as a controlled client component with explicit cleanup on unmount.

## 9. Implementation Notes For Next.js + Tailwind v4

Observed:

- The live page is Webflow-generated but clearly depends on custom JavaScript modules layered on top.
- The archive route is namespace-specific and should be treated as a bespoke page, not as a generic CMS template.

Recommended component boundaries:

- `SiteLoader`
- `CrtOverlay`
- `ArchiveHeader`
- `ArchiveManifesto`
- `ArchiveControls`
- `ArchiveGallery`
- `ArchiveGalleryList`
- `ArchivePreviewStage`
- `ArchiveMinimap`
- `ArchiveClientsList`
- `ArchiveClientsPreview`
- `ArchiveTags`
- `ArchiveMobileList`
- `SplitCharButton`

Guidance:

- Keep desktop archive mode close to viewport height rather than letting it become a long conventional page.
- Use Tailwind for layout scaffolding and typography utilities, but keep CRT, clip-path, scanline, indicator, and reveal details in targeted global CSS.
- Build gallery and list mode as explicitly separate subtrees so the mode switch can feel structural.
- Keep the live time widget at the page shell level so it stays consistent across routes.
- The active gallery image should be replaced through animation, not just by changing a background-image.
- Preserve keyboard and touch fallbacks where practical, but do not flatten the interaction logic to accommodate them.

## 10. shadcn/ui Guidance

Observed:

- This route is bespoke and intentionally anti-component-library in appearance.

Guidance:

- `shadcn/ui` is acceptable for invisible primitives only.
- Dialog, sheet, or focus-lock primitives are acceptable if future archive overlays require them.
- Do not use stock `Button`, `Card`, `Tabs`, `Carousel`, `Badge`, or `NavigationMenu` components here.
- The gallery/list control should be custom-built, even if implemented with accessible button primitives under the hood.

## 11. Tailwind v4 Global CSS Starter

```css
@theme {
  --color-soft-grey: #f3f3f3;
  --color-panel-grey: #e7e7e7;
  --color-matte-black: #202020;
  --color-ink: #131313;
  --color-border-soft: #ffffff24;

  --font-display: "Easegeometricb", Impact, sans-serif;
  --font-body: "Host Grotesk", sans-serif;

  --radius-none: 0px;

  --ease-archive: cubic-bezier(0.596, 0.002, 0, 1.002);
}

:root {
  --space-xxs: clamp(0.4rem, 0.25rem + 0.5vw, 0.8rem);
  --space-xs: clamp(0.75rem, 0.4rem + 1vw, 1.5rem);
  --space-sm: clamp(1.25rem, 0.8rem + 1.6vw, 2.5rem);
  --space-md: clamp(2rem, 1.2rem + 2.8vw, 4.5rem);
  --space-lg: clamp(3rem, 1.8rem + 4.5vw, 7rem);
}

html,
body {
  background: var(--color-soft-grey);
  color: var(--color-matte-black);
}

.type-archive-display {
  font-family: var(--font-display);
  font-size: clamp(2.25rem, 4vw, 3.5rem);
  line-height: 1;
  letter-spacing: -0.06em;
  text-transform: uppercase;
}

.type-archive-meta {
  font-family: var(--font-body);
  font-size: clamp(0.625rem, 0.5rem + 0.4vw, 0.75rem);
  font-weight: 500;
  line-height: 1;
  text-transform: uppercase;
}

.archive-shell {
  min-height: 100svh;
  background: var(--color-soft-grey);
}

.archive-preview {
  position: relative;
  overflow: hidden;
  background: var(--color-panel-grey);
}

.archive-preview img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.crt-overlay::before,
.crt-overlay::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.archive-indicator {
  position: absolute;
  inset-inline: 0;
  border: 1px solid rgb(32 32 32 / 0.14);
}
```

## 12. Build Checklist

- Preserve the shared preloader and the persistent CRT overlay.
- Recreate the desktop archive as a near-viewport-height composition rather than a standard stacked page.
- Keep the upper-left live time and `back to artboard™` link.
- Preserve the manifesto and the `back to works` secondary exit.
- Implement a true gallery/list mode switch with separate active states.
- Rebuild the inertial minimap gallery with lerp, wheel interception, snap-to-nearest logic, and active-item syncing.
- Rebuild the preview image replacement with clip-path reveal, not a simple fade.
- Dim non-active desktop list entries.
- Rebuild the list mode hover preview and name reveal animation.
- Keep the archive tag lines as compositional text, not UI chips.
- Rebuild mobile as a vertical archive feed with summaries and split-character `EXPLORE CASE` buttons.
- Validate desktop, tablet, and mobile separately because the interaction model changes meaningfully below `900px`.

## Observed vs Inferred Summary

Observed:

- Webflow structure with route-specific archive markup.
- Desktop gallery mode with numbered list, central preview, minimap strip, and bottom controls.
- Mobile-specific archive section with stacked project entries and longer descriptions.
- Archive copy explicitly framing the work as process rather than outcomes.
- Custom GSAP archive script implementing tab switching, list reveal, hover preview, inertial gallery motion, snap logic, and clip-path image replacement.
- Shared site loader, CRT surface treatment, and live time behavior still present on this route.

Inferred:

- The React rebuild should treat this route as a bespoke client-side interactive page rather than as a CMS listing template.
- Accessibility support should be added carefully, but without flattening the authored motion and browse model.
- Framer Motion, if present at all in the larger app, should remain peripheral on this route because the core interaction language here clearly belongs to GSAP.
