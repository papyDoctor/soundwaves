#!/bin/sh
# Deployment of SoundWaves.
#
#   SW_HOST=user@host ./deploy/deploy.sh      (or: ./deploy/deploy.sh user@host)
#
# Builds a static Linux binary (the web app and the wasm engine are embedded),
# sends it, applies the migrations with the service's own environment, swaps
# the binary, restarts, and checks that the site answers. Stops at the first
# error: a half deployment is worse than a failed one. setup.sh must have run
# once before.

set -eu

HOST="${1:-${SW_HOST:?set SW_HOST=user@host, the machine to deploy to}}"
TMP=".deploy-tmp"

cd "$(dirname "$0")/.."

echo "== tests =="
go test ./... >/dev/null
node --test 'internal/web/app/test/*.test.mjs' >/dev/null 2>&1 || { echo "!! JS tests fail" >&2; exit 1; }

echo "== build =="
# CGO off: a static binary, no dependency on the target's glibc.
CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -trimpath -ldflags="-s -w" -o "$TMP-soundwaves" ./cmd/soundwaves
ls -lh "$TMP-soundwaves" | awk '{print "   binary:", $5}'

echo "== upload =="
scp -q "$TMP-soundwaves" "$HOST:/tmp/soundwaves.new"
scp -q deploy/soundwaves.service "$HOST:/tmp/soundwaves.service"
rm -f "$TMP-soundwaves"

echo "== install =="
ssh "$HOST" 'bash -s' <<'REMOTE'
set -eu
install -m 0644 /tmp/soundwaves.service /etc/systemd/system/soundwaves.service
systemctl daemon-reload
install -m 0755 -o root -g root /tmp/soundwaves.new /opt/soundwaves/soundwaves.next
# Migrations BEFORE swapping the binary, with the SAME environment parser as
# the service (systemd, not a shell): if they fail, the old service keeps running.
systemd-run --wait --collect --quiet --service-type=oneshot \
    --property=EnvironmentFile=/etc/soundwaves/env --property=User=soundwaves \
    /opt/soundwaves/soundwaves.next -migrate
systemctl stop soundwaves 2>/dev/null || true
mv /opt/soundwaves/soundwaves.next /opt/soundwaves/soundwaves
rm -f /tmp/soundwaves.new /tmp/soundwaves.service
systemctl enable --now soundwaves
REMOTE

echo "== check =="
sleep 2
ssh "$HOST" 'systemctl is-active soundwaves'
BASE=$(ssh "$HOST" "grep -m1 '^SW_BASE_URL=' /etc/soundwaves/env | cut -d= -f2-")
code=$(curl -s -o /dev/null -w '%{http_code}' "$BASE/healthz")
echo "   $BASE/healthz: $code"
[ "$code" = "200" ] || { echo "!! the service does not answer" >&2; ssh "$HOST" 'journalctl -u soundwaves -n 30 --no-pager' >&2; exit 1; }
echo "== deployed =="
