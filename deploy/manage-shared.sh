#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

usage() {
  cat <<'EOF'
Usage:
  bash deploy/manage-shared.sh start
  bash deploy/manage-shared.sh start-ssl
  bash deploy/manage-shared.sh restart
  bash deploy/manage-shared.sh restart-ssl
  bash deploy/manage-shared.sh stop
  bash deploy/manage-shared.sh ps
  bash deploy/manage-shared.sh health

Commands:
  start        Start shared HTTP services with docker-compose.yml
  start-ssl    Start shared HTTP services with docker-compose.yml + docker-compose.ssl.yml
  restart      Restart shared HTTP services without SSL overlay
  restart-ssl  Restart shared HTTP services with SSL overlay
  stop         Stop shared HTTP services
  ps           Show docker compose service state
  health       Probe local /health endpoint
EOF
}

require_docker() {
  if ! command -v docker >/dev/null 2>&1; then
    echo "docker is required" >&2
    exit 1
  fi
}

require_env_file() {
  if [[ ! -f "$ROOT_DIR/.env" ]]; then
    echo "missing $ROOT_DIR/.env" >&2
    echo "Run: bash deploy/bootstrap-shared.sh" >&2
    exit 1
  fi
}

compose_base() {
  (
    cd "$ROOT_DIR"
    docker compose -f docker-compose.yml "$@"
  )
}

compose_ssl() {
  (
    cd "$ROOT_DIR"
    docker compose -f docker-compose.yml -f docker-compose.ssl.yml "$@"
  )
}

cmd_start() {
  require_docker
  require_env_file
  bash "$ROOT_DIR/deploy/preflight-shared.sh"
  compose_base up -d --build
}

cmd_start_ssl() {
  require_docker
  require_env_file
  bash "$ROOT_DIR/deploy/preflight-shared.sh" --ssl
  compose_ssl up -d --build
}

cmd_restart() {
  require_docker
  require_env_file
  bash "$ROOT_DIR/deploy/preflight-shared.sh"
  compose_base up -d --build --force-recreate
}

cmd_restart_ssl() {
  require_docker
  require_env_file
  bash "$ROOT_DIR/deploy/preflight-shared.sh" --ssl
  compose_ssl up -d --build --force-recreate
}

cmd_stop() {
  require_docker
  compose_ssl down
}

cmd_ps() {
  require_docker
  compose_ssl ps
}

cmd_health() {
  if command -v curl >/dev/null 2>&1; then
    curl -fsS http://127.0.0.1/health
    echo
    return
  fi

  echo "curl not found; cannot probe local /health" >&2
  exit 1
}

command_name="${1:-}"

case "$command_name" in
  start)
    cmd_start
    ;;
  start-ssl)
    cmd_start_ssl
    ;;
  restart)
    cmd_restart
    ;;
  restart-ssl)
    cmd_restart_ssl
    ;;
  stop)
    cmd_stop
    ;;
  ps)
    cmd_ps
    ;;
  health)
    cmd_health
    ;;
  *)
    usage
    exit 1
    ;;
esac
