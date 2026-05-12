// All IDs are injected at build time from VITE_* environment variables.
// Set them in .env.local for local dev, or in your deployment platform for production.
// See .env.example for the full list of supported variables.

export const GTM_ID = import.meta.env.VITE_GTM_ID || "";
export const GA4_ID = import.meta.env.VITE_GA4_ID || "";
export const CLARITY_ID = import.meta.env.VITE_CLARITY_ID || "";
export const HUBSPOT_ID = import.meta.env.VITE_HUBSPOT_ID || "";
export const BREVO_ID = import.meta.env.VITE_BREVO_ID || "";
export const INDEXNOW_KEY = import.meta.env.VITE_INDEXNOW_KEY || "";
export const BING_VERIFY = import.meta.env.VITE_BING_VERIFY || "";
export const GOOGLE_VERIFY = import.meta.env.VITE_GOOGLE_VERIFY || "";
