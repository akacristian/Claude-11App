#!/bin/bash
# Runs when a Claude Code session starts. Installs npm dependencies so the
# app can be built, linted and previewed immediately. Idempotent + non-interactive.
set -euo pipefail

cd "$CLAUDE_PROJECT_DIR"

# Only needed in the remote (Claude Code on the web) environment.
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

echo "[session-start] Installing npm dependencies..."
npm install --no-audit --no-fund
echo "[session-start] Dependencies ready."
