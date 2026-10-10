<!--
Author: Sanat
Dedication: For My Wife Okin
-->

# AI Mastery — From Beginner to Expert

A self-contained, offline HTML learning site that takes a developer from zero AI
knowledge to expert-level practice: AI concepts, LLMs, prompting, context
engineering, AI in the IDE (VS Code, IntelliJ IDEA, Xcode), instructions/skills/
agents, MCP, tools, AI across IT, learning faster with AI, and safety.

Examples are written in **Scala** and **Python**.

**For My Wife Okin · Author: Sanat**

## How to open

No server, no build, no internet required. Double-click `index.html`.

To share: zip the whole folder and send it. The recipient unzips and opens
`index.html`.

## Structure

```
index.html            Home + how to use these docs
roadmap.html          Full Beginner -> Expert curriculum (all levels, all tracks)
glossary.html         A-Z AI terminology
l1/                   Level 1 - Foundations (Beginner)  [Phase 1]
l2/ ... l5/           Future levels (Practitioner, Advanced, Expert, Master)
assets/css/style.css  Theme (light/dark), layout, diagrams
assets/js/nav.js      Single source of truth for the sidebar navigation
assets/js/app.js      Sidebar, search, dark mode, progress, copy buttons, quizzes
assets/js/search-index.js  Generated full-text search index
tools/build_search_index.py  Regenerates the search index
```

## Adding or editing a page

1. Copy an existing page in `l1/` as a template.
2. Register it in `assets/js/nav.js`.
3. Run `python tools/build_search_index.py`.
4. Open `index.html` and check it.

## Phases

| Phase | Level | Status |
|------|-------|--------|
| 1 | L1 Foundations (Beginner) | Done |
| 2 | L2 Practitioner | Done |
| 3 | L3 Advanced | Planned |
| 4 | L4 Expert | Planned |
| 5 | L5 Master / Specialist tracks | Planned |
