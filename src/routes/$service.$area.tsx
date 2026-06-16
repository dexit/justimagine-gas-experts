import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { SERVICES, getService, AREAS, getArea, BUSINESS } from "@/data/seo";
import { breadcrumbJsonLd, faqJsonLd, jsonLdScript, serviceJsonLd } from "@/lib/seo";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Certifications } from "@/components/Certifications";
import { RelatedContent } from "@/components/RelatedContent";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Phone, Check, MessageCircle, MapPin, ChevronRight } from "lucide-react";
import heroImg from "@/assets/hero-engineer.webp";
import heroImgSm from "@/assets/hero-engineer-sm.webp";
import heroImgMd from "@/assets/hero-engineer-md.webp";
import {
  WhyItMatters,
  HowItWorks,
  BrandStrip,
  WhoWeWorkWith,
} from "@/components/ServiceSections";

export const Route = createFileRoute("/$service/$area")({
  beforeLoad: ({ params }) => {
    const svc = getService(params.service);
    const a = getArea(params.area);
    if (!svc || !a) throw notFound();
  },
  head: ({ params }) => {
    const svc = getService(params.service);
    const a = getArea(params.area);
    if (!svc || !a) return {};
    
    const title = `${svc.name} in ${a.name} | Just Imagine Gas`;
    const desc = `Professional ${svc.name.toLowerCase()} services in ${a.name}. Gas Safe registered, 24/7 emergency available. Call ${BUSINESS.phone}`;
    const url = `${BUSINESS.url}/${params.service}/${params.area}`;
    
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { name: "keywords", content: `${svc.name}, ${a.name}, ${svc.name.toLowerCase()} ${a.name.toLowerCase()}, gas safe engineer` },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { name: "geo.region", content: "GB-WAR" },
        { name: "geo.placename", content: a.name },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        jsonLdScript(serviceJsonLd(svc.name, desc, a.name, svc.priceFrom)),
        jsonLdScript(
          breadcrumbJsonLd([
            { name: "Home", url: BUSINESS.url },
            { name: svc.name, url: `${BUSINESS.url}/${params.service}` },
            { name: `in ${a.name}`, url },
          ]),
        ),
      ],
    };
  },
  component: ServiceAreaPage,
  notFoundComponent: () => <div className="p-10">Service or area not found.</div>,
});

function ServiceAreaPage() {
  const { service, area } = Route.useParams();
  const svc = getService(service)!;
  const a = getArea(area)!;

  return (
    <PageShell>
      {/* ── Hero with service + area context ─────────────────────────────── */}
      <section className="bg-gradient-hero text-primary-foreground overflow-hidden">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-14 md:py-20 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <div className="mb-6">
              <Breadcrumbs items={[{ name: svc.name }, { name: `in ${a.name}` }]} />
            </div>
            <p className="text-xs uppercase tracking-[0.25em] text-accent font-medium mb-4">
              {svc.category} • {a.name}
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-semibold leading-[1.05] mb-6">
              {svc.name} in {a.name}
            </h1>
            <p className="text-lg text-primary-foreground/80 leading-relaxed mb-8 max-w-lg">
              {svc.short} Serving {a.name} and surrounding areas with Gas Safe certified expertise.
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
                href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(`Hi — I need ${svc.name} in ${a.name}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-primary-foreground/30 text-primary-foreground font-semibold px-5 py-3 rounded-lg hover:bg-primary-foreground/10 transition-smooth"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>
          <picture className="hidden lg:block">
            <source media="(max-width: 640px)" srcSet={heroImgSm.src} />
            <source media="(max-width: 1024px)" srcSet={heroImgMd.src} />
            <img src={heroImg.src} alt={svc.name} className="w-full rounded-lg" />
          </picture>
        </div>
      </section>

      {/* ── Service description + area context ─────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="font-display text-3xl font-semibold mb-6">{svc.name} in {a.name}</h2>
            <div className="prose prose-sm max-w-none text-muted-foreground space-y-4">
              {svc.sections?.description && (
                <p className="leading-relaxed">{svc.sections.description}</p>
              )}
              <p>
                We provide {svc.name.toLowerCase()} services throughout {a.name}, including {a.description}. Our Gas Safe registered engineers are available 24/7 for emergencies.
              </p>
            </div>

            {/* Inclusions */}
            {svc.sections?.inclusions && (
              <div className="mt-12">
                <h3 className="font-display text-xl font-semibold mb-6">What&apos;s included</h3>
                <div className="grid gap-3">
                  {svc.sections.inclusions.map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <Check className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* How it works */}
            {svc.sections?.howItWorks && (
              <div className="mt-12">
                <h3 className="font-display text-xl font-semibold mb-6">How it works</h3>
                <HowItWorks steps={svc.sections.howItWorks} />
              </div>
            )}

            {/* FAQs */}
            {svc.faqs.length > 0 && (
              <div className="mt-12">
                <h3 className="font-display text-xl font-semibold mb-6">Common questions</h3>
                <div className="space-y-4">
                  {svc.faqs.map((faq, i) => (
                    <details key={i} className="group border border-border rounded-lg p-4 cursor-pointer">
                      <summary className="font-semibold flex justify-between items-center">
                        {faq.q}
                        <ChevronRight className="h-4 w-4 group-open:rotate-90 transition-transform" />
                      </summary>
                      <p className="mt-3 text-muted-foreground text-sm">{faq.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* ── Sidebar: Form + area info ────────────────────────────────── */}
          <div className="space-y-6">
            {/* Quick booking CTA */}
            <div className="bg-accent/5 border border-accent/10 rounded-xl p-6">
              <h3 className="font-semibold mb-4">Get a quote in {a.name}</h3>
              <EnquiryForm defaultService={svc.name} defaultArea={a.name} compact />
            </div>

            {/* Area coverage */}
            <div className="bg-secondary/40 rounded-xl p-6">
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Coverage
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{a.description}</p>
              <p className="text-xs text-muted-foreground mt-3">
                Emergency? We&apos;re available 24/7. <strong>Call {BUSINESS.phone}</strong>
              </p>
            </div>

            {/* Certifications */}
            <Certifications />
          </div>
        </div>
      </section>

      {/* ── Info sections ────────────────────────────────────────────────── */}
      {svc.sections?.whyItMatters && <WhyItMatters title="Why it matters" content={svc.sections.whyItMatters} />}
      
      <BrandStrip />
      
      {/* ── Related services in this area ──────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-16">
        <h2 className="font-display text-3xl font-semibold mb-8">Other services in {a.name}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.filter(s => s.slug !== svc.slug)
            .slice(0, 3)
            .map(s => (
              <Link
                key={s.slug}
                to="/$service/$area"
                params={{ service: s.slug, area }}
                className="group border border-border rounded-lg p-6 hover:shadow-lg hover:border-primary transition-all"
              >
                <h3 className="font-semibold mb-2 group-hover:text-accent transition-colors">{s.name}</h3>
                <p className="text-sm text-muted-foreground">{s.short}</p>
              </Link>
            ))}
        </div>
      </section>

      <RelatedContent type="reviews" limit={3} />
    </PageShell>
  );
}
