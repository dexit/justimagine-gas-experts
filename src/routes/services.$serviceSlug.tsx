import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { SERVICES, getService, AREAS, BUSINESS } from "@/data/seo";
import { breadcrumbJsonLd, faqJsonLd, jsonLdScript, serviceJsonLd } from "@/lib/seo";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Button } from "@/components/ui/button";
import { Phone, Check, MessageCircle, MapPin } from "lucide-react";

export const Route = createFileRoute("/services/$serviceSlug")({
  beforeLoad: ({ params }) => {
    if (!getService(params.serviceSlug)) throw notFound();
  },
  head: ({ params }) => {
    const s = getService(params.serviceSlug);
    if (!s) return {};
    const url = `${BUSINESS.url}/services/${s.slug}`;
    return {
      meta: [
        { title: s.metaTitle() },
        { name: "description", content: s.metaDesc() },
        {
          name: "keywords",
          content: `${s.name.toLowerCase()}, ${s.name.toLowerCase()} rugby, ${s.name.toLowerCase()} warwickshire, gas safe ${s.name.toLowerCase()}, local heating engineer`,
        },
        { property: "og:title", content: s.metaTitle() },
        { property: "og:description", content: s.metaDesc() },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "geo.region", content: "GB-WAR" },
        { name: "geo.placename", content: "Warwickshire" },
        { name: "geo.position", content: `${BUSINESS.geo.lat};${BUSINESS.geo.lng}` },
        { name: "ICBM", content: `${BUSINESS.geo.lat}, ${BUSINESS.geo.lng}` },
        { rel: "canonical", content: url } as never,
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        jsonLdScript(serviceJsonLd(s.name, s.metaDesc(), undefined, s.priceFrom)),
        jsonLdScript(
          breadcrumbJsonLd([
            { name: "Home", url: BUSINESS.url },
            { name: "Services", url: `${BUSINESS.url}/services` },
            { name: s.name, url },
          ]),
        ),
        ...(s.faqs.length ? [jsonLdScript(faqJsonLd(s.faqs))] : []),
      ],
    };
  },
  component: ServicePage,
  notFoundComponent: () => <div className="p-10">Service not found.</div>,
});

function ServicePage() {
  const { serviceSlug } = Route.useParams();
  const s = getService(serviceSlug)!;
  return (
    <PageShell>
      <PageHero
        eyebrow="Service"
        title={s.h1()}
        subtitle={s.short}
        crumbs={[{ name: "Services", to: "/services" }, { name: s.name }]}
      />
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-16 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          <p className="text-lg leading-relaxed text-foreground/90">{s.intro()}</p>

          <div className="grid sm:grid-cols-2 gap-3">
            {s.bullets.map((b) => (
              <div key={b} className="flex gap-3 p-4 rounded-xl bg-card border border-border">
                <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm">{b}</span>
              </div>
            ))}
          </div>

          {s.priceFrom && (
            <div className="p-6 rounded-2xl bg-gradient-hero text-primary-foreground">
              <div className="text-xs uppercase tracking-wider text-accent">From</div>
              <div className="font-display text-4xl">{s.priceFrom}</div>
              <div className="text-sm text-primary-foreground/70 mt-1">
                Fixed written quotes — no surprises.
              </div>
            </div>
          )}

          {s.faqs.length > 0 && (
            <div>
              <h2 className="font-display text-3xl font-semibold mb-5">
                Frequently asked questions
              </h2>
              <div className="space-y-3">
                {s.faqs.map((f) => (
                  <details key={f.q} className="group p-5 bg-card border border-border rounded-xl">
                    <summary className="cursor-pointer font-semibold list-none flex justify-between items-center">
                      {f.q}
                      <span className="text-accent group-open:rotate-45 transition-smooth">+</span>
                    </summary>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="font-display text-2xl font-semibold mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-accent" />
              Areas we cover for {s.name}
            </h2>
            <div className="flex flex-wrap gap-2">
              {AREAS.map((a) => (
                <Link
                  key={a.slug}
                  to="/services/$serviceSlug/$areaSlug"
                  params={{ serviceSlug: s.slug, areaSlug: a.slug }}
                  className="px-3 py-1.5 text-xs rounded-full bg-secondary hover:bg-accent hover:text-accent-foreground transition-smooth"
                >
                  {s.name} in {a.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="p-6 bg-gradient-hero text-primary-foreground rounded-2xl">
            <h3 className="font-display text-xl mb-2">Get a quote in minutes</h3>
            <p className="text-sm text-primary-foreground/75 mb-4">
              Phone is fastest — most jobs quoted in 5 minutes.
            </p>
            <Button
              asChild
              className="w-full bg-gradient-amber text-accent-foreground hover:opacity-90 font-semibold mb-2"
            >
              <a href={`tel:${BUSINESS.phoneE164}`}>
                <Phone className="h-4 w-4 mr-2" />
                {BUSINESS.phone}
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full bg-transparent border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <a
                href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hi — quote for ${s.name}`)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
              </a>
            </Button>
          </div>
          <EnquiryForm defaultService={s.name} />

          <div className="p-5 bg-card border border-border rounded-2xl">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
              Other services
            </div>
            <ul className="text-sm space-y-1.5">
              {SERVICES.filter((x) => x.slug !== s.slug)
                .slice(0, 6)
                .map((x) => (
                  <li key={x.slug}>
                    <Link
                      to="/services/$serviceSlug"
                      params={{ serviceSlug: x.slug }}
                      className="hover:text-accent"
                    >
                      {x.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </aside>
      </section>
    </PageShell>
  );
}
