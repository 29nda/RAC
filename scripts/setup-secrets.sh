#!/usr/bin/env bash
#
# One-shot dashboard credential setup.
#
#   ./scripts/setup-secrets.sh                  # generates a password for you
#   ./scripts/setup-secrets.sh "my-own-password"
#
# Generates the password (if you did not supply one), derives its PBKDF2 hash,
# generates a session signing secret, and pushes all three to Cloudflare as
# Worker secrets. The password is printed once, at the end, and is never
# written to a file or committed.

set -euo pipefail

EMAIL="${ADMIN_EMAIL:-admin@ropeaccesscenter.id}"
PASSWORD="${1:-}"

command -v node >/dev/null || { echo "node is required"; exit 1; }
command -v openssl >/dev/null || { echo "openssl is required"; exit 1; }

if ! npx wrangler whoami >/dev/null 2>&1; then
  echo "Not signed in to Cloudflare. Run: npx wrangler login"
  exit 1
fi

if [ -z "$PASSWORD" ]; then
  # 24 URL-safe characters — long enough that the PBKDF2 cost is irrelevant.
  PASSWORD="$(openssl rand -base64 24 | tr -d '/+=' | cut -c1-24)"
  GENERATED=1
fi

if [ "${#PASSWORD}" -lt 12 ]; then
  echo "Password must be at least 12 characters."
  exit 1
fi

echo "Deriving password hash…"
HASH="$(node scripts/hash-password.mjs "$PASSWORD" | grep '^pbkdf2\$')"
SESSION_SECRET="$(openssl rand -hex 32)"

echo "Uploading secrets to the Worker…"
printf '%s' "$EMAIL"          | npx wrangler secret put ADMIN_EMAIL >/dev/null
printf '%s' "$HASH"           | npx wrangler secret put ADMIN_PASSWORD_HASH >/dev/null
printf '%s' "$SESSION_SECRET" | npx wrangler secret put SESSION_SECRET >/dev/null

echo
echo "Done. Sign in at /admin with:"
echo
echo "  e-mail   : $EMAIL"
echo "  password : $PASSWORD"
echo
if [ -n "${GENERATED:-}" ]; then
  echo "That password was generated just now and is shown only here."
  echo "Save it to your password manager before closing this terminal."
fi
echo "Change the e-mail by setting ADMIN_EMAIL before running this script."
