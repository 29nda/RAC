import type { CollectionName } from './types';
import { getDB } from './env';

/**
 * Thin D1 helpers. Every function tolerates a missing binding so the public
 * site keeps working on a deployment that has no database yet.
 */

export interface Enquiry {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  subject: string | null;
  message: string;
  locale: string;
  page_url: string | null;
  status: string;
  notes: string | null;
}

export async function saveEnquiry(
  locals: App.Locals,
  row: Omit<Enquiry, 'created_at' | 'status' | 'notes'> & { ipHash: string; userAgent: string },
): Promise<boolean> {
  const db = getDB(locals);
  if (!db) return false;

  try {
    await db
      .prepare(`INSERT INTO enquiries
        (id, name, email, phone, company, subject, message, locale, page_url, ip_hash, user_agent)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      .bind(
        row.id, row.name, row.email, row.phone, row.company, row.subject,
        row.message, row.locale, row.page_url, row.ipHash, row.userAgent,
      )
      .run();
    return true;
  } catch {
    return false;
  }
}

export async function listEnquiries(locals: App.Locals, limit = 100): Promise<Enquiry[]> {
  const db = getDB(locals);
  if (!db) return [];
  try {
    const { results } = await db
      .prepare('SELECT * FROM enquiries ORDER BY created_at DESC LIMIT ?')
      .bind(limit)
      .all<Enquiry>();
    return results ?? [];
  } catch {
    return [];
  }
}

export async function updateEnquiryStatus(
  locals: App.Locals,
  id: string,
  status: string,
): Promise<boolean> {
  const db = getDB(locals);
  if (!db) return false;
  try {
    await db.prepare('UPDATE enquiries SET status = ? WHERE id = ?').bind(status, id).run();
    return true;
  } catch {
    return false;
  }
}

export async function deleteEnquiry(locals: App.Locals, id: string): Promise<boolean> {
  const db = getDB(locals);
  if (!db) return false;
  try {
    await db.prepare('DELETE FROM enquiries WHERE id = ?').bind(id).run();
    return true;
  } catch {
    return false;
  }
}

/** Write (or clear) a single content override. */
export async function upsertContent(
  locals: App.Locals,
  collection: CollectionName | 'settings',
  itemKey: string,
  payload: unknown,
  actor: string,
  deleted = false,
): Promise<boolean> {
  const db = getDB(locals);
  if (!db) return false;

  try {
    await db
      .prepare(`INSERT INTO content (collection, item_key, payload, deleted, updated_at, updated_by)
        VALUES (?, ?, ?, ?, datetime('now'), ?)
        ON CONFLICT(collection, item_key) DO UPDATE SET
          payload = excluded.payload,
          deleted = excluded.deleted,
          updated_at = excluded.updated_at,
          updated_by = excluded.updated_by`)
      .bind(collection, itemKey, JSON.stringify(payload ?? {}), deleted ? 1 : 0, actor)
      .run();
    return true;
  } catch {
    return false;
  }
}

/** Remove the override entirely, restoring the repository default. */
export async function resetContent(
  locals: App.Locals,
  collection: string,
  itemKey: string,
): Promise<boolean> {
  const db = getDB(locals);
  if (!db) return false;
  try {
    await db
      .prepare('DELETE FROM content WHERE collection = ? AND item_key = ?')
      .bind(collection, itemKey)
      .run();
    return true;
  } catch {
    return false;
  }
}

export async function recordAudit(
  locals: App.Locals,
  actor: string,
  action: string,
  target?: string,
  detail?: string,
  ipHash?: string,
): Promise<void> {
  const db = getDB(locals);
  if (!db) return;
  try {
    await db
      .prepare('INSERT INTO audit_log (actor, action, target, detail, ip_hash) VALUES (?, ?, ?, ?, ?)')
      .bind(actor, action, target ?? null, detail ?? null, ipHash ?? null)
      .run();
  } catch { /* the audit trail must never break the action it is recording */ }
}

export interface AuditRow {
  id: number;
  created_at: string;
  actor: string;
  action: string;
  target: string | null;
  detail: string | null;
}

export async function listAudit(locals: App.Locals, limit = 50): Promise<AuditRow[]> {
  const db = getDB(locals);
  if (!db) return [];
  try {
    const { results } = await db
      .prepare('SELECT id, created_at, actor, action, target, detail FROM audit_log ORDER BY id DESC LIMIT ?')
      .bind(limit)
      .all<AuditRow>();
    return results ?? [];
  } catch {
    return [];
  }
}

/** SHA-256 of the client IP — enough to spot abuse, not enough to identify. */
export async function hashIp(ip: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`rac:${ip}`));
  return [...new Uint8Array(digest)].slice(0, 12).map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function isDatabaseReady(locals: App.Locals): Promise<boolean> {
  const db = getDB(locals);
  if (!db) return false;
  try {
    await db.prepare('SELECT 1 FROM content LIMIT 1').all();
    return true;
  } catch {
    return false;
  }
}
