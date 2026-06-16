import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/admin/portfolio")({
  component: AdminPortfolioPage,
});

function AdminPortfolioPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display font-bold">Portfolio Projects</h1>
            <p className="text-muted-foreground mt-2">Manage database-backed portfolio projects (in addition to GitHub markdown projects)</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Project
          </Button>
        </div>

        {/* Phase 2: Project list + edit forms */}
        <div className="p-8 border border-dashed border-border rounded-lg text-center">
          <p className="text-muted-foreground mb-2">Admin portfolio interface</p>
          <p className="text-sm text-muted-foreground">
            Phase 2: Create/edit projects with Vercel Blob image uploads, preview rendering
          </p>
        </div>

        {/* Info panel */}
        <div className="mt-8 p-6 bg-secondary/30 rounded-lg border border-border space-y-3">
          <h3 className="font-semibold">GitHub Portfolio (Phase 1 - Live)</h3>
          <p className="text-sm text-muted-foreground">
            6 projects loaded from /portfolio folder markdown files. Edit in Git, auto-loads on deploy.
          </p>

          <h3 className="font-semibold mt-6">Database Portfolio (Phase 2 - Ready)</h3>
          <p className="text-sm text-muted-foreground">
            D1 schema created (portfolio_projects table). Admin forms + Vercel Blob upload ready for implementation.
          </p>

          <h3 className="font-semibold mt-6">Hybrid Display</h3>
          <p className="text-sm text-muted-foreground">
            /work route automatically merges GitHub + DB projects, sorted by featured/date.
          </p>
        </div>
      </div>
    </PageShell>
  );
}
