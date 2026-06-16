import type { VercelRequest, VercelResponse } from "@vercel/node";
// @ts-ignore - server module is built at runtime
import serverModule from "../dist/server/server.js";

interface ServerHandler {
  fetch: (request: Request) => Promise<Response>;
}

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    const handler: ServerHandler = serverModule.default || serverModule;

    // Get the original path from x-forwarded-path (from rewrites) or fallback to req.url
    const originalPath =
      (req.headers["x-forwarded-path"] as string) || req.url || "/";
    const protocol = (req.headers["x-forwarded-proto"] as string) || "https";
    const host = (req.headers["x-forwarded-host"] as string) || req.headers.host || "localhost";

    // Construct the full URL
    const urlStr = `${protocol}://${host}${originalPath}`;
    const url = new URL(urlStr);

    // Create a fetch-compatible request
    const fetchRequest = new Request(url, {
      method: req.method,
      headers: req.headers as HeadersInit,
      body:
        req.method === "GET" || req.method === "HEAD"
          ? undefined
          : req.body
            ? JSON.stringify(req.body)
            : undefined,
    });

    // Call the server handler
    const response = await handler.fetch(fetchRequest);

    // Set response status and headers
    res.status(response.status);
    response.headers.forEach((value: string, key: string) => {
      res.setHeader(key, value);
    });

    // Send response body
    const buffer = await response.arrayBuffer();
    res.end(Buffer.from(buffer));
  } catch (error) {
    console.error("Handler error:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
