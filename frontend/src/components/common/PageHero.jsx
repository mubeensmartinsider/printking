import React from "react";
import { useReveal } from "../../lib/animations";

export default function PageHero({ eyebrow, title, sub, children, tight = false }) {
  const ref = useReveal({ y: 40 });
  return (
    <section
      className={`relative overflow-hidden border-b border-border-soft bg-surface-primary pt-40 ${
        tight ? "pb-14" : "pb-24"
      }`}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(80% 60% at 70% 0%, rgba(197,160,90,0.07), transparent 60%)" }}
      />
      <div ref={ref} className="section-pad relative mx-auto max-w-[1400px]">
        {eyebrow && <span className="label text-gold">{eyebrow}</span>}
        <h1
          className={`display max-w-4xl text-balance text-5xl leading-[1.05] text-ink ${
            tight ? "mt-4 sm:text-5xl lg:text-6xl" : "mt-6 sm:text-6xl lg:text-7xl"
          }`}
        >
          {title}
        </h1>
        {sub && (
          <p
            className={`max-w-2xl leading-relaxed text-ink/55 ${
              tight ? "mt-4 text-base" : "mt-7 text-lg"
            }`}
          >
            {sub}
          </p>
        )}
        {children && <div className={tight ? "mt-6" : "mt-10"}>{children}</div>}
      </div>
    </section>
  );
}
