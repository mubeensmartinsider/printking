import React, { useRef, useCallback } from "react";

export default function MagneticButton({
  children,
  className = "",
  as = "button",
  strength = 0.3,
  ...props
}) {
  const ref = useRef(null);
  const posRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  const handleMouseMove = useCallback(
    (e) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * strength;
      const y = (e.clientY - rect.top - rect.height / 2) * strength;
      posRef.current = { x, y };

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        if (ref.current) {
          ref.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px) scale(1.02)`;
        }
      });
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (ref.current) {
      ref.current.style.transform = "translate(0, 0) scale(1)";
    }
    posRef.current = { x: 0, y: 0 };
  }, []);

  const Tag = as;

  return (
    <Tag
      ref={ref}
      className={`magnetic-btn ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        willChange: "transform",
        display: "inline-block",
      }}
      {...props}
    >
      {children}
    </Tag>
  );
}