import React from "react";
import { Printer, Scissors, Sparkles, Square, Package, Factory } from "lucide-react";
import { MANUFACTURING } from "../../lib/content";
import SectionHeading from "../common/SectionHeading";
import { useStagger } from "../../lib/animations";

const ICONS = { Printer, Scissors, Sparkles, Square, Package, Factory };

export default function Manufacturing() {
  const gridRef = useStagger("[data-card]");

  return (
    <section data-testid="manufacturing-section" className="relative overflow-hidden bg-carbon py-28">
      <div className="lux-grid absolute inset-0 opacity-60" />
      <div className="section-pad relative mx-auto max-w-[1400px]">
        <SectionHeading
          eyebrow={MANUFACTURING.eyebrow}
          title={MANUFACTURING.headline}
          sub={MANUFACTURING.sub}
          className="mb-16"
        />

        <div ref={gridRef} className="grid gap-px overflow-hidden border border-white/[0.06] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-3">
          {MANUFACTURING.cards.map((card) => {
            const Icon = ICONS[card.icon] || Package;
            return (
              <div
                key={card.title}
                data-card
                className="group relative bg-carbon p-10 transition-colors duration-500 hover:bg-graphite"
              >
                <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
                <Icon size={28} strokeWidth={1.3} className="text-gold" />
                <h3 className="mt-8 text-xl font-medium text-platinum">{card.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-platinum/55">{card.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
