import React from "react";
import { SUSTAINABILITY } from "../../lib/content";
import { useReveal, useStagger } from "../../lib/animations";

export default function Sustainability() {
  const quoteRef = useReveal();
  const headRef  = useReveal();
  const gridRef  = useStagger("[data-sus]", { stagger: 0.08 });

  return (
    <section data-testid="sustainability-section" className="bg-surface-base py-28">
      <div className="section-pad mx-auto max-w-[1400px]">
        <div ref={quoteRef} className="mx-auto mb-24 max-w-3xl text-center">
          <span className="label text-gold">{SUSTAINABILITY.eyebrow}</span>
          <p className="display mt-8 text-4xl italic leading-snug text-ink sm:text-[40px]">
            "{SUSTAINABILITY.quote}"
          </p>
          <span className="label mt-8 block text-gold">{SUSTAINABILITY.quoteAttribution}</span>
        </div>

        <div ref={headRef} className="mb-16">
          <h2 className="display text-3xl leading-[1.1] text-ink sm:text-4xl">
            {SUSTAINABILITY.headline[0]} <span className="italic">{SUSTAINABILITY.headline[1]}</span>
          </h2>
        </div>

        <div ref={gridRef} className="grid gap-x-12 gap-y-14 md:grid-cols-3">
          {SUSTAINABILITY.items.map((item) => (
            <div key={item.title} data-sus className="group">
              <span className="display block text-5xl font-light leading-none text-ink/[0.06] transition-colors duration-300 group-hover:text-ink/[0.14]">
                {item.num}
              </span>
              <span className="mt-5 block h-px w-8 bg-gold transition-all duration-300 group-hover:w-12" />
              <h3 className="mt-5 text-lg font-medium text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-[1.7] text-ink/55">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
