#!/usr/bin/env bash
set -euo pipefail

RELEASE_COMMIT="e42a62d8f9980ead08ea9ae9880c29e124f19364"
PACKAGE="$RUNNER_TEMP/portfolio-release.gz"
INNER="$RUNNER_TEMP/portfolio-release-inner.bin"
SOURCE="$RUNNER_TEMP/portfolio-release-source"
FINAL="$RUNNER_TEMP/yash-portfolio-final"

rm -rf "$PACKAGE" "$INNER" "$SOURCE" "$FINAL"
mkdir -p "$SOURCE" "$FINAL/assets/fonts" "$FINAL/assets/portraits" "$FINAL/assets/projects"

for part in \
  portfolio-source.gz.b64.part00 \
  portfolio-source.gz.b64.part01a \
  portfolio-source.gz.b64.part01b \
  portfolio-source.gz.b64.part01c \
  portfolio-source.gz.b64.part02 \
  portfolio-source.gz.b64.part03
do
  git show "$RELEASE_COMMIT:.release/$part"
done | tr -d '\r\n' | base64 --decode > "$PACKAGE"

echo "30885c0151f97ab7ca6aafb438d81ec3690b34fce903f724a18768ec584f159e  $PACKAGE" | sha256sum --check -
gzip -dc "$PACKAGE" > "$INNER"

echo "Detected archive formats:"
file "$PACKAGE" "$INNER" || true
xxd -l 32 "$INNER" || true

if unzip -tqq "$INNER" >/dev/null 2>&1; then
  echo "Extracting inner ZIP archive"
  unzip -q "$INNER" -d "$SOURCE"
elif tar -tf "$INNER" >/dev/null 2>&1; then
  echo "Extracting inner TAR archive"
  tar -xf "$INNER" -C "$SOURCE"
elif command -v 7z >/dev/null 2>&1 && 7z t "$INNER" >/dev/null 2>&1; then
  echo "Extracting inner archive with 7-Zip"
  7z x -y "-o$SOURCE" "$INNER" >/dev/null
elif command -v bsdtar >/dev/null 2>&1 && bsdtar -tf "$INNER" >/dev/null 2>&1; then
  echo "Extracting inner archive with bsdtar"
  bsdtar -xf "$INNER" -C "$SOURCE"
else
  echo "Unable to identify or extract the inner release archive"
  command -v 7z >/dev/null 2>&1 && 7z l "$INNER" || true
  exit 1
fi
rm -rf "$SOURCE/__MACOSX"

marker="$(find "$SOURCE" -type f -path '*/assets/fonts/barlow-400.woff2' -print -quit)"
test -n "$marker" || { echo "Could not locate extracted asset root"; find "$SOURCE" -maxdepth 4 -type f -print | head -100; exit 1; }
SOURCE_ROOT="${marker%/assets/fonts/barlow-400.woff2}"
echo "Using source root: $SOURCE_ROOT"

while read -r path; do
  test -f "$SOURCE_ROOT/$path" || { echo "Missing extracted file: $path"; exit 1; }
  mkdir -p "$FINAL/$(dirname "$path")"
  cp "$SOURCE_ROOT/$path" "$FINAL/$path"
done <<'EOF'
README.txt
START_LOCALHOST.bat
START_LOCALHOST.ps1
assets/fonts/barlow-400.woff2
assets/fonts/barlow-600.woff2
assets/fonts/barlow-800.woff2
assets/fonts/recursive.woff2
assets/portraits/yash-real-builder.webp
assets/portraits/yash-real-editorial.webp
assets/portraits/yash-real-hero.webp
assets/projects/brace-interface-home.webp
assets/projects/campusmate-home.webp
assets/projects/fakhri-mart-home.webp
assets/projects/interactive-quiz-home.webp
assets/projects/lernio-ai-home.webp
assets/projects/yash-portfolio-hero-portrait.webp
EOF

cat .source/app_js.part* > "$FINAL/app.js"
cat .source/index_html.part* > "$FINAL/index.html"
cat .source/styles_css.part* > "$FINAL/styles.css"
printf '.DS_Store\nThumbs.db\n.vercel\nnode_modules\n' > "$FINAL/.gitignore"
printf '%s' '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#050606"/><path d="M13 14h11l8 14 8-14h11L37 37v13H27V37z" fill="#d8ff36"/></svg>' > "$FINAL/assets/favicon.svg"
printf '%s' '{"cleanUrls":true,"trailingSlash":false,"headers":[{"source":"/(.*)","headers":[{"key":"X-Content-Type-Options","value":"nosniff"},{"key":"Referrer-Policy","value":"strict-origin-when-cross-origin"}]},{"source":"/assets/(.*)","headers":[{"key":"Cache-Control","value":"public, max-age=31536000, immutable"}]}]}' > "$FINAL/vercel.json"

while read -r expected path; do
  test -f "$FINAL/$path" || { echo "Missing final file: $path"; exit 1; }
  actual="$(git hash-object "$FINAL/$path")"
  test "$actual" = "$expected" || {
    echo "Integrity mismatch for $path: expected $expected, got $actual"
    exit 1
  }
done <<'EOF'
aa3125d016ae0e7af72bda44835fe78e1ad49473 .gitignore
d9ed0678567d44da637a520fddd3e2fed7d2ebc9 README.txt
49671a2284407dca502f264fd2b85dea7ce44a07 START_LOCALHOST.bat
5e5b1d2e76e5f3b0b5ff7ebc7c3937d462ef7447 START_LOCALHOST.ps1
f9c2b1d2ec9c84969050fbf8a2b9760e19de5f40 app.js
9b802f4c9bbb7cd88f09704da015ee974164b395 assets/favicon.svg
ebb34ad5e06d85a074c6f2d3718757bdabc9e731 assets/fonts/barlow-400.woff2
da60c9a90e758f7924dfac415f24961ee74c59c9 assets/fonts/barlow-600.woff2
33c8a26ee2cd79dc94efb1b5a0364b250693d47e assets/fonts/barlow-800.woff2
0dece81f4e183e9b7dd79f9f0a6f97a06c2f89d3 assets/fonts/recursive.woff2
61fb9d8d9a47768f14f1e0312859f5b451026360 assets/portraits/yash-real-builder.webp
1d205617c0fa7fcc239a6be41902433ec271fa7a assets/portraits/yash-real-editorial.webp
ef173bfb71ec62c9d7340b4543f6326252601b52 assets/portraits/yash-real-hero.webp
786888308d18addddb81c98680f7b2dc92a4838f assets/projects/brace-interface-home.webp
f885ff7f06ff6b8e9442483a524140a317a121c1 assets/projects/campusmate-home.webp
b12f64f372c34d3b811c19eb055e15e4f85b717f assets/projects/fakhri-mart-home.webp
1f2e4fb91f5dfbf882fbf62f741a009db72c89f8 assets/projects/interactive-quiz-home.webp
71a0524373dd22cc7538751d9ec279b748d0106c assets/projects/lernio-ai-home.webp
5524609293d5b47ceca65a895b657f6a2539175a assets/projects/yash-portfolio-hero-portrait.webp
95986daf54f36d833a5c1900d68ac1021832da53 index.html
48dd626984cf942ae1e6ed1f8945443bbed6bc99 styles.css
3e843e0fc136bc39dc8c3e4fb673170385dab219 vercel.json
EOF

node --check "$FINAL/app.js"
FINAL="$FINAL" python - <<'PY'
import json, os, re
from pathlib import Path
root = Path(os.environ['FINAL'])
json.loads((root / 'vercel.json').read_text(encoding='utf-8'))
html = (root / 'index.html').read_text(encoding='utf-8')
css = (root / 'styles.css').read_text(encoding='utf-8')
refs = set(re.findall(r'(?:src|href)=["\']([^"\']+)', html))
refs.update(re.findall(r'url\(["\']?([^"\')]+)', css))
missing = []
for ref in refs:
    if ref.startswith(('#', 'http:', 'https:', 'mailto:', 'tel:', 'data:', 'javascript:')):
        continue
    clean = ref.split('?', 1)[0].split('#', 1)[0].lstrip('/')
    if clean and not (root / clean).is_file():
        missing.append(clean)
if missing:
    raise SystemExit('Missing local references: ' + ', '.join(sorted(set(missing))))
if html.count('data-project=') != 6:
    raise SystemExit('Project section must contain exactly six project controls')
files = [p for p in root.rglob('*') if p.is_file()]
if len(files) != 22:
    raise SystemExit(f'Expected 22 clean files, found {len(files)}')
print(f'Validated {len(files)} exact files and {len(refs)} references.')
PY

find "$FINAL" -type f -printf '%P %s bytes\n' | sort

git checkout -B main origin/main
find . -mindepth 1 -maxdepth 1 ! -name .git -exec rm -rf {} +
cp -a "$FINAL/." .
git config user.name "github-actions[bot]"
git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
git add -A
git diff --cached --check
if git diff --cached --quiet; then
  echo "Main already matches the exact extracted website."
  exit 0
fi
git commit -m "Publish extracted Awwwards-enhanced portfolio"
git push origin HEAD:main
