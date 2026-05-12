import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { BUSINESS } from "@/data/seo";
import { breadcrumbJsonLd, jsonLdScript, geoMetaTags, localBusinessJsonLd } from "@/lib/seo";

const url = `${BUSINESS.url}/our-story`;

export const Route = createFileRoute("/our-story")({
  head: () => ({
    meta: [
      { title: "Our Story | Just Imagine Ltd | Rugby \u0026 Warwickshire" },
      {
        name: "description",
        content:
          "From a one-man team in Rugby to serving all of Warwickshire. Read the story of how Just Imagine built a reputation for honest heating and plumbing.",
      },
      { property: "og:title", content: "Our Story | Just Imagine Gas Experts" },
      {
        property: "og:description",
        content:
          "How Just Imagine grew from Rugby into Warwickshire's trusted heating experts. Built on doing the basics right.",
      },
      { property: "og:url", content: url },
      { property: "og:image", content: `${BUSINESS.url}/og-default.jpg` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Our Story | Just Imagine Ltd" },
      { name: "twitter:description", content: "How we grew from a one-man team in Rugby to serving all of Warwickshire with honest gas engineering." },
      { name: "twitter:image", content: `${BUSINESS.url}/og-default.jpg` },
      ...geoMetaTags(),
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      jsonLdScript({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Our Story",
        description: "The history and values of Just Imagine Ltd, Gas Safe heating engineers based in Rugby and serving Warwickshire.",
        url,
        isPartOf: { "@id": `${BUSINESS.url}/#website` },
        about: { "@id": `${BUSINESS.url}/#business` },
      }),
      jsonLdScript(breadcrumbJsonLd([
        { name: "Home", url: BUSINESS.url },
        { name: "Our Story", url },
      ])),
      jsonLdScript(localBusinessJsonLd()),
    ],
  }),
  component: OurStoryPage,
});

const milestones = [
  { year: "2010", title: "Started in Rugby", body: "Just Imagine began as a one-man operation — a Gas Safe registered engineer with a van and a commitment to doing things properly." },
  { year: "2015", title: "Manufacturer accreditation", body: "Worcester Bosch and Vaillant accredited — giving customers access to the longest manufacturer warranties available." },
  { year: "2018", title: "Landlord portfolio growth", body: "Letting agents across Warwickshire started using us for CP12 certificates. A few properties grew into full portfolio management." },
  { year: "2020", title: "24/7 emergency cover", body: "Round-the-clock emergency response launched — real engineers answering real calls, not a scripted answering service." },
  { year: "2023", title: "Company incorporation", body: "Just Imagine Ltd formally incorporated (Company No. 15441163), solidifying the business while keeping the same personal service." },
  { year: "Today", title: "Warwickshire and beyond", body: "Covering all of Warwickshire, West Midlands, Northamptonshire and Leicestershire. The team grew, the approach didn't." },
];

function OurStoryPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Our story"
        title="Built on doing the basics right."
        subtitle="Just Imagine started with a simple idea: be the heating company you'd actually want to call."
        crumbs={[{ name: "Our Story" }]}
      />

      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-20">
        <div className="max-w-3xl mx-auto space-y-5 text-muted-foreground leading-relaxed mb-16">
          <p className="text-lg text-foreground">
            Just Imagine didn't start with a business plan or a marketing budget. It started
            because there was a gap — too many heating companies that were hard to reach, vague
            on pricing, and unreliable on timing.
          </p>
          <p>
            We set out to be the opposite. Answer the phone. Show up when we say. Quote a fair
            price and stick to it. Fix the problem properly the first time.
          </p>
          <p>
            That approach turned out to be exactly what homeowners and landlords across
            Warwickshire were looking for. Referrals grew, the team grew, and the service area
            expanded — but the fundamentals never changed.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border" />
          <div className="space-y-12">
            {milestones.map((m, i) => (
              <div key={m.year} className={`relative flex items-start gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className="hidden md:block md:w-1/2" />
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 h-4 w-4 rounded-full bg-accent border-4 border-background z-10 mt-1.5" />
                <div className="ml-14 md:ml-0 md:w-1/2 p-6 rounded-2xl bg-card border border-border">
                  <div className="text-xs font-bold text-accent uppercase tracking-wider mb-1">{m.year}</div>
                  <h3 className="font-display text-lg font-semibold mb-2">{m.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{m.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary/40 border-y border-border py-16">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <h2 className="font-display text-3xl font-semibold mb-10 text-center">What hasn't changed</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "We answer our own phone", body: "No call centres, no automated menus. You speak to someone who can actually help." },
              { title: "Fixed prices, always", body: "The price we quote is the price you pay. No call-out fees, no mystery extras." },
              { title: "If it's not right, we fix it", body: "Every job has a workmanship guarantee. If something needs attention, we come back — no charges." },
            ].map((v) => (
              <div key={v.title} className="p-7 rounded-2xl bg-card border border-border">
                <h3 className="font-display text-lg font-semibold mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
