import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { SERVICES, getService, getArea, AREAS, BUSINESS } from "@/data/seo";
import { breadcrumbJsonLd, faqJsonLd, jsonLdScript, localServiceJsonLd, geoMetaTags, localBusinessJsonLd } from "@/lib/seo";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Certifications } from "@/components/Certifications";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Check, MapPin, Flame, Thermometer, Wrench, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/heating-in/$areaSlug")({
  beforeLoad: ({ params }) => {
    if (!getArea(params.areaSlug)) throw notFound();
  },
  head: ({ params }) => {
    const a = getArea(params.areaSlug);
    if (!a) return {};
    const url = `${BUSINESS.url}/heating-in/${a.slug}`;
    const title = `Heating Services in ${a.name} | Just Imagine Ltd`;
    const desc = `Professional heating services in ${a.name}. Boiler installation, servicing, repairs, central heating, underfloor heating & radiators. Gas Safe registered engineers. ${a.postcodes.join(", ")} postcodes. Call ${BUSINESS.phone}.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        {
          name: "keywords",
          content: `heating ${a.name.toLowerCase()}, heating engineer ${a.name.toLowerCase()}, boiler installation ${a.name.toLowerCase()}, central heating ${a.name.toLowerCase()}, gas safe engineer ${a.name.toLowerCase()}, ${a.postcodes.join(" ")}`,
        },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        ...geoMetaTags(a.name),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        jsonLdScript({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: title,
          description: desc,
          url,
          isPartOf: { "@id": `${BUSINESS.url}/#website` },
          about: { "@id": `${BUSINESS.url}/#business` },
        }),
        jsonLdScript(localServiceJsonLd("Heating Services", a, desc)),
        jsonLdScript(
          breadcrumbJsonLd([
            { name: "Home", url: BUSINESS.url },
            { name: "Heating Services", url: `${BUSINESS.url}/services/heating-services` },
          ]),
        ),
        jsonLdScript(localBusinessJsonLd()),
      ],
    };
  },
  component: HeatingInAreaPage,
  notFoundComponent: () => <div className="p-10">Area not found.</div>,
});

const heatingServices = [
  {
    slug: "boiler-installation",
    icon: Flame,
    title: "Boiler Installation",
    desc: "A-rated Worcester, Vaillant and Ideal boilers — fixed price, manufacturer warranty up to 12 years.",
  },
  {
    slug: "boiler-servicing",
    icon: Wrench,
    title: "Boiler Servicing",
    desc: "Annual manufacturer-spec service — keeps warranty valid, catches faults early, service report same day.",
  },
  {
    slug: "boiler-repair",
    icon: Wrench,
    title: "Boiler Repair",
    desc: "Same-day diagnostics on all major brands. Genuine OEM parts, fixed price after assessment.",
  },
  {
    slug: "central-heating",
    icon: Thermometer,
    title: "Central Heating",
    desc: "Full system design, radiator upgrades, smart controls and system balancing.",
  },
  {
    slug: "underfloor-heating",
    icon: Thermometer,
    title: "Underfloor Heating",
    desc: "Warm-water UFH for new builds, extensions and renovations. Design, fit and commission.",
  },
  {
    slug: "power-flushing",
    icon: Wrench,
    title: "Power Flushing",
    desc: "Full chemical flush from £395 — clears sludge, restores radiator heat, protects your boiler.",
  },
];

function HeatingInAreaPage() {
  const { areaSlug } = Route.useParams();
  const a = getArea(areaSlug)!;

  return (
    <PageShell>
      <PageHero
        eyebrow={`Heating · ${a.name}`}
        title={`Heating Services in ${a.name}`}
        subtitle={`Gas Safe registered heating engineers covering all ${a.postcodes.join(", ")} postcodes. Boilers, central heating, underfloor heating and more.`}
        crumbs={[
          { name: "Services", to: "/services" },
          { name: "Heating", to: "/services/heating-services" as never },
          { name: a.name },
        ]}
      />

      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-16 grid lg:grid-cols-3 gap-10 lg:gap-14">
        <div className="lg:col-span-2 space-y-12">
          {/* Intro */}
          <div className="space-y-4">
            <p className="text-lg leading-relaxed">
              Whether you need a new boiler, an annual service, underfloor heating or a full
              central heating system designed from scratch — our Gas Safe registered engineers
              cover every heating need in {a.name} and surrounding areas.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {a.blurb} We serve all {a.postcodes.join(" / ")} postcodes
              {a.landmarks ? `, including ${a.landmarks.slice(0, 4).join(", ")}` : ""}.
              {a.referralNote ? ` ${a.referralNote}` : ""}
            </p>
          </div>

          {/* Heating services grid */}
          <div>
            <h2 className="font-display text-2xl font-semibold mb-1">
              Heating services we offer in {a.name}
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              Every service below is carried out by Gas Safe registered engineers with fixed
              written pricing.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {heatingServices.map((s) => (
                <Link
                  key={s.slug}
                  to="/services/$serviceSlug/$areaSlug"
                  params={{ serviceSlug: s.slug, areaSlug: a.slug }}
                  className="p-5 rounded-xl bg-card border border-border hover:border-accent/50 hover:shadow-elegant transition-smooth group"
                >
                  <div className="h-10 w-10 rounded-lg bg-gradient-amber flex items-center justify-center mb-3">
                    <s.icon className="h-5 w-5 text-accent-foreground" strokeWidth={2} />
                  </div>
                  <h3 className="font-semibold mb-1 group-hover:text-accent transition-smooth">
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                  <span className="inline-flex items-center gap-1 text-xs text-accent font-medium mt-3">
                    View details <ArrowRight className="h-3 w-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Other areas */}
          <div>
            <h3 className="font-display text-xl font-semibold mb-3">
              Heating in other areas
            </h3>
            <div className="flex flex-wrap gap-2">
              {AREAS.filter((x) => x.slug !== a.slug)
                .slice(0, 12)
                .map((x) => (
                  <Link
                    key={x.slug}
                    to="/heating-in/$areaSlug"
                    params={{ areaSlug: x.slug }}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-full bg-secondary hover:bg-accent hover:text-accent-foreground transition-smooth"
                  >
                    <MapPin className="h-3 w-3" />
                    {x.name}
                  </Link>
                ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-5">
          <div className="lg:sticky lg:top-24 space-y-5">
            <div className="p-6 bg-gradient-hero text-primary-foreground rounded-2xl">
              <h3 className="font-display text-xl font-semibold mb-1">
                Heating quote for {a.name}
              </h3>
              <p className="text-sm text-primary-foreground/70 mb-5">
                Call us directly — most jobs quoted in 5 minutes.
              </p>
              <Button
                asChild
                className="w-full bg-gradient-amber text-accent-foreground hover:opacity-90 font-semibold mb-3 shadow-amber"
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
                  href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hi — I need a heating quote for ${a.name}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp
                </a>
              </Button>
            </div>
            <EnquiryForm defaultService="Heating Services" defaultArea={a.name} />
            <div className="p-5 bg-card border border-border rounded-2xl space-y-3">
              <div className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                Why Just Imagine
              </div>
              {[
                "Gas Safe registered — verifiable online",
                "Fixed price before any work begins",
                "12-month workmanship guarantee",
                "We answer our own phone — no call centres",
              ].map((t) => (
                <div key={t} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-accent flex-shrink-0" />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="bg-secondary/30 border-t border-border py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Certifications />
        </div>
      </section>
    </PageShell>
  );
}
