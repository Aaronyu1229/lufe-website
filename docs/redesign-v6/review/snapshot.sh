#!/usr/bin/env bash

set -uo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../.." && pwd)"
review_dir="$repo_root/docs/redesign-v6/review"
site_dir="$review_dir/site"
app_dir="$repo_root/.next/server/app"
pages_file="$(mktemp)"

cleanup() {
  rm -f "$pages_file"
}
trap cleanup EXIT

cd "$repo_root"

until mkdir /tmp/lufe-build.lock 2>/dev/null; do sleep 30; done
npm run build; rc=$?
rmdir /tmp/lufe-build.lock

if [ "$rc" -ne 0 ]; then
  exit "$rc"
fi

rm -rf "$site_dir"
mkdir -p "$site_dir"

while IFS= read -r -d '' source_file; do
  relative_path="${source_file#"$app_dir"/}"
  file_name="$(basename "$relative_path")"

  case "$file_name" in
    _global-error*)
      continue
      ;;
    _not-found.html)
      destination="404.html"
      ;;
    _not-found*)
      continue
      ;;
    *)
      case "$relative_path" in
        page.html)
          destination="index.html"
          ;;
        */page.html)
          destination="${relative_path%/page.html}.html"
          ;;
        *)
          destination="$relative_path"
          ;;
      esac
      ;;
  esac

  mkdir -p "$site_dir/$(dirname "$destination")"
  cp "$source_file" "$site_dir/$destination"

  if [ "$destination" != "404.html" ]; then
    printf '%s\n' "$destination" >> "$pages_file"
  fi
done < <(find "$app_dir" -type f -name '*.html' -print0)

if [ -d "$repo_root/.next/static" ]; then
  mkdir -p "$site_dir/_next/static"
  cp -R "$repo_root/.next/static/." "$site_dir/_next/static/"
fi

if [ -d "$repo_root/public" ]; then
  cp -R "$repo_root/public/." "$site_dir/"
fi

git_commit="$(git rev-parse HEAD)"
python3 - "$site_dir" "$pages_file" "$git_commit" <<'PY'
import datetime
import json
import pathlib
import sys

site_dir = pathlib.Path(sys.argv[1])
pages_file = pathlib.Path(sys.argv[2])
commit = sys.argv[3]


def page_path(destination: str) -> str:
    path = pathlib.PurePosixPath(destination)
    if path.name == "index.html":
        route = path.parent.as_posix()
        return "/" if route == "." else f"/{route}"
    return f"/{path.with_suffix('').as_posix()}"


pages = sorted({page_path(line.strip()) for line in pages_file.read_text().splitlines() if line.strip()})
payload = {
    "commit": commit,
    "createdAt": datetime.datetime.now(datetime.timezone.utc).isoformat().replace("+00:00", "Z"),
    "pages": pages,
}
(site_dir / "_snapshot.json").write_text(
    json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
    encoding="utf-8",
)
PY
