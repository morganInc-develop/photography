# 99 Cents Only Store Gallery Exhibition Recreation Brief

Primary page: https://tlb.betteroff.studio/articles/99-cents-only-store-gallery-exhibition
Shell reference: https://tlb.betteroff.studio/
Capture date: 2026-04-08
Brief type: evidence-backed article-page design research

This brief covers the article page as the primary target, with the homepage included only to explain the shared shell and entry-gate behavior. The findings are based on rendered HTML, screenshots, DOM extraction, computed-style probes, runtime console output, script inventory, and direct live-page inspection.

Important artifact caveat: the desktop article route initially loaded behind the same gate system used on the homepage, so both gate-state and entered-state desktop artifacts were captured. Mobile did not expose a clickable gate during capture, and the rendered mobile page surfaced the article state directly.

## 1. Artifact Index

- Gate-state article HTML: `source-gate.html`
- Gate-state article DOM summary: `dom-gate.json`
- Gate-state desktop screenshots: `gate-desktop-full.png`, `gate-desktop-hero.png`
- Entered article HTML: `source.html`
- Entered article mobile HTML: `source-mobile.html`
- Entered desktop screenshots: `desktop-full.png`, `desktop-hero.png`, `desktop-mid.png`, `desktop-lower.png`, `desktop-footer.png`
- Entered mobile screenshots: `mobile-full.png`, `mobile-hero.png`, `mobile-mid.png`, `mobile-lower.png`, `mobile-footer.png`
- DOM extraction: `dom-desktop.json`, `dom-mobile.json`
- Style probes: `style-probe.json`, `style-probe-mobile.json`
- Homepage shell reference: `homepage-context.png`, `homepage-context.json`
- Network logs: `network-requests.json`, `network-requests-mobile.json`
- Console logs: `console.json`, `console-mobile.json`
- Script inventory: `scripts.json`
- Combined script capture: `site.bundle.js`
- Capture metadata: `capture-metadata.json`

## 2. Page Type And Core Read

Observed: this is an editorial article detail page inside the same Lookback system as the homepage, not a standalone blog template. The article inherits the fixed brand shell, music control, and visual identity of the archive, then swaps the draggable homepage rail for a denser split editorial composition.

Observed: the page still behaves like a single-screen composition. Both desktop and mobile captures resolved to one viewport in height, with content arranged to fit the screen rather than flow into a long vertical document.

Inferred: the intended effect is to make each story feel like a curated panel inside an archive interface, not like a conventional reading page.

## 3. Shared System Versus Article-Specific Layer

### Shared With Homepage

Observed from `homepage-context.png`, `homepage-context.json`, and the article captures:

- Top navigation remains `Timeline`, `Surf`, `Index`, `About`.
- The fixed Better Off / Lookback masthead remains present.
- A floating audio player chip remains at top right on desktop.
- The visual language stays neutral: black on off-white with image color doing the expressive work.
- The article route still participates in the entry gate pattern.

### Article-Specific

Observed from `desktop-full.png` and `mobile-full.png`:

- The content shifts to a split layout focused on one story.
- Desktop uses a left image field and a right text column.
- Mobile collapses into a single editorial column with persistent bottom navigation.
- The article surfaces `Close` and `Source` controls as part of the page, not as generic header actions.

## 4. Gate Behavior

Observed in `gate-desktop-full.png`:

- The article route can open behind a stripped gate state with `LOADED` at top left.
- The right side still shows the month/category matrix from the homepage system.
- The centered action cluster remains `Enter with sound` and `...or without`.
- Unlike the homepage gate capture, the giant title is absent here. The gate functions more like a veil over the article route than a branded landing composition.

Implication:

- The entry system is global to the Lookback experience, but it presents differently on interior routes.
- If recreated, do not assume every route uses the exact same gate composition.

## 5. Desktop Layout Breakdown

Observed in `desktop-full.png`:

- The page is split vertically down the center.
- The left half acts as an image stage with a primary image in the middle and adjacent cropped imagery at the edges, suggesting article adjacency and archive continuity.
- The right half carries the editorial payload: category pill, month, large uppercase `h1`, body copy, and a YouTube embed.
- `Close` sits at top left of the article column. `Source` sits at top right of the article column.

Observed:

- A small mono index label and tag label sit near the image stage.
- The main image is not full-bleed. It floats with substantial negative space around it.
- The right column is spacious, with the `h1` and copy set in a compact editorial block rather than stretched across the full half.

Inferred:

- The split is compositional, not utilitarian. The left side is for mood and archive context; the right side is for reading.

## 6. Mobile Layout Breakdown

Observed in `mobile-full.png` and `mobile-mid.png`:

- The article becomes a strong single-column reading stack.
- The tag pill and month stay above the headline.
- The headline remains extremely large relative to the viewport.
- Body copy is dense and readable, with long lines broken into a compact mobile measure.
- The global nav moves to a bottom segmented row.

Observed from `dom-mobile.json`:

- A dedicated fixed mobile nav uses `mobile-menu-link`.
- A second fixed control bar includes previous article, `Close`, `Source`, and next article actions via `controls-link`.

Implication:

- Mobile is not just the desktop split layout stacked.
- The route becomes more navigation-forward on mobile, because route-to-route movement and exit/source actions need to stay accessible without the desktop shell arrangement.

## 7. Typography And Visual System

Observed from `style-probe.json`:

- `h1` is uppercase, bold, and large at `54.72px` with a tight `49.248px` line-height.
- The fixed logo uses `mix-blend-mode: difference`.
- General UI text probes around `19.2px`.
- Mono labels remain at `13.44px`, uppercase.
- The audio chip uses a small radius around `4.8px`.

Observed:

- The type stack still resolves mainly to `sans` plus `mono`.
- The article title treatment is blunt and heavy, not elegant or literary.
- The tag pill introduces the only deliberate accent color in the core article UI: a pale lavender badge behind `INSPIRE`.

Inferred:

- The page relies on weight, scale, and spacing rather than font variety.
- Keep the article title loud and compressed. Do not restyle it into a softer editorial serif headline.

## 8. Content Modules

### Article Header

Observed:

- Tag: `INSPIRE`
- Month: `(MARCH)`
- Title: `99 Cents Only Store Gallery exhibition`

Observed:

- Tag and month are positioned as metadata above the title, not below it.
- The tag uses a filled badge while the month remains plain text.

### Body Copy

Observed:

- The article body is short and tightly edited, only three paragraphs in the captured payload.
- Copy width is deliberately limited on desktop.

Implication:

- This is not a long-form reading page. It is a compact editorial capsule.

### Media Stage

Observed:

- The left stage shows the current article image plus adjacent crops from other items.
- The central image is labeled `INSPIRE (MARCH)` underneath.

Inferred:

- The side images act like archive bleed. They keep the article connected to the broader timeline.
- Do not simplify the left half into a single centered thumbnail.

### Source Embed

Observed:

- The page embeds a YouTube video in the article column.
- `scripts.json` shows multiple large YouTube embed scripts loaded in addition to the site’s Nuxt bundles.
- The `Source` CTA links to `https://www.youtube.com/watch?v=JRjg9YrF7X4`.

Implication:

- Video is part of the article payload and can materially affect script weight and layout behavior.

## 9. Motion And Interaction Clues

Observed from bundle/source search and console output:

- `gsap` appears repeatedly.
- `ScrollTrigger` appears in the bundle.
- `SplitText` is present and the console logs repeated `SplitText called before fonts loaded` warnings.
- The codebase still includes `mousemove`, `touchmove`, and `wheel` handling, inherited from the broader system.
- The audio system is deeply present in the bundle and source.

Inferred:

- Motion remains part of the route even if the article feels more static than the homepage.
- The title and shell likely still use the same entrance choreography and text-splitting hooks as the rest of the experience.
- Font-loading timing matters to the fidelity of any rebuild because the live page is already sensitive to it.

## 10. Architecture Clues

Observed:

- `__NUXT__` is present in the rendered HTML.
- Bundle and runtime traces indicate Nuxt/Vue plus Pinia state.
- The DOM uses utility-style class names consistent with Tailwind-generated output.
- DatoCMS media URLs power the imagery.
- The article page references class hooks such as `js-t-title`, `js-logo`, `source-link`, `mobile-menu-link`, and `controls-link`.

Implication:

- This is a Nuxt/Vue editorial shell with CMS-backed content and custom motion hooks layered over it.
- If recreated in another stack, preserve the shell-content relationship and motion behavior rather than copying framework details literally.

## 11. Reconstruction Guidance

### Preserve

- The shared fixed shell from the homepage.
- The split-screen desktop composition.
- The compact single-screen article model.
- The loud uppercase headline.
- The left-stage image arrangement with peripheral archive bleed.
- The `Close` and `Source` controls as integral article actions.
- The embedded video module as part of the article payload.
- The mobile dual-bottom-control system.

### Do Not Simplify

- Do not convert this into a normal top-hero plus body article page.
- Do not move the image above the text on desktop.
- Do not remove the peripheral side images from the left stage.
- Do not hide `Close` and `Source` inside a generic header or kebab menu.
- Do not treat the article as independent from the homepage shell.

### Recommended Component Boundaries

- `LookbackShell`
- `LookbackAudioPlayer`
- `ArticleStage`
- `ArticleMeta`
- `ArticleBody`
- `ArticleSourceEmbed`
- `ArticleDesktopNav`
- `ArticleMobileNav`
- `EntryGate`

## 12. Risks And Runtime Notes

Observed:

- Desktop console logs repeated `SplitText called before fonts loaded` warnings.
- The gate existed on desktop article capture but not in the same clickable way on mobile.
- Script load is materially heavier here than on the homepage because of YouTube embed payloads.

Implication:

- Timing and route-entry behavior are part of the experience and should be tested explicitly.
- The page’s fidelity depends on synchronizing shell animation, font readiness, and embed loading.
