import { createFileRoute } from "@tanstack/react-router";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { PageShell, PageHero } from "@/components/PageShell";
import { BUSINESS } from "@/data/seo";
import { breadcrumbJsonLd, jsonLdScript, geoMetaTags, localBusinessJsonLd } from "@/lib/seo";

const url = `${BUSINESS.url}/complaints`;

export const Route = createFileRoute("/complaints")({
  head: () => ({
    meta: [
      { title: "Complaints Procedure | Just Imagine Ltd" },
      {
        name: "description",
        content:
          "Our straightforward complaints procedure. If something isn't right, we want to know so we can fix it. Here's how to raise a concern with Just Imagine.",
      },
      { property: "og:title", content: "Complaints Procedure | Just Imagine Ltd" },
      {
        property: "og:description",
        content:
          "If something isn't right, tell us. We take every concern seriously and aim to resolve all complaints within 10 working days.",
      },
      { property: "og:url", content: url },
      { property: "og:image", content: `${BUSINESS.url}/og-default.jpg` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      ...geoMetaTags(),
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      jsonLdScript({
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Complaints Procedure",
        description: "How to raise a concern with Just Imagine Ltd and what to expect from our resolution process.",
        url,
        isPartOf: { "@id": `${BUSINESS.url}/#website` },
        about: { "@id": `${BUSINESS.url}/#business` },
      }),
      jsonLdScript(breadcrumbJsonLd([
        { name: "Home", url: BUSINESS.url },
        { name: "Complaints", url },
      ])),
      jsonLdScript(localBusinessJsonLd()),
    ],
  }),
  component: ComplaintsPage,
});

function ComplaintsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Complaints"
        title="If something isn't right, tell us."
        subtitle="We take every complaint seriously. Here's how to raise a concern and what to expect."
        crumbs={[{ name: "Complaints" }]}
      />

      <section className="mx-auto max-w-3xl px-5 lg:px-8 py-20 space-y-10">
        <div className="space-y-5 text-muted-foreground leading-relaxed">
          <p className="text-lg text-foreground">
            We work hard to get every job right, but we know things can occasionally go wrong.
            When they do, we want to hear about it — quickly and directly — so we can put it
            right.
          </p>
          <p>
            Our complaints procedure is straightforward. We don't hide behind forms or
            automated systems. You contact us, we investigate, and we respond with a clear
            resolution.
          </p>
        </div>

        {/* Steps */}
        <div>
          <h2 className="font-display text-2xl font-semibold mb-6">How to raise a complaint</h2>
          <div className="space-y-4">
            {[
              {
                step: "1",
                title: "Contact us directly",
                body: `Call ${BUSINESS.phone}, email ${BUSINESS.email}, or send a WhatsApp message. Explain the issue and include your name, address, the date of the work, and what went wrong.`,
              },
              {
                step: "2",
                title: "We acknowledge within 2 working days",
                body: "We'll confirm receipt of your complaint and let you know who is handling it. For urgent matters (e.g. safety concerns), we aim to respond the same day.",
              },
              {
                step: "3",
                title: "Investigation",
                body: "We review the job records, speak to the engineer involved, and may arrange a follow-up visit to inspect the work. We'll keep you informed throughout.",
              },
              {
                step: "4",
                title: "Resolution within 10 working days",
                body: "We aim to resolve all complaints within 10 working days. If remedial work is needed, we'll schedule it at a time convenient for you — at no additional cost if the fault is ours.",
              },
              {
                step: "5",
                title: "If you're still not satisfied",
                body: "If you're unhappy with our response, you can escalate to Gas Safe Register (for gas safety concerns) or contact Citizens Advice for independent guidance.",
              },
            ].map((s) => (
              <div key={s.step} className="flex gap-5 p-5 rounded-xl bg-card border border-border">
                <div className="h-9 w-9 rounded-full bg-gradient-amber flex items-center justify-center flex-shrink-0 text-sm font-bold text-accent-foreground">
                  {s.step}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact methods */}
        <div className="p-8 rounded-2xl bg-secondary/50 border border-border">
          <h3 className="font-display text-xl font-semibold mb-4">Contact us about a complaint</h3>
          <div className="space-y-3">
            <a href={`tel:${BUSINESS.phoneE164}`} className="flex items-center gap-3 text-sm font-medium hover:text-accent transition-smooth">
              <Phone className="h-4 w-4 text-accent" /> {BUSINESS.phone}
            </a>
            <a href={`mailto:${BUSINESS.email}`} className="flex items-center gap-3 text-sm font-medium hover:text-accent transition-smooth">
              <Mail className="h-4 w-4 text-accent" /> {BUSINESS.email}
            </a>
            <a
              href={`https://wa.me/${BUSINESS.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm font-medium hover:text-accent transition-smooth"
            >
              <MessageCircle className="h-4 w-4 text-accent" /> WhatsApp
            </a>
          </div>
        </div>

        {/* External bodies */}
        <div className="text-sm text-muted-foreground space-y-2">
          <p className="font-semibold text-foreground">External escalation</p>
          <p>
            <strong>Gas Safe Register:</strong>{" "}
            <a href="https://www.gassaferegister.co.uk" target="_blank" rel="noopener noreferrer" className="underline hover:text-accent">
              gassaferegister.co.uk
            </a>{" "}
            — for concerns about gas safety or the conduct of a Gas Safe registered engineer.
          </p>
          <p>
            <strong>Citizens Advice:</strong>{" "}
            <a href="https://www.citizensadvice.org.uk" target="_blank" rel="noopener noreferrer" className="underline hover:text-accent">
              citizensadvice.org.uk
            </a>{" "}
            — for independent consumer advice and dispute resolution guidance.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
