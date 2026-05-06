import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { Certifications } from "@/components/Certifications";
import { BUSINESS } from "@/data/seo";
import { jsonLdScript, breadcrumbJsonLd } from "@/lib/seo";
import { ArrowLeft, HelpCircle, Clock, Wrench, Home, DollarSign, Zap } from "lucide-react";

const FAQs = [
  {
    category: "General",
    icon: HelpCircle,
    items: [
      {
        q: "How quickly can you respond to emergency calls?",
        a: "We aim to respond to emergency calls within 1–2 hours across Rugby and surrounding areas, depending on our current workload. Out-of-hours emergency callouts are available 24/7 for no heat, no hot water, or gas safety concerns.",
      },
      {
        q: "Are you available for emergency work?",
        a: "Yes, we operate 24/7 for emergency calls. Out-of-hours rates are transparent and agreed upfront before any work begins.",
      },
      {
        q: "Do you provide free quotes?",
        a: "Absolutely. We provide no-obligation quotes for all work — usually within 24 hours for non-emergency jobs. Emergency callouts include a diagnostic fee which is credited toward any repair costs.",
      },
      {
        q: "What areas do you cover?",
        a: "We cover Rugby, Leamington Spa, Warwick, Coventry, and surrounding areas across Warwickshire. Check our areas page for your postcode.",
      },
    ],
  },
  {
    category: "Pricing & Payments",
    icon: DollarSign,
    items: [
      {
        q: "Why is your pricing fixed?",
        a: "Fixed pricing means no surprises. You know exactly what you'll pay before we start work — no hidden charges, no call-out fees added to invoices.",
      },
      {
        q: "Do you offer payment plans?",
        a: "Yes — for boiler installations and major work, we offer flexible finance options, including 0% interest on selected packages. Ask during your survey.",
      },
      {
        q: "Do you accept all payment methods?",
        a: "We accept bank transfer, card, and PayPal. For boiler finance, monthly instalments are available via our lending partners.",
      },
      {
        q: "What if I'm not happy with the work?",
        a: "All work comes with a 12-month guarantee on parts and labour. If there's an issue, we'll put it right at no extra cost.",
      },
    ],
  },
  {
    category: "Services & Expertise",
    icon: Wrench,
    items: [
      {
        q: "What brands of boiler do you install?",
        a: "We install Worcester Bosch, Vaillant, Ideal, Baxi, Glow-worm, and Viessmann. We're accredited by Worcester and Vaillant for specialist installation work.",
      },
      {
        q: "How long does a boiler installation take?",
        a: "Most straight swaps take a single day (6–8 hours). Complex conversions or system relocations may take 2–3 days.",
      },
      {
        q: "Do I need Building Regulations approval?",
        a: "Yes — we self-certify all boiler and heating installations under Part P. You'll receive your completion certificate automatically.",
      },
      {
        q: "Can you help with landlord gas safety certificates?",
        a: "Yes — we provide CP12 gas safety certificates for landlords and letting agents, with digital issue, portfolio discounts, and reminder services.",
      },
    ],
  },
  {
    category: "Planning & Access",
    icon: Clock,
    items: [
      {
        q: "How do I book an appointment?",
        a: "Call us on 07774 079152, complete the contact form on our website, or message us via WhatsApp. We'll confirm your appointment within 24 hours.",
      },
      {
        q: "What should I prepare before an engineer visits?",
        a: "Make sure we can access your boiler cupboard, heating system, and water supply. For gas work, ensure good ventilation. For landlord visits, coordinate access with your tenant in advance.",
      },
      {
        q: "Do I need to be home during the work?",
        a: "Yes, for most jobs (safety/gas regulations require a householder to be present). For emergency call-outs, our engineer can access via tenant if you arrange it.",
      },
    ],
  },
  {
    category: "Technical Questions",
    icon: Zap,
    items: [
      {
        q: "What's the difference between a combi and a system boiler?",
        a: "Combi boilers heat on-demand and don't need a cylinder — ideal for smaller homes. System boilers heat a cylinder — better for larger homes with multiple bathrooms and high hot water demand.",
      },
      {
        q: "Why is my boiler losing pressure?",
        a: "Usually caused by a small leak in the pipework or heating system, or a faulty expansion vessel. We'll diagnose it during a visit — most fixes are simple.",
      },
      {
        q: "How often should a boiler be serviced?",
        a: "Every 12 months. Annual servicing keeps your warranty valid, cuts energy bills, and prevents breakdowns. We send free reminders so you never miss it.",
      },
      {
        q: "What's a chemical flush and do I need one?",
        a: "A power flush cleans internal rust and sludge from radiators and pipework using circulation. It improves heating efficiency and is recommended for older systems or uneven heating.",
      },
    ],
  },
];

export const Route = createFileRoute("/faq")({
  component: FAQPage,
  head: () => {
    const url = `${BUSINESS.url}/faq`;
    return {
      meta: [
        { title: "FAQ - Just Imagine Ltd" },
        { name: "description", content: "Frequently asked questions about boiler installation, repairs, gas safety, and heating services in Rugby and Warwickshire." },
        { property: "og:title", content: "Frequently Asked Questions | Just Imagine Ltd" },
        { property: "og:description", content: "Find answers to common questions about our heating, boiler, and plumbing services." },
      ],
      links: [{ rel: "canonical", to: url }],
      scripts: [
        jsonLdScript(
          breadcrumbJsonLd([
            { name: "Home", url: BUSINESS.url },
            { name: "FAQ", url },
          ]),
        ),
      ],
    };
  },
});

function FAQPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Frequently Asked Questions"
        title="Got a question? We've got answers."
        subtitle="Find clear, honest answers about our services, pricing, and process."
        crumbs={[
          { name: "Home", to: "/" },
          { name: "FAQ", to: "/faq" },
        ]}
      />

      <section className="mx-auto max-w-4xl px-5 lg:px-8 py-16 lg:py-20">
        <div className="space-y-16">
          {FAQs.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.category}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <h2 className="font-display text-2xl font-semibold text-foreground">{category.category}</h2>
                </div>

                <div className="space-y-3">
                  {category.items.map((item, i) => (
                    <details
                      key={i}
                      className="group rounded-xl border border-border bg-card p-5 open:shadow-elegant focus-within:ring-2 focus-within:ring-ring transition-all"
                    >
                      <summary className="cursor-pointer list-none font-semibold text-base flex items-start justify-between gap-4">
                        <span>{item.q}</span>
                        <span className="text-accent text-xl leading-none transition-transform group-open:rotate-45 motion-reduce:transition-none flex-shrink-0">
                          +
                        </span>
                      </summary>
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 pt-12 border-t border-border">
          <div className="bg-secondary/40 rounded-2xl border border-border p-6 lg:p-8">
            <h3 className="font-display text-xl font-semibold text-foreground mb-3">
              Still have a question?
            </h3>
            <p className="text-sm text-muted-foreground mb-5">
              Get in touch and we'll be happy to help. Call us, send a message, or use our contact form.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="tel:07774079152"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-gradient-amber text-accent-foreground font-semibold text-sm rounded-lg hover:opacity-90 transition-smooth"
              >
                <span>Call 07774 079152</span>
              </a>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 border border-accent bg-accent/5 text-accent font-semibold text-sm rounded-lg hover:bg-accent/10 transition-smooth"
              >
                <span>Send a message</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-secondary/30 border-t border-border py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Certifications />
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-5 lg:px-8 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-accent"
        >
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
      </div>
    </PageShell>
  );
}
