import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EarlyAccessForm } from "@/components/landing/EarlyAccessForm";
import { ScrollReveal } from "@/components/landing/ScrollReveal";

export const Route = createFileRoute("/enquire")({
  component: EnquirePage,
  head: () => ({
    meta: [
      { title: "Enquire — Bolt+ Early Access" },
      {
        name: "description",
        content:
          "Request early access to Bolt+ honey-powered energy gels. We will WhatsApp you at launch with an exclusive early-bird offer.",
      },
      { property: "og:title", content: "Enquire — Bolt+ Early Access" },
      {
        property: "og:description",
        content: "Join the Bolt+ pre-launch list for launch invites and your early-bird discount.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function EnquirePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back to home
            </Link>
          </Button>
          <Link
            to="/"
            className="font-display text-lg font-extrabold tracking-[0.06em] sm:text-xl"
          >
            BOLT<span className="text-primary">+</span>
          </Link>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center px-4 py-12 sm:px-6 sm:py-16">
        <ScrollReveal className="w-full max-w-lg">
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Pre-launch
          </p>
          <h1 className="mt-3 text-center font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Enquire for early access
          </h1>
          <p className="mx-auto mt-4 max-w-md text-center text-muted-foreground">
            Leave your email and WhatsApp number. We will only message you about the launch and your
            one-time early-bird discount — no spam.
          </p>
          <div className="mt-10">
            <EarlyAccessForm id="enquire-form" />
          </div>
        </ScrollReveal>
      </main>

      <footer className="border-t border-border/50 py-8 text-center text-sm text-muted-foreground">
        <Link to="/" className="font-medium text-foreground underline-offset-4 hover:underline">
          Explore the product
        </Link>
        <span className="mx-2 text-border">·</span>
        <a href="mailto:hello@boltplus.in" className="hover:text-foreground">
          hello@boltplus.in
        </a>
      </footer>
    </div>
  );
}
