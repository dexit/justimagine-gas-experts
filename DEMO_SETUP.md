# JustImagine Admin Panel - Demo Setup Guide

All admin variants are ready for demo/development with mock data fallbacks. No API endpoints required to test.

## Quick Start

### 1. Admin Dashboard (`/admin/dashboard`)
**Login credentials (demo mode):**
- Any token in localStorage will work for demo
- Navigate to `/admin/login` → Enter any token → Click login

**Mock data ready:**
- ✓ Overview dashboard with stats cards
- ✓ Services CMS with 3 sample services
- ✓ Areas CMS with 3 sample areas
- ✓ Analytics dashboard with metrics
- ✓ Logs viewer with 4 sample log entries

### 2. Service Request Form (`/service-request?serviceSlug=gas-safety-check&area=London`)
**Features ready:**
- Form captures: name, email, phone
- Base price displayed from products lib
- Add extras dynamically (label + price)
- Stripe payment form (EmbeddedCheckout)
- Success page on payment completion

**Test with Stripe test card:**
- Card number: `4242 4242 4242 4242`
- Expiry: Any future date (e.g., `12/25`)
- CVC: Any 3 digits

### 3. Payment Integration
**Stripe setup:**
- Test keys already in env via integration
- Webhook handler at `/api/webhooks/stripe` (listening for events)
- Webhook secret required from Stripe dashboard for production

---

## Admin Panel Variants

### Overview Section
**Route:** `/admin/dashboard` (default tab)
**Shows:**
- 4 stat cards: Active Users, Service Requests, Conversion Rate, Revenue
- Quick start checklist
- Admin sections directory

**Mock data:** From `src/lib/mock-data.ts`

### Services CMS
**Route:** `/admin/dashboard?tab=services`
**Features:**
- List services (from SERVICES data)
- Edit/save service details
- Validation rules on name, keywords, description
- Add new service

**Mock data:** 3 sample services (Emergency Boiler, Annual Service, Central Heating Installation)

**Demo mode:** If `/api/admin/services` fails, displays mock data. No manual toggles needed.

### Areas CMS
**Route:** `/admin/dashboard?tab=areas`
**Features:**
- List service areas
- Edit/save area details
- Map coordinates (lat/lng) for location

**Mock data:** 3 sample areas (London, Manchester, Birmingham)

**Demo mode:** If `/api/admin/areas` fails, displays mock data.

### Analytics Dashboard
**Route:** `/admin/dashboard?tab=analytics`
**Features:**
- GA4 metrics (sessions, users, bounce rate, avg duration)
- Google Search Console data (clicks, impressions, CTR, position)
- Microsoft Clarity data (recorded sessions, error rate)
- Bing Webmaster data
- Funnel visualization (visitors → form starts → submissions → confirmations → bookings)
- Period selector (7d, 30d, 90d)

**Mock data:** Realistic sample metrics in `src/lib/mock-data.ts`

**Demo mode:** If `/api/admin/analytics` fails, displays mock data. Period selector still works.

### Logs Viewer
**Route:** `/admin/dashboard?tab=logs`
**Features:**
- Paginated log display (20 per page)
- Filter by type: all, form, error, api
- Search by message/details
- Date range filter
- Export as CSV
- Expandable log entry details

**Mock data:** 4 sample logs (form submissions, API calls, errors)

**Demo mode:** Component has built-in mock data (no API call needed)

---

## File Structure

```
src/
├── lib/
│   ├── mock-data.ts          # Mock data fixtures (shared by all components)
│   ├── products.ts           # Stripe products from services
│   └── stripe.ts             # Stripe client config
├── components/admin/
│   ├── OverviewSection.tsx    # Dashboard overview (stats + quick start)
│   ├── ServicesCMS.tsx        # Services editor
│   ├── AreasCMS.tsx           # Areas editor
│   ├── AnalyticsDashboard.tsx # Analytics metrics
│   └── LogsViewer.tsx         # Logs with pagination/filters
├── routes/
│   ├── admin.dashboard.tsx    # Main admin layout (nav + tabs)
│   ├── admin.login.tsx        # Login form
│   ├── service-request.tsx    # Public service request form
│   └── checkout-success.tsx   # Payment confirmation
└── app/
    ├── actions/stripe.ts      # Server action: createCheckoutSession
    └── api/webhooks/stripe/route.ts  # Stripe webhook handler
```

---

## Demo Mode Behavior

**All components follow this pattern:**

1. Try to fetch from API with auth token
2. If fetch succeeds → display live data
3. If fetch fails → display mock data
4. No error messages shown to user
5. UI fully functional with mock data

**This means:**
- ✓ Admins see real data when APIs are running
- ✓ Demo/dev mode works instantly with mock data
- ✓ No separate "demo toggle" UI needed
- ✓ All features testable without backend

---

## Environment Variables

**Required for demo:**
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` — Stripe test key (from integration)
- `STRIPE_SECRET_KEY` — Stripe secret key (server-side only)
- `NEXT_PUBLIC_APP_URL` — App URL for checkout redirects (default: http://localhost:3000)

**Optional for production:**
- `STRIPE_WEBHOOK_SECRET` — From Stripe dashboard after registering webhook endpoint

---

## Testing Flows

### Full Admin Demo Flow
1. Go to `/admin/login`
2. Enter any token (e.g., "demo-token")
3. Click login → lands on `/admin/dashboard`
4. Click each tab to see:
   - Overview (stats cards)
   - Services (editable list)
   - Areas (editable list)
   - Analytics (metrics + funnel)
   - Logs (paginated + searchable)

### Service Request Flow
1. Go to `/service-request?serviceSlug=gas-safety-check&area=London`
2. Fill form: name, email, phone
3. (Optional) Add extras: label + price
4. Click "Proceed to Payment (£X.XX)"
5. Stripe form appears (EmbeddedCheckout)
6. Use test card `4242 4242 4242 4242`
7. Complete payment → redirects to `/checkout-success`

---

## Production Deployment

**To go live:**

1. **Replace mock data with live API calls**
   - Implement `/api/admin/services`
   - Implement `/api/admin/areas`
   - Implement `/api/admin/analytics`
   - Stripe webhook handler already exists

2. **Connect to database**
   - Schema: orders, services, areas (if not using SERVICES data directly)
   - Webhook: save order on `checkout.session.completed`

3. **Update env vars**
   - Replace Stripe test keys with live keys
   - Add `STRIPE_WEBHOOK_SECRET` from live webhook endpoint

4. **Auth**
   - Replace localStorage token check with session/JWT validation
   - Implement proper login flow (currently accepts any token for demo)

---

## Next Steps

- **Phase 5:** Database integration (Neon/Supabase) for order persistence
- **Phase 6:** Email notifications on payment success
- **Phase 7:** Admin order management dashboard
