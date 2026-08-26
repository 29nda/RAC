-- ---------------------------------------------------------------------------
-- RAC — initial schema
--
-- `content` stores *overrides* on top of the defaults that ship in the
-- repository (src/data). A row exists only for something an editor actually
-- changed, which keeps the database small and lets the site render normally
-- even before the first migration is applied.
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS content (
  collection  TEXT    NOT NULL,
  item_key    TEXT    NOT NULL,
  payload     TEXT    NOT NULL DEFAULT '{}',
  deleted     INTEGER NOT NULL DEFAULT 0,
  updated_at  TEXT    NOT NULL DEFAULT (datetime('now')),
  updated_by  TEXT,
  PRIMARY KEY (collection, item_key)
);

CREATE INDEX IF NOT EXISTS idx_content_collection ON content (collection);
CREATE INDEX IF NOT EXISTS idx_content_updated    ON content (updated_at DESC);

-- ---------------------------------------------------------------------------
-- Contact form submissions.
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS enquiries (
  id          TEXT PRIMARY KEY,
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT NOT NULL,
  company     TEXT,
  subject     TEXT,
  message     TEXT NOT NULL,
  locale      TEXT NOT NULL DEFAULT 'id',
  page_url    TEXT,
  ip_hash     TEXT,
  user_agent  TEXT,
  status      TEXT NOT NULL DEFAULT 'new',
  notes       TEXT
);

CREATE INDEX IF NOT EXISTS idx_enquiries_created ON enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_enquiries_status  ON enquiries (status);

-- ---------------------------------------------------------------------------
-- Media library index. R2 holds the bytes; this table holds the metadata that
-- R2 object metadata alone cannot express well (alt text per locale, captions).
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS media (
  key           TEXT PRIMARY KEY,
  content_type  TEXT NOT NULL,
  size          INTEGER NOT NULL,
  width         INTEGER,
  height        INTEGER,
  alt_id        TEXT,
  alt_en        TEXT,
  uploaded_at   TEXT NOT NULL DEFAULT (datetime('now')),
  uploaded_by   TEXT
);

CREATE INDEX IF NOT EXISTS idx_media_uploaded ON media (uploaded_at DESC);

-- ---------------------------------------------------------------------------
-- Append-only audit trail for dashboard actions.
-- ---------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS audit_log (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  actor       TEXT NOT NULL,
  action      TEXT NOT NULL,
  target      TEXT,
  detail      TEXT,
  ip_hash     TEXT
);

CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_log (created_at DESC);
