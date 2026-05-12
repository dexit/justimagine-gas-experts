import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { localBusinessJsonLd, jsonLdScript } from "@/lib/seo";
import { BUSINESS, AREAS } from "@/data/seo";
import { GTM_ID, GA4_ID, CLARITY_ID, BING_VERIFY, GOOGLE_VERIFY, INDEXNOW_KEY } from "@/lib/analytics";
import { TrackingScripts } from "@/components/TrackingScripts";
import { Phone, Flame, ArrowRight, Home, Wrench, AlertCircle, Building, MapPin } from "lucide-react";
import { useSearchRedirect } from "@/hooks/useSearchRedirect";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  const quickLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/services", label: "All Services", icon: Wrench },
    { to: "/emergency", label: "Emergency Callout", icon: AlertCircle },
    { to: "/landlord", label: "Landlord Packages", icon: Building },
    { to: "/areas", label: "Areas We Cover", icon: MapPin },
    { to: "/contact", label: "Get a Quote", icon: Phone },
  ];
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl w-full text-center">
          <div className="h-16 w-16 rounded-2xl bg-gradient-hero flex items-center justify-center mx-auto mb-6">
            <Flame className="h-8 w-8 text-accent" />
          </div>
          <h1 className="font-display text-8xl font-bold text-foreground/10 leading-none">404</h1>
          <h2 className="font-display text-2xl font-semibold text-foreground -mt-4 mb-3">
            Page not found
          </h2>
          <p className="text-muted-foreground mb-10">
            That page doesn't exist or has been moved. Try one of the links below.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
            {quickLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-2.5 p-3.5 rounded-xl border border-border bg-card hover:border-accent/50 hover:shadow-sm transition-smooth text-sm font-medium"
              >
                <Icon className="h-4 w-4 text-accent flex-shrink-0" />
                {label}
              </Link>
            ))}
          </div>

          <div className="mb-8">
            <p className="text-xs uppercase tracking-wider text-muted-foreground mb-4 font-medium">
              Or find your area
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {AREAS.slice(0, 8).map((a) => (
                <Link
                  key={a.slug}
                  to="/areas/$areaSlug"
                  params={{ areaSlug: a.slug }}
                  className="px-3 py-1.5 rounded-full bg-secondary border border-border text-xs hover:border-accent/50 transition-smooth"
                >
                  {a.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href={`tel:${BUSINESS.phoneE164}`}
              className="inline-flex items-center gap-2 bg-gradient-amber text-accent-foreground font-semibold text-sm px-5 py-2.5 rounded-lg hover:opacity-90 transition-smooth"
            >
              <Phone className="h-4 w-4" />
              {BUSINESS.phone}
            </a>
            <Link
              to="/"
              className="inline-flex items-center gap-2 border border-border text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-secondary transition-smooth"
            >
              Back to home <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => {
    const url = BUSINESS.url;
    const ogImage = `${url}/og-default.jpg`;
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: "Just Imagine Ltd | Gas Safe Boiler & Heating Engineers Rugby" },
        {
          name: "description",
          content:
            "Gas Safe boiler installation, servicing & repair in Rugby & Warwickshire. CP12 certificates, central heating, emergency callouts 24/7. Call 07774 079152.",
        },
        { name: "robots", content: "index, follow, max-image-preview:large" },
        { name: "author", content: BUSINESS.name },
        { name: "geo.region", content: "GB-WAR" },
        { name: "geo.placename", content: "Rugby, Warwickshire" },
        { name: "geo.position", content: `${BUSINESS.geo.lat};${BUSINESS.geo.lng}` },
        { name: "ICBM", content: `${BUSINESS.geo.lat}, ${BUSINESS.geo.lng}` },
        { property: "og:title", content: "Just Imagine Ltd | Gas Safe Boiler & Heating — Rugby" },
        {
          property: "og:description",
          content:
            "Professional boiler installation, gas safety certificates & 24/7 emergency cover in Rugby & Warwickshire. Gas Safe registered. Free quotes.",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:image", content: ogImage },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:site_name", content: "Just Imagine Ltd" },
        { property: "og:locale", content: "en_GB" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Just Imagine Ltd — Gas Safe Heating, Boilers & Plumbing" },
        {
          name: "twitter:description",
          content:
            "Boiler installation, CP12 certificates & 24/7 emergency engineers in Rugby & Warwickshire. Call 07774 079152.",
        },
        { name: "twitter:image", content: ogImage },
        ...(GOOGLE_VERIFY ? [{ name: "google-site-verification", content: GOOGLE_VERIFY }] : [{ name: "google-site-verification", content: "placeholder-verify" }]),
        ...(BING_VERIFY ? [{ name: "msvalidate.01", content: BING_VERIFY }] : []),
        ...(INDEXNOW_KEY ? [{ name: "indexnow-key", content: INDEXNOW_KEY }] : []),
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "canonical", href: url },
        { rel: "icon", type: "image/svg+xml", href: "/logo.svg" },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "manifest", href: "/manifest.json" },
        /* Preload critical fonts */
        { rel: "preload", as: "font", href: "/fonts/inter-400.woff2", type: "font/woff2", crossOrigin: "anonymous" },
        { rel: "preload", as: "font", href: "/fonts/inter-600.woff2", type: "font/woff2", crossOrigin: "anonymous" },
        { rel: "preload", as: "font", href: "/fonts/fraunces-variable.woff2", type: "font/woff2", crossOrigin: "anonymous" },
        { rel: "dns-prefetch", href: "https://www.googletagmanager.com" },
        { rel: "dns-prefetch", href: "https://www.google-analytics.com" },
        { rel: "dns-prefetch", href: "https://www.clarity.ms" },
        { rel: "dns-prefetch", href: "https://js.hs-scripts.com" },
        { rel: "dns-prefetch", href: "https://conversations-widget.brevo.com" },
      ],
      scripts: [
        jsonLdScript(localBusinessJsonLd()),
        // Google Tag Manager (manages GA4, Ads, and other tags — recommended)
        ...(GTM_ID
          ? [
              {
                children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
              },
            ]
          : []),
        // Google Analytics 4 direct (use only when NOT loading via GTM to avoid double-counting)
        ...(GA4_ID && !GTM_ID
          ? [
              { src: `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`, async: true },
              {
                children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA4_ID}');`,
              },
            ]
          : []),
        // Microsoft Clarity heatmaps & session recordings
        ...(CLARITY_ID
          ? [
              {
                children: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`,
              },
            ]
          : []),
      ],
    };
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <TrackingScripts />
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  useSearchRedirect();
  return <Outlet />;
}
