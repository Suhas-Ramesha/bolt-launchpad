import * as React from "react";
import { Quote, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export type ReviewItem = {
  id: string;
  quote: string;
  name: string;
  role: string;
  rating: number;
};

const REVIEWS: ReviewItem[] = [
  {
    id: "1",
    quote:
      "Finally a gel that does not taste like cough syrup. I used Buzz 50 before a tempo run — steady lift, zero jitters.",
    name: "Ananya K.",
    role: "Club runner, Bengaluru",
    rating: 5,
  },
  {
    id: "2",
    quote:
      "Classic is my desk-day fuel. No crash at 4pm like coffee alone. Honey-forward but not overly sweet.",
    name: "Rahul M.",
    role: "Product designer",
    rating: 5,
  },
  {
    id: "3",
    quote:
      "Buzz 150 on leg day was legit. Clean focus through a heavy squat session — I am picky about caffeine sources.",
    name: "Vikram S.",
    role: "Strength coach",
    rating: 5,
  },
  {
    id: "4",
    quote:
      "Short ingredient list matters to me. Bolt+ reads like food, not a chemistry set. Excited for launch.",
    name: "Meera P.",
    role: "Triathlete",
    rating: 4,
  },
  {
    id: "5",
    quote:
      "Tried all three variants. Buzz 50 is my sweet spot for morning runs. Clean taste, easy to carry, no sticky mess.",
    name: "Priya D.",
    role: "Marathon runner, Mumbai",
    rating: 5,
  },
  {
    id: "6",
    quote:
      "I coach athletes who need real food, not chemicals. Bolt+ is the first gel I can recommend without caveats.",
    name: "Arjun T.",
    role: "Sports nutritionist",
    rating: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={cn(
            "h-4 w-4 shrink-0",
            i < count ? "fill-primary text-primary" : "fill-muted/30 text-muted/40",
          )}
          aria-hidden
        />
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: ReviewItem }) {
  return (
    <figure className="group relative mx-3 flex w-[340px] shrink-0 flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-[var(--shadow-card)] transition-all duration-500 hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 sm:w-[380px]">
      <Quote
        className="absolute right-4 top-4 h-8 w-8 text-primary/10 transition-colors duration-300 group-hover:text-primary/25"
        aria-hidden
      />
      <blockquote className="relative pr-6">
        <p className="text-[0.95rem] font-medium leading-relaxed text-foreground sm:text-base">
          &ldquo;{review.quote}&rdquo;
        </p>
      </blockquote>
      <figcaption className="relative mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border/50 pt-4">
        <div>
          <Stars count={review.rating} />
          <p className="mt-1.5 text-sm font-bold text-foreground">{review.name}</p>
          <p className="text-xs text-muted-foreground">{review.role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export function ReviewsCarousel() {
  const [paused, setPaused] = React.useState(false);
  const [reduceMotion, setReduceMotion] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Quadruple for seamless mobile looping
  const multiplied = [...REVIEWS, ...REVIEWS, ...REVIEWS, ...REVIEWS];

  return (
    <section
      id="reviews"
      className="scroll-mt-28 border-y border-border/50 bg-[linear-gradient(180deg,oklch(0.99_0.012_84)_0%,var(--cream)_35%,oklch(0.985_0.014_82)_100%)] py-14 sm:py-20"
      aria-labelledby="reviews-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary animate-fade-in-up">
            Early voices
          </p>
          <h2
            id="reviews-heading"
            className="headline-tight mx-auto mt-3 max-w-[18ch] text-balance font-display text-3xl font-extrabold leading-[1.08] sm:text-4xl md:text-[2.55rem] animate-fade-in-up [animation-delay:100ms]"
          >
            What testers are saying
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground sm:mt-4 animate-fade-in-up [animation-delay:200ms]">
            Quotes from people who tried pre-production batches. Individual results vary; Bolt+ is a
            food supplement, not medicine.
          </p>
        </div>
      </div>

      <div
        className="relative mt-10 overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Left/right fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[oklch(0.99_0.012_84)] to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[oklch(0.99_0.012_84)] to-transparent sm:w-24" />

        <div
          className={cn(
            "flex w-max py-4",
            !reduceMotion && "animate-ticker-mobile md:animate-ticker",
            paused && !reduceMotion && "[animation-play-state:paused]",
          )}
        >
          {multiplied.map((r, i) => (
            <ReviewCard key={`${r.id}-${i}`} review={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
