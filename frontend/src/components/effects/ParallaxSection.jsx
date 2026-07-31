import React, { useEffect, useRef } from "react";
import { gsap } from "../../lib/animations";

/**
 * ParallaxSection — Creates parallax scrolling effect on children.
 *
 * Props:
 *   speed: parallax speed factor (0.1 to 0.5, default 0.2)
 *   direction: "up" | "down" (default "up")
 *   className: additional classes
 *   as: wrapper element tag (default "div")
 */
export default function ParallaxSection({
  children,
  speed = 0.2,
  direction = "up",
  className = "",
  as = "div",
  ...props
}) {
  const ref = useRef(null);
  const Tag = as;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const yMove = direction === "up" ? speed * 100 : -speed * 100;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 0 },
        {
          y: yMove,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
            invalidateOnRefresh: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [speed, direction]);

  return (
    <Tag
      ref={ref}
      className={`parallax-slow ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}