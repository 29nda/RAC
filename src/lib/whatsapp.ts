import type { Locale } from '../i18n/config';
import type { SiteSettings } from './types';

/**
 * WhatsApp is the primary conversion path for this business, so every CTA
 * carries a pre-filled message naming what the visitor was looking at. That
 * context is what turns a cold "Hi" into a quotable enquiry.
 */
export interface WhatsAppOptions {
  /** What the visitor is enquiring about, e.g. a course title. */
  subject?: string;
  /** Page the click came from, appended so the sales team can follow up. */
  sourceUrl?: string;
}

export function whatsappUrl(
  settings: SiteSettings,
  locale: Locale,
  options: WhatsAppOptions = {},
): string {
  const number = settings.whatsapp.replace(/\D/g, '');
  const greeting = settings.whatsappGreeting[locale] || settings.whatsappGreeting.id;

  const parts = [greeting];
  parts.push(options.subject ? ` ${options.subject}.` : (locale === 'id' ? ' layanan RAC.' : ' RAC services.'));
  if (options.sourceUrl) {
    parts.push(locale === 'id' ? `\n\nHalaman: ${options.sourceUrl}` : `\n\nPage: ${options.sourceUrl}`);
  }

  return `https://wa.me/${number}?text=${encodeURIComponent(parts.join(''))}`;
}

/** `tel:` link, digits only. */
export function telUrl(settings: SiteSettings): string {
  return `tel:+${settings.whatsapp.replace(/\D/g, '')}`;
}

export function mailtoUrl(settings: SiteSettings, subject?: string): string {
  const query = subject ? `?subject=${encodeURIComponent(subject)}` : '';
  return `mailto:${settings.email}${query}`;
}
