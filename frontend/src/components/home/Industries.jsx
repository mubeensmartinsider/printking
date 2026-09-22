import React from "react";
import { INDUSTRIES } from "../../lib/content";
import SectionHeading from "../common/SectionHeading";
import * as Icons from "lucide-react";

export default function Industries() {
  return (
    <section data-testid="industries-section" className="relative bg-surface-base py-28 overflow-hidden">
      <div className="section-pad mx-auto max-w-4xl relative z-10">
        <SectionHeading
          eyebrow="WHO WE SERVE"
          title="Quality."
          titleItalic="Served Across Industries."
          sub="From fashion houses to financial institutions — if your brand demands premium print and packaging, we have served your industry for over 15 years."
          align="center"
          className="mb-20"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((ind) => {
            const Icon = Icons[ind.icon];
            return (
              <div
                key={ind.name}
                className="group relative overflow-hidden rounded-sm border-t-2 border-gold/30 bg-surface-elevated p-8 shadow-sm transition-all duration-300 hover:border-gold hover:-translate-y-1.5"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <div className="relative z-10 flex flex-col items-center text-center">
                  {Icon && (
                    <Icon className="w-10 h-10 text-gold stroke-1.5 mb-4 transition-transform duration-300 group-hover:scale-110" />
                  )}
                  <h3 className="text-sm font-semibold text-ink leading-tight mb-2 transition-colors duration-300 group-hover:text-gold">
                    {ind.name}
                  </h3>
                  <p className="text-xs text-ink/55 leading-relaxed">{ind.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
