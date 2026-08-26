import type { APIRoute } from 'astro';
import { requireAdmin, verifyCsrf, isSameOrigin, json } from '../../../lib/auth';
import { getSiteUrl } from '../../../lib/env';
import { cleanText } from '../../../lib/security';
import { updateEnquiryStatus, deleteEnquiry, recordAudit, listEnquiries } from '../../../lib/db';

export const prerender = false;

const STATUSES = ['new', 'contacted', 'quoted', 'won', 'lost', 'spam'];

export const GET: APIRoute = async (context) => {
  const denied = await requireAdmin(context);
  if (denied) return denied;
  return json({ ok: true, items: await listEnquiries(context.locals as App.Locals, 200) });
};

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

  const actor = (locals as App.Locals).admin?.email ?? 'unknown';
  const id = cleanText(form.get('id'), 60);
  const action = cleanText(form.get('action'), 20);
  if (!id) return json({ error: 'missing_id' }, 400);

  if (action === 'delete') {
    const ok = await deleteEnquiry(locals as App.Locals, id);
    if (!ok) return json({ error: 'no_database' }, 503);
    await recordAudit(locals as App.Locals, actor, 'enquiry.delete', id);
    return json({ ok: true });
  }

  const status = cleanText(form.get('status'), 20);
  if (!STATUSES.includes(status)) return json({ error: 'bad_status' }, 400);

  const ok = await updateEnquiryStatus(locals as App.Locals, id, status);
  if (!ok) return json({ error: 'no_database' }, 503);

  await recordAudit(locals as App.Locals, actor, 'enquiry.status', id, status);
  return json({ ok: true, status });
};
