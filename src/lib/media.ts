import { getMedia } from './env';

/**
 * Media pipeline.
 *
 * Uploads land in R2 and are served back through `/media/[key]`, which sets a
 * one-year immutable cache header. Keys are content-addressed by upload time
 * plus a random suffix, so re-uploading a replacement never has to bust a
 * cached URL belonging to a different image.
 */

export const MAX_UPLOAD_BYTES = 8 * 1024 * 1024; // 8 MB

export const ALLOWED_MIME: Record<string, string> = {
  'image/webp': 'webp',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/avif': 'avif',
  'image/svg+xml': 'svg',
  'application/pdf': 'pdf',
};

export interface MediaItem {
  key: string;
  url: string;
  size: number;
  uploadedAt: string;
  contentType: string;
  alt?: string;
}

export function isAllowedMime(type: string): boolean {
  return Object.hasOwn(ALLOWED_MIME, type);
}

/** Safe, collision-resistant object key derived from the original filename. */
export function buildMediaKey(filename: string, contentType: string): string {
  const ext = ALLOWED_MIME[contentType] ?? 'bin';
  const base = filename
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60) || 'file';

  const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const suffix = crypto.randomUUID().slice(0, 8);
  return `${stamp}/${base}-${suffix}.${ext}`;
}

export function mediaUrl(key: string): string {
  return `/media/${key}`;
}

export async function listMedia(locals: App.Locals, limit = 200): Promise<MediaItem[]> {
  const bucket = getMedia(locals);
  if (!bucket) return [];

  try {
    const listing = await bucket.list({ limit, include: ['httpMetadata', 'customMetadata'] });
    return listing.objects
      .map((object) => ({
        key: object.key,
        url: mediaUrl(object.key),
        size: object.size,
        uploadedAt: object.uploaded.toISOString(),
        contentType: object.httpMetadata?.contentType ?? 'application/octet-stream',
        alt: object.customMetadata?.alt,
      }))
      .sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt));
  } catch {
    return [];
  }
}

/**
 * Responsive `srcset` for an image served through Cloudflare.
 *
 * On a zone with Image Resizing enabled the `/cdn-cgi/image/` prefix produces
 * real derivatives; without it the plain URL is returned, so the markup stays
 * valid on the free plan and simply serves one size.
 */
export interface SrcSetOptions {
  widths?: number[];
  quality?: number;
  format?: 'auto' | 'webp' | 'avif';
  resize?: boolean;
}

export function buildSrcSet(src: string, options: SrcSetOptions = {}): string | undefined {
  const { widths = [480, 768, 1200, 1600], quality = 80, format = 'auto', resize = false } = options;
  if (!resize || !src.startsWith('/') || src.endsWith('.svg')) return undefined;

  return widths
    .map((w) => `/cdn-cgi/image/width=${w},quality=${quality},format=${format}${src} ${w}w`)
    .join(', ');
}
