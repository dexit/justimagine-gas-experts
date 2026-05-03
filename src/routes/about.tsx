import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Award, Users, Heart } from "lucide-react";
import { PageShell, PageHero } from "@/components/PageShell";

export const Route = createFileRoute("/about")({
  head: () => {
    const url = "https://justimagine.ltd/about";
    const title = "About Just Imagine Ltd — Local Gas Safe Heating Engineers in Rugby";
    const desc = "Family-run, Gas Safe registered heating, boiler & plumbing specialists serving homeowners, landlords and letting agents across Rugby, Warwickshire & Coventry.";
    return {
      meta: [
        { title }, { name: "description", content: desc },
        { property: "og:title", content: title }, { property: "og:description", content: desc },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell>
      <PageHero eyebrow="About" title="A small team. A serious craft." subtitle="Just Imagine Ltd was built on one simple idea — do every job like it's in your own home." crumbs={[{ name: "About" }]} />
      <section className="mx-auto max-w-7xl px-5 lg:px-8 py-20 grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3 space-y-5 text-muted-foreground leading-relaxed">
          <p className="text-lg text-foreground">We're a Gas Safe registered heating and plumbing company serving homeowners, landlords and small businesses across the region.</p>
          <p>Our work covers everything from emergency boiler repairs at 2am to full system upgrades, landlord safety certificates, plumbing remedials and ad-hoc manual work for property managers.</p>
          <p>What sets us apart isn't fancy marketing — it's the basics, done properly. We turn up when we say we will. We tidy up after ourselves. We charge fair prices and we explain exactly what we've done and why.</p>
          <p>If something isn't right, we put it right. That's the entire promise.</p>
        </div>
        <div className="lg:col-span-2 grid gap-4">
          {[
            { icon: ShieldCheck, t: "Gas Safe Registered", d: "Every engineer on the official register." },
            { icon: Award, t: "Manufacturer Trained", d: "Worcester, Vaillant, Ideal & more." },
            { icon: Users, t: "Local & Independent", d: "We live and work in the community we serve." },
            { icon: Heart, t: "Customer First", d: "Most of our work comes through repeat clients." },
          ].map((c) => (
            <div key={c.t} className="p-6 rounded-2xl bg-card border border-border flex gap-4">
              <div className="h-11 w-11 rounded-lg bg-gradient-amber flex items-center justify-center flex-shrink-0"><c.icon className="h-5 w-5 text-accent-foreground" /></div>
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
