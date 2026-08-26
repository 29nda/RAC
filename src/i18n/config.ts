/**
 * Bilingual routing configuration.
 *
 * Indonesian is the default locale and lives at the site root (`/pelatihan`);
 * English is prefixed (`/en/training`). Every page carries a stable `key` so
 * the language switcher can map a URL to its counterpart without guesswork,
 * and so `hreflang` pairs are always correct.
 */

export const LOCALES = ['id', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'id';

export const LOCALE_META: Record<Locale, {
  label: string;
  short: string;
  htmlLang: string;
  ogLocale: string;
  dir: 'ltr';
}> = {
  id: { label: 'Bahasa Indonesia', short: 'ID', htmlLang: 'id-ID', ogLocale: 'id_ID', dir: 'ltr' },
  en: { label: 'English', short: 'EN', htmlLang: 'en-US', ogLocale: 'en_US', dir: 'ltr' },
};

/** Page keys → localized URL segments. */
export const ROUTES = {
  home:          { id: '',                    en: '' },
  about:         { id: 'tentang-kami',        en: 'about-us' },
  training:      { id: 'pelatihan',           en: 'training' },
  certification: { id: 'sertifikasi',         en: 'certification' },
  services:      { id: 'layanan',             en: 'services' },
  schedule:      { id: 'jadwal-pelatihan',    en: 'training-schedule' },
  blog:          { id: 'artikel',             en: 'insights' },
  faq:           { id: 'faq',                 en: 'faq' },
  contact:       { id: 'kontak',              en: 'contact' },
  privacy:       { id: 'kebijakan-privasi',   en: 'privacy-policy' },
  terms:         { id: 'syarat-ketentuan',    en: 'terms-conditions' },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof ROUTES;

/** Collection pages that render a detail view under a listing route. */
export const DETAIL_PARENTS = {
  training: 'training',
  services: 'services',
  blog: 'blog',
} as const satisfies Record<string, RouteKey>;

export type CollectionKey = keyof typeof DETAIL_PARENTS;

/**
 * Build an absolute-path URL for a page key in a given locale.
 * `slug` appends a detail segment (e.g. a course or article slug).
 */
export function localizedPath(key: RouteKey, locale: Locale, slug?: string): string {
  const segment = ROUTES[key][locale];
  const parts = [locale === DEFAULT_LOCALE ? '' : locale, segment, slug]
    .filter((p): p is string => Boolean(p));
  return '/' + parts.join('/');
}

/** Resolve an incoming pathname into `{ locale, key, slug }`, or `null` if unknown. */
export function matchPath(pathname: string): {
  locale: Locale;
  key: RouteKey;
  slug?: string;
} | null {
  const segments = pathname.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);

  let locale: Locale = DEFAULT_LOCALE;
  if (segments[0] === 'en') {
    locale = 'en';
    segments.shift();
  }

  if (segments.length === 0) return { locale, key: 'home' };

  const [head, ...rest] = segments;
  const entry = (Object.entries(ROUTES) as [RouteKey, Record<Locale, string>][])
    .find(([, slugs]) => slugs[locale] === head);

  if (!entry) return null;
  const [key] = entry;

  if (rest.length === 0) return { locale, key };
  if (rest.length === 1 && key in DETAIL_PARENTS) {
    return { locale, key, slug: rest[0] };
  }
  return null;
}

/** The same page in the other language — used by the language switcher. */
export function alternatePath(
  key: RouteKey,
  slug: string | undefined,
  target: Locale,
): string {
  return localizedPath(key, target, slug);
}

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
