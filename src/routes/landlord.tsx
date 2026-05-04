import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ShieldCheck,
  Phone,
  CheckCircle,
  FileCheck,
  Building,
  Users,
  Clock,
  MessageCircle,
  Star,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell, PageHero } from "@/components/PageShell";
import { EnquiryForm } from "@/components/EnquiryForm";
import { BUSINESS, REVIEWS } from "@/data/seo";
import { breadcrumbJsonLd, faqJsonLd, jsonLdScript } from "@/lib/seo";

const url = `${BUSINESS.url}/landlord`;

export const Route = createFileRoute("/landlord")({
  head: () => ({
    meta: [
      { title: "Landlord Gas Safety Packages — CP12, Boiler Service & Compliance | Just Imagine" },
      {
        name: "description",
        content:
          "Annual CP12 gas safety certificates, boiler servicing and priority emergency cover for landlords and letting agents across Warwickshire. Portfolio discounts. Same-day certificates.",
      },
      {
        property: "og:title",
        content: "Landlord Gas Safety Packages — CP12 & Boiler Service | Just Imagine",
      },
      {
        property: "og:description",
        content:
          "Compliant, affordable landlord gas safety packages. CP12 from £60, bundle deals, portfolio discounts, agent invoicing.",
      },
      { property: "og:url", content: url },
      { property: "og:image", content: `${BUSINESS.url}/og-default.jpg` },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      jsonLdScript(
        breadcrumbJsonLd([
          { name: "Home", url: BUSINESS.url },
          { name: "Landlord Packages", url },
        ]),
      ),
      jsonLdScript(
        faqJsonLd([
          {
            q: "Is a gas safety certificate a legal requirement for landlords?",
            a: "Yes. The Gas Safety (Installation and Use) Regulations 1998 require landlords to have a valid CP12 gas safety certificate for every rented property with gas appliances. Failure to comply can result in prosecution, unlimited fines and invalidated insurance.",
          },
          {
            q: "How much is a landlord gas safety certificate?",
            a: "From £60 for a single-appliance property. Our landlord bundle (CP12 + annual boiler service) is £120 — saving around £25 compared to booking separately. Portfolio discounts apply for 5+ properties.",
          },
          {
            q: "How long does a CP12 last?",
            a: "12 months from the date of inspection. We send free automated reminders 30 days before expiry so you're never out of compliance.",
          },
          {
            q: "Can you coordinate directly with tenants?",
            a: "Yes — we handle all tenant communication for access, reducing admin for landlords and letting agents. We confirm appointments directly and report back.",
          },
          {
            q: "Do you invoice letting agents directly?",
            a: "Yes. We work with several Warwickshire letting agencies and can invoice the agent directly, with full documentation for their records.",
          },
          {
            q: "What happens if an appliance fails the safety check?",
            a: "We issue a written report identifying any at-risk or immediately dangerous appliances, with a recommended remedial action plan. We can usually carry out repairs in the same visit.",
          },
          {
            q: "Do you cover HMO properties?",
            a: "Yes — HMOs often have multiple appliances across shared spaces. We carry out full multi-appliance safety audits and provide a comprehensive written report suitable for HMO licence applications.",
          },
          {
            q: "What is included in the landlord bundle?",
            a: "Annual CP12 safety inspection, full manufacturer-specification boiler service, priority emergency callout for tenants, digital certificate storage, free renewal reminders and direct agent invoicing — all in one annual fee.",
          },
        ]),
      ),
    ],
  }),
  component: LandlordPage,
});

const packages = [
  {
    name: "CP12 Certificate",
    price: "£60",
    unit: "per property / year",
    popular: false,
    icon: FileCheck,
    features: [
      "All gas appliances & flues tested",
      "Digital certificate same day",
      "Up to 2 appliances included",
      "Free 30-day renewal reminder",
      "HSE-compliant format",
    ],
  },
  {
    name: "Landlord Bundle",
    price: "£120",
    unit: "CP12 + boiler service",
    popular: true,
    badge: "Best Value — Save £25",
    icon: ShieldCheck,
    features: [
      "Annual CP12 safety inspection",
      "Full boiler service included",
      "Priority emergency response",
      "Digital certificate same day",
      "Free renewal reminder",
      "Single invoice to agent or landlord",
    ],
  },
  {
    name: "Portfolio Cover",
    price: "Custom",
    unit: "for 5+ properties",
    popular: false,
    icon: Building,
    features: [
      "Per-property rate discounts",
      "Dedicated account manager",
      "Direct agent invoicing",
      "Tenant coordination included",
      "Compliance dashboard access",
      "Priority scheduling",
    ],
  },
];

const whatsIncludes = [
  "Every gas appliance tested and recorded",
  "All flues and ventilation checked",
  "Pipework pressure and integrity test",
  "Carbon monoxide detector check",
  "Boiler combustion analysis",
  "Digital CP12 certificate issued same day",
  "Written record for HMRC and insurance purposes",
  "Automated 12-month renewal reminder",
  "Tenant access coordination on request",
  "Direct invoicing to letting agents",
  "Multi-property scheduling at no extra cost",
  "Compliance-grade written reports for HMOs",
];

const landlordReviews = REVIEWS.filter(
  (r) =>
    r.text.toLowerCase().includes("landlord") ||
    r.text.toLowerCase().includes("portfolio") ||
    r.text.toLowerCase().includes("cp12") ||
    r.text.toLowerCase().includes("letting") ||
    r.text.toLowerCase().includes("tenant") ||
    r.area === "Stratford-upon-Avon" ||
    r.area === "Warwick",
).slice(0, 3);

function LandlordPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="For Landlords & Letting Agents"
        title="Gas safety. Sorted annually."
        subtitle="CP12 certificates, boiler servicing and priority cover — one fixed annual price, compliance guaranteed."
        crumbs={[{ name: "Landlord Packages" }]}
      />

      {/* Legal obligation banner */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 -mt-6 mb-4">
        <div className="rounded-2xl bg-amber-50 border border-amber-200 dark:bg-amber-950/30 dark:border-amber-800/40 p-5 flex gap-4 items-start">
          <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <span className="font-semibold text-amber-900 dark:text-amber-200">
              Legal requirement:{" "}
            </span>
            <span className="text-amber-800 dark:text-amber-300">
              Under the Gas Safety (Installation and Use) Regulations 1998, landlords must hold a
              valid CP12 gas safety certificate for every rented property with gas appliances.
              Certificates must be renewed annually and provided to tenants within 28 days of issue.
              Non-compliance can result in prosecution, unlimited fines and invalid insurance.
            </span>
            <a
              href="https://www.hse.gov.uk/gas/domestic/landlords.htm"
              target="_blank"
              rel="noopener nofollow noreferrer"
              className="ml-1 underline text-amber-700 dark:text-amber-400 hover:text-amber-900"
            >
              HSE guidance ↗
            </a>
          </div>
        </div>
      </section>

      {/* Package Cards */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-12">
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-accent-foreground/70 font-medium mb-2">
            Choose a package
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold">
            Simple, transparent pricing
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {packages.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-2xl border p-8 flex flex-col ${
                p.popular
                  ? "border-accent bg-gradient-hero text-primary-foreground shadow-elegant"
                  : "border-border bg-card"
              }`}
            >
              {p.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-amber text-accent-foreground text-xs font-semibold px-4 py-1 rounded-full shadow-amber whitespace-nowrap">
                  {p.badge}
                </div>
              )}
              <p.icon
                className={`h-8 w-8 mb-4 ${p.popular ? "text-accent" : "text-accent"}`}
                strokeWidth={1.5}
              />
              <h3 className="font-display text-xl font-semibold mb-1">{p.name}</h3>
              <div className="mb-1">
                <span className="text-3xl font-bold">{p.price}</span>
              </div>
              <div
                className={`text-xs mb-6 ${p.popular ? "text-primary-foreground/60" : "text-muted-foreground"}`}
              >
                {p.unit}
              </div>
              <ul className="space-y-2.5 flex-1 mb-8">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-sm">
                    <CheckCircle
                      className={`h-4 w-4 flex-shrink-0 mt-0.5 ${p.popular ? "text-accent" : "text-accent"}`}
                    />
                    <span className={p.popular ? "text-primary-foreground/80" : "text-foreground/80"}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className={
                  p.popular
                    ? "w-full bg-gradient-amber text-accent-foreground hover:opacity-90 font-semibold"
                    : "w-full"
                }
                variant={p.popular ? "default" : "outline"}
              >
                <a href={`tel:${BUSINESS.phoneE164}`}>
                  <Phone className="h-4 w-4 mr-2" />
                  Book now
                </a>
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* What's included checklist */}
      <section className="bg-secondary/40 border-y border-border py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-accent-foreground/70 font-medium mb-3">
                Full service
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold leading-tight mb-4">
                Everything covered. Nothing to chase.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Our landlord service is designed to be completely hands-off for you. From booking
                through to certificate delivery, we handle the entire process — including tenant
                coordination, compliance reporting and renewal reminders.
              </p>
              <div className="mt-6 flex gap-3 flex-wrap">
                <Button asChild className="bg-gradient-amber text-accent-foreground hover:opacity-90 font-semibold">
                  <a href={`tel:${BUSINESS.phoneE164}`}>
                    <Phone className="h-4 w-4 mr-2" />
                    Call {BUSINESS.phone}
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <a
                    href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent("Hi — I'm a landlord and need gas safety certificates. Can you help?")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2.5">
              {whatsIncludes.map((item) => (
                <div key={item} className="flex items-center gap-3 text-sm">
                  <CheckCircle className="h-4 w-4 text-accent flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio management section */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {[
            {
              icon: Building,
              title: "Portfolio management",
              body: "Manage 5 or 500 properties — we schedule all inspections, track expiry dates and coordinate across multiple letting agents. One point of contact for your entire portfolio.",
            },
            {
              icon: Users,
              title: "Tenant coordination",
              body: "We contact your tenants directly to arrange access, confirm appointments and provide a professional service in your name. No chasing, no awkward conversations.",
            },
            {
              icon: Clock,
              title: "Compliance tracking",
              body: "Every certificate is stored digitally and accessible on request. We send renewal reminders 30 days before expiry. You'll never face an out-of-date CP12 under our watch.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="p-7 rounded-2xl bg-card border border-border hover:border-accent/40 transition-smooth"
            >
              <div className="h-12 w-12 rounded-xl bg-gradient-amber flex items-center justify-center mb-5">
                <card.icon className="h-5.5 w-5.5 text-accent-foreground" strokeWidth={2} />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews from landlords */}
      {landlordReviews.length > 0 && (
        <section className="bg-secondary/30 border-y border-border py-14">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <h2 className="font-display text-2xl font-semibold mb-8 text-center">
              Trusted by landlords across Warwickshire
            </h2>
            <div className="grid md:grid-cols-3 gap-5">
              {landlordReviews.map((r, i) => (
                <div key={i} className="p-6 rounded-2xl bg-card border border-border">
                  <div className="flex gap-1 text-accent mb-3">
                    {[...Array(r.rating)].map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    "{r.text}"
                  </p>
                  <div className="text-sm font-semibold">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.area}</div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link
                to="/reviews"
                className="text-sm font-medium text-foreground/70 hover:text-foreground inline-flex items-center gap-2"
              >
                Read all reviews <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-5 lg:px-8 py-16">
        <h2 className="font-display text-3xl font-semibold mb-10 text-center">
          Landlord FAQ
        </h2>
        <div className="space-y-5">
          {[
            {
              q: "Is a gas safety certificate a legal requirement?",
              a: "Yes — under the Gas Safety (Installation and Use) Regulations 1998, landlords must have a valid CP12 for every rented property with gas appliances. Failure to comply risks prosecution and invalidates insurance.",
            },
            {
              q: "How much is a CP12 certificate?",
              a: "From £60 for a single-appliance property. Our landlord bundle (CP12 + full boiler service) is £120. Multi-property discounts apply for portfolios of 5+.",
            },
            {
              q: "What does the CP12 cover?",
              a: "Every gas appliance, flue and pipework in the property. We test for gas tightness, combustion, ventilation and safety cut-offs. The certificate lists every appliance tested with pass/fail status.",
            },
            {
              q: "Can you deal with tenants directly?",
              a: "Yes — we contact tenants to arrange access, confirm appointments and handle any communication during the visit. Landlords don't need to be present.",
            },
            {
              q: "Do you invoice letting agents?",
              a: "Yes. We work with a number of Warwickshire letting agencies. We can invoice the agent directly and provide a VAT receipt for their accounts.",
            },
            {
              q: "What if a gas appliance fails the inspection?",
              a: "We issue a written report with the appliance status and recommended action. If the appliance is immediately dangerous, we will advise isolation. Remedial work can usually be booked in the same visit.",
            },
            {
              q: "Do you cover HMOs?",
              a: "Yes — HMOs often have multiple appliances across shared areas and individual rooms. We provide a comprehensive multi-appliance audit and a report suitable for HMO licence applications.",
            },
            {
              q: "How far in advance should I book?",
              a: "We recommend booking 4–6 weeks before your certificate expiry date. We can usually accommodate shorter notice but availability is not guaranteed.",
            },
          ].map(({ q, a }) => (
            <details key={q} className="group rounded-xl border border-border bg-card overflow-hidden">
              <summary className="px-6 py-4 cursor-pointer font-semibold text-sm list-none flex items-center justify-between gap-4">
                {q}
                <span className="text-muted-foreground text-lg group-open:rotate-45 transition-transform flex-shrink-0">
                  +
                </span>
              </summary>
              <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">{a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* Enquiry form */}
      <section className="bg-secondary/40 border-t border-border py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-accent-foreground/70 font-medium mb-3">
              Get in touch
            </p>
            <h2 className="font-display text-3xl font-semibold mb-4">
              Request a landlord package quote
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Fill in the form and we'll be in touch within one working day. For portfolios of 5+
              properties or urgent requirements, call us directly for the fastest response.
            </p>
            <a
              href={`tel:${BUSINESS.phoneE164}`}
              className="inline-flex items-center gap-2 font-semibold text-foreground hover:text-accent transition-smooth"
            >
              <Phone className="h-4 w-4 text-accent" />
              {BUSINESS.phone}
            </a>
          </div>
          <EnquiryForm defaultService="Landlord Gas Safety" />
        </div>
      </section>
    </PageShell>
  );
}
