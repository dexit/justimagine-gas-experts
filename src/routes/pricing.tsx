import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { PRICING, BUSINESS } from "@/data/seo";
import { Check, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { geoMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Boiler & Gas Pricing Rugby, Warwickshire | Just Imagine" },
      {
        name: "description",
        content:
          "Transparent fixed prices: boiler servicing from £75, CP12 landlord certificates from £60, new boiler installation from £1,895. No hidden fees. Free quotes for Rugby & Warwickshire.",
      },
      ...geoMetaTags(),
      { property: "og:title", content: "Boiler & Gas Pricing Rugby, Warwickshire | Just Imagine" },
      {
        property: "og:description",
        content:
          "Fixed-price boiler services in Rugby. Servicing from £75, CP12 from £60, new boiler from £1,895. Landlord bundle deals available.",
      },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Pricing"
        title="Fair, fixed, and transparent."
        subtitle="No hidden fees. We provide clear, written quotes for all work before we start."
      />
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PRICING.map((p) => (
            <div
              key={p.name}
              className={`relative p-8 rounded-3xl border flex flex-col ${p.popular ? "bg-card border-accent shadow-elegant" : "bg-card border-border"}`}
            >
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <h3 className="font-display text-xl font-semibold mb-1">{p.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-bold">{p.price}</span>
                <span className="text-xs text-muted-foreground">{p.unit}</span>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-accent flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className={p.popular ? "bg-gradient-amber text-accent-foreground" : ""}
                variant={p.popular ? "default" : "outline"}
              >
                <a href={`tel:${BUSINESS.phoneE164}`}>Book now</a>
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-hero text-primary-foreground p-10 lg:p-16 rounded-3xl text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
            Need a custom quote?
          </h2>
          <p className="text-primary-foreground/70 max-w-xl mx-auto mb-8">
            For full heating systems, multiple properties, or complex plumbing work, we offer free
            site visits and detailed written estimates.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-amber text-accent-foreground hover:opacity-90 font-semibold shadow-amber"
          >
            <a href="tel:07774079152">
              <Phone className="h-4 w-4 mr-2" />
              Call 07774 079152
            </a>
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
