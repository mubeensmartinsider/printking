import React, { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, usePrefersReducedMotion } from "../../lib/animations";

export default function SectionHeading({
  eyebrow,
  title,
  titleItalic,
  sub,
  align = "left",
  className = "",
}) {
  const wrapRef    = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef   = useRef(null);
  const subRef     = useRef(null);
  const reduced    = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const wrap = wrapRef.current;
    if (!wrap) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: "top 88%",
          once: true,
          invalidateOnRefresh: true,
        },
        defaults: { ease: "power3.out" },
      });

      /* Eyebrow — fade + slide up */
      if (eyebrowRef.current) {
        tl.from(eyebrowRef.current, { y: 14, opacity: 0, duration: 0.5 }, 0);
      }

      /* Headline — clip-path wipe from left, line by line */
      if (titleRef.current) {
        tl.from(
          titleRef.current,
          {
            clipPath: "inset(0 100% 0 0)",
            opacity: 0,
            duration: 0.85,
            ease: "power4.out",
          },
          0.1
        );
      }

      /* Sub-text — fade up */
      if (subRef.current) {
        tl.from(subRef.current, { y: 16, opacity: 0, duration: 0.6 }, 0.35);
      }
    }, wrap);

    return () => ctx.revert();
  }, [reduced]);

  const centered = align === "center";

  return (
    <div
      ref={wrapRef}
      className={`flex max-w-2xl flex-col gap-2 ${centered ? "mx-auto items-center text-center" : "items-start"} ${className}`}
    >
      {eyebrow && (
        <span ref={eyebrowRef} className="label text-gold-ink">
          {eyebrow}
        </span>
      )}

      <h2
        ref={titleRef}
        className="display text-balance text-4xl leading-[1.08] text-ink sm:text-5xl lg:text-[52px]"
        style={{ willChange: "clip-path, opacity" }}
      >
        {title}
        {titleItalic && <span className="italic"> {titleItalic}</span>}
      </h2>

      {sub && (
        <p
          ref={subRef}
          className={`max-w-xl text-base leading-relaxed text-ink-secondary ${centered ? "mt-2" : ""}`}
        >
          {sub}
        </p>
      )}
    </div>
  );
}
