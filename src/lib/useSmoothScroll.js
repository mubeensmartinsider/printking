/* ============================================================
   PRINTKING — Lenis smooth scroll, synced with GSAP ScrollTrigger
   ============================================================ */
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "./animations";

let lenisInstance = null;

export function getLenis() {
  return lenisInstance;
}

export function useSmoothScroll() {
  useEffect(() => {
    // Respect reduced-motion preference
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });
    lenisInstance = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // The 3D hero canvas, web fonts and lazy images settle AFTER the first
    // paint, which shifts every section's position. Without recalculating,
    // ScrollTrigger keeps stale start values and some entrance animations
    // (e.g. the Services grid) never fire — leaving content stuck invisible.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(refresh);
    }
    const t1 = setTimeout(refresh, 700);
    const t2 = setTimeout(refresh, 1800);
    const t3 = setTimeout(refresh, 3200);

    return () => {
      window.removeEventListener("load", refresh);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
}
