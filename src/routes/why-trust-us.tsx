import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Award, Users, MapPin, Clock, Wrench } from "lucide-react";
import { PageShell, PageHero } from "@/components/PageShell";
import { Certifications } from "@/components/Certifications";
import { BUSINESS } from "@/data/seo";
import { breadcrumbJsonLd, jsonLdScript, geoMetaTags, localBusinessJsonLd } from "@/lib/seo";

const url = `${BUSINESS.url}/why-trust-us`;

export const Route = createFileRoute("/why-trust-us")({
  head: () => ({
    meta: [
      { title: "Why Trust Us | Gas Safe Registered Engineers Warwickshire" },
      {
        name: "description",
        content:
          "Gas Safe registered, manufacturer-accredited, and fully insured. See exactly why homeowners across Rugby and Warwickshire trust Just Imagine for heating and plumbing.",
      },
      { property: "og:title", content: "Why Trust Just Imagine | Gas Safe Engineers Rugby" },
      {
        property: "og:description",
        content:
          "Gas Safe registered, Worcester Bosch & Vaillant accredited. 15+ years experience. No sub-contractors \u2014 just honest local heating engineers in Warwickshire.",
      },
      { property: "og:url", content: url },
      { property: "og:image", content: `${BUSINESS.url}/og-default.jpg` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Why Trust Just Imagine | Gas Safe Engineers" },
      { name: "twitter:description", content: "Gas Safe registered, Worcester Bosch \u0026 Vaillant accredited. 15+ years experience serving Warwickshire." },
      { name: "twitter:image", content: `${BUSINESS.url}/og-default.jpg` },
      ...geoMetaTags(),
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      jsonLdScript({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Why Trust Us",
        description: "Gas Safe registration, manufacturer accreditation, fixed pricing and workmanship guarantees from Just Imagine Ltd.",
        url,
        isPartOf: { "@id": `${BUSINESS.url}/#website` },
        about: { "@id": `${BUSINESS.url}/#business` },
      }),
      jsonLdScript(
        breadcrumbJsonLd([
          { name: "Home", url: BUSINESS.url },
          { name: "Why Trust Us", url },
        ]),
      ),
      jsonLdScript(localBusinessJsonLd()),
    ],
  }),
  component: WhyTrustUsPage,
});

const trustReasons = [
  {
    icon: ShieldCheck,
    title: "Gas Safe Registered",
    body: "Every engineer carries their Gas Safe card and is verifiable on the public register. We never send unregistered engineers to your home — no exceptions.",
    detail:
      "Gas Safe registration is the legal requirement for anyone working on gas appliances in the UK. Our registration is current, verifiable, and covers domestic and commercial gas work.",
  },
  {
    icon: Award,
    title: "Manufacturer Accredited",
    body: "We're accredited installers for Worcester Bosch and Vaillant — meaning we can offer the longest manufacturer warranties available, up to 12 years.",
    detail:
      "Accreditation requires annual assessment by the manufacturer. It confirms we install to their specification, use approved materials, and commission every boiler to benchmark standards.",
  },
  {
    icon: MapPin,
    title: "Locally Based in Rugby",
    body: "We're not a national chain or a franchise. We're based in Rugby and cover Warwickshire personally. You speak to the engineer who'll do the work.",
    detail:
      "Being local means faster response times, knowledge of local housing stock, and accountability. If something isn't right, we're down the road — not at a head office 200 miles away.",
  },
  {
    icon: Users,
    title: "No Sub-Contractors",
    body: "We never sub-contract your job. The engineer who surveys your property is the one who does the work. One team, start to finish.",
    detail:
      "Sub-contracting creates gaps in accountability, inconsistent quality, and communication problems. We don't do it. Every job is completed by our own directly employed engineers.",
  },
  {
    icon: Clock,
    title: "Fixed Pricing, Always",
    body: "We quote a fixed price before any work begins. That's the price you pay — no call-out fees added after, no surprise extras on the invoice.",
    detail:
      "Our quotes are written, itemised and agreed before we start. If we find additional work is needed, we explain it, quote it separately, and wait for your approval before proceeding.",
  },
  {
    icon: Wrench,
    title: "Proper Workmanship Guarantee",
    body: "Every job comes with a 12-month workmanship warranty. If something we've done needs attention, we come back and put it right — free of charge.",
    detail:
      "Our warranty covers labour and workmanship. Manufacturer parts warranties are separate and typically longer. We keep records of every job so warranty claims are straightforward.",
  },
];

function WhyTrustUsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Why trust us"
        title="We earn trust the old-fashioned way."
        subtitle="No marketing gimmicks. Just Gas Safe registration, manufacturer accreditation, fixed prices, and 15+ years of doing the job properly."
        crumbs={[{ name: "Why Trust Us" }]}
      />

      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-6">
          {trustReasons.map((r) => (
            <div
              key={r.title}
              className="p-8 rounded-2xl bg-card border border-border hover:border-accent/40 transition-smooth"
            >
              <div className="flex items-start gap-5">
                <div className="h-12 w-12 rounded-xl bg-gradient-amber flex items-center justify-center flex-shrink-0">
                  <r.icon className="h-5.5 w-5.5 text-accent-foreground" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold mb-2">{r.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-3">{r.body}</p>
                  <p className="text-sm text-muted-foreground/70 leading-relaxed">{r.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gradient-hero text-primary-foreground py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "15+", label: "Years experience" },
              { value: "1,200+", label: "Jobs completed" },
              { value: "24/7", label: "Emergency cover" },
              { value: "100%", label: "Gas Safe verified" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-4xl md:text-5xl font-bold text-accent">
                  {stat.value}
                </div>
                <div className="text-sm text-primary-foreground/60 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
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
