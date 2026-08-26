import { signToken, verifyToken } from './security';

/**
 * Anti-spam token for the public contact form.
 *
 * A double-submit CSRF *cookie* is the wrong tool here: the form is
 * unauthenticated (there is no session for a forged request to ride), and a
 * `Set-Cookie` on an HTML response would stop Cloudflare caching the page at
 * the edge. Instead the server embeds an HMAC over the current hour. It is
 * identical for every visitor — so the page stays cacheable — while still
 * proving the submission came from a form this site rendered recently, which
 * stops replay of a form scraped days ago.
 *
 * Real CSRF protection for the form comes from the `Origin` check in
 * `isSameOrigin`; this token is spam control, layered with the honeypot,
 * the rate limiter, and optional Turnstile.
 */

const WINDOW_SECONDS = 3600;

function bucket(offset = 0): number {
  return Math.floor(Date.now() / 1000 / WINDOW_SECONDS) - offset;
}

export async function issueFormToken(secret: string | undefined): Promise<string> {
  if (!secret) return '';
  return signToken({ b: bucket() }, secret);
}

/** Accepts the current hour and the previous one, so a form open across the
 *  hour boundary still submits successfully. */
export async function verifyFormToken(
  secret: string | undefined,
  token: unknown,
): Promise<boolean> {
  if (!secret) return true; // not configured — fall back to the other layers
  if (typeof token !== 'string' || !token) return false;

  const payload = await verifyToken<{ b: number }>(token, secret);
  if (!payload || typeof payload.b !== 'number') return false;

  return payload.b === bucket() || payload.b === bucket(1);
}
