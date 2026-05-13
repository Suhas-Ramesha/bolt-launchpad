import { useEffect, useLayoutEffect, useRef, useState } from "react";

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** True if a meaningful portion of the element is already in the viewport (sync check). */
function isAlreadyInView(el: HTMLElement) {
  const r = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  const margin = vh * 0.06;
  return r.top < vh - margin && r.bottom > margin;
}

export function useScrollReveal<T extends HTMLElement>(options?: {
  rootMargin?: string;
  threshold?: number;
}) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  const rootMargin = options?.rootMargin ?? "0px 0px 14% 0px";
  const threshold = options?.threshold ?? 0.04;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      setVisible(true);
      return;
    }
    if (isAlreadyInView(el)) setVisible(true);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) return;
    if (visible) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const hit = entries.some((e) => e.isIntersecting);
        if (hit) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin, threshold },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [visible, rootMargin, threshold]);

  return { ref, visible };
}
