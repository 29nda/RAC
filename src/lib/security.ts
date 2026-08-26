/**
 * Security primitives — all built on WebCrypto so they run unchanged on the
 * Workers runtime (no Node crypto, no external dependency).
 */

const enc = new TextEncoder();

/* -------------------------------------------------------------------------- */
/* Random + constant-time comparison                                           */
/* -------------------------------------------------------------------------- */

export function randomHex(bytes = 32): string {
  const buf = new Uint8Array(bytes);
  crypto.getRandomValues(buf);
  return [...buf].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/** Comparison whose duration does not depend on where the strings differ. */
export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function toHex(buf: ArrayBuffer): string {
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/* -------------------------------------------------------------------------- */
/* Password hashing — PBKDF2-SHA256                                            */
/* -------------------------------------------------------------------------- */

const PBKDF2_ITERATIONS = 210_000;

/** Produces `pbkdf2$<iterations>$<saltHex>$<hashHex>`. */
export async function hashPassword(
  password: string,
  iterations = PBKDF2_ITERATIONS,
): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await pbkdf2(password, salt, iterations);
  return `pbkdf2$${iterations}$${toHex(salt.buffer as ArrayBuffer)}$${toHex(hash)}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const parts = stored.split('$');
  if (parts.length !== 4 || parts[0] !== 'pbkdf2') return false;

  const iterations = Number.parseInt(parts[1]!, 10);
  if (!Number.isFinite(iterations) || iterations < 1000) return false;

  const salt = hexToBytes(parts[2]!);
  if (!salt) return false;

  const hash = await pbkdf2(password, salt, iterations);
  return timingSafeEqual(toHex(hash), parts[3]!);
}

async function pbkdf2(
  password: string,
  salt: Uint8Array,
  iterations: number,
): Promise<ArrayBuffer> {
  const key = await crypto.subtle.importKey(
    'raw', enc.encode(password), 'PBKDF2', false, ['deriveBits'],
  );
  return crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: salt as BufferSource, iterations, hash: 'SHA-256' },
    key,
    256,
  );
}

function hexToBytes(hex: string): Uint8Array | null {
  if (hex.length % 2 !== 0 || !/^[0-9a-f]*$/i.test(hex)) return null;
  const out = new Uint8Array(hex.length / 2);
  for (let i = 0; i < out.length; i++) out[i] = Number.parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  return out;
}

/* -------------------------------------------------------------------------- */
/* HMAC-signed tokens (sessions, CSRF)                                         */
/* -------------------------------------------------------------------------- */

async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify'],
  );
}

function b64urlEncode(input: string): string {
  const bytes = enc.encode(input);
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function b64urlDecode(input: string): string | null {
  try {
    const padded = input.replace(/-/g, '+').replace(/_/g, '/')
      .padEnd(Math.ceil(input.length / 4) * 4, '=');
    const binary = atob(padded);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  } catch {
    return null;
  }
}

/** `<base64url(payload)>.<hex(hmac)>` — compact and tamper-evident. */
export async function signToken(payload: object, secret: string): Promise<string> {
  const body = b64urlEncode(JSON.stringify(payload));
  const sig = await crypto.subtle.sign('HMAC', await hmacKey(secret), enc.encode(body));
  return `${body}.${toHex(sig)}`;
}

export async function verifyToken<T = Record<string, unknown>>(
  token: string,
  secret: string,
): Promise<T | null> {
  const dot = token.lastIndexOf('.');
  if (dot <= 0) return null;

  const body = token.slice(0, dot);
  const sig = token.slice(dot + 1);

  const expected = await crypto.subtle.sign('HMAC', await hmacKey(secret), enc.encode(body));
  if (!timingSafeEqual(toHex(expected), sig)) return null;

  const json = b64urlDecode(body);
  if (!json) return null;
  try {
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}

/* -------------------------------------------------------------------------- */
/* Rate limiting (KV-backed fixed window)                                      */
/* -------------------------------------------------------------------------- */

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

/**
 * A fixed-window counter. Chosen over a sliding window because it costs a
 * single KV read plus one write, which keeps it inside the free tier while
 * still stopping credential stuffing and form spam.
 */
export async function rateLimit(
  kv: KVNamespace | undefined,
  key: string,
  limit: number,
  windowSeconds: number,
): Promise<RateLimitResult> {
  if (!kv) return { allowed: true, remaining: limit, retryAfterSeconds: 0 };

  const bucket = Math.floor(Date.now() / 1000 / windowSeconds);
  const storeKey = `rl:${key}:${bucket}`;

  let count = 0;
  try {
    count = Number.parseInt((await kv.get(storeKey)) ?? '0', 10) || 0;
  } catch {
    return { allowed: true, remaining: limit, retryAfterSeconds: 0 };
  }

  if (count >= limit) {
    const elapsed = Math.floor(Date.now() / 1000) % windowSeconds;
    return { allowed: false, remaining: 0, retryAfterSeconds: windowSeconds - elapsed };
  }

  try {
    await kv.put(storeKey, String(count + 1), { expirationTtl: Math.max(60, windowSeconds) });
  } catch { /* counting is best-effort; never block a request on KV */ }

  return { allowed: true, remaining: limit - count - 1, retryAfterSeconds: 0 };
}

/** Best available client identifier behind Cloudflare. */
export function clientIp(request: Request): string {
  return request.headers.get('CF-Connecting-IP')
    || request.headers.get('X-Forwarded-For')?.split(',')[0]?.trim()
    || 'unknown';
}

/* -------------------------------------------------------------------------- */
/* Input handling                                                              */
/* -------------------------------------------------------------------------- */

const ESCAPES: Record<string, string> = {
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
};

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ESCAPES[c]!);
}

const CODE_TAB = 9;
const CODE_NEWLINE = 10;
const CODE_SPACE = 32;
const CODE_DELETE = 127;

/**
 * Trim, cap length, and strip control characters from free-text input.
 * Newlines and tabs survive so a multi-line message keeps its shape.
 */
export function cleanText(value: unknown, maxLength = 500): string {
  if (typeof value !== 'string') return '';
  let out = '';
  for (const ch of value) {
    const code = ch.codePointAt(0)!;
    if (code === CODE_TAB || code === CODE_NEWLINE) { out += ch; continue; }
    if (code < CODE_SPACE || code === CODE_DELETE) continue;
    out += ch;
  }
  return out.trim().slice(0, maxLength);
}

export function isValidEmail(value: string): boolean {
  return value.length <= 254 && /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/.test(value);
}

/** Accepts common Indonesian formats and normalises to digits with country code. */
export function normalisePhone(value: string): string {
  const digits = value.replace(/[^\d+]/g, '').replace(/^\+/, '');
  if (digits.startsWith('0')) return `62${digits.slice(1)}`;
  if (digits.startsWith('8')) return `62${digits}`;
  return digits;
}

export function isValidPhone(value: string): boolean {
  const digits = normalisePhone(value);
  return digits.length >= 9 && digits.length <= 16;
}

/**
 * Allow-list sanitiser for rich text coming out of the dashboard editor.
 * Anything not explicitly permitted is dropped, including every event handler
 * attribute and any `javascript:` URL.
 */
const ALLOWED_TAGS = new Set([
  'p', 'br', 'strong', 'b', 'em', 'i', 'u', 'h2', 'h3', 'h4', 'ul', 'ol', 'li',
  'a', 'blockquote', 'code', 'pre', 'img', 'figure', 'figcaption', 'hr',
  'table', 'thead', 'tbody', 'tr', 'th', 'td', 'span', 'div',
]);

const ALLOWED_ATTRS: Record<string, Set<string>> = {
  a: new Set(['href', 'title', 'target', 'rel']),
  img: new Set(['src', 'alt', 'width', 'height', 'loading', 'decoding']),
  th: new Set(['colspan', 'rowspan', 'scope']),
  td: new Set(['colspan', 'rowspan']),
};

export function sanitizeHtml(input: string): string {
  if (!input) return '';

  let html = input
    .replace(
      /<\s*(script|style|iframe|object|embed|form|input|button|link|meta)\b[\s\S]*?<\s*\/\s*\1\s*>/gi,
      '',
    )
    .replace(/<\s*(script|style|iframe|object|embed|form|input|button|link|meta)\b[^>]*\/?\s*>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '');

  html = html.replace(
    /<\s*(\/?)\s*([a-zA-Z0-9]+)((?:\s+[^<>]*)?)\/?\s*>/g,
    (_match, closing: string, rawTag: string, rawAttrs: string) => {
      const tag = rawTag.toLowerCase();
      if (!ALLOWED_TAGS.has(tag)) return '';
      if (closing) return `</${tag}>`;

      const allowed = ALLOWED_ATTRS[tag];
      if (!allowed) return `<${tag}>`;

      const kept: string[] = [];
      const attrRe = /([a-zA-Z-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+))/g;
      let m: RegExpExecArray | null;
      while ((m = attrRe.exec(rawAttrs)) !== null) {
        const name = m[1]!.toLowerCase();
        if (!allowed.has(name) || name.startsWith('on')) continue;

        const value = (m[2] ?? m[3] ?? m[4] ?? '').trim();
        if ((name === 'href' || name === 'src') && !isSafeUrl(value)) continue;
        kept.push(`${name}="${escapeHtml(value)}"`);
      }

      if (tag === 'a'
          && kept.some((a) => a.startsWith('target='))
          && !kept.some((a) => a.startsWith('rel='))) {
        kept.push('rel="noopener noreferrer"');
      }
      return `<${tag}${kept.length ? ' ' + kept.join(' ') : ''}>`;
    },
  );

  return html;
}

/**
 * `javascript:alert(1)` can be written with embedded tabs, newlines, or NULs
 * and browsers will still run it — so every whitespace and control character is
 * removed before the scheme is compared.
 */
function isSafeUrl(url: string): boolean {
  let normalised = '';
  for (const ch of url) {
    const code = ch.codePointAt(0)!;
    if (code <= CODE_SPACE || code === CODE_DELETE) continue;
    normalised += ch;
  }
  normalised = normalised.toLowerCase();
  if (normalised.startsWith('javascript:') || normalised.startsWith('vbscript:')) return false;
  if (normalised.startsWith('data:') && !normalised.startsWith('data:image/')) return false;
  return true;
}

/** Strip tags for meta descriptions and search snippets. */
export function stripTags(html: string, maxLength = 300): string {
  const text = html.replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= maxLength) return text;
  const cut = text.lastIndexOf(' ', maxLength);
  return text.slice(0, cut > 0 ? cut : maxLength).trimEnd() + '…';
}
