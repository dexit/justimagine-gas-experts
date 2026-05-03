import { createFileRoute } from "@tanstack/react-router";
import { SERVICES, AREAS, BUSINESS } from "@/data/seo";

const url = (path: string) => `${BUSINESS.url}${path}`;

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const lastmod = new Date().toISOString().slice(0, 10);
        const urls: { loc: string; priority: string }[] = [
          { loc: url("/"), priority: "1.0" },
          { loc: url("/services"), priority: "0.9" },
          { loc: url("/areas"), priority: "0.9" },
          { loc: url("/safety"), priority: "0.8" },
          { loc: url("/about"), priority: "0.6" },
          { loc: url("/contact"), priority: "0.7" },
        ];
        for (const s of SERVICES) urls.push({ loc: url(`/services/${s.slug}`), priority: "0.8" });
        for (const a of AREAS) urls.push({ loc: url(`/areas/${a.slug}`), priority: "0.7" });
        for (const s of SERVICES) for (const a of AREAS) urls.push({ loc: url(`/services/${s.slug}/${a.slug}`), priority: "0.6" });

        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
          .map((u) => `  <url><loc>${u.loc}</loc><lastmod>${lastmod}</lastmod><priority>${u.priority}</priority></url>`) 
          .join("\n")}\n</urlset>`;

        return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
      },
    },
  },
});
