<!-- Author: Sanat -->

# Workspace Rules — ai-mastery-docs

**Author:** Sanat · **Dedication:** For My Wife Okin

1. Read `README.md` first.
2. Pure static HTML/CSS/JS. Must open from `file://` with no server, no CDN, no
   internet. Do not add external scripts, fonts or `fetch()` calls.
3. Every page has the dedication/author line and the standard page shell
   (copy an existing `l1/*.html` page).
4. Generic content only. Do not mention the author's employers, clients or the
   vendors he works with. Tools may be named as generic market examples.
5. Code examples are in Scala (Scala 3) and Python.
6. Diagrams are inline SVG using the `d-*` CSS classes so they work in dark mode.
7. After adding/editing pages: register in `assets/js/nav.js`, then run
   `python tools/build_search_index.py`.
8. AI tooling changes fast: put a "Last verified" date on tool-specific pages.
