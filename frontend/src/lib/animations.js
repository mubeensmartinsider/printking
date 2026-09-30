/* ============================================================
   PRINTKING — Reusable GSAP scroll-entrance system
   ============================================================ */
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * Live reduced-motion preference.
 *
 * Every animated component needs this, and they must agree. A module-level
 * `matchMedia(...).matches` snapshot is evaluated once at import time, so it
 * goes stale if the user flips the OS setting mid-session — and each component
 * that re-declares the constant can drift out of sync with the others. This
 * hook subscribes to changes and is the single source of truth.
 */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia(REDUCED_QUERY).matches
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia(REDUCED_QUERY);
    // Re-sync on mount in case the preference changed between render and effect.
    setReduced(mq.matches);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/* Single element reveal — y/opacity entrance.
   When reduced motion is on we skip the tween entirely, which leaves the
   element in its natural visible state (gsap.from would otherwise pin it at
   opacity 0 and wait for a trigger that may never fire). */
export function useReveal(opts = {}) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const ctx = gsap.context(() => {
      gsap.from(el, {
        y: opts.y ?? 60,
        opacity: 0,
        duration: opts.duration ?? 0.9,
        delay: opts.delay ?? 0,
        ease: "power3.out",
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: el,
          start: opts.start ?? "top 85%",
          invalidateOnRefresh: true,
        },
      });
    }, el);
    return () => ctx.revert();
  }, [reduced]); // eslint-disable-line react-hooks/exhaustive-deps
  return ref;
}

/* Staggered children reveal — pass a selector for children */
export function useStagger(selector = ":scope > *", opts = {}) {
  const ref = useRef(null);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const ctx = gsap.context(() => {
      const items = el.querySelectorAll(selector);
      gsap.from(items, {
        y: opts.y ?? 40,
        opacity: 0,
        stagger: opts.stagger ?? 0.08,
        duration: opts.duration ?? 0.7,
        ease: "power2.out",
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: el,
          start: opts.start ?? "top 85%",
          invalidateOnRefresh: true,
        },
      });
    }, el);
    return () => ctx.revert();
  }, [reduced]); // eslint-disable-line react-hooks/exhaustive-deps
  return ref;
}

/* Count-up animation triggered on scroll into view.
   `format` lets callers add thousands separators (e.g. 12,000 m²). */
export function useCountUp(target, { suffix = "", duration = 2, format = (v) => Math.round(v) } = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obj = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: target,
        duration,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
        onUpdate: () => {
          el.textContent = format(obj.val) + suffix;
        },
      });
    }, el);
    return () => ctx.revert();
  }, [target]); // eslint-disable-line react-hooks/exhaustive-deps
  return ref;
}
