import type { APIRoute } from 'astro';
import { requireAdmin, verifyCsrf, isSameOrigin, json } from '../../../lib/auth';
import { getSiteUrl } from '../../../lib/env';
import { invalidateContentCache } from '../../../lib/content';
import { recordAudit } from '../../../lib/db';

export const prerender = false;

/**
 * Manual cache purge. Saves already invalidate automatically; this exists for
 * the case where content was changed directly in D1, or an editor simply wants
 * to be certain the edge is serving the newest copy.
 */
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

  if (!verifyCsrf(cookies, form.get('csrf'))) return json({ error: 'bad_csrf' }, 403);

  await invalidateContentCache(locals as App.Locals);
  await recordAudit(locals as App.Locals, (locals as App.Locals).admin?.email ?? 'unknown', 'cache.purge');

  return json({ ok: true });
};
