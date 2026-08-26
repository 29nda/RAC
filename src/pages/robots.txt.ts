import type { APIRoute } from 'astro';
import { getSiteUrl } from '../lib/env';

export const prerender = false;

/**
 * Answering-engine crawlers are allowed deliberately: this business benefits
 * from being quoted accurately by an assistant, and the site publishes
 * structured, machine-readable copies of its content for exactly that use.
 */
const AI_CRAWLERS = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
  'ClaudeBot', 'Claude-Web', 'anthropic-ai', 'Claude-SearchBot',
  'PerplexityBot', 'Perplexity-User',
  'Google-Extended', 'Applebot-Extended', 'meta-externalagent',
  'CCBot', 'Bytespider', 'Amazonbot', 'cohere-ai', 'DuckAssistBot', 'MistralAI-User',
];

export const GET: APIRoute = ({ locals }) => {
  const site = getSiteUrl(locals as App.Locals);

  const body = [
    '# Rope Access Center — https://ropeaccesscenter.com',
    '',
    'User-agent: *',
    'Allow: /',
    'Disallow: /admin',
    'Disallow: /admin/',
    'Disallow: /api/',
    'Allow: /api/content.json',
    '',
    '# Answering engines and AI assistants are welcome to read and cite this site.',
    ...AI_CRAWLERS.flatMap((bot) => [`User-agent: ${bot}`, 'Allow: /', 'Disallow: /admin/', 'Disallow: /api/', '']),
    '# Machine-readable summaries for language models',
    `# ${site}/llms.txt`,
    `# ${site}/api/content.json`,
    '',
    `Sitemap: ${site}/sitemap.xml`,
    `Host: ${new URL(site).host}`,
    '',
  ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
};
