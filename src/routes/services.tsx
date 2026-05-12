import { createFileRoute } from "@tanstack/react-router";
import {
  Flame,
  Wrench,
  ShieldCheck,
  Droplets,
  FileCheck,
  Clock,
  Thermometer,
  Hammer,
} from "lucide-react";
import { PageShell, PageHero } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { geoMetaTags, serviceJsonLd, jsonLdScript } from "@/lib/seo";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Boiler & Gas Services Rugby, Warwickshire | Just Imagine" },
      {
        name: "description",
        content:
          "Boiler installation, servicing & repair, CP12 gas safety certificates, central heating, power flushing and 24/7 emergency callouts across Rugby & Warwickshire. Gas Safe registered engineers.",
      },
      { property: "og:title", content: "Boiler & Gas Services | Just Imagine Ltd — Rugby, Warwickshire" },
      {
        property: "og:description",
        content:
          "Boiler installation, servicing & repair, CP12, emergency callouts & more. Gas Safe engineers across Rugby & Warwickshire. Honest prices, free quotes.",
      },
      ...geoMetaTags(),
    ],
    scripts: [
      jsonLdScript(
        serviceJsonLd(
          "Heating & Gas Services",
          "Professional boiler installation, servicing, repairs, CP12 gas safety certificates, central heating and 24/7 emergency callouts across Warwickshire. All work carried out by Gas Safe registered engineers."
        )
      ),
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    icon: Flame,
    title: "Boiler Installation",
    points: [
      "Combi, system & regular boilers supplied and fitted",
      "Leading brands: Worcester Bosch, Vaillant, Ideal",
      "Manufacturer warranties up to 12 years",
      "Smart thermostat setup included on most installs",
      "Fixed price quoted and agreed before any work begins",
    ],
  },
  {
    icon: Wrench,
    title: "Boiler Servicing",
    points: [
      "Full annual manufacturer-specification service",
      "Combustion analysis & flue gas test",
      "Magnetic filter clean and system pressure check",
      "Service report & Gas Safe label issued same day",
      "Free 12-month reminder — never miss a service",
    ],
  },
  {
    icon: Thermometer,
    title: "Boiler Repairs",
    points: [
      "Diagnostics on all major makes and models",
      "Common faults diagnosed and fixed in a single visit",
      "Genuine OEM parts used throughout",
      "Fixed price agreed after diagnosis — no surprises",
      "Honest advice if replacement is better value",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Gas Safety Certificates",
    points: [
      "Landlord CP12 certificates from £60",
      "Same-day digital issue to landlord and agent",
      "All gas appliances, flues and pipework tested",
      "Portfolio discounts for 5+ properties",
      "Free 30-day renewal reminder service",
    ],
  },
  {
    icon: FileCheck,
    title: "Safety Audits & Assessments",
    points: [
      "Independent gas inspections for homeowners",
      "HMO and commercial premises audits",
      "Risk assessments & insurance-grade reports",
      "Carbon monoxide testing included",
      "Compliance documentation for licensing",
    ],
  },
  {
    icon: Droplets,
    title: "Plumbing",
    points: [
      "Leaks, burst pipes & emergency isolations",
      "Taps, mixers, showers & pressure valves",
      "Radiator installations and swaps",
      "Power flushing & chemical system cleans",
      "Unvented hot water cylinders (G3 qualified)",
    ],
  },
  {
    icon: Hammer,
    title: "Ad-hoc & Manual Work",
    points: [
      "Pipework alterations and relocations",
      "Appliance removals and refits",
      "Bathroom & kitchen plumbing connections",
      "Outside taps and isolation valves",
      "Site labour by fully certified engineers",
    ],
  },
  {
    icon: Clock,
    title: "24/7 Emergency Callouts",
    points: [
      "No heat or no hot water — rapid same-day response",
      "Suspected gas leaks — make safe and repair",
      "Burst pipes & uncontrolled water leaks",
      "Boiler lockouts, error codes & pressure loss",
      "Real engineer answers — no call centres",
    ],
  },
];

function ServicesPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Services"
        title="Everything heating, gas & plumbing — done properly."
        subtitle="From a leaking tap to a full heating system installation — we handle every job to the same high standard. Gas Safe registered, fully insured, and always cleanly finished."
      />
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-5">
          {services.map((s) => (
            <div
              key={s.title}
              className="p-8 rounded-2xl bg-card border border-border hover:border-accent/50 hover:shadow-elegant transition-smooth"
            >
              <div className="flex items-start gap-5">
                <div className="h-12 w-12 rounded-xl bg-gradient-amber flex items-center justify-center shadow-amber flex-shrink-0">
                  <s.icon className="h-5.5 w-5.5 text-accent-foreground" strokeWidth={2.2} />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl font-semibold mb-3">{s.title}</h3>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    {s.points.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span className="text-accent">›</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 p-10 rounded-3xl bg-gradient-hero text-primary-foreground text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold">
            Not sure what you need?
          </h2>
          <p className="mt-3 text-primary-foreground/75 max-w-xl mx-auto">
            Call us — most jobs we can advise on or quote over the phone in five minutes. No
            obligation, no pressure.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-7 bg-gradient-amber text-accent-foreground hover:opacity-90 font-semibold shadow-amber"
          >
            <a href="tel:07774079152">
              <Phone className="h-4 w-4 mr-2" />
              07774 079152
            </a>
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
