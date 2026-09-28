import React from "react";
import { useCountUp } from "../../lib/animations";

/* ============================================================
   MachineryStats — the facility figures, counted up on scroll.
   Fully theme-aware: the card, rule and copy all use surface /
   ink tokens so the band reads correctly in light and dark.
   ============================================================ */

const withCommas = (v) => Math.round(v).toLocaleString("en-US");

function StatCard({ value, suffix, label, detail }) {
  const ref = useCountUp(value, { suffix, format: withCommas });

  return (
    <div className="group relative flex flex-col justify-between border border-border-soft bg-surface-elevated p-5 transition-all duration-500 ease-lux hover:-translate-y-1 hover:border-gold/50 hover:shadow-[var(--shadow-card-hover)]">
      <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div>
        <div ref={ref} className="display text-3xl text-ink sm:text-4xl">
          0{suffix}
        </div>
        <div className="label mt-2 text-gold-ink">{label}</div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-ink-secondary">{detail}</p>
    </div>
  );
}

export default function MachineryStats({ stats }) {
  return (
    <div
      data-testid="machinery-stats"
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
    >
      {stats.map((s) => (
        <StatCard key={s.label} {...s} />
      ))}
    </div>
  );
}
