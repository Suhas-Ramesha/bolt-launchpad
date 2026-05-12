import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Loader2, Mail, Phone, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitEarlyAccess } from "@/lib/signup.functions";

export function EarlyAccessForm({ id = "early-access" }: { id?: string }) {
  const submit = useServerFn(submitEarlyAccess);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      const res = await submit({ data: { email, phone } });
      if (res.ok) {
        setDone(true);
        toast.success(
          res.duplicate ? "You're already on the list!" : "You're on the list.",
          { description: "We'll WhatsApp you when Bolt+ launches." }
        );
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      toast.error("Could not sign you up", { description: message });
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div
        id={id}
        className="rounded-2xl border bg-card p-8 text-center shadow-[var(--shadow-card)]"
      >
        <CheckCircle2 className="mx-auto h-10 w-10 text-primary" />
        <h3 className="mt-4 text-xl font-bold">You're in.</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Watch your inbox and WhatsApp — early access invites drop first.
        </p>
      </div>
    );
  }

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      className="rounded-2xl border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="ea-email" className="text-xs uppercase tracking-wider">
            Email
          </Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="ea-email"
              type="email"
              required
              autoComplete="email"
              maxLength={255}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 pl-10"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="ea-phone" className="text-xs uppercase tracking-wider">
            WhatsApp number
          </Label>
          <div className="relative">
            <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="ea-phone"
              type="tel"
              required
              autoComplete="tel"
              maxLength={20}
              placeholder="+91 81477 60633"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="h-12 pl-10"
            />
          </div>
        </div>
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="mt-5 h-12 w-full text-base font-semibold"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          "Get Early Access"
        )}
      </Button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        No spam. Just one launch invite + your early-bird discount.
      </p>
    </form>
  );
}
