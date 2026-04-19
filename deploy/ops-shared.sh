#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
STATE_DIR="$ROOT_DIR/.codearts-mcp"
AUTH_STORE_PATH="$STATE_DIR/auth-store.json"
BACKUP_DIR="$STATE_DIR/backups"

usage() {
  cat <<'EOF'
Usage:
  bash deploy/ops-shared.sh status
  bash deploy/ops-shared.sh logs
  bash deploy/ops-shared.sh backup-auth
  bash deploy/ops-shared.sh restore-auth /path/to/backup.json
  bash deploy/ops-shared.sh show-auth-store

Commands:
  status           Show docker compose service state and local health probe
  logs             Tail recent logs from the shared server services
  backup-auth      Backup auth-store.json into .codearts-mcp/backups
  restore-auth     Restore auth-store.json from a backup file
  show-auth-store  Show auth-store file path and basic file info
EOF
}

require_docker_compose() {
  if ! command -v docker >/dev/null 2>&1; then
    echo "docker is required" >&2
    exit 1
  fi
}

cmd_status() {
  require_docker_compose
  (
    cd "$ROOT_DIR"
    docker compose ps
  )
  echo
  if command -v curl >/dev/null 2>&1; then
    echo "Health probe:"
    curl -fsS http://127.0.0.1/health
    echo
  else
    echo "curl not found; skip local /health probe"
  fi
}

cmd_logs() {
  require_docker_compose
  (
    cd "$ROOT_DIR"
    docker compose logs --tail=120 codearts-mcp nginx
  )
}

cmd_backup_auth() {
  mkdir -p "$BACKUP_DIR"
  chmod 700 "$BACKUP_DIR"
  if [[ ! -f "$AUTH_STORE_PATH" ]]; then
    echo "auth store not found: $AUTH_STORE_PATH" >&2
    exit 1
  fi

  timestamp="$(date +%Y%m%d-%H%M%S)"
  backup_path="$BACKUP_DIR/auth-store-$timestamp.json"
  cp "$AUTH_STORE_PATH" "$backup_path"
  chmod 600 "$backup_path" 2>/dev/null || true
  echo "Created backup: $backup_path"
}

cmd_restore_auth() {
  backup_path="${2:-}"
  if [[ -z "$backup_path" ]]; then
    echo "missing backup file path" >&2
    usage
    exit 1
  fi

  if [[ ! -f "$backup_path" ]]; then
    echo "backup file not found: $backup_path" >&2
    exit 1
  fi

  mkdir -p "$STATE_DIR"
  chmod 700 "$STATE_DIR"

  if [[ -f "$AUTH_STORE_PATH" ]]; then
    timestamp="$(date +%Y%m%d-%H%M%S)"
    pre_restore_backup="$BACKUP_DIR/pre-restore-$timestamp.json"
    mkdir -p "$BACKUP_DIR"
    chmod 700 "$BACKUP_DIR"
    cp "$AUTH_STORE_PATH" "$pre_restore_backup"
    chmod 600 "$pre_restore_backup" 2>/dev/null || true
    echo "Backed up current auth store to: $pre_restore_backup"
  fi

  cp "$backup_path" "$AUTH_STORE_PATH"
  chmod 600 "$AUTH_STORE_PATH" 2>/dev/null || true
  echo "Restored auth store from: $backup_path"
  echo "If the shared server is running, restart it to ensure a clean reload."
}

cmd_show_auth_store() {
  echo "Auth store path: $AUTH_STORE_PATH"
  if [[ -f "$AUTH_STORE_PATH" ]]; then
    ls -lh "$AUTH_STORE_PATH"
  else
    echo "Auth store does not exist yet."
  fi
}

command_name="${1:-}"

case "$command_name" in
  status)
    cmd_status
    ;;
  logs)
    cmd_logs
    ;;
  backup-auth)
    cmd_backup_auth
    ;;
  restore-auth)
    cmd_restore_auth "$@"
    ;;
  show-auth-store)
    cmd_show_auth_store
    ;;
  *)
    usage
    exit 1
    ;;
esac
