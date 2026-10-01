#!/usr/bin/env python3
"""Build the self-hosted Noto Sans TC subset used by the site."""

from __future__ import annotations

import hashlib
import os
import re
import subprocess
import tempfile
from pathlib import Path
from urllib.request import urlopen

from fontTools.ttLib import TTFont


PROJECT_ROOT = Path(__file__).resolve().parent.parent
FONT_DIRECTORY = PROJECT_ROOT / "src/app/fonts"
FULL_OUTPUT_FONT = FONT_DIRECTORY / "NotoSansTC-subset.woff2"
FULL_CHARSET_FILE = FONT_DIRECTORY / "subset-charset.txt"
CRITICAL_OUTPUT_FONT = FONT_DIRECTORY / "NotoSansTC-critical.woff2"
CRITICAL_CHARSET_FILE = FONT_DIRECTORY / "critical-charset.txt"
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
HERO_SOURCE_FILE = PROJECT_ROOT / "src/components/home/HeroSection.tsx"
NAVBAR_SOURCE_FILE = PROJECT_ROOT / "src/components/Navbar.tsx"
NAVBAR_CRITICAL_PATTERNS = (
    r"const navItems[\s\S]*?^\];",
    r'<Menu(?:Column|Rail)\s+label="([^"]*)"',
    r"<MenuLabel>([^<{]+)</MenuLabel>",
    r"<button\b(?=[^>]*lufe-mobile-cta)[^>]*>[\s\S]*?</button>",
    r"function MessageBoxTrigger[\s\S]*$",
    r'<Link href="/" className="flex items-center gap-2\.5 text-\[17px\] font-semibold">[\s\S]*?</Link>',
)


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


def write_charset(
    charset_file: Path, output_font: Path, covered: list[str], fallback: list[str], sha256: str
) -> None:
    charset_file.write_text(
        "\n".join(
            [
                "# 這個檔是自動產生的，不要手改。產生方式見 scripts/build-font-subset.md",
                f"# sha256={sha256}",
                "#",
                f"# COVERED 這一行是 {output_font.name} 真的畫得出來的字元，共 {len(covered)} 個。",
                f"# FALLBACK 這一行是 Noto Sans TC 本來就沒有、注定由系統字型畫的字元（emoji 等），共 {len(fallback)} 個。",
                "# 這兩行以外的非 ASCII 字元一旦出現在網站上，prebuild 會擋下來。",
                f"COVERED {''.join(covered)}",
                f"FALLBACK {''.join(fallback)}",
                "",
            ]
        ),
        encoding="utf-8",
    )


def build_subset(
    output_font: Path,
    charset_file: Path,
    characters: set[str],
    *,
    include_common_punctuation: bool = True,
    layout_closure: bool = True,
) -> None:
    if include_common_punctuation:
        characters.update(COMMON_PUNCTUATION)
    ordered_characters = sorted(characters, key=ord)

    source_font = download_source_font()
    with tempfile.NamedTemporaryFile(mode="w", encoding="utf-8", delete=False) as character_file:
        character_file.write("".join(ordered_characters))
        character_file_path = Path(character_file.name)

    try:
        command = [
            "pyftsubset",
            str(source_font),
            f"--output-file={output_font}",
            f"--text-file={character_file_path}",
            "--flavor=woff2",
            "--layout-features=*",
        ]
        if not layout_closure:
            command.append("--no-layout-closure")
        command.extend(
            [
                "--no-hinting",
                "--desubroutinize",
                "--name-IDs=0,1,2,3,4,5,6,13,14",
                "--name-legacy",
                "--notdef-outline",
            ]
        )
        subprocess.run(command, check=True)
    finally:
        character_file_path.unlink(missing_ok=True)

    font = TTFont(output_font)
    try:
        cmap = font.getBestCmap()
    finally:
        font.close()

    covered = [character for character in ordered_characters if ord(character) in cmap]
    fallback = [character for character in ordered_characters if ord(character) not in cmap]
    font_sha256 = hashlib.sha256(output_font.read_bytes()).hexdigest()
    write_charset(charset_file, output_font, covered, fallback, font_sha256)
    print(f"Built {output_font.relative_to(PROJECT_ROOT)} ({output_font.stat().st_size // 1024} KB).")
    print(f"Covered {len(covered)} characters; {len(fallback)} use system fallback.")


def main() -> None:
    full_characters = set(chr(codepoint) for codepoint in range(0x20, 0x7F))
    full_characters.update(scan_directory(PROJECT_ROOT / "src", SOURCE_EXTENSIONS))
    full_characters.update(scan_directory(PROJECT_ROOT / ".next/server/app", {".html"}))
    build_subset(FULL_OUTPUT_FONT, FULL_CHARSET_FILE, full_characters)

    critical_characters = non_ascii_characters(HERO_SOURCE_FILE)
    navbar_source = NAVBAR_SOURCE_FILE.read_text(encoding="utf-8")
    for pattern in NAVBAR_CRITICAL_PATTERNS:
        for match in re.findall(pattern, navbar_source, re.MULTILINE):
            critical_characters.update(character for character in match if ord(character) >= 0x80)
    build_subset(
        CRITICAL_OUTPUT_FONT,
        CRITICAL_CHARSET_FILE,
        critical_characters,
        include_common_punctuation=False,
        layout_closure=False,
    )


if __name__ == "__main__":
    main()
