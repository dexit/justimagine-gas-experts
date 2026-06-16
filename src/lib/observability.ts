import { VercelRequest, VercelResponse } from "@vercel/node";
import { logRequest } from "@/lib/d1-client";
import crypto from "crypto";

declare global {
  var DB: any;
}

/** Middleware for request logging + observability */
export async function observabilityMiddleware(
  req: VercelRequest,
  res: VercelResponse,
  handler: (req: VercelRequest, res: VercelResponse) => Promise<void> | void
) {
  const start = Date.now();
  const logId = crypto.randomBytes(8).toString("hex");
  const endpoint = req.url || "unknown";
  const method = req.method || "GET";
  const ip = (req.headers["x-forwarded-for"] as string) || "unknown";
  const userAgent = (req.headers["user-agent"] as string) || "unknown";

  // Wrap response to capture status code
  const originalSend = res.send;
  res.send = function (data) {
    const duration = Date.now() - start;
    const statusCode = res.statusCode;

    // Log to D1 (async, don't block response)
    if (global.DB) {
      logRequest(global.DB, {
        id: logId,
        level: statusCode >= 400 ? "error" : "info",
        endpoint,
        method,
        status_code: statusCode,
        ip_address: ip,
        user_agent: userAgent,
        message: `${method} ${endpoint} → ${statusCode}`,
        duration_ms: duration,
      }).catch((err) => console.error("[observability] Log failed:", err));
    }

    // Console for local debugging
    console.log(
      `[${logId}] ${method} ${endpoint} ${statusCode} in ${duration}ms`
    );

    return originalSend.call(this, data);
  };

  // Execute handler
  try {
    await handler(req, res);
  } catch (error) {
    console.error("[observability] Handler error:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

/** Structured logging for errors */
export function logError(
  message: string,
  error: unknown,
  context?: Record<string, unknown>
) {
  const errorObj = error instanceof Error ? error : new Error(String(error));
  console.error(JSON.stringify({
    level: "error",
    message,
    stack: errorObj.stack,
    ...context,
    timestamp: new Date().toISOString(),
  }));
}

/** Structured logging for debug */
export function logDebug(
  message: string,
  context?: Record<string, unknown>
) {
  console.log(JSON.stringify({
    level: "debug",
    message,
    ...context,
    timestamp: new Date().toISOString(),
  }));
}
