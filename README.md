# seceng.guide

Slides for **DIY Continuous Security**, a hands-on security engineering workshop, hosted at <https://seceng.guide/>.

You've just been hired as the first security engineer at _Jester Social_, a (made-up) startup with no security controls. Over the workshop you fork the [Jester Social app](https://github.com/Astarte-Security/Jester-Social) and build a continuous security program around it, using GitHub Actions and free tools:

| Part | Topic | Labs |
| --- | --- | --- |
| 01 | Introduction | |
| 02 | GitHub setup | Fork the app |
| 03 | SAST | Semgrep as a GitHub Action, Testing our SAST Action |
| 04 | DAST | Nuclei, ZAP, Nmap |
| 05 | SCA | Dependabot |
| 06 | Secrets scanning | |
| 07 | AI SAST | Claude Code security review (optional) |

## Using the slides

- **Navigate** with <kbd>←</kbd> <kbd>→</kbd>, <kbd>Space</kbd>, or a presentation clicker (<kbd>Page Up</kbd> / <kbd>Page Down</kbd>). Swipe on touch screens.
- <kbd>M</kbd> opens the slide menu, <kbd>G</kbd> jumps to a slide number, <kbd>T</kbd> toggles light/dark, <kbd>F</kbd> goes fullscreen.
- Every code block has a **Copy** button. Use it for the workflow files: YAML is whitespace-sensitive.
- Click any screenshot to zoom in.
- Links like `seceng.guide/#38` open a specific slide. Part dividers also have names, e.g. `#sast`, `#lab-nuclei`.
- On a phone, the deck becomes a scrolling page.
- Print (or "Save as PDF") produces one slide per page, which is handy as a backup.

## Running it locally

The deck is plain HTML, CSS, and JavaScript, with no build step. Fonts, syntax highlighting, and screenshots are all bundled, so it works offline (useful on conference Wi‑Fi):

```bash
python3 -m http.server
# then open http://localhost:8000
```

## Repository layout

- [content/](content/) — the workshop guides in Markdown. This is the source material for the slides.
- [index.html](index.html) — the slides themselves, one `<section class="slide">` each.
- [styles.css](styles.css), [script.js](script.js) — the slide layout and the navigator.
- [assets/](assets/) — screenshots, fonts, and the vendored [Prism](https://prismjs.com/) highlighter.

## License

Content is licensed under [CC BY 4.0](LICENSE). Bundled third-party assets keep their own licenses: Prism (MIT, [assets/vendor/prism/LICENSE](assets/vendor/prism/LICENSE)), and the Inter and JetBrains Mono fonts (SIL OFL 1.1, [assets/fonts/](assets/fonts/)).
