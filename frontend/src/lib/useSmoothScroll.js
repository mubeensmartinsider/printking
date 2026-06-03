/* ============================================================
   PRINTKING — Optimized smooth scroll with Lenis
   Performance-first configuration
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

    // Detect if mobile for performance optimization
    const isMobile = window.innerWidth < 768;

    const lenis = new Lenis({
      duration: isMobile ? 1.0 : 1.2, // Faster on mobile
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !isMobile, // Disable smooth wheel on mobile for better performance
      wheelMultiplier: 0.8, // Reduced for less aggressive scrolling
      touchMultiplier: 1.4, // Reduced for smoother touch
      infinite: false,
      syncTouch: false, // Better mobile performance
      syncTouchLerp: 0.1,
    });
    lenisInstance = lenis;

    // Sync with ScrollTrigger only when needed
    lenis.on("scroll", ScrollTrigger.update);

    // Use requestAnimationFrame for better performance
    const raf = (time) => {
      lenis.raf(time * 1000);
    };
    
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Optimized refresh strategy - only when necessary
    const refresh = () => {
      ScrollTrigger.refresh();
    };

    // Single delayed refresh after initial load
    const loadHandler = () => {
      setTimeout(refresh, 500);
    };

    window.addEventListener("load", loadHandler, { once: true, passive: true });
    
    // Font loading refresh
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        setTimeout(refresh, 300);
      });
    }

    return () => {
      window.removeEventListener("load", loadHandler);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
}
