import { createFileRoute } from "@tanstack/react-router";
import { BUSINESS } from "@/data/seo";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async () => {
        const host = BUSINESS.url.replace(/^https?:\/\//, "");
        const body = `# robots.txt for ${BUSINESS.name}
User-agent: *
Allow: /
Disallow: /api/

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: ${BUSINESS.url}/sitemap.xml
Host: ${host}
`;
        return new Response(body, {
          status: 200,
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=86400",
          },
        });
      },
    },
  },
});
