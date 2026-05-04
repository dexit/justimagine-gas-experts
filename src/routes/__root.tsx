import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { localBusinessJsonLd, jsonLdScript } from "@/lib/seo";
import { BUSINESS } from "@/data/seo";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
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
