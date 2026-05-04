import { Outlet, Link, createRootRoute, HeadContent, Scripts, ScriptOnce } from "@tanstack/react-router";
import { localBusinessJsonLd, jsonLdScript } from "@/lib/seo";
import { BUSINESS } from "@/data/seo";
import { Phone, Flame, ArrowRight, Home, Wrench, AlertCircle, Building, MapPin } from "lucide-react";

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
        { title: "Just Imagine Ltd — Gas Safe Heating, Boilers & Plumbing" },
        {
          name: "description",
          content:
            "Gas Safe registered engineers. Boilers, gas safety certificates, heating, plumbing, repairs and 24/7 emergency callouts.",
        },
        { property: "og:title", content: "Just Imagine Ltd — Heating & Gas Specialists" },
        {
          property: "og:description",
          content: "Boilers · Servicing · Repairs · Gas Safety · 24/7",
        },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:image", content: ogImage },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "Just Imagine Ltd — Heating & Gas Specialists" },
        {
          name: "twitter:description",
          content:
            "Gas Safe registered engineers. Boilers, gas safety certificates, heating, plumbing, repairs and 24/7 emergency callouts.",
        },
        { name: "twitter:image", content: ogImage },
        { name: "google-site-verification", content: "placeholder-verify" },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "canonical", href: url },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" },
        { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" },
        { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
        { rel: "manifest", href: "/manifest.json" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        { rel: "dns-prefetch", href: "https://www.googletagmanager.com" },
        { rel: "dns-prefetch", href: "https://www.google-analytics.com" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap",
          crossOrigin: "anonymous",
        },
      ],
      scripts: [
        jsonLdScript(localBusinessJsonLd()),
        {
          children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');`,
        },
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
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return <Outlet />;
}
