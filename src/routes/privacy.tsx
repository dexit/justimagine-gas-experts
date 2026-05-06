import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { BUSINESS } from "@/data/seo";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Just Imagine Ltd — Data Protection" },
      { name: "description", content: "Our privacy policy explains how we collect, use and protect your personal data in compliance with GDPR and UK data protection laws." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Privacy Policy | Just Imagine Ltd" },
      { property: "og:description", content: "Learn how we protect your personal data and comply with GDPR and UK privacy laws." },
    ],
    links: [{ rel: "canonical", href: `${BUSINESS.url}/privacy` }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Legal" title="Privacy Policy" subtitle="How we handle your data." />
      <section className="mx-auto max-w-3xl px-5 py-16 prose prose-slate">
        <p>
          At Just Imagine Ltd, we are committed to protecting your privacy. This policy explains how
          we collect, use, and safeguard your personal information.
        </p>
        <h3 className="text-xl font-semibold mt-8 mb-4">1. Information We Collect</h3>
        <p>
          We collect information you provide directly to us through our enquiry forms, including
          your name, phone number, email address, and property address. This information is used
          solely to provide our services and communicate with you about your enquiry.
        </p>
        <h3 className="text-xl font-semibold mt-8 mb-4">2. Data Usage</h3>
        <p>
          Your data is used to process your service requests, manage your account, and if you agree,
          to email you about other services we think may be of interest to you.
        </p>
        <h3 className="text-xl font-semibold mt-8 mb-4">3. Data Sharing</h3>
        <p>
          We do not share your personal information with third parties except as necessary to
          fulfill our services (e.g., Gas Safe notifications) or as required by law.
        </p>
      </section>
    </PageShell>
  );
}
