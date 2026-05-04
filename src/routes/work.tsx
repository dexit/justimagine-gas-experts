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
    desc: "Replaced an aging, inefficient regular boiler with a new Worcester Bosch 8000 Life. Improved hot water flow and cut bills.",
    icon: Hammer,
  },
  {
    title: "Emergency Power Flush",
    area: "Leamington Spa",
    date: "Jan 2024",
    desc: "Full system cleanse for a property with cold radiators. Restored heat output and protected the heat exchanger.",
    icon: Camera,
  },
  {
    title: "Landlord Portfolio Compliance",
    area: "Warwick",
    date: "Ongoing",
    desc: "Managing annual gas safety (CP12) and servicing for a local agency's 15-property portfolio.",
    icon: Calendar,
  },
  {
    title: "Unvented Cylinder Install",
    area: "Kenilworth",
    date: "Dec 2023",
    desc: "Installed a high-pressure unvented hot water cylinder for a 3-bathroom family home.",
    icon: MapPin,
  },
];

function WorkPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Portfolio"
        title="Latest projects & callouts."
        subtitle="A look at what we've been up to recently across the county."
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
