# seceng.guide

Single-page presentation site for the **DIY Continuous Security** workshop, hosted at <https://seceng.guide> via GitHub Pages. The deck lives in [index.html](index.html); there is no build step.

## What this project is

- A slide deck rendered as a static site. Each slide is a `<section class="slide" data-slide="N">` inside `<main id="deck">` in [index.html](index.html). One section is visible at a time; the rest are `display: none` until activated by the navigator in [script.js](script.js).
- Audience: AppSec practitioners, engineers transitioning into security, first security hires. The tone is practical and tool-agnostic — content emphasizes **concepts** over specific tools.
- Content originates from sibling markdown files (e.g. [1-Intro.md](1-Intro.md), [2-SAST.md](2-SAST.md)). Each `#` heading in those files corresponds to one slide. When the user asks to "add the rest of X.md," that's the convention: split on `#` headings, convert each section into a `<section class="slide">`.

## How slides work

- **Numbering**: the total is computed at runtime from `document.querySelectorAll(".slide")`, so adding a slide just works — the bottom-right counter and the URL hash (`#3`) update automatically. The `data-slide="N"` attribute is informational; DOM order is what matters.
- **Navigation**: arrow keys / `Page Up`-`Down` / `Space`, plus hover-revealed `‹ ›` arrows next to the bottom-right counter, plus click-the-counter to type a slide number, plus a Home button in the settings menu. The current index is mirrored to `location.hash` so deep links and refreshes preserve position.
- **Adding a slide**: drop a new `<section class="slide" data-slide="N">…</section>` anywhere in the existing list. No JS or counter updates needed.

## Slide content patterns

Existing slides use a small vocabulary of classes — prefer these over inventing new ones:

- `<h2>` — slide title (auto-colored via `--link`).
- `<p class="lead">` — short intro paragraph that introduces a `<ul class="bullets">` list. The pair `lead + bullets` is the dominant content pattern.
- `<ul class="bullets">` — bullet list with tightened spacing; nests cleanly.
- `<ol class="steps">` — numbered steps (used on the "Getting started" slide).
- `<pre class="code-block"><code class="language-X">…</code></pre>` — multi-line code. Prism.js highlights it; the autoloader handles language fetches, so any `language-X` works (`python`, `bash`, `java`, `diff`, etc.). Code blocks intentionally render dark even in light mode so the `prism-tomorrow` theme stays readable.
- Inline `<code>` — small chips styled with `--rule` background.
- `<figure class="image-placeholder">Image: …</figure>` — placeholder for an image we haven't sourced yet (dashed border, italic). Replace with `<img>` when the asset lands.
- `.title-slide` — centered title layout (used for slide 1 and section dividers like the SAST slide). Add `.section-slide` and a `<p class="eyebrow">Part N</p>` for chapter dividers.
- `.agenda` / `.agenda-section` — two-column layout used on the Agenda slide.

## Theming and chrome

Three pieces of fixed UI chrome layer on top of the deck:

- **Top-left** — hover-revealed sun/moon icon (`☼` / `⏾`) toggles `body.light-mode`. Choice persists in `localStorage["theme"]`.
- **Top-right** — gear (`⚙`) opens a settings dropdown:
  - Font picker (Sans / Serif / Mono) sets the `--font-family` CSS variable via a `body.font-*` class. Persisted in `localStorage["font"]`.
  - Accent swatches set `--link` inline on `<body>`, overriding the per-mode default. Persisted in `localStorage["accent"]`. The "default" swatch removes the override and lets the mode-aware default win.
  - GitHub link → <https://github.com/Astarte-Security/seceng.guide>.
  - Home → `show(0)`.
- **Bottom-right** — slide counter + hover-revealed prev/next arrows. Click the counter to type a slide number.

All chrome reveals are time-bounded: hover-revealed elements disappear ~3s after `mouseleave`.

## CSS variables (the theme tokens)

Defined on `:root` for dark mode and overridden on `body.light-mode`:

- `--bg`, `--fg`, `--muted` — base palette.
- `--rule` — borders/dividers (also the inline-`<code>` background).
- `--accent` — the "secondary" color used for the eyebrow label, agenda subheads, and the date dot. Stays blue in both modes.
- `--link` — the "primary" color used for slide titles (`h1`, `h2`) and links. Gold in dark, dark-purple in light. **This is the variable the settings-panel accent picker overrides.**
- `--code-bg` — always dark, regardless of mode.

When picking colors for new components, route through these variables so light/dark and the user's accent override Just Work.

## Things that aren't obvious from the code

- The title-slide date is rendered dynamically via `new Date().toLocaleDateString(...)` — don't hardcode a date.
- The slide counter UI swaps its inner spans for an `<input>` when entering jump-to-slide mode; if you re-render the counter, do it via `renderCounter()` so refs stay consistent.
- When the user says "add slides from N-Topic.md," they mean: convert each `#` heading verbatim, render its body content using the patterns above, and append after the last existing slide. Source typos in code samples have historically been silently fixed (e.g. broken syntax in pasted Python) — flag the change in the response so the user can revert if they wanted it preserved.
- The `.title-slide` layout has an absolutely-positioned `.hint` ("Use ← → to navigate"). Section dividers reuse `.title-slide` but should *not* repeat the hint.

## Local preview

No tooling required. From the repo root:

```bash
python3 -m http.server
# then open http://localhost:8000
```

The CNAME and GitHub Pages handle the production deploy.
