# The Lookback Homepage Recreation Brief

Source URL: https://tlb.betteroff.studio/
Capture date: 2026-04-08
Brief type: evidence-backed design research brief

This brief covers the homepage only. It is based on rendered HTML, screenshots, computed-style probes, script inventory, runtime console output, and direct inspection of the live page after clearing the desktop entry gate.

Important artifact caveat: the first desktop capture stayed on the entry gate. Post-entry desktop artifacts were captured separately after selecting `...or without`. Mobile loaded directly into the main interface during capture, so the mobile screenshots are better references for the entered state than the initial desktop package.

## 1. Artifact Index

- Gate-state rendered HTML: `source.html`
- Gate-state desktop full screenshot: `desktop-full.png`
- Gate-state desktop crops: `desktop-hero.png`, `desktop-mid.png`, `desktop-lower.png`, `desktop-footer.png`
- Entered-state rendered HTML: `source-entered.html`
- Entered-state desktop screenshots: `desktop-entered-full.png`, `desktop-entered-hero.png`
- Mobile rendered HTML: `source-mobile.html`
- Mobile screenshots: `mobile-full.png`, `mobile-hero.png`, `mobile-mid.png`
- DOM extraction: `dom-desktop.json`, `dom-mobile.json`
- Entered desktop DOM summary: `entered-desktop.json`
- Style probes: `style-probe.json`, `style-probe-mobile.json`, `style-probe-entered.json`
- Script inventory: `scripts.json`
- Combined JS capture: `site.bundle.js`
- Network logs: `network-requests.json`, `network-requests-mobile.json`
- Console logs: `console.json`, `console-mobile.json`
- Capture metadata: `capture-metadata.json`

## 2. Page Type And Core Read

Observed: this is not a conventional scrolling homepage. It is a branded timeline surface for Better Off’s editorial/cultural archive, centered around a horizontally draggable image rail. The page behaves more like a gallery instrument than a marketing landing page.

Observed: the experience has two states.

- State one is a desktop-only or desktop-prioritized entry gate with a huge centered masthead, a right-aligned month/category count matrix, and two explicit entry choices.
- State two is the actual interface: fixed masthead, fixed nav, a floating audio controller, a draggable timeline carousel, and a bottom month ruler.

Inferred: the intended feeling is editorial, archival, and slightly playful, but still precise. The page is sparse, highly controlled, and intentionally anti-template.

## 3. High-Level Design Read

Observed: the strongest visual anchor is the oversized `Better Off® THE LOOKBACK (BO®S/2026)` wordmark. It dominates the composition and stays fixed while the content rail moves beneath it.

Observed: the background is almost entirely off-white with very restrained chrome. Images carry most of the color. UI text is black or rendered through `mix-blend-difference`, which lets fixed overlays stay legible over both pale background and imagery.

Observed: the pacing is horizontal, not vertical. The page height is effectively one viewport in both desktop and mobile captures. Motion and sequencing come from entering, dragging, hovering, and audio state rather than scrolling down a long document.

Observed: the design splits into three systems:

- A fixed editorial shell: nav, logo, noise layer, audio chip.
- A content transport: the carousel and month ruler.
- A transient gate: desktop entry screen with counts and sound choice.

## 4. Visual System

### Typography

Observed:

- The loaded type stack resolves mostly to `sans` plus a `mono` family for labels.
- The main logo is extremely large and tightly packed. Source classes include `text-[11.7em]`, `font-bold`, `leading-[.85]`, `tracking-[-.01em]`, and multiple `js-r*-*` span hooks.
- Labels use uppercase mono styling. The entered style probe reports `.label` at `13.44px`, `font-family: mono, sans-serif`, and uppercase.
- Nav and general interface text probe at roughly `19.2px` with medium weight.

Inferred:

- The visual identity depends on scale contrast more than font diversity.
- Any recreation should keep the logo oversized and compact rather than switching to a more neutral heading scale.

### Color

Observed:

- The page reads as black on off-white, with image content introducing muted teal, blue, tan, and grayscale tones.
- Root variables include custom neutrals such as `--silver`, `--timberwolf`, `--davys-gray`, `--tea-rose-red`, and `--puce`.
- The fixed logo layer uses `mix-blend-mode: difference`.
- A fixed `.noise` layer is present in source and in the class inventory.

Inferred:

- The palette should stay narrow and mostly neutral.
- Grain/noise is part of the finish, but subtle. Do not turn it into a heavy distressed texture.

### Shape And Spacing

Observed:

- The system is mostly square-edged, with only small radii on controls.
- The audio chip uses a border radius around `4.8px`.
- The bottom nav pills on mobile are gently rounded, not fully pill-shaped or chunky.
- Card gutters are narrow and consistent.

Inferred:

- The page should feel sharp and editorial, not soft or app-rounded.

## 5. Layout Breakdown

### Entry Gate

Observed in `desktop-full.png`:

- Small `LOADED` marker at top left.
- Large central masthead.
- Dense month/category count matrix on the right, listing months and category counts such as `ARTICLES`, `PODCAST EPISODES`, `INSPIRATION`, `MUSIC PLAYLIST`, `CASES`, and `CLIENTS`.
- Primary button `Enter with sound`.
- Secondary text button `...or without`.

Observed:

- The gate is mostly empty space. The count matrix is the only dense region.
- The gate turns the brand and taxonomy into the design, rather than showing the archive immediately.

Must not be simplified:

- Do not replace this with a modal or a generic splash screen.
- Keep the strong asymmetry between giant center title and dense right-side metadata.

### Fixed Shell

Observed in `desktop-entered-full.png` and source:

- Top-left nav: `Timeline, Surf, Index, About`.
- Top-right audio control: a white floating chip with cover art, current track, and an expandable track list.
- Fixed logo block near the top center.
- Noise overlay layer above the page.

Observed:

- The shell remains lightweight. It frames the content but does not box it in with panels or large containers.

### Main Content Rail

Observed:

- The actual archive content is a horizontal carousel of large image cards.
- Source classes include `carousel`, `carousel__slides`, `carousel-item`, `js-slide`, `js-slide-content`, `js-flip`, and `js-flip-target`.
- Each card carries a numeric index above and a tag-month label below on desktop.
- Source markup shows `data-url="/articles/{slug}"`, so cards are navigational, not just decorative.

Observed in source:

- Desktop cards are around `min-w-[20rem]` and `s:min-w-[28.1rem]`.
- Cards are laid out in a long rail with repeated month markers across an extended width.

Inferred:

- This should be rebuilt as a truly draggable horizontal track, not as a CSS grid, masonry, or standard slider with snapped pages.

### Bottom Ruler

Observed:

- The bottom uses a thin ruler/tick system with month labels distributed along a massive horizontal width.
- Source includes a dedicated canvas for this ruler and repeated month labels inside a translated strip.
- The captured source shows widths in the tens of thousands of pixels for the month-label layer.

Must not be simplified:

- Do not swap this for a simple pagination bar.
- The ruler is a core spatial cue that makes the archive feel navigable and temporal.

### Mobile Layout

Observed in `mobile-full.png` and `mobile-mid.png`:

- The logo remains dominant, but the composition becomes much more vertical within the same viewport.
- Two image tiles are visible at once.
- The top-left desktop nav relocates into a bottom segmented row: `Timeline`, `Surf`, `Index`, `About`.
- The desktop month matrix and floating audio chip are not visible in the mobile capture.

Inferred:

- Mobile is not a literal shrink of desktop. It reframes the controls and surfaces the content first.
- The responsive strategy prioritizes immediate access to the archive over preserving every desktop overlay.

## 6. Interaction Model

Observed in source and bundle:

- The carousel container uses `cursor-grab`.
- Runtime hooks include `mousemove`, `touchmove`, `wheel`, and `keydown`.
- The carousel component listens for horizontal drag and arrow-key movement.
- Track position is eased over time and updated on each tick.
- The bundle references `requestAnimationFrame`, `gsap`, and `ScrollTrigger`.
- Classes such as `js-i-slide`, `js-i-fade`, `js-i-line`, `js-t-fade`, and `js-flip` indicate a custom animation hook system.

Observed:

- Hovering desktop cards reveals sliding labels above and below.
- The audio controller supports track selection and playback state.

Inferred:

- GSAP likely owns motion choreography and state transitions, while the carousel itself uses a custom movement system rather than a stock carousel library.
- The page should feel inertial and continuous, not step-based.

## 7. Source-Backed Architecture Clues

Observed:

- `window.__NUXT__` and `__NUXT_DATA__` are present in the rendered HTML.
- Console output shows Vue hydration warnings and `NuxtPage`/`NuxtLayout` stack traces.
- Source references Pinia state with flags for `loaded`, `finished`, `menu`, `audio`, `music`, and `article`.
- Public config points to `https://bo26.netlify.app`.
- Media assets and SEO payloads come from DatoCMS URLs.
- The bundle groups article imagery by month and year, and creates flattened `all` and grouped archive collections.

Implication:

- The live site is a Nuxt/Vue app with Tailwind-style utility classes, Pinia state, CMS-backed media, and custom interaction code.
- If this is rebuilt in another stack, preserve behavior and structure rather than mirroring the exact implementation framework.

## 8. Content Model

Observed:

- Archive items expose `slug`, `title`, `tag`, `month`, `year`, and media assets.
- Tags visible in captures and runtime warnings include `Inspire`, `Showcase`, and `Educate`.
- Desktop gate counts indicate broader content families including `Articles`, `Podcast Episodes`, `Inspiration`, `Music Playlist`, `Cases`, and `Clients`.
- The audio playlist includes multiple named tracks with cover art and MP3 URLs.

Inferred:

- The homepage is an editorial index over multiple content formats, not only one article feed.
- The music layer is part of the brand experience, not an afterthought.

## 9. Reconstruction Guidance

### What to preserve

- The entry gate as a deliberate threshold, especially on desktop.
- The huge fixed masthead.
- The minimal but persistent fixed shell.
- The draggable horizontal archive rail.
- The bottom month ruler with dense tick marks.
- The contrast between neutral UI and richly colored imagery.
- The subtle grain/noise finish.
- The audio chip as a live part of the interface.

### What not to do

- Do not convert this into a vertical blog homepage.
- Do not flatten the archive into generic cards in a centered grid.
- Do not replace the ruler with pagination dots or tabs.
- Do not turn the entry gate into a modal overlay over the entered page.
- Do not over-design the controls with large shadows, colorful buttons, or rounded app-chrome.

### Practical component split

- `EntryGate`
- `FixedBrandShell`
- `AudioPlayerChip`
- `TimelineCarousel`
- `TimelineCard`
- `MonthRuler`
- `NoiseOverlay`
- `MobileNavBar`

### Motion ownership

- Use GSAP or an equivalent imperative motion layer for entry, hover labels, and carousel/ruler syncing.
- Keep the carousel movement custom and inertial.
- Use lightweight declarative transitions only for small supporting fades.

## 10. Risks And Capture Notes

Observed:

- Console logs show repeated hydration mismatches where server-rendered month labels differ from client-rendered labels.
- The active track varied across runs, which means some capture text changes from session to session.
- The initial desktop automation landed on the gate while mobile landed on the entered interface.

Implication:

- Some labels and active audio metadata are dynamic and should not be treated as fixed copy.
- The overall design system and interaction model are stable despite those runtime variations.
