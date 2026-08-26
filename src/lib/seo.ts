import type { Locale, RouteKey } from '../i18n/config';
import { LOCALE_META, LOCALES, localizedPath } from '../i18n/config';
import type { Course, Faq, Post, Service, SiteSettings, ScheduleEntry } from './types';
import { pick } from '../i18n/ui';
import { stripTags } from './security';

/* -------------------------------------------------------------------------- */
/* Canonical + alternate URLs                                                  */
/* -------------------------------------------------------------------------- */

export function absoluteUrl(site: string, path: string): string {
  return `${site.replace(/\/+$/, '')}${path.startsWith('/') ? path : `/${path}`}`;
}

export interface AlternateLink {
  hreflang: string;
  href: string;
}

/**
 * `hreflang` set for the current page, including the `x-default` that tells a
 * crawler which version to show a user whose language we do not target.
 */
export function alternateLinks(
  site: string,
  key: RouteKey,
  slug: string | undefined,
): AlternateLink[] {
  const links: AlternateLink[] = LOCALES.map((locale) => ({
    hreflang: LOCALE_META[locale].htmlLang.toLowerCase(),
    href: absoluteUrl(site, localizedPath(key, locale, slug)),
  }));
  links.push({ hreflang: 'x-default', href: absoluteUrl(site, localizedPath(key, 'id', slug)) });
  return links;
}

/* -------------------------------------------------------------------------- */
/* JSON-LD                                                                     */
/* -------------------------------------------------------------------------- */

type Json = Record<string, unknown>;

export function organizationSchema(site: string, s: SiteSettings, locale: Locale): Json {
  const socials = Object.values(s.social).filter(Boolean);
  return {
    '@type': 'EducationalOrganization',
    '@id': `${site}/#organization`,
    name: s.brandName,
    legalName: s.legalName,
    alternateName: 'RAC',
    url: site,
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl(site, '/brand/logo-onLight-720.webp'),
      width: 720,
      height: 355,
    },
    image: absoluteUrl(site, '/brand/icon-512.png'),
    description: pick(s.description, locale),
    slogan: pick(s.tagline, locale),
    foundingDate: s.founded,
    email: s.email,
    telephone: `+${s.whatsapp}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: pick(s.addressLine, locale),
      addressLocality: s.city,
      addressRegion: s.region,
      postalCode: s.postalCode,
      addressCountry: s.countryCode,
    },
    geo: { '@type': 'GeoCoordinates', latitude: s.latitude, longitude: s.longitude },
    areaServed: { '@type': 'Country', name: 'Indonesia' },
    knowsLanguage: ['id-ID', 'en-US'],
    sameAs: socials,
    contactPoint: [{
      '@type': 'ContactPoint',
      contactType: locale === 'id' ? 'Layanan pelanggan' : 'Customer service',
      telephone: `+${s.whatsapp}`,
      email: s.email,
      availableLanguage: ['Indonesian', 'English'],
      areaServed: 'ID',
    }],
  };
}

/**
 * `LocalBusiness` alongside the organisation node — this is what drives the
 * map pack and "near me" style results, which matter for a training centre
 * people physically travel to.
 */
export function localBusinessSchema(site: string, s: SiteSettings, locale: Locale): Json {
  return {
    '@type': 'ProfessionalService',
    '@id': `${site}/#localbusiness`,
    name: s.brandName,
    parentOrganization: { '@id': `${site}/#organization` },
    url: site,
    image: absoluteUrl(site, '/brand/icon-512.png'),
    telephone: `+${s.whatsapp}`,
    email: s.email,
    priceRange: '$$',
    currenciesAccepted: 'IDR',
    address: {
      '@type': 'PostalAddress',
      streetAddress: pick(s.addressLine, locale),
      addressLocality: s.city,
      addressRegion: s.region,
      postalCode: s.postalCode,
      addressCountry: s.countryCode,
    },
    geo: { '@type': 'GeoCoordinates', latitude: s.latitude, longitude: s.longitude },
    openingHoursSpecification: [{
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00',
    }],
    areaServed: [
      { '@type': 'Country', name: 'Indonesia' },
      { '@type': 'AdministrativeArea', name: 'DKI Jakarta' },
    ],
  };
}

export function websiteSchema(site: string, s: SiteSettings, locale: Locale): Json {
  return {
    '@type': 'WebSite',
    '@id': `${site}/#website`,
    url: site,
    name: s.brandName,
    description: pick(s.description, locale),
    publisher: { '@id': `${site}/#organization` },
    inLanguage: LOCALE_META[locale].htmlLang,
  };
}

export function breadcrumbSchema(
  site: string,
  trail: Array<{ name: string; path: string }>,
): Json {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(site, item.path),
    })),
  };
}

export function courseSchema(
  site: string,
  course: Course,
  locale: Locale,
  s: SiteSettings,
  sessions: ScheduleEntry[] = [],
): Json {
  const path = localizedPath('training', locale, course.slug);
  const instances = sessions
    .filter((session) => session.courseSlug === course.slug && session.status !== 'request')
    .slice(0, 6)
    .map((session) => ({
      '@type': 'CourseInstance',
      courseMode: 'onsite',
      courseWorkload: pick(course.duration, locale),
      startDate: session.startDate,
      endDate: session.endDate,
      location: {
        '@type': 'Place',
        name: pick(session.location, locale),
        address: {
          '@type': 'PostalAddress',
          addressLocality: s.city,
          addressCountry: s.countryCode,
        },
      },
    }));

  return {
    '@type': 'Course',
    '@id': absoluteUrl(site, path) + '#course',
    name: pick(course.title, locale),
    description: pick(course.summary, locale),
    url: absoluteUrl(site, path),
    courseCode: course.code,
    educationalCredentialAwarded: pick(course.certificate, locale),
    educationalLevel: course.level,
    inLanguage: LOCALE_META[locale].htmlLang,
    teaches: course.outcomes[locale],
    coursePrerequisites: course.prerequisites[locale]?.join(' · '),
    timeRequired: pick(course.duration, locale),
    provider: { '@id': `${site}/#organization` },
    ...(instances.length ? { hasCourseInstance: instances } : {}),
    offers: {
      '@type': 'Offer',
      category: 'Professional Training',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'IDR',
      url: absoluteUrl(site, path),
    },
  };
}

export function serviceSchema(site: string, service: Service, locale: Locale): Json {
  const path = localizedPath('services', locale, service.slug);
  return {
    '@type': 'Service',
    '@id': absoluteUrl(site, path) + '#service',
    name: pick(service.title, locale),
    description: pick(service.summary, locale),
    url: absoluteUrl(site, path),
    serviceType: pick(service.title, locale),
    provider: { '@id': `${site}/#organization` },
    areaServed: { '@type': 'Country', name: 'Indonesia' },
    audience: {
      '@type': 'BusinessAudience',
      name: service.industries[locale]?.join(', '),
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: pick(service.title, locale),
      itemListElement: (service.scope[locale] ?? []).map((item) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: item },
      })),
    },
  };
}

export function articleSchema(site: string, post: Post, locale: Locale): Json {
  const path = localizedPath('blog', locale, post.slug);
  return {
    '@type': 'Article',
    '@id': absoluteUrl(site, path) + '#article',
    headline: pick(post.title, locale),
    description: pick(post.excerpt, locale),
    url: absoluteUrl(site, path),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    inLanguage: LOCALE_META[locale].htmlLang,
    articleSection: pick(post.category, locale),
    keywords: post.tags.join(', '),
    wordCount: stripTags(pick(post.body, locale), 100_000).split(/\s+/).length,
    image: absoluteUrl(site, post.image),
    author: { '@type': 'Person', name: post.author, worksFor: { '@id': `${site}/#organization` } },
    publisher: { '@id': `${site}/#organization` },
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(site, path) },
  };
}

export function faqSchema(faqs: Faq[], locale: Locale): Json {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: pick(faq.question, locale),
      acceptedAnswer: { '@type': 'Answer', text: pick(faq.answer, locale) },
    })),
  };
}

export function itemListSchema(
  site: string,
  name: string,
  items: Array<{ name: string; path: string; description?: string }>,
): Json {
  return {
    '@type': 'ItemList',
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      description: item.description,
      url: absoluteUrl(site, item.path),
    })),
  };
}

/** Wraps every node for a page into one `@graph`, which crawlers prefer. */
export function graph(nodes: Json[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': nodes.filter(Boolean),
  });
}
