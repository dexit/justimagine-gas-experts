import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Flame,
  Wrench,
  ShieldCheck,
  Droplets,
  FileCheck,
  Clock,
  Thermometer,
  Hammer,
  Phone,
  ArrowRight,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import { PageShell, PageHero } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { SERVICES, AREAS, BUSINESS } from "@/data/seo";
import {
  geoMetaTags,
  serviceJsonLd,
  offerCatalogJsonLd,
  breadcrumbJsonLd,
  jsonLdScript,
} from "@/lib/seo";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Our Services & Prices | Just Imagine Ltd — Rugby & Warwickshire" },
      {
        name: "description",
        content:
          "Boiler installs, servicing, CP12, central heating, plumbing & 24/7 emergency callouts. Fixed prices, Gas Safe engineers across Rugby & Warwickshire.",
      },
      {
        property: "og:title",
        content: "Our Services & Prices | Just Imagine Ltd — Rugby & Warwickshire",
      },
      {
        property: "og:description",
        content:
          "Browse every service we offer with starting prices and what's included. Gas Safe engineers. Free fixed quotes — 07774 079152.",
      },
      ...geoMetaTags(),
    ],
    links: [{ rel: "canonical", href: `${BUSINESS.url}/services` }],
    scripts: [
      jsonLdScript(
        serviceJsonLd(
          "Heating & Gas Services",
          "Professional boiler installation, servicing, repairs, CP12 gas safety certificates, central heating and 24/7 emergency callouts across Warwickshire.",
        ),
      ),
      jsonLdScript(offerCatalogJsonLd()),
      jsonLdScript(
        breadcrumbJsonLd([
          { name: "Home", url: BUSINESS.url },
          { name: "Services", url: `${BUSINESS.url}/services` },
        ]),
      ),
    ],
  }),
  component: ServicesPage,
});

const ICONS: Record<string, LucideIcon> = {
  flame: Flame,
  wrench: Wrench,
  "shield-check": ShieldCheck,
  "file-check": FileCheck,
  thermometer: Thermometer,
  droplets: Droplets,
  hammer: Hammer,
  clock: Clock,
  building: ShieldCheck,
};

const CATEGORY_LABEL: Record<string, string> = {
  installation: "Installation",
  maintenance: "Service & Repair",
  safety: "Safety & Compliance",
  emergency: "Emergency",
  plumbing: "Plumbing",
};

const CATEGORY_ORDER: Array<keyof typeof CATEGORY_LABEL> = [
  "installation",
  "maintenance",
  "safety",
  "plumbing",
  "emergency",
];

const FEATURED_AREAS = AREAS.slice(0, 6);

function ServicesPage() {
  const grouped = CATEGORY_ORDER.map((cat) => ({
    cat,
    label: CATEGORY_LABEL[cat],
    items: SERVICES.filter((s) => s.category === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <PageShell>
      <PageHero
        eyebrow="Services & Prices"
        title="Every service we offer — with what's included and what it costs."
        subtitle="Browse our full catalogue of boiler, gas and plumbing services. Each one is a fixed-price offer with clear inclusions — pick the one you need, or call and we'll point you the right way."
      />

      {/* Quick category jump */}
      <section className="border-y border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-5 flex flex-wrap gap-2 justify-center">
          {grouped.map((g) => (
            <a
              key={g.cat}
              href={`#${g.cat}`}
              className="px-4 py-2 rounded-full text-sm font-medium bg-card border border-border hover:border-accent/50 hover:text-accent-foreground transition-smooth"
            >
              {g.label}
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-16 md:py-20">
        {grouped.map((group) => (
          <div key={group.cat} id={group.cat} className="scroll-mt-24 mb-16 last:mb-0">
            <div className="flex items-end justify-between mb-8">
              <h2 className="font-display text-3xl md:text-4xl font-semibold">{group.label}</h2>
              <span className="text-sm text-muted-foreground">
                {group.items.length} offer{group.items.length === 1 ? "" : "s"}
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {group.items.map((s) => {
                const Icon = ICONS[s.icon] ?? Wrench;
                return (
                  <Link
                    key={s.slug}
                    to="/$service/$area"
                    params={{ service: s.slug, area: "rugby" }}
                    className="group p-7 rounded-2xl bg-card border border-border hover:border-accent/60 hover:shadow-elegant transition-smooth flex flex-col"
                  >
                    <div className="flex items-start gap-5">
                      <div className="h-12 w-12 rounded-xl bg-gradient-amber flex items-center justify-center shadow-amber flex-shrink-0">
                        <Icon className="h-5.5 w-5.5 text-accent-foreground" strokeWidth={2.2} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h3 className="font-display text-xl font-semibold leading-tight">
                            {s.name}
                          </h3>
                          {s.priceFrom && (
                            <div className="text-right flex-shrink-0">
                              <div className="text-xs text-muted-foreground">From</div>
                              <div className="font-display text-lg font-semibold text-accent-foreground">
                                {s.priceFrom}
                              </div>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                          {s.short}
                        </p>
                        <ul className="space-y-1.5 text-sm text-muted-foreground mb-5">
                          {s.bullets.slice(0, 3).map((p) => (
                            <li key={p} className="flex gap-2">
                              <span className="text-accent">›</span>
                              <span className="line-clamp-1">{p}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="inline-flex items-center gap-2 text-sm font-semibold text-accent-foreground group-hover:gap-3 transition-all">
                          View details & book
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}

        {/* Areas cross-link */}
        <div className="mt-12 p-8 md:p-10 rounded-3xl bg-secondary/50 border border-border">
          <div className="flex items-center gap-3 mb-3">
            <MapPin className="h-5 w-5 text-accent" />
            <h2 className="font-display text-2xl font-semibold">Need this in your town?</h2>
          </div>
          <p className="text-muted-foreground mb-6 max-w-2xl">
            Every service is available across Rugby and the wider Warwickshire area. Browse by
            location to see local pricing, response times and recent jobs.
          </p>
          <div className="flex flex-wrap gap-2">
            {FEATURED_AREAS.map((a) => (
              <Link
                key={a.slug}
                to="/areas/$areaSlug"
                params={{ areaSlug: a.slug }}
                className="px-4 py-2 rounded-full text-sm bg-card border border-border hover:border-accent/50 transition-smooth"
              >
                {a.name}
              </Link>
            ))}
            <Link
              to="/areas"
              className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-amber text-accent-foreground"
            >
              All areas →
            </Link>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-10 p-10 rounded-3xl bg-gradient-hero text-primary-foreground text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold">
            Not sure which service you need?
          </h2>
          <p className="mt-3 text-primary-foreground/75 max-w-xl mx-auto">
            Call us — most jobs we can advise on or quote over the phone in five minutes. No
            obligation, no pressure.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-amber text-accent-foreground hover:opacity-90 font-semibold shadow-amber"
            >
              <a href="tel:07774079152">
                <Phone className="h-4 w-4 mr-2" />
                07774 079152
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <Link to="/contact">Get a free quote</Link>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
