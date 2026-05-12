import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Building,
  HardHat,
  Phone,
  CheckCircle,
  Wrench,
  ShieldCheck,
  Clock,
  FileCheck,
  Users,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell, PageHero } from "@/components/PageShell";
import { EnquiryForm } from "@/components/EnquiryForm";
import { Certifications } from "@/components/Certifications";
import { BUSINESS } from "@/data/seo";
import { breadcrumbJsonLd, jsonLdScript, geoMetaTags, serviceJsonLd, faqJsonLd, localBusinessJsonLd } from "@/lib/seo";

const url = `${BUSINESS.url}/commercial`;

export const Route = createFileRoute("/commercial")({
  head: () => ({
    meta: [
      { title: "Commercial Heating & Construction | Just Imagine Ltd" },
      {
        name: "description",
        content:
          "Commercial heating, gas and construction partnerships in Warwickshire. CSCS-carded, Gas Safe engineers for new-builds, fit-outs and maintenance contracts.",
      },
      {
        property: "og:title",
        content: "Commercial Heating & Construction Partnerships",
      },
      {
        property: "og:description",
        content:
          "Gas Safe commercial heating for developers and property managers. New-build first-fix, fit-out and maintenance contracts.",
      },
      { property: "og:url", content: url },
      { property: "og:image", content: `${BUSINESS.url}/og-default.jpg` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Commercial Heating & Construction | Just Imagine" },
      { name: "twitter:description", content: "CSCS-carded, Gas Safe engineers for new-builds, fit-outs and maintenance contracts across Warwickshire." },
      { name: "twitter:image", content: `${BUSINESS.url}/og-default.jpg` },
      ...geoMetaTags(),
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      jsonLdScript({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Commercial Heating & Construction Partnerships",
        description: "Commercial gas, heating and plumbing services for developers, builders and property management companies across Warwickshire.",
        url,
        isPartOf: { "@id": `${BUSINESS.url}/#website` },
        about: { "@id": `${BUSINESS.url}/#business` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
      }),
      jsonLdScript(
        serviceJsonLd(
          "Commercial Heating & Construction Partnerships",
          "Commercial gas, heating and plumbing services for developers, builders and property management companies across Warwickshire. CSCS-carded, Gas Safe registered engineers.",
        ),
      ),
      jsonLdScript(
        breadcrumbJsonLd([
          { name: "Home", url: BUSINESS.url },
          { name: "Commercial & Construction", url },
        ]),
      ),
      jsonLdScript(
        faqJsonLd([
          { q: "Do your engineers have CSCS cards?", a: "Yes — every engineer carries a valid CSCS card and is familiar with CDM requirements, site inductions and RAMS procedures." },
          { q: "Can you work to our build programme?", a: "Yes. We schedule plot-by-plot or phase-by-phase to match your programme and coordinate with other trades on-site." },
          { q: "What documentation do you provide?", a: "Gas Safe certificates, benchmark commissioning records, Building Regulations notifications, written RAMS, method statements and completion reports." },
          { q: "Do you offer maintenance contracts?", a: "Yes — planned preventive maintenance for commercial buildings, managed residential blocks and housing associations." },
        ]),
      ),
    ],
  }),
  component: CommercialPage,
});

const partnerships = [
  {
    icon: HardHat,
    title: "New-Build & Development",
    desc: "First-fix gas and heating on residential and mixed-use developments. We integrate with your build programme, work to your site supervisor's schedule, and complete each phase on time.",
    features: [
      "First-fix gas pipework and meter connections",
      "Boiler installation and full system commissioning",
      "Gas Safe certification and Building Regs notification",
      "Scheduled to your build programme — no holdups",
    ],
  },
  {
    icon: Building,
    title: "Fit-Out & Refurbishment",
    desc: "Commercial fit-outs, office heating, retail units and HMO conversions. We handle all gas and heating elements so you don't need a separate specialist.",
    features: [
      "Office and retail heating design and installation",
      "HMO conversions — gas safety to every unit",
      "Kitchen and wet-room plumbing fit-out",
      "Coordination with electrical and mechanical trades",
    ],
  },
  {
    icon: Wrench,
    title: "Maintenance Contracts",
    desc: "Ongoing maintenance for commercial properties, managed residential blocks and housing associations. Predictable monthly cost, priority response, full compliance tracking.",
    features: [
      "Planned preventive maintenance schedules",
      "Priority emergency response — agreed SLAs",
      "Full CP12 and appliance compliance management",
      "Digital reporting and certificate storage",
    ],
  },
];

const whyPartner = [
  {
    icon: ShieldCheck,
    title: "Gas Safe & CSCS Carded",
    body: "Every engineer carries both Gas Safe and CSCS cards. We work on active construction sites and understand CDM requirements.",
  },
  {
    icon: Clock,
    title: "Programme-Aligned",
    body: "We schedule around your build programme, not the other way around. Plot-by-plot, phase-by-phase — we turn up when agreed and deliver on time.",
  },
  {
    icon: FileCheck,
    title: "Full Documentation",
    body: "Gas Safe certificates, benchmark commissioning records, Building Regs notifications, RAMS and method statements — all provided as standard.",
  },
  {
    icon: Users,
    title: "Single Point of Contact",
    body: "One project coordinator from start to finish. No chasing different engineers, no miscommunication between visits.",
  },
];

function CommercialPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Commercial & Construction"
        title="Construction partnerships. Commercial heating. Done properly."
        subtitle="Gas Safe registered engineers for new-build developments, commercial fit-outs and ongoing maintenance contracts. CSCS-carded, programme-aligned, fully documented."
        crumbs={[{ name: "Commercial & Construction" }]}
      />

      {/* Partnership types */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-16">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.25em] text-accent-foreground/70 font-medium mb-2">
            How we work with you
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold">
            Partnership models
          </h2>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          {partnerships.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl border border-border bg-card p-8 flex flex-col hover:border-accent/40 transition-smooth"
            >
              <div className="h-12 w-12 rounded-xl bg-gradient-amber flex items-center justify-center mb-5">
                <p.icon className="h-5.5 w-5.5 text-accent-foreground" strokeWidth={2} />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                {p.desc}
              </p>
              <ul className="space-y-2">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-sm">
                    <CheckCircle className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/80">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Why partner */}
      <section className="bg-secondary/40 border-y border-border py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-display text-3xl md:text-4xl font-semibold">
              Why developers and property managers choose us
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyPartner.map((w) => (
              <div key={w.title} className="p-6 rounded-xl bg-card border border-border">
                <w.icon className="h-7 w-7 text-accent mb-3" strokeWidth={1.5} />
                <h3 className="font-semibold mb-1">{w.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we cover */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-accent-foreground/70 font-medium mb-3">
              Full scope
            </p>
            <h2 className="font-display text-3xl font-semibold mb-4 leading-tight">
              Every gas and heating element — covered.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              From the initial pipework on a bare-shell new-build to ongoing maintenance of a
              fully let residential block, we handle every aspect of commercial gas and heating.
            </p>
            <div className="grid grid-cols-1 gap-2.5">
              {[
                "First-fix and second-fix gas pipework",
                "Commercial boiler installation and commissioning",
                "Central heating system design for multi-unit blocks",
                "Gas meter connections and flue installations",
                "Unvented hot water cylinder systems (G3 qualified)",
                "CP12 compliance for managed residential portfolios",
                "RAMS, method statements and site documentation",
                "Emergency callout and reactive maintenance",
                "Planned preventive maintenance schedules",
                "Gas leak detection and emergency make-safe",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm">
                  <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-5">
            <div className="p-6 bg-gradient-hero text-primary-foreground rounded-2xl">
              <h3 className="font-display text-xl font-semibold mb-1">
                Discuss a partnership
              </h3>
              <p className="text-sm text-primary-foreground/70 mb-5">
                Call us directly to discuss your project requirements. We'll arrange a site
                visit and provide a detailed proposal.
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
                  href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent("Hi — I'd like to discuss a commercial heating / construction partnership.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp
                </a>
              </Button>
            </div>
            <EnquiryForm defaultService="Commercial / Construction Partnership" />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-secondary/30 border-t border-border py-16">
        <div className="mx-auto max-w-3xl px-5 lg:px-8">
          <h2 className="font-display text-3xl font-semibold mb-10 text-center">
            Commercial FAQ
          </h2>
          <div className="space-y-4">
            {[
              {
                q: "Do your engineers have CSCS cards?",
                a: "Yes — every engineer carries a valid CSCS card and is familiar with CDM requirements, site inductions and RAMS procedures. We work on active construction sites regularly.",
              },
              {
                q: "Can you work to our build programme?",
                a: "Absolutely. We schedule plot-by-plot or phase-by-phase to match your programme. We attend site meetings, provide progress updates and coordinate with other trades on-site.",
              },
              {
                q: "What documentation do you provide?",
                a: "Gas Safe certificates, benchmark commissioning records, Building Regulations notifications, written RAMS, method statements and completion reports. Everything your site supervisor and building control officer will need.",
              },
              {
                q: "Do you offer maintenance contracts?",
                a: "Yes — we provide planned preventive maintenance for commercial buildings, managed residential blocks and housing associations. Predictable monthly costs, priority emergency response and full compliance tracking.",
              },
              {
                q: "What areas do you cover for commercial work?",
                a: "We cover Warwickshire, the West Midlands, Northamptonshire, Leicestershire and north Oxfordshire. For larger projects, we're happy to discuss extended coverage.",
              },
              {
                q: "Can you handle multiple sites simultaneously?",
                a: "Yes — we have the capacity to resource multiple active sites concurrently. We assign a dedicated coordinator per project to avoid confusion and maintain programme alignment.",
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
        </div>
      </section>

      {/* Related */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-12">
        <div className="flex flex-wrap gap-3 justify-center">
          {[
            { to: "/landlord", label: "Landlord Packages" },
            { to: "/services", label: "All Services" },
            { to: "/contact", label: "Get a Quote" },
          ].map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border bg-card hover:border-accent/50 text-sm font-medium transition-smooth"
            >
              {l.label}
              <ArrowRight className="h-3.5 w-3.5 text-accent" />
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-secondary/30 border-t border-border py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Certifications />
        </div>
      </section>
    </PageShell>
  );
}
