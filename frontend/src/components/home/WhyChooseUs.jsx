import React from "react";
import { WHY_CHOOSE } from "../../lib/content";
import SectionHeading from "../common/SectionHeading";
import { useStagger } from "../../lib/animations";

export default function WhyChooseUs() {
  const gridRef = useStagger("[data-feat]", { stagger: 0.06 });

  return (
    <section data-testid="why-section" className="bg-carbon py-28">
      <div className="section-pad mx-auto max-w-[1400px]">
        <SectionHeading
          eyebrow="WHY PRINTKING"
          title="The Standard Others Measure Against"
          className="mb-20"
        />

        <div ref={gridRef} className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {WHY_CHOOSE.map((f) => (
            <div key={f.num} data-feat className="border-t border-white/[0.08] pt-6">
              <span className="display block text-5xl text-gold lg:text-6xl">{f.num}</span>
              <h3 className="mt-5 text-lg font-medium text-platinum">{f.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-platinum/55">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
