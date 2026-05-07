import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, PageHero } from "@/components/PageShell";
import { REVIEWS, BUSINESS } from "@/data/seo";
import { Star, Quote } from "lucide-react";
import { RelatedContent } from "@/components/RelatedContent";
import { breadcrumbJsonLd, jsonLdScript, geoMetaTags, localBusinessJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Customer Reviews — Gas Engineers Rugby & Warwickshire | Just Imagine" },
      {
        name: "description",
        content: `Gas Safe engineer Rugby rated 4.9/5 by ${REVIEWS.length}+ verified customers. Boiler installs, servicing, CP12 certificates & emergency callouts across Warwickshire.`,
      },
      { property: "og:title", content: "Customer Reviews 4.9/5 | Just Imagine Ltd — Rugby" },
      {
        property: "og:description",
        content: `${REVIEWS.length}+ verified reviews. 4.9/5 average. Trusted Gas Safe boiler and heating engineers across Rugby & Warwickshire.`,
      },
      { property: "og:image", content: `${BUSINESS.url}/og-default.jpg` },
      ...geoMetaTags(),
    ],
    links: [{ rel: "canonical", href: `${BUSINESS.url}/reviews` }],
    scripts: [
      jsonLdScript(
        breadcrumbJsonLd([
          { name: "Home", url: BUSINESS.url },
          { name: "Customer Reviews", url: `${BUSINESS.url}/reviews` },
        ]),
      ),
      jsonLdScript(localBusinessJsonLd()),
    ],
  }),
  component: ReviewsPage,
});

const SERVICE_FILTERS = [
  "All",
  "Boiler",
  "Gas Safety",
  "Emergency",
  "Plumbing",
  "Landlord",
];

function ReviewsPage() {
  const [filter, setFilter] = useState("All");

  const filtered = REVIEWS.filter((r) => {
    if (filter === "All") return true;
    const text = r.text.toLowerCase();
    if (filter === "Boiler") return text.includes("boiler") || text.includes("combi") || text.includes("worcester") || text.includes("vaillant");
    if (filter === "Gas Safety") return text.includes("cp12") || text.includes("certificate") || text.includes("safety");
    if (filter === "Emergency") return text.includes("emergency") || text.includes("sunday") || text.includes("night") || text.includes("callout");
    if (filter === "Plumbing") return text.includes("plumb") || text.includes("pipe") || text.includes("tap") || text.includes("cylinder");
    if (filter === "Landlord") return text.includes("landlord") || text.includes("portfolio") || text.includes("letting") || text.includes("tenant") || text.includes("rental");
    return true;
  });

  const avgRating = (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1);

  return (
    <PageShell>
      <PageHero
        eyebrow="Reviews"
        title="Don't take our word for it."
        subtitle="We pride ourselves on our reputation. Here's what our customers across Warwickshire have to say."
      />

      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-10">
        {/* Stats bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 p-5 rounded-2xl bg-card border border-border">
          <div className="flex items-center gap-6">
            <div>
              <div className="font-display text-4xl font-bold text-accent">{avgRating}/5</div>
              <div className="text-xs text-muted-foreground mt-0.5">Average rating</div>
            </div>
            <div className="flex gap-1 text-accent">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{REVIEWS.length} verified reviews</span> ·{" "}
            homeowners and landlords across Warwickshire · Google, Checkatrade & direct feedback
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {SERVICE_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-smooth ${
                filter === f
                  ? "bg-gradient-amber text-accent-foreground border-transparent shadow-amber"
                  : "border-border bg-card hover:border-accent/40"
              }`}
            >
              {f}
              {f === "All" ? ` (${REVIEWS.length})` : ` (${REVIEWS.filter((r) => {
                const text = r.text.toLowerCase();
                if (f === "Boiler") return text.includes("boiler") || text.includes("combi") || text.includes("worcester") || text.includes("vaillant");
                if (f === "Gas Safety") return text.includes("cp12") || text.includes("certificate") || text.includes("safety");
                if (f === "Emergency") return text.includes("emergency") || text.includes("sunday") || text.includes("night") || text.includes("callout");
                if (f === "Plumbing") return text.includes("plumb") || text.includes("pipe") || text.includes("tap") || text.includes("cylinder");
                if (f === "Landlord") return text.includes("landlord") || text.includes("portfolio") || text.includes("letting") || text.includes("tenant") || text.includes("rental");
                return false;
              }).length})`}
            </button>
          ))}
        </div>

        {/* Reviews grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((r, i) => (
            <div
              key={i}
              className="p-7 rounded-3xl bg-card border border-border shadow-sm hover:shadow-elegant transition-smooth flex flex-col"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-1 text-accent">
                  {[...Array(r.rating)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <Quote className="h-6 w-6 text-accent/15" />
              </div>
              <p className="text-muted-foreground leading-relaxed flex-1 mb-5 text-sm">
                "{r.text}"
              </p>
              <div className="border-t border-border pt-4">
                <div className="font-semibold text-sm">{r.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  {r.area} ·{" "}
                  {new Date(r.date).toLocaleDateString("en-GB", {
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            No reviews match that filter.{" "}
            <button onClick={() => setFilter("All")} className="underline hover:text-foreground">
              Show all
            </button>
          </div>
        )}

        {/* Summary */}
        <div className="mt-16 text-center py-12 rounded-3xl bg-secondary/40 border border-border">
          <h2 className="font-display text-3xl font-semibold mb-2">4.9/5 Average Rating</h2>
          <p className="text-muted-foreground">
            Based on {REVIEWS.length}+ verified reviews from homeowners and landlords across
            Warwickshire, collected via Google, Checkatrade and direct customer feedback.
          </p>
        </div>
      </section>

      <RelatedContent type="services-and-areas" title="Our most reviewed services" limit={3} />
    </PageShell>
  );
}
