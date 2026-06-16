import { createFileRoute, Link } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { getPortfolioProject, loadPortfolioProjects } from "@/lib/portfolio-loader";
import { getRelated } from "@/lib/portfolio-types";
import { ArrowLeft, MapPin, Calendar, Award, Phone } from "lucide-react";
import { useState } from "react";
import { Markdown } from "@/components/Markdown";

const loadProject = createServerFn({ method: "GET" })(async (slug: string) => {
  const project = await getPortfolioProject(slug);
  if (!project) throw notFound();
  return project;
});

const loadRelated = createServerFn({ method: "GET" })(async (slug: string) => {
  const project = await getPortfolioProject(slug);
  if (!project) return [];

  const allProjects = await loadPortfolioProjects();
  return getRelated(allProjects, slug, project.category, 3);
});

export const Route = createFileRoute("/work/$slug")({
  head: ({ loaderData: project }) => ({
    meta: [
      { title: `${project.title} | Just Imagine Heating & Plumbing` },
      { name: "description", content: project.metaDescription },
      { property: "og:title", content: project.title },
      { property: "og:description", content: project.metaDescription },
      project.images[0] && { property: "og:image", content: project.images[0] },
    ].filter(Boolean),
  }),
  component: ProjectDetailPage,
  loader: async ({ params }) => {
    const project = await loadProject(params.slug);
    const related = await loadRelated(params.slug);
    return { project, related };
  },
});

function ProjectDetailPage() {
  const { project, related } = Route.useLoaderData();
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);

  return (
    <PageShell>
      {/* Hero with main image */}
      <div className="relative w-full h-96 bg-secondary overflow-hidden">
        {project.images[selectedImageIdx] ? (
          <img
            src={project.images[selectedImageIdx]}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No image available
          </div>
        )}

        {/* Back button */}
        <Button
          asChild
          variant="outline"
          size="icon"
          className="absolute top-6 left-6 bg-background/80 backdrop-blur"
        >
          <Link to="/work">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-5 lg:px-8 py-16">
        {/* Header */}
        <div className="mb-12">
          <span className="text-xs font-mono text-accent bg-accent/10 px-2 py-1 rounded mb-4 inline-block">
            {project.category.replace(/-/g, " ")}
          </span>
          <h1 className="text-4xl font-display font-bold mb-4">{project.title}</h1>

          {/* Meta info */}
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8 p-6 bg-secondary/30 rounded-xl border border-border">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Date</p>
              <p className="font-semibold flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(project.date).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "long",
                })}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Location</p>
              <p className="font-semibold flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {project.location}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Client</p>
              <p className="font-semibold">{project.client}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Result</p>
              <p className="font-semibold flex items-center gap-2">
                <Award className="h-4 w-4" />
                {project.result}
              </p>
            </div>
          </div>
        </div>

        {/* Image gallery */}
        {project.images.length > 0 && (
          <div className="mb-12">
            <div className="flex flex-wrap gap-2">
              {project.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIdx(idx)}
                  className={`relative h-20 w-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImageIdx === idx
                      ? "border-accent scale-105"
                      : "border-border hover:border-accent/50"
                  }`}
                >
                  <img src={img} alt={`${project.title} ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="prose prose-invert max-w-none mb-16">
          <Markdown content={project.content} />
        </div>

        {/* CTA */}
        <div className="p-8 bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl border border-accent/20 mb-16">
          <h3 className="text-2xl font-display font-semibold mb-2">Interested in similar work?</h3>
          <p className="text-muted-foreground mb-6">
            Contact us for a free quote or 24/7 emergency response.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" asChild>
              <Link to="/contact">Request a quote</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href={`tel:07774079152`} className="gap-2">
                <Phone className="h-4 w-4" />
                Call 07774 079152
              </a>
            </Button>
          </div>
        </div>

        {/* Related projects */}
        {related.length > 0 && (
          <div>
            <h2 className="text-3xl font-display font-semibold mb-8">Related Projects</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <a
                  key={p.slug}
                  href={`/work/${p.slug}`}
                  className="group p-6 rounded-xl border border-border hover:border-accent/50 hover:bg-secondary/50 transition-all"
                >
                  {p.images[0] && (
                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="w-full h-32 object-cover rounded-lg mb-4 group-hover:scale-105 transition-transform"
                    />
                  )}
                  <h3 className="font-semibold group-hover:text-accent transition-colors line-clamp-2 mb-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{p.metaDescription}</p>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </PageShell>
  );
}
