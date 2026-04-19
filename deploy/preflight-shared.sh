#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="$ROOT_DIR/.env"
STATE_DIR="$ROOT_DIR/.codearts-mcp"
SSL_CERT="$ROOT_DIR/deploy/nginx/ssl/fullchain.pem"
SSL_KEY="$ROOT_DIR/deploy/nginx/ssl/privkey.pem"

usage() {
  cat <<'EOF'
Usage:
  bash deploy/preflight-shared.sh
  bash deploy/preflight-shared.sh --ssl

Checks:
  - docker availability
  - root .env presence
  - required MCP_AUTH_* entries
  - placeholder master key detection
  - state directory presence
  - SSL certificate files when --ssl is provided
EOF
}

require_command() {
  local name="$1"
  if ! command -v "$name" >/dev/null 2>&1; then
    echo "missing required command: $name" >&2
    exit 1
  fi
}

require_env_entry() {
  local key="$1"
  if ! grep -q "^${key}=" "$ENV_FILE"; then
    echo "missing required entry in .env: $key" >&2
    exit 1
  fi
}

ssl_mode="false"
if [[ "${1:-}" == "--ssl" ]]; then
  ssl_mode="true"
elif [[ -n "${1:-}" ]]; then
  usage
  exit 1
fi

require_command docker

if [[ ! -f "$ENV_FILE" ]]; then
  echo "missing $ENV_FILE" >&2
  echo "Run: bash deploy/bootstrap-shared.sh" >&2
  exit 1
fi

require_env_entry MCP_TRANSPORT
require_env_entry MCP_HTTP_PORT
require_env_entry MCP_SERVER_NAME
require_env_entry MCP_SERVER_VERSION
require_env_entry MCP_AUTH_MASTER_KEY
require_env_entry MCP_AUTH_DATA_PATH

transport_value="$(grep '^MCP_TRANSPORT=' "$ENV_FILE" | head -n 1 | cut -d '=' -f 2-)"
master_key_value="$(grep '^MCP_AUTH_MASTER_KEY=' "$ENV_FILE" | head -n 1 | cut -d '=' -f 2-)"
data_path_value="$(grep '^MCP_AUTH_DATA_PATH=' "$ENV_FILE" | head -n 1 | cut -d '=' -f 2-)"
cookie_secure_value="$(grep '^MCP_AUTH_COOKIE_SECURE=' "$ENV_FILE" | head -n 1 | cut -d '=' -f 2- || true)"

if [[ "$transport_value" != "http" ]]; then
  echo "MCP_TRANSPORT must be http for shared deployment, got: $transport_value" >&2
  exit 1
fi

if [[ "$master_key_value" == "replace-with-a-long-random-secret" || -z "$master_key_value" ]]; then
  echo "MCP_AUTH_MASTER_KEY is still a placeholder or empty" >&2
  echo "Run: bash deploy/bootstrap-shared.sh" >&2
  exit 1
fi

if [[ ! -d "$STATE_DIR" ]]; then
  echo "state directory does not exist yet: $STATE_DIR" >&2
  echo "Run: bash deploy/bootstrap-shared.sh" >&2
  exit 1
fi

if [[ "$ssl_mode" == "true" ]]; then
  if [[ ! -f "$SSL_CERT" ]]; then
    echo "missing SSL certificate file: $SSL_CERT" >&2
    exit 1
  fi

  if [[ ! -f "$SSL_KEY" ]]; then
    echo "missing SSL private key file: $SSL_KEY" >&2
    exit 1
  fi

  if [[ "$cookie_secure_value" != "true" ]]; then
    echo "warning: MCP_AUTH_COOKIE_SECURE is not true in .env" >&2
    echo "warning: docker-compose.ssl.yml will override it to true for HTTPS startup" >&2
  fi
fi

echo "Preflight passed."
echo "  env file: $ENV_FILE"
echo "  state dir: $STATE_DIR"
echo "  transport: $transport_value"
echo "  auth data path: $data_path_value"
if [[ -n "$cookie_secure_value" ]]; then
  echo "  cookie secure: $cookie_secure_value"
fi
if [[ "$ssl_mode" == "true" ]]; then
  echo "  ssl cert: $SSL_CERT"
  echo "  ssl key: $SSL_KEY"
fi
