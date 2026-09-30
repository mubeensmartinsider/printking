import React, { useEffect, useRef } from "react";
import { gsap } from "../../lib/animations";

const PREFERS_REDUCED =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function PageHero({ eyebrow, title, sub, children, tight = false }) {
  const sectionRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef   = useRef(null);
  const subRef     = useRef(null);

  useEffect(() => {
    if (PREFERS_REDUCED) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (eyebrowRef.current) {
        tl.from(eyebrowRef.current, { y: 12, opacity: 0, duration: 0.45 }, 0.1);
      }
      if (titleRef.current) {
        /* Split the title into individual words, animate each in */
        const words = titleRef.current.querySelectorAll(".hw");
        tl.from(
          words.length ? words : titleRef.current,
          { y: 48, opacity: 0, duration: 0.7, stagger: 0.055, ease: "power4.out" },
          0.2
        );
      }
      if (subRef.current) {
        tl.from(subRef.current, { y: 18, opacity: 0, duration: 0.55 }, 0.5);
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* Split title string into word spans for the stagger */
  const titleWords = title ? String(title).split(" ") : [];

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden border-b border-border-soft bg-surface-primary pt-32 sm:pt-40 ${
        tight ? "pb-14" : "pb-24"
      }`}
    >
      {/* Subtle gold radial glow top-right */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{ background: "radial-gradient(80% 60% at 70% 0%, rgba(197,160,90,0.07), transparent 60%)" }}
      />

      <div className="section-pad relative mx-auto max-w-[1400px]">
        {eyebrow && (
          <span ref={eyebrowRef} className="label text-gold-ink">
            {eyebrow}
          </span>
        )}

        <h1
          ref={titleRef}
          className={`display max-w-4xl text-balance text-5xl leading-[1.05] text-ink ${
            tight ? "mt-4 sm:text-5xl lg:text-6xl" : "mt-6 sm:text-6xl lg:text-7xl"
          }`}
        >
          {titleWords.map((word, i) => (
            <span key={i} className="hw inline-block" style={{ marginRight: "0.28em" }}>
              {word}
            </span>
          ))}
        </h1>

        {sub && (
          <p
            ref={subRef}
            className={`max-w-2xl leading-relaxed text-ink/55 ${
              tight ? "mt-4 text-base" : "mt-7 text-lg"
            }`}
          >
            {sub}
          </p>
        )}
        {children && (
          <div className={tight ? "mt-6" : "mt-10"}>{children}</div>
        )}
      </div>
    </section>
  );
}
