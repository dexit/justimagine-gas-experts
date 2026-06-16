import crypto from "crypto";

// Hash password with bcrypt-like approach (simple for edge runtime)
export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 100000, 32, "sha256")
    .toString("hex");
  return `${salt}:${hash}`;
}

// Verify password
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  const [salt, storedHash] = hash.split(":");
  const verify = crypto
    .pbkdf2Sync(password, salt, 100000, 32, "sha256")
    .toString("hex");
  return verify === storedHash;
}

// Generate session token
export function generateSessionToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

// Session expiry: 8 hours
export const SESSION_EXPIRY_MS = 8 * 60 * 60 * 1000;

// Mock admin credentials (load from env/DB in production)
export const ADMIN_USERS = {
  admin: "admin123", // Will be hashed in KV
};
