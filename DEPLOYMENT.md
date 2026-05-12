# Deployment Guide

This application is built with TanStack Start, Vite, and Bun. It is configured for deployment on Vercel utilizing Vercel Serverless/Edge functions for API routes and form submissions.

## Current Production Deployment

- **Hosting Platform**: Vercel
- **Production URL**: [https://justaimagine.vercel.app](https://justaimagine.vercel.app)
- **Git Integration**: Fully connected to GitHub for Continuous Deployment (CD). Any push to the `main` branch will automatically trigger a production build.

## Vercel Architecture

- **Static Assets**: HTML, CSS, client-side JS, and optimized images (WebP) are built into the `dist/client` directory and served statically via Vercel's Edge Network.
- **API & Routing**:
  - `api/submit.ts`: Handles form submissions via Vercel Edge Functions, integrating securely with HubSpot and Cloudflare REST endpoints.
  - `api/handler.ts`: Vercel routing fallback handler.
  - Routing rules are defined in `vercel.json` to properly route requests and apply caching headers.

### Steps to Deploy Manually (Vercel CLI)

If you need to trigger a manual deployment from the command line:

```bash
# Ensure Vercel CLI is installed
npm i -g vercel

# Deploy to production bypassing prompts
vercel --prod --yes
```

## Environment Variables

For the production application to function properly (especially the lead generation pipeline), the following Environment Variables must be set in your Vercel Project Dashboard:

- `HUBSPOT_PORTAL_ID`: Your HubSpot Portal ID.
- `HUBSPOT_FORM_GUID`: The target HubSpot Form ID.
- `ENQUIRY_WEBHOOK_URL`: (Optional) Custom webhook for external routing.
- `SMTP_WEBHOOK_URL`: (Optional) Webhook for email notifications.

> **Note**: You can configure these by navigating to your Vercel Project Dashboard -> Settings -> Environment Variables.

## Performance Notes

- **Static assets**: Served with aggressive caching (1-year immutable).
- **Images**: Automatically optimized via `bun run optimize-images.ts` during the build step.
- **Sitemap**: Automatically generated during the build step via `generate:sitemap` ensuring all 300+ dynamic routes are properly indexed.

## Troubleshooting

### API Returns 500
Ensure your Environment Variables are correctly configured in Vercel. Vercel Edge functions will fail if required variables are missing during runtime.

### Build Failures
Check the build logs in Vercel. Ensure `bun` is correctly detected by Vercel. The build script `bun run build` manages image optimization, favicon generation, Vite building, and sitemap generation in sequence.
