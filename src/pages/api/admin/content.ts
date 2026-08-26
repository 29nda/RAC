import type { APIRoute } from 'astro';
import { requireAdmin, verifyCsrf, isSameOrigin, json } from '../../../lib/auth';
import { getSiteUrl } from '../../../lib/env';
import { upsertContent, resetContent, recordAudit } from '../../../lib/db';
import { invalidateContentCache, getContent, collectionItems } from '../../../lib/content';
import { findCollection, type FieldDef } from '../../../lib/adminSchema';
import { cleanText, sanitizeHtml } from '../../../lib/security';
import type { CollectionName } from '../../../lib/types';

export const prerender = false;

const LOCALES = ['id', 'en'] as const;

/**
 * Coerce a submitted form into the shape the field expects.
 *
 * Everything an editor types is untrusted input, so each type has an explicit
 * parser — rich text goes through the allow-list sanitiser, numbers through
 * `Number.parseFloat`, and unknown field names are simply ignored.
 */
function readField(form: FormData, field: FieldDef): unknown {
  switch (field.type) {
    case 'text':
    case 'date':
    case 'image':
      return cleanText(form.get(field.name), 500);

    case 'select': {
      const value = cleanText(form.get(field.name), 60);
      return field.options?.includes(value) ? value : (field.options?.[0] ?? '');
    }

    case 'number': {
      const parsed = Number.parseFloat(cleanText(form.get(field.name), 30));
      return Number.isFinite(parsed) ? parsed : 0;
    }

    case 'boolean':
      return form.get(field.name) === 'on' || form.get(field.name) === 'true';

    case 'i18n':
      return Object.fromEntries(
        LOCALES.map((locale) => [locale, cleanText(form.get(`${field.name}.${locale}`), 500)]),
      );

    case 'i18nArea':
      return Object.fromEntries(
        LOCALES.map((locale) => [locale, cleanText(form.get(`${field.name}.${locale}`), 4000)]),
      );

    case 'i18nRich':
      return Object.fromEntries(
        LOCALES.map((locale) => [
          locale,
          sanitizeHtml(cleanText(form.get(`${field.name}.${locale}`), 60_000)),
        ]),
      );

    case 'list':
      return cleanText(form.get(field.name), 4000)
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);

    case 'i18nList':
      return Object.fromEntries(
        LOCALES.map((locale) => [
          locale,
          cleanText(form.get(`${field.name}.${locale}`), 8000)
            .split('\n')
            .map((line) => line.trim())
            .filter(Boolean),
        ]),
      );

    case 'syllabus': {
      // Submitted as `syllabus.0.title.id`, `syllabus.0.detail.en`, and so on.
      const rows: Array<Record<string, Record<string, string>>> = [];
      for (let index = 0; index < 40; index++) {
        const title = Object.fromEntries(
          LOCALES.map((locale) => [locale, cleanText(form.get(`${field.name}.${index}.title.${locale}`), 300)]),
        );
        const detail = Object.fromEntries(
          LOCALES.map((locale) => [locale, cleanText(form.get(`${field.name}.${index}.detail.${locale}`), 3000)]),
        );
        if (!title.id && !title.en && !detail.id && !detail.en) continue;
        rows.push({ title, detail });
      }
      return rows;
    }

    default:
      return undefined;
  }
}

export const POST: APIRoute = async (context) => {
  const { request, locals, cookies } = context;

  const denied = await requireAdmin(context);
  if (denied) return denied;

  if (!isSameOrigin(request, getSiteUrl(locals as App.Locals))) {
    return json({ error: 'bad_origin' }, 403);
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

  const collectionName = cleanText(form.get('collection'), 40);
  const collection = findCollection(collectionName);
  if (!collection) return json({ error: 'unknown_collection' }, 400);

  const action = cleanText(form.get('action'), 20) || 'save';
  const actor = (locals as App.Locals).admin?.email ?? 'unknown';
  const originalKey = cleanText(form.get('originalKey'), 120);

  /* --- Delete / reset ---------------------------------------------------- */

  if (action === 'delete' || action === 'reset') {
    if (!originalKey) return json({ error: 'missing_key' }, 400);

    const ok = action === 'reset'
      ? await resetContent(locals as App.Locals, collectionName, originalKey)
      : await upsertContent(
          locals as App.Locals,
          collectionName as CollectionName,
          originalKey,
          {},
          actor,
          true,
        );

    if (!ok) return json({ error: 'no_database', message: 'No database is bound to this deployment.' }, 503);

    await invalidateContentCache(locals as App.Locals);
    await recordAudit(locals as App.Locals, actor, `content.${action}`, `${collectionName}/${originalKey}`);
    return json({ ok: true, action });
  }

  /* --- Save -------------------------------------------------------------- */

  const payload: Record<string, unknown> = {};
  for (const field of collection.fields) {
    const value = readField(form, field);
    if (value !== undefined) payload[field.name] = value;
  }

  const itemKey = collection.singleton
    ? 'default'
    : cleanText(payload[collection.keyField], 120);

  if (!collection.singleton && !itemKey) {
    return json({ error: 'missing_key', message: `The "${collection.keyField}" field is required.` }, 400);
  }

  // Renaming the key would otherwise leave the old override behind and the
  // item would appear twice, so retire the old row explicitly.
  if (originalKey && originalKey !== itemKey && !collection.singleton) {
    await upsertContent(
      locals as App.Locals, collectionName as CollectionName, originalKey, {}, actor, true,
    );
  }

  const saved = await upsertContent(
    locals as App.Locals,
    collection.singleton ? 'settings' : (collectionName as CollectionName),
    itemKey,
    payload,
    actor,
  );

  if (!saved) {
    return json({
      error: 'no_database',
      message: 'No database is bound to this deployment. See SETUP.md to create one.',
    }, 503);
  }

  await invalidateContentCache(locals as App.Locals);
  await recordAudit(locals as App.Locals, actor, 'content.save', `${collectionName}/${itemKey}`);

  return json({ ok: true, key: itemKey });
};

/** Read a single item back, used by the editor to refresh after a save. */
export const GET: APIRoute = async (context) => {
  const denied = await requireAdmin(context);
  if (denied) return denied;

  const collectionName = context.url.searchParams.get('collection') ?? '';
  const collection = findCollection(collectionName);
  if (!collection) return json({ error: 'unknown_collection' }, 400);

  const content = await getContent(context.locals as App.Locals);
  if (collection.singleton) return json({ ok: true, item: content.settings });

  const key = context.url.searchParams.get('key') ?? '';
  const item = collectionItems(content, collectionName)
    .find((entry) => String(entry[collection.keyField]) === key);

  return item ? json({ ok: true, item }) : json({ error: 'not_found' }, 404);
};
