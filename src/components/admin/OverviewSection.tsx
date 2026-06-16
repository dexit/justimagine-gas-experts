import { Activity, Users, Zap, TrendingUp } from "lucide-react";

export function OverviewSection() {
  const stats = [
    {
      label: "Active Users",
      value: "8,920",
      icon: Users,
      trend: "+12% vs last week",
      color: "bg-blue-50",
    },
    {
      label: "Service Requests",
      value: "1,247",
      icon: Activity,
      trend: "+8% vs last week",
      color: "bg-green-50",
    },
    {
      label: "Conversion Rate",
      value: "12.3%",
      icon: TrendingUp,
      trend: "+2.1% vs last week",
      color: "bg-purple-50",
    },
    {
      label: "Revenue (MTD)",
      value: "£24,580",
      icon: Zap,
      trend: "+18% vs last month",
      color: "bg-orange-50",
    },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold mb-8">
        Dashboard Overview
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className={`${stat.color} p-6 rounded-lg border border-gray-200`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-2">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">{stat.trend}</p>
                </div>
                <Icon className="text-gray-400" size={24} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <h2 className="font-semibold text-lg mb-4">Quick Start</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-medium text-sm mb-2">Setup Checklist</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✓ Services configured</li>
              <li>✓ Areas configured</li>
              <li>✓ Analytics integrated</li>
              <li>○ Payment webhook configured</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-sm mb-2">Admin Sections</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Services CMS — Edit service offerings</li>
              <li>• Areas CMS — Manage service areas</li>
              <li>• Analytics — View conversion metrics</li>
              <li>• Logs — Monitor system events</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
