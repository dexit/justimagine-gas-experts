# Just Imagine Ltd — SEO / Performance / UX Roadmap

## ✅ Done (this pass)
- [x] Dynamic SEO data layer (`src/data/seo.ts`) — services × Warwickshire areas
- [x] Dynamic landing pages: `/services/:slug`, `/services/:slug/:area`, `/areas/:slug`
- [x] Breadcrumbs component + JSON-LD `BreadcrumbList`
- [x] LocalBusiness, Service, FAQPage JSON-LD generators (`src/lib/seo.ts`)
- [x] WhatsApp floating CTA + Enquiry form with SMTP/webhook server fn
- [x] Per-route `head()` with title, description, og:*, canonical
- [x] Breadcrumbs + canonical + OG on every static page (about, services, contact, safety, areas index)
- [x] Site-wide LocalBusiness JSON-LD on `/`
- [x] `/sitemap.xml` route (services × areas × static)
- [x] `/robots.txt` and `/llms.txt`
- [x] Hero image: explicit width/height, `fetchpriority=high`, preload, `decoding=async`
- [x] Semantic h1–h3 hierarchy across all routes

## 🔜 Next
- [ ] Add CWV-friendly image pipeline: WebP/AVIF + responsive `srcset` once a build hook is added
- [ ] Wire real `gtag` + GA4 measurement ID once provided by the user
- [ ] Replace placeholder `gasSafeNumber: "—"` in `src/data/seo.ts` with real registration #
- [ ] Add real Open Graph share image at `/og-default.jpg` (1200×630)
- [ ] Add review markup once first batch of testimonials exists
- [ ] Configure `ENQUIRY_WEBHOOK_URL` and SMTP secrets in Lovable Cloud → Secrets
- [ ] Add `manifest.webmanifest` + apple-touch-icon for PWA-grade mobile
- [ ] Lighthouse target: ≥95 on Perf / Best Practices / SEO mobile + desktop
  - Verify after publish (preview Lighthouse can be misleading on dev bundle)
- [ ] Add `/blog` content cluster (e.g. "How long does a boiler last?", "Cost of a CP12") for AEO long-tail capture
- [ ] Add reviews/testimonials section + Trustpilot/Google review embed

## Keyword strategy (applied)
Primary: `boiler installation`, `boiler repair`, `boiler service`, `gas safety certificate`,
`CP12 landlord`, `power flush`, `central heating`, `plumber`, `emergency gas engineer`.
Local modifiers: `Rugby`, `Leamington Spa`, `Warwick`, `Kenilworth`, `Stratford-upon-Avon`,
`Coventry`, `Nuneaton`, `Bedworth`, `Southam`, `Atherstone`, `Alcester`, `Shipston-on-Stour`,
`Warwickshire`. Density kept natural (1–2%) — primary in H1, first 100 words, one H2,
meta title, meta description, alt text.
