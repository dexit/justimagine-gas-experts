import { Link } from "@tanstack/react-router";
import { Phone, Menu, X, Flame, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";

const nav = [
  { to: "/", label: "Home", exact: true },
  { to: "/services", label: "Services", exact: false },
  { to: "/landlord", label: "Landlords", exact: false },
  { to: "/pricing", label: "Pricing", exact: false },
  { to: "/work", label: "Our Work", exact: false },
  { to: "/reviews", label: "Reviews", exact: false },
  { to: "/areas", label: "Areas", exact: false },
  { to: "/contact", label: "Contact", exact: false },
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
            <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Heating · Gas · Plumbing
            </div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="px-3 py-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-smooth"
              activeProps={{ className: "px-3 py-2 text-sm font-semibold text-foreground" }}
              activeOptions={{ exact: n.exact }}
            >
              {n.label}
            </Link>
          ))}
          <Link
            to="/emergency"
            className="ml-1 px-3 py-1.5 text-sm font-semibold text-destructive-foreground bg-destructive/10 hover:bg-destructive/20 border border-destructive/30 rounded-full flex items-center gap-1.5 transition-smooth"
            activeProps={{ className: "ml-1 px-3 py-1.5 text-sm font-semibold text-destructive bg-destructive/20 border border-destructive/40 rounded-full flex items-center gap-1.5" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-destructive animate-pulse" />
            Emergency
          </Link>
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
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="py-2.5 text-sm font-medium"
              >
                {n.label}
              </Link>
            ))}
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
