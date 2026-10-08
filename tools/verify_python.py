"""Check every Python example in the docs.

Author: Sanat -- For My Wife Okin

- Every <pre data-lang="python"> block is byte-compiled.
- Blocks whose data-title starts with test_*.py are run with pytest.
- Blocks with data-verify="run" are executed (must exit 0 within 60 s).

Usage:  python tools/verify_python.py [page-glob]   (run with a Python that has
        pydantic, httpx, pytest, hypothesis and mcp installed, e.g. a venv)
"""
import html
import re
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PRE = re.compile(r"<pre\b([^>]*)>(.*?)</pre>", re.S)
ATTR = re.compile(r'([\w-]+)="([^"]*)"')


def main() -> int:
    pattern = sys.argv[1] if len(sys.argv) > 1 else "l*/*.html"
    work = Path(tempfile.mkdtemp(prefix="py-verify-"))
    failed = 0
    total = 0
    for page in sorted(ROOT.glob(pattern)):
        for i, m in enumerate(PRE.finditer(page.read_text(encoding="utf-8"))):
            attrs = dict(ATTR.findall(m.group(1)))
            if attrs.get("data-lang") != "python" or attrs.get("data-verify") == "skip":
                continue
            total += 1
            code = html.unescape(re.sub(r"</?code>", "", m.group(2))).strip("\n")
            first = (attrs.get("data-title") or "").split(" ")[0].split("/")[-1].rstrip(":")
            name = first if first.endswith(".py") else f"snippet_{i}.py"
            d = work / f"{page.parent.name}_{page.stem[:2]}_{i}"
            d.mkdir()
            f = d / name
            f.write_text(code + "\n", encoding="utf-8")
            if name.startswith("test_"):
                mode, cmd = "pytest", [sys.executable, "-m", "pytest", "-q", str(f)]
            elif attrs.get("data-verify") == "run":
                mode, cmd = "run", [sys.executable, str(f)]
            else:
                mode, cmd = "compile", [sys.executable, "-m", "py_compile", str(f)]
            r = subprocess.run(cmd, capture_output=True, text=True, timeout=60, cwd=d)
            ok = r.returncode == 0
            failed += not ok
            print(f"{'OK  ' if ok else 'FAIL'} {d.name}/{name}  [{mode}]")
            if not ok:
                print((r.stdout + r.stderr)[-2000:])
    print(f"\n{total - failed}/{total} passed")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
