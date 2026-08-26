import type { APIRoute } from 'astro';
import { getCache, getEnv, getSiteUrl } from '../../../lib/env';
import { rateLimit, clientIp, cleanText } from '../../../lib/security';
import {
  authenticate, createSession, isAuthConfigured, isSameOrigin,
  isSecureRequest, verifyCsrf, json,
} from '../../../lib/auth';
import { recordAudit, hashIp } from '../../../lib/db';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals, cookies }) => {
  const env = getEnv(locals as App.Locals);
  const site = getSiteUrl(locals as App.Locals);
  const ip = clientIp(request);

  if (!isSameOrigin(request, site)) return json({ error: 'bad_origin' }, 403);

  if (!isAuthConfigured(env)) {
    return json({
      error: 'not_configured',
      message: 'Set ADMIN_EMAIL, ADMIN_PASSWORD_HASH, and SESSION_SECRET before signing in.',
    }, 503);
  }

  // Five attempts per IP per fifteen minutes. Slow enough to make online
  // guessing pointless, generous enough for a mistyped password.
  const limit = await rateLimit(getCache(locals as App.Locals), `login:${ip}`, 5, 900);
  if (!limit.allowed) {
    await recordAudit(locals as App.Locals, 'unknown', 'login.rate_limited', undefined, undefined, await hashIp(ip));
    return json(
      { error: 'rate_limited', message: 'Too many attempts. Please wait and try again.' },
      429,
      { 'Retry-After': String(limit.retryAfterSeconds) },
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ error: 'bad_request' }, 400);
  }

  if (!verifyCsrf(cookies, form.get('csrf'))) {
    return json({ error: 'bad_csrf', message: 'Session expired. Reload the page and try again.' }, 403);
  }

  const email = cleanText(form.get('email'), 254).toLowerCase();
  const password = typeof form.get('password') === 'string' ? String(form.get('password')) : '';

  if (!(await authenticate(env, email, password))) {
    await recordAudit(locals as App.Locals, email || 'unknown', 'login.failed', undefined, undefined, await hashIp(ip));
    return json({ error: 'invalid_credentials', message: 'E-mail or password is incorrect.' }, 401);
  }

  await createSession(cookies, env, env.ADMIN_EMAIL!, isSecureRequest(request));
  await recordAudit(locals as App.Locals, email, 'login.success', undefined, undefined, await hashIp(ip));

  const next = cleanText(form.get('next'), 200);
  // Only ever redirect within the dashboard — never to an attacker's URL.
  const redirect = next.startsWith('/admin') && !next.startsWith('//') ? next : '/admin';

  return json({ ok: true, redirect });
};
