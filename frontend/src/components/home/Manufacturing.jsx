import React from "react";
import { Printer, Scissors, Sparkles, Square, Package, Factory } from "lucide-react";
import { MANUFACTURING } from "../../lib/content";
import { useReveal, useStagger } from "../../lib/animations";

const ICONS = { Printer, Scissors, Sparkles, Square, Package, Factory };

export default function Manufacturing() {
  const headRef = useReveal({ y: 30 });
  const gridRef = useStagger("[data-card]", { stagger: 0.05, y: 20 });

  return (
    <section data-testid="manufacturing-section" className="relative overflow-hidden border-y border-border-soft bg-surface-elevated py-14 lg:py-16">
      {/* Ambient background — warm gold wash, drifting glow, faint grid, shimmer edge */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(75% 90% at 12% 105%, rgba(197,160,90,0.12), transparent 60%)" }} />
      <div aria-hidden className="glow-drift-rev pointer-events-none absolute -bottom-52 -right-36 h-[440px] w-[440px] rounded-full" style={{ background: "radial-gradient(circle, rgba(197,160,90,0.22), transparent 65%)" }} />
      <div aria-hidden className="lux-grid pointer-events-none absolute inset-0 opacity-40" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(197,160,90,0.7), transparent)", backgroundSize: "200% 100%", animation: "gold-shimmer 6s linear infinite" }} />
      <div className="relative mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        {/* Compact header — title left, description right on one row */}
        <div ref={headRef} className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="label text-gold">{MANUFACTURING.eyebrow}</span>
            <h2 className="display mt-1 text-3xl leading-[1.08] tracking-tight text-ink sm:text-4xl lg:text-[44px]">
              {MANUFACTURING.headline}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-ink/55 md:text-right">
            {MANUFACTURING.sub}
          </p>
        </div>

        {/* Pipeline strip — 6 steps across on desktop, hairline grid */}
        <div ref={gridRef} className="grid grid-cols-2 gap-px border border-border-soft bg-border-soft lg:grid-cols-3 xl:grid-cols-6">
          {MANUFACTURING.cards.map((card, idx) => {
            const Icon = ICONS[card.icon] || Package;
            return (
              <div
                key={card.title}
                data-card
                className="group relative bg-[#2dabe2] p-4 transition-all duration-500 hover:z-10 hover:-translate-y-1 hover:bg-[#3db5e7] hover:shadow-[0_18px_40px_-18px_rgba(45,171,226,0.55)] sm:p-5"
              >
                <span className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-white transition-transform duration-500 group-hover:scale-x-100" />
                <div className="flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white bg-white text-[#2dabe2] transition-all duration-300 group-hover:shadow-[0_4px_14px_rgba(0,0,0,0.18)]">
                    <Icon size={16} strokeWidth={1.5} />
                  </span>
                  <span className="font-display text-xs font-medium tracking-[0.18em] text-white/75 transition-colors duration-300 group-hover:text-white">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-3 text-xs font-semibold leading-snug text-ink sm:text-sm">
                  {card.title}
                </h3>
                <p className="mt-1 overflow-hidden text-[11px] leading-relaxed text-ink/70 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
