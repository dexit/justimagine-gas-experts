import type { VercelRequest, VercelResponse } from "@vercel/node";
import handler from "../dist/server/index.js";

export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    const originalPath =
      (req.headers["x-forwarded-path"] as string) || req.url || "/";
    const protocol = (req.headers["x-forwarded-proto"] as string) || "https";
    const host = (req.headers["x-forwarded-host"] as string) || req.headers.host || "localhost";
    const urlStr = `${protocol}://${host}${originalPath}`;
    const url = new URL(urlStr);

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

    const response = await handler.fetch(fetchRequest);

    res.status(response.status);
    response.headers.forEach((value, key) => {
      res.setHeader(key, value);
    });

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
