import React from "react";
import { Printer, Scissors, Sparkles, Square, Package, Factory } from "lucide-react";
import { MANUFACTURING } from "../../lib/content";
import SectionHeading from "../common/SectionHeading";
import { useStagger } from "../../lib/animations";

const ICONS = { Printer, Scissors, Sparkles, Square, Package, Factory };

export default function Manufacturing() {
  const gridRef = useStagger("[data-card]");

  return (
    <section data-testid="manufacturing-section" className="relative bg-carbon">
      <div className="lux-grid absolute inset-0 opacity-60" />
      <div className="px-6 md:px-10 lg:px-16 relative mx-auto max-w-[1400px]">
        <div ref={gridRef} className="grid overflow-hidden border border-white/[0.06] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-3">
          {MANUFACTURING.cards.map((card) => {
            const Icon = ICONS[card.icon] || Package;
            return (
              <div
                key={card.title}
                data-card
                className="group relative bg-carbon p-3 transition-all duration-500 hover:bg-graphite hover:shadow-[0_12px_40px_rgba(0,0,0,0.6),0_0_0_1px_rgba(197,160,90,0.1)]"
              >
                {/* Background pattern */}
                <div className="absolute inset-0 bg-pattern-manufacturing pointer-events-none" />
                
                {/* Card glow overlay */}
                <div className="card-glow-overlay" />

                {/* Ghost icon in background */}
                <div className="manufacturing-card-ghost-icon">
                  <Icon className="w-full h-full text-gold" />
                </div>

                {/* Corner accents */}
                <div className="corner-accent corner-accent-tl" />
                <div className="corner-accent corner-accent-br" />

                {/* Border shimmer */}
                <div className="card-border-shimmer" />

                <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
                <div className="relative z-10">
                  <Icon size={18} strokeWidth={1.3} className="text-gold transition-transform duration-300 group-hover:scale-110" />
                  <h3 className="mt-1 text-sm font-medium text-platinum transition-colors duration-300 group-hover:text-gold">{card.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-platinum/55">{card.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
