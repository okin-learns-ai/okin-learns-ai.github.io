"""Compile every Scala example in the docs with scala-cli.

Author: Sanat -- For My Wife Okin

Each <pre data-lang="scala"> block is compiled in its own folder, unless blocks share
data-verify="<group>" (then they compile together). data-verify="skip" skips a block.
File name = first word of data-title if it ends in .scala, else S<n>.scala.

Usage:  python tools/verify_scala.py [page-glob]     e.g. python tools/verify_scala.py "l2/*.html"
Needs scala-cli on PATH (install: cs setup).
"""
import html
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PRE = re.compile(r"<pre\b([^>]*)>(.*?)</pre>", re.S)
ATTR = re.compile(r'([\w-]+)="([^"]*)"')


def main() -> int:
    pattern = sys.argv[1] if len(sys.argv) > 1 else "l*/*.html"
    work = Path(tempfile.mkdtemp(prefix="scala-verify-"))
    dirs: dict[str, Path] = {}
    for page in sorted(ROOT.glob(pattern)):
        for i, m in enumerate(PRE.finditer(page.read_text(encoding="utf-8"))):
            attrs = dict(ATTR.findall(m.group(1)))
            if attrs.get("data-lang") != "scala" or attrs.get("data-verify") == "skip":
                continue
            code = html.unescape(re.sub(r"</?code>", "", m.group(2))).strip("\n")
            first = (attrs.get("data-title") or "").split(" ")[0].split("/")[-1]
            name = first if first.endswith(".scala") else f"S{i}.scala"
            key = f"{page.parent.name}_{page.stem[:2]}_{attrs.get('data-verify', i)}"
            d = dirs.setdefault(key, work / key)
            d.mkdir(exist_ok=True)
            (d / name).write_text(code + "\n", encoding="utf-8")
    failed = []
    cli = shutil.which("scala-cli") or shutil.which("scala-cli.bat")
    for key, d in dirs.items():
        r = subprocess.run([cli, "compile", "--test", "--server=false", str(d)], capture_output=True, text=True)
        ok = r.returncode == 0
        print(f"{'OK  ' if ok else 'FAIL'} {key}  ({', '.join(p.name for p in d.iterdir())})")
        if not ok:
            failed.append(key)
            print("\n".join(l for l in (r.stdout + r.stderr).splitlines() if "[error]" in l or "Error" in l)[:3000])
    print(f"\n{len(dirs) - len(failed)}/{len(dirs)} compiled  (sources in {work})")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
