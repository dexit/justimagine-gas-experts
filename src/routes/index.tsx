import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Phone,
  ShieldCheck,
  Clock,
  Wrench,
  Flame,
  Droplets,
  FileCheck,
  ArrowRight,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageShell } from "@/components/PageShell";
import heroImg from "@/assets/hero-engineer.jpg";
import { BUSINESS } from "@/data/seo";
import { jsonLdScript, localBusinessJsonLd } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Boiler Installation, Repair & Gas Safety — Rugby & Warwickshire | Just Imagine Ltd" },
      { name: "description", content: "Gas Safe heating engineers in Rugby & Warwickshire. New boilers from £1,895, same-day repair, CP12 landlord certificates from £60, plumbing & 24/7 emergency callouts." },
      { name: "keywords", content: "boiler installation rugby, boiler repair warwickshire, gas safe engineer rugby, CP12 landlord certificate, plumber rugby, emergency heating engineer" },
      { property: "og:title", content: "Just Imagine Ltd — Gas Safe Heating & Plumbing in Rugby & Warwickshire" },
      { property: "og:description", content: "Boilers · Servicing · CP12 · Plumbing · 24/7 emergency response across Warwickshire." },
      { property: "og:url", content: BUSINESS.url },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: BUSINESS.url },
      { rel: "preload", as: "image", href: heroImg, fetchpriority: "high" } as never,
    ],
    scripts: [jsonLdScript(localBusinessJsonLd())],
  }),
  component: Home,
});

const services = [
  {
    icon: Flame,
    title: "Boiler Installation",
    desc: "New boilers from leading brands, fitted by Gas Safe engineers with manufacturer-backed warranties.",
  },
  {
    icon: Wrench,
    title: "Servicing & Repairs",
    desc: "Annual servicing and rapid repairs to keep your heating reliable through the coldest months.",
  },
  {
    icon: ShieldCheck,
    title: "Gas Safety Certificates",
    desc: "Landlord CP12 certificates and full gas safety inspections — booked fast, issued same day.",
  },
  {
    icon: Droplets,
    title: "Heating & Plumbing",
    desc: "Radiators, pipework, leaks, power flushes and full system upgrades — done properly.",
  },
  {
    icon: FileCheck,
    title: "Safety Audits & Assessments",
    desc: "Independent assessments for landlords, agencies and commercial premises.",
  },
  {
    icon: Clock,
    title: "24/7 Emergency Callouts",
    desc: "No heat, no hot water, gas leak? We respond around the clock across the region.",
  },
];

function Home() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-accent/40 blur-3xl" />
          <div className="absolute -bottom-40 -left-20 h-[400px] w-[400px] rounded-full bg-primary/60 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8 pt-16 pb-24 lg:pt-24 lg:pb-32 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-foreground/10 border border-primary-foreground/15 text-xs font-medium text-accent mb-6">
              <ShieldCheck className="h-3.5 w-3.5" /> Gas Safe Registered · 24/7 Callouts
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.02]">
              Heat your home, <span className="text-gradient-amber">safely.</span>
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/75 max-w-xl leading-relaxed">
              Boiler installations, servicing, repairs and certified gas safety work — delivered by
              trusted engineers across your area.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="bg-gradient-amber text-accent-foreground hover:opacity-90 shadow-amber font-semibold"
              >
                <a href="tel:07774079152">
                  <Phone className="h-4 w-4 mr-2" />
                  Call 07774 079152
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link to="/services">
                  Our services <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
              {[
                ["15+", "Years"],
                ["1,200+", "Jobs done"],
                ["24/7", "Callouts"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-3xl text-accent">{n}</div>
                  <div className="text-xs uppercase tracking-wider text-primary-foreground/60 mt-1">
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-amber rounded-3xl opacity-20 blur-2xl" />
            <img src={heroImg} alt="Gas Safe registered engineer servicing a domestic boiler in Rugby, Warwickshire" width={1600} height={1200} fetchPriority="high" decoding="async" className="relative rounded-2xl shadow-elegant w-full object-cover aspect-[4/3]" />
            <div className="absolute -bottom-6 -left-6 bg-card text-card-foreground rounded-xl p-4 shadow-elegant border border-border max-w-[220px]">
              <div className="flex gap-1 text-accent mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="text-sm font-medium leading-snug">
                "On time, tidy, fully explained. Sorted our boiler same day."
              </p>
              <p className="text-xs text-muted-foreground mt-1">— Local homeowner</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Brands */}
      <section className="bg-secondary/30 border-y border-border py-12">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="text-center text-xs uppercase tracking-widest text-muted-foreground mb-8 font-semibold">
            We Install & Service All Leading Brands
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-smooth">
            <span className="text-2xl font-display font-bold">Worcester Bosch</span>
            <span className="text-2xl font-display font-bold">Vaillant</span>
            <span className="text-2xl font-display font-bold">Ideal</span>
            <span className="text-2xl font-display font-bold">Baxi</span>
            <span className="text-2xl font-display font-bold">Glow-worm</span>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-accent-foreground/70 font-medium mb-3">
              What we do
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold max-w-2xl leading-tight">
              A full-service heating & gas team you can rely on.
            </h2>
          </div>
          <Link
            to="/services"
            className="text-sm font-medium text-foreground hover:text-accent-foreground inline-flex items-center gap-2 group"
          >
            All services{" "}
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-smooth" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s) => (
            <div
              key={s.title}
              className="group p-7 rounded-2xl bg-card border border-border hover:border-accent/50 hover:shadow-elegant transition-smooth"
            >
              <div className="h-12 w-12 rounded-xl bg-gradient-amber flex items-center justify-center shadow-amber mb-5 group-hover:scale-105 transition-smooth">
                <s.icon className="h-5.5 w-5.5 text-accent-foreground" strokeWidth={2.2} />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="bg-secondary/60 border-y border-border">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-accent-foreground/70 font-medium mb-3">
                Why Just Imagine
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
                Engineering you can trust, prices that make sense.
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                We're a small, focused team of Gas Safe registered engineers. Every job is properly
                assessed, properly priced and properly finished — no shortcuts, no surprises.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  [
                    "Gas Safe Registered",
                    "Every engineer is certified and on the public register.",
                  ],
                  [
                    "Transparent pricing",
                    "Clear quotes before any work starts. No call-out fees on installs.",
                  ],
                  [
                    "24/7 emergency cover",
                    "Boiler down? Gas concern? We're on the phone day and night.",
                  ],
                  [
                    "Workmanship guaranteed",
                    "All installs and repairs come with a written guarantee.",
                  ],
                ].map(([t, d]) => (
                  <div key={t} className="flex gap-4">
                    <div className="mt-1 h-6 w-6 rounded-full bg-gradient-amber flex items-center justify-center flex-shrink-0">
                      <ShieldCheck className="h-3.5 w-3.5 text-accent-foreground" />
                    </div>
                    <div>
                      <div className="font-semibold">{t}</div>
                      <div className="text-sm text-muted-foreground">{d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative bg-gradient-hero text-primary-foreground rounded-3xl p-10 lg:p-14 shadow-elegant overflow-hidden">
              <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-accent/30 blur-3xl" />
              <div className="relative">
                <Flame className="h-10 w-10 text-accent mb-5" />
                <h3 className="font-display text-3xl font-semibold mb-3">Need help today?</h3>
                <p className="text-primary-foreground/75 mb-8">
                  Speak to an engineer directly. Most problems we can talk through, book in or quote
                  inside 5 minutes.
                </p>
                <div className="space-y-3">
                  <Button
                    asChild
                    size="lg"
                    className="w-full bg-gradient-amber text-accent-foreground hover:opacity-90 font-semibold"
                  >
                    <a href="tel:07774079152">
                      <Phone className="h-4 w-4 mr-2" />
                      07774 079152
                    </a>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="w-full bg-transparent border-primary-foreground/25 text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    <a href="mailto:justimagineheating@gmail.com">Email us</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="mt-20 overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
            <div className="p-8 border-b border-border text-center">
              <h3 className="font-display text-2xl font-semibold">How we compare</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Built for homeowners who value reliability over shortcuts.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Feature</th>
                    <th className="px-6 py-4 font-semibold text-accent">Just Imagine Ltd</th>
                    <th className="px-6 py-4 font-semibold text-muted-foreground">
                      The "Average" Firm
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ["Engineers", "All Gas Safe Registered", "Often uncertified or sub-contracted"],
                    [
                      "Response",
                      "24/7 Direct line to engineer",
                      "Call centers and long wait times",
                    ],
                    ["Pricing", "Fixed, written quotes", "Hidden fees and hourly rates"],
                    ["Warranty", "Up to 12 years manufacturer", "Basic 12-month parts"],
                    ["Tidiness", "Full dust sheets & vacuumed", "Left for the homeowner"],
                  ].map(([f, j, o]) => (
                    <tr key={f}>
                      <td className="px-6 py-4 font-medium">{f}</td>
                      <td className="px-6 py-4 text-foreground/80 font-medium">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="h-4 w-4 text-accent" /> {j}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{o}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
