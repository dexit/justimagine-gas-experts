
import { SERVICES, AREAS, BUSINESS } from './src/data/seo.ts';
import fs from 'fs';

const baseUrl = BUSINESS.url;
const pages = [
  '',
  '/about',
  '/services',
  '/contact',
  '/pricing',
  '/reviews',
  '/work',
  '/privacy',
  '/terms',
  '/safety',
  '/areas',
];

const servicePages = SERVICES.map((s) => `/services/${s.slug}`);
const areaPages = AREAS.map((a) => `/areas/${a.slug}`);
const combinedPages = SERVICES.flatMap((s) =>
  AREAS.map((a) => `/services/${s.slug}/${a.slug}`)
);

const allPaths = [...pages, ...servicePages, ...areaPages, ...combinedPages];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allPaths
    .map(
      (path) => `
  <url>
    <loc>${baseUrl}${path}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${path === '' ? 'daily' : 'monthly'}</changefreq>
    <priority>${path === '' ? '1.0' : '0.7'}</priority>
  </url>`
    )
    .join('')}
</urlset>`;

fs.writeFileSync('public/sitemap.xml', sitemap);
console.log('Sitemap generated successfully in public/sitemap.xml');
