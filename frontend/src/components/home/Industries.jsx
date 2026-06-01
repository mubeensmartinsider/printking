import React from "react";
import { INDUSTRIES } from "../../lib/content";
import SectionHeading from "../common/SectionHeading";
import { useStagger } from "../../lib/animations";

export default function Industries() {
  const gridRef = useStagger("[data-hex]", { stagger: 0.06 });

  return (
    <section data-testid="industries-section" className="bg-obsidian py-28">
      <div className="section-pad mx-auto max-w-[1400px]">
        <SectionHeading
          eyebrow="WHO WE SERVE"
          title="Built for Every Industry That Values Quality"
          align="center"
          className="mb-20"
        />

        <div ref={gridRef} className="mx-auto grid max-w-4xl grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
          {INDUSTRIES.map((ind) => (
            <div key={ind.name} data-hex className="flex justify-center">
              <div className="group relative h-[150px] w-[132px]">
                <div className="hexagon absolute inset-0 bg-graphite transition-colors duration-500 group-hover:bg-[#1f1c12]" />
                <div className="hexagon absolute inset-[1px] flex flex-col items-center justify-center bg-carbon px-3 text-center transition-all duration-500 group-hover:bg-[#16140c]">
                  <span className="text-sm font-medium leading-tight text-platinum transition-opacity duration-300 group-hover:opacity-0">
                    {ind.name}
                  </span>
                  <span className="absolute px-4 text-[11px] leading-snug text-gold opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {ind.desc}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
