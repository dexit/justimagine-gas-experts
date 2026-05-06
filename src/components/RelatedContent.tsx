import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SERVICES, AREAS } from "@/data/seo";

type ContentType = "services" | "areas" | "services-and-areas";

interface RelatedContentProps {
  type: ContentType;
  title?: string;
  currentService?: string;
  currentArea?: string;
  limit?: number;
}

export function RelatedContent({
  type,
  title,
  currentService,
  currentArea,
  limit = 6,
}: RelatedContentProps) {
  const relatedServices = SERVICES.filter(s => s.slug !== currentService).slice(0, limit);
  const relatedAreas = AREAS.filter(a => a.slug !== currentArea).slice(0, limit);

  if (type === "services") {
    return (
      <section className="bg-secondary/30 border-t border-border py-12">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-semibold">
              {title || "Other services we offer"}
            </h2>
            <Link to="/services" className="text-sm font-semibold text-accent hover:text-accent/80 inline-flex items-center gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedServices.map(s => (
              <Link
                key={s.slug}
                to="/services/$serviceSlug"
                params={{ serviceSlug: s.slug }}
                className="p-5 rounded-xl bg-card border border-border hover:border-accent/50 hover:shadow-elegant transition-smooth group"
              >
                <h3 className="font-semibold text-sm group-hover:text-accent transition-smooth">
                  {s.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{s.short}</p>
                {s.priceFrom && (
                  <div className="text-xs font-medium text-accent mt-2">From {s.priceFrom}</div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (type === "areas") {
    return (
      <section className="bg-secondary/30 border-t border-border py-12">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-semibold">
              {title || "Other areas we serve"}
            </h2>
            <Link to="/areas" className="text-sm font-semibold text-accent hover:text-accent/80 inline-flex items-center gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedAreas.map(a => (
              <Link
                key={a.slug}
                to="/areas/$areaSlug"
                params={{ areaSlug: a.slug }}
                className="p-5 rounded-xl bg-card border border-border hover:border-accent/50 hover:shadow-elegant transition-smooth group"
              >
                <h3 className="font-semibold text-sm group-hover:text-accent transition-smooth">
                  {a.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {a.postcodes.slice(0, 2).join(" · ")}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-secondary/30 border-t border-border py-12">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-semibold">
              {title || "Explore our services"}
            </h2>
            <Link to="/services" className="text-sm font-semibold text-accent hover:text-accent/80 inline-flex items-center gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedServices.slice(0, 3).map(s => (
              <Link
                key={s.slug}
                to="/services/$serviceSlug"
                params={{ serviceSlug: s.slug }}
                className="p-5 rounded-xl bg-card border border-border hover:border-accent/50 hover:shadow-elegant transition-smooth group"
              >
                <h3 className="font-semibold text-sm group-hover:text-accent transition-smooth">
                  {s.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{s.short}</p>
                {s.priceFrom && (
                  <div className="text-xs font-medium text-accent mt-2">From {s.priceFrom}</div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-secondary/60 border-t border-border py-12">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-semibold">
              Find services in your area
            </h2>
            <Link to="/areas" className="text-sm font-semibold text-accent hover:text-accent/80 inline-flex items-center gap-1">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {relatedAreas.slice(0, 3).map(a => (
              <Link
                key={a.slug}
                to="/areas/$areaSlug"
                params={{ areaSlug: a.slug }}
                className="p-5 rounded-xl bg-card border border-border hover:border-accent/50 hover:shadow-elegant transition-smooth group"
              >
                <h3 className="font-semibold text-sm group-hover:text-accent transition-smooth">
                  {a.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {a.postcodes.slice(0, 2).join(" · ")}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
