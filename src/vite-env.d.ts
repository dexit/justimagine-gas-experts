/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GTM_ID: string;
  readonly VITE_GA4_ID: string;
  readonly VITE_CLARITY_ID: string;
  readonly VITE_HUBSPOT_ID: string;
  readonly VITE_BREVO_ID: string;
  readonly VITE_INDEXNOW_KEY: string;
  readonly VITE_BING_VERIFY: string;
  readonly VITE_GOOGLE_VERIFY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
