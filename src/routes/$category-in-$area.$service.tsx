// Dynamic service page for /${category}-in-${area}/${service}
// Renders full service landing with FAQs, pricing, reviews, CTAs, LD-JSON schema

import { useParams } from "@tanstack/react-router";
import { SERVICES, type ServiceSlug } from "@/data/seo";
import { AREAS, type AreaSlug } from "@/data/areas";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { ChevronDown, MapPin, Clock, BadgeCheck, ArrowRight } from "lucide-react";
import { useState } from "react";
import { EnquiryForm } from "@/components/EnquiryForm";
import { ServiceSchema, LocalBusinessSchema, FAQSchema, BreadcrumbSchema } from "@/lib/schemas";

export function ServicePageComponent() {
  const { service, category, area } = useParams({ from: "/$category-in-$area/$service" });
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const svc = SERVICES.find((s) => s.slug === (service as ServiceSlug));
  const areaData = AREAS.find((a) => a.slug === (area as AreaSlug));

  if (!svc || !areaData) {
    return (
      <PageShell>
        <div className="mx-auto max-w-3xl px-4 py-16 text-center">
          <h1 className="text-3xl font-semibold mb-2">Service not found</h1>
          <p className="text-muted-foreground mb-6">This service is not available in your area.</p>
          <Button asChild><a href="/services">Back to services</a></Button>
        </div>
      </PageShell>
    );
  }

  const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: areaData.name, url: `/areas/${area}` },
    { name: svc.name, url: `/${category}-in-${area}/${service}` },
  ];

  return (
    <PageShell>
      {/* LD-JSON Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BreadcrumbSchema(breadcrumbs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ServiceSchema(svc, areaData)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(LocalBusinessSchema(areaData)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(FAQSchema(svc.faqs)),
        }}
      />

      {/* Breadcrumb Navigation */}
      <nav className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8 py-4 sm:py-6 text-sm">
        <ol className="flex flex-wrap items-center gap-2">
          {breadcrumbs.map((crumb, idx) => (
            <li key={idx} className="flex items-center gap-2">
              {idx > 0 && <span className="text-muted-foreground">/</span>}
              <a
                href={crumb.url}
                className={idx === breadcrumbs.length - 1 ? "text-foreground font-semibold" : "text-accent hover:underline"}
              >
                {crumb.name}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-hero text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight text-balance mb-4 sm:mb-6">
              {svc.h1(areaData.name)}
            </h1>
            <p className="text-lg sm:text-xl text-primary-foreground/85 leading-relaxed max-w-2xl mb-6 sm:mb-8">
              {svc.intro(areaData.name)}
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-4 sm:gap-6 mb-8">
              {svc.priceFrom && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-primary-foreground/70">From</span>
                  <span className="font-display text-2xl sm:text-3xl font-bold">{svc.priceFrom}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span className="text-sm">Same-day or next-day booking</span>
              </div>
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-5 w-5" />
                <span className="text-sm">Gas Safe certified</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Button size="lg" asChild>
                <a href="#enquiry" className="gap-2">
                  Get a free quote
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:07774079152">Call 07774 079152</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8 py-12 sm:py-16 lg:py-20">
        <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-6 sm:mb-10">What's included</h2>
        <ul className="grid sm:grid-cols-2 gap-3 sm:gap-4 max-w-2xl">
          {svc.bullets.map((bullet, idx) => (
            <li key={idx} className="flex gap-3">
              <BadgeCheck className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              <span className="text-sm sm:text-base leading-relaxed">{bullet}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQs */}
      <section className="bg-secondary/40 border-y border-border py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-5 lg:px-8">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-6 sm:mb-10">Frequently asked questions</h2>
          <div className="space-y-3 sm:space-y-4">
            {svc.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="border border-border rounded-lg overflow-hidden bg-background"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full p-4 sm:p-5 flex gap-3 items-start hover:bg-accent/5 transition-smooth text-left"
                >
                  <span className="font-semibold flex-1">{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform ${
                      expandedFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {expandedFaq === idx && (
                  <div className="border-t border-border px-4 sm:px-5 py-4 sm:py-5 bg-muted/30 text-sm sm:text-base leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section id="enquiry" className="mx-auto max-w-3xl px-4 sm:px-5 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="mb-8">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-2">Get a free quote</h2>
          <p className="text-muted-foreground">No hidden fees, no obligation. We'll call you within 30 minutes during working hours.</p>
        </div>
        <EnquiryForm defaultService={svc.name} defaultArea={areaData.name} />
      </section>

      {/* Service Area Coverage */}
      <section className="bg-muted/40 border-y border-border py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold mb-4 flex items-center gap-2">
            <MapPin className="h-6 w-6 text-accent" />
            We cover {areaData.name}
          </h2>
          <p className="text-muted-foreground max-w-2xl mb-4 sm:mb-6">
            {areaData.coverageDesc}
          </p>
          <div className="flex flex-wrap gap-2">
            {areaData.postcodes?.map((pc) => (
              <span key={pc} className="px-3 py-1 bg-background border border-border rounded-full text-sm">
                {pc}
              </span>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
