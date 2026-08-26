import type { APIRoute } from 'astro';
import { getCache, getEnv, getSiteUrl } from '../../lib/env';
import {
  cleanText, isValidEmail, isValidPhone, normalisePhone,
  rateLimit, clientIp,
} from '../../lib/security';
import { isSameOrigin, json } from '../../lib/auth';
import { verifyFormToken } from '../../lib/formToken';
import { saveEnquiry, hashIp, recordAudit } from '../../lib/db';
import { getContent } from '../../lib/content';
import { whatsappUrl } from '../../lib/whatsapp';
import { UI } from '../../i18n/ui';
import type { Locale } from '../../i18n/config';

export const prerender = false;

const SUBJECT_LABELS: Record<string, Record<Locale, string>> = {
  training: { id: 'Pelatihan & Sertifikasi', en: 'Training & Certification' },
  services: { id: 'Jasa Akses Tali', en: 'Rope Access Services' },
  inhouse: { id: 'Pelatihan In-House', en: 'In-House Training' },
  audit: { id: 'Konsultasi & Audit K3', en: 'HSE Consulting & Audit' },
  other: { id: 'Lainnya', en: 'Something else' },
};

/** Cloudflare Turnstile, when a secret key is configured. */
async function verifyTurnstile(secret: string, token: string, ip: string): Promise<boolean> {
  try {
    const body = new FormData();
    body.append('secret', secret);
    body.append('response', token);
    body.append('remoteip', ip);

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body,
    });
    const result = (await response.json()) as { success?: boolean };
    return result.success === true;
  } catch {
    return false;
  }
}

export const POST: APIRoute = async (context) => {
  const { request, locals } = context;
  const env = getEnv(locals as App.Locals);
  const site = getSiteUrl(locals as App.Locals);
  const ip = clientIp(request);

  if (!isSameOrigin(request, site)) {
    return json({ ok: false, error: 'bad_origin' }, 403);
  }

  // Six submissions per IP per hour is generous for a real enquirer and
  // useless for a spam run.
  const limit = await rateLimit(getCache(locals as App.Locals), `contact:${ip}`, 6, 3600);
  if (!limit.allowed) {
    return json(
      { ok: false, error: 'rate_limited', message: 'Too many submissions. Please try again later.' },
      429,
      { 'Retry-After': String(limit.retryAfterSeconds) },
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ ok: false, error: 'bad_request' }, 400);
  }

  const locale: Locale = form.get('locale') === 'en' ? 'en' : 'id';
  const t = (key: keyof typeof UI) => UI[key][locale];

  // The honeypot is invisible to people; anything in it is a bot. Answer 200
  // so the bot records a success and does not retry with a different shape.
  if (cleanText(form.get('company_website'), 100)) {
    return json({ ok: true, spam: true });
  }

  if (!(await verifyFormToken(env.SESSION_SECRET, form.get('ft')))) {
    return json({ ok: false, error: 'stale_form', message: t('form.error') }, 403);
  }

  if (env.TURNSTILE_SECRET_KEY) {
    const token = String(form.get('cf-turnstile-response') ?? '');
    if (!token || !(await verifyTurnstile(env.TURNSTILE_SECRET_KEY, token, ip))) {
      return json({ ok: false, error: 'captcha_failed', message: t('form.error') }, 400);
    }
  }

  const name = cleanText(form.get('name'), 120);
  const email = cleanText(form.get('email'), 254).toLowerCase();
  const phoneRaw = cleanText(form.get('phone'), 24);
  const company = cleanText(form.get('company'), 140);
  const subjectKey = cleanText(form.get('subject'), 30) || 'other';
  const message = cleanText(form.get('message'), 2000);
  const pageUrl = cleanText(form.get('pageUrl'), 300);
  const consent = form.get('consent');

  const errors: string[] = [];
  if (name.length < 2) errors.push('name');
  if (!isValidEmail(email)) errors.push('email');
  if (!isValidPhone(phoneRaw)) errors.push('phone');
  if (message.length < 10) errors.push('message');
  if (!consent) errors.push('consent');

  if (errors.length > 0) {
    return json({ ok: false, error: 'validation', fields: errors, message: t('form.error') }, 400);
  }

  const phone = normalisePhone(phoneRaw);
  const subjectLabel = SUBJECT_LABELS[subjectKey]?.[locale] ?? subjectKey;

  const stored = await saveEnquiry(locals as App.Locals, {
    id: crypto.randomUUID(),
    name,
    email,
    phone,
    company: company || null,
    subject: subjectLabel,
    message,
    locale,
    page_url: pageUrl || null,
    ipHash: await hashIp(ip),
    userAgent: (request.headers.get('User-Agent') ?? '').slice(0, 250),
  });

  await recordAudit(
    locals as App.Locals, 'public', 'enquiry.received', email,
    stored ? 'stored' : 'no-database', await hashIp(ip),
  );

  // Hand back a pre-filled WhatsApp link. Even if the database is unavailable,
  // the visitor still reaches a human — the enquiry is never simply lost.
  const content = await getContent(locals as App.Locals);
  const wa = whatsappUrl(content.settings, locale, {
    subject: `${subjectLabel} — ${name}${company ? ` (${company})` : ''}`,
    sourceUrl: pageUrl ? `${site}${pageUrl}` : site,
  });

  return json({ ok: true, stored, whatsapp: wa, message: t('form.success') });
};

/** A bare GET is almost always a scanner; answer plainly rather than 500. */
export const GET: APIRoute = () => json({ ok: false, error: 'method_not_allowed' }, 405);
