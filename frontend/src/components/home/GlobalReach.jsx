import React, { useState } from "react";
import { GLOBAL_REACH } from "../../lib/content";
import SectionHeading from "../common/SectionHeading";
import { useReveal } from "../../lib/animations";

const ORIGIN = { x: 67, y: 49 }; // Pakistan (approx)

function arc(a, b) {
  const mx = (a.x + b.x) / 2;
  const my = Math.min(a.y, b.y) - 12;
  return `M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`;
}

export default function GlobalReach() {
  const [hover, setHover] = useState(null);
  const mapRef = useReveal();

  return (
    <section data-testid="global-section" className="relative bg-obsidian py-28 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern-global pointer-events-none" />
      
      <div className="section-pad mx-auto max-w-[1400px]">
        <SectionHeading
          eyebrow="GLOBAL FOOTPRINT"
          title={GLOBAL_REACH.headline}
          sub={GLOBAL_REACH.sub}
          align="center"
          className="mb-16"
        />

        <div
          ref={mapRef}
          className="relative mx-auto aspect-[2/1] w-full max-w-5xl overflow-hidden border border-white/[0.06] bg-carbon"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1.4px)",
            backgroundSize: "18px 18px",
          }}
        >
          {/* Arcs */}
          <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
            {GLOBAL_REACH.regions.map((r) => (
              <path
                key={r.name}
                d={arc(ORIGIN, { x: r.x, y: r.y / 2 })}
                fill="none"
                stroke="rgba(197, 160, 90,0.35)"
                strokeWidth="0.26"
                strokeDasharray="1 1"
              />
            ))}
          </svg>

          {/* Origin */}
          <div className="absolute" style={{ left: `${ORIGIN.x}%`, top: `${ORIGIN.y}%`, transform: "translate(-50%,-50%)" }}>
            <span className="block h-3 w-3 rounded-full bg-gold shadow-[0_0_18px_4px_rgba(197, 160, 90,0.6)]" />
            <span className="label absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap text-gold">Karachi · HQ</span>
          </div>

          {/* Region dots */}
          {GLOBAL_REACH.regions.map((r) => (
            <button
              key={r.name}
              data-testid={`region-${r.name.replace(/\s+/g, "-").toLowerCase()}`}
              className="absolute"
              style={{ left: `${r.x}%`, top: `${r.y}%`, transform: "translate(-50%,-50%)" }}
              onMouseEnter={() => setHover(r.name)}
              onMouseLeave={() => setHover(null)}
            >
              <span className="absolute inset-0 -m-1 rounded-full border border-gold/50 pulse-ring" />
              <span className="relative block h-2.5 w-2.5 rounded-full bg-gold" />
              {hover === r.name && (
                <span className="absolute bottom-5 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap border border-white/10 bg-graphite px-3 py-1.5 text-xs text-platinum">
                  {r.name} · <span className="text-gold">{r.clients} clients</span>
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Export strip */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-3 gap-y-3">
          {GLOBAL_REACH.strip.map((c, i) => (
            <React.Fragment key={c}>
              <span className="label text-platinum/65">{c}</span>
              {i < GLOBAL_REACH.strip.length - 1 && <span className="text-gold/60">·</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
