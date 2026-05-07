import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, AlertTriangle, FileCheck, Phone } from "lucide-react";
import { PageShell, PageHero } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { BUSINESS } from "@/data/seo";
import { geoMetaTags, contactActionJsonLd, jsonLdScript, serviceJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/safety")({
  head: () => ({
    meta: [
      { title: "Gas Safety Certificates Rugby & Warwickshire | Just Imagine" },
      {
        name: "description",
        content:
          "CP12 landlord gas safety certificates from £60 in Rugby & Warwickshire. Gas Safe registered engineers. Same-day digital issue, carbon monoxide testing, safety audits for landlords.",
      },
      ...geoMetaTags(),
      { property: "og:title", content: "Gas Safety Certificates Rugby, Warwickshire | Just Imagine" },
      {
        property: "og:description",
        content:
          "Landlord CP12 certificates from £60. Same-day issue, Gas Safe registered, Warwickshire-wide coverage. Free reminders when due for renewal.",
      },
    ],
    links: [{ rel: "canonical", href: `${BUSINESS.url}/safety` }],
    scripts: [
      jsonLdScript(
        serviceJsonLd(
          "Gas Safety Inspections & CP12 Certificates",
          "Professional gas safety inspections, CP12 landlord certificates, homeowner safety checks and commercial audits for HMOs and lettings agencies. All work by Gas Safe registered engineers.",
          undefined,
          "£60"
        )
      ),
      jsonLdScript(contactActionJsonLd()),
    ],
  }),
  component: SafetyPage,
});

const warning = [
  "The smell of gas",
  "Yellow or orange (not blue) boiler flames",
  "Black soot marks around appliances",
  "Excessive condensation in the room",
  "Pilot light blowing out frequently",
  "Headaches, dizziness or nausea when appliances run",
];

function SafetyPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Gas Safety"
        title="Safety isn't optional. It's the whole job."
        subtitle="Carbon monoxide is silent and lethal. We make compliance simple — for landlords, homeowners and commercial premises."
      />
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-20 grid lg:grid-cols-3 gap-6">
        {[
          {
            icon: FileCheck,
            title: "Landlord CP12 Certificates",
            body: "Annual gas safety inspections required by law for all rented properties. Every gas appliance, flue and pipework checked, certificate issued the same day where possible.",
          },
          {
            icon: ShieldCheck,
            title: "Homeowner Safety Checks",
            body: "Peace of mind for your family. We test every gas appliance, check for CO risks, and give you a clear written report.",
          },
          {
            icon: AlertTriangle,
            title: "Commercial Audits",
            body: "Independent gas safety audits for HMOs, lettings agencies, holiday lets and commercial kitchens. Insurance-grade documentation.",
          },
        ].map((c) => (
          <div key={c.title} className="p-8 rounded-2xl bg-card border border-border">
            <div className="h-12 w-12 rounded-xl bg-gradient-amber flex items-center justify-center shadow-amber mb-5">
              <c.icon className="h-5.5 w-5.5 text-accent-foreground" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2">{c.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{c.body}</p>
          </div>
        ))}
      </section>

      <section className="bg-secondary/60 border-y border-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-destructive font-medium mb-3">
              Warning signs
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
              If you notice any of these — call us today.
            </h2>
            <p className="mt-5 text-muted-foreground">
              Carbon monoxide poisoning can happen with no smell and no warning. If in doubt, switch
              the appliance off and ventilate the room.
            </p>
          </div>
          <div className="bg-card border border-border rounded-2xl p-8">
            <ul className="space-y-3">
              {warning.map((w) => (
                <li key={w} className="flex gap-3 items-start">
                  <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                  <span className="text-sm">{w}</span>
                </li>
              ))}
            </ul>
            <Button
              asChild
              size="lg"
              className="w-full mt-6 bg-gradient-amber text-accent-foreground hover:opacity-90 font-semibold shadow-amber"
            >
              <a href="tel:07774079152">
                <Phone className="h-4 w-4 mr-2" />
                Call 07774 079152 now
              </a>
            </Button>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
