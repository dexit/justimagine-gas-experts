import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { PageShell, PageHero } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { loadPortfolioProjects } from "@/lib/portfolio-loader";
import { sortPortfolios } from "@/lib/portfolio-types";
import { MapPin, Calendar, ArrowRight, Image as ImageIcon } from "lucide-react";
import { geoMetaTags } from "@/lib/seo";

const loadProjects = createServerFn({ method: "GET" })(async () => {
  const projects = await loadPortfolioProjects();
  return sortPortfolios(projects);
});

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Recent Boiler & Heating Work in Warwickshire | Just Imagine" },
      {
        name: "description",
        content:
          "Recent boiler installations, system upgrades, power flushes and heating work by Just Imagine Ltd across Rugby, Leamington Spa, Warwick and Warwickshire.",
      },
      ...geoMetaTags(),
      { property: "og:title", content: "Recent Boiler & Heating Work Warwickshire | Just Imagine" },
      {
        property: "og:description",
        content:
          "See our latest boiler installs, heating upgrades and gas safety work across Rugby and Warwickshire. Real jobs, real results.",
      },
    ],
  }),
  component: WorkPage,
  loader: async () => {
    return await loadProjects();
  },
});

function WorkPage() {
  const projects = Route.useLoaderData();

  return (
    <PageShell>
      <PageHero
        eyebrow="Portfolio"
        title="Recent work across Warwickshire."
        subtitle="Real projects, real results. From straightforward boiler swaps to complex commercial systems."
      />

      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="group flex flex-col rounded-2xl border border-border overflow-hidden bg-card hover:border-accent/50 hover:shadow-lg transition-all"
            >
              {/* Image */}
              {project.images.length > 0 ? (
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-48 bg-secondary/30 flex items-center justify-center">
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                </div>
              )}

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                {/* Featured badge */}
                {project.featured && (
                  <span className="mb-2 inline-block text-xs font-mono text-accent bg-accent/10 px-2 py-1 rounded w-fit">
                    Featured
                  </span>
                )}

                <h3 className="font-display text-lg font-semibold mb-2 group-hover:text-accent transition-colors line-clamp-2">
                  {project.title}
                </h3>

                <div className="flex flex-col gap-1 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(project.date).toLocaleDateString("en-GB", { year: "numeric", month: "short" })}</span>
                  </div>
                </div>

                <p className="text-sm leading-relaxed mb-4 flex-1 text-muted-foreground line-clamp-3">
                  {project.metaDescription}
                </p>

                {/* Result badge */}
                <div className="mb-4 p-3 bg-secondary/50 rounded-lg border border-border/50">
                  <p className="text-xs text-muted-foreground mb-1">Result</p>
                  <p className="font-semibold text-sm">{project.result}</p>
                </div>

                {/* View more button */}
                <Button asChild variant="outline" size="sm" className="w-full group">
                  <a href={`/work/${project.slug}`} className="gap-2">
                    <span>View project</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories info */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-16 border-t border-border">
        <h2 className="text-3xl font-display font-semibold mb-8">Expertise Areas</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Heating Installation", desc: "Complete system design & installation" },
            { title: "System Upgrades", desc: "Boiler + radiator replacements" },
            { title: "Commercial Work", desc: "Multi-building projects" },
            { title: "Emergency Repairs", desc: "24/7 same-day response" },
            { title: "Maintenance", desc: "Power flushes & servicing" },
            { title: "Smart Controls", desc: "Modern thermostat systems" },
          ].map((area) => (
            <div key={area.title} className="p-4">
              <h3 className="font-semibold mb-2">{area.title}</h3>
              <p className="text-sm text-muted-foreground">{area.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
