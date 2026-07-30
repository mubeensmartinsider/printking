import React from "react";
import { WHY_CHOOSE } from "../../lib/content";
import { useReveal, useStagger } from "../../lib/animations";

export default function WhyChooseUs() {
  const headRef = useReveal();
  const gridRef = useStagger("[data-feat]", { stagger: 0.06 });

  return (
    <section data-testid="why-section" className="relative overflow-hidden bg-carbon py-28">
      {/* EXCELLENCE watermark */}
      <span className="display pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[18vw] leading-none text-white/[0.02]">
        EXCELLENCE
      </span>

      <div className="section-pad relative mx-auto max-w-[1400px]">
        <div ref={headRef} className="mb-20 max-w-2xl">
          <span className="label text-gold">OUR ADVANTAGE</span>
          <h2 className="display mt-6 text-4xl leading-[1.08] text-platinum sm:text-5xl">
            The Standard Others
            <br />
            <span className="italic">Measure Against.</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-platinum/55">
            Fifteen years of refinement — in machinery, materials, people, and process.
          </p>
        </div>

        <div ref={gridRef} className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE.map((f) => (
            <div key={f.num} data-feat className="group relative">
              {/* Background pattern */}
              <div className="absolute inset-0 bg-pattern-why pointer-events-none rounded-lg" />
              
              {/* Card glow overlay */}
              <div className="card-glow-overlay rounded-lg" />

              <div className="relative z-10">
                <span className="display block text-6xl font-light leading-none text-white/[0.05] transition-colors duration-300 group-hover:text-white/[0.12] lg:text-[80px]">
                  {f.num}
                </span>
                <span className="mt-5 block h-px w-8 bg-gold transition-all duration-300 group-hover:w-12" />
                <h3 className="mt-5 text-base font-semibold text-platinum transition-colors duration-300 group-hover:text-gold">
                  {f.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.7] text-platinum/55">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
