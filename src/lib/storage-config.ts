/** Storage backend configuration: Vercel primary, CF fallback */

export type StorageBackend = "vercel" | "cloudflare" | "hybrid";

export const STORAGE_CONFIG = {
  // Primary backend
  primary: (process.env.STORAGE_BACKEND || "vercel") as StorageBackend,

  // KV Configuration
  kv: {
    // Vercel KV: uses @vercel/kv client directly
    vercel: {
      enabled: !!process.env.KV_REST_API_URL,
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    },
    // Cloudflare KV: via KV namespace binding in workers
    cloudflare: {
      enabled: typeof KV !== "undefined",
      binding: "KV",
    },
  },

  // D1 Configuration
  d1: {
    // Cloudflare D1: via D1 database binding in workers
    cloudflare: {
      enabled: typeof DB !== "undefined",
      binding: "DB",
    },
    // Vercel: no direct D1 support, use CF Workers tunnel
    vercel: {
      enabled: !!process.env.D1_ENDPOINT,
      endpoint: process.env.D1_ENDPOINT,
      token: process.env.D1_API_TOKEN,
    },
  },

  // Blob Configuration
  blob: {
    // Vercel Blob: uses @vercel/blob client
    vercel: {
      enabled: !!process.env.BLOB_READ_WRITE_TOKEN,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    },
    // CF R2: not implemented yet
    cloudflare: {
      enabled: !!process.env.R2_BUCKET_NAME,
      bucket: process.env.R2_BUCKET_NAME,
    },
  },

  // Feature flags
  features: {
    persistCMS: process.env.PERSIST_CMS !== "false", // Persist service/area edits
    trackAnalytics: process.env.TRACK_ANALYTICS !== "false", // Log analytics
    enableObservability: process.env.OBSERVABILITY !== "false", // Request logging
    enableRateLimit: process.env.RATE_LIMIT !== "false", // Rate limiting
  },

  // Retention policies
  retention: {
    sessions: 8 * 60 * 60, // 8 hours (seconds)
    leads: 30 * 24 * 60 * 60, // 30 days
    logs: 7 * 24 * 60 * 60, // 7 days
    analytics_cache: 60 * 60, // 1 hour
  },
};

/** Get active storage backend for current environment */
export function getActiveBackend(): StorageBackend {
  if (typeof STORAGE_CONFIG.primary === "string") {
    const backend = STORAGE_CONFIG.primary;
    if (backend === "vercel" && STORAGE_CONFIG.kv.vercel.enabled) {
      return "vercel";
    }
    if (backend === "cloudflare" && STORAGE_CONFIG.kv.cloudflare.enabled) {
      return "cloudflare";
    }
  }

  // Fallback: detect from environment
  if (
    STORAGE_CONFIG.kv.vercel.enabled &&
    STORAGE_CONFIG.blob.vercel.enabled
  ) {
    return "vercel";
  }
  if (STORAGE_CONFIG.kv.cloudflare.enabled) {
    return "cloudflare";
  }

  // Default to hybrid (try both)
  return "hybrid";
}

/** Get storage endpoint URLs for debugging */
export function getStorageEndpoints() {
  return {
    kv_vercel: STORAGE_CONFIG.kv.vercel.url || "not configured",
    d1_cloudflare: "via CF Workers D1 binding",
    blob_vercel: "via @vercel/blob client",
    active_backend: getActiveBackend(),
  };
}
