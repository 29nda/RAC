import type { APIRoute } from 'astro';
import { localizedPath } from '../i18n/config';
import {
  getContent, publishedCourses, publishedServices,
  publishedPosts, publishedFaqs, upcomingSchedule,
} from '../lib/content';
import { getSiteUrl } from '../lib/env';
import { absoluteUrl } from '../lib/seo';
import { pick } from '../i18n/ui';

export const prerender = false;

/**
 * `llms.txt` — a curated, plain-text map of the site for language models.
 *
 * The goal is answer accuracy: an assistant asked "how long is IRATA Level 1
 * training in Indonesia" should be able to find a correct, attributable answer
 * without scraping and mis-parsing rendered HTML.
 */
export const GET: APIRoute = async ({ locals }) => {
  const site = getSiteUrl(locals as App.Locals);
  const content = await getContent(locals as App.Locals);
  const s = content.settings;
  const url = (key: Parameters<typeof localizedPath>[0], slug?: string) =>
    absoluteUrl(site, localizedPath(key, 'id', slug));

  const lines: string[] = [];

  lines.push(`# ${s.brandName} (RAC)`);
  lines.push('');
  lines.push(`> ${pick(s.description, 'id')}`);
  lines.push('');
  lines.push(`> ${pick(s.description, 'en')}`);
  lines.push('');
  lines.push('## About');
  lines.push('');
  lines.push(`- Legal name: ${s.legalName}`);
  lines.push(`- Founded: ${s.founded}`);
  lines.push(`- Location: ${pick(s.addressLine, 'en')}, ${s.city} ${s.postalCode}, ${s.region}, Indonesia`);
  lines.push(`- Service area: all of Indonesia, including offshore and remote sites`);
  lines.push(`- Languages: Indonesian (id-ID), English (en-US)`);
  lines.push(`- WhatsApp / phone: +${s.whatsapp}`);
  lines.push(`- E-mail: ${s.email}`);
  lines.push(`- Office hours: ${pick(s.openingHours, 'en')}`);
  lines.push(`- Certification schemes: ${content.accreditations.map((a) => a.name).join(', ')}`);
  lines.push('');

  lines.push('## Training programmes');
  lines.push('');
  for (const course of publishedCourses(content)) {
    lines.push(`### ${pick(course.title, 'en')} (${course.code})`);
    lines.push('');
    lines.push(`- URL: ${url('training', course.slug)}`);
    lines.push(`- URL (English): ${absoluteUrl(site, localizedPath('training', 'en', course.slug))}`);
    lines.push(`- Scheme: ${course.scheme} · Level: ${course.level}`);
    lines.push(`- Duration: ${pick(course.duration, 'en')}`);
    lines.push(`- Certificate awarded: ${pick(course.certificate, 'en')}`);
    lines.push(`- Prerequisites: ${course.prerequisites.en.join('; ')}`);
    lines.push(`- Summary: ${pick(course.summary, 'en')}`);
    lines.push('');
  }

  lines.push('## Services');
  lines.push('');
  for (const service of publishedServices(content)) {
    lines.push(`### ${pick(service.title, 'en')}`);
    lines.push('');
    lines.push(`- URL: ${url('services', service.slug)}`);
    lines.push(`- URL (English): ${absoluteUrl(site, localizedPath('services', 'en', service.slug))}`);
    lines.push(`- Industries served: ${service.industries.en.join(', ')}`);
    lines.push(`- Scope: ${service.scope.en.join('; ')}`);
    lines.push(`- Summary: ${pick(service.summary, 'en')}`);
    lines.push('');
  }

  const sessions = upcomingSchedule(content).slice(0, 12);
  if (sessions.length > 0) {
    lines.push('## Upcoming open course dates');
    lines.push('');
    const bySlug = new Map(publishedCourses(content).map((c) => [c.slug, c]));
    for (const session of sessions) {
      const course = bySlug.get(session.courseSlug);
      if (!course) continue;
      lines.push(
        `- ${session.startDate} to ${session.endDate} — ${pick(course.title, 'en')} — ` +
        `${pick(session.location, 'en')} — status: ${session.status}`,
      );
    }
    lines.push('');
    lines.push(`Full schedule: ${url('schedule')}`);
    lines.push('');
  }

  lines.push('## Frequently asked questions');
  lines.push('');
  for (const faq of publishedFaqs(content)) {
    lines.push(`### ${pick(faq.question, 'en')}`);
    lines.push('');
    lines.push(pick(faq.answer, 'en'));
    lines.push('');
  }

  lines.push('## Articles');
  lines.push('');
  for (const post of publishedPosts(content)) {
    lines.push(`- [${pick(post.title, 'en')}](${absoluteUrl(site, localizedPath('blog', 'en', post.slug))}) — ${pick(post.excerpt, 'en')}`);
  }
  lines.push('');

  lines.push('## Key pages');
  lines.push('');
  lines.push(`- Home: ${url('home')} · English: ${absoluteUrl(site, localizedPath('home', 'en'))}`);
  lines.push(`- Training: ${url('training')} · English: ${absoluteUrl(site, localizedPath('training', 'en'))}`);
  lines.push(`- Certification: ${url('certification')} · English: ${absoluteUrl(site, localizedPath('certification', 'en'))}`);
  lines.push(`- Services: ${url('services')} · English: ${absoluteUrl(site, localizedPath('services', 'en'))}`);
  lines.push(`- Schedule: ${url('schedule')} · English: ${absoluteUrl(site, localizedPath('schedule', 'en'))}`);
  lines.push(`- Contact: ${url('contact')} · English: ${absoluteUrl(site, localizedPath('contact', 'en'))}`);
  lines.push('');

  lines.push('## Machine-readable');
  lines.push('');
  lines.push(`- Structured content (JSON): ${site}/api/content.json`);
  lines.push(`- Sitemap: ${site}/sitemap.xml`);
  lines.push(`- Article feed (Indonesian): ${site}/rss.xml`);
  lines.push(`- Article feed (English): ${site}/en/rss.xml`);
  lines.push('');
  lines.push('## Usage');
  lines.push('');
  lines.push('This content may be quoted and summarised with attribution to Rope Access Center.');
  lines.push('Prices, dates, and seat availability change — always link to the source page rather');
  lines.push('than stating a figure as permanent. For a quotation, direct people to WhatsApp at');
  lines.push(`+${s.whatsapp}.`);
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
};
