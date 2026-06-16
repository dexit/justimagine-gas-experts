import React, { useState, useEffect } from "react";
import { Search, Filter, Download, ChevronLeft, ChevronRight, AlertCircle, CheckCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LogEntry {
  id: string;
  timestamp: string;
  type: "form" | "error" | "api";
  message: string;
  details?: Record<string, any>;
  userAgent?: string;
  referrer?: string;
}

interface FilterState {
  type: "all" | "form" | "error" | "api";
  search: string;
  dateFrom: string;
  dateTo: string;
}

export function LogsViewer() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filtered, setFiltered] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [filter, setFilter] = useState<FilterState>({
    type: "all",
    search: "",
    dateFrom: "",
    dateTo: "",
  });
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Mock data
  const mockLogs: LogEntry[] = [
    {
      id: "log-001",
      timestamp: new Date(Date.now() - 2000000).toISOString(),
      type: "form",
      message: "Lead form submitted: Emergency boiler repair",
      details: {
        refId: "REF-2024-001234",
        name: "John Smith",
        phone: "07700 123456",
        postcode: "CV1 1AA",
        service: "emergency-boiler",
        area: "coventry",
      },
    },
    {
      id: "log-002",
      timestamp: new Date(Date.now() - 1500000).toISOString(),
      type: "api",
      message: "GET /api/admin/services - 200 OK",
      details: { duration: "45ms", statusCode: 200 },
    },
    {
      id: "log-003",
      timestamp: new Date(Date.now() - 1000000).toISOString(),
      type: "error",
      message: "GA4 API call timeout",
      details: {
        error: "ETIMEDOUT",
        endpoint: "analytics.googleapis.com",
        retries: 2,
      },
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      referrer: "admin.domain.com",
    },
    {
      id: "log-004",
      timestamp: new Date(Date.now() - 500000).toISOString(),
      type: "form",
      message: "Lead form submitted: Boiler installation",
      details: {
        refId: "REF-2024-001235",
        name: "Sarah Jones",
        email: "sarah@example.com",
        service: "boiler-installation",
        area: "rugby",
      },
    },
    {
      id: "log-005",
      timestamp: new Date(Date.now() - 200000).toISOString(),
      type: "api",
      message: "PUT /api/admin/services/boiler-installation - 200 OK",
      details: { duration: "120ms", statusCode: 200, recordsUpdated: 1 },
    },
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLogs(mockLogs);
      setLoading(false);
    }, 300);
  }, []);

  // Apply filters
  useEffect(() => {
    let result = logs;

    if (filter.type !== "all") {
      result = result.filter((log) => log.type === filter.type);
    }

    if (filter.search) {
      const term = filter.search.toLowerCase();
      result = result.filter(
        (log) =>
          log.message.toLowerCase().includes(term) ||
          JSON.stringify(log.details).toLowerCase().includes(term)
      );
    }

    if (filter.dateFrom) {
      const from = new Date(filter.dateFrom).getTime();
      result = result.filter((log) => new Date(log.timestamp).getTime() >= from);
    }

    if (filter.dateTo) {
      const to = new Date(filter.dateTo).getTime();
      result = result.filter((log) => new Date(log.timestamp).getTime() <= to);
    }

    setFiltered(result);
    setPage(1);
  }, [logs, filter]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginatedLogs = filtered.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const handleExport = (format: "csv" | "json") => {
    const data = format === "csv" ? convertToCSV(filtered) : JSON.stringify(filtered, null, 2);
    const blob = new Blob([data], { type: format === "csv" ? "text/csv" : "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `logs-${new Date().toISOString().split("T")[0]}.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getLogIcon = (type: string) => {
    switch (type) {
      case "form":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      case "api":
        return <Clock className="h-4 w-4 text-blue-600" />;
      default:
        return null;
    }
  };

  if (loading) return <div className="text-center py-8">Loading logs...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-display text-3xl font-semibold">Logs & Debug</h1>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => handleExport("csv")}>
            <Download className="h-4 w-4 mr-1" />
            CSV
          </Button>
          <Button size="sm" variant="outline" onClick={() => handleExport("json")}>
            <Download className="h-4 w-4 mr-1" />
            JSON
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              Log Type
            </label>
            <select
              value={filter.type}
              onChange={(e) => setFilter({ ...filter, type: e.target.value as any })}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-background text-foreground"
            >
              <option value="all">All Types</option>
              <option value="form">Form Submissions</option>
              <option value="error">Errors</option>
              <option value="api">API Calls</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search logs..."
                value={filter.search}
                onChange={(e) => setFilter({ ...filter, search: e.target.value })}
                className="w-full pl-8 pr-3 py-2 border border-border rounded-lg text-sm bg-background text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              From
            </label>
            <input
              type="date"
              value={filter.dateFrom}
              onChange={(e) => setFilter({ ...filter, dateFrom: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-background text-foreground"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1">
              To
            </label>
            <input
              type="date"
              value={filter.dateTo}
              onChange={(e) => setFilter({ ...filter, dateTo: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-background text-foreground"
            />
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        {paginatedLogs.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No logs found</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted border-b border-border">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Type</th>
                    <th className="px-4 py-3 text-left font-semibold">Timestamp</th>
                    <th className="px-4 py-3 text-left font-semibold">Message</th>
                    <th className="px-4 py-3 text-left font-semibold">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedLogs.map((log) => (
                    <React.Fragment key={log.id}>
                      <tr className="border-b border-border hover:bg-muted/50 transition">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {getLogIcon(log.type)}
                            <span className="capitalize text-xs font-medium text-muted-foreground">
                              {log.type}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs text-muted-foreground">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                        <td className="px-4 py-3 font-medium text-foreground max-w-xs truncate">
                          {log.message}
                        </td>
                        <td className="px-4 py-3 text-right">
                          {log.details && (
                            <button
                              onClick={() => setExpandedId(expandedId === log.id ? null : log.id)}
                              className="text-accent hover:underline text-xs font-medium"
                            >
                              {expandedId === log.id ? "Hide" : "Show"}
                            </button>
                          )}
                        </td>
                      </tr>
                      {expandedId === log.id && log.details && (
                        <tr className="bg-muted/30 border-b border-border">
                          <td colSpan={4} className="px-4 py-3">
                            <div className="bg-background rounded p-3 text-xs font-mono text-muted-foreground overflow-auto max-h-40">
                              <pre>{JSON.stringify(log.details, null, 2)}</pre>
                            </div>
                            {log.userAgent && (
                              <div className="mt-2 text-xs">
                                <span className="font-semibold text-foreground">User Agent:</span> {log.userAgent}
                              </div>
                            )}
                            {log.referrer && (
                              <div className="text-xs">
                                <span className="font-semibold text-foreground">Referrer:</span> {log.referrer}
                              </div>
                            )}
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-4 py-3 border-t border-border flex items-center justify-between bg-muted/50">
              <div className="text-xs text-muted-foreground">
                Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filtered.length)} of{" "}
                {filtered.length}
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`px-2 py-1 rounded text-xs font-medium transition ${
                        p === page
                          ? "bg-accent text-accent-foreground"
                          : "bg-background text-muted-foreground hover:bg-muted"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Convert logs to CSV
function convertToCSV(logs: LogEntry[]): string {
  const headers = ["ID", "Timestamp", "Type", "Message", "Details"];
  const rows = logs.map((log) => [
    log.id,
    log.timestamp,
    log.type,
    log.message,
    JSON.stringify(log.details || {}),
  ]);

  const csv = [
    headers.join(","),
    ...rows.map((row) =>
      row
        .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
        .join(",")
    ),
  ].join("\n");

  return csv;
}
