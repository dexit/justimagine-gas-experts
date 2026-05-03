import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { AREAS, BUSINESS } from "@/data/seo";
import { breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";
import { MapPin } from "lucide-react";

export const Route = createFileRoute("/areas/")({
  head: () => {
    const url = `${BUSINESS.url}/areas`;
    return {
      meta: [
        { title: "Areas We Cover — Rugby, Warwickshire & Coventry | Just Imagine" },
        {
          name: "description",
          content:
            "Gas Safe heating, boiler & plumbing engineers covering Rugby, Leamington Spa, Warwick, Kenilworth, Stratford, Coventry, Nuneaton and all of Warwickshire.",
        },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        jsonLdScript(
          breadcrumbJsonLd([
            { name: "Home", url: BUSINESS.url },
            { name: "Areas", url },
          ]),
        ),
      ],
    };
  },
  component: AreasIndex,
});

function AreasIndex() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Coverage"
        title="Local heating engineers across Warwickshire"
        subtitle="From Rugby to Stratford-upon-Avon — same Gas Safe team, same fair pricing, same day where possible."
        crumbs={[{ name: "Areas" }]}
      />
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {AREAS.map((a) => (
            <Link
              key={a.slug}
              to="/areas/$areaSlug"
              params={{ areaSlug: a.slug }}
              className="p-6 rounded-2xl bg-card border border-border hover:border-accent/50 hover:shadow-elegant transition-smooth"
            >
              <div className="flex items-center gap-2 text-accent mb-2">
                <MapPin className="h-4 w-4" />
                <span className="text-xs uppercase tracking-wider">{a.county}</span>
              </div>
              <h3 className="font-display text-2xl font-semibold">{a.name}</h3>
              <div className="text-xs text-muted-foreground mt-1 font-mono">
                {a.postcodes.join(" · ")}
              </div>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{a.blurb}</p>
            </Link>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
