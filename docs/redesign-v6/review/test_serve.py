#!/usr/bin/env python3
"""Tests for the local LUFÉ review server."""

from __future__ import annotations

import json
import sys
import tempfile
import threading
import unittest
from pathlib import Path
from urllib.error import HTTPError
from urllib.request import Request, urlopen

sys.path.insert(0, str(Path(__file__).resolve().parent))

from serve import MAX_BODY_BYTES, create_server


class ReviewServerTests(unittest.TestCase):
    """Exercise routes and note persistence against a temporary snapshot."""

    def setUp(self) -> None:
        self.temporary_directory = tempfile.TemporaryDirectory()
        self.root = Path(self.temporary_directory.name)
        self.site_dir = self.root / "site"
        self.site_dir.mkdir()
        self.notes_path = self.root / "notes.json"
        self.write_site_file("index.html", "<html><body>首頁</body></html>")
        self.write_site_file("about.html", "<html><body>關於我們</body></html>")
        self.write_site_file("insights/topic.html", "<html><body>文章</body></html>")
        self.write_site_file("folder/index.html", "<html><body>資料夾首頁</body></html>")
        self.write_site_file("404.html", "<html><body>找不到頁面</body></html>")
        self.write_site_file("plain.txt", "plain text")
        self.write_site_file("_snapshot.json", json.dumps({"commit": "abc", "pages": ["/", "/about", "/insights/topic", "/folder"]}))
        self.server = create_server(0, self.site_dir, self.notes_path)
        self.thread = threading.Thread(target=self.server.serve_forever, daemon=True)
        self.thread.start()
        self.base_url = f"http://127.0.0.1:{self.server.server_port}"

    def tearDown(self) -> None:
        self.server.shutdown()
        self.server.server_close()
        self.thread.join(timeout=2)
        self.temporary_directory.cleanup()

    def write_site_file(self, relative_path: str, content: str) -> None:
        path = self.site_dir / relative_path
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(content, encoding="utf-8")

    def request(self, path: str, body: bytes | None = None, content_length: int | None = None) -> tuple[int, bytes]:
        request = Request(f"{self.base_url}{path}", data=body, method="POST" if body is not None else "GET")
        if body is not None:
            request.add_header("Content-Type", "application/json")
        if content_length is not None:
            request.add_header("Content-Length", str(content_length))
        try:
            with urlopen(request) as response:
                return response.status, response.read()
        except HTTPError as error:
            error_body = error.read()
            error.close()
            return error.code, error_body

    def test_url_resolution_for_pages_and_fallbacks(self) -> None:
        cases = {
            "/": "首頁",
            "/about": "關於我們",
            "/insights/topic": "文章",
            "/folder": "資料夾首頁",
        }
        for path, expected in cases.items():
            with self.subTest(path=path):
                status, body = self.request(path)
                self.assertEqual(status, 200)
                self.assertIn(expected.encode("utf-8"), body)

        status, body = self.request("/does-not-exist")
        self.assertEqual(status, 404)
        self.assertIn("找不到頁面".encode("utf-8"), body)

    def test_traversal_is_rejected_including_encoded_segments(self) -> None:
        for path in ("/../package.json", "/%2e%2e/package.json"):
            with self.subTest(path=path):
                status, _ = self.request(path)
                self.assertEqual(status, 403)

    def test_html_injection_is_not_applied_to_non_html_files(self) -> None:
        status, html_body = self.request("/about")
        self.assertEqual(status, 200)
        self.assertIn(b'/__review/annotate.css', html_body)
        self.assertIn(b'/__review/annotate.js', html_body)

        status, text_body = self.request("/plain.txt")
        self.assertEqual(status, 200)
        self.assertEqual(text_body, b"plain text")

    def test_notes_get_creates_the_default_document(self) -> None:
        status, body = self.request("/__review/notes")
        self.assertEqual(status, 200)
        self.assertEqual(json.loads(body), {"version": 1, "notes": [], "pagesDone": []})
        self.assertTrue(self.notes_path.exists())

    def test_valid_post_writes_notes_and_keeps_a_backup(self) -> None:
        previous = {"version": 1, "notes": [{"id": "old"}], "pagesDone": []}
        self.notes_path.write_text(json.dumps(previous), encoding="utf-8")
        replacement = {"version": 1, "notes": [{"id": "new"}], "pagesDone": ["/"]}

        status, body = self.request("/__review/notes", json.dumps(replacement).encode("utf-8"))
        self.assertEqual(status, 200)
        self.assertEqual(json.loads(body), {"ok": True})
        self.assertEqual(json.loads(self.notes_path.read_text(encoding="utf-8")), replacement)
        backup = self.notes_path.with_name("notes.backup.json")
        self.assertEqual(json.loads(backup.read_text(encoding="utf-8")), previous)

    def test_invalid_posts_leave_the_existing_notes_untouched(self) -> None:
        original = {"version": 1, "notes": [], "pagesDone": []}
        self.notes_path.write_text(json.dumps(original), encoding="utf-8")
        invalid_bodies = [
            (json.dumps(["不是物件"]).encode("utf-8"), None),
            (json.dumps({"notes": []}).encode("utf-8"), None),
            (b"{}", MAX_BODY_BYTES + 1),
        ]
        for body, advertised_length in invalid_bodies:
            with self.subTest(size=advertised_length or len(body)):
                status, _ = self.request("/__review/notes", body, advertised_length)
                self.assertIn(status, (400, 413))
                self.assertEqual(json.loads(self.notes_path.read_text(encoding="utf-8")), original)


if __name__ == "__main__":
    unittest.main(verbosity=2)
