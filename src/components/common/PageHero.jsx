import React from "react";
import { useReveal } from "../../lib/animations";

/* Inner-page hero — compact, cinematic header */
export default function PageHero({ eyebrow, title, sub, children }) {
  const ref = useReveal({ y: 40 });
  return (
    <section className="relative overflow-hidden border-b border-white/[0.06] bg-carbon pt-40 pb-24">
      <div className="lux-grid absolute inset-0 opacity-50" />
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(80% 60% at 70% 0%, rgba(197, 160, 90,0.08), transparent 60%)" }}
      />
      <div ref={ref} className="section-pad relative mx-auto max-w-[1400px]">
        {eyebrow && <span className="label text-gold">{eyebrow}</span>}
        <h1 className="display mt-6 max-w-4xl text-balance text-5xl leading-[1.05] text-platinum sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        {sub && <p className="mt-7 max-w-2xl text-lg leading-relaxed text-platinum/55">{sub}</p>}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
