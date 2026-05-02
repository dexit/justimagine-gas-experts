import { Link } from "@tanstack/react-router";
import { Phone, Menu, X, Flame } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/safety", label: "Gas Safety" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="h-9 w-9 rounded-full bg-gradient-hero flex items-center justify-center shadow-elegant">
            <Flame className="h-4.5 w-4.5 text-accent" strokeWidth={2.5} />
          </div>
          <div className="leading-tight">
            <div className="font-display text-lg font-semibold tracking-tight">Just Imagine</div>
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Heating · Gas · Plumbing</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-4 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-smooth"
              activeProps={{ className: "px-4 py-2 text-sm font-semibold text-foreground" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="default" size="sm" className="hidden sm:inline-flex bg-gradient-amber text-accent-foreground hover:opacity-90 shadow-amber font-semibold">
            <a href="tel:07774079152"><Phone className="h-4 w-4 mr-2" />07774 079152</a>
          </Button>
          <button onClick={() => setOpen(!open)} className="lg:hidden p-2" aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="px-5 py-3 flex flex-col">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)} className="py-2.5 text-sm font-medium">
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
