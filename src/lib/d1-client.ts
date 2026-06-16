import { D1Database } from "@cloudflare/workers-types";

// Environment variable: HANDLE will be set by Vercel/Cloudflare bindings
declare global {
  var DB: D1Database;
}

/** Initialize D1 DB for persistence (services, areas, leads, logs) */
export async function getDB() {
  if (typeof global.DB !== "undefined") {
    return global.DB;
  }
  // Fallback: if not in D1 context, return null (use KV + file-based fallback)
  return null;
}

/** Prepare service for storage */
export async function upsertService(
  db: D1Database | null,
  service: {
    id: string;
    name: string;
    slug: string;
    category: string;
    description?: string;
    keywords?: string;
    cta_text?: string;
    price_from?: number;
    price_to?: number;
    duration?: string;
  }
) {
  if (!db) return { error: "DB not available" };

  const result = await db
    .prepare(
      `INSERT INTO services (id, name, slug, category, description, keywords, cta_text, price_from, price_to, duration)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET
       name=excluded.name, description=excluded.description, keywords=excluded.keywords,
       cta_text=excluded.cta_text, price_from=excluded.price_from, price_to=excluded.price_to,
       duration=excluded.duration, updated_at=CURRENT_TIMESTAMP`
    )
    .bind(
      service.id,
      service.name,
      service.slug,
      service.category,
      service.description || null,
      service.keywords || null,
      service.cta_text || null,
      service.price_from || null,
      service.price_to || null,
      service.duration || null
    )
    .run();

  return result;
}

/** Get service by slug */
export async function getServiceBySlug(db: D1Database | null, slug: string) {
  if (!db) return null;
  const result = await db
    .prepare("SELECT * FROM services WHERE slug = ?")
    .bind(slug)
    .first();
  return result;
}

/** Get all services */
export async function getAllServices(db: D1Database | null) {
  if (!db) return [];
  const result = await db
    .prepare("SELECT * FROM services ORDER BY created_at DESC")
    .all();
  return result.results || [];
}

/** Save lead */
export async function saveLead(
  db: D1Database | null,
  lead: {
    id: string;
    ref_id: string;
    name: string;
    phone: string;
    email: string;
    postcode?: string;
    service_id?: string;
    area_id?: string;
    message?: string;
  }
) {
  if (!db) return { error: "DB not available" };

  return await db
    .prepare(
      `INSERT INTO leads (id, ref_id, name, phone, email, postcode, service_id, area_id, message, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'new')`
    )
    .bind(
      lead.id,
      lead.ref_id,
      lead.name,
      lead.phone,
      lead.email,
      lead.postcode || null,
      lead.service_id || null,
      lead.area_id || null,
      lead.message || null
    )
    .run();
}

/** Get lead by ref_id */
export async function getLeadByRef(db: D1Database | null, ref_id: string) {
  if (!db) return null;
  return await db
    .prepare("SELECT * FROM leads WHERE ref_id = ?")
    .bind(ref_id)
    .first();
}

/** Log API call */
export async function logRequest(
  db: D1Database | null,
  log: {
    id: string;
    level: string;
    endpoint: string;
    method: string;
    status_code: number;
    ip_address: string;
    user_agent: string;
    message: string;
    error_stack?: string;
    duration_ms: number;
  }
) {
  if (!db) return;

  await db
    .prepare(
      `INSERT INTO logs (id, level, endpoint, method, status_code, ip_address, user_agent, message, error_stack, duration_ms)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      log.id,
      log.level,
      log.endpoint,
      log.method,
      log.status_code,
      log.ip_address,
      log.user_agent,
      log.message,
      log.error_stack || null,
      log.duration_ms
    )
    .run();
}

/** Get logs (paginated) */
export async function getLogs(db: D1Database | null, page = 1, limit = 50) {
  if (!db) return [];
  const offset = (page - 1) * limit;
  const result = await db
    .prepare(
      "SELECT * FROM logs ORDER BY created_at DESC LIMIT ? OFFSET ?"
    )
    .bind(limit, offset)
    .all();
  return result.results || [];
}
