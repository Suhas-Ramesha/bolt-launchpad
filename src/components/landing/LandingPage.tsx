import { useRef, lazy, Suspense } from "react";
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
import { ReviewsCarousel } from "@/components/landing/ReviewsCarousel";
import { ScrollReveal } from "@/components/landing/ScrollReveal";
import { useScrollParallaxPx } from "@/hooks/use-scroll-parallax";
import boltClassic from "@/assets/bolt-classic.png";
import boltBuzz50 from "@/assets/bolt-buzz-50.png";
import boltBuzz150 from "@/assets/bolt-buzz-150.png";

const HeroPacket3D = lazy(() =>
  import("@/components/landing/HeroPacket3D").then((m) => ({ default: m.HeroPacket3D })),
);

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
  const whyGridRef = useRef<HTMLDivElement>(null);
  const whyParallax = useScrollParallaxPx(whyGridRef, 14);

  return (
    <main className="min-h-screen overflow-x-clip">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border/40 bg-background/80 backdrop-blur-md transition-all duration-300">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <Link
            to="/"
            className="group flex shrink-0 items-center gap-1 font-display text-xl font-extrabold tracking-[0.06em] sm:text-[1.35rem]"
          >
            BOLT<span className="text-primary transition-transform duration-300 inline-block group-hover:scale-110 group-hover:rotate-12">+</span>
          </Link>
          <nav
            className="hidden gap-8 text-sm font-medium text-muted-foreground sm:flex"
            aria-label="Page sections"
          >
            {(
              [
                ["#why", "Why"],
                ["#variants", "Variants"],
                ["#ingredients", "Ingredients"],
                ["#reviews", "Reviews"],
                ["#faq", "FAQ"],
              ] as const
            ).map(([href, label]) => (
              <a key={href} href={href} className="link-underline transition-colors duration-200 hover:text-foreground">
                {label}
              </a>
            ))}
          </nav>
          <Button asChild size="sm" className="shrink-0 font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 hover:scale-105 active:scale-95">
            <Link to="/enquire">Enquire</Link>
          </Button>
        </div>
        <nav
          className="flex gap-1 overflow-x-auto border-t border-border/30 px-4 py-2.5 [-ms-overflow-style:none] [scrollbar-width:none] sm:hidden [&::-webkit-scrollbar]:hidden"
          aria-label="Page sections"
        >
          {(
            [
              ["#why", "Why"],
              ["#variants", "Variants"],
              ["#ingredients", "Ingredients"],
              ["#reviews", "Reviews"],
              ["#faq", "FAQ"],
            ] as const
          ).map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="shrink-0 rounded-full border border-border/60 bg-card/80 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all duration-200 hover:border-primary/40 hover:text-foreground hover:bg-primary/5"
            >
              {label}
            </a>
          ))}
        </nav>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 -z-10 motion-safe:animate-hero-glow"
          style={{
            background:
              "radial-gradient(ellipse 90% 58% at 72% 12%, oklch(0.87 0.1 78 / 0.48) 0%, transparent 56%), radial-gradient(ellipse 70% 55% at 8% 88%, oklch(0.74 0.13 62 / 0.16) 0%, transparent 52%)",
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.65] mix-blend-multiply bg-[linear-gradient(108deg,transparent_0%,oklch(0.25_0.02_55/0.04)_10%,transparent_18%,transparent_82%,oklch(0.25_0.02_55/0.04)_90%,transparent_100%)]"
          aria-hidden
        />
        <div className="mx-auto max-w-6xl px-4 pt-12 pb-14 sm:px-6 sm:pt-16 sm:pb-20">
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14">
            <div className="text-center lg:text-left">
              <span className="inline-flex items-center gap-3 border-l-2 border-primary pl-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground sm:text-xs">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary motion-safe:animate-pulse" />
                Pre-launch
                <span className="font-normal tracking-normal text-border">/</span>
                <span className="tracking-[0.2em]">India</span>
              </span>
              <h1 className="mx-auto mt-7 max-w-xl text-balance font-display text-[2.65rem] font-extrabold leading-[1.02] tracking-[-0.04em] sm:text-6xl md:text-7xl lg:mx-0 animate-fade-in-up">
                Clean, smooth energy.
                <br />
                <span className="bg-[image:var(--gradient-honey)] bg-[length:200%_auto] bg-clip-text text-transparent motion-safe:animate-shimmer">
                  No crash.
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg lg:mx-0 animate-fade-in-up [animation-delay:200ms]">
                Honey-powered fuel — three caffeine levels, one ingredient list you can read in
                seconds.
              </p>
              <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start animate-fade-in-up [animation-delay:400ms]">
                <Button asChild size="lg" className="h-12 px-7 text-base font-semibold transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 hover:scale-[1.03] active:scale-[0.97]">
                  <Link to="/enquire">Enquire for early access</Link>
                </Button>
                <Button asChild size="lg" variant="ghost" className="h-12 px-5 text-base group/arrow">
                  <a href="#variants">See the lineup <span className="inline-block transition-transform duration-300 group-hover/arrow:translate-x-1">→</span></a>
                </Button>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
              <div
                className="pointer-events-none absolute -inset-4 rounded-[2rem] border border-primary/[0.08] bg-gradient-to-b from-card/50 to-transparent sm:-inset-6 sm:rounded-[2.5rem]"
                aria-hidden
              />
              <Suspense
                fallback={
                  <div className="relative mx-auto flex aspect-[3/4] w-full max-w-[min(22rem,88vw)] items-center justify-center">
                    <img
                      src={boltClassic}
                      alt="Bolt+ Classic energy gel sachet"
                      width={1024}
                      height={1536}
                      className="h-auto max-h-[min(520px,62vh)] w-full object-contain drop-shadow-[0_28px_50px_rgba(0,0,0,0.18)] motion-safe:animate-foil-float motion-reduce:animate-none"
                      fetchPriority="high"
                    />
                  </div>
                }
              >
                <HeroPacket3D className="relative mt-2 sm:mt-0" />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* Why */}
      <section
        id="why"
        className="scroll-mt-28 border-t border-border/50 bg-card/40 py-14 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollReveal scale>
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Why Bolt+
              </p>
              <h2 className="headline-tight mt-3 text-balance text-3xl font-extrabold sm:text-4xl md:text-5xl">
                Energy that respects your body.
              </h2>
            </div>
          </ScrollReveal>
          <div
            ref={whyGridRef}
            style={whyParallax}
            className="mt-10 grid auto-rows-fr gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4 motion-reduce:transform-none"
          >
            {benefits.map((b, i) => (
              <ScrollReveal key={b.title} delayMs={i * 75} className="h-full min-h-0">
                <div className="group flex h-full min-h-[300px] flex-col rounded-2xl rounded-br-md border border-border/80 bg-card p-6 shadow-[var(--shadow-card)] motion-safe:transition-all motion-safe:duration-500 hover:-translate-y-2 hover:border-primary/35 hover:shadow-2xl motion-reduce:hover:translate-y-0 sm:min-h-[320px] sm:p-7 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary motion-safe:transition-all motion-safe:duration-500 group-hover:scale-110 group-hover:bg-primary/15 group-hover:shadow-lg group-hover:shadow-primary/10">
                    <b.icon className="h-6 w-6 transition-transform duration-500 group-hover:rotate-3" aria-hidden />
                  </div>
                  <h3 className="relative mt-5 text-xl font-bold leading-snug">{b.title}</h3>
                  <p className="relative mt-4 flex-1 text-base leading-relaxed text-muted-foreground sm:text-[1.0625rem]">
                    {b.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Variants */}
      <section id="variants" className="scroll-mt-28 py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <ScrollReveal scale>
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                The Lineup
              </p>
              <h2 className="headline-tight mt-3 text-balance text-3xl font-extrabold sm:text-4xl md:text-5xl">
                Choose your energy level.
              </h2>
              <p className="mt-3 text-base text-muted-foreground sm:mt-4 sm:text-lg">
                Three honey-based gels. One for every kind of effort.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6">
            {variants.map((v, i) => (
              <ScrollReveal key={v.name} delayMs={i * 90}>
                <article
                  className={`group relative h-full overflow-hidden rounded-3xl border ring-1 ring-transparent transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
                    v.dark ? "bg-zinc-950 text-zinc-50 ring-zinc-800 hover:ring-amber-500/30" : "bg-card hover:ring-primary/20"
                  }`}
                >
                  <div
                    className={`relative flex h-72 items-center justify-center bg-gradient-to-br ${v.color} overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <img
                      src={v.image}
                      alt={`${v.name} sachet`}
                      width={1024}
                      height={1536}
                      loading="lazy"
                      className="relative h-60 w-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.2)] transition-all duration-700 group-hover:-translate-y-3 group-hover:scale-105 group-hover:drop-shadow-[0_30px_50px_rgba(0,0,0,0.3)]"
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
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ingredients */}
      <section
        id="ingredients"
        className="scroll-mt-28 border-y border-border/50 bg-[linear-gradient(165deg,oklch(0.99_0.01_84)_0%,transparent_55%),linear-gradient(180deg,var(--cream)_0%,oklch(0.975_0.016_82)_100%)] py-14 sm:py-20"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-start lg:gap-12">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <ScrollReveal scale>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    Ingredients
                  </p>
                  <h2 className="headline-tight mt-3 text-balance text-3xl font-extrabold sm:text-4xl md:text-5xl">
                    Ingredients you can trust.
                  </h2>
                  <p className="mt-3 text-base text-muted-foreground sm:mt-4 sm:text-lg">
                    Real fuel from real food. If you can't pronounce it, it's not in Bolt+.
                  </p>
                </div>
              </ScrollReveal>
            </div>
            <ul className="space-y-3">
              {ingredients.map((ing, i) => (
                <ScrollReveal key={ing.title} delayMs={i * 70}>
                  <li className="group flex items-start gap-5 rounded-2xl border bg-card p-5 shadow-[var(--shadow-card)] transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:-translate-x-1">
                    <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-primary text-sm font-bold text-primary-foreground transition-all duration-300 group-hover:scale-110 group-hover:shadow-md group-hover:shadow-primary/20">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-bold transition-colors duration-200 group-hover:text-primary">{ing.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{ing.body}</p>
                    </div>
                  </li>
                </ScrollReveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Quote / proof */}
      <section className="py-14 sm:py-20">
        <ScrollReveal className="mx-auto max-w-4xl px-4 sm:px-6" scale>
          <div className="rounded-2xl border border-border/40 bg-card/50 px-5 py-8 sm:px-8 sm:py-10">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Honest fuel
            </p>
            <h2 className="headline-tight mt-4 text-balance text-3xl font-extrabold leading-[1.1] sm:text-4xl md:text-5xl">
              No crash.
              <br />
              Just clean energy.
            </h2>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
              Most pre-workouts and energy drinks rely on synthetic stimulants and sugar that spike
              you up — then drop you. Bolt+ uses real food, real electrolytes, and a measured
              caffeine dose so you stay sharp from first sip to last set.
            </p>
          </div>
        </ScrollReveal>
      </section>

      <ReviewsCarousel />

      {/* CTA */}
      <section
        id="early-access"
        className="scroll-mt-28 relative overflow-hidden border-y border-border/50 py-14 sm:py-20"
        style={{
          background: "linear-gradient(180deg, oklch(0.96 0.04 80) 0%, var(--cream) 100%)",
        }}
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Pre-launch
              </p>
              <h2 className="headline-tight mt-3 text-balance text-3xl font-extrabold sm:text-4xl md:text-5xl">
                Get early launch access.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
                Sign up to be the first to get Bolt+ when we launch — plus an exclusive early-bird
                discount on your first order.
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                Prefer a focused page?{" "}
                <Link
                  to="/enquire"
                  className="font-medium text-foreground underline-offset-4 hover:underline"
                >
                  Open the enquire form
                </Link>
                .
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal className="mt-10" delayMs={120}>
            <EarlyAccessForm />
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-28 py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">FAQ</p>
              <h2 className="headline-tight mt-3 text-3xl font-extrabold sm:text-4xl md:text-5xl">
                Quick answers.
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal className="mt-10" delayMs={80}>
            <Accordion type="single" collapsible>
              {faqs.map((f) => (
                <AccordionItem key={f.q} value={f.q}>
                  <AccordionTrigger className="text-left text-base font-semibold">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/40 py-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <div className="group font-display text-xl font-extrabold tracking-[0.06em]">
              BOLT<span className="text-primary inline-block transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">+</span>
            </div>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              Honey-powered energy gels. Made in Bengaluru. FSSAI compliant.
            </p>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <Link to="/enquire" className="link-underline transition-colors duration-200 hover:text-foreground">
              Enquire
            </Link>
            <a href="#" className="link-underline transition-colors duration-200 hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="link-underline transition-colors duration-200 hover:text-foreground">
              Terms
            </a>
            <a href="mailto:hello@boltplus.in" className="link-underline transition-colors duration-200 hover:text-foreground">
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
