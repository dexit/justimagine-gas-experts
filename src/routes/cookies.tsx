import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [{ title: "Cookie Policy | Just Imagine Ltd" }, { name: "robots", content: "noindex" }],
  }),
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Legal" title="Cookie Policy" subtitle="How we use cookies on our site." />
      <section className="mx-auto max-w-3xl px-5 py-16 prose prose-slate">
        <p>
          This website uses cookies to improve your experience. Cookies are small text files stored
          on your device that help us analyze site traffic and remember your preferences.
        </p>
        <h3 className="text-xl font-semibold mt-8 mb-4">1. Necessary Cookies</h3>
        <p>
          These cookies are essential for the website to function properly. They enable basic
          functions like page navigation and access to secure areas of the website.
        </p>
        <h3 className="text-xl font-semibold mt-8 mb-4">2. Analytics Cookies</h3>
        <p>
          We use services like Google Analytics to understand how visitors interact with our
          website. This helps us improve our content and user experience.
        </p>
        <h3 className="text-xl font-semibold mt-8 mb-4">3. Managing Cookies</h3>
        <p>
          You can choose to disable cookies through your browser settings. However, please note that
          some parts of the website may not function correctly without them.
        </p>
      </section>
    </PageShell>
  );
}
