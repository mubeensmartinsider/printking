import React, { useMemo, useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import { ThemePill } from "../common/ThemeToggle";
import MachineSpotlight from "./MachineSpotlight";
import MachineDetailDialog from "./MachineDetailDialog";

/* ============================================================
   MachineryShowcase — the fleet, presented as a spotlight.

   One machine at a time with its full specification, narrowed by
   a process filter, in whatever light/dark theme is active. Kept
   deliberately lean: a single filter row, a count and the theme
   control — no chrome for its own sake.
   ============================================================ */

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default function MachineryShowcase({ items }) {
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState(null);

  /* Index once so test ids / numbering stay stable while filtering */
  const indexed = useMemo(() => items.map((m, i) => ({ ...m, idx: i })), [items]);

  const categories = useMemo(() => {
    const seen = [];
    indexed.forEach((m) => {
      if (!seen.includes(m.category)) seen.push(m.category);
    });
    return seen;
  }, [indexed]);

  const counts = useMemo(
    () =>
      categories.reduce((acc, c) => {
        acc[c] = indexed.filter((m) => m.category === c).length;
        return acc;
      }, {}),
    [categories, indexed]
  );

  const visible = useMemo(
    () => (category === "All" ? indexed : indexed.filter((m) => m.category === category)),
    [indexed, category]
  );

  /* Prev / next inside the open dialog, scoped to what is on screen */
  const step = (dir) => {
    if (!active || visible.length < 2) return;
    const i = visible.findIndex((m) => m.idx === active.idx);
    setActive(visible[(i + dir + visible.length) % visible.length]);
  };

  const chipBase =
    "inline-flex items-center gap-1.5 border px-3 py-2 text-[11px] tracking-[0.06em] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:py-1";

  return (
    <div data-testid="machinery-showcase">
      {/* ── Filter, count, theme — one compact row ────────────────── */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3 border border-border-soft bg-surface-elevated px-4 py-3 shadow-[var(--shadow-card)]">
        <span className="label flex items-center gap-2 text-ink-tertiary">
          <SlidersHorizontal size={12} />
          Process
        </span>

        {["All", ...categories].map((c) => {
          const on = c === category;
          const count = c === "All" ? indexed.length : counts[c];
          return (
            <button
              key={c}
              type="button"
              data-testid={`machinery-filter-${slug(c)}`}
              onClick={() => setCategory(c)}
              aria-pressed={on}
              className={`${chipBase} ${
                on
                  ? "border-gold bg-gold/15 text-gold-ink"
                  : "border-border-soft bg-surface-base text-ink-secondary hover:border-gold/50 hover:text-ink"
              }`}
            >
              {c}
              <span className={`text-[10px] tabular-nums ${on ? "text-gold-ink/80" : "text-ink-tertiary"}`}>
                {count}
              </span>
            </button>
          );
        })}

        <div className="ml-auto flex items-center gap-3">
          <span className="hidden text-xs text-ink-secondary sm:block">
            <span className="text-sm font-medium text-ink">{visible.length}</span> of{" "}
            {indexed.length}
          </span>
          <ThemePill testId="machinery-theme-toggle" />
        </div>
      </div>

      {/* ── The fleet ────────────────────────────────────────────── */}
      <div className="mt-3">
        {visible.length === 0 ? (
          <p className="border border-dashed border-border-soft bg-surface-elevated px-6 py-14 text-center text-sm text-ink-secondary">
            No machines in this process yet.
          </p>
        ) : (
          <MachineSpotlight items={visible} onSelect={setActive} />
        )}
      </div>

      <MachineDetailDialog
        machine={active}
        onClose={() => setActive(null)}
        onPrev={() => step(-1)}
        onNext={() => step(1)}
      />
    </div>
  );
}