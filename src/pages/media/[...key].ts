import type { APIRoute } from 'astro';
import { getMedia } from '../../lib/env';

export const prerender = false;

/**
 * Streams an object out of R2 under the site's own origin.
 *
 * Serving media same-origin keeps the CSP tight (no extra `img-src` host),
 * avoids a CORS preflight, and lets Cloudflare's edge cache hold the bytes —
 * the object key already carries a random suffix, so the response is safely
 * immutable for a year.
 */
export const GET: APIRoute = async ({ params, locals, request }) => {
  const bucket = getMedia(locals as App.Locals);
  const key = params.key;

  if (!bucket || !key) return new Response('Not found', { status: 404 });
  // `..` cannot escape a bucket, but rejecting it keeps logs clean and honest.
  if (key.includes('..')) return new Response('Bad request', { status: 400 });

  let object: Awaited<ReturnType<R2Bucket['get']>>;
  try {
    object = await bucket.get(key);
  } catch (error) {
    console.error('media get failed', key, error);
    return new Response('Not found', { status: 404 });
  }
  if (!object) return new Response('Not found', { status: 404 });

  const headers = new Headers();
  headers.set('Content-Type', object.httpMetadata?.contentType ?? 'application/octet-stream');
  headers.set('etag', object.httpEtag);
  headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  headers.set('X-Content-Type-Options', 'nosniff');

  // Honour a conditional request so repeat visits cost 304, not a full body.
  if (request.headers.get('If-None-Match') === object.httpEtag) {
    return new Response(null, { status: 304, headers });
  }

  return new Response(object.body as unknown as ReadableStream, { headers });
};
