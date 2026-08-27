import { defineMiddleware } from 'astro:middleware';
import { getEnv, isCanonicalHost } from './lib/env';
import { readSession, isAuthConfigured } from './lib/auth';
import { randomHex } from './lib/security';

/**
 * Origins the browser is allowed to frame. Only two exist: the map embed on
 * the contact page and the Turnstile challenge widget.
 */
const FRAME_SRC = [
  'https://www.google.com',
  'https://maps.google.com',
  'https://challenges.cloudflare.com',
].join(' ');

function buildCsp(nonce: string): string {
  const directives = [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "form-action 'self'",
    // Scoped and critical styles are emitted inline by the build, so the
    // stylesheet hash changes on every deploy; 'unsafe-inline' is limited to
    // styles and cannot execute script.
    "style-src 'self' 'unsafe-inline'",
    // Astro emits its client bundles as same-origin module scripts, so 'self'
    // covers them; the nonce is for the handful of inline scripts we author.
    `script-src 'self' 'nonce-${nonce}'`,
    "img-src 'self' data: blob: https:",
    "media-src 'self' https:",
    "font-src 'self'",
    "connect-src 'self' https://challenges.cloudflare.com",
    `frame-src ${FRAME_SRC}`,
    "manifest-src 'self'",
    "worker-src 'self' blob:",
    'upgrade-insecure-requests',
  ];
  return directives.join('; ');
}

const SECURITY_HEADERS: Record<string, string> = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
  'Permissions-Policy': [
    'accelerometer=()', 'autoplay=()', 'camera=()', 'display-capture=()',
    'encrypted-media=()', 'geolocation=()', 'gyroscope=()', 'magnetometer=()',
    'microphone=()', 'midi=()', 'payment=()', 'usb=()', 'interest-cohort=()',
  ].join(', '),
  'X-DNS-Prefetch-Control': 'on',
};

export const onRequest = defineMiddleware(async (context, next) => {
  const { request, locals, url, cookies } = context;
  const env = getEnv(locals as App.Locals);
  const pathname = url.pathname;

  const isAdminArea = pathname === '/admin' || pathname.startsWith('/admin/');
  const isAdminApi = pathname.startsWith('/api/admin');

  // Per-request nonce, available to every page via `Astro.locals.cspNonce`.
  const nonce = randomHex(16);
  (locals as App.Locals).cspNonce = nonce;

  /* --- Admin gate -------------------------------------------------------- */
  if (isAdminArea || isAdminApi) {
    const session = isAuthConfigured(env) ? await readSession(cookies, env) : null;
    if (session) {
      (locals as App.Locals).admin = { email: session.email, issuedAt: session.issuedAt };
    }

    const isLoginRoute = pathname === '/admin/login' || pathname === '/api/admin/login';
    if (!session && !isLoginRoute) {
      if (isAdminApi) {
        return new Response(JSON.stringify({ error: 'unauthorised' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
        });
      }
      const target = new URL('/admin/login', url);
      if (pathname !== '/admin') target.searchParams.set('next', pathname);
      return Response.redirect(target.toString(), 302);
    }

    // A signed-in admin landing on the login page belongs on the dashboard.
    if (session && pathname === '/admin/login') {
      return Response.redirect(new URL('/admin', url).toString(), 302);
    }
  }

  const response = await next();

  /* --- Headers ----------------------------------------------------------- */
  const headers = response.headers;
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) headers.set(key, value);
  headers.set('Content-Security-Policy', buildCsp(nonce));

  // HSTS only makes sense once the response really is HTTPS.
  if (url.protocol === 'https:') {
    headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }

  const contentType = headers.get('Content-Type') ?? '';

  if (isAdminArea || isAdminApi) {
    headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  } else if (contentType.includes('text/html')) {
    // The workers.dev subdomain serves the same pages as the custom domain,
    // but every canonical tag on them points at the custom domain. Letting a
    // crawler index this host would create duplicate content pointing at a
    // hostname it was not served from, so keep it out of the index entirely.
    if (!isCanonicalHost(url, locals as App.Locals)) {
      headers.set('X-Robots-Tag', 'noindex, nofollow');
    }

    // Served from the edge immediately, revalidated in the background, so a
    // content change from the dashboard propagates within a minute without
    // ever making a visitor wait on an origin render.
    headers.set(
      'Cache-Control',
      'public, max-age=0, s-maxage=60, stale-while-revalidate=600, stale-if-error=86400',
    );
    headers.set('Vary', 'Accept-Encoding');
  }

  // Fingerprinted build assets and R2 media never change under the same URL.
  if (pathname.startsWith('/_assets/') || pathname.startsWith('/fonts/')) {
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }

  return response;
});
