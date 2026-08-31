#!/usr/bin/env bash
# Push the current state of Device management to GitHub.
# Usage:  ./push.sh "your commit message"
#   (message is optional; defaults to a timestamp)
set -e

cd "$(dirname "$0")"

REMOTE_URL="https://github.com/evahan-hub/DevicesDesign.git"
MSG="${1:-update $(date '+%Y-%m-%d %H:%M')}"

# First run: initialise the repo and remote if needed.
if [ ! -d .git ]; then
  git init
  git branch -M main
fi
if ! git remote get-url origin >/dev/null 2>&1; then
  git remote add origin "$REMOTE_URL"
fi

# Keep app/index.html (the GitHub Pages entry at /app/) in sync with root index.html.
# It's the same page but with asset paths rewritten to load from the repo root (../).
mkdir -p app
python3 - <<'PYEOF'
s = open("index.html", encoding="utf-8").read()
s = (s.replace('"_ds/', '"../_ds/').replace("'_ds/", "'../_ds/")
       .replace('"assets/', '"../assets/').replace('./support.js', '../support.js'))
open("app/index.html", "w", encoding="utf-8").write(s)
PYEOF

git add -A
# Only commit if there is something to commit.
if git diff --cached --quiet; then
  echo "No changes to commit."
else
  git commit -m "$MSG"
fi

git push -u origin main
echo "Pushed to $REMOTE_URL"
