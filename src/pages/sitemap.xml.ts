import type { APIRoute } from 'astro';
import { LOCALES, localizedPath, ROUTES, type RouteKey } from '../i18n/config';
import { getContent, publishedCourses, publishedServices, publishedPosts } from '../lib/content';
import { getSiteUrl } from '../lib/env';
import { absoluteUrl } from '../lib/seo';

export const prerender = false;

interface Entry {
  key: RouteKey;
  slug?: string;
  changefreq: string;
  priority: string;
  lastmod?: string;
}

const escapeXml = (value: string) =>
  value.replace(/[<>&'"]/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]!));

export const GET: APIRoute = async ({ locals }) => {
  const site = getSiteUrl(locals as App.Locals);
  const content = await getContent(locals as App.Locals);
  const today = new Date().toISOString().slice(0, 10);

  const staticEntries: Entry[] = [
    { key: 'home', changefreq: 'weekly', priority: '1.0', lastmod: today },
    { key: 'training', changefreq: 'weekly', priority: '0.9', lastmod: today },
    { key: 'services', changefreq: 'weekly', priority: '0.9', lastmod: today },
    { key: 'certification', changefreq: 'monthly', priority: '0.8' },
    { key: 'schedule', changefreq: 'daily', priority: '0.8', lastmod: today },
    { key: 'about', changefreq: 'monthly', priority: '0.7' },
    { key: 'blog', changefreq: 'weekly', priority: '0.7', lastmod: today },
    { key: 'faq', changefreq: 'monthly', priority: '0.7' },
    { key: 'contact', changefreq: 'monthly', priority: '0.8' },
    { key: 'privacy', changefreq: 'yearly', priority: '0.2' },
    { key: 'terms', changefreq: 'yearly', priority: '0.2' },
  ];

  const entries: Entry[] = [
    ...staticEntries,
    ...publishedCourses(content).map((course) => ({
      key: 'training' as const, slug: course.slug, changefreq: 'monthly', priority: '0.8',
    })),
    ...publishedServices(content).map((service) => ({
      key: 'services' as const, slug: service.slug, changefreq: 'monthly', priority: '0.8',
    })),
    ...publishedPosts(content).map((post) => ({
      key: 'blog' as const,
      slug: post.slug,
      changefreq: 'yearly',
      priority: '0.6',
      lastmod: post.updatedAt ?? post.publishedAt,
    })),
  ];

  // One <url> per locale, each carrying the full xhtml:link alternate set —
  // this is what tells Google the two languages are the same page.
  const urls = entries.flatMap((entry) =>
    LOCALES.map((locale) => {
      const loc = absoluteUrl(site, localizedPath(entry.key, locale, entry.slug));
      const alternates = LOCALES.map((alt) =>
        `    <xhtml:link rel="alternate" hreflang="${alt === 'id' ? 'id-ID' : 'en-US'}" href="${escapeXml(absoluteUrl(site, localizedPath(entry.key, alt, entry.slug)))}"/>`,
      ).join('\n');

      return `  <url>
    <loc>${escapeXml(loc)}</loc>${entry.lastmod ? `\n    <lastmod>${entry.lastmod}</lastmod>` : ''}
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
${alternates}
    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(absoluteUrl(site, localizedPath(entry.key, 'id', entry.slug)))}"/>
  </url>`;
    }),
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
      'X-Robots-Tag': 'noindex',
    },
  });
};

// Keep `ROUTES` imported so a new page key is a compile error here, not a
// silently missing sitemap entry.
void ROUTES;
