import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { AREAS, BUSINESS } from "@/data/seo";
import { breadcrumbJsonLd, jsonLdScript, geoMetaTags, areasListJsonLd } from "@/lib/seo";
import { MapPin } from "lucide-react";

export const Route = createFileRoute("/areas/")({
  head: () => {
    const url = `${BUSINESS.url}/areas`;
    return {
      meta: [
        { title: "Gas Engineers Near You — Rugby & Warwickshire | Just Imagine" },
        {
          name: "description",
          content:
            "Gas Safe boiler and heating engineers covering Rugby, Leamington Spa, Warwick, Kenilworth, Stratford-upon-Avon, Coventry & across Warwickshire. Same-day emergency cover available.",
        },
        ...geoMetaTags("Warwickshire"),
        { property: "og:title", content: "Gas Engineers Near You — Rugby & Warwickshire | Just Imagine" },
        {
          property: "og:description",
          content:
            "Find your local Gas Safe heating engineer across Rugby, Leamington, Warwick, Coventry and Warwickshire. Boilers, CP12 certificates, 24/7 emergency cover.",
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
        jsonLdScript(areasListJsonLd()),
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
        title="Local gas engineers across Warwickshire"
        subtitle="Based in Rugby, we cover the whole county — from Stratford to Coventry, Kenilworth to Northampton. Same Gas Safe team, same honest pricing, wherever you are."
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
