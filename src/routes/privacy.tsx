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
      <PageHero eyebrow="Legal" title="Privacy Policy" subtitle="How we handle your data and comply with GDPR." />
      <section className="mx-auto max-w-3xl px-5 py-16 space-y-8 text-foreground leading-relaxed">
        <div className="prose prose-slate dark:prose-invert prose-headings:font-display prose-headings:font-semibold">
          <p className="text-base">
            Last updated: {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4">1. Who We Are</h3>
          <p>
            Just Imagine Ltd ({"'"}we{"'"}{"'"} or {"'"}us{"'"}) is a Gas Safe and WRAS-approved heating and plumbing service based in Rugby. We are committed to protecting your personal data and complying with the UK General Data Protection Regulation (GDPR) and UK Data Protection Act 2018.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4">2. Data We Collect</h3>
          <p>We collect information directly from you when you:</p>
          <ul>
            <li>Fill in our enquiry form</li>
            <li>Call us or email</li>
            <li>Visit a property for a survey or service</li>
            <li>Pay for our services</li>
          </ul>
          <p className="mt-3">Information collected includes:</p>
          <ul>
            <li>Name, phone number, email, postal address, postcode</li>
            <li>Service requirements and property details</li>
            <li>Preferred date and time for visits</li>
            <li>Payment information (processed securely via third-party providers)</li>
            <li>Any special access requirements or safety concerns you share</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-4">3. How We Use Your Data</h3>
          <p>We use your personal data to:</p>
          <ul>
            <li>Process and fulfil your service request</li>
            <li>Schedule engineer visits and send confirmations</li>
            <li>Provide after-care support and handle any issues</li>
            <li>Issue gas safety certificates (CP12) and other compliance documents</li>
            <li>Send you reminders for annual services and renewals (if you opt in)</li>
            <li>Process payments securely</li>
            <li>Comply with legal obligations (Gas Safe, Health & Safety)</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-4">4. Legal Basis for Processing</h3>
          <p>We process your data based on:</p>
          <ul>
            <li><strong>Performance of contract</strong> — to deliver services you request</li>
            <li><strong>Legal obligation</strong> — to comply with Gas Safe registration, WRAS approval, and UK gas safety laws</li>
            <li><strong>Consent</strong> — for marketing emails if you{"'"}ve opted in</li>
            <li><strong>Legitimate interest</strong> — to improve our service and respond to complaints</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-4">5. Data Sharing</h3>
          <p>We do NOT share your personal data with third parties except when necessary to:</p>
          <ul>
            <li>Complete your service (e.g., scheduling, payment processing)</li>
            <li>Comply with law (e.g., Gas Safe notifications for safety issues)</li>
            <li>Respond to legal requests (court orders, regulatory bodies)</li>
          </ul>
          <p className="mt-3">
            We never sell your data to marketing companies or share it for direct marketing without your explicit consent.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4">6. Data Retention</h3>
          <p>We retain your data for the following periods:</p>
          <ul>
            <li>Enquiry records: 2 years (for service history and complaints)</li>
            <li>Gas safety certificates (CP12): 7 years (legal requirement)</li>
            <li>Payment records: 6 years (tax and legal compliance)</li>
            <li>Call recordings (if any): 30 days</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-4">7. Your Rights Under GDPR</h3>
          <p>You have the right to:</p>
          <ul>
            <li><strong>Access</strong> your personal data</li>
            <li><strong>Rectification</strong> of inaccurate data</li>
            <li><strong>Erasure</strong> ({"'"}right to be forgotten{"'"}) in limited circumstances</li>
            <li><strong>Restrict processing</strong> of your data</li>
            <li><strong>Data portability</strong> — receive a copy in a portable format</li>
            <li><strong>Withdraw consent</strong> to marketing at any time</li>
            <li><strong>Lodge a complaint</strong> with the ICO (Information Commissioner{"'"}s Office)</li>
          </ul>

          <h3 className="text-xl font-semibold mt-8 mb-4">8. Security</h3>
          <p>
            Your data is protected using industry-standard encryption and secure storage. Payment processing is handled by PCI DSS-compliant providers. Staff access is restricted and passwords are required for all systems.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4">9. International Transfers</h3>
          <p>
            We do not transfer your data outside the UK/EU. Any partners we use operate under UK/EU data protection law.
          </p>

          <h3 className="text-xl font-semibold mt-8 mb-4">10. Contact Us</h3>
          <p>
            If you have questions about this policy, wish to exercise your rights, or need to report a data breach:
          </p>
          <ul>
            <li>Email: info@justimagine.ltd</li>
            <li>Phone: 07774 079152</li>
            <li>Address: Just Imagine Ltd, Rugby, CV21 2XY</li>
          </ul>
          <p className="mt-3">
            For complaints about data handling, you can contact the{" "}
            <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
              ICO (Information Commissioner{"'"}s Office)
            </a>
            {" "} directly.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
