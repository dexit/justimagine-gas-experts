import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { SERVICES, getService, getArea, BUSINESS } from "@/data/seo";
import { breadcrumbJsonLd, faqJsonLd, jsonLdScript, localServiceJsonLd, geoMetaTags } from "@/lib/seo";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Check } from "lucide-react";

export const Route = createFileRoute("/services/$serviceSlug/$areaSlug")({
  beforeLoad: ({ params }) => {
    if (!getService(params.serviceSlug) || !getArea(params.areaSlug)) throw notFound();
  },
  head: ({ params }) => {
    const s = getService(params.serviceSlug);
    const a = getArea(params.areaSlug);
    if (!s || !a) return {};
    const url = `${BUSINESS.url}/services/${s.slug}/${a.slug}`;
    return {
      meta: [
        { title: s.metaTitle(a.name) },
        { name: "description", content: s.metaDesc(a.name) },
        {
          name: "keywords",
          content: `${s.name.toLowerCase()} ${a.name.toLowerCase()}, ${s.name.toLowerCase()} ${a.postcodes.join(" ")}, gas safe engineer ${a.name.toLowerCase()}, local heating engineer ${a.name.toLowerCase()}`,
        },
        { property: "og:title", content: s.metaTitle(a.name) },
        { property: "og:description", content: s.metaDesc(a.name) },
        { property: "og:url", content: url },
        ...geoMetaTags(a.name),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        jsonLdScript(localServiceJsonLd(s.name, a, s.metaDesc(a.name), s.priceFrom, s.slug === "plumbing")),
        jsonLdScript(
          breadcrumbJsonLd([
            { name: "Home", url: BUSINESS.url },
            { name: "Services", url: `${BUSINESS.url}/services` },
            { name: s.name, url: `${BUSINESS.url}/services/${s.slug}` },
            { name: a.name, url },
          ]),
        ),
        ...(s.faqs.length ? [jsonLdScript(faqJsonLd(s.faqs))] : []),
      ],
    };
  },
  component: ServiceAreaPage,
  notFoundComponent: () => <div className="p-10">Page not found.</div>,
});

function ServiceAreaPage() {
  const { serviceSlug, areaSlug } = Route.useParams();
  const s = getService(serviceSlug)!;
  const a = getArea(areaSlug)!;
  return (
    <PageShell>
      <PageHero
        eyebrow={`${s.name} · ${a.name}`}
        title={s.h1(a.name)}
        subtitle={`Trusted by homeowners, landlords and letting agents across ${a.name} (${a.postcodes.join(", ")}).`}
        crumbs={[
          { name: "Services", to: "/services" },
          { name: s.name, to: `/services/${s.slug}` as never },
          { name: a.name },
        ]}
      />
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-16 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <p className="text-lg leading-relaxed">{s.intro(a.name)}</p>
          <p className="text-muted-foreground leading-relaxed">
            {a.blurb} Whether you need a new boiler, an annual service, a CP12 certificate or an
            emergency repair, our Gas Safe registered engineers cover every{" "}
            {a.postcodes.join(" / ")} postcode — usually with same-day availability.
          </p>

          <div className="grid sm:grid-cols-2 gap-3">
            {s.bullets.map((b) => (
              <div key={b} className="flex gap-3 p-4 rounded-xl bg-card border border-border">
                <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-sm">{b}</span>
              </div>
            ))}
          </div>

          {s.faqs.length > 0 && (
            <div>
              <h2 className="font-display text-2xl font-semibold mb-4">
                {s.name} {a.name} — FAQs
              </h2>
              <div className="space-y-3">
                {s.faqs.map((f) => (
                  <details key={f.q} className="group p-5 bg-card border border-border rounded-xl">
                    <summary className="cursor-pointer font-semibold list-none flex justify-between">
                      {f.q}
                      <span className="text-accent">+</span>
                    </summary>
                    <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="font-display text-xl font-semibold mb-3">Other services in {a.name}</h3>
            <div className="flex flex-wrap gap-2">
              {SERVICES.filter((x) => x.slug !== s.slug).map((x) => (
                <Link
                  key={x.slug}
                  to="/services/$serviceSlug/$areaSlug"
                  params={{ serviceSlug: x.slug, areaSlug: a.slug }}
                  className="px-3 py-1.5 text-xs rounded-full bg-secondary hover:bg-accent hover:text-accent-foreground transition-smooth"
                >
                  {x.name} in {a.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="p-6 bg-gradient-hero text-primary-foreground rounded-2xl">
            <h3 className="font-display text-xl mb-2">
              Book {s.name.toLowerCase()} in {a.name}
            </h3>
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
                href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hi — ${s.name} quote for ${a.name}`)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
              </a>
            </Button>
          </div>
          <EnquiryForm defaultService={s.name} defaultArea={a.name} />
        </aside>
      </section>
    </PageShell>
  );
}
