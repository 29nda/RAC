import type { APIRoute } from 'astro';
import { localizedPath } from '../../i18n/config';
import {
  getContent, publishedCourses, publishedServices,
  publishedPosts, publishedFaqs, upcomingSchedule,
} from '../../lib/content';
import { getSiteUrl } from '../../lib/env';
import { absoluteUrl } from '../../lib/seo';
import { stripTags } from '../../lib/security';

export const prerender = false;

/**
 * A stable, bilingual JSON view of everything the public site publishes.
 *
 * Exposed deliberately: it gives answering engines and integrators one
 * canonical, parseable source instead of scraping HTML, and it makes the site
 * usable as a headless content source (mobile app, partner listing, LMS).
 */
export const GET: APIRoute = async ({ locals }) => {
  const site = getSiteUrl(locals as App.Locals);
  const content = await getContent(locals as App.Locals);
  const s = content.settings;

  const payload = {
    '@context': 'https://schema.org',
    generatedAt: new Date().toISOString(),
    version: 1,
    license: 'Content may be quoted with attribution to Rope Access Center.',
    languages: ['id', 'en'],

    organisation: {
      name: s.brandName,
      legalName: s.legalName,
      tagline: s.tagline,
      description: s.description,
      founded: s.founded,
      url: site,
      whatsapp: `+${s.whatsapp}`,
      email: s.email,
      address: {
        street: s.addressLine,
        city: s.city,
        region: s.region,
        postalCode: s.postalCode,
        country: 'ID',
        latitude: s.latitude,
        longitude: s.longitude,
      },
      openingHours: s.openingHours,
      social: s.social,
      accreditations: content.accreditations.map((a) => ({ name: a.name, note: a.note })),
      stats: s.stats,
    },

    courses: publishedCourses(content).map((course) => ({
      slug: course.slug,
      code: course.code,
      scheme: course.scheme,
      level: course.level,
      title: course.title,
      summary: course.summary,
      duration: course.duration,
      certificate: course.certificate,
      prerequisites: course.prerequisites,
      outcomes: course.outcomes,
      syllabus: course.syllabus,
      url: {
        id: absoluteUrl(site, localizedPath('training', 'id', course.slug)),
        en: absoluteUrl(site, localizedPath('training', 'en', course.slug)),
      },
    })),

    services: publishedServices(content).map((service) => ({
      slug: service.slug,
      title: service.title,
      summary: service.summary,
      scope: service.scope,
      industries: service.industries,
      deliverables: service.deliverables,
      url: {
        id: absoluteUrl(site, localizedPath('services', 'id', service.slug)),
        en: absoluteUrl(site, localizedPath('services', 'en', service.slug)),
      },
    })),

    schedule: upcomingSchedule(content).map((session) => ({
      courseSlug: session.courseSlug,
      startDate: session.startDate,
      endDate: session.endDate,
      location: session.location,
      status: session.status,
      seatsLeft: session.status === 'request' ? null : session.seatsLeft,
    })),

    faqs: publishedFaqs(content).map((faq) => ({
      group: faq.group,
      question: faq.question,
      answer: faq.answer,
    })),

    articles: publishedPosts(content).map((post) => ({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      author: post.author,
      publishedAt: post.publishedAt,
      tags: post.tags,
      // Plain text keeps the payload usable without an HTML parser.
      body: {
        id: stripTags(post.body.id, 100_000),
        en: stripTags(post.body.en, 100_000),
      },
      url: {
        id: absoluteUrl(site, localizedPath('blog', 'id', post.slug)),
        en: absoluteUrl(site, localizedPath('blog', 'en', post.slug)),
      },
    })),
  };

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=1800, stale-while-revalidate=86400',
      'Access-Control-Allow-Origin': '*',
      'X-Robots-Tag': 'noindex',
    },
  });
};
