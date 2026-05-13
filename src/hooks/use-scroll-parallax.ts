import { type RefObject, useEffect, useState } from "react";

/** Subtle vertical shift while the section moves through the viewport (wheel / touch scroll). */
export function useScrollParallaxPx<T extends HTMLElement>(
  ref: RefObject<T | null>,
  strength = 12,
) {
  const [shift, setShift] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const t = (r.top + r.height * 0.3) / vh - 0.42;
      const clamped = Math.max(-1, Math.min(1, -t));
      setShift(clamped * strength);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [strength]);

  return { transform: `translate3d(0, ${shift}px, 0)` } as const;
}
