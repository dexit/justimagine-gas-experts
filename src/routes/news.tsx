import { createFileRoute, Link, Outlet, useMatches } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { NEWS, BUSINESS } from "@/data/seo";
import { newsListJsonLd, jsonLdScript } from "@/lib/seo";
import { Calendar, ArrowRight, Tag } from "lucide-react";

export const Route = createFileRoute("/news")({
  component: NewsLayout,
  notFoundComponent: () => <div className="p-10">News section temporarily unavailable.</div>,
});

function NewsLayout() {
  const matches = useMatches();
  const isChild = matches.some((m) => m.routeId === "/news/$slug");
  if (isChild) return <Outlet />;
  return (
    <PageShell>
      <PageHero
        eyebrow="News & insights"
        title="Heating, boilers & landlord news from Warwickshire."
        subtitle="Practical updates for homeowners and landlords across Rugby, Leamington, Warwick and Coventry."
        crumbs={[
          { name: "Home", to: "/" },
          { name: "News", to: "/news" },
        ]}
      />
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-16 md:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {NEWS.map((p) => (
            <article
              key={p.slug}
              className="group flex flex-col p-7 rounded-2xl bg-card border border-border hover:border-accent/50 hover:shadow-elegant transition-smooth"
            >
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(p.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground font-medium">
                  {p.category}
                </span>
                <span className="px-2 py-0.5 rounded-full border border-accent/40 text-accent font-medium uppercase tracking-wider text-[10px]">
                  {p.kind === "faq" ? "FAQ" : p.kind === "howto" ? "How-To" : p.kind === "manual" ? "Manual" : "Article"}
                </span>
              </div>
              <h2 className="font-display text-xl font-semibold leading-snug mb-3 group-hover:text-accent transition-smooth">
                <Link to="/news/$slug" params={{ slug: p.slug }}>
                  {p.title}
                </Link>
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{p.excerpt}</p>
              <Link
                to="/news/$slug"
                params={{ slug: p.slug }}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent"
              >
                Read article <ArrowRight className="h-4 w-4" />
              </Link>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 text-[11px] text-muted-foreground"
                  >
                    <Tag className="h-3 w-3" /> {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
