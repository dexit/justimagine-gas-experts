# AGENTS.md - Developer & Agent Guide

## Tech Stack
- **Framework**: TanStack Start (Vite + React)
- **Runtime**: Bun
- **Styling**: Tailwind CSS 4 (Beta) with OKLCH color tokens
- **Icons**: Lucide React
- **Hosting**: Vercel (Edge Functions for API)

## Design System Patterns
- **Glassmorphism**: Use the `.glass` utility for overlays and headers.
- **Organic Depth**: The `.bg-noise` utility is applied globally at the root. Use it sparingly on dark surfaces for high-end contrast.
- **Typography**: Headers should use the `Fraunces` font (display) and `text-balance` for better line wrapping.
- **Color Space**: All colors MUST use OKLCH for consistent perceived lightness in dark/light mode.

## API Integration
- **Form Submissions**: All front-end forms should POST to `/api/submit`.
- **Backend**: The edge function in `api/submit.ts` orchestrates data to HubSpot and Cloudflare.
- **Env Vars**: Required variables include `HUBSPOT_PORTAL_ID`, `HUBSPOT_FORM_GUID`, and `ENQUIRY_WEBHOOK_URL`.

## Performance
- **Images**: Use `<OptimizedImage />` component which supports responsive `srcSet` and lazy loading.
- **Sitemap**: Run `bun run generate:sitemap` after adding any new static or dynamic routes.
