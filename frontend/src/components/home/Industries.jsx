import React from "react";
import { INDUSTRIES } from "../../lib/content";
import SectionHeading from "../common/SectionHeading";
import * as Icons from "lucide-react";

export default function Industries() {
  return (
    <section data-testid="industries-section" className="relative bg-obsidian py-28 overflow-hidden">
      {/* Subtle warm radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] rounded-full bg-gradient-radial from-gold/4 to-transparent opacity-40"></div>
      </div>

      <div className="section-pad mx-auto max-w-4xl relative z-10">
        <SectionHeading
          eyebrow="WHO WE SERVE"
          title="Quality."
          titleItalic="Served Across Industries."
          sub="From fashion houses to financial institutions — if your brand demands premium print and packaging, we have served your industry for over 15 years."
          align="center"
          className="mb-20"
        />

        {/* 3-column grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((ind) => {
            const Icon = Icons[ind.icon];
            
            return (
              <div 
                key={ind.name}
                className="group relative overflow-hidden rounded-lg border-t-2 border-gold/30 bg-gradient-to-b from-graphite to-graphite-dark p-6 shadow-lg transition-all duration-300 hover:shadow-[0_0_32px_rgba(197,160,90,0.2)] hover:-translate-y-1.5"
              >
                {/* Background pattern */}
                <div className="absolute inset-0 bg-pattern-industries pointer-events-none" />
                
                {/* Card glow overlay */}
                <div className="card-glow-overlay" />

                {/* Ghost icon in background */}
                {Icon && (
                  <div className="industry-card-ghost-icon">
                    <Icon className="w-full h-full text-gold" />
                  </div>
                )}

                {/* Corner accents */}
                <div className="corner-accent corner-accent-tl" />
                <div className="corner-accent corner-accent-br" />

                {/* Border shimmer */}
                <div className="card-border-shimmer" />

                <div className="relative z-10 flex flex-col items-center text-center">
                  {/* Icon */}
                  {Icon && (
                    <Icon className="w-8 h-8 text-gold stroke-1.5 mb-4 transition-transform duration-300 group-hover:scale-110" />
                  )}
                  
                  {/* Industry name */}
                  <h3 className="text-sm font-semibold text-platinum leading-tight mb-2">
                    {ind.name}
                  </h3>

                  {/* Descriptor */}
                  <p className="text-xs text-platinum/60 leading-relaxed">
                    {ind.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
