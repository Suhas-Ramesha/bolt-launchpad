import { useEffect, useLayoutEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const HOLD_MS_PHONE = 4500;
const EXIT_MS_PHONE = 1000;
/** Tailwind `lg` — longer dwell so laptop/desktop can read the full intro */
const HOLD_MS_LAPTOP = 7500;
const EXIT_MS_LAPTOP = 1200;
const LAPTOP_UP_MQ = "(min-width: 1024px)";

const letters = ["B", "O", "L", "T"] as const;

type Stage = "in" | "out" | "off";

function dwellForViewport(): { hold: number; exit: number } {
  if (typeof window === "undefined") {
    return { hold: HOLD_MS_PHONE, exit: EXIT_MS_PHONE };
  }
  return window.matchMedia(LAPTOP_UP_MQ).matches
    ? { hold: HOLD_MS_LAPTOP, exit: EXIT_MS_LAPTOP }
    : { hold: HOLD_MS_PHONE, exit: EXIT_MS_PHONE };
}

export function SplashIntro({ children }: { children: ReactNode }) {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [stage, setStage] = useState<Stage>("in");
  const [dwell, setDwell] = useState(dwellForViewport);

  useLayoutEffect(() => {
    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMq.matches) {
      setReduceMotion(true);
      setStage("off");
    }

    const widthMq = window.matchMedia(LAPTOP_UP_MQ);
    const syncDwell = () => setDwell(dwellForViewport());
    syncDwell();
    widthMq.addEventListener("change", syncDwell);
    return () => widthMq.removeEventListener("change", syncDwell);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setStage("off");
      return;
    }
    
    const t1 = window.setTimeout(() => setStage("out"), dwell.hold);
    const t2 = window.setTimeout(() => setStage("off"), dwell.hold + dwell.exit);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [reduceMotion, dwell.hold, dwell.exit]);

  useEffect(() => {
    if (stage === "off") return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [stage]);

  return (
    <>
      {stage !== "off" && (
        <div
          className={cn(
            "fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden bg-[var(--cream)]",
            "motion-safe:transition-[opacity,transform,filter] motion-safe:duration-[820ms] motion-safe:ease-[cubic-bezier(0.65,0,0.35,1)]",
            stage === "out" &&
              "pointer-events-none opacity-0 motion-safe:scale-[1.06] motion-safe:blur-[12px]",
          )}
          aria-hidden
        >
          <span className="sr-only" aria-live="polite">
            Loading Bolt+
          </span>
          
          {/* Animated background with pulsing glow */}
          <div
            className="pointer-events-none absolute inset-0 animate-splash-vignette"
            style={{
              background:
                "radial-gradient(ellipse 120% 85% at 50% 42%, oklch(0.99 0.025 84 / 0.35) 0%, transparent 58%), radial-gradient(ellipse 55% 48% at 82% 18%, oklch(0.82 0.14 80 / 0.4) 0%, transparent 52%), radial-gradient(ellipse 48% 42% at 12% 88%, oklch(0.72 0.12 62 / 0.28) 0%, transparent 48%)",
            }}
          />
          
          {/* Dynamic light rays */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div 
              className="absolute left-1/2 top-1/2 h-[200%] w-[200%] -translate-x-1/2 -translate-y-1/2 animate-splash-rays"
              style={{
                background: "conic-gradient(from 0deg at 50% 50%, transparent 0deg, oklch(0.85 0.15 75 / 0.15) 45deg, transparent 90deg, oklch(0.85 0.15 75 / 0.15) 135deg, transparent 180deg, oklch(0.85 0.15 75 / 0.15) 225deg, transparent 270deg, oklch(0.85 0.15 75 / 0.15) 315deg, transparent 360deg)"
              }}
            />
          </div>
          
          <div className="relative flex flex-col items-center px-6">
            <p className="mb-8 text-[10px] font-semibold uppercase tracking-[0.45em] text-muted-foreground animate-splash-tag">
              Energizing
            </p>
            
            {/* Main logo with dramatic animations and lighting effects */}
            <div
              className="relative flex select-none items-baseline justify-center gap-[0.06em] font-display text-[clamp(2.75rem,11vw,5.25rem)] font-extrabold leading-none tracking-[0.07em]"
              aria-label="Bolt Plus"
            >
              {/* Glow effect behind text */}
              <div 
                className="pointer-events-none absolute inset-0 -z-10 blur-3xl animate-splash-glow"
                style={{
                  background: "radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.78 0.16 70 / 0.5) 0%, transparent 70%)"
                }}
              />
              
              {letters.map((ch, i) => (
                <span
                  key={ch + String(i)}
                  className="relative inline-block animate-splash-letter-pop"
                  style={{ animationDelay: `${200 + i * 200}ms` }}
                >
                  {/* Text with gradient and shimmer */}
                  <span 
                    className="relative inline-block bg-[linear-gradient(110deg,var(--honey-glow)_0%,var(--honey-deep)_20%,oklch(0.95_0.08_70)_35%,var(--honey-glow)_50%,var(--honey-deep)_65%,oklch(0.52_0.12_52)_80%,var(--honey-glow)_100%)] bg-clip-text text-transparent animate-shimmer bg-[length:300%_100%]"
                    style={{
                      filter: "drop-shadow(0 0 12px oklch(0.85 0.15 70 / 0.5))"
                    }}
                  >
                    {ch}
                  </span>
                  
                  {/* Light sweep effect */}
                  <span 
                    className="pointer-events-none absolute inset-0 animate-splash-light-sweep"
                    style={{
                      background: "linear-gradient(90deg, transparent 0%, oklch(1 0 0 / 0.8) 50%, transparent 100%)",
                      backgroundSize: "200% 100%",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      color: "transparent",
                      animationDelay: `${400 + i * 200}ms`
                    }}
                  >
                    {ch}
                  </span>
                </span>
              ))}
              
              {/* Plus sign with dramatic spin */}
              <span
                className="relative ml-[0.12em] inline-block text-[0.95em] animate-splash-plus-spin"
                style={{ animationDelay: `${200 + letters.length * 200}ms` }}
              >
                <span 
                  className="relative inline-block bg-[linear-gradient(135deg,oklch(0.95_0.08_70),var(--honey-glow),var(--honey-deep),oklch(0.58_0.16_58),var(--honey-glow),oklch(0.95_0.08_70))] bg-clip-text text-transparent animate-shimmer bg-[length:300%_100%]"
                  style={{
                    filter: "drop-shadow(0 0 16px oklch(0.85 0.15 70 / 0.6))"
                  }}
                >
                  +
                </span>
                
                {/* Plus light sweep */}
                <span 
                  className="pointer-events-none absolute inset-0 animate-splash-light-sweep"
                  style={{
                    background: "linear-gradient(90deg, transparent 0%, oklch(1 0 0 / 0.9) 50%, transparent 100%)",
                    backgroundSize: "200% 100%",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                    animationDelay: `${400 + letters.length * 200}ms`
                  }}
                >
                  +
                </span>
              </span>
            </div>
          </div>
        </div>
      )}
      <div
        className={cn(
          stage === "in" && "motion-safe:opacity-0 motion-safe:pointer-events-none",
          stage === "out" &&
            "motion-safe:pointer-events-auto motion-safe:opacity-100 motion-safe:transition-opacity motion-safe:duration-700 motion-safe:ease-out",
          stage === "off" && "opacity-100",
        )}
      >
        {children}
      </div>
    </>
  );
}