"""Escape stray '<' inside <pre> blocks so placeholders like <paste code> render.

Author: Sanat -- For My Wife Okin

Idempotent. Leaves <code> / </code> tags intact.
Usage:  python tools/escape_pre.py
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PRE = re.compile(r"(<pre\b[^>]*>)(.*?)(</pre>)", re.S)
STRAY_LT = re.compile(r"<(?!/?code\b)")


def fix(html: str) -> str:
    return PRE.sub(lambda m: m.group(1) + STRAY_LT.sub("&lt;", m.group(2)) + m.group(3), html)


def main() -> None:
    for path in sorted(ROOT.rglob("*.html")):
        src = path.read_text(encoding="utf-8")
        out = fix(src)
        if out != src:
            path.write_text(out, encoding="utf-8")
            print(f"fixed {path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
