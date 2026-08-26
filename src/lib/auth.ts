import type { APIContext, AstroCookies } from 'astro';
import { getEnv } from './env';
import { signToken, verifyToken, verifyPassword, randomHex, timingSafeEqual } from './security';

export const SESSION_COOKIE = 'rac_session';
export const CSRF_COOKIE = 'rac_csrf';
const SESSION_TTL_SECONDS = 60 * 60 * 8; // one working day

export interface AdminSession {
  email: string;
  issuedAt: number;
  expiresAt: number;
}

/**
 * Whether the dashboard has been configured at all. Without these three
 * secrets the admin routes stay locked and explain what is missing, rather
 * than silently allowing access.
 */
export function isAuthConfigured(env: CloudflareEnv): boolean {
  return Boolean(env.ADMIN_EMAIL && env.ADMIN_PASSWORD_HASH && env.SESSION_SECRET);
}

export async function createSession(
  cookies: AstroCookies,
  env: CloudflareEnv,
  email: string,
  secure: boolean,
): Promise<void> {
  const now = Math.floor(Date.now() / 1000);
  const session: AdminSession = {
    email,
    issuedAt: now,
    expiresAt: now + SESSION_TTL_SECONDS,
  };

  const token = await signToken(session, env.SESSION_SECRET!);
  cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure,
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function readSession(
  cookies: AstroCookies,
  env: CloudflareEnv,
): Promise<AdminSession | null> {
  if (!env.SESSION_SECRET) return null;

  const raw = cookies.get(SESSION_COOKIE)?.value;
  if (!raw) return null;

  const session = await verifyToken<AdminSession>(raw, env.SESSION_SECRET);
  if (!session?.email || typeof session.expiresAt !== 'number') return null;
  if (session.expiresAt < Math.floor(Date.now() / 1000)) return null;

  // A rotated ADMIN_EMAIL must invalidate sessions issued to the old address.
  if (env.ADMIN_EMAIL && session.email !== env.ADMIN_EMAIL) return null;

  return session;
}

export function destroySession(cookies: AstroCookies): void {
  cookies.delete(SESSION_COOKIE, { path: '/' });
  cookies.delete(CSRF_COOKIE, { path: '/' });
}

export async function authenticate(
  env: CloudflareEnv,
  email: string,
  password: string,
): Promise<boolean> {
  if (!isAuthConfigured(env)) return false;

  // Always run the hash comparison so a wrong e-mail and a wrong password take
  // the same time, and neither can be distinguished from the outside.
  const emailMatches = timingSafeEqual(
    email.trim().toLowerCase(),
    env.ADMIN_EMAIL!.trim().toLowerCase(),
  );
  const passwordMatches = await verifyPassword(password, env.ADMIN_PASSWORD_HASH!);
  return emailMatches && passwordMatches;
}

/* -------------------------------------------------------------------------- */
/* CSRF — double-submit cookie                                                 */
/* -------------------------------------------------------------------------- */

export function ensureCsrfToken(cookies: AstroCookies, secure: boolean): string {
  const existing = cookies.get(CSRF_COOKIE)?.value;
  if (existing && existing.length === 64) return existing;

  const token = randomHex(32);
  cookies.set(CSRF_COOKIE, token, {
    httpOnly: false, // the form needs to read it back to submit it
    secure,
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  });
  return token;
}

export function verifyCsrf(cookies: AstroCookies, submitted: unknown): boolean {
  const expected = cookies.get(CSRF_COOKIE)?.value;
  if (!expected || typeof submitted !== 'string') return false;
  return timingSafeEqual(expected, submitted);
}

/**
 * Rejects a cross-site form post outright. `Origin` is set by every browser on
 * a state-changing request, and it cannot be spoofed by page script — which
 * makes it a stronger first line than the CSRF token alone.
 */
export function isSameOrigin(request: Request, siteUrl: string): boolean {
  const origin = request.headers.get('Origin');
  if (!origin) return true; // same-origin GETs and some non-browser clients omit it

  try {
    const incoming = new URL(origin);
    const expected = new URL(siteUrl);
    if (incoming.host === expected.host) return true;
    // The workers.dev preview host is a legitimate origin during setup.
    return incoming.hostname.endsWith('.workers.dev')
      || incoming.hostname === 'localhost'
      || incoming.hostname === '127.0.0.1';
  } catch {
    return false;
  }
}

/** True when the request arrived over HTTPS, so cookies can be marked secure. */
export function isSecureRequest(request: Request): boolean {
  try {
    return new URL(request.url).protocol === 'https:';
  } catch {
    return true;
  }
}

/** Guard for admin API routes: returns a 401/403 Response, or `null` to proceed. */
export async function requireAdmin(context: APIContext): Promise<Response | null> {
  const env = getEnv(context.locals as App.Locals);

  if (!isAuthConfigured(env)) {
    return json({ error: 'dashboard_not_configured' }, 503);
  }
  const session = await readSession(context.cookies, env);
  if (!session) {
    return json({ error: 'unauthorised' }, 401);
  }
  return null;
}

export function json(body: unknown, status = 200, headers: HeadersInit = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...headers,
    },
  });
}
