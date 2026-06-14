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
import { geoMetaTags, jsonLdScript, localBusinessJsonLd, offerCatalogJsonLd, homepageBreadcrumbsJsonLd, relatedLinksJsonLd } from "@/lib/seo";
import { OptimizedImage } from "@/components/OptimizedImage";
import { BrandLogos } from "@/components/BrandLogos";
import { EnquiryForm } from "@/components/EnquiryForm";
import heroImg from "@/assets/hero-engineer.webp";
import heroImgSm from "@/assets/hero-engineer-sm.webp";
import heroImgMd from "@/assets/hero-engineer-md.webp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Just Imagine Ltd | Gas Safe Boiler & Heating Engineers Rugby & Warwickshire" },
      {
        name: "description",
        content:
          "Gas Safe boiler installation, servicing, CP12 certificates & 24/7 emergency callouts in Rugby & Warwickshire. Free fixed quotes.",
      },
      ...geoMetaTags(),
      { property: "og:title", content: "Just Imagine Ltd | Gas Safe Heating Engineers — Rugby & Warwickshire" },
      {
        property: "og:description",
        content:
          "Professional boiler installation, servicing, CP12 certificates & 24/7 emergency cover across Rugby & Warwickshire. Gas Safe registered. Free quotes — 07774 079152.",
      },
    ],
    scripts: [
      jsonLdScript(localBusinessJsonLd()),
      jsonLdScript(offerCatalogJsonLd()),
      jsonLdScript(homepageBreadcrumbsJsonLd()),
      jsonLdScript(relatedLinksJsonLd()),
    ],
  }),
  component: Home,
});

const services: Array<{
  icon: typeof Flame;
  title: string;
  desc: string;
  slug: "boiler-installation" | "boiler-servicing" | "gas-safety-certificate" | "plumbing" | "landlord-gas-safety" | "emergency-callout";
  priceFrom?: string;
}> = [
  {
    icon: Flame,
    title: "Boiler Installation",
    desc: "Old boiler on its last legs? We fit A-rated Worcester, Vaillant and Ideal boilers — fixed price agreed before we start, manufacturer warranties included.",
    slug: "boiler-installation",
    priceFrom: "£2,500",
  },
  {
    icon: Wrench,
    title: "Servicing & Repairs",
    desc: "Annual services that keep your warranty valid and your heating running efficiently. Same-day repairs when things go wrong — without the runaround.",
    slug: "boiler-servicing",
    priceFrom: "£100",
  },
  {
    icon: ShieldCheck,
    title: "Gas Safety Certificates",
    desc: "Landlord CP12 certificates issued the same day. We test every appliance, handle the paperwork, and remind you when they're due again next year.",
    slug: "gas-safety-certificate",
    priceFrom: "£60",
  },
  {
    icon: Droplets,
    title: "Heating & Plumbing",
    desc: "Cold radiators, noisy pipes, leaking taps — we fix heating and plumbing problems quickly, cleanly and without overcharging.",
    slug: "plumbing",
  },
  {
    icon: FileCheck,
    title: "Landlord Packages",
    desc: "Annual CP12, boiler service and priority tenant emergency cover bundled into one fixed price. Portfolio discounts for 5+ properties.",
    slug: "landlord-gas-safety",
  },
  {
    icon: Clock,
    title: "24/7 Emergency Callouts",
    desc: "Boiler out at midnight? Gas smell at 6am? You'll speak to a real engineer straight away — not a call centre. We're on call every hour of every day.",
    slug: "emergency-callout",
  },
];

function Home() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="bg-gradient-hero text-primary-foreground">
        <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-16 pb-24 lg:pt-24 lg:pb-32 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-foreground/10 border border-primary-foreground/15 text-xs font-medium text-accent mb-6">
              <ShieldCheck className="h-3.5 w-3.5" /> Gas Safe Registered · 24/7 Callouts
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.02] text-balance animate-in fade-in slide-in-from-bottom-3 duration-700">
              Trusted Gas Engineers{" "}
              <span className="text-gradient-amber">across Warwickshire.</span>
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/75 max-w-xl leading-relaxed text-balance animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Whether you need a new boiler, an annual service or an emergency fix — we show up
              when we say, do the job properly, and always charge a fair price.
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
            <OptimizedImage
              src={heroImg}
              srcSm={heroImgSm}
              srcMd={heroImgMd}
              alt="Gas Safe engineer servicing a boiler in Rugby"
              width={1600}
              height={1200}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 800px"
              className="rounded-2xl shadow-elegant w-full object-cover aspect-[4/3]"
              lazy={false}
            />
            <div className="absolute -bottom-6 -left-6 bg-card text-card-foreground rounded-xl p-4 shadow-elegant border border-border max-w-[220px]">
              <div className="flex gap-1 text-accent mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="text-sm font-medium leading-snug">
                "Turned up when they said, done in a day, priced exactly as quoted. Brilliant."
              </p>
              <p className="text-xs text-muted-foreground mt-1">— Rugby homeowner</p>
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
          <BrandLogos />
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-accent-foreground/70 font-medium mb-3">
              How we help
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold max-w-2xl leading-tight">
              The heating and gas services you need — handled properly.
            </h2>
          </div>
          <Link
            to="/services"
            className="text-sm font-medium text-foreground hover:text-accent-foreground inline-flex items-center gap-2"
          >
            All services{" "}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <div
              key={s.title}
              style={{ animationDelay: `${i * 100}ms` }}
              className="bento-inner p-7 rounded-2xl bg-card border border-border hover:border-accent/40 hover:shadow-elegant transition-smooth animate-in fade-in slide-in-from-bottom-4 duration-700"
            >
              <div className="h-12 w-12 rounded-xl bg-gradient-amber flex items-center justify-center shadow-amber mb-5">
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
                Why choose us
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
                We get the basics right. Every time.
              </h2>
              <p className="mt-5 text-muted-foreground leading-relaxed">
                At Just Imagine Ltd, we believe getting the basics right is everything — showing up
                when we say, doing the job to a standard we're proud of, and never charging more than
                was quoted. It's a simple promise, kept on every job.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  [
                    "Gas Safe Registered",
                    "Every engineer carries their Gas Safe card and is verifiable on the public register.",
                  ],
                  [
                    "Transparent pricing",
                    "Fixed written quotes before any work starts. No call-out fees on booked jobs.",
                  ],
                  [
                    "24/7 emergency cover",
                    "A real engineer answers day or night — no hold music, no call centres.",
                  ],
                  [
                    "Workmanship guaranteed",
                    "All installations and repairs come with a written guarantee on parts and labour.",
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
            <div className="bg-gradient-hero text-primary-foreground rounded-3xl p-10 lg:p-14 shadow-elegant">
              <Flame className="h-10 w-10 text-accent mb-5" />
              <h3 className="font-display text-3xl font-semibold mb-3">Need us today?</h3>
              <p className="text-primary-foreground/75 mb-8">
                Call us directly — we answer personally. Whether it's an emergency, a routine
                service or a quote, we respond fast and we're honest about what you need.
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
                      "24/7 Direct line to a real engineer",
                      "Call centres and long wait times",
                    ],
                    ["Pricing", "Fixed written quotes, no surprises", "Hidden fees and hourly rates"],
                    ["Warranty", "Up to 12-year manufacturer warranty", "Basic 12-month parts only"],
                    ["Tidiness", "Dust sheets down, hoovered after", "Left for the homeowner"],
                    ["Advice", "Honest — we'll say if repair isn't worth it", "Upselling over honesty"],
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

      {/* Enquiry */}
      <section id="quote" className="mx-auto max-w-7xl px-5 lg:px-8 py-20 md:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-accent-foreground/70 font-medium mb-3">
              Get a quote
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-semibold leading-tight">
              Tell us what's needed — we'll get back to you quickly.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed max-w-lg">
              Most enquiries get a response within 30 minutes during working hours. For
              emergencies, please call{" "}
              <a className="text-accent font-semibold" href="tel:07774079152">
                07774 079152
              </a>{" "}
              directly.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-accent">›</span> Free fixed-price quotes on all installations
              </li>
              <li className="flex gap-2">
                <span className="text-accent">›</span> Same-day CP12 certificates for landlords
              </li>
              <li className="flex gap-2">
                <span className="text-accent">›</span> 24/7 emergency cover across Warwickshire
              </li>
            </ul>
          </div>
          <EnquiryForm />
        </div>
      </section>
    </PageShell>
  );
}
