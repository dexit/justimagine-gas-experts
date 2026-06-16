import { createFileRoute, Link } from "@tanstack/react-router";
import { SERVICES } from "@/data/seo";
import { PageShell, PageHero } from "@/components/PageShell";
import { getServiceBySlug } from "@/lib/services";
import { reviewJsonLd, jsonLdScript } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Star, ExternalLink, MapPin } from "lucide-react";
import { notFound } from "@/lib/not-found";

// Placeholder reviews — will be replaced by DB + scraping in Phase 2
const SAMPLE_REVIEWS = [
  {
    author: "Sarah M.",
    rating: 5,
    date: "2 weeks ago",
    text: "Fantastic service. Our boiler failed on a Sunday morning and they had an engineer to us within 90 minutes. Fixed the pump, very professional and fair pricing.",
    source: "google" as const,
  },
  {
    author: "John D.",
    rating: 5,
    date: "1 month ago",
    text: "Used them for a full central heating system design and install. From the survey through to commissioning, everything was explained clearly. Would definitely recommend.",
    source: "google" as const,
  },
  {
    author: "Emma W.",
    rating: 4,
    date: "6 weeks ago",
    text: "Great experience with our boiler service. Very thorough engineer, explained everything in plain English. Only minor point: could've been slightly earlier arrival time.",
    source: "google" as const,
  },
];

export const Route = createFileRoute("/reviews/$serviceSlug")({
  component: ReviewsPage,
});

function ReviewsPage() {
  const { serviceSlug } = Route.useParams();
  const service = getServiceBySlug(serviceSlug);

  if (!service) {
    notFound();
  }

  const avgRating = (SAMPLE_REVIEWS.reduce((sum, r) => sum + r.rating, 0) / SAMPLE_REVIEWS.length).toFixed(1);

  const schemaData = reviewJsonLd({
    name: service.name,
    ratingValue: Number(avgRating),
    ratingCount: SAMPLE_REVIEWS.length,
    reviews: SAMPLE_REVIEWS.map((r) => ({
      author: r.author,
      rating: r.rating,
      text: r.text,
    })),
  });

  return (
    <PageShell>
      {jsonLdScript(schemaData)}
      <PageHero
        eyebrow="Reviews"
        title={`${service.name} Reviews`}
        subtitle="What our customers say about our work."
        crumbs={[
          { name: "Services", to: "/services" },
          { name: service.name, to: `/services/${service.slug}` },
          { name: "Reviews" },
        ]}
      />

      <section className="mx-auto max-w-3xl px-5 lg:px-8 py-16 space-y-12">
        {/* Google Rating Summary */}
        <div className="border border-border rounded-lg p-8 bg-secondary/30">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-6 w-6 text-muted-foreground" />
                <h2 className="text-lg font-semibold">Google Reviews</h2>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-4xl font-bold">{avgRating}</div>
                <div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(Number(avgRating)) ? "fill-accent text-accent" : "text-border"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{SAMPLE_REVIEWS.length} reviews</p>
                </div>
              </div>
            </div>
            <Button asChild size="lg">
              <a
                href={service.googleReviewsUrl || "https://www.google.com/maps/place/Just+Imagine+Ltd+Heating+%26+Plumbing/@52.3704,-1.2658,15z"}
                target="_blank"
                rel="noopener noreferrer"
                className="gap-2"
              >
                <span>Leave a Review</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="space-y-4">
          <h2 className="text-2xl font-display font-semibold">Recent Reviews</h2>
          <div className="grid gap-4">
            {SAMPLE_REVIEWS.map((review, index) => (
              <div
                key={index}
                className="border border-border rounded-lg p-6 hover:border-accent/50 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold">{review.author}</p>
                    <p className="text-sm text-muted-foreground">{review.date}</p>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating ? "fill-accent text-accent" : "text-border"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 pt-12 border-t border-border space-y-6 text-center">
          <h2 className="text-2xl font-display font-semibold">Ready to book?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get in touch for a free quote or same-day emergency response. 24/7 on 07774 079152.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button size="lg" asChild>
              <Link to="/contact">Request a quote</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href={`tel:07774079152`}>Call us now</a>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
