"""One-shot build for AI Mastery Docs. Run after any content change.

Author: Sanat -- For My Wife Okin

1. Escape stray '<' in <pre> blocks
2. Ensure every page has the mobile / home-screen (PWA) head tags
3. Rebuild the search index
4. Regenerate sw.js (offline cache) with a content-hash version

Usage:  python tools/build.py
"""
import hashlib
import json
import re
from pathlib import Path

import build_search_index
import escape_pre

ROOT = Path(__file__).resolve().parent.parent
MARK = "<!-- pwa -->"
PRECACHE_EXCLUDE = {"sw.js", "README.md", "AGENTS.md", "assets/icons/icon.html"}


def head_tags(root: str) -> str:
    return (
        f'{MARK}\n<link rel="manifest" href="{root}manifest.webmanifest">\n'
        f'<link rel="apple-touch-icon" href="{root}assets/icons/icon-180.png">\n'
        '<meta name="theme-color" content="#5a3fd0">\n'
        '<meta name="apple-mobile-web-app-capable" content="yes">\n'
        '<meta name="mobile-web-app-capable" content="yes">\n'
        '<meta name="apple-mobile-web-app-title" content="AI Mastery">\n'
        '<meta name="apple-mobile-web-app-status-bar-style" content="default">\n'
    )


def ensure_head(path: Path) -> None:
    src = path.read_text(encoding="utf-8")
    if MARK in src or "assets/css/style.css" not in src:
        return
    root = "../" * (len(path.relative_to(ROOT).parts) - 1)
    out = src.replace('content="width=device-width, initial-scale=1"', 'content="width=device-width, initial-scale=1, viewport-fit=cover"')
    out = re.sub(r'(<link rel="stylesheet"[^>]*>\n)', lambda m: m.group(1) + head_tags(root), out, count=1)
    path.write_text(out, encoding="utf-8")
    print(f"pwa tags -> {path.relative_to(ROOT)}")


def write_sw() -> None:
    files, h = [], hashlib.sha256()
    for p in sorted(ROOT.rglob("*")):
        rel = p.relative_to(ROOT).as_posix()
        if not p.is_file() or rel.startswith((".", "tools/")) or "/." in rel or rel in PRECACHE_EXCLUDE:
            continue
        files.append(rel)
        h.update(rel.encode() + p.read_bytes())
    version = h.hexdigest()[:12]
    sw = (ROOT / "tools" / "sw.template.js").read_text(encoding="utf-8")
    sw = sw.replace("__VERSION__", version).replace("__FILES__", json.dumps(["./"] + files, indent=2))
    (ROOT / "sw.js").write_text(sw, encoding="utf-8")
    print(f"sw.js -> version {version}, {len(files)} files")


def main() -> None:
    escape_pre.main()
    for p in sorted(ROOT.rglob("*.html")):
        ensure_head(p)
    build_search_index.main()
    write_sw()


if __name__ == "__main__":
    main()
