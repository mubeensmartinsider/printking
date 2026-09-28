import React, { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import PhotoFrame from "./PhotoFrame";

/* ============================================================
   Spotlight view — one machine at a time, projected large with
   its full specification. Auto-advances like a carousel, pauses
   on hover/focus, honours reduced-motion, and is fully operable
   with the keyboard (← / →) or the thumbnail rail.
   ============================================================ */

const ROTATE_MS = 6000;

const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const num = (i) => String(i + 1).padStart(2, "0");

export default function MachineSpotlight({ items, onSelect }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  /* A filter change can leave idx pointing past the end of the list */
  useEffect(() => {
    setIdx((p) => (p > items.length - 1 ? 0 : p));
  }, [items.length]);

  useEffect(() => {
    if (paused || reducedMotion() || items.length < 2) return undefined;
    const id = window.setInterval(
      () => setIdx((p) => (p + 1) % items.length),
      ROTATE_MS
    );
    return () => window.clearInterval(id);
  }, [paused, items.length]);

  const go = useCallback(
    (dir) => setIdx((p) => (p + dir + items.length) % items.length),
    [items.length]
  );

  if (!items.length) return null;
  const active = items[idx];

  const arrow =
    "flex h-10 w-10 flex-none items-center justify-center border border-border-soft bg-surface-elevated text-ink-secondary transition-all duration-300 hover:border-gold/60 hover:text-gold-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-gold";

  return (
    <div
      data-testid="machinery-view-spotlight"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
        if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
      }}
      className="overflow-hidden border border-border-soft bg-surface-elevated shadow-[var(--shadow-card)]"
    >
      <div className="grid lg:grid-cols-[1.45fr_1fr]">
        {/* Stage — click opens the full specification */}
        <button
          type="button"
          key={active.img}
          data-testid={`machine-${active.idx}`}
          onClick={() => onSelect(active)}
          aria-label={`Open full specification for ${active.name}`}
          className="group relative min-h-[200px] overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold sm:min-h-[260px] lg:min-h-[380px]"
        >
          <PhotoFrame
            src={active.img}
            alt={active.name}
            label={active.name}
            fill
            eager
            imgClassName="transition-transform duration-1000 ease-lux group-hover:scale-[1.04]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/55 via-obsidian/5 to-transparent" />

          <span className="pointer-events-none absolute left-5 top-5 border border-gold/30 bg-obsidian/70 px-2.5 py-1 text-[10px] font-medium tracking-[0.18em] text-gold-soft backdrop-blur-sm">
            {num(active.idx)} — {active.category}
          </span>

          <span className="pointer-events-none absolute bottom-5 right-5 inline-flex items-center gap-1.5 bg-gold px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-obsidian shadow-lg transition-transform duration-500 ease-lux group-hover:-translate-y-0.5">
            Full spec <Maximize2 size={11} />
          </span>
        </button>

        {/* Specification panel */}
        <div className="flex flex-col justify-center gap-3 border-t border-border-soft p-5 lg:border-l lg:border-t-0 lg:p-7">
          <div className="flex items-start justify-between gap-4">
            <span className="label text-gold-ink">{active.category}</span>
            <span className="label text-ink-tertiary">
              {num(idx)} / {num(items.length - 1)}
            </span>
          </div>

          <div>
            <h3 className="display text-2xl leading-tight text-ink sm:text-[28px]">
              {active.name}
            </h3>
            <p className="mt-1 text-xs uppercase tracking-[0.12em] text-ink-tertiary">
              {active.spec}
            </p>
          </div>

          <ul className="space-y-1.5 border-t border-border-soft pt-4">
            {active.specs.map((s) => (
              <li key={s} className="flex items-start gap-2.5 text-sm text-ink-secondary">
                <span className="mt-[7px] h-1 w-1 flex-none rounded-full bg-gold" />
                {s}
              </li>
            ))}
          </ul>

          <p className="border-l-2 border-gold/50 pl-4 text-sm leading-relaxed text-ink-secondary">
            {active.capability}
          </p>

          {/* Transport */}
          <div className="mt-1 flex items-center gap-3">
            <div className="flex flex-none gap-2">
              <button
                type="button"
                data-testid="machine-prev"
                onClick={() => go(-1)}
                aria-label="Previous machine"
                className={arrow}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                data-testid="machine-next"
                onClick={() => go(1)}
                aria-label="Next machine"
                className={arrow}
              >
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="flex flex-1 items-center gap-1.5">
              {items.map((m, i) => (
                <button
                  key={m.name}
                  type="button"
                  data-testid={`machine-dot-${i}`}
                  onClick={() => setIdx(i)}
                  aria-label={`Show ${m.name}`}
                  aria-current={i === idx}
                  className="group/dot flex h-4 flex-1 items-center"
                >
                  <span
                    className={`block h-[3px] w-full rounded-full transition-colors duration-300 ${
                      i === idx
                        ? "bg-gold"
                        : "bg-ink/15 group-hover/dot:bg-ink/40"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Thumbnail rail — quick jump to any machine in the current filter */}
      <div className="flex gap-1.5 overflow-x-auto border-t border-border-soft p-2">
        {items.map((m, i) => (
          <button
            key={m.name}
            type="button"
            data-testid={`machine-thumb-${i}`}
            onClick={() => setIdx(i)}
            aria-label={`Show ${m.name}`}
            aria-current={i === idx}
            className={`group/thumb flex w-36 flex-none items-center gap-2.5 border p-1.5 text-left transition-all duration-300 ${
              i === idx
                ? "border-gold/60 bg-surface-primary"
                : "border-transparent hover:border-border-soft hover:bg-surface-primary/70"
            }`}
          >
            <span className="h-8 w-11 flex-none overflow-hidden bg-surface-hover">
              <img
                src={m.img}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover opacity-80 transition-opacity duration-300 group-hover/thumb:opacity-100"
              />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[11px] font-medium text-ink">
                {m.name}
              </span>
              <span className="label block text-ink-tertiary">{m.category}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
