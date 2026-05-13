import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { format } from "date-fns";
import { Loader2, Mail, Phone, CheckCircle2, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { submitEarlyAccess } from "@/lib/signup.functions";
import { earlyAccessFormSchema, type EarlyAccessFormValues } from "@/lib/signup-schema";

type DoneState = { duplicate: boolean } | null;

export function EarlyAccessForm({ id = "early-access" }: { id?: string }) {
  const submit = useServerFn(submitEarlyAccess);
  const [done, setDone] = useState<DoneState>(null);

  const form = useForm<EarlyAccessFormValues>({
    resolver: zodResolver(earlyAccessFormSchema),
    defaultValues: { email: "", phone: "" },
    mode: "onTouched",
  });

  const onSubmit = async (values: EarlyAccessFormValues) => {
    try {
      const res = await submit({
        data: {
          email: values.email,
          phone: values.phone,
        },
      });
      if (res.ok) {
        setDone({ duplicate: res.duplicate });
        toast.success(res.duplicate ? "You're already on the list!" : "You're on the list.", {
          description: res.duplicate
            ? "No changes needed — we still have your details."
            : "We'll WhatsApp you when Bolt+ launches.",
          duration: 6000,
        });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      toast.error("Could not sign you up", { description: message });
    }
  };

  if (done) {
    return (
      <div
        id={id}
        className="space-y-4 rounded-2xl border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8"
        aria-live="polite"
      >
        <Alert className="border-primary/25 bg-primary/5 text-foreground">
          {done.duplicate ? (
            <CheckCircle2 className="h-5 w-5 text-primary" aria-hidden />
          ) : (
            <PartyPopper className="h-5 w-5 text-primary" aria-hidden />
          )}
          <AlertTitle className="text-lg font-bold">
            {done.duplicate ? "Already registered" : "You are confirmed"}
          </AlertTitle>
          <AlertDescription className="text-muted-foreground">
            {done.duplicate
              ? "This email is already on our early-access list. You will still get the launch WhatsApp and early-bird offer — no action needed."
              : "Your details are saved. Watch your inbox and WhatsApp for the launch message and your exclusive discount code."}
          </AlertDescription>
        </Alert>
        <div className="flex flex-col gap-2 rounded-xl border border-dashed bg-muted/30 p-4 text-center text-sm text-muted-foreground">
          <p className="font-medium text-foreground">What happens next</p>
          <ul className="list-inside list-disc text-left">
            <li>One launch announcement when we open orders</li>
            <li>One early-bird discount on your first order</li>
            <li>No newsletters unless you opt in later</li>
          </ul>
          <p className="text-xs">
            Saved at {format(new Date(), "PPpp")} — you can close this page.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => {
            setDone(null);
            form.reset();
          }}
        >
          Register a different email
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        id={id}
        onSubmit={form.handleSubmit(onSubmit)}
        className="rounded-2xl border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8"
        noValidate
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs uppercase tracking-wider">Email</FormLabel>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <FormControl>
                    <Input
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      placeholder="you@example.com"
                      className="h-12 pl-10"
                      aria-required
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs uppercase tracking-wider">WhatsApp number</FormLabel>
                <div className="relative">
                  <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <FormControl>
                    <Input
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="+91 98765 43210"
                      className="h-12 pl-10"
                      aria-required
                      {...field}
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          aria-busy={form.formState.isSubmitting}
          aria-label={form.formState.isSubmitting ? "Submitting your signup" : "Get early access"}
          className="mt-5 h-12 w-full text-base font-semibold"
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              <span className="sr-only">Submitting…</span>
            </>
          ) : (
            "Get Early Access"
          )}
        </Button>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          No spam. Just one launch invite + your early-bird discount.
        </p>
      </form>
    </Form>
  );
}
