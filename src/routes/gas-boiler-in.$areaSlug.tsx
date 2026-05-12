import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { SERVICES, getService, getArea, AREAS, BUSINESS } from "@/data/seo";
import { breadcrumbJsonLd, faqJsonLd, jsonLdScript, localServiceJsonLd, geoMetaTags } from "@/lib/seo";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Certifications } from "@/components/Certifications";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Check, MapPin, Flame, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/gas-boiler-in/$areaSlug")({
  beforeLoad: ({ params }) => {
    if (!getArea(params.areaSlug)) throw notFound();
  },
  head: ({ params }) => {
    const a = getArea(params.areaSlug);
    if (!a) return {};
    const url = `${BUSINESS.url}/gas-boiler-in/${a.slug}`;
    const title = `Gas Boiler Services in ${a.name} | Just Imagine Ltd`;
    const desc = `Gas boiler installation, servicing & repair in ${a.name}. Worcester, Vaillant & Ideal boilers. Up to 12-year warranty. Gas Safe registered. ${a.postcodes.join(", ")} postcodes. Call ${BUSINESS.phone}.`;

    const gasBoilerService = getService("gas-boilers");
    const boilerFaqs = gasBoilerService?.faqs ?? [];

    return {
      meta: [
        { title },
        { name: "description", content: desc },
        {
          name: "keywords",
          content: `gas boiler ${a.name.toLowerCase()}, boiler installation ${a.name.toLowerCase()}, boiler service ${a.name.toLowerCase()}, boiler repair ${a.name.toLowerCase()}, combi boiler ${a.name.toLowerCase()}, gas safe engineer ${a.name.toLowerCase()}, ${a.postcodes.join(" ")}`,
        },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        ...geoMetaTags(a.name),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        jsonLdScript(localServiceJsonLd("Gas Boiler Services", a, desc, "£2,500")),
        jsonLdScript(
          breadcrumbJsonLd([
            { name: "Home", url: BUSINESS.url },
            { name: "Gas Boilers", url: `${BUSINESS.url}/services/gas-boilers` },
            { name: a.name, url },
          ]),
        ),
        ...(boilerFaqs.length ? [jsonLdScript(faqJsonLd(boilerFaqs))] : []),
      ],
    };
  },
  component: GasBoilerInAreaPage,
  notFoundComponent: () => <div className="p-10">Area not found.</div>,
});

const boilerTypes = [
  {
    title: "Combi Boiler",
    desc: "Instant hot water, compact size — ideal for 1–3 bedroom homes with one bathroom. No cylinder or tank needed.",
    from: "£2,500",
  },
  {
    title: "System Boiler",
    desc: "Stored hot water for larger homes. Ideal for properties with 2+ bathrooms needing strong flow rates everywhere.",
    from: "£3,000",
  },
  {
    title: "Regular Boiler",
    desc: "Traditional setup with separate cylinder and tank. Best for older systems or properties with gravity-fed heating.",
    from: "£2,800",
  },
];

function GasBoilerInAreaPage() {
  const { areaSlug } = Route.useParams();
  const a = getArea(areaSlug)!;
  const gasBoilerService = getService("gas-boilers");
  const faqs = gasBoilerService?.faqs ?? [];

  return (
    <PageShell>
      <PageHero
        eyebrow={`Gas Boilers · ${a.name}`}
        title={`Gas Boiler Services in ${a.name}`}
        subtitle={`Expert gas boiler installation, servicing and repair across all ${a.postcodes.join(", ")} postcodes. Worcester, Vaillant and Ideal — Gas Safe registered.`}
        crumbs={[
          { name: "Services", to: "/services" },
          { name: "Gas Boilers", to: "/services/gas-boilers" as never },
          { name: a.name },
        ]}
      />

      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-16 grid lg:grid-cols-3 gap-10 lg:gap-14">
        <div className="lg:col-span-2 space-y-12">
          {/* Intro */}
          <div className="space-y-4">
            <p className="text-lg leading-relaxed">
              Gas boilers remain the most common and cost-effective heating solution for UK
              homes. Whether you need a new combi boiler, a system boiler for a larger property,
              or an annual service to keep your existing boiler running efficiently — our Gas
              Safe registered engineers cover every gas boiler need in {a.name}.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {a.blurb} We serve all {a.postcodes.join(" / ")} postcodes
              {a.landmarks ? `, including ${a.landmarks.slice(0, 4).join(", ")}` : ""}.
              {a.referralNote ? ` ${a.referralNote}` : ""}
            </p>
          </div>

          {/* Boiler types */}
          <div>
            <h2 className="font-display text-2xl font-semibold mb-1">
              Gas boiler types we install in {a.name}
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              Fixed written quote for every installation — no hidden extras.
            </p>
            <div className="grid gap-4">
              {boilerTypes.map((bt) => (
                <div
                  key={bt.title}
                  className="p-6 rounded-xl bg-card border border-border flex items-start gap-5"
                >
                  <div className="h-11 w-11 rounded-lg bg-gradient-amber flex items-center justify-center flex-shrink-0">
                    <Flame className="h-5 w-5 text-accent-foreground" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-semibold text-lg">{bt.title}</h3>
                      <span className="text-accent font-display font-bold text-lg whitespace-nowrap">
                        {bt.from}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{bt.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* What we do */}
          <div>
            <h2 className="font-display text-2xl font-semibold mb-1">
              Our gas boiler services
            </h2>
            <p className="text-muted-foreground text-sm mb-6">
              Installation, servicing and repair — all covered by Gas Safe certified engineers.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                "New boiler installation — combi, system and regular",
                "Annual manufacturer-spec boiler servicing",
                "Same-day boiler repair and diagnostics",
                "Boiler replacement and system upgrades",
                "Back boiler to combi conversions",
                "Worcester Bosch, Vaillant and Ideal supplied and fitted",
                "Smart thermostat fitting — Hive, Nest, Honeywell",
                "Gas Safe certificate and Building Regs issued",
              ].map((b) => (
                <div key={b} className="flex gap-3 p-4 rounded-xl bg-card border border-border">
                  <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Related service links */}
          <div className="flex flex-wrap gap-3">
            {["boiler-installation", "boiler-repair", "boiler-servicing"].map((slug) => {
              const s = getService(slug);
              if (!s) return null;
              return (
                <Link
                  key={slug}
                  to="/services/$serviceSlug/$areaSlug"
                  params={{ serviceSlug: slug, areaSlug: a.slug }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-border bg-card hover:border-accent/50 text-sm font-medium transition-smooth"
                >
                  {s.name} in {a.name}
                  <ArrowRight className="h-3.5 w-3.5 text-accent" />
                </Link>
              );
            })}
          </div>

          {/* FAQs */}
          {faqs.length > 0 && (
            <div>
              <h2 className="font-display text-2xl font-semibold mb-1">
                Gas boiler FAQs — {a.name}
              </h2>
              <p className="text-muted-foreground text-sm mb-6">
                Common questions answered honestly.
              </p>
              <div className="space-y-3">
                {faqs.map((f) => (
                  <details
                    key={f.q}
                    className="group p-5 bg-card border border-border rounded-xl open:shadow-sm"
                  >
                    <summary className="cursor-pointer font-semibold text-base list-none flex justify-between items-start gap-4">
                      <span>{f.q}</span>
                      <span className="text-accent text-xl leading-none transition-transform group-open:rotate-45 motion-reduce:transition-none flex-shrink-0">
                        +
                      </span>
                    </summary>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                      {f.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* Other areas */}
          <div>
            <h3 className="font-display text-xl font-semibold mb-3">
              Gas boilers in other areas
            </h3>
            <div className="flex flex-wrap gap-2">
              {AREAS.filter((x) => x.slug !== a.slug)
                .slice(0, 12)
                .map((x) => (
                  <Link
                    key={x.slug}
                    to="/gas-boiler-in/$areaSlug"
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
                Gas boiler quote for {a.name}
              </h3>
              <p className="text-sm text-primary-foreground/70 mb-5">
                Most boiler quotes given in under 10 minutes — no obligation.
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
                  href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hi — I need a gas boiler quote for ${a.name}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp
                </a>
              </Button>
            </div>

            <EnquiryForm defaultService="Gas Boilers" defaultArea={a.name} />

            {/* Pricing snapshot */}
            <div className="p-5 bg-card border border-border rounded-2xl">
              <div className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-3">
                Quick pricing guide
              </div>
              {[
                { label: "Combi boiler swap", price: "from £2,500" },
                { label: "System boiler install", price: "from £3,000" },
                { label: "Annual boiler service", price: "from £100" },
                { label: "Boiler repair diagnostic", price: "from £100" },
              ].map((p) => (
                <div
                  key={p.label}
                  className="flex justify-between py-2 border-b border-border last:border-0 text-sm"
                >
                  <span>{p.label}</span>
                  <span className="font-semibold text-accent">{p.price}</span>
                </div>
              ))}
            </div>

            <div className="p-5 bg-card border border-border rounded-2xl space-y-3">
              <div className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                Why Just Imagine
              </div>
              {[
                "Gas Safe registered — verifiable online",
                "Worcester & Vaillant accredited",
                "Up to 12-year manufacturer warranty",
                "Fixed price before any work begins",
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
