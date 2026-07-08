#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_TEMPLATE="$ROOT_DIR/deploy/.env.shared.example"
ENV_FILE="$ROOT_DIR/.env"
STATE_DIR="$ROOT_DIR/.codearts-mcp"

if [[ ! -f "$ENV_TEMPLATE" ]]; then
  echo "missing template: $ENV_TEMPLATE" >&2
  exit 1
fi

if [[ -f "$ENV_FILE" ]]; then
  echo ".env already exists at $ENV_FILE"
  echo "Skip overwriting existing configuration."
else
  cp "$ENV_TEMPLATE" "$ENV_FILE"
  echo "Created $ENV_FILE from deploy/.env.shared.example"
fi

mkdir -p "$STATE_DIR"
chmod 700 "$STATE_DIR"
chmod 600 "$ENV_FILE" 2>/dev/null || true
echo "Ensured auth state directory exists: $STATE_DIR"

if ! command -v openssl >/dev/null 2>&1; then
  echo "openssl is required to generate MCP_AUTH_MASTER_KEY" >&2
  echo "Install openssl first, then rerun this script." >&2
  exit 1
fi

if ! grep -q '^MCP_AUTH_MASTER_KEY=' "$ENV_FILE"; then
  echo "missing MCP_AUTH_MASTER_KEY entry in $ENV_FILE" >&2
  exit 1
fi

CURRENT_KEY="$(grep '^MCP_AUTH_MASTER_KEY=' "$ENV_FILE" | head -n 1 | cut -d '=' -f 2-)"
if [[ "$CURRENT_KEY" == "replace-with-a-long-random-secret" ]]; then
  GENERATED_KEY="$(openssl rand -hex 32)"
  sed -i "s|^MCP_AUTH_MASTER_KEY=.*$|MCP_AUTH_MASTER_KEY=$GENERATED_KEY|" "$ENV_FILE"
  echo "Generated MCP_AUTH_MASTER_KEY and wrote it into .env"
else
  echo "Keep existing MCP_AUTH_MASTER_KEY from .env"
fi

if grep -q '^MCP_AUTH_DATA_PATH=/app/.codearts-mcp/auth-store.json' "$ENV_FILE"; then
  echo "Using default persistent auth data path inside container: /app/.codearts-mcp/auth-store.json"
fi

cat <<'EOF'

Next steps:
1. Review .env and adjust MCP_HTTP_PORT / MCP_AUTH_COOKIE_SECURE if needed.
2. Start the shared server:
   docker compose up -d --build
3. Check health:
   curl http://127.0.0.1/health
4. Check container status:
   docker compose ps
5. Let users connect to one of /mcp/<family> and call auth_configure_session once.
6. Use deploy/ops-shared.sh for status / logs / backup / restore.
EOF
