import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger list items (ms). Applied when the element becomes visible. */
  delayMs?: number;
  /** Subtle zoom on reveal for depth */
  scale?: boolean;
};

export function ScrollReveal({
  children,
  className,
  delayMs = 0,
  scale = false,
}: ScrollRevealProps) {
  const { ref, visible } = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={visible && delayMs > 0 ? { transitionDelay: `${delayMs}ms` } : undefined}
      className={cn(
        "will-change-[opacity,transform]",
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-10 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100",
        scale &&
          (visible ? "motion-safe:scale-100" : "motion-safe:scale-[0.96] motion-reduce:scale-100"),
        "motion-safe:transition-[opacity,transform] motion-safe:duration-[900ms] motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
        className,
      )}
    >
      {children}
    </div>
  );
}
