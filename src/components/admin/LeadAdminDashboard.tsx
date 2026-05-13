import { useCallback, useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { format, parseISO, formatDistanceToNow } from "date-fns";
import {
  Loader2,
  RefreshCw,
  Lock,
  Users,
  Copy,
  Check,
  Download,
  Search,
  Clock,
  TrendingUp,
  Mail,
  Phone,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { listEarlyAccessLeads } from "@/lib/admin.functions";

const STORAGE_KEY = "bolt_admin_dashboard_secret";

type LeadRow = {
  id: string;
  email: string;
  phone: string;
  created_at: string;
  user_agent: string | null;
};

function truncateUa(ua: string | null, max = 72) {
  if (!ua) return "—";
  const t = ua.trim();
  return t.length <= max ? t : `${t.slice(0, max)}…`;
}

function StatCard({
  icon: Icon,
  label,
  value,
  trend,
  delay = 0,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string | number;
  trend?: string;
  delay?: number;
}) {
  return (
    <div
      className="group relative overflow-hidden rounded-xl border border-border/60 bg-card p-5 shadow-sm transition-all duration-500 hover:border-primary/30 hover:shadow-lg hover:-translate-y-0.5"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </p>
          <p className="mt-2 text-3xl font-bold tabular-nums tracking-tight">{value}</p>
          {trend && (
            <p className="mt-1 flex items-center gap-1 text-xs font-medium text-primary">
              <TrendingUp className="h-3 w-3" />
              {trend}
            </p>
          )}
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/15">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

export function LeadAdminDashboard() {
  const fetchLeads = useServerFn(listEarlyAccessLeads);
  const [secret, setSecret] = useState("");
  const [showSecret, setShowSecret] = useState(false);
  const [remember, setRemember] = useState(true);
  const [leads, setLeads] = useState<LeadRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) setSecret(stored);
    } catch {
      /* private mode */
    }
  }, []);

  const persistSecret = useCallback(
    (value: string) => {
      if (!remember) return;
      try {
        sessionStorage.setItem(STORAGE_KEY, value);
      } catch {
        /* ignore */
      }
    },
    [remember],
  );

  const load = useCallback(async () => {
    if (!secret.trim()) {
      setError("Please enter your secret key.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetchLeads({ data: { adminSecret: secret.trim() } });
      setLeads(res.leads as LeadRow[]);
      setLastRefresh(new Date());
      persistSecret(secret.trim());
    } catch (e) {
      setLeads(null);
      setError(e instanceof Error ? e.message : "Could not load leads.");
    } finally {
      setLoading(false);
    }
  }, [fetchLeads, persistSecret, secret]);

  const total = leads?.length ?? 0;

  const filteredLeads = useMemo(() => {
    if (!leads?.length) return [];
    const q = query.trim().toLowerCase();
    if (!q) return leads;
    return leads.filter(
      (l) =>
        l.email.toLowerCase().includes(q) ||
        l.phone.toLowerCase().includes(q) ||
        (l.user_agent?.toLowerCase().includes(q) ?? false),
    );
  }, [leads, query]);

  const exportCsv = () => {
    const rows = filteredLeads;
    const header = ["id", "email", "phone", "created_at", "user_agent"];
    const escape = (v: string | null) => {
      const s = v ?? "";
      if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
      return s;
    };
    const body = rows
      .map((r) =>
        [r.id, r.email, r.phone, r.created_at, r.user_agent ?? ""].map(escape).join(","),
      )
      .join("\n");
    const csv = `${header.join(",")}\n${body}`;
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `early-access-leads-${format(new Date(), "yyyy-MM-dd-HHmm")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const last24h = useMemo(() => {
    if (!leads?.length) return 0;
    const cutoff = Date.now() - 24 * 60 * 60 * 1000;
    return leads.filter((l) => {
      const t = Date.parse(l.created_at);
      return !Number.isNaN(t) && t >= cutoff;
    }).length;
  }, [leads]);

  const last7d = useMemo(() => {
    if (!leads?.length) return 0;
    const cutoff = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return leads.filter((l) => {
      const t = Date.parse(l.created_at);
      return !Number.isNaN(t) && t >= cutoff;
    }).length;
  }, [leads]);

  const copyRow = async (row: LeadRow) => {
    const text = `${row.email}\t${row.phone}\t${row.created_at}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(row.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/[0.02]">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                Lead Dashboard
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {lastRefresh
                  ? `Last refreshed ${formatDistanceToNow(lastRefresh, { addSuffix: true })}`
                  : "Monitor and manage your early-access signups"}
              </p>
            </div>
            {leads && (
              <Button
                type="button"
                variant="outline"
                className="gap-2 transition-all duration-300 hover:border-primary/40 hover:shadow-md"
                onClick={() => void load()}
                disabled={loading}
              >
                <RefreshCw
                  className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                  aria-hidden
                />
                Refresh
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        {/* Auth gate */}
        {!leads && (
          <div className="mx-auto max-w-md">
            <Card className="overflow-hidden border-border/60 shadow-lg transition-all duration-500 hover:shadow-xl">
              <div className="h-1 w-full bg-gradient-to-r from-primary/50 via-primary to-primary/50 animate-gradient-border" />
              <CardHeader className="pb-4">
                <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <Lock className="h-7 w-7 text-primary" aria-hidden />
                </div>
                <CardTitle className="text-center text-xl">Enter your secret key</CardTitle>
                <CardDescription className="text-center">
                  Authenticate to view and manage early-access signups
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pb-6">
                <div className="space-y-2">
                  <Label htmlFor="admin-secret" className="text-sm font-medium">
                    Secret key
                  </Label>
                  <div className="relative">
                    <Input
                      id="admin-secret"
                      type={showSecret ? "text" : "password"}
                      autoComplete="off"
                      placeholder="Paste your secret key…"
                      className="pr-10 transition-all duration-200 focus:border-primary/50 focus:ring-primary/20"
                      value={secret}
                      onChange={(e) => setSecret(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && void load()}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                      onClick={() => setShowSecret(!showSecret)}
                      aria-label={showSecret ? "Hide secret" : "Show secret"}
                    >
                      {showSecret ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
                  <input
                    type="checkbox"
                    className="size-4 rounded border-input accent-primary"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  Remember for this session
                </label>
                {error && (
                  <Alert variant="destructive" className="animate-fade-in-up">
                    <AlertTitle>Authentication failed</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Button
                  className="w-full gap-2 transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                  onClick={() => void load()}
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  ) : (
                    <Lock className="h-4 w-4" aria-hidden />
                  )}
                  {loading ? "Authenticating…" : "Unlock dashboard"}
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Dashboard content */}
        {leads && (
          <div className="space-y-6">
            {/* Stats row */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard icon={Users} label="Total signups" value={total} delay={0} />
              <StatCard
                icon={Clock}
                label="Last 24 hours"
                value={last24h}
                trend={last24h > 0 ? `${last24h} new` : undefined}
                delay={100}
              />
              <StatCard icon={TrendingUp} label="Last 7 days" value={last7d} delay={200} />
              <StatCard
                icon={Mail}
                label="Unique emails"
                value={new Set(leads.map((l) => l.email.toLowerCase())).size}
                delay={300}
              />
            </div>

            {/* Search + Export */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden
                />
                <Input
                  type="search"
                  placeholder="Search by email, phone, or user agent…"
                  className="pl-9 transition-all duration-200 focus:border-primary/50 focus:ring-primary/20"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Filter leads"
                />
              </div>
              {query.trim() && (
                <Badge variant="outline" className="shrink-0 text-sm">
                  {filteredLeads.length} result{filteredLeads.length === 1 ? "" : "s"}
                </Badge>
              )}
              <Button
                type="button"
                variant="outline"
                className="shrink-0 gap-2 transition-all duration-300 hover:border-primary/40"
                onClick={() => exportCsv()}
                disabled={filteredLeads.length === 0}
              >
                <Download className="h-4 w-4" aria-hidden />
                Export CSV
              </Button>
            </div>

            {/* Table */}
            <Card className="overflow-hidden border-border/60 shadow-sm">
              <CardHeader className="border-b border-border/40 bg-card/50 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Early access signups</CardTitle>
                    <CardDescription>Newest first · up to 2,000 rows</CardDescription>
                  </div>
                  <Badge variant="secondary" className="tabular-nums">
                    {filteredLeads.length} rows
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/30 hover:bg-muted/30">
                        <TableHead className="w-[220px]">
                          <span className="flex items-center gap-1.5">
                            <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                            Email
                          </span>
                        </TableHead>
                        <TableHead className="w-[140px]">
                          <span className="flex items-center gap-1.5">
                            <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                            Phone
                          </span>
                        </TableHead>
                        <TableHead className="w-[160px]">
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                            Signed up
                          </span>
                        </TableHead>
                        <TableHead>User agent</TableHead>
                        <TableHead className="w-[64px] text-right">Copy</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLeads.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={5}
                            className="py-16 text-center text-sm text-muted-foreground"
                          >
                            <Search className="mx-auto mb-3 h-8 w-8 opacity-30" />
                            <p>No rows match your filter.</p>
                            <p className="mt-1 text-xs">Clear the search box to see all signups.</p>
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredLeads.map((row, idx) => (
                          <TableRow
                            key={row.id}
                            className="group transition-colors duration-200 hover:bg-primary/[0.02]"
                            style={{ animationDelay: `${Math.min(idx * 20, 500)}ms` }}
                          >
                            <TableCell className="align-top font-medium">{row.email}</TableCell>
                            <TableCell className="align-top font-mono text-xs tabular-nums">
                              {row.phone}
                            </TableCell>
                            <TableCell className="align-top text-xs text-muted-foreground">
                              <div>
                                {(() => {
                                  try {
                                    return format(parseISO(row.created_at), "MMM d, yyyy");
                                  } catch {
                                    return row.created_at;
                                  }
                                })()}
                              </div>
                              <div className="text-[11px] opacity-70">
                                {(() => {
                                  try {
                                    return format(parseISO(row.created_at), "HH:mm");
                                  } catch {
                                    return "";
                                  }
                                })()}
                              </div>
                            </TableCell>
                            <TableCell
                              className="max-w-[280px] align-top text-xs text-muted-foreground"
                              title={row.user_agent ?? undefined}
                            >
                              {truncateUa(row.user_agent)}
                            </TableCell>
                            <TableCell className="text-right align-top">
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 opacity-50 transition-all duration-200 group-hover:opacity-100"
                                onClick={() => void copyRow(row)}
                                aria-label={`Copy ${row.email}`}
                              >
                                {copiedId === row.id ? (
                                  <Check className="h-4 w-4 text-primary" aria-hidden />
                                ) : (
                                  <Copy className="h-4 w-4" aria-hidden />
                                )}
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </main>
  );
}
