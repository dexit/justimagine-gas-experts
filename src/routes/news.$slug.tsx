import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { getNews, NEWS, BUSINESS } from "@/data/seo";
import { newsArticleJsonLd, breadcrumbJsonLd, jsonLdScript } from "@/lib/seo";
import { Calendar, ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/news/$slug")({
  loader: ({ params }) => {
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
      links: [{ rel: "canonical", to: url }],
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
