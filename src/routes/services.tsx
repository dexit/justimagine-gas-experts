import { createFileRoute } from "@tanstack/react-router";
import { Flame, Wrench, ShieldCheck, Droplets, FileCheck, Clock, Thermometer, Hammer } from "lucide-react";
import { PageShell, PageHero } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => {
    const url = "https://justimagine.ltd/services";
    const title = "Heating, Boiler & Plumbing Services in Rugby & Warwickshire | Just Imagine";
    const desc = "Full Gas Safe service list — boiler installation, repair, servicing, CP12 landlord certificates, central heating, plumbing & 24/7 emergency callouts across Warwickshire.";
    return {
      meta: [
        { title }, { name: "description", content: desc },
        { property: "og:title", content: title }, { property: "og:description", content: desc },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: ServicesPage,
});

const services = [
  { icon: Flame, title: "Boiler Installation", points: ["Combi, system & regular boilers", "Leading brands: Worcester, Vaillant, Ideal", "Manufacturer warranties up to 12 years", "Smart thermostat setup included"] },
  { icon: Wrench, title: "Boiler Servicing", points: ["Full annual service", "Manufacturer-spec checks", "Flue & combustion test", "Service report issued same day"] },
  { icon: Thermometer, title: "Boiler Repairs", points: ["Diagnostics on all major makes", "Common faults fixed in one visit", "Genuine parts only", "Honest replacement advice if needed"] },
  { icon: ShieldCheck, title: "Gas Safety Certificates", points: ["Landlord CP12 certificates", "Same-day issue available", "All gas appliances tested", "Letting agency packages"] },
  { icon: FileCheck, title: "Safety Audits & Assessments", points: ["Independent gas inspections", "Commercial premises", "Risk assessments & reports", "Compliance for HMOs"] },
  { icon: Droplets, title: "Plumbing", points: ["Leaks, taps, valves & pipework", "Radiator installs & swaps", "Power flushing", "Hot water cylinders"] },
  { icon: Hammer, title: "Ad-hoc Manual Work", points: ["Removals, refits & relocations", "Pipework alterations", "Bathroom & kitchen plumbing", "Site labour by certified hands"] },
  { icon: Clock, title: "24/7 Emergency Callouts", points: ["No heat or hot water", "Suspected gas leaks", "Burst pipes & flooding", "Rapid response, day or night"] },
];

function ServicesPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Services" title="Everything heating, gas & plumbing — under one roof." subtitle="From a quick washer change to a full boiler swap, we handle the lot. Properly certified, properly insured, properly finished." crumbs={[{ name: "Services" }]} />
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-5">
          {services.map((s) => (
            <div key={s.title} className="p-8 rounded-2xl bg-card border border-border hover:border-accent/50 hover:shadow-elegant transition-smooth">
              <div className="flex items-start gap-5">
                <div className="h-12 w-12 rounded-xl bg-gradient-amber flex items-center justify-center shadow-amber flex-shrink-0">
                  <s.icon className="h-5.5 w-5.5 text-accent-foreground" strokeWidth={2.2} />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl font-semibold mb-3">{s.title}</h3>
                  <ul className="space-y-1.5 text-sm text-muted-foreground">
                    {s.points.map((p) => <li key={p} className="flex gap-2"><span className="text-accent">›</span>{p}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 p-10 rounded-3xl bg-gradient-hero text-primary-foreground text-center">
          <h2 className="font-display text-3xl md:text-4xl font-semibold">Not sure what you need?</h2>
          <p className="mt-3 text-primary-foreground/75 max-w-xl mx-auto">Give us a quick call. Most jobs we can quote on the phone in minutes.</p>
          <Button asChild size="lg" className="mt-7 bg-gradient-amber text-accent-foreground hover:opacity-90 font-semibold shadow-amber">
            <a href="tel:07774079152"><Phone className="h-4 w-4 mr-2" />07774 079152</a>
          </Button>
        </div>
      </section>
    </PageShell>
  );
}
