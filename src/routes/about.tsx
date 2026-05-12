import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Award, MapPin, MessageSquare } from "lucide-react";
import { PageShell, PageHero } from "@/components/PageShell";
import { geoMetaTags } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Just Imagine Ltd | Gas Safe Heating Engineers Rugby, Warwickshire" },
      {
        name: "description",
        content:
          "Gas Safe registered boiler and heating engineers based in Rugby, Warwickshire. We show up on time, do the job properly and charge a fair price. 15+ years, 1,200+ jobs, 24/7 emergency cover.",
      },
      ...geoMetaTags(),
      { property: "og:title", content: "About Just Imagine Ltd | Gas Safe Heating Engineers Rugby" },
      {
        property: "og:description",
        content:
          "Local, independent Gas Safe heating engineers in Rugby. Honest pricing, certified engineers, 24/7 emergency cover across Warwickshire. No call centres, no surprises.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About us"
        title="We get the basics right. Every job."
        subtitle="Showing up when we say, doing the job properly, and always charging a fair price — that's been our whole approach since day one."
      />
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-20 grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3 space-y-5 text-muted-foreground leading-relaxed">
          <p className="text-lg text-foreground">
            We're a Gas Safe registered heating and plumbing company based in Rugby, serving
            homeowners, landlords and letting agents across Warwickshire.
          </p>
          <p>
            We cover everything from 2am emergency boiler repairs to full heating system
            installations, annual servicing, landlord CP12 certificates, power flushes and
            ad-hoc plumbing for property managers — handled directly by our own engineers,
            never sub-contracted.
          </p>
          <p>
            What you won't find here is call centres, mystery pricing or unexpected charges. We
            turn up when we say we will, keep the place tidy, explain exactly what we've done
            and why, and charge the price that was agreed before we started.
          </p>
          <p>
            At Just Imagine Ltd, we believe getting the basics right is everything. Fair pricing,
            friendly service and genuine reliability — on every job, every time.
          </p>
          <p className="text-foreground font-medium">
            If something isn't right, we put it right. That's the entire promise.
          </p>
        </div>
        <div className="lg:col-span-2 grid gap-4">
          {[
            {
              icon: ShieldCheck,
              t: "Gas Safe Registered",
              d: "Every engineer carries their Gas Safe card and is verifiable on the public register.",
            },
            {
              icon: Award,
              t: "Manufacturer Trained",
              d: "Accredited by Worcester Bosch and Vaillant — so your boiler warranty stays valid.",
            },
            {
              icon: MapPin,
              t: "Based in Rugby",
              d: "We know the area inside out. No call centres, no nationals — just a local team you can reach directly.",
            },
            {
              icon: MessageSquare,
              t: "Always Honest",
              d: "If something isn't worth fixing, we'll tell you. No upselling, no hidden extras — just straight advice.",
            },
          ].map((c) => (
            <div key={c.t} className="p-6 rounded-2xl bg-card border border-border flex gap-4">
              <div className="h-11 w-11 rounded-lg bg-gradient-amber flex items-center justify-center flex-shrink-0">
                <c.icon className="h-5 w-5 text-accent-foreground" />
              </div>
              <div>
                <div className="font-semibold">{c.t}</div>
                <div className="text-sm text-muted-foreground">{c.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
