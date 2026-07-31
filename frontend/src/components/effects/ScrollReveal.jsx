import React, { useEffect, useRef } from "react";
import { gsap } from "../../lib/animations";

/**
 * ScrollReveal — Enhanced scroll-triggered animation component.
 *
 * Props:
 *   variant: "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale" | "words" | "chars" | "split"
 *   duration: animation duration (default 0.9)
 *   delay: animation delay (default 0)
 *   stagger: stagger delay for children (default 0)
 *   threshold: scroll trigger threshold (default "top 85%")
 *   once: whether animation plays once (default true)
 *   className: additional classes
 *   as: wrapper element tag (default "div")
 */
export default function ScrollReveal({
  children,
  variant = "fade-up",
  duration = 0.9,
  delay = 0,
  stagger = 0,
  threshold = "top 85%",
  once = true,
  className = "",
  as = "div",
  ...props
}) {
  const ref = useRef(null);
  const Tag = as;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // Build animation config based on variant
      const getVars = () => {
        const base = {
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: threshold,
            once,
            invalidateOnRefresh: true,
          },
        };

        switch (variant) {
          case "fade-up":
            return { ...base, y: 60, opacity: 0 };
          case "fade-down":
            return { ...base, y: -60, opacity: 0 };
          case "fade-left":
            return { ...base, x: -60, opacity: 0 };
          case "fade-right":
            return { ...base, x: 60, opacity: 0 };
          case "scale":
            return { ...base, scale: 0.9, opacity: 0 };
          case "words": {
            // Split text into words and animate each
            const text = el.textContent;
            const words = text.split(" ");
            el.innerHTML = words
              .map(
                (w) =>
                  `<span class="inline-block reveal-word" style="opacity:0;transform:translateY(30px)">${w}&nbsp;</span>`
              )
              .join("");
            return {
              ...base,
              y: 0,
              opacity: 1,
              stagger: stagger || 0.04,
              scrollTrigger: {
                trigger: el,
                start: threshold,
                once,
              },
            };
          }
          case "chars": {
            // Split text into characters
            const text2 = el.textContent;
            el.innerHTML = text2
              .split("")
              .map(
                (c) =>
                  `<span class="inline-block reveal-char" style="opacity:0;transform:translateY(30px)">${
                    c === " " ? "&nbsp;" : c
                  }</span>`
              )
              .join("");
            return {
              ...base,
              y: 0,
              opacity: 1,
              stagger: stagger || 0.015,
              scrollTrigger: {
                trigger: el,
                start: threshold,
                once,
              },
            };
          }
          case "split": {
            // Clip-path horizontal reveal
            return {
              ...base,
              clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
              ease: "power4.out",
              scrollTrigger: {
                trigger: el,
                start: threshold,
                once,
              },
            };
          }
          default:
            return { ...base, y: 60, opacity: 0 };
        }
      };

      const vars = getVars();

      if (variant === "words" || variant === "chars") {
        // Animate the spans
        const spans = el.querySelectorAll(".reveal-word, .reveal-char");
        if (spans.length) {
          gsap.to(spans, vars);
        }
      } else {
        gsap.from(el, vars);
      }
    }, el);

    return () => ctx.revert();
  }, [variant, duration, delay, stagger, threshold, once]);

  return (
    <Tag ref={ref} className={className} {...props}>
      {children}
    </Tag>
  );
}