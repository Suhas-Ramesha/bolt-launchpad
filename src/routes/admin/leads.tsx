import { createFileRoute, Link } from "@tanstack/react-router";
import { LeadAdminDashboard } from "@/components/admin/LeadAdminDashboard";

export const Route = createFileRoute("/admin/leads")({
  component: AdminLeadsRoute,
  head: () => ({
    meta: [{ title: "Lead dashboard — Bolt+" }, { name: "robots", content: "noindex, nofollow" }],
  }),
});

function AdminLeadsRoute() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-card/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              ← Site
            </Link>
            <span className="text-border">|</span>
            <span className="font-display text-lg font-extrabold tracking-tight">
              BOLT<span className="text-primary">+</span>
              <span className="ml-2 text-xs font-normal text-muted-foreground">Leads</span>
            </span>
          </div>
        </div>
      </header>
      <LeadAdminDashboard />
    </div>
  );
}
