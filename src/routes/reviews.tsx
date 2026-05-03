import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { REVIEWS } from "@/data/seo";
import { Star, Quote } from "lucide-react";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Customer Reviews & Testimonials | Just Imagine Ltd" },
      {
        name: "description",
        content:
          "Read what our customers across Warwickshire say about our boiler installations, repairs and plumbing services.",
      },
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Reviews"
        title="Don't take our word for it."
        subtitle="We pride ourselves on our reputation. Here's what our local customers have to say."
      />
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((r, i) => (
            <div
              key={i}
              className="p-8 rounded-3xl bg-card border border-border shadow-sm hover:shadow-elegant transition-smooth flex flex-col"
            >
              <div className="flex gap-1 text-accent mb-4">
                {[...Array(r.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <Quote className="h-8 w-8 text-accent/20 mb-4" />
              <p className="text-muted-foreground leading-relaxed flex-1 mb-6">"{r.text}"</p>
              <div className="border-t border-border pt-4">
                <div className="font-semibold">{r.name}</div>
                <div className="text-xs text-muted-foreground">
                  {r.area} ·{" "}
                  {new Date(r.date).toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <h2 className="font-display text-3xl font-semibold mb-2">4.9/5 Average Rating</h2>
          <p className="text-muted-foreground">
            Based on over 120+ reviews across Google and social media.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
