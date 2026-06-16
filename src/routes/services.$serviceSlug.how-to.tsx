import { createFileRoute } from "@tanstack/react-router";
import { SERVICES } from "@/data/seo";
import { PageShell, PageHero } from "@/components/PageShell";
import { getServiceBySlug } from "@/lib/services";
import { howtojsonLd, jsonLdScript } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { notFound } from "@/lib/not-found";

export const Route = createFileRoute("/services/$serviceSlug/how-to")({
  component: HowToPage,
  meta: () => [{ httpEquiv: "refresh", content: "0; url=/services/$serviceSlug" }],
});

function HowToPage() {
  const { serviceSlug } = Route.useParams();
  const service = getServiceBySlug(serviceSlug);

  if (!service || !service.howTo) {
    notFound();
  }

  const schemaData = howtojsonLd({
    name: `How to: ${service.name}`,
    description: `Step-by-step guide to our ${service.name} process.`,
    image: `https://justimagine.ltd/og-${service.slug}.png`,
    steps: service.howTo.map((step) => ({
      position: String(step.step),
      name: step.title,
      description: step.desc,
    })),
  });

  return (
    <PageShell>
      {jsonLdScript(schemaData)}
      <PageHero
        eyebrow="How It Works"
        title={`${service.name} — Step by Step`}
        subtitle="Our proven process for delivering reliable service, every time."
        crumbs={[
          { name: "Services", to: "/services" },
          { name: service.name, to: `/services/${service.slug}` },
          { name: "How It Works" },
        ]}
      />

      <section className="mx-auto max-w-4xl px-5 lg:px-8 py-16 space-y-12">
        <div className="grid gap-8">
          {service.howTo.map((step) => (
            <div
              key={step.step}
              className="grid sm:grid-cols-[80px_1fr] gap-6 pb-8 border-b border-border last:border-b-0"
            >
              <div className="flex items-start">
                <div className="relative">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center">
                    <span className="text-2xl font-bold text-accent-foreground">
                      {step.step}
                    </span>
                  </div>
                  {step.step < service.howTo.length && (
                    <div className="absolute top-16 left-1/2 -translate-x-1/2 w-1 h-8 bg-border" />
                  )}
                </div>
              </div>
              <div className="space-y-2 pt-2">
                <h3 className="text-xl font-semibold font-display">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-12 border-t border-border space-y-6">
          <h2 className="text-2xl font-display font-semibold">Ready to get started?</h2>
          <p className="text-muted-foreground max-w-2xl">
            Our Gas Safe registered engineers handle every step of the process with care and professionalism. Get in touch for a free quote or same-day emergency response.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <a href="/contact">Book a visit</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href={`tel:07774079152`}>Call 07774 079152</a>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
