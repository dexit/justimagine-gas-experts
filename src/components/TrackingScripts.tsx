import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { GTM_ID, HUBSPOT_ID, BREVO_ID } from "@/lib/analytics";

/**
 * Body-level tracking: Vercel observability, GTM noscript fallback, CRM chat widget.
 * Rendered inside <body> from RootShell.
 */
export function TrackingScripts() {
  return (
    <>
      {/* Vercel Web Analytics + Core Web Vitals */}
      <Analytics />
      <SpeedInsights />

      {/* GTM noscript fallback — must be first thing after <body> */}
      {GTM_ID && (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="GTM"
          />
        </noscript>
      )}

      {/* HubSpot tracking pixel — use VITE_HUBSPOT_ID */}
      {HUBSPOT_ID && (
        <script
          type="text/javascript"
          id="hs-script-loader"
          async
          defer
          src={`//js.hs-scripts.com/${HUBSPOT_ID}.js`}
        />
      )}

      {/* Brevo (Sendinblue) conversations widget — use VITE_BREVO_ID instead of HUBSPOT_ID */}
      {BREVO_ID && (
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(d,w,c){w.BrevoConversationsID='${BREVO_ID}';w[c]=w[c]||function(){(w[c].q=w[c].q||[]).push(arguments)};var s=d.createElement('script');s.async=true;s.src='https://conversations-widget.brevo.com/brevo-conversations.js';if(d.head)d.head.appendChild(s);})(document,window,'BrevoConversations');`,
          }}
        />
      )}
    </>
  );
}
