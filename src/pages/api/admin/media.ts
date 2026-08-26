import type { APIRoute } from 'astro';
import { requireAdmin, verifyCsrf, isSameOrigin, json } from '../../../lib/auth';
import { getMedia, getDB, getSiteUrl } from '../../../lib/env';
import { cleanText } from '../../../lib/security';
import { recordAudit } from '../../../lib/db';
import {
  MAX_UPLOAD_BYTES, isAllowedMime, buildMediaKey, mediaUrl, listMedia,
} from '../../../lib/media';

export const prerender = false;

export const GET: APIRoute = async (context) => {
  const denied = await requireAdmin(context);
  if (denied) return denied;

  const items = await listMedia(context.locals as App.Locals);
  return json({ ok: true, items, bound: Boolean(getMedia(context.locals as App.Locals)) });
};

export const POST: APIRoute = async (context) => {
  const { request, locals, cookies } = context;

  const denied = await requireAdmin(context);
  if (denied) return denied;

  if (!isSameOrigin(request, getSiteUrl(locals as App.Locals))) {
    return json({ error: 'bad_origin' }, 403);
  }

  const bucket = getMedia(locals as App.Locals);
  if (!bucket) {
    return json({
      error: 'no_bucket',
      message: 'No R2 bucket is bound to this deployment. See SETUP.md to create one.',
    }, 503);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ error: 'bad_request' }, 400);
  }

  if (!verifyCsrf(cookies, form.get('csrf'))) {
    return json({ error: 'bad_csrf' }, 403);
  }

  const actor = (locals as App.Locals).admin?.email ?? 'unknown';
  const action = cleanText(form.get('action'), 20) || 'upload';

  /* --- Delete ------------------------------------------------------------ */

  if (action === 'delete') {
    const key = cleanText(form.get('key'), 300);
    if (!key || key.includes('..')) return json({ error: 'bad_key' }, 400);

    try {
      await bucket.delete(key);
      const db = getDB(locals as App.Locals);
      if (db) await db.prepare('DELETE FROM media WHERE key = ?').bind(key).run();
    } catch {
      return json({ error: 'delete_failed' }, 500);
    }

    await recordAudit(locals as App.Locals, actor, 'media.delete', key);
    return json({ ok: true });
  }

  /* --- Upload ------------------------------------------------------------ */

  const file = form.get('file');
  if (!(file instanceof File) || file.size === 0) {
    return json({ error: 'no_file', message: 'Choose a file to upload.' }, 400);
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    return json({
      error: 'too_large',
      message: `Maximum upload size is ${Math.round(MAX_UPLOAD_BYTES / 1024 / 1024)} MB.`,
    }, 413);
  }

  if (!isAllowedMime(file.type)) {
    return json({
      error: 'bad_type',
      message: 'Allowed formats: WebP, JPEG, PNG, AVIF, SVG, PDF.',
    }, 415);
  }

  const key = buildMediaKey(file.name, file.type);
  const altId = cleanText(form.get('alt.id'), 300);
  const altEn = cleanText(form.get('alt.en'), 300);

  // Buffered rather than streamed: uploads are capped at 8 MB, and R2 needs a
  // known length to store the object in a single request.
  try {
    const bytes = await file.arrayBuffer();
    await bucket.put(key, bytes, {
      httpMetadata: {
        contentType: file.type,
        cacheControl: 'public, max-age=31536000, immutable',
      },
      customMetadata: { alt: altId || altEn || '', uploadedBy: actor },
    });
  } catch (error) {
    console.error('media upload failed', error);
    return json({ error: 'upload_failed' }, 500);
  }

  const db = getDB(locals as App.Locals);
  if (db) {
    try {
      await db
        .prepare(`INSERT INTO media (key, content_type, size, alt_id, alt_en, uploaded_by)
                  VALUES (?, ?, ?, ?, ?, ?)`)
        .bind(key, file.type, file.size, altId || null, altEn || null, actor)
        .run();
    } catch { /* the object is stored; the index row is a convenience */ }
  }

  await recordAudit(locals as App.Locals, actor, 'media.upload', key, `${file.size} bytes`);

  return json({ ok: true, key, url: mediaUrl(key), size: file.size, contentType: file.type });
};
