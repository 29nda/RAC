/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type KVNamespace = import('@cloudflare/workers-types').KVNamespace;
type D1Database = import('@cloudflare/workers-types').D1Database;
type R2Bucket = import('@cloudflare/workers-types').R2Bucket;
type Fetcher = import('@cloudflare/workers-types').Fetcher;

interface CloudflareEnv {
  /** Content database. Optional — the site falls back to repository defaults. */
  DB?: D1Database;
  /** Edge cache, rate-limit counters, and session store. Optional. */
  CACHE?: KVNamespace;
  /** Media library bucket. Optional. */
  MEDIA?: R2Bucket;
  ASSETS?: Fetcher;

  PUBLIC_SITE_URL?: string;
  PUBLIC_DEFAULT_LOCALE?: string;
  PUBLIC_TURNSTILE_SITE_KEY?: string;

  ADMIN_EMAIL?: string;
  ADMIN_PASSWORD_HASH?: string;
  SESSION_SECRET?: string;
  TURNSTILE_SECRET_KEY?: string;
}

type Runtime = import('@astrojs/cloudflare').Runtime<CloudflareEnv>;

declare namespace App {
  interface Locals extends Runtime {
    /** Per-request nonce used by the Content-Security-Policy header. */
    cspNonce: string;
    /** Signed-in dashboard user, when the request carries a valid session. */
    admin?: { email: string; issuedAt: number };
  }
}
