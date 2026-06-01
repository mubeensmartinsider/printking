/* ============================================================
   PRINTKING — Reusable GSAP scroll-entrance system
   ============================================================ */
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

/* Single element reveal — y/opacity entrance */
export function useReveal(opts = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.from(el, {
        y: opts.y ?? 60,
        opacity: 0,
        duration: opts.duration ?? 0.9,
        delay: opts.delay ?? 0,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: opts.start ?? "top 85%" },
      });
    }, el);
    return () => ctx.revert();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return ref;
}

/* Staggered children reveal — pass a selector for children */
export function useStagger(selector = ":scope > *", opts = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      const items = el.querySelectorAll(selector);
      gsap.from(items, {
        y: opts.y ?? 40,
        opacity: 0,
        stagger: opts.stagger ?? 0.08,
        duration: opts.duration ?? 0.7,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: opts.start ?? "top 80%" },
      });
    }, el);
    return () => ctx.revert();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return ref;
}

/* Count-up animation triggered on scroll into view */
export function useCountUp(target, { suffix = "", duration = 2 } = {}) {
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
          el.textContent = Math.round(obj.val) + suffix;
        },
      });
    }, el);
    return () => ctx.revert();
  }, [target]); // eslint-disable-line react-hooks/exhaustive-deps
  return ref;
}
