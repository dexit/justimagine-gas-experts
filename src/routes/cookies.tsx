import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { BUSINESS } from "@/data/seo";
import { jsonLdScript, breadcrumbJsonLd } from "@/lib/seo";

const LAST_UPDATED = "16 June 2026";

const COOKIE_TABLE = [
  { name: "_ga", provider: "Google Analytics", purpose: "Distinguishes unique users by assigning a randomly generated number", duration: "2 years", type: "Analytics" },
  { name: "_gid", provider: "Google Analytics", purpose: "Stores and updates a unique value for each page visited", duration: "24 hours", type: "Analytics" },
  { name: "_gat", provider: "Google Analytics", purpose: "Used to throttle request rate", duration: "1 minute", type: "Analytics" },
  { name: "_clck", provider: "Microsoft Clarity", purpose: "Persists the Clarity User ID and session", duration: "1 year", type: "Analytics" },
  { name: "_clsk", provider: "Microsoft Clarity", purpose: "Connects multiple page views into a single session recording", duration: "1 day", type: "Analytics" },
  { name: "ji_cookie_consent", provider: "Just Imagine Ltd", purpose: "Stores your cookie consent preference", duration: "1 year", type: "Essential" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h2 className="font-display text-xl font-semibold text-foreground">{title}</h2>
      <div className="text-sm text-muted-foreground leading-relaxed space-y-2">{children}</div>
    </div>
  );
}

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
        title="Cookie Policy"
        subtitle="How and why we use cookies — clearly explained."
        crumbs={[{ name: "Cookie Policy" }]}
      />

      <section className="mx-auto max-w-3xl px-5 lg:px-8 py-16 space-y-10">
        <p className="text-sm text-muted-foreground">
          Last updated: <strong>{LAST_UPDATED}</strong>.
        </p>

        <Section title="What are cookies?">
          <p>
            Cookies are small text files placed on your device when you visit a website. They allow
            the site to remember information about your visit, making your next visit easier and the
            site more useful to you.
          </p>
        </Section>

        <Section title="How we use cookies">
          <p>We use cookies for the following purposes:</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>
              <strong>Essential cookies:</strong> Required for the website to function correctly.
              These include our cookie consent preference.
            </li>
            <li>
              <strong>Analytics cookies:</strong> Help us understand how visitors interact with our
              website. All data is anonymised and aggregated.
            </li>
          </ul>
          <p>We do not use advertising or retargeting cookies.</p>
        </Section>

        <Section title="Third-party cookies">
          <p>We use the following third-party services which may set cookies:</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li>
              <strong>Google Analytics</strong> — to measure site usage and performance.{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">Google Privacy Policy</a>.
            </li>
            <li>
              <strong>Microsoft Clarity</strong> — for anonymised heatmaps and session recordings.{" "}
              <a href="https://privacy.microsoft.com/en-gb/privacystatement" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">Microsoft Privacy Statement</a>.
            </li>
          </ul>
        </Section>

        <Section title="Cookies we use">
          <p>The table below lists specific cookies set on this website:</p>
          <div className="overflow-x-auto mt-3 rounded-xl border border-border">
            <table className="w-full text-xs">
              <thead className="bg-secondary/50">
                <tr>
                  {["Cookie", "Provider", "Purpose", "Duration", "Type"].map((h) => (
                    <th key={h} className="px-4 py-3 text-left font-semibold text-foreground whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COOKIE_TABLE.map((row, i) => (
                  <tr key={row.name} className={i % 2 === 0 ? "bg-background" : "bg-secondary/20"}>
                    <td className="px-4 py-3 font-mono text-foreground">{row.name}</td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{row.provider}</td>
                    <td className="px-4 py-3 text-muted-foreground">{row.purpose}</td>
                    <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{row.duration}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${row.type === "Essential" ? "bg-accent/15 text-accent-foreground" : "bg-secondary text-muted-foreground"}`}>
                        {row.type}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section title="Managing your preferences">
          <p>
            When you first visit our website you are asked to accept or reject non-essential cookies.
            You can change your preference at any time by clearing your browser cookies and
            refreshing the page — the consent banner will reappear.
          </p>
          <p>Browser-level cookie controls:</p>
          <ul className="list-disc list-inside space-y-1 pl-2">
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">Mozilla Firefox</a></li>
            <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">Apple Safari</a></li>
            <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">Microsoft Edge</a></li>
          </ul>
        </Section>

        <Section title="Your privacy rights">
          <p>
            Under UK GDPR you have rights regarding the personal data collected via cookies. See our{" "}
            <Link to="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>{" "}
            for full details, or contact us at{" "}
            <a href={`mailto:${BUSINESS.email}`} className="underline hover:text-foreground">{BUSINESS.email}</a>.
          </p>
        </Section>

        <Section title="Changes to this policy">
          <p>
            We may update this policy from time to time. Changes will be reflected on this page
            with an updated date.
          </p>
        </Section>

        <div className="pt-4 border-t border-border text-sm text-muted-foreground flex flex-wrap gap-4">
          <Link to="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>
          <Link to="/terms" className="underline hover:text-foreground">Terms &amp; Conditions</Link>
          <Link to="/complaints" className="underline hover:text-foreground">Complaints</Link>
        </div>
      </section>
    </PageShell>
  );
}
