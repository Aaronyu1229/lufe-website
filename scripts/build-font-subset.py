#!/usr/bin/env python3
"""Build the self-hosted Noto Sans TC subset used by the site."""

from __future__ import annotations

import hashlib
import os
import subprocess
import tempfile
from pathlib import Path
from urllib.request import urlopen

from fontTools.ttLib import TTFont


PROJECT_ROOT = Path(__file__).resolve().parent.parent
FONT_DIRECTORY = PROJECT_ROOT / "src/app/fonts"
OUTPUT_FONT = FONT_DIRECTORY / "NotoSansTC-subset.woff2"
CHARSET_FILE = FONT_DIRECTORY / "subset-charset.txt"
CACHE_DIRECTORY = PROJECT_ROOT / ".font-cache"
SOURCE_FONT = CACHE_DIRECTORY / "NotoSansTC[wght].ttf"
SOURCE_URL = (
    "https://github.com/google/fonts/raw/main/ofl/notosanstc/"
    "NotoSansTC%5Bwght%5D.ttf"
)
SOURCE_EXTENSIONS = {".ts", ".tsx", ".css", ".json"}

# These are already in the production subset but are not necessarily present as
# literal source text. Keep them so ordinary punctuation changes stay covered.
COMMON_PUNCTUATION = "°÷‘’“”‧※↑↓↘■□▲▼◆○☆　〈〉『』【】〔〕＃＄％＆＊＋－．／＝＠＼｜～"


def non_ascii_characters(path: Path) -> set[str]:
    return {character for character in path.read_text(encoding="utf-8") if ord(character) >= 0x80}


def scan_directory(directory: Path, extensions: set[str]) -> set[str]:
    if not directory.exists():
        return set()

    characters: set[str] = set()
    for current_directory, directory_names, file_names in os.walk(directory):
        directory_names[:] = sorted(
            name for name in directory_names if name != "node_modules" and not name.startswith(".")
        )
        for file_name in sorted(file_names):
            path = Path(current_directory) / file_name
            if path.suffix in extensions:
                characters.update(non_ascii_characters(path))
    return characters


def download_source_font() -> Path:
    if SOURCE_FONT.exists():
        return SOURCE_FONT

    CACHE_DIRECTORY.mkdir(parents=True, exist_ok=True)
    with urlopen(SOURCE_URL) as response, tempfile.NamedTemporaryFile(
        dir=CACHE_DIRECTORY, delete=False
    ) as temporary_file:
        temporary_file.write(response.read())
        temporary_path = Path(temporary_file.name)
    temporary_path.replace(SOURCE_FONT)
    return SOURCE_FONT


def write_charset(covered: list[str], fallback: list[str], sha256: str) -> None:
    CHARSET_FILE.write_text(
        "\n".join(
            [
                "# 這個檔是自動產生的，不要手改。產生方式見 scripts/build-font-subset.md",
                f"# sha256={sha256}",
                "#",
                f"# COVERED 這一行是 NotoSansTC-subset.woff2 真的畫得出來的字元，共 {len(covered)} 個。",
                f"# FALLBACK 這一行是 Noto Sans TC 本來就沒有、注定由系統字型畫的字元（emoji 等），共 {len(fallback)} 個。",
                "# 這兩行以外的非 ASCII 字元一旦出現在網站上，prebuild 會擋下來。",
                f"COVERED {''.join(covered)}",
                f"FALLBACK {''.join(fallback)}",
                "",
            ]
        ),
        encoding="utf-8",
    )


def main() -> None:
    characters = set(chr(codepoint) for codepoint in range(0x20, 0x7F))
    characters.update(COMMON_PUNCTUATION)
    characters.update(scan_directory(PROJECT_ROOT / "src", SOURCE_EXTENSIONS))
    characters.update(scan_directory(PROJECT_ROOT / ".next/server/app", {".html"}))
    ordered_characters = sorted(characters, key=ord)

    source_font = download_source_font()
    with tempfile.NamedTemporaryFile(mode="w", encoding="utf-8", delete=False) as character_file:
        character_file.write("".join(ordered_characters))
        character_file_path = Path(character_file.name)

    try:
        subprocess.run(
            [
                "pyftsubset",
                str(source_font),
                f"--output-file={OUTPUT_FONT}",
                f"--text-file={character_file_path}",
                "--flavor=woff2",
                "--layout-features=*",
                "--no-hinting",
                "--desubroutinize",
                "--name-IDs=0,1,2,3,4,5,6,13,14",
                "--name-legacy",
                "--notdef-outline",
            ],
            check=True,
        )
    finally:
        character_file_path.unlink(missing_ok=True)

    font = TTFont(OUTPUT_FONT)
    try:
        cmap = font.getBestCmap()
    finally:
        font.close()

    covered = [character for character in ordered_characters if ord(character) in cmap]
    fallback = [character for character in ordered_characters if ord(character) not in cmap]
    font_sha256 = hashlib.sha256(OUTPUT_FONT.read_bytes()).hexdigest()
    write_charset(covered, fallback, font_sha256)
    print(f"Built {OUTPUT_FONT.relative_to(PROJECT_ROOT)} ({OUTPUT_FONT.stat().st_size // 1024} KB).")
    print(f"Covered {len(covered)} characters; {len(fallback)} use system fallback.")


if __name__ == "__main__":
    main()
