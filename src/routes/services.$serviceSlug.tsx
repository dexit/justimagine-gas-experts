import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { SERVICES, getService, AREAS, BUSINESS } from "@/data/seo";
import { getServiceContent } from "@/data/services-content";
import { breadcrumbJsonLd, faqJsonLd, jsonLdScript, serviceJsonLd, plumbingServiceJsonLd } from "@/lib/seo";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Certifications } from "@/components/Certifications";
import { RelatedContent } from "@/components/RelatedContent";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Phone, Check, MessageCircle, MapPin, AlertTriangle, ChevronRight } from "lucide-react";
import heroImg from "@/assets/hero-engineer.webp";
import heroImgSm from "@/assets/hero-engineer-sm.webp";
import heroImgMd from "@/assets/hero-engineer-md.webp";

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
        { property: "og:image", content: `${BUSINESS.url}/og-default.jpg` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "geo.region", content: "GB-WAR" },
        { name: "geo.placename", content: "Warwickshire" },
        { name: "geo.position", content: `${BUSINESS.geo.lat};${BUSINESS.geo.lng}` },
        { name: "ICBM", content: `${BUSINESS.geo.lat}, ${BUSINESS.geo.lng}` },
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
        ...(s.slug === "plumbing" ? [jsonLdScript(plumbingServiceJsonLd(s.name, s.metaDesc(), s.priceFrom))] : []),
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
  const rich = getServiceContent(serviceSlug);

  return (
    <PageShell>
      {/* ── Split hero ─────────────────────────────────────────────────── */}
      <section className="bg-gradient-hero text-primary-foreground overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-14 md:py-20 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <div className="mb-6">
              <Breadcrumbs
                items={[{ name: "Services", to: "/services" }, { name: s.name }]}
              />
            </div>
            <p className="text-xs uppercase tracking-[0.25em] text-accent font-medium mb-4">
              {s.category}
            </p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-5xl font-semibold leading-[1.05] mb-6">
              {s.h1()}
            </h1>
            <p className="text-lg text-primary-foreground/80 leading-relaxed mb-8 max-w-lg">
              {s.short}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`tel:${BUSINESS.phoneE164}`}
                className="inline-flex items-center gap-2 bg-gradient-amber text-accent-foreground font-semibold px-5 py-3 rounded-lg hover:opacity-90 transition-smooth"
              >
                <Phone className="h-4 w-4" />
                {BUSINESS.phone}
              </a>
              <a
                href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hi — I need help with ${s.name}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-primary-foreground/30 text-primary-foreground font-semibold px-5 py-3 rounded-lg hover:bg-primary-foreground/10 transition-smooth"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp us
              </a>
            </div>
            {rich?.stat && (
              <div className="mt-8 inline-flex items-baseline gap-2 border-l-2 border-accent pl-4">
                <span className="font-display text-3xl font-bold text-accent">{rich.stat.value}</span>
                <span className="text-sm text-primary-foreground/60">{rich.stat.label}</span>
              </div>
            )}
          </div>
          <div className="relative hidden lg:block">
            <picture>
              <source srcSet={`${heroImgSm} 640w, ${heroImgMd} 1024w, ${heroImg} 1600w`} type="image/webp" sizes="(max-width: 1024px) 50vw, 640px" />
              <img
                src={heroImg}
                alt={`Gas Safe engineer — ${s.name} in Rugby`}
                className="rounded-2xl object-cover w-full aspect-[4/3] shadow-elegant"
                loading="eager"
                decoding="async"
              />
            </picture>
            <div className="absolute -bottom-4 -left-4 bg-card text-card-foreground rounded-xl px-4 py-3 shadow-elegant border border-border">
              <div className="text-xs uppercase tracking-wider text-muted-foreground mb-0.5">Gas Safe Registered</div>
              <div className="font-semibold text-sm">Just Imagine Ltd · Rugby</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main body ─────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-16 grid lg:grid-cols-3 gap-10 lg:gap-14">

        {/* LEFT: main content */}
        <div className="lg:col-span-2 space-y-14">

          {/* Problem + intro */}
          {rich && (
            <div>
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-accent/8 border border-accent/20 mb-6">
                <AlertTriangle className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <p className="text-base font-medium leading-relaxed">{rich.problem}</p>
              </div>
              <p className="text-lg leading-relaxed text-foreground/80">{rich.bodyParagraph}</p>
            </div>
          )}
          {!rich && (
            <p className="text-lg leading-relaxed text-foreground/90">{s.intro()}</p>
          )}

          {/* Signs you need this service */}
          {rich && rich.signs.length > 0 && (
            <div>
              <h2 className="font-display text-2xl font-semibold mb-1">Signs you need this service</h2>
              <p className="text-muted-foreground text-sm mb-6">If any of these sound familiar, give us a call — most questions answered in five minutes.</p>
              <div className="grid sm:grid-cols-2 gap-3">
                {rich.signs.map((sign) => (
                  <div key={sign.title} className="flex gap-3 p-4 rounded-xl bg-card border border-border hover:border-accent/40 transition-smooth">
                    <ChevronRight className="h-4 w-4 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <div className="font-semibold text-sm">{sign.title}</div>
                      <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{sign.body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* How we do it */}
          {rich && rich.steps.length > 0 && (
            <div>
              <h2 className="font-display text-2xl font-semibold mb-1">How we do it</h2>
              <p className="text-muted-foreground text-sm mb-7">No surprises, no jargon. Here's what happens when you book.</p>
              <div className="relative">
                {/* Vertical connector line */}
                <div className="absolute left-5 top-10 bottom-10 w-px bg-border hidden sm:block" />
                <div className="space-y-5">
                  {rich.steps.map((step, i) => (
                    <div key={step.title} className="flex gap-5 items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-amber text-accent-foreground font-display font-bold text-base flex items-center justify-center shadow-amber z-10">
                        {i + 1}
                      </div>
                      <div className="flex-1 p-5 rounded-xl bg-card border border-border">
                        <div className="font-semibold mb-1">{step.title}</div>
                        <div className="text-sm text-muted-foreground leading-relaxed">{step.body}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* What's included */}
          <div>
            <h2 className="font-display text-2xl font-semibold mb-1">What's included</h2>
            <p className="text-muted-foreground text-sm mb-6">Everything below is included as standard — nothing hidden in the small print.</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {s.bullets.map((b) => (
                <div key={b} className="flex gap-3 p-4 rounded-xl bg-card border border-border">
                  <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-sm leading-relaxed">{b}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing */}
          {s.priceFrom && (
            <div className="rounded-2xl overflow-hidden border border-border">
              <div className="bg-gradient-hero text-primary-foreground p-6 flex items-end justify-between gap-4 flex-wrap">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-accent mb-1">Starting from</div>
                  <div className="font-display text-5xl font-bold">{s.priceFrom}</div>
                  {s.priceUnit && (
                    <div className="text-sm text-primary-foreground/60 mt-1">{s.priceUnit}</div>
                  )}
                </div>
                <a
                  href={`tel:${BUSINESS.phoneE164}`}
                  className="inline-flex items-center gap-2 bg-gradient-amber text-accent-foreground font-semibold px-5 py-3 rounded-lg hover:opacity-90 transition-smooth"
                >
                  <Phone className="h-4 w-4" />
                  Get a quote
                </a>
              </div>
              <div className="bg-card p-5 text-sm text-muted-foreground leading-relaxed">
                Fixed written quote provided before any work starts. That's the price you pay — no call-out charges added after, no surprise extras on the invoice.
              </div>
            </div>
          )}

          {/* FAQs */}
          {s.faqs.length > 0 && (
            <div>
              <h2 className="font-display text-2xl font-semibold mb-1">Frequently asked questions</h2>
              <p className="text-muted-foreground text-sm mb-6">Straight answers — no runaround.</p>
              <div className="space-y-3">
                {s.faqs.map((f) => (
                  <details key={f.q} className="group p-5 bg-card border border-border rounded-xl open:shadow-sm">
                    <summary className="cursor-pointer font-semibold text-base list-none flex justify-between items-start gap-4">
                      <span>{f.q}</span>
                      <span className="text-accent text-xl leading-none transition-transform group-open:rotate-45 motion-reduce:transition-none flex-shrink-0">+</span>
                    </summary>
                    <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* Coverage areas */}
          <div>
            <h2 className="font-display text-2xl font-semibold mb-1">Coverage areas</h2>
            <p className="text-muted-foreground text-sm mb-5">
              Based in Rugby — covering all of Warwickshire and surrounding areas.
              Same Gas Safe team, same pricing, wherever you are.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {AREAS.map((a) => (
                <Link
                  key={a.slug}
                  to="/services/$serviceSlug/$areaSlug"
                  params={{ serviceSlug: s.slug, areaSlug: a.slug }}
                  className="flex items-center gap-2 p-3 rounded-lg bg-card border border-border hover:border-accent/50 hover:shadow-sm transition-smooth text-sm"
                >
                  <MapPin className="h-3.5 w-3.5 text-accent flex-shrink-0" />
                  <div>
                    <div className="font-medium">{a.name}</div>
                    <div className="text-xs text-muted-foreground">{a.postcodes.join(", ")}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: sidebar */}
        <aside className="space-y-5">
          {/* Sticky wrapper */}
          <div className="lg:sticky lg:top-24 space-y-5">
            {/* Call CTA */}
            <div className="p-6 bg-gradient-hero text-primary-foreground rounded-2xl">
              <h3 className="font-display text-xl font-semibold mb-1">Get a quote in minutes</h3>
              <p className="text-sm text-primary-foreground/70 mb-5 leading-relaxed">
                Phone is fastest — most jobs quoted in 5 minutes. No obligation, no pressure.
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
                  href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hi — I need a quote for ${s.name}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp
                </a>
              </Button>
            </div>

            {/* Enquiry form */}
            <EnquiryForm defaultService={s.name} />

            {/* Trust badges */}
            <div className="p-5 bg-card border border-border rounded-2xl space-y-3">
              <div className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Why Just Imagine</div>
              {[
                "Gas Safe registered — verifiable online",
                "Fixed price before any work begins",
                "12-month workmanship guarantee",
                "We answer our own phone",
              ].map((t) => (
                <div key={t} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-accent flex-shrink-0" />
                  {t}
                </div>
              ))}
            </div>

            {/* Quick links */}
            <div className="p-5 bg-card border border-border rounded-2xl">
              <div className="text-xs uppercase tracking-wider text-muted-foreground font-medium mb-3">Useful links</div>
              <ul className="space-y-2 text-sm">
                {[
                  { to: "/faq", label: "Browse FAQs" },
                  { to: "/pricing", label: "View pricing guide" },
                  { to: "/reviews", label: "Read customer reviews" },
                  { to: "/safety", label: "Gas safety advice" },
                  { to: "/contact", label: "Send us a message" },
                ].map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="hover:text-accent transition-smooth flex items-center gap-1.5">
                      <ChevronRight className="h-3.5 w-3.5 text-accent/60 flex-shrink-0" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </section>

      {/* ── Certifications ────────────────────────────────────────────── */}
      <section className="bg-secondary/30 border-t border-border py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Certifications />
        </div>
      </section>

      <RelatedContent type="services" currentService={s.slug} title="Other services we offer" limit={6} />
      <RelatedContent type="areas" limit={6} title={`Find ${s.name.toLowerCase()} in your area`} />
    </PageShell>
  );
}
