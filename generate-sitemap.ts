
import { SERVICES, AREAS, BUSINESS } from './src/data/seo.ts';
import fs from 'fs';

const baseUrl = BUSINESS.url;
const today = new Date().toISOString().split('T')[0];

interface SitemapEntry {
  path: string;
  priority: string;
  changefreq: string;
}

const staticPages: SitemapEntry[] = [
  { path: '', priority: '1.0', changefreq: 'daily' },
  { path: '/services', priority: '0.9', changefreq: 'weekly' },
  { path: '/landlord', priority: '0.9', changefreq: 'weekly' },
  { path: '/emergency', priority: '0.9', changefreq: 'weekly' },
  { path: '/areas', priority: '0.8', changefreq: 'weekly' },
  { path: '/pricing', priority: '0.7', changefreq: 'monthly' },
  { path: '/reviews', priority: '0.7', changefreq: 'weekly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
  { path: '/about', priority: '0.6', changefreq: 'monthly' },
  { path: '/work', priority: '0.6', changefreq: 'monthly' },
  { path: '/safety', priority: '0.7', changefreq: 'monthly' },
  { path: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
  { path: '/cookies', priority: '0.3', changefreq: 'yearly' },
  { path: '/finance', priority: '0.8', changefreq: 'monthly' },
  { path: '/commercial', priority: '0.8', changefreq: 'monthly' },
  { path: '/our-story', priority: '0.6', changefreq: 'monthly' },
  { path: '/why-trust-us', priority: '0.8', changefreq: 'monthly' },
  { path: '/complaints', priority: '0.4', changefreq: 'yearly' },
];

const servicePages: SitemapEntry[] = SERVICES.map((s) => ({
  path: `/services/${s.slug}`,
  priority: '0.8',
  changefreq: 'monthly',
}));

const areaPages: SitemapEntry[] = AREAS.map((a) => ({
  path: `/areas/${a.slug}`,
  priority: '0.8',
  changefreq: 'monthly',
}));

const combinedPages: SitemapEntry[] = SERVICES.flatMap((s) =>
  AREAS.map((a) => ({
    path: `/services/${s.slug}/${a.slug}`,
    priority: '0.7',
    changefreq: 'monthly',
  }))
).concat(
  AREAS.map((a) => ({
    path: `/heating-in/${a.slug}`,
    priority: '0.8',
    changefreq: 'monthly',
  }))
).concat(
  AREAS.map((a) => ({
    path: `/gas-boiler-in/${a.slug}`,
    priority: '0.8',
    changefreq: 'monthly',
  }))
);

const allEntries = [...staticPages, ...servicePages, ...areaPages, ...combinedPages];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${allEntries
    .map(
      ({ path, priority, changefreq }) => `<url>
    <loc>${baseUrl}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
    )
    .join('\n  ')}
</urlset>`;

fs.writeFileSync('public/sitemap.xml', sitemap);
console.log(`Sitemap generated: ${allEntries.length} URLs`);
