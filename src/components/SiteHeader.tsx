import { Link } from "@tanstack/react-router";
import { Phone, Menu, X, Flame, AlertCircle, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SERVICES, AREAS, NEWS } from "@/data/seo";

type SimpleNav = { kind: "link"; to: string; label: string; exact?: boolean };
type MenuNav = { kind: "menu"; label: string; key: string };
type NavItem = SimpleNav | MenuNav;

const nav: NavItem[] = [
  { kind: "link", to: "/", label: "Home", exact: true },
  { kind: "menu", label: "Services", key: "services" },
  { kind: "menu", label: "Areas", key: "areas" },
  { kind: "link", to: "/landlord", label: "Landlords" },
  { kind: "link", to: "/pricing", label: "Pricing" },
  { kind: "menu", label: "News", key: "news" },
  { kind: "link", to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="h-9 w-9 rounded-full bg-gradient-hero flex items-center justify-center shadow-elegant">
            <Flame className="h-4.5 w-4.5 text-accent" strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg font-semibold tracking-tight">Just Imagine</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Heating · Gas · Plumbing
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1" onMouseLeave={() => setMenu(null)}>
          {nav.map((n) =>
            n.kind === "link" ? (
              <Link
                key={n.label}
                to={n.to}
                onMouseEnter={() => setMenu(null)}
                className="px-3 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-smooth"
                activeProps={{ className: "px-3 py-2 text-sm font-semibold text-foreground" }}
                activeOptions={{ exact: n.exact }}
              >
                {n.label}
              </Link>
            ) : (
              <button
                key={n.key}
                onMouseEnter={() => setMenu(n.key)}
                onClick={() => setMenu(menu === n.key ? null : n.key)}
                className="px-3 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-smooth inline-flex items-center gap-1"
                aria-expanded={menu === n.key}
              >
                {n.label}
                <ChevronDown className="h-3.5 w-3.5 opacity-60" />
              </button>
            ),
          )}
          <Link
            to="/emergency"
            onMouseEnter={() => setMenu(null)}
            className="ml-1 px-3 py-1.5 text-sm font-semibold bg-destructive/10 hover:bg-destructive/20 border border-destructive/30 rounded-full flex items-center gap-1.5 transition-smooth text-destructive"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-destructive animate-pulse" />
            Emergency
          </Link>

          {menu && (
            <MegaPanel which={menu} onClose={() => setMenu(null)} />
          )}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            asChild
            variant="default"
            size="sm"
            className="hidden sm:inline-flex bg-gradient-amber text-accent-foreground hover:opacity-90 shadow-amber font-semibold"
          >
            <a href="tel:07774079152">
              <Phone className="h-4 w-4 mr-2" />
              07774 079152
            </a>
          </Button>
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2" aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="px-5 py-3 flex flex-col">
            {nav.map((n) =>
              n.kind === "link" ? (
                <Link
                  key={n.label}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="py-2.5 text-sm font-medium"
                >
                  {n.label}
                </Link>
              ) : (
                <details key={n.key} className="py-1">
                  <summary className="py-2 text-sm font-medium cursor-pointer list-none flex items-center justify-between">
                    {n.label} <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                  </summary>
                  <div className="pl-3 pb-2 grid gap-1.5">
                    {n.key === "services" &&
                      SERVICES.map((s) => (
                        <Link
                          key={s.slug}
                          to="/services/$serviceSlug"
                          params={{ serviceSlug: s.slug }}
                          onClick={() => setOpen(false)}
                          className="text-sm text-foreground/75 py-1"
                        >
                          {s.name}
                        </Link>
                      ))}
                    {n.key === "areas" &&
                      AREAS.map((a) => (
                        <Link
                          key={a.slug}
                          to="/areas/$areaSlug"
                          params={{ areaSlug: a.slug }}
                          onClick={() => setOpen(false)}
                          className="text-sm text-foreground/75 py-1"
                        >
                          {a.name}
                        </Link>
                      ))}
                    {n.key === "news" && (
                      <>
                        <Link
                          to="/news"
                          onClick={() => setOpen(false)}
                          className="text-sm font-semibold text-foreground py-1"
                        >
                          All articles
                        </Link>
                        {NEWS.slice(0, 4).map((p) => (
                          <Link
                            key={p.slug}
                            to="/news/$slug"
                            params={{ slug: p.slug }}
                            onClick={() => setOpen(false)}
                            className="text-sm text-foreground/75 py-1"
                          >
                            {p.title}
                          </Link>
                        ))}
                      </>
                    )}
                  </div>
                </details>
              ),
            )}
            <Link
              to="/emergency"
              onClick={() => setOpen(false)}
              className="py-2.5 text-sm font-semibold text-destructive flex items-center gap-2"
            >
              <AlertCircle className="h-4 w-4" />
              Emergency 24/7
            </Link>
            <a
              href="tel:07774079152"
              className="mt-3 py-2.5 px-4 rounded-lg bg-gradient-amber text-center font-semibold text-sm text-accent-foreground"
            >
              Call 07774 079152
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function MegaPanel({ which, onClose }: { which: string; onClose: () => void }) {
  return (
    <div
      className="absolute left-0 right-0 top-16 mx-auto max-w-7xl px-5 lg:px-8"
      onMouseLeave={onClose}
    >
      <div className="rounded-2xl bg-popover text-popover-foreground border border-border shadow-elegant p-6 lg:p-8">
        {which === "services" && (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-2">
            <div className="col-span-2 lg:col-span-3 flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                What we do
              </span>
              <Link to="/services" onClick={onClose} className="text-xs font-semibold text-accent">
                All services →
              </Link>
            </div>
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                to="/services/$serviceSlug"
                params={{ serviceSlug: s.slug }}
                onClick={onClose}
                className="group py-2.5 px-3 -mx-3 rounded-lg hover:bg-secondary transition-smooth"
              >
                <div className="font-semibold text-sm group-hover:text-accent">{s.name}</div>
                <div className="text-xs text-muted-foreground line-clamp-1">{s.short}</div>
              </Link>
            ))}
          </div>
        )}
        {which === "areas" && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-2">
            <div className="col-span-2 lg:col-span-4 flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                Where we cover
              </span>
              <Link to="/areas" onClick={onClose} className="text-xs font-semibold text-accent">
                All areas →
              </Link>
            </div>
            {AREAS.map((a) => (
              <Link
                key={a.slug}
                to="/areas/$areaSlug"
                params={{ areaSlug: a.slug }}
                onClick={onClose}
                className="group py-2 px-3 -mx-3 rounded-lg hover:bg-secondary transition-smooth"
              >
                <div className="font-semibold text-sm group-hover:text-accent">{a.name}</div>
                <div className="text-[11px] text-muted-foreground">
                  {a.postcodes.join(" · ")}
                </div>
              </Link>
            ))}
          </div>
        )}
        {which === "news" && (
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold mb-2">
                Latest
              </div>
              <Link
                to="/news"
                onClick={onClose}
                className="text-sm font-semibold text-accent inline-flex items-center gap-1"
              >
                All articles →
              </Link>
            </div>
            <div className="lg:col-span-2 grid gap-3">
              {NEWS.slice(0, 3).map((p) => (
                <Link
                  key={p.slug}
                  to="/news/$slug"
                  params={{ slug: p.slug }}
                  onClick={onClose}
                  className="group py-2 px-3 -mx-3 rounded-lg hover:bg-secondary transition-smooth"
                >
                  <div className="text-[11px] text-muted-foreground">
                    {p.category} · {new Date(p.date).toLocaleDateString("en-GB", {
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                  <div className="font-semibold text-sm group-hover:text-accent">{p.title}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
