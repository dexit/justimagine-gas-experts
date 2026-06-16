import { VercelRequest, VercelResponse } from "@vercel/node";
import { hashPassword, verifyPassword } from "@/lib/admin-auth";
import { setAdminSession, checkRateLimit } from "@/lib/kv-client";
import crypto from "crypto";

// Mock in-memory sessions (replace with KV in production)
const sessions = new Map<string, { user: string; expires: number }>();

// Mock admin credentials (load from env in production)
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD_HASH =
  process.env.ADMIN_PASSWORD_HASH ||
  (await hashPassword(process.env.ADMIN_PASSWORD || "admin123"));

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, password } = req.body;
  const ip = (req.headers["x-forwarded-for"] as string) || "unknown";

  // Rate limit: 5 attempts per minute per IP via KV
  const allowed = await checkRateLimit("admin:login", ip, 5, 60);
  if (!allowed) {
    return res.status(429).json({ error: "Too many login attempts. Try again in 1 minute." });
  }

  if (!username || !password) {
    return res.status(400).json({ error: "Missing username or password" });
  }

  if (username !== ADMIN_USERNAME) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const isValid = await verifyPassword(password, ADMIN_PASSWORD_HASH);
  if (!isValid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  // Generate session token
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = Date.now() + 8 * 60 * 60 * 1000; // 8 hours

  // Store session in KV instead of in-memory
  await setAdminSession(token, { username, expiresAt });

  res.setHeader("Set-Cookie", [
    `adminToken=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${8 * 60 * 60}`,
  ]);

  return res.status(200).json({
    token,
    user: username,
    expiresIn: 8 * 60 * 60,
  });
}
