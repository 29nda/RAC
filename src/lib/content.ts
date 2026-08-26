import type { SiteContent, CollectionName } from './types';
import { defaultContent } from '../data';
import { getCache, getDB, deferred } from './env';

const CACHE_KEY = 'content:v1';
const CACHE_TTL_SECONDS = 300;

/** Cloned defaults, so a mutation in one request can never leak into the next. */
function cloneDefaults(): SiteContent {
  return structuredClone(defaultContent);
}

type Row = { collection: string; item_key: string; payload: string; deleted: number };

/**
 * Merge dashboard edits (D1) over the repository defaults.
 *
 * The database holds *overrides*, not a full mirror: an item edited in the
 * dashboard replaces the matching default, a new item is appended, and an item
 * flagged `deleted` is removed. That keeps the repository as the source of
 * truth for anything nobody has touched, and keeps the database small.
 */
function applyOverrides(base: SiteContent, rows: Row[]): SiteContent {
  const keyFieldFor = (collection: string) =>
    collection === 'courses' || collection === 'services' || collection === 'posts'
      ? 'slug'
      : collection === 'pages'
        ? 'key'
        : 'id';

  for (const row of rows) {
    const collection = row.collection as CollectionName | 'settings';

    if (collection === 'settings') {
      try {
        Object.assign(base.settings, JSON.parse(row.payload));
      } catch { /* malformed row — keep defaults */ }
      continue;
    }

    if (collection === 'pages') {
      if (row.deleted) { delete base.pages[row.item_key]; continue; }
      try {
        base.pages[row.item_key] = {
          ...base.pages[row.item_key],
          ...JSON.parse(row.payload),
          key: row.item_key,
        };
      } catch { /* ignore */ }
      continue;
    }

    const list = base[collection] as unknown as Array<Record<string, unknown>> | undefined;
    if (!Array.isArray(list)) continue;

    const field = keyFieldFor(collection);
    const index = list.findIndex((item) => String(item[field]) === row.item_key);

    if (row.deleted) {
      if (index >= 0) list.splice(index, 1);
      continue;
    }

    let parsed: Record<string, unknown>;
    try { parsed = JSON.parse(row.payload); } catch { continue; }
    parsed[field] = row.item_key;

    if (index >= 0) list[index] = { ...list[index], ...parsed };
    else list.push(parsed);
  }

  sortCollections(base);
  return base;
}

function sortCollections(content: SiteContent): void {
  const byOrder = (a: { order?: number }, b: { order?: number }) =>
    (a.order ?? 999) - (b.order ?? 999);
  content.courses.sort(byOrder);
  content.services.sort(byOrder);
  content.faqs.sort(byOrder);
  content.testimonials.sort(byOrder);
  content.team.sort(byOrder);
  content.accreditations.sort(byOrder);
  content.posts.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  content.schedule.sort((a, b) => a.startDate.localeCompare(b.startDate));
}

async function readOverrides(db: D1Database): Promise<Row[]> {
  const { results } = await db
    .prepare('SELECT collection, item_key, payload, deleted FROM content ORDER BY collection, item_key')
    .all<Row>();
  return results ?? [];
}

/**
 * Resolved site content for the current request.
 *
 * Reads are served from KV where available (a single JSON blob, refreshed on
 * every dashboard save) so a page render normally costs zero database queries.
 */
export async function getContent(locals: App.Locals): Promise<SiteContent> {
  const db = getDB(locals);
  const kv = getCache(locals);

  if (!db) {
    // No database bound — the repository defaults are the whole site.
    return sortedDefaults();
  }

  if (kv) {
    try {
      const cached = await kv.get(CACHE_KEY, 'json');
      if (cached) return cached as SiteContent;
    } catch { /* cache miss or KV unavailable — fall through to D1 */ }
  }

  let content: SiteContent;
  try {
    content = applyOverrides(cloneDefaults(), await readOverrides(db));
  } catch {
    // Database unreachable or not migrated yet: never fail the page.
    return sortedDefaults();
  }

  if (kv) {
    deferred(locals, kv.put(CACHE_KEY, JSON.stringify(content), {
      expirationTtl: CACHE_TTL_SECONDS,
    }));
  }
  return content;
}

function sortedDefaults(): SiteContent {
  const content = cloneDefaults();
  sortCollections(content);
  return content;
}

/** Drop the cached blob so the next request rebuilds it from D1. */
export async function invalidateContentCache(locals: App.Locals): Promise<void> {
  const kv = getCache(locals);
  if (!kv) return;
  try { await kv.delete(CACHE_KEY); } catch { /* nothing to invalidate */ }
}

/* -------------------------------------------------------------------------- */
/* Selectors                                                                   */
/* -------------------------------------------------------------------------- */

export const publishedCourses = (c: SiteContent) => c.courses.filter((x) => x.published);
export const publishedServices = (c: SiteContent) => c.services.filter((x) => x.published);
export const publishedPosts = (c: SiteContent) => c.posts.filter((x) => x.published);
export const publishedFaqs = (c: SiteContent) => c.faqs.filter((x) => x.published);
export const publishedTeam = (c: SiteContent) => c.team.filter((x) => x.published);
export const publishedTestimonials = (c: SiteContent) => c.testimonials.filter((x) => x.published);

/** Upcoming sessions only — anything that already finished is dropped. */
export function upcomingSchedule(c: SiteContent, now = new Date()) {
  const today = now.toISOString().slice(0, 10);
  return c.schedule
    .filter((s) => s.published && s.endDate >= today)
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
}

export function findCourse(c: SiteContent, slug: string) {
  return publishedCourses(c).find((x) => x.slug === slug);
}

export function findService(c: SiteContent, slug: string) {
  return publishedServices(c).find((x) => x.slug === slug);
}

export function findPost(c: SiteContent, slug: string) {
  return publishedPosts(c).find((x) => x.slug === slug);
}

export function getPage(c: SiteContent, key: string) {
  return c.pages[key] ?? { key };
}

/**
 * A collection as a plain array of records, whichever shape it has natively.
 *
 * `pages` is keyed by page name while every other collection is already a
 * list; the dashboard treats them identically, so the difference is absorbed
 * here rather than at each call site.
 */
export function collectionItems(
  c: SiteContent,
  name: string,
): Array<Record<string, unknown>> {
  if (name === 'pages') {
    return Object.values(c.pages) as unknown as Array<Record<string, unknown>>;
  }
  const source = (c as unknown as Record<string, unknown>)[name];
  return Array.isArray(source) ? (source as Array<Record<string, unknown>>) : [];
}
