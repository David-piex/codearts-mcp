#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
ENV_FILE="$ROOT_DIR/.env"
PM2_APP_NAME="codearts-mcp"

usage() {
  cat <<'EOF'
Usage:
  bash deploy/manage-shared-pm2.sh build
  bash deploy/manage-shared-pm2.sh start
  bash deploy/manage-shared-pm2.sh restart
  bash deploy/manage-shared-pm2.sh stop
  bash deploy/manage-shared-pm2.sh status
  bash deploy/manage-shared-pm2.sh logs
  bash deploy/manage-shared-pm2.sh health

Commands:
  build    Install dependencies and build TypeScript output
  start    Start the shared HTTP server with PM2
  restart  Restart the shared HTTP server with PM2 and refresh env
  stop     Stop and remove the PM2 app
  status   Show PM2 process state
  logs     Tail recent PM2 logs
  health   Probe local /health endpoint
EOF
}

require_command() {
  local name="$1"
  if ! command -v "$name" >/dev/null 2>&1; then
    echo "missing required command: $name" >&2
    exit 1
  fi
}

require_env_file() {
  if [[ ! -f "$ENV_FILE" ]]; then
    echo "missing $ENV_FILE" >&2
    echo "Run: bash deploy/bootstrap-shared.sh" >&2
    exit 1
  fi
}

load_env() {
  require_env_file
  set -a
  # shellcheck disable=SC1090
  source "$ENV_FILE"
  set +a
}

cmd_build() {
  require_command npm
  (
    cd "$ROOT_DIR"
    npm install
    npm run build
  )
}

cmd_start() {
  require_command pm2
  load_env
  (
    cd "$ROOT_DIR"
    pm2 start ecosystem.config.cjs --update-env
  )
}

cmd_restart() {
  require_command pm2
  load_env
  (
    cd "$ROOT_DIR"
    pm2 restart "$PM2_APP_NAME" --update-env
  )
}

cmd_stop() {
  require_command pm2
  (
    cd "$ROOT_DIR"
    pm2 delete "$PM2_APP_NAME" || true
  )
}

cmd_status() {
  require_command pm2
  pm2 status "$PM2_APP_NAME"
}

cmd_logs() {
  require_command pm2
  pm2 logs "$PM2_APP_NAME" --lines 120
}

cmd_health() {
  require_command curl
  curl -fsS http://127.0.0.1:3000/health
  echo
}

command_name="${1:-}"

case "$command_name" in
  build)
    cmd_build
    ;;
  start)
    cmd_start
    ;;
  restart)
    cmd_restart
    ;;
  stop)
    cmd_stop
    ;;
  status)
    cmd_status
    ;;
  logs)
    cmd_logs
    ;;
  health)
    cmd_health
    ;;
  *)
    usage
    exit 1
    ;;
esac
