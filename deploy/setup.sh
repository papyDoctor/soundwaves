#!/bin/sh
# First installation on the server, run ONCE from this machine:
#
#   SW_DOMAIN=waves.example.org SW_HOST=user@host ./deploy/setup.sh
#
# Creates the system user, the directories, the Postgres role and database,
# the environment file from env.example, the nginx site, and asks certbot for
# the certificate. Idempotent: running it again changes nothing already there.
# It never writes secrets: edit /etc/soundwaves/env on the machine afterwards.

set -eu

HOST="${1:-${SW_HOST:?set SW_HOST=user@host, the machine to install on}}"
: "${SW_DOMAIN:?set SW_DOMAIN to the host name of the site, e.g. waves.example.org}"

cd "$(dirname "$0")/.."
sed "s/SW_DOMAIN/$SW_DOMAIN/g" deploy/soundwaves.nginx > /tmp/soundwaves.nginx
sed "s/SW_DOMAIN/$SW_DOMAIN/g" deploy/env.example > /tmp/soundwaves.env
scp -q /tmp/soundwaves.nginx "$HOST:/tmp/soundwaves.nginx"
scp -q /tmp/soundwaves.env "$HOST:/tmp/soundwaves.env"
scp -q deploy/soundwaves.service "$HOST:/tmp/soundwaves.service"
rm -f /tmp/soundwaves.nginx /tmp/soundwaves.env

ssh "$HOST" "SW_DOMAIN='$SW_DOMAIN' bash -s" <<'REMOTE'
set -eu
id soundwaves >/dev/null 2>&1 || useradd --system --home /opt/soundwaves --shell /usr/sbin/nologin soundwaves
mkdir -p /opt/soundwaves /etc/soundwaves
chown root:root /opt/soundwaves

# Postgres: a role without password, reached over the local socket (peer auth).
command -v psql >/dev/null || { apt-get update -q && apt-get install -y -q postgresql; }
systemctl enable --now postgresql
su - postgres -c "psql -tAc \"select 1 from pg_roles where rolname='soundwaves'\"" | grep -q 1 || su - postgres -c "createuser soundwaves"
su - postgres -c "psql -tAc \"select 1 from pg_database where datname='soundwaves'\"" | grep -q 1 || su - postgres -c "createdb -O soundwaves soundwaves"

# The environment: written once, then edited by hand for the secrets.
if [ ! -f /etc/soundwaves/env ]; then
    install -m 0600 -o root -g root /tmp/soundwaves.env /etc/soundwaves/env
    echo ">> /etc/soundwaves/env created: fill in the OAuth client ids and secrets"
fi
install -m 0644 /tmp/soundwaves.service /etc/systemd/system/soundwaves.service
systemctl daemon-reload

# nginx: the site, then certbot rewrites it for TLS.
if [ ! -f /etc/nginx/sites-available/soundwaves ]; then
    install -m 0644 /tmp/soundwaves.nginx /etc/nginx/sites-available/soundwaves
    ln -sf /etc/nginx/sites-available/soundwaves /etc/nginx/sites-enabled/soundwaves
    nginx -t && systemctl reload nginx
    # The machine already has a Let's Encrypt account (papyDeck's sites): certbot
    # reuses it and only edits the server block whose name matches.
    certbot --nginx -d "$SW_DOMAIN" --non-interactive --agree-tos --redirect --keep-until-expiring || \
        echo ">> certbot failed: check that $SW_DOMAIN points to this machine, then run: certbot --nginx -d $SW_DOMAIN"
fi
rm -f /tmp/soundwaves.nginx /tmp/soundwaves.env /tmp/soundwaves.service
echo ">> setup done; next: edit /etc/soundwaves/env, then ./deploy/deploy.sh"
REMOTE
