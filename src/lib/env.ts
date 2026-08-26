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
export function getSiteUrl(locals: App.Locals, fallback = 'https://ropeaccesscenter.com'): string {
  const raw = getEnv(locals).PUBLIC_SITE_URL || fallback;
  return raw.replace(/\/+$/, '');
}

/** `waitUntil` when the runtime provides it, otherwise a no-op. */
export function deferred(locals: App.Locals, promise: Promise<unknown>): void {
  const ctx = (locals as { runtime?: { ctx?: { waitUntil?: (p: Promise<unknown>) => void } } })
    ?.runtime?.ctx;
  if (ctx?.waitUntil) ctx.waitUntil(promise);
  else void promise.catch(() => {});
}
