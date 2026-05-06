import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { ArrowLeft } from "lucide-react";
import { BUSINESS } from "@/data/seo";
import { jsonLdScript, breadcrumbJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/cookies")({
  component: CookiesPage,
  head: () => ({
    meta: [
      { title: "Cookie Policy | Gas Engineer Heating Services | Just Imagine" },
      { name: "description", content: "Our transparent cookie policy explains how we use cookies to improve your experience. GDPR compliant. Read our full privacy and cookie settings." },
      { property: "og:title", content: "Cookie Policy | Just Imagine Ltd" },
      { property: "og:description", content: "Learn how we use cookies and your privacy rights under GDPR. Transparent cookie policy for Just Imagine Ltd." },
    ],
    links: [{ rel: "canonical", href: `${BUSINESS.url}/cookies` }],
    scripts: [
      jsonLdScript(
        breadcrumbJsonLd([
          { name: "Home", url: BUSINESS.url },
          { name: "Cookies Policy", url: `${BUSINESS.url}/cookies` },
        ]),
      ),
    ],
  }),
});

function CookiesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Transparency"
        title="Cookies Policy"
        subtitle="How we use cookies to improve your experience"
        crumbs={[
          { name: "Home", to: "/" },
          { name: "Cookies", to: "/cookies" },
        ]}
      />

      <article className="mx-auto max-w-3xl px-5 lg:px-8 py-16 prose prose-lg max-w-none">
        <h2>What are cookies?</h2>
        <p>
          Cookies are small text files stored on your device when you visit a website. They help us understand how you use our site and improve your experience.
        </p>

        <h2>How we use cookies</h2>
        <p>We use cookies for the following purposes:</p>
        <ul>
          <li><strong>Essential cookies:</strong> Required for basic site functionality (authentication, form submissions)</li>
          <li><strong>Analytics cookies:</strong> Help us understand how visitors use our site to improve performance</li>
          <li><strong>Preference cookies:</strong> Remember your settings (dark mode, language)</li>
          <li><strong>Marketing cookies:</strong> Track campaign performance and visitor journeys</li>
        </ul>

        <h2>Third-party cookies</h2>
        <p>
          We use cookies from trusted third parties including Google Analytics and Facebook Pixel to understand how visitors use our services and for marketing purposes. These providers may use this data in accordance with their own privacy policies.
        </p>

        <h2>Your cookie choices</h2>
        <p>
          Most browsers allow you to control cookie settings. You can choose to:
        </p>
        <ul>
          <li>Accept all cookies</li>
          <li>Reject non-essential cookies</li>
          <li>Delete cookies from your device</li>
          <li>Set your browser to warn you before accepting cookies</li>
        </ul>
        <p>
          Note that disabling certain cookies may affect your ability to use some features of this website.
        </p>

        <h2>Specific cookies we use</h2>
        <table>
          <thead>
            <tr>
              <th>Cookie Name</th>
              <th>Purpose</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>_ga</td>
              <td>Google Analytics (visitor tracking)</td>
              <td>2 years</td>
            </tr>
            <tr>
              <td>_gid</td>
              <td>Google Analytics (session ID)</td>
              <td>24 hours</td>
            </tr>
            <tr>
              <td>theme_preference</td>
              <td>Dark/Light mode preference</td>
              <td>1 year</td>
            </tr>
          </tbody>
        </table>

        <h2>Your privacy rights</h2>
        <p>
          Under GDPR and UK data protection law, you have the right to:
        </p>
        <ul>
          <li>Access the personal data we hold about you</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Object to processing of your data</li>
          <li>Request restriction of processing</li>
        </ul>

        <h2>Contact us about cookies</h2>
        <p>
          If you have questions about our cookie policy or wish to exercise your privacy rights, please contact us:
        </p>
        <ul>
          <li><strong>Email:</strong> <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a></li>
          <li><strong>Phone:</strong> <a href={`tel:${BUSINESS.phoneE164}`}>{BUSINESS.phone}</a></li>
        </ul>

        <h2>Policy changes</h2>
        <p>
          We may update this cookie policy from time to time. Changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically.
        </p>

        <p className="text-sm text-muted-foreground">
          <em>Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}</em>
        </p>
      </article>

      <div className="mx-auto max-w-3xl px-5 lg:px-8 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-accent"
        >
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>
      </div>
    </PageShell>
  );
}
