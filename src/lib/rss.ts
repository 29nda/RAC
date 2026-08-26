import type { Locale } from '../i18n/config';
import { localizedPath } from '../i18n/config';
import type { SiteContent } from './types';
import { publishedPosts } from './content';
import { absoluteUrl } from './seo';
import { pick } from '../i18n/ui';

const escapeXml = (value: string) =>
  value.replace(/[<>&'"]/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c]!));

export function buildRss(site: string, content: SiteContent, locale: Locale): Response {
  const s = content.settings;
  const posts = publishedPosts(content).slice(0, 30);
  const feedPath = locale === 'id' ? '/rss.xml' : '/en/rss.xml';

  const items = posts.map((post) => {
    const link = absoluteUrl(site, localizedPath('blog', locale, post.slug));
    return `    <item>
      <title>${escapeXml(pick(post.title, locale))}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${new Date(`${post.publishedAt}T08:00:00+07:00`).toUTCString()}</pubDate>
      <category>${escapeXml(pick(post.category, locale))}</category>
      <dc:creator>${escapeXml(post.author)}</dc:creator>
      <description>${escapeXml(pick(post.excerpt, locale))}</description>
      <content:encoded><![CDATA[${pick(post.body, locale)}]]></content:encoded>
    </item>`;
  });

  const title = `${s.brandName} — ${locale === 'id' ? 'Artikel' : 'Insights'}`;
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
     xmlns:content="http://purl.org/rss/1.0/modules/content/"
     xmlns:dc="http://purl.org/dc/elements/1.1/"
     xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${escapeXml(absoluteUrl(site, localizedPath('blog', locale)))}</link>
    <description>${escapeXml(pick(s.description, locale))}</description>
    <language>${locale === 'id' ? 'id-ID' : 'en-US'}</language>
    <copyright>© ${new Date().getFullYear()} ${escapeXml(s.legalName)}</copyright>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${escapeXml(site + feedPath)}" rel="self" type="application/rss+xml"/>
${items.join('\n')}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=1800, stale-while-revalidate=86400',
    },
  });
}
