<!-- Author: Sanat -->

# Workspace Rules — ai-mastery-docs

**Author:** Sanat · **Dedication:** For My Wife Okin

1. Read `README.md` first.
2. Pure static HTML/CSS/JS. Must open from `file://` with no server, no CDN, no
   internet. Do not add external scripts, fonts or `fetch()` calls.
3. Every page has the dedication/author line and the standard page shell
   (copy an existing `l1/*.html` or `l2/*.html` page).
4. Generic content only. Do not mention the author's employers, clients or the
   vendors he works with, or the reader's employer. Tools may be named as
   generic market examples.
5. Code examples are in Scala (Scala 3) and Python.
6. Diagrams are inline SVG using the `d-*` CSS classes so they work in dark mode.
7. After adding/editing pages: register in `assets/js/nav.js`, then run
   `python tools/build.py` (escapes `<pre>`, adds PWA head tags, rebuilds the
   search index and `sw.js`).
8. AI tooling changes fast: put a "Last verified" date on tool-specific pages.
9. Hosting: GitHub Pages from `main` / root of
   `okin-learns-ai/okin-learns-ai.github.io` (free GitHub org). Live at
   https://okin-learns-ai.github.io/. Deploy = build, commit, `git push`.
10. Verify code before publishing: `python tools/verify_scala.py` (needs
    scala-cli; installed via Coursier at `~/AppData/Local/Coursier/data/bin`,
    JDK via `cs java-home`) and `python tools/verify_python.py` (run with a
    venv that has pydantic, httpx, pytest, hypothesis, mcp). Use
    `data-verify="<group>|run|skip"` on `<pre>` blocks.
11. Level 2+ running example: a generic retail "Store Assistant" domain
    (products/SKUs, store inventory, orders, pickup, returns). Keep it generic.
