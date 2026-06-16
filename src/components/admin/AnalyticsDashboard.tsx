import { useEffect, useState } from "react";
import { BarChart3, TrendingUp, AlertCircle } from "lucide-react";
import { MOCK_ANALYTICS } from "@/lib/mock-data";

interface Analytics {
  ga4: { sessions: number; users: number; bounce: number; avgDuration: number };
  gsc: { clicks: number; impressions: number; ctr: number; position: number };
  clarity: { sessionsRecorded: number; avgDuration: number; errorRate: number };
  bing: { clicks: number; impressions: number };
  funnel?: {
    visitors: number;
    formStarts: number;
    formSubmitted: number;
    confirmed: number;
    booked: number;
  };
}

export function AnalyticsDashboard() {
  const [data, setData] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("7d");

  useEffect(() => {
    fetch(`/api/admin/analytics?period=${period}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
    })
      .then((r) => r.json())
      .then(setData)
      .catch(() => {
        // Demo mode: use mock data
        setData(MOCK_ANALYTICS);
      })
      .finally(() => setLoading(false));
  }, [period]);

  if (loading) return <div>Loading analytics...</div>;
  if (!data) return <div>No data</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-display text-2xl font-semibold">Analytics</h2>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="px-3 py-1 border rounded-lg text-sm"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      {/* GA4 */}
      <div className="mb-8">
        <h3 className="font-medium mb-3 flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          Google Analytics 4
        </h3>
        <div className="grid grid-cols-4 gap-3">
          <MetricCard label="Sessions" value={data.ga4.sessions} />
          <MetricCard label="Users" value={data.ga4.users} />
          <MetricCard label="Bounce Rate" value={`${data.ga4.bounce}%`} />
          <MetricCard label="Avg Duration" value={`${data.ga4.avgDuration}s`} />
        </div>
      </div>

      {/* GSC */}
      <div className="mb-8">
        <h3 className="font-medium mb-3">Google Search Console</h3>
        <div className="grid grid-cols-4 gap-3">
          <MetricCard label="Clicks" value={data.gsc.clicks} />
          <MetricCard label="Impressions" value={data.gsc.impressions} />
          <MetricCard label="CTR" value={`${data.gsc.ctr}%`} />
          <MetricCard label="Avg Position" value={`#${data.gsc.position}`} />
        </div>
      </div>

      {/* Clarity */}
      <div className="mb-8">
        <h3 className="font-medium mb-3">MS Clarity</h3>
        <div className="grid grid-cols-3 gap-3">
          <MetricCard
            label="Sessions Recorded"
            value={data.clarity.sessionsRecorded}
          />
          <MetricCard
            label="Avg Duration"
            value={`${data.clarity.avgDuration}s`}
          />
          <MetricCard label="Error Rate" value={`${data.clarity.errorRate}%`} />
        </div>
      </div>

      {/* Bing */}
      <div className="mb-8">
        <h3 className="font-medium mb-3">Bing Webmaster Tools</h3>
        <div className="grid grid-cols-2 gap-3">
          <MetricCard label="Clicks" value={data.bing.clicks} />
          <MetricCard label="Impressions" value={data.bing.impressions} />
        </div>
      </div>

      {/* Conversion Funnel */}
      {data.funnel && (
        <div className="mt-8">
          <h3 className="font-medium mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Conversion Funnel
          </h3>
          <ConversionFunnel funnel={data.funnel} />
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm">
        <AlertCircle className="inline mr-2 h-4 w-4" />
        <strong>UTM Tracking:</strong> All CTAs include utm_source, utm_medium,
        utm_campaign for funnel analysis.
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="bg-card border border-border rounded-lg p-3">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="font-display text-xl font-semibold">{value}</p>
    </div>
  );
}

function ConversionFunnel({
  funnel,
}: {
  funnel: {
    visitors: number;
    formStarts: number;
    formSubmitted: number;
    confirmed: number;
    booked: number;
  };
}) {
  const stages = [
    { label: "Visitors", value: funnel.visitors },
    { label: "Form Starts", value: funnel.formStarts },
    { label: "Form Submitted", value: funnel.formSubmitted },
    { label: "Confirmed", value: funnel.confirmed },
    { label: "Booked", value: funnel.booked },
  ];

  const maxValue = funnel.visitors;

  return (
    <div className="space-y-2">
      {stages.map((stage, i) => {
        const percentage = ((stage.value / maxValue) * 100).toFixed(1);
        const conversionFromPrev =
          i === 0
            ? "100%"
            : (
                ((stage.value / stages[i - 1].value) * 100).toFixed(1) + "%"
              ).toString();

        return (
          <div key={stage.label}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">{stage.label}</span>
              <span className="text-xs text-muted-foreground">
                {stage.value} ({percentage}% of total, {conversionFromPrev} from
                prev)
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-6">
              <div
                className="bg-accent rounded-full h-6 flex items-center justify-end pr-2 transition-all duration-300"
                style={{ width: `${percentage}%` }}
              >
                <span className="text-xs font-medium text-accent-foreground">
                  {percentage}%
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
