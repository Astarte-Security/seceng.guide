# seceng.guide

Slide deck for the **DIY Continuous Security** workshop, presented at security conferences and hosted at <https://seceng.guide> via GitHub Pages (see [CNAME](CNAME)). There is no build step: [index.html](index.html), [styles.css](styles.css), and [script.js](script.js) are served as-is.

## Source of truth

- The workshop content lives in [content/](content/) as numbered Markdown guides (`0-intro.md` … `11-ai-sast.md`). The slides in [index.html](index.html) are a hand-made, chunked adaptation of those guides: each guide becomes a part divider plus several slides with one idea each, and labs get one or two steps per slide.
- When a guide changes, update the matching slides. Each part in `index.html` starts with an HTML comment naming its source file, e.g. `<!-- 03 · SAST (content/2-sast.md) -->`.
- Code blocks in the slides must stay **verbatim** copies of the guides' code (attendees paste them into GitHub). Escape `<`, `>`, `&` in HTML. If a guide's code has a bug, flag it to the user rather than silently fixing it on the slide.
- Audience: AppSec practitioners, engineers moving into security, first security hires. Tone is practical and tool-agnostic.

## How the deck works

- Slides are authored on a fixed **1600×900 stage** that `script.js` scales to fit the window (`--scale`). If a layout fits at 1600×900, it fits on every projector. Don't use viewport units inside slides.
- At widths up to 820px, `body.is-doc` turns the deck into a scrolling document. Every layout class has a `body.is-doc` override at the bottom of `styles.css`; add one when you add a layout.
- Slide count, footer counter, progress bar, and the slide menu are all computed from the DOM. Adding a slide is just adding a `<section class="slide">`.
- **Parts**: a `<section class="slide divider" data-part="Label" id="…">` starts a part. The label shows in the footer and the slide menu. Add `lab-divider` for a lab: every slide until the next divider gets `.is-lab` (green accents).
- Menu titles come from the slide's `h1`/`h2`, or from `data-title` when there's no heading or it's ambiguous.
- Deep links: `#12` (slide number) or `#<id>` (any element id, e.g. `#sast`). Agenda links use the ids.
- Keys: ←/→/Space/PageUp/PageDown (clickers), Home/End, `M` menu, `G` go to slide, `T` theme, `F` fullscreen, Esc closes overlays.
- Theme: `data-theme` on `<html>`, initialised in an inline `<head>` script from `localStorage["theme"]` or the OS preference. All colours are CSS variables on `:root` / `:root[data-theme="light"]`; route new colours through them. Code blocks are always dark.

## Slide vocabulary (prefer these over new classes)

- Header: optional `<p class="eyebrow">` (use `eyebrow lab` for lab steps outside a lab part), then `<h2>`.
- Text: `.lead` (intro sentence, `.lead.big` for emphasis), `.statement` (one big sentence; `<em>` highlights), `blockquote.quote` + `.quote-cite`, `.small` / `.xsmall` / `.muted`.
- Lists: `ul.bullets`, and `ol.steps` for lab steps. Use `start="N"` to continue numbering across slides.
- Layout: `.body.center-v` (vertically centred content), `.split` with `.text-wide` / `.media-wide` / `.code-wide` (2 columns), `.col`, `.cards` + `.card` (`style="--cols: N"`; `.card.pick` highlights the tool we use), `.flow` + `.node` + `.arrow` (pipelines), `table.compare`, `ul.links` (title + `.url`), `.callout.note|important|warning|lab`.
- Screenshots: `<figure class="shot"><img src="assets/img/…" width height alt></figure>`. Always set `width`/`height` (script.js uses them so the image scales up to fill its slot, max 1.75×). Images are click-to-zoom.
- Code: `<div class="code" data-file=".github/workflows/x.yml"><pre><code class="language-yaml">…`. `data-file` shows the filename in the header, and a Copy button is added automatically. Size modifiers: `.sm`, `.xs`, `.lg`; `.fill` takes the remaining height (long files scroll inside the block). Prism languages are vendored in `assets/vendor/prism/`. If you need a new language, add its component file and a `<script>` tag. The hand-highlighted diff uses `<code class="diff">` with `<span class="del">`/`<span class="ins">` lines; Prism skips it because there's no `language-` class.
- Section dividers: `.divider` with `<p class="num">`, `<h2>`, `<p class="teaser">`. The title and closing slides use `.cover`.

## Assets

- [assets/img/](assets/img/) — local copies of the guides' screenshots (originally GitHub `user-attachments` URLs), so the deck works offline. The guides still point at the GitHub-hosted originals. When a guide's screenshot changes, download the new one here.
- Four diagrams from the guides (scope, SAST lifecycle, static vs. dynamic, the four levels of AI SAST) are rebuilt as native HTML so they follow the theme. Update them by hand if the source diagram changes.
- [assets/vendor/prism/](assets/vendor/prism/) (MIT) and [assets/fonts/](assets/fonts/) (Inter, JetBrains Mono, OFL) are vendored, with license files alongside.

## Checking changes

```bash
python3 -m http.server   # http://localhost:8000
```

Click through the slides you changed at full size and at phone width. Things to watch for: content running into the footer (bottom ~100px of the stage), images too small to read, and code lines that scroll sideways.
