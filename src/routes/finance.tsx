import { createFileRoute } from "@tanstack/react-router";
import { Phone, CheckCircle, CreditCard, Calculator, MessageCircle, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell, PageHero } from "@/components/PageShell";
import { BUSINESS } from "@/data/seo";
import { breadcrumbJsonLd, jsonLdScript, geoMetaTags, serviceJsonLd, faqJsonLd } from "@/lib/seo";

const url = `${BUSINESS.url}/finance`;

export const Route = createFileRoute("/finance")({
  head: () => ({
    meta: [
      { title: "Boiler Finance | 0% Interest Available | Just Imagine" },
      {
        name: "description",
        content:
          "Spread the cost of a new boiler with flexible finance. 0% interest available on selected models. Fixed monthly payments, quick decision. Gas Safe installation.",
      },
      { property: "og:title", content: "Boiler Finance — 0% Interest Available" },
      {
        property: "og:description",
        content:
          "Flexible boiler finance from Just Imagine. 0% interest on selected models. Spread cost over 12–120 months.",
      },
      { property: "og:url", content: url },
      { property: "og:image", content: `${BUSINESS.url}/og-default.jpg` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Boiler Finance | 0% Interest | Just Imagine" },
      { name: "twitter:description", content: "Spread the cost of a new boiler. 0% interest available. Fixed monthly payments from ~£35/month." },
      { name: "twitter:image", content: `${BUSINESS.url}/og-default.jpg` },
      ...geoMetaTags(),
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      jsonLdScript({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Boiler Finance Options",
        description: "Flexible boiler finance including 0% interest. Spread the cost over 12-120 months.",
        url,
        isPartOf: { "@id": `${BUSINESS.url}/#website` },
        about: { "@id": `${BUSINESS.url}/#business` },
      }),
      jsonLdScript(
        breadcrumbJsonLd([
          { name: "Home", url: BUSINESS.url },
          { name: "Finance Options", url },
        ]),
      ),
      jsonLdScript(
        serviceJsonLd(
          "Boiler Finance",
          "Flexible boiler finance options including 0% interest. Spread the cost of a new boiler over 12–120 months with fixed monthly payments.",
          undefined,
          "2500",
        ),
      ),
      jsonLdScript(
        faqJsonLd([
          { q: "Who provides the finance?", a: "Finance is provided through FCA-authorised lenders. Just Imagine Ltd acts as a credit intermediary, not a lender." },
          { q: "Will I be credit checked?", a: "Yes — a credit check is part of the application process. We can do an initial soft check first." },
          { q: "Can I pay off early?", a: "Yes — there are no early repayment penalties on any of our finance options." },
          { q: "What can I finance?", a: "Boiler installations, full heating system upgrades, and some larger plumbing projects. Minimum typically £1,000." },
        ]),
      ),
    ],
  }),
  component: FinancePage,
});

const financeOptions = [
  {
    title: "0% Interest",
    term: "12 months",
    example: "New combi boiler from ~£210/month",
    highlight: true,
    features: [
      "No interest charged at all",
      "Fixed monthly payments",
      "Spread cost over 12 months",
      "Subject to status and availability",
    ],
  },
  {
    title: "Low Rate Finance",
    term: "24–60 months",
    example: "New combi boiler from ~£55/month",
    highlight: false,
    features: [
      "Competitive fixed APR",
      "Affordable monthly payments",
      "Terms up to 5 years",
      "Quick online decision",
    ],
  },
  {
    title: "Extended Finance",
    term: "Up to 120 months",
    example: "New heating system from ~£35/month",
    highlight: false,
    features: [
      "Lowest monthly payments",
      "Ideal for full system installs",
      "Fixed rate throughout",
      "No early repayment penalties",
    ],
  },
];

function FinancePage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Finance Options"
        title="A new boiler doesn't have to break the bank."
        subtitle="Spread the cost with flexible finance — including 0% interest on selected models. Quick decision, fixed payments, no surprises."
        crumbs={[{ name: "Finance Options" }]}
      />

      {/* Finance cards */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {financeOptions.map((opt) => (
            <div
              key={opt.title}
              className={`relative rounded-2xl border p-8 flex flex-col ${
                opt.highlight
                  ? "border-accent bg-gradient-hero text-primary-foreground shadow-elegant"
                  : "border-border bg-card"
              }`}
            >
              {opt.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-amber text-accent-foreground text-xs font-semibold px-4 py-1 rounded-full shadow-amber whitespace-nowrap">
                  Most Popular
                </div>
              )}
              <Percent
                className={`h-8 w-8 mb-4 text-accent`}
                strokeWidth={1.5}
              />
              <h3 className="font-display text-xl font-semibold mb-1">{opt.title}</h3>
              <div className="mb-1">
                <span className="text-2xl font-bold">{opt.term}</span>
              </div>
              <div
                className={`text-xs mb-6 ${opt.highlight ? "text-primary-foreground/60" : "text-muted-foreground"}`}
              >
                {opt.example}
              </div>
              <ul className="space-y-2.5 flex-1 mb-8">
                {opt.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-sm">
                    <CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                    <span className={opt.highlight ? "text-primary-foreground/80" : "text-foreground/80"}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className={
                  opt.highlight
                    ? "w-full bg-gradient-amber text-accent-foreground hover:opacity-90 font-semibold"
                    : "w-full"
                }
                variant={opt.highlight ? "default" : "outline"}
              >
                <a href={`tel:${BUSINESS.phoneE164}`}>
                  <Phone className="h-4 w-4 mr-2" />
                  Ask about finance
                </a>
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-secondary/40 border-y border-border py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <h2 className="font-display text-3xl font-semibold mb-10 text-center">
            How boiler finance works
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                icon: Phone,
                title: "Free survey",
                desc: "We visit your home, assess your heating needs and provide a fixed written quote.",
              },
              {
                step: "2",
                icon: Calculator,
                title: "Choose your plan",
                desc: "Pick the finance option that suits your budget — we'll explain all the details clearly.",
              },
              {
                step: "3",
                icon: CreditCard,
                title: "Quick decision",
                desc: "Apply online or over the phone. Most decisions are instant. Credit subject to status.",
              },
              {
                step: "4",
                icon: CheckCircle,
                title: "Installation",
                desc: "We install your new boiler — same high standard whether you pay upfront or on finance.",
              },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="h-14 w-14 rounded-full bg-gradient-amber flex items-center justify-center mx-auto mb-4">
                  <s.icon className="h-6 w-6 text-accent-foreground" strokeWidth={2} />
                </div>
                <div className="text-xs text-accent font-semibold mb-1">Step {s.step}</div>
                <h3 className="font-semibold mb-1">{s.title}</h3>
                <p className="text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-5 lg:px-8 py-16">
        <h2 className="font-display text-3xl font-semibold mb-10 text-center">
          Finance FAQ
        </h2>
        <div className="space-y-4">
          {[
            {
              q: "Who provides the finance?",
              a: "Finance is provided through FCA-authorised lenders. Just Imagine Ltd acts as a credit intermediary, not a lender. All finance is subject to status.",
            },
            {
              q: "Will I be credit checked?",
              a: "Yes — a credit check is part of the application process. We can do an initial soft check that won't affect your credit score before proceeding to a full application.",
            },
            {
              q: "Can I pay off early?",
              a: "Yes — there are no early repayment penalties on any of our finance options. You can settle the balance at any time.",
            },
            {
              q: "What can I finance?",
              a: "Boiler installations, full heating system upgrades, and some larger plumbing projects. The minimum finance amount is typically £1,000.",
            },
            {
              q: "Is the installation quality the same on finance?",
              a: "Identical. Same engineers, same warranty, same Gas Safe certification. How you pay makes no difference to the work we do.",
            },
          ].map(({ q, a }) => (
            <details
              key={q}
              className="group rounded-xl border border-border bg-card overflow-hidden"
            >
              <summary className="px-6 py-4 cursor-pointer font-semibold text-sm list-none flex items-center justify-between gap-4">
                {q}
                <span className="text-muted-foreground text-lg group-open:rotate-45 transition-transform flex-shrink-0">
                  +
                </span>
              </summary>
              <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">
                {a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 pb-16">
        <div className="p-10 rounded-3xl bg-gradient-hero text-primary-foreground text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold">
            Ready to get started?
          </h2>
          <p className="mt-3 text-primary-foreground/75 max-w-xl mx-auto">
            Call us for a free survey and finance quote — no obligation, no pressure.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-7">
            <Button
              asChild
              size="lg"
              className="bg-gradient-amber text-accent-foreground hover:opacity-90 font-semibold shadow-amber"
            >
              <a href={`tel:${BUSINESS.phoneE164}`}>
                <Phone className="h-4 w-4 mr-2" />
                {BUSINESS.phone}
              </a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            >
              <a
                href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent("Hi — I'm interested in boiler finance options.")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
