import React, { useEffect, useRef } from "react";

/* ============================================================
   Magnetic cursor system (desktop / fine-pointer only)
   - Custom gold dot + ring that follows with lerp
   - Expands over interactive elements
   - Elements with [data-magnetic] are gently pulled toward cursor
   ============================================================ */
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    document.body.classList.add("has-custom-cursor");

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: mouse.x, y: mouse.y };
    let hovering = false;
    let raf;

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onOver = (e) => {
      const t = e.target.closest("a, button, [data-cursor], input, textarea, select, [role='button']");
      hovering = Boolean(t);
    };

    const magnets = () => Array.from(document.querySelectorAll("[data-magnetic]"));

    const tick = () => {
      ring.x += (mouse.x - ring.x) * 0.18;
      ring.y += (mouse.y - ring.y) * 0.18;

      if (dotRef.current) dotRef.current.style.transform = `translate(${mouse.x}px, ${mouse.y}px)`;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.x}px, ${ring.y}px) scale(${hovering ? 1.9 : 1})`;
        ringRef.current.style.borderColor = hovering ? "rgba(197, 160, 90,0.9)" : "rgba(197, 160, 90,0.5)";
        ringRef.current.style.backgroundColor = hovering ? "rgba(197, 160, 90,0.10)" : "transparent";
      }

      // magnetic pull
      magnets().forEach((el) => {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = mouse.x - cx;
        const dy = mouse.y - cy;
        const dist = Math.hypot(dx, dy);
        const radius = 90;
        if (dist < radius) {
          el.style.transform = `translate(${dx * 0.18}px, ${dy * 0.18}px)`;
        } else if (el.style.transform) {
          el.style.transform = "translate(0px, 0px)";
        }
      });

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.body.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
    </>
  );
}
