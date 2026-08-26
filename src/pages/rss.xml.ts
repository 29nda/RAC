import type { APIRoute } from 'astro';
import { getContent } from '../lib/content';
import { getSiteUrl } from '../lib/env';
import { buildRss } from '../lib/rss';

export const prerender = false;

export const GET: APIRoute = async ({ locals }) =>
  buildRss(getSiteUrl(locals as App.Locals), await getContent(locals as App.Locals), 'id');
