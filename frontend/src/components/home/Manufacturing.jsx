import React from "react";
import { Printer, Scissors, Sparkles, Square, Package, Factory } from "lucide-react";
import { MANUFACTURING } from "../../lib/content";
import SectionHeading from "../common/SectionHeading";
import { useStagger } from "../../lib/animations";

const ICONS = { Printer, Scissors, Sparkles, Square, Package, Factory };

export default function Manufacturing() {
  const gridRef = useStagger("[data-card]");

  return (
    <section data-testid="manufacturing-section" className="relative bg-surface-primary py-20 lg:py-28">
      <div className="px-6 md:px-10 lg:px-16 relative mx-auto max-w-[1400px]">
        <SectionHeading
          eyebrow={MANUFACTURING.eyebrow}
          title={MANUFACTURING.headline}
          sub={MANUFACTURING.sub}
          className="mb-14"
        />
        <div ref={gridRef} className="grid overflow-hidden border border-border-soft sm:grid-cols-2 lg:grid-cols-3">
          {MANUFACTURING.cards.map((card) => {
            const Icon = ICONS[card.icon] || Package;
            return (
              <div
                key={card.title}
                data-card
                className="group relative bg-surface-primary p-6 transition-all duration-500 hover:bg-surface-elevated border-b border-r border-border-soft last:border-b-0"
              >
                <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
                <div className="relative z-10">
                  <Icon size={20} strokeWidth={1.3} className="text-gold mb-3 transition-transform duration-300 group-hover:scale-110" />
                  <h3 className="text-sm font-semibold text-ink mb-1 transition-colors duration-300 group-hover:text-gold">{card.title}</h3>
                  <p className="text-xs leading-relaxed text-ink/55">{card.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
