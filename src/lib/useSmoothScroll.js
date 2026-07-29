/* ============================================================
   PRINTKING — Smooth scroll (disabled for performance)
   Native scroll is used instead to avoid continuous rAF overhead.
   ============================================================ */
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "./animations";

let lenisInstance = null;

export function getLenis() {
  return lenisInstance;
}

export function useSmoothScroll() {
  useEffect(() => {
    // Refresh ScrollTrigger after load/fonts settle
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(refresh);
    }
    const t1 = setTimeout(refresh, 700);
    const t2 = setTimeout(refresh, 1800);

    return () => {
      window.removeEventListener("load", refresh);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);
}
