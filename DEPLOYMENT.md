# Deployment Guide

This application is built with TanStack Start and includes server-side rendering (SSR). It's optimized for Cloudflare Pages/Workers but can also be deployed to other platforms.

## Recommended: Cloudflare Pages (Native SSR Support)

Since the application is built with Cloudflare's vite plugin, Cloudflare Pages is the recommended deployment target with full native support.

### Prerequisites
- Cloudflare account
- Git repository connected to Cloudflare

### Steps
1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Pages > Create project > Connect to Git
3. Select your repository
4. Build settings:
   - Build command: `npm run build`
   - Build output directory: `dist/client`
   - Root directory: `/`
5. Deploy

The server-side rendering will work automatically on Cloudflare Pages.

---

## Alternative: Vercel (Static Site Only)

**Note:** Vercel deployments will NOT support dynamic SSR due to architecture limitations. This should only be used if you need static site hosting.

### Current Status
- ✅ Static assets served from `dist/client`
- ❌ SSR functionality requires Cloudflare Workers/Pages

### Limitations
- No server-side rendering (all routes are static)
- Dynamic routes may return 404

To fix this on Vercel, you would need to:
1. Reconfigure the build to use Node.js output instead of Cloudflare Workers
2. Create a custom serverless function handler
3. Or migrate to Cloudflare Pages

---

## Migration Path from Vercel to Cloudflare Pages

If currently deployed on Vercel:

1. Create `wrangler.toml` in the project root (see example below)
2. Connect your Git repository to Cloudflare Pages
3. Use build settings: `npm run build` → `dist/client`
4. Deploy - SSR will work automatically

### Example wrangler.toml
```toml
[env.production]
name = "just-imagine"
main = "dist/server/index.js"
build = { command = "npm run build" }

[env.production.build]
upload { format = "service-worker" }

[[r2_buckets]]
binding = "UPLOADS"
bucket_name = "just-imagine-uploads"
```

---

## Environment Variables

Required environment variables for full functionality:
- None (static configuration used in `src/data/seo.ts`)

Optional:
- `VITE_API_URL` - For external API integrations (currently not used)

---

## Performance Notes

- Static assets: Cached with 1-year expiration
- HTML: Server-rendered on each request (Cloudflare cache-first)
- Image optimization: Next-gen formats (WebP) with responsive srcsets
- Sitemap: 142 URLs cached for 1 hour

---

## Troubleshooting

### 404 Errors on Root/Dynamic Routes

**Cause:** Deployed to Vercel or similar static host that doesn't support SSR

**Solution:** Migrate to Cloudflare Pages as described above

### Build Failures

Check that `npm run build` completes without errors:
```bash
npm run build
# Should output: "Sitemap generated: 142 URLs"
```

### Static Files Not Loading

Verify `dist/client/` contains:
- `assets/` directory with bundled JS/CSS
- `*.png`, `favicon.*`, `robots.txt`, `sitemap.xml`

If missing, rebuild with `npm run build`
