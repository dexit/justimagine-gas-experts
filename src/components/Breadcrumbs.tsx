import { Link } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";

export interface Crumb { name: string; to?: string; }

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-primary-foreground/70">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link to="/" className="inline-flex items-center gap-1 hover:text-accent">
            <Home className="h-3 w-3" /> Home
          </Link>
        </li>
        {items.map((c, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight className="h-3 w-3 opacity-50" />
            {c.to && i < items.length - 1 ? (
              <Link to={c.to} className="hover:text-accent">{c.name}</Link>
            ) : (
              <span className="text-accent">{c.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
