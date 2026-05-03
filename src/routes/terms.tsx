import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | Just Imagine Ltd" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Legal" title="Terms of Service" subtitle="The rules of our engagement." />
      <section className="mx-auto max-w-3xl px-5 py-16 prose prose-slate">
        <p>By using our services, you agree to the following terms and conditions.</p>
        <h3 className="text-xl font-semibold mt-8 mb-4">1. Quotes and Pricing</h3>
        <p>
          All quotes provided are valid for 30 days. We provide fixed written quotes after a site
          assessment. Any unforeseen additional work required will be discussed and agreed upon
          before proceeding.
        </p>
        <h3 className="text-xl font-semibold mt-8 mb-4">2. Payment</h3>
        <p>
          Payment is due upon completion of the work unless otherwise agreed in writing. For larger
          installations, a deposit may be required.
        </p>
        <h3 className="text-xl font-semibold mt-8 mb-4">3. Guarantee</h3>
        <p>
          All workmanship is guaranteed for 12 months. Materials and appliances are covered by the
          manufacturer's warranty.
        </p>
      </section>
    </PageShell>
  );
}
