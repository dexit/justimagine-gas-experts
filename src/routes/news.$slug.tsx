import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { getNews, NEWS, BUSINESS, type NewsPost } from "@/data/seo";
import { newsArticleJsonLd, breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";
import { Calendar, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/news/$slug")({
  loader: ({ params }): { post: NewsPost } => {
    const post = getNews(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { post } = loaderData;
    const url = `${BUSINESS.url}/news/${post.slug}`;
    return {
      meta: [
        { title: `${post.title} | Just Imagine Ltd` },
        { name: "description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "article:published_time", content: post.date },
        { property: "article:section", content: post.category },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        jsonLdScript(newsArticleJsonLd(post)),
        jsonLdScript(
          breadcrumbJsonLd([
            { name: "Home", url: BUSINESS.url },
            { name: "News", url: `${BUSINESS.url}/news` },
            { name: post.title, url },
          ]),
        ),
      ],
    };
  },
  component: NewsPostPage,
  notFoundComponent: () => (
    <PageShell>
      <PageHero eyebrow="404" title="Article not found" />
    </PageShell>
  ),
});

function NewsPostPage() {
  const { post } = Route.useLoaderData();
  const others = NEWS.filter((n) => n.slug !== post.slug).slice(0, 2);
  return (
    <PageShell>
      <PageHero
        eyebrow={post.category}
        title={post.title}
        subtitle={post.excerpt}
        crumbs={[
          { name: "Home", to: "/" },
          { name: "News", to: "/news" },
          { name: post.title, to: `/news/${post.slug}` },
        ]}
      />
      <article className="mx-auto max-w-3xl px-5 lg:px-8 py-16">
        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-8">
          <Calendar className="h-4 w-4" />
          {new Date(post.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
          <span>·</span>
          <span>{post.author}</span>
        </div>
        <div className="prose prose-lg max-w-none">
          {post.body.map((p, i) => (
            <p key={i} className="text-foreground/85 leading-relaxed mb-5">
              {p}
            </p>
          ))}
        </div>

        {post.kind === "faq" && post.faqs && (
          <div className="mt-8 space-y-3">
            {post.faqs.map((f, i) => (
              <details
                key={i}
                className="group rounded-xl border border-border bg-card p-5 open:shadow-elegant focus-within:ring-2 focus-within:ring-ring"
              >
                <summary className="cursor-pointer list-none font-semibold text-base flex items-start justify-between gap-4">
                  <span>{f.q}</span>
                  <span className="text-accent text-xl leading-none transition-transform group-open:rotate-45 motion-reduce:transition-none">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        )}

        {post.kind === "howto" && post.howto && (
          <div className="mt-8">
            {(post.howto.tools?.length || post.howto.totalTime) && (
              <div className="rounded-xl border border-border bg-secondary/50 p-5 mb-8 text-sm">
                {post.howto.totalTime && (
                  <div>
                    <strong className="font-semibold">Time:</strong>{" "}
                    {post.howto.totalTime.replace("PT", "").replace("M", " minutes")}
                  </div>
                )}
                {post.howto.tools && post.howto.tools.length > 0 && (
                  <div className="mt-1">
                    <strong className="font-semibold">You'll need:</strong>{" "}
                    {post.howto.tools.join(", ")}
                  </div>
                )}
              </div>
            )}
            <ol className="space-y-5">
              {post.howto.steps.map((s, i) => (
                <li
                  key={i}
                  id={`step-${i + 1}`}
                  className="flex gap-4 p-5 rounded-xl border border-border bg-card"
                >
                  <span className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-amber text-accent-foreground font-display font-bold text-sm flex items-center justify-center shadow-amber">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold mb-1">{s.name}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
                    {s.warning && (
                      <p className="mt-2 text-xs text-destructive font-medium">⚠ {s.warning}</p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        )}

        {post.kind === "manual" && post.sections && (
          <div className="mt-8 space-y-6">
            {post.sections.map((sec, i) => (
              <section key={i} className="p-6 rounded-xl border border-border bg-card">
                <h2 className="font-display text-xl font-semibold mb-3">{sec.heading}</h2>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {sec.body.map((b, j) => (
                    <li key={j} className="flex gap-2">
                      <span className="text-accent">›</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
        <div className="mt-10 pt-8 border-t border-border">
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent"
          >
            <ArrowLeft className="h-4 w-4" /> All news
          </Link>
        </div>
      </article>
      {others.length > 0 && (
        <section className="bg-secondary/40 border-t border-border py-16">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <h2 className="font-display text-2xl font-semibold mb-6">More from our team</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  to="/news/$slug"
                  params={{ slug: p.slug }}
                  className="p-6 rounded-xl bg-card border border-border hover:border-accent/50 transition-smooth"
                >
                  <div className="text-xs text-muted-foreground mb-2">{p.category}</div>
                  <div className="font-display text-lg font-semibold">{p.title}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageShell>
  );
}
