/* ============================================================
   use3DTilt — reusable CSS-perspective 3D tilt on mouse move.
   Skipped entirely under prefers-reduced-motion.
   ============================================================ */
import { useRef, useCallback, useEffect } from "react";
import { usePrefersReducedMotion } from "./animations";

/**
 * @param {object} opts
 * @param {number} opts.max    – max tilt degrees  (default 12)
 * @param {number} opts.scale  – hover scale       (default 1.03)
 * @param {number} opts.glare  – show glare sheen  (default true)
 * @param {number} opts.speed  – reset duration ms (default 500)
 */
export default function use3DTilt({
  max = 12,
  scale = 1.03,
  glare = true,
  speed = 500,
} = {}) {
  const ref     = useRef(null);
  const glareRef = useRef(null);
  const frameRef = useRef(null);
  const reduced  = usePrefersReducedMotion();

  /* Cancel any in-flight frame and clear the inline transform on unmount.
     Without this a card that unmounts mid-tilt keeps a stale inline
     transform, which reappears when it remounts under fast navigation. */
  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (ref.current) ref.current.style.transform = "";
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onMove = useCallback((e) => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const rect   = el.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = e.clientX - cx;
      const dy     = e.clientY - cy;
      const tiltX  = -(dy / (rect.height / 2)) * max;
      const tiltY  =  (dx / (rect.width  / 2)) * max;

      el.style.transform  = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${scale},${scale},${scale})`;
      el.style.transition = "transform 0.08s linear";

      if (glare && glareRef.current) {
        const angle   = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
        const opacity = (Math.hypot(dx, dy) / (rect.width / 2)) * 0.18;
        glareRef.current.style.transform = `rotate(${angle}deg)`;
        glareRef.current.style.opacity   = String(Math.min(opacity, 0.18));
      }
    });
  }, [max, scale, glare, reduced]);

  const onLeave = useCallback(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    el.style.transform  = "perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
    el.style.transition = `transform ${speed}ms cubic-bezier(0.34,1.56,0.64,1)`;
    if (glare && glareRef.current) glareRef.current.style.opacity = "0";
  }, [speed, glare, reduced]);

  return { ref, glareRef, onMove, onLeave };
}
