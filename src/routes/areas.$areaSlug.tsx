import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { SERVICES, getArea, BUSINESS } from "@/data/seo";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, MapPin } from "lucide-react";

export const Route = createFileRoute("/areas/$areaSlug")({
  beforeLoad: ({ params }) => {
    if (!getArea(params.areaSlug)) throw notFound();
  },
  head: ({ params }) => {
    const a = getArea(params.areaSlug);
    if (!a) return {};
    const url = `${BUSINESS.url}/areas/${a.slug}`;
    const title = `Boiler, Heating & Plumbing Engineers in ${a.name} | Just Imagine`;
    const desc = `Gas Safe registered boiler installation, repair, servicing, CP12 gas safety & plumbing in ${a.name} (${a.postcodes.join(", ")}). 24/7 callouts. Free quotes.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        {
          name: "keywords",
          content: `boiler ${a.name.toLowerCase()}, plumber ${a.name.toLowerCase()}, gas safe engineer ${a.name.toLowerCase()}, heating engineer ${a.name.toLowerCase()}, ${a.postcodes.join(", ")}`,
        },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        jsonLdScript(
          breadcrumbJsonLd([
            { name: "Home", url: BUSINESS.url },
            { name: "Areas", url: `${BUSINESS.url}/areas` },
            { name: a.name, url },
          ]),
        ),
      ],
    };
  },
  component: AreaPage,
  notFoundComponent: () => <div className="p-10">Area not found.</div>,
});

function AreaPage() {
  const { areaSlug } = Route.useParams();
  const a = getArea(areaSlug)!;
  return (
    <PageShell>
      <PageHero
        eyebrow={`${a.county}`}
        title={`Heating, Gas & Plumbing in ${a.name}`}
        subtitle={a.blurb}
        crumbs={[{ name: "Areas", to: "/areas" }, { name: a.name }]}
      />
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-16 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-accent" /> Postcodes covered:{" "}
            <span className="font-mono text-foreground">{a.postcodes.join(", ")}</span>
          </div>
          <p className="text-lg leading-relaxed">
            From a 7am boiler emergency in {a.name} to a planned new combi installation — we're the
            local Gas Safe team {a.name} homeowners and landlords keep coming back to. Honest
            pricing, certified engineers, and zero pressure.
          </p>

          <h2 className="font-display text-2xl font-semibold pt-2">
            Services we cover in {a.name}
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                to="/services/$serviceSlug/$areaSlug"
                params={{ serviceSlug: s.slug, areaSlug: a.slug }}
                className="p-5 rounded-xl bg-card border border-border hover:border-accent/50 transition-smooth"
              >
                <div className="font-semibold">
                  {s.name} in {a.name}
                </div>
                <div className="text-xs text-muted-foreground mt-1">{s.short}</div>
              </Link>
            ))}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="p-6 bg-gradient-hero text-primary-foreground rounded-2xl">
            <h3 className="font-display text-xl mb-2">Local engineers, on call</h3>
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
                href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hi — enquiry from ${a.name}`)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp us
              </a>
            </Button>
          </div>
          <EnquiryForm defaultArea={a.name} />
        </aside>
      </section>
    </PageShell>
  );
}
