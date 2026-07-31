import React, { useEffect, useRef, useCallback } from "react";

const IS_TOUCH = () =>
  typeof window !== "undefined" && "ontouchstart" in window;

const IDLE_TIMEOUT = 2000; // 2 seconds of inactivity → stop RAF

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const rafRef = useRef(null);
  const idleRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const isRunning = useRef(false);

  const lerp = useCallback((a, b, t) => a + (b - a) * t, []);

  useEffect(() => {
    if (IS_TOUCH()) return;

    document.body.classList.add("has-custom-cursor");

    // Start the animation loop
    const startRAF = () => {
      if (isRunning.current) return;
      isRunning.current = true;

      const animate = () => {
        if (!isRunning.current) return;
        if (ringRef.current) {
          ringPos.current.x = lerp(ringPos.current.x, mouseRef.current.x, 0.12);
          ringPos.current.y = lerp(ringPos.current.y, mouseRef.current.y, 0.12);
          ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
        }
        rafRef.current = requestAnimationFrame(animate);
      };
      rafRef.current = requestAnimationFrame(animate);
    };

    // Stop the animation loop (idle)
    const stopRAF = () => {
      isRunning.current = false;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    // Reset idle timer on mouse move
    const resetIdle = () => {
      if (idleRef.current) clearTimeout(idleRef.current);
      if (!isRunning.current) startRAF();
      idleRef.current = setTimeout(stopRAF, IDLE_TIMEOUT);
    };

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
      resetIdle();
    };

    const onMouseOver = (e) => {
      const target = e.target;
      if (!ringRef.current) return;

      const isGold =
        target.closest(".btn-gold") ||
        target.closest('[class*="text-gold"]') ||
        target.closest("[data-cursor='gold']");

      const isImage = target.closest("img") || target.closest("[data-cursor='image']");

      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-cursor='pointer']");

      if (isGold) {
        ringRef.current.style.width = "48px";
        ringRef.current.style.height = "48px";
        ringRef.current.style.borderColor = "rgba(197, 160, 90, 0.8)";
        ringRef.current.style.background = "rgba(197, 160, 90, 0.08)";
        ringRef.current.style.backdropFilter = "blur(2px)";
      } else if (isImage) {
        ringRef.current.style.width = "56px";
        ringRef.current.style.height = "56px";
        ringRef.current.style.borderColor = "rgba(197, 160, 90, 0.6)";
        ringRef.current.style.background = "rgba(197, 160, 90, 0.05)";
        ringRef.current.style.backdropFilter = "blur(2px)";
      } else if (isInteractive) {
        ringRef.current.style.width = "48px";
        ringRef.current.style.height = "48px";
        ringRef.current.style.borderColor = "rgba(197, 160, 90, 0.6)";
        ringRef.current.style.background = "rgba(197, 160, 90, 0.05)";
      } else {
        ringRef.current.style.width = "36px";
        ringRef.current.style.height = "36px";
        ringRef.current.style.borderColor = "rgba(197, 160, 90, 0.5)";
        ringRef.current.style.background = "transparent";
        ringRef.current.style.backdropFilter = "none";
      }
    };

    // Start initial animation
    startRAF();

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      stopRAF();
      if (idleRef.current) clearTimeout(idleRef.current);
    };
  }, [lerp]);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ transform: "translate(-100px, -100px)" }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ transform: "translate(-100px, -100px)" }}
      />
    </>
  );
}