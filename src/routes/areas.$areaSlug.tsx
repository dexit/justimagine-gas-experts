import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { SERVICES, AREAS, REVIEWS, getArea, BUSINESS } from "@/data/seo";
import { breadcrumbJsonLd, localServiceJsonLd, gasEngineerJsonLd, jsonLdScript, geoMetaTags, areaPlaceJsonLd } from "@/lib/seo";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Certifications } from "@/components/Certifications";
import { RelatedContent } from "@/components/RelatedContent";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, MapPin, Star, ArrowRight } from "lucide-react";

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
        { property: "og:image", content: `${BUSINESS.url}/og-default.jpg` },
        ...geoMetaTags(a.name),
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
        jsonLdScript(areaPlaceJsonLd(a.slug)),
        jsonLdScript(
          localServiceJsonLd({
            serviceName: "Boiler Installation, Gas & Heating Services",
            serviceDescription: desc,
            areaName: a.name,
            areaPostcodes: a.postcodes,
            county: a.county,
          }),
        ),
        jsonLdScript(gasEngineerJsonLd()),
      ],
    };
  },
  component: AreaPage,
  notFoundComponent: () => <div className="p-10">Area not found.</div>,
});

function AreaPage() {
  const { areaSlug } = Route.useParams();
  const a = getArea(areaSlug)!;
  const areaReviews = REVIEWS.filter((r) => r.area === a.name).slice(0, 2);
  const allAreas = AREAS;

  return (
    <PageShell>
      <PageHero
        eyebrow={a.county}
        title={`Heating, Gas & Plumbing in ${a.name}`}
        subtitle={a.blurb}
        crumbs={[{ name: "Areas", to: "/areas" }, { name: a.name }]}
      />

      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-16 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-8">
          {/* Map */}
          <div className="rounded-2xl overflow-hidden border border-border">
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d76235.67206456206!2d-1.5102!3d52.37!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48770558a5f36e59%3A0x9a8d5f0f6edfb4f5!2s${encodeURIComponent(a.name)}%2C%20Warwickshire!5e0!3m2!1sen!2suk!4v1620000000000`}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
            />
          </div>

          {/* Postcodes */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-accent" /> Postcodes covered:{" "}
            <span className="font-mono text-foreground">{a.postcodes.join(", ")}</span>
          </div>

          {/* Intro para */}
          <p className="text-lg leading-relaxed">
            From a 7am boiler emergency in {a.name} to a planned new combi installation — we're the
            local Gas Safe team {a.name} homeowners and landlords keep coming back to. Honest
            pricing, certified engineers, and zero pressure.
          </p>

          {/* Referral note */}
          {a.referralNote && (
            <div className="p-5 rounded-xl bg-secondary/60 border border-border text-sm text-muted-foreground leading-relaxed">
              <span className="font-semibold text-foreground">Local knowledge: </span>
              {a.referralNote}
            </div>
          )}

          {/* Services grid */}
          <div>
            <h2 className="font-display text-2xl font-semibold mb-5">
              Services we cover in {a.name}
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {SERVICES.map((s) => (
                <Link
                  key={s.slug}
                  to="/services/$serviceSlug/$areaSlug"
                  params={{ serviceSlug: s.slug, areaSlug: a.slug }}
                  className="p-5 rounded-xl bg-card border border-border hover:border-accent/50 hover:shadow-sm transition-smooth"
                >
                  <div className="font-semibold text-sm">
                    {s.name} in {a.name}
                  </div>
                  {s.priceFrom && (
                    <div className="text-xs text-accent font-medium mt-0.5">
                      From {s.priceFrom}
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground mt-1 line-clamp-2">{s.short}</div>
                </Link>
              ))}
            </div>
          </div>

          {/* Reviews from this area */}
          {areaReviews.length > 0 && (
            <div>
              <h3 className="font-display text-xl font-semibold mb-4">
                What {a.name} customers say
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {areaReviews.map((r, i) => (
                  <div key={i} className="p-5 rounded-xl bg-card border border-border">
                    <div className="flex gap-1 text-accent mb-2">
                      {[...Array(r.rating)].map((_, j) => (
                        <Star key={j} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      "{r.text}"
                    </p>
                    <div className="text-sm font-semibold">{r.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(r.date).toLocaleDateString("en-GB", {
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/reviews"
                className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-smooth"
              >
                Read all reviews <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          )}

        </div>

        {/* Sidebar */}
        <aside className="space-y-4">
          <div className="p-6 bg-gradient-hero text-primary-foreground rounded-2xl">
            <h3 className="font-display text-xl mb-4">Local engineers, on call</h3>
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
                href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hi — I need a quote for work in ${a.name} (${a.postcodes[0]}).`)}`}
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

      <section className="bg-secondary/30 border-t border-border py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Certifications />
        </div>
      </section>

      <RelatedContent type="areas" currentArea={a.slug} title="Nearby areas we also cover" limit={6} />
    </PageShell>
  );
}
