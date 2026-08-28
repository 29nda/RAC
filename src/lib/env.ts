import type { APIContext } from 'astro';

export type AnyContext = Pick<APIContext, 'locals'> & { locals: App.Locals };

/**
 * Cloudflare bindings, resolved from `locals.runtime.env`.
 *
 * Every binding is optional on purpose: the site must still render when it is
 * built without a database, and the dashboard must give a clear message rather
 * than throwing when storage has not been provisioned yet.
 */
export function getEnv(locals: App.Locals): CloudflareEnv {
  return (locals as { runtime?: { env?: CloudflareEnv } })?.runtime?.env ?? {};
}

export function getDB(locals: App.Locals): D1Database | undefined {
  return getEnv(locals).DB;
}

export function getCache(locals: App.Locals): KVNamespace | undefined {
  return getEnv(locals).CACHE;
}

export function getMedia(locals: App.Locals): R2Bucket | undefined {
  return getEnv(locals).MEDIA;
}

/** Absolute site origin, without a trailing slash. */
export function getSiteUrl(locals: App.Locals, fallback = 'https://ropeaccesscenter.id'): string {
  const raw = getEnv(locals).PUBLIC_SITE_URL || fallback;
  return raw.replace(/\/+$/, '');
}

/**
 * Whether this request arrived on the hostname the site canonicalises to.
 *
 * A Worker is always reachable on its `*.workers.dev` subdomain as well as on
 * any custom domain, so the same pages are served from two hostnames. Every
 * canonical tag, hreflang pair, sitemap entry and Open Graph URL is built from
 * PUBLIC_SITE_URL, which means the non-canonical host serves pages that point
 * somewhere else — the classic duplicate-content trap. Callers use this to
 * keep the non-canonical host out of search indexes entirely.
 *
 * Localhost counts as canonical so development is never marked noindex in a
 * way that could mask a real problem.
 */
export function isCanonicalHost(requestUrl: URL, locals: App.Locals): boolean {
  const host = requestUrl.hostname.toLowerCase();
  if (host === 'localhost' || host === '127.0.0.1') return true;

  let canonical: string;
  try {
    canonical = new URL(getSiteUrl(locals)).hostname.toLowerCase();
  } catch {
    return true;
  }

  // The `www` variant of the canonical domain is a legitimate way in, and the
  // canonical tag already consolidates it. Marking it noindex as well would
  // pair a "do not index" with a "the real page is over there", which are
  // conflicting signals — so only genuinely foreign hosts are excluded.
  const bare = (value: string) => value.replace(/^www\./, '');
  return bare(host) === bare(canonical);
}

/** `waitUntil` when the runtime provides it, otherwise a no-op. */
export function deferred(locals: App.Locals, promise: Promise<unknown>): void {
  const ctx = (locals as { runtime?: { ctx?: { waitUntil?: (p: Promise<unknown>) => void } } })
    ?.runtime?.ctx;
  if (ctx?.waitUntil) ctx.waitUntil(promise);
  else void promise.catch(() => {});
}
