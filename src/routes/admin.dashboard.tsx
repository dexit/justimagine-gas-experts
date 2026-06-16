import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ServicesCMS } from "@/components/admin/ServicesCMS";
import { AreasCMS } from "@/components/admin/AreasCMS";
import { AnalyticsDashboard } from "@/components/admin/AnalyticsDashboard";
import {
  BarChart3,
  Settings,
  FileText,
  Eye,
  LogOut,
  AlertCircle,
} from "lucide-react";

const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "services", label: "Services", icon: FileText },
  { id: "areas", label: "Areas", icon: Settings },
  { id: "analytics", label: "Analytics", icon: Eye },
  { id: "logs", label: "Logs", icon: AlertCircle },
];

function AdminDashboard() {
  const navigate = useNavigate();
  const [active, setActive] = useState("overview");
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verify session
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate({ to: "/admin/login" });
      return;
    }

    // Mock user load (replace with actual API call)
    setUser("Admin User");
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminSession");
    navigate({ to: "/admin/login" });
  };

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-background grid grid-cols-[250px_1fr]">
      {/* Sidebar */}
      <aside className="bg-card border-r border-border p-4">
        <div className="mb-8">
          <h2 className="font-display text-lg font-semibold text-foreground">
            Just Imagine
          </h2>
          <p className="text-xs text-muted-foreground">Admin Panel</p>
        </div>

        <nav className="space-y-2">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
                  active === item.id
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground mb-4">
            Logged in as: <span className="font-medium">{user}</span>
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="w-full"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="p-8">
        <div className="max-w-6xl">
          {active === "overview" && <OverviewSection />}
          {active === "services" && <ServicesSection />}
          {active === "areas" && <AreasSection />}
          {active === "analytics" && <AnalyticsSection />}
          {active === "logs" && <LogsSection />}
        </div>
      </main>
    </div>
  );
}

function OverviewSection() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch("/api/admin/stats", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    })
      .then((r) => r.json())
      .then(setStats)
      .catch(console.error);
  }, []);

  if (!stats) return <div>Loading stats...</div>;

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold mb-6">Dashboard</h1>
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Enquiries (7d)" value={stats.enquiries || 0} />
        <StatCard label="Services" value={stats.services || 0} />
        <StatCard label="Areas" value={stats.areas || 0} />
        <StatCard label="Conversion Rate" value={stats.conversionRate || "0%"} />
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: any }) {
  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="font-display text-2xl font-semibold">{value}</p>
    </div>
  );
}

function ServicesSection() {
  return <ServicesCMS />;
}

function AreasSection() {
  return <AreasCMS />;
}

function AnalyticsSection() {
  return <AnalyticsDashboard />;
}

function LogsSection() {
  return (
    <div>
      <h1 className="font-display text-3xl font-semibold mb-6">Logs</h1>
      <p className="text-muted-foreground">
        Logs viewer coming soon. View API errors, form submissions, debug info.
      </p>
    </div>
  );
}

export const Route = createFileRoute("/admin/dashboard")({
  component: AdminDashboard,
});
