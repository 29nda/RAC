import type { APIRoute } from 'astro';
import { destroySession, json } from '../../../lib/auth';
import { recordAudit } from '../../../lib/db';

export const prerender = false;

export const POST: APIRoute = async ({ locals, cookies }) => {
  const admin = (locals as App.Locals).admin;
  destroySession(cookies);
  if (admin) await recordAudit(locals as App.Locals, admin.email, 'logout');
  return json({ ok: true, redirect: '/admin/login' });
};
