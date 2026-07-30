import React from "react";
import { SUSTAINABILITY } from "../../lib/content";
import { useReveal, useStagger } from "../../lib/animations";

export default function Sustainability() {
  const quoteRef = useReveal();
  const headRef = useReveal();
  const gridRef = useStagger("[data-sus]", { stagger: 0.08 });

  return (
    <section data-testid="sustainability-section" className="bg-obsidian py-28">
      <div className="section-pad mx-auto max-w-[1400px]">
        {/* Zone A — commitment statement */}
        <div ref={quoteRef} className="mx-auto mb-24 max-w-3xl text-center">
          <span className="label text-gold">{SUSTAINABILITY.eyebrow}</span>
          <p className="display mt-8 text-4xl italic leading-snug text-platinum sm:text-[40px]">
            “{SUSTAINABILITY.quote}”
          </p>
          <span className="label mt-8 block text-gold">{SUSTAINABILITY.quoteAttribution}</span>
        </div>

        <div ref={headRef} className="mb-16">
          <h2 className="display text-3xl leading-[1.1] text-platinum sm:text-4xl">
            {SUSTAINABILITY.headline[0]} <span className="italic">{SUSTAINABILITY.headline[1]}</span>
          </h2>
        </div>

        {/* Zone B — editorial blocks */}
        <div ref={gridRef} className="grid gap-x-12 gap-y-14 md:grid-cols-3">
          {SUSTAINABILITY.items.map((item) => (
            <div key={item.title} data-sus className="group relative">
              {/* Background pattern */}
              <div className="absolute inset-0 bg-pattern-sustainability pointer-events-none rounded-lg" />
              
              {/* Card glow overlay */}
              <div className="card-glow-overlay rounded-lg" />

              <div className="relative z-10">
                <span className="display block text-5xl font-light leading-none text-white/[0.05] transition-colors duration-300 group-hover:text-white/[0.12]">
                  {item.num}
                </span>
                <span className="mt-5 block h-px w-8 bg-gold transition-all duration-300 group-hover:w-12" />
                <h3 className="mt-5 text-lg font-medium text-platinum">{item.title}</h3>
                <p className="mt-3 text-sm leading-[1.7] text-platinum/55">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
