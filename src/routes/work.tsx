import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/PageShell";
import { Hammer, Camera, MapPin, Calendar } from "lucide-react";
import { geoMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Recent Boiler & Heating Work in Warwickshire | Just Imagine" },
      {
        name: "description",
        content:
          "Recent boiler installations, system upgrades, power flushes and landlord compliance work by Just Imagine Ltd across Rugby, Leamington Spa, Warwick and Warwickshire.",
      },
      ...geoMetaTags(),
      { property: "og:title", content: "Recent Boiler & Heating Work Warwickshire | Just Imagine" },
      {
        property: "og:description",
        content:
          "See our latest boiler installs, heating upgrades and gas safety work across Rugby and Warwickshire. Real jobs, real results.",
      },
    ],
  }),
  component: WorkPage,
});

const projects = [
  {
    title: "Worcester Bosch Combi Swap",
    area: "Rugby",
    date: "Feb 2024",
    desc: "Replaced an aging, inefficient regular boiler with a new Worcester Bosch 8000 Life. In and out in a single day — improved hot water pressure, lower bills and a 10-year warranty to boot.",
    icon: Hammer,
  },
  {
    title: "Emergency Power Flush",
    area: "Leamington Spa",
    date: "Jan 2024",
    desc: "Called in for cold radiators and a noisy boiler. Carried out a full chemical power flush, cleared years of magnetite sludge, and had the system running efficiently the same day.",
    icon: Camera,
  },
  {
    title: "Landlord Portfolio Compliance",
    area: "Warwick",
    date: "Ongoing",
    desc: "Managing annual CP12 gas safety certificates and boiler servicing for a local letting agency's 15-property portfolio. Digital certificates issued same day, all renewal reminders handled for the agent.",
    icon: Calendar,
  },
  {
    title: "Unvented Cylinder Install",
    area: "Kenilworth",
    date: "Dec 2023",
    desc: "Supplied and installed a G3-qualified unvented hot water cylinder for a 3-bathroom family home. Fully certified, Building Regs notified, and the family had mains-pressure hot water the same afternoon.",
    icon: MapPin,
  },
];

function WorkPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Portfolio"
        title="Recent work across Warwickshire."
        subtitle="From straightforward boiler swaps to landlord portfolio compliance — here's what we've been working on."
      />
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((p, i) => (
            <div
              key={i}
              className="group p-8 rounded-3xl bg-card border border-border hover:border-accent/50 hover:shadow-elegant transition-smooth"
            >
              <div className="h-12 w-12 rounded-xl bg-gradient-amber flex items-center justify-center shadow-amber mb-6 group-hover:scale-105 transition-smooth">
                <p.icon className="h-6 w-6 text-accent-foreground" />
              </div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-display text-2xl font-semibold">{p.title}</h3>
                <span className="text-xs font-mono text-accent bg-accent/10 px-2 py-1 rounded">
                  {p.date}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 font-medium">
                <MapPin className="h-4 w-4" /> {p.area}
              </div>
              <p className="text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
