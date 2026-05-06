import { Link } from "@tanstack/react-router";
import { Phone, Menu, X, Flame, AlertCircle, ChevronDown, MapPin } from "lucide-react";
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
  { kind: "link", to: "/faq", label: "FAQ" },
  { kind: "link", to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <img src="/logo.svg" alt="Just Imagine Ltd" className="h-9 w-9 rounded-full" />
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
        <div className="lg:hidden border-t border-border bg-background max-h-[calc(100vh-64px)] overflow-y-auto">
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
              className="py-2.5 text-sm font-semibold text-destructive flex items-center gap-2 hover:text-destructive/80 transition-smooth"
            >
              <AlertCircle className="h-4 w-4" />
              Emergency 24/7
            </Link>
            <a
              href="tel:07774079152"
              className="mt-3 py-2.5 px-4 rounded-lg bg-gradient-amber text-center font-semibold text-sm text-accent-foreground hover:opacity-90 transition-smooth"
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
      className="absolute left-0 right-0 top-16 mx-auto max-w-7xl px-5 lg:px-8 animate-in fade-in-0 slide-in-from-top-2 duration-200"
      onMouseLeave={onClose}
    >
      <div className="rounded-2xl bg-popover text-popover-foreground border border-border shadow-elegant p-6 lg:p-8 backdrop-blur-sm">
        {which === "services" && (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
            <div className="col-span-2 lg:col-span-3 flex items-center justify-between mb-4 pb-4 border-b border-border">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                  What we do
                </span>
                <p className="text-sm text-muted-foreground mt-1">Browse our full range of services</p>
              </div>
              <Link to="/services" onClick={onClose} className="text-xs font-semibold text-accent hover:text-accent/80 transition-smooth whitespace-nowrap ml-4">
                View all →
              </Link>
            </div>
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                to="/services/$serviceSlug"
                params={{ serviceSlug: s.slug }}
                onClick={onClose}
                className="group py-3 px-4 -mx-4 rounded-lg hover:bg-secondary/60 transition-all"
              >
                <div className="font-semibold text-sm text-foreground group-hover:text-accent transition-smooth">{s.name}</div>
                <div className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{s.short}</div>
                {s.priceFrom && (
                  <div className="text-xs font-medium text-accent mt-1.5">{s.priceFrom} {s.priceUnit}</div>
                )}
              </Link>
            ))}
          </div>
        )}
        {which === "areas" && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-3">
            <div className="col-span-2 lg:col-span-4 flex items-center justify-between mb-4 pb-4 border-b border-border">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">
                  Where we cover
                </span>
                <p className="text-sm text-muted-foreground mt-1">Serving Rugby, Leamington and surrounding areas</p>
              </div>
              <Link to="/areas" onClick={onClose} className="text-xs font-semibold text-accent hover:text-accent/80 transition-smooth whitespace-nowrap ml-4">
                View all →
              </Link>
            </div>
            {AREAS.map((a) => (
              <Link
                key={a.slug}
                to="/areas/$areaSlug"
                params={{ areaSlug: a.slug }}
                onClick={onClose}
                className="group py-2.5 px-3 -mx-3 rounded-lg hover:bg-secondary/60 transition-all"
              >
                <div className="font-semibold text-sm text-foreground flex items-center gap-1.5 group-hover:text-accent transition-smooth">
                  <MapPin className="h-3.5 w-3.5 opacity-70" />
                  {a.name}
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  {a.postcodes.slice(0, 2).join(" · ")}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
