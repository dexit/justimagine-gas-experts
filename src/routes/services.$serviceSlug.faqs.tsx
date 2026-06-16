import { createFileRoute } from "@tanstack/react-router";
import { SERVICES } from "@/data/seo";
import { PageShell, PageHero } from "@/components/PageShell";
import { getServiceBySlug } from "@/lib/services";
import { faqJsonLd, jsonLdScript } from "@/lib/seo";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { notFound } from "@/lib/not-found";

export const Route = createFileRoute("/services/$serviceSlug/faqs")({
  component: FAQsPage,
});

function FAQsPage() {
  const { serviceSlug } = Route.useParams();
  const service = getServiceBySlug(serviceSlug);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!service || !service.faqs) {
    notFound();
  }

  const schemaData = faqJsonLd(
    service.faqs.map((faq) => ({
      question: faq.q,
      answer: faq.a,
    }))
  );

  return (
    <PageShell>
      {jsonLdScript(schemaData)}
      <PageHero
        eyebrow="FAQ"
        title={`${service.name} FAQs`}
        subtitle="Answers to common questions about our services."
        crumbs={[
          { name: "Services", to: "/services" },
          { name: service.name, to: `/services/${service.slug}` },
          { name: "FAQs" },
        ]}
      />

      <section className="mx-auto max-w-3xl px-5 lg:px-8 py-16 space-y-4">
        <div className="space-y-2 mb-8">
          <p className="text-muted-foreground leading-relaxed">
            Have a question about {service.name.toLowerCase()}? Check our FAQs below or call us on 07774 079152 for personalised advice.
          </p>
        </div>

        <div className="space-y-3">
          {service.faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-border rounded-lg overflow-hidden transition-all hover:border-accent/50"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-start justify-between gap-4 text-left hover:bg-secondary/30 transition-colors"
              >
                <h3 className="font-semibold text-foreground pr-2">{faq.q}</h3>
                <ChevronDown
                  className={`h-5 w-5 text-muted-foreground flex-shrink-0 transition-transform mt-0.5 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-secondary/20 border-t border-border">
                  <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border space-y-4">
          <h2 className="text-xl font-display font-semibold">Didn't find your answer?</h2>
          <p className="text-muted-foreground">
            Call us on <a href="tel:07774079152" className="underline hover:no-underline font-semibold">07774 079152</a> or <a href="/contact" className="underline hover:no-underline font-semibold">fill out our contact form</a> — we're happy to discuss your specific needs.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
