#!/usr/bin/env python3
"""Local server for the LUFÉ review snapshot."""

from __future__ import annotations

import argparse
import html
import json
import mimetypes
import os
import re
import tempfile
from http import HTTPStatus
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any
from urllib.parse import parse_qs, unquote, urlsplit


REVIEW_DIR = Path(__file__).resolve().parent
DEFAULT_NOTES = {"version": 1, "notes": [], "pagesDone": []}
MAX_BODY_BYTES = 5 * 1024 * 1024
INJECTION = (
    '<link rel="stylesheet" href="/__review/annotate.css">'
    '<script src="/__review/annotate.js" defer></script>'
)


def configured_paths(
    site_dir: str | Path | None = None,
    notes_path: str | Path | None = None,
) -> tuple[Path, Path]:
    """Return paths, allowing test fixtures to override the defaults."""
    selected_site = site_dir or os.environ.get("LRV_SITE_DIR") or REVIEW_DIR / "site"
    selected_notes = notes_path or os.environ.get("LRV_NOTES_PATH") or REVIEW_DIR / "notes.json"
    return Path(selected_site).resolve(), Path(selected_notes).resolve()


def atomic_write(path: Path, data: bytes) -> None:
    """Write a file atomically in its destination directory."""
    path.parent.mkdir(parents=True, exist_ok=True)
    descriptor, temporary_name = tempfile.mkstemp(prefix=f".{path.name}.", dir=path.parent)
    try:
        with os.fdopen(descriptor, "wb") as temporary_file:
            temporary_file.write(data)
            temporary_file.flush()
            os.fsync(temporary_file.fileno())
        os.replace(temporary_name, path)
    except Exception:
        try:
            os.unlink(temporary_name)
        except FileNotFoundError:
            pass
        raise


def notes_document(notes_path: Path) -> dict[str, Any]:
    """Load the notes file, creating the required default when absent."""
    if not notes_path.exists():
        atomic_write(notes_path, json.dumps(DEFAULT_NOTES, ensure_ascii=False).encode("utf-8"))
        return dict(DEFAULT_NOTES)
    with notes_path.open(encoding="utf-8") as notes_file:
        return json.load(notes_file)


def snapshot_document(site_dir: Path) -> dict[str, Any]:
    """Return snapshot metadata even before a snapshot has been created."""
    snapshot_path = site_dir / "_snapshot.json"
    if not snapshot_path.exists():
        return {"commit": "", "createdAt": "", "pages": []}
    with snapshot_path.open(encoding="utf-8") as snapshot_file:
        return json.load(snapshot_file)


def inject_review_assets(content: bytes) -> bytes:
    """Add the review files immediately before the page's closing body tag."""
    text = content.decode("utf-8", errors="replace")
    if re.search(r"</body\s*>", text, flags=re.IGNORECASE):
        return re.sub(r"</body\s*>", f"{INJECTION}</body>", text, count=1, flags=re.IGNORECASE).encode("utf-8")
    return f"{text}{INJECTION}".encode("utf-8")


def route_file(site_dir: Path, request_path: str) -> tuple[Path | None, int]:
    """Resolve a request path inside the snapshot without permitting traversal."""
    decoded_path = unquote(request_path)
    if "\\" in decoded_path or any(part == ".." for part in decoded_path.split("/")):
        return None, HTTPStatus.FORBIDDEN

    relative = decoded_path.lstrip("/")
    if not relative:
        candidates = [Path("index.html")]
    else:
        relative_path = Path(relative)
        if relative_path.suffix:
            candidates = [relative_path]
        else:
            candidates = [Path(f"{relative}.html"), relative_path / "index.html", relative_path]

    root = site_dir.resolve()
    for candidate in candidates:
        resolved = (root / candidate).resolve()
        try:
            resolved.relative_to(root)
        except ValueError:
            return None, HTTPStatus.FORBIDDEN
        if resolved.is_file():
            return resolved, HTTPStatus.OK

    fallback = (root / "404.html").resolve()
    try:
        fallback.relative_to(root)
    except ValueError:
        return None, HTTPStatus.FORBIDDEN
    return fallback if fallback.is_file() else None, HTTPStatus.NOT_FOUND


def escaped_note_link(note: dict[str, Any]) -> str:
    page = str(note.get("page", "/"))
    note_id = str(note.get("id", ""))
    return f"{html.escape(page, quote=True)}#__note={html.escape(note_id, quote=True)}"


def display_time(value: Any) -> str:
    return html.escape(str(value or "")) or "未記錄時間"


def render_all_notes(site_dir: Path, notes_path: Path) -> bytes:
    """Render the Chinese all-notes overview."""
    snapshot = snapshot_document(site_dir)
    document = notes_document(notes_path)
    pages = [str(page) for page in snapshot.get("pages", [])]
    done_pages = {str(page) for page in document.get("pagesDone", [])}
    notes = [note for note in document.get("notes", []) if isinstance(note, dict)]
    grouped: dict[str, list[dict[str, Any]]] = {}
    for note in notes:
        grouped.setdefault(str(note.get("page", "/")), []).append(note)

    ordered_pages = pages + sorted(page for page in grouped if page not in pages)
    groups: list[str] = []
    for page in ordered_pages:
        page_notes = grouped.get(page, [])
        if not page_notes:
            continue
        cards: list[str] = []
        for note in page_notes:
            categories = "、".join(str(item) for item in note.get("categories", [])) or "未分類"
            cards.append(
                "<article class=\"lrv-all-note\">"
                f"<p><strong>區段：</strong>{html.escape(str(note.get('heading') or '找不到區段標題'))}</p>"
                f"<blockquote>{html.escape(str(note.get('textSnippet') or '（沒有可讀文字）'))}</blockquote>"
                f"<p><strong>備註：</strong>{html.escape(str(note.get('text') or ''))}</p>"
                f"<p>分類：{html.escape(categories)}　範圍：{html.escape(str(note.get('scope') or '只改這一塊'))}　時間：{display_time(note.get('updatedAt') or note.get('createdAt'))}</p>"
                f"<a href=\"{escaped_note_link(note)}\">去看</a>"
                "</article>"
            )
        groups.append(f"<section><h2>{html.escape(page)}</h2>{''.join(cards)}</section>")

    remaining = [page for page in pages if page not in done_pages]
    remaining_html = "、".join(html.escape(page) for page in remaining) or "全部頁面都已標記看完"
    content = "".join(groups) or "<p>目前還沒有備註。</p>"
    page = f"""<!doctype html>
<html lang=\"zh-Hant\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">
<title>全部備註</title><style>
body{{max-width:900px;margin:0 auto;padding:36px 20px 80px;background:#f7f4ed;color:#24221e;font-family:-apple-system,BlinkMacSystemFont,"PingFang TC","Noto Sans TC",sans-serif;line-height:1.6}} h1,h2{{color:#3a3020}} h2{{margin-top:42px;border-bottom:2px solid #c8a24a;padding-bottom:8px}} .lrv-all-note{{background:#fff;border:1px solid #ddd4c4;border-radius:10px;padding:18px;margin:14px 0}} blockquote{{margin:10px 0;padding-left:14px;border-left:3px solid #c8a24a;color:#5f594e}} a{{color:#6d5318;font-weight:700}} .lrv-progress{{background:#eee4cc;padding:12px 16px;border-radius:8px}} </style></head>
<body><p><a href=\"/\">回到網站</a></p><h1>全部備註</h1>
<p class=\"lrv-progress\">已看完 {len(set(pages) & done_pages)} / {len(pages)}</p>
<p><strong>還沒標記看完：</strong>{remaining_html}</p>{content}</body></html>"""
    return page.encode("utf-8")


def render_mobile(site_dir: Path, selected_path: str) -> bytes:
    """Render the mobile-width snapshot viewer."""
    snapshot = snapshot_document(site_dir)
    pages = [str(page) for page in snapshot.get("pages", [])]
    selected = selected_path if selected_path in pages else (pages[0] if pages else "/")
    options = "".join(
        f'<option value="{html.escape(page, quote=True)}"{" selected" if page == selected else ""}>{html.escape(page)}</option>'
        for page in pages
    )
    page = f"""<!doctype html>
<html lang=\"zh-Hant\"><head><meta charset=\"utf-8\"><meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">
<title>手機寬度看</title><style>
body{{margin:0;background:#e8e2d6;color:#24221e;font-family:-apple-system,BlinkMacSystemFont,"PingFang TC","Noto Sans TC",sans-serif;text-align:center}} header{{position:sticky;top:0;padding:14px;background:#fffdf8;border-bottom:1px solid #d9cfbd;z-index:2}} select{{font:inherit;padding:7px;max-width:90vw}} .lrv-phone{{width:390px;height:844px;max-width:calc(100vw - 24px);margin:24px auto;border:12px solid #28251f;border-radius:30px;background:#fff;box-shadow:0 16px 40px #60584755}} iframe{{display:block;width:390px;height:844px;max-width:100%;border:0;border-radius:18px}} </style></head>
<body><header><label>選擇頁面　<select id=\"page-picker\">{options}</select></label></header>
<div class=\"lrv-phone\"><iframe id=\"phone-page\" title=\"手機寬度預覽\" src=\"{html.escape(selected, quote=True)}\"></iframe></div>
<script>document.getElementById('page-picker').addEventListener('change', function () {{ document.getElementById('phone-page').src = this.value; }});</script></body></html>"""
    return page.encode("utf-8")


class ReviewHandler(BaseHTTPRequestHandler):
    """HTTP handler for snapshot pages and the local review API."""

    server: "ReviewServer"

    def log_message(self, format: str, *args: Any) -> None:
        """Keep terminal output focused on the startup instructions."""

    def send_error(self, code: int, message: str | None = None, explain: str | None = None) -> None:
        """Return a Chinese error page instead of BaseHTTPRequestHandler's English page."""
        labels = {
            HTTPStatus.BAD_REQUEST: "請求內容格式不正確",
            HTTPStatus.FORBIDDEN: "沒有權限存取這個位置",
            HTTPStatus.NOT_FOUND: "找不到這個頁面",
            HTTPStatus.REQUEST_ENTITY_TOO_LARGE: "送出的內容太大",
        }
        title = labels.get(code, "無法完成這個請求")
        body = (
            "<!doctype html><html lang=\"zh-Hant\"><head><meta charset=\"utf-8\">"
            f"<title>{title}</title></head><body><h1>{title}</h1></body></html>"
        ).encode("utf-8")
        self.send_bytes(body, code, "text/html; charset=utf-8")

    def do_GET(self) -> None:
        parsed = urlsplit(self.path)
        if parsed.path == "/__review/annotate.js":
            self.send_file(REVIEW_DIR / "annotate.js", HTTPStatus.OK, False)
            return
        if parsed.path == "/__review/annotate.css":
            self.send_file(REVIEW_DIR / "annotate.css", HTTPStatus.OK, False)
            return
        if parsed.path == "/__review/notes":
            self.send_json(notes_document(self.server.notes_path), HTTPStatus.OK)
            return
        if parsed.path == "/__review/pages":
            self.send_json(snapshot_document(self.server.site_dir), HTTPStatus.OK)
            return
        if parsed.path == "/__review/mobile":
            selected = parse_qs(parsed.query).get("path", ["/"])[0]
            self.send_bytes(render_mobile(self.server.site_dir, selected), HTTPStatus.OK, "text/html; charset=utf-8")
            return
        if parsed.path == "/__review/all":
            self.send_bytes(render_all_notes(self.server.site_dir, self.server.notes_path), HTTPStatus.OK, "text/html; charset=utf-8")
            return

        request_path = parsed.path
        if request_path == "/_next/image":
            # The frozen snapshot has no image optimizer; serve the original file instead.
            request_path = parse_qs(parsed.query).get("url", [""])[0]
            if not request_path.startswith("/"):
                self.send_error(HTTPStatus.NOT_FOUND)
                return
        resolved, status = route_file(self.server.site_dir, request_path)
        if status == HTTPStatus.FORBIDDEN:
            self.send_error(HTTPStatus.FORBIDDEN)
            return
        if resolved is None:
            self.send_error(HTTPStatus.NOT_FOUND)
            return
        self.send_file(resolved, status, resolved.suffix.lower() == ".html")

    def do_POST(self) -> None:
        if urlsplit(self.path).path != "/__review/notes":
            self.send_error(HTTPStatus.NOT_FOUND)
            return

        try:
            content_length = int(self.headers.get("Content-Length", ""))
        except ValueError:
            self.send_error(HTTPStatus.BAD_REQUEST)
            return
        if content_length < 0:
            self.send_error(HTTPStatus.BAD_REQUEST)
            return
        if content_length > MAX_BODY_BYTES:
            self.send_error(HTTPStatus.REQUEST_ENTITY_TOO_LARGE)
            return

        body = self.rfile.read(content_length)
        if len(body) > MAX_BODY_BYTES:
            self.send_error(HTTPStatus.REQUEST_ENTITY_TOO_LARGE)
            return
        try:
            document = json.loads(body.decode("utf-8"))
        except (UnicodeDecodeError, json.JSONDecodeError):
            self.send_error(HTTPStatus.BAD_REQUEST)
            return
        if not isinstance(document, dict) or not isinstance(document.get("notes"), list) or not isinstance(document.get("pagesDone"), list):
            self.send_error(HTTPStatus.BAD_REQUEST)
            return

        notes_path = self.server.notes_path
        if notes_path.exists():
            atomic_write(notes_path.with_name("notes.backup.json"), notes_path.read_bytes())
        encoded = json.dumps(document, ensure_ascii=False, indent=2).encode("utf-8") + b"\n"
        atomic_write(notes_path, encoded)
        self.send_json({"ok": True}, HTTPStatus.OK)

    def send_file(self, path: Path, status: int, inject: bool) -> None:
        if not path.is_file():
            self.send_error(HTTPStatus.NOT_FOUND)
            return
        data = path.read_bytes()
        mime_type = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
        if inject:
            data = inject_review_assets(data)
            mime_type = "text/html; charset=utf-8"
        self.send_bytes(data, status, mime_type)

    def send_json(self, document: dict[str, Any], status: int) -> None:
        self.send_bytes(
            json.dumps(document, ensure_ascii=False).encode("utf-8"),
            status,
            "application/json; charset=utf-8",
        )

    def send_bytes(self, data: bytes, status: int, content_type: str) -> None:
        self.send_response(status)
        self.send_header("Content-Type", content_type)
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)


class ReviewServer(ThreadingHTTPServer):
    """Threading server carrying the snapshot and notes locations."""

    site_dir: Path
    notes_path: Path


def create_server(
    port: int = 8899,
    site_dir: str | Path | None = None,
    notes_path: str | Path | None = None,
) -> ReviewServer:
    """Create a loopback-only server, with paths overridable for tests."""
    selected_site, selected_notes = configured_paths(site_dir, notes_path)
    server = ReviewServer(("127.0.0.1", port), ReviewHandler)
    server.site_dir = selected_site
    server.notes_path = selected_notes
    return server


def main() -> None:
    parser = argparse.ArgumentParser(description="LUFÉ 本機備註工具")
    parser.add_argument("--port", type=int, default=8899)
    arguments = parser.parse_args()
    server = create_server(arguments.port)
    snapshot = snapshot_document(server.site_dir)
    print(f"請在瀏覽器開啟：http://127.0.0.1:{server.server_port}")
    print(f"快照提交版本：{snapshot.get('commit') or '尚未建立快照'}")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\n已停止本機備註工具。")
    finally:
        server.server_close()


if __name__ == "__main__":
    main()
