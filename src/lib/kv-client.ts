import { kv } from "@vercel/kv";

/** Admin session key format: admin:session:{token} */
export async function setAdminSession(token: string, data: { username: string; expiresAt: number }) {
  const ttl = Math.floor((data.expiresAt - Date.now()) / 1000);
  await kv.set(`admin:session:${token}`, JSON.stringify(data), { ex: ttl });
}

export async function getAdminSession(token: string) {
  const data = await kv.get(`admin:session:${token}`);
  return data ? JSON.parse(data as string) : null;
}

export async function deleteAdminSession(token: string) {
  await kv.del(`admin:session:${token}`);
}

/** Lead storage: leads:{refId} */
export async function saveLead(refId: string, leadData: Record<string, unknown>) {
  await kv.set(`lead:${refId}`, JSON.stringify(leadData), { ex: 86400 * 30 }); // 30 days retention
}

export async function getLead(refId: string) {
  const data = await kv.get(`lead:${refId}`);
  return data ? JSON.parse(data as string) : null;
}

/** Analytics cache: analytics:{period} */
export async function cacheAnalytics(period: string, data: Record<string, unknown>) {
  await kv.set(`analytics:${period}`, JSON.stringify(data), { ex: 3600 }); // 1 hour cache
}

export async function getCachedAnalytics(period: string) {
  const data = await kv.get(`analytics:${period}`);
  return data ? JSON.parse(data as string) : null;
}

/** Rate limiting: ratelimit:{endpoint}:{ip} */
export async function checkRateLimit(endpoint: string, ip: string, limit = 100, window = 60) {
  const key = `ratelimit:${endpoint}:${ip}`;
  const current = await kv.incr(key);
  if (current === 1) {
    await kv.expire(key, window);
  }
  return current <= limit;
}
