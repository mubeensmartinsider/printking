import React, { useEffect, useMemo, useState } from "react";
import { ChevronsDownUp, ChevronsUpDown } from "lucide-react";
import FaqRow from "./FaqRow";

/* ============================================================
   List view — every question on one page, grouped by topic.
   Dense by design: the fastest way to scan or search, with
   one-click expand / collapse for the whole page.
   ============================================================ */

/* Stable, test-id friendly key from the topic name */
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default function FaqList({ categories }) {
  const keys = useMemo(
    () => categories.flatMap((c) => c.items.map((_, i) => `${c.category}-${i}`)),
    [categories]
  );
  const [open, setOpen] = useState(() => new Set());

  /* A search can change the set of questions on screen */
  useEffect(() => {
    setOpen((prev) => {
      const next = new Set([...prev].filter((k) => keys.includes(k)));
      return next.size === prev.size ? prev : next;
    });
  }, [keys]);

  const toggle = (key) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const allOpen = open.size === keys.length && keys.length > 0;
  const toggleAll = () => setOpen(allOpen ? new Set() : new Set(keys));

  return (
    <div data-testid="faq-view-list">
      {/* The toolbar above already shows the count — this is the only control
          the list itself needs. */}
      <div className="mb-3 flex justify-end">
        <button
          type="button"
          onClick={toggleAll}
          data-testid="faq-toggle-all"
          aria-pressed={allOpen}
          className="inline-flex items-center gap-1.5 border border-border-soft px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-tertiary transition-colors duration-300 hover:border-gold/60 hover:text-gold-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          {allOpen ? <ChevronsDownUp size={12} /> : <ChevronsUpDown size={12} />}
          {allOpen ? "Collapse all" : "Expand all"}
        </button>
      </div>

      <div className="space-y-6">
        {categories.map((cat) => (
          <section key={cat.category}>
            <h2 className="label mb-2 flex items-center gap-2 text-ink-tertiary">
              <span className="h-px w-6 bg-gold/50" />
              {cat.category}
              <span className="text-ink-tertiary/70">({cat.items.length})</span>
            </h2>
            <div className="space-y-2">
              {cat.items.map((item, i) => {
                const key = `${cat.category}-${i}`;
                return (
                  <FaqRow
                    key={key}
                    q={item.q}
                    a={item.a}
                    index={i}
                    isOpen={open.has(key)}
                    onToggle={() => toggle(key)}
                    testId={`faq-q-${slug(cat.category)}-${i}`}
                  />
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
