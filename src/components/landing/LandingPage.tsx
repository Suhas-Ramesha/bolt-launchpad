import { Link } from "@tanstack/react-router";
import { Zap, Leaf, Activity, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EarlyAccessForm } from "@/components/landing/EarlyAccessForm";
import boltClassic from "@/assets/bolt-classic.png";
import boltBuzz50 from "@/assets/bolt-buzz-50.png";
import boltBuzz150 from "@/assets/bolt-buzz-150.png";

const benefits = [
  {
    icon: Zap,
    title: "No spike. No crash.",
    body: "Smooth, steady energy from real food sources — not stimulants pretending to be fuel.",
  },
  {
    icon: Leaf,
    title: "100% natural ingredients",
    body: "Honey, sea salt, electrolytes. Nothing artificial. Read the label and recognise every word.",
  },
  {
    icon: Activity,
    title: "Built for performance",
    body: "Long days, hard workouts, deep focus sessions. One sachet, on demand.",
  },
  {
    icon: Layers,
    title: "Three energy levels",
    body: "Pick caffeine-free, a balanced 50 mg lift, or a powerful 150 mg kick.",
  },
];

const variants = [
  {
    name: "Bolt+ Classic",
    tag: "Caffeine free",
    color: "from-zinc-200 to-zinc-50 ring-zinc-300",
    badge: "bg-zinc-900 text-zinc-50",
    image: boltClassic,
    body: "Steady, clean energy. Pure honey + electrolytes for everyday focus and endurance.",
  },
  {
    name: "Bolt+ Buzz 50",
    tag: "50 mg natural caffeine",
    color: "from-amber-200 to-amber-50 ring-amber-400",
    badge: "bg-amber-500 text-white",
    image: boltBuzz50,
    body: "A balanced lift from green-tea caffeine. Perfect for an afternoon push or a morning ride.",
  },
  {
    name: "Bolt+ Buzz 150",
    tag: "150 mg natural caffeine",
    color: "from-zinc-900 to-zinc-700 ring-amber-500",
    badge: "bg-amber-500 text-zinc-950",
    dark: true,
    image: boltBuzz150,
    body: "Powerful, focused energy for race day, late deadlines, and the heaviest sets.",
  },
];

const ingredients = [
  {
    title: "Organic Himalayan honey",
    body: "Real fast-acting carbs the body actually knows what to do with.",
  },
  {
    title: "Sea salt",
    body: "Sodium to replace what you sweat out — without the bloat.",
  },
  {
    title: "Potassium & magnesium",
    body: "Electrolytes for hydration, muscle function and recovery.",
  },
  {
    title: "Green-tea caffeine",
    body: "Smooth, plant-derived caffeine in our Buzz 50 and Buzz 150.",
  },
];

const faqs = [
  {
    q: "What's actually inside Bolt+?",
    a: "Organic Himalayan honey, sea salt, potassium chloride and magnesium glycinate — plus green-tea caffeine in Buzz 50 and Buzz 150. That's it. No syrups, no artificial colours, no maltodextrin.",
  },
  {
    q: "How and when do I use it?",
    a: "Tear, squeeze, go. Use one sachet 15 minutes before a workout, mid-effort for endurance, or any time you need clean fuel. Chase with water.",
  },
  {
    q: "Who is Bolt+ for?",
    a: "Runners, cyclists, lifters, climbers, gamers, founders, students — anyone who needs reliable energy without the crash that comes with synthetic pre-workouts and energy drinks.",
  },
  {
    q: "Is it safe?",
    a: "Yes. Bolt+ is being manufactured in an FSSAI-compliant facility using food-grade ingredients you'd recognise from your kitchen. Buzz 150 contains caffeine and isn't recommended for under-16s, pregnant or nursing women.",
  },
  {
    q: "When does it launch?",
    a: "We're shipping our first batch in the coming weeks. Join the early-access list above to get launch invites and an exclusive early-bird discount.",
  },
];

export function LandingPage() {
  return (
    <main className="min-h-screen">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-1 font-display text-xl font-extrabold tracking-tight">
            BOLT<span className="text-primary">+</span>
          </Link>
          <nav className="hidden gap-8 text-sm font-medium text-muted-foreground sm:flex">
            <a href="#why" className="hover:text-foreground">Why</a>
            <a href="#variants" className="hover:text-foreground">Variants</a>
            <a href="#ingredients" className="hover:text-foreground">Ingredients</a>
            <a href="#faq" className="hover:text-foreground">FAQ</a>
          </nav>
          <Button asChild size="sm" className="font-semibold">
            <a href="#early-access">Early Access</a>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground shadow-sm">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
              Pre-launch · Coming soon
            </span>
            <h1 className="mt-6 font-display text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              Clean, smooth energy.
              <br />
              <span className="bg-[image:var(--gradient-honey)] bg-clip-text text-transparent">
                No crash.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Bolt+ fuels your day and your performance with pure honey-powered
              energy — whether you need a calm focus or a powerful kick.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 px-7 text-base font-semibold">
                <a href="#early-access">Join the early access list</a>
              </Button>
              <Button asChild size="lg" variant="ghost" className="h-12 px-5 text-base">
                <a href="#variants">See the lineup →</a>
              </Button>
            </div>
          </div>

          {/* Product trio */}
          <div className="mt-16 grid grid-cols-3 items-end gap-3 sm:gap-8">
            {variants.map((v, i) => (
              <div
                key={v.name}
                className="group relative flex justify-center"
                style={{ transform: `translateY(${i === 1 ? "-1rem" : "0"})` }}
              >
                <img
                  src={v.image}
                  alt={`${v.name} energy gel sachet`}
                  width={1024}
                  height={1536}
                  className="h-auto w-full max-w-[180px] object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.15)] transition-transform duration-500 group-hover:-translate-y-2 sm:max-w-[240px]"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why */}
      <section id="why" className="border-t border-border/50 bg-card/40 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Why Bolt+
            </p>
            <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">
              Energy that respects your body.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border bg-card p-6 shadow-[var(--shadow-card)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <b.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-bold">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Variants */}
      <section id="variants" className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              The Lineup
            </p>
            <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">
              Choose your energy level.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Three honey-based gels. One for every kind of effort.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {variants.map((v) => (
              <article
                key={v.name}
                className={`group relative overflow-hidden rounded-3xl border ring-1 ring-transparent transition hover:ring-2 ${
                  v.dark ? "bg-zinc-950 text-zinc-50 ring-zinc-800" : "bg-card"
                } ${v.color.includes("ring-") ? `hover:${v.color.split(" ").find((c) => c.startsWith("ring-"))}` : ""}`}
              >
                <div
                  className={`flex h-72 items-center justify-center bg-gradient-to-br ${v.color}`}
                >
                  <img
                    src={v.image}
                    alt={`${v.name} sachet`}
                    width={1024}
                    height={1536}
                    loading="lazy"
                    className="h-60 w-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.2)] transition-transform duration-500 group-hover:-translate-y-2"
                  />
                </div>
                <div className="p-6">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${v.badge}`}
                  >
                    {v.tag}
                  </span>
                  <h3 className="mt-4 text-2xl font-extrabold">{v.name}</h3>
                  <p
                    className={`mt-2 text-sm ${v.dark ? "text-zinc-300" : "text-muted-foreground"}`}
                  >
                    {v.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients */}
      <section
        id="ingredients"
        className="border-y border-border/50 bg-card/40 py-20 sm:py-28"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-start">
            <div className="lg:sticky lg:top-24">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                Ingredients
              </p>
              <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">
                Ingredients you can trust.
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Real fuel from real food. If you can't pronounce it, it's not in
                Bolt+.
              </p>
            </div>
            <ul className="space-y-3">
              {ingredients.map((ing, i) => (
                <li
                  key={ing.title}
                  className="flex items-start gap-5 rounded-2xl border bg-card p-5 shadow-[var(--shadow-card)]"
                >
                  <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-bold">{ing.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{ing.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Quote / proof */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Honest fuel
          </p>
          <h2 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
            No crash.
            <br />
            Just clean energy.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Most pre-workouts and energy drinks rely on synthetic stimulants and
            sugar that spike you up — then drop you. Bolt+ uses real food, real
            electrolytes, and a measured caffeine dose so you stay sharp from
            first sip to last set.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section
        className="relative overflow-hidden border-y border-border/50 py-20 sm:py-28"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.96 0.04 80) 0%, var(--cream) 100%)",
        }}
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Pre-launch
            </p>
            <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">
              Get early launch access.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              Sign up to be the first to get Bolt+ when we launch — plus an
              exclusive early-bird discount on your first order.
            </p>
          </div>
          <div className="mt-10">
            <EarlyAccessForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              FAQ
            </p>
            <h2 className="mt-3 text-4xl font-extrabold sm:text-5xl">
              Quick answers.
            </h2>
          </div>
          <Accordion type="single" collapsible className="mt-10">
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-left text-base font-semibold">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/40 py-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <div className="font-display text-xl font-extrabold tracking-tight">
              BOLT<span className="text-primary">+</span>
            </div>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              Honey-powered energy gels. Made in Bengaluru. FSSAI compliant.
            </p>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="mailto:hello@boltplus.in" className="hover:text-foreground">
              Contact
            </a>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Bolt+. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
