import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useStagger } from "../../lib/animations";

/* ============================================================
   MachineryCollage — the fleet as a spotlight image collage.

   Photographs only. No name, spec or caption is painted onto any
   tile: the images are the content, and the section heading above
   already carries the description. Hovering gives a quiet lift, a
   gold hairline and the short category word; the machine's full
   name and specifications live in the lightbox you get on click.

   Layout — one large capped plate led by the seventh machine, with
   the remaining eight in a 2/4-up band beneath it.

   The nine source photos are all landscape (mostly 3:2), so tiles
   crop with object-cover and a centre focal point rather than
   letterboxing. A 3:2 placeholder holds each tile until the file
   decodes so nothing reflows.
   ============================================================ */

/* ------------------------------------------------------------------
   Tile — one machine photo. The frame adopts the photo's real aspect
   ratio while it loads (3:2 until then) so the collage never jumps.
   ------------------------------------------------------------------ */
function Tile({ src, alt, className = "", imgClassName = "" }) {
  const [ratio, setRatio] = useState(null);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={`flex items-center justify-center bg-surface-hover ${className}`} aria-hidden="true">
        <span className="h-8 w-8 rounded-full border border-border-soft" />
      </div>
    );
  }

  return (
    <div
      className={`relative w-full overflow-hidden bg-surface-hover ${className}`}
      style={ratio ? { aspectRatio: ratio } : { aspectRatio: "3 / 2" }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={(e) => {
          const el = e.currentTarget;
          if (el.naturalWidth && el.naturalHeight) setRatio(`${el.naturalWidth} / ${el.naturalHeight}`);
        }}
        onError={() => setFailed(true)}
        className={`absolute inset-0 h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  );
}

/* ------------------------------------------------------------------
   Frame — the button wrapper every tile reuses: border, hover lift,
   gold hairline, the category veil and the expand affordance.

   `dense` shrinks the hover chrome for the small band tiles.
   ------------------------------------------------------------------ */
function Frame({ m, onSelect, className = "", dense = false, zoom = "group-hover:scale-[1.06]" }) {
  return (
    <button
      type="button"
      data-testid={`machine-${m.idx}`}
      data-tile
      onClick={() => onSelect(m)}
      aria-label={`View ${m.name} - ${m.category}`}
      className={`group relative block w-full overflow-hidden border border-border-soft bg-surface-elevated text-left transition-all duration-500 ease-lux hover:z-10 hover:border-gold/60 hover:shadow-[var(--shadow-card-hover)] ${className}`}
    >
      <Tile
        src={m.img}
        alt={m.name}
        className="h-full w-full"
        imgClassName={`transition-transform duration-slow ease-lux ${zoom}`}
      />

      {/* Veil + category word on hover. Deliberately not the machine name:
          nine names stacked over nine photos reads as a list, which is
          exactly what this section is trying not to be. */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 flex items-end bg-gradient-to-t from-obsidian/80 via-obsidian/10 to-transparent ${dense ? "p-2" : "p-3"} opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100`}
      >
        <span className={`label translate-y-1 text-gold-soft transition-transform duration-500 ease-lux group-hover:translate-y-0 ${dense ? "text-[9px]" : ""}`}>
          {m.category}
        </span>
      </span>

      <span
        aria-hidden="true"
        className={`absolute right-2 top-2 flex ${dense ? "h-6 w-6" : "h-8 w-8"} -translate-y-1 items-center justify-center border border-white/30 bg-obsidian/50 text-white/80 opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100`}
      >
        <Maximize2 size={dense ? 11 : 13} />
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------
   Spotlight — one large plate with a supporting band beneath it.

   LEAD_INDEX (zero-based) is the hero machine — 6, the seventh, which
   is /assets/7.jpeg. Held as a named constant so re-ordering or
   swapping the fleet never silently moves the hero, and clamped so a
   shorter list degrades to "last item" instead of rendering nothing.

   The plate is width-capped and centred rather than full-bleed: at
   full container width a 3:2 photo ran ~870px tall and swallowed the
   viewport, which is not what a spotlight should do.
   ------------------------------------------------------------------ */
const LEAD_INDEX = 6;

function Spotlight({ items, onSelect }) {
  const ref = useStagger("[data-tile]", { stagger: 0.06, y: 24 });

  if (!items.length) return null;

  const leadAt = Math.min(LEAD_INDEX, items.length - 1);
  const lead = items[leadAt];
  const rest = items.filter((_, i) => i !== leadAt);

  return (
    <div ref={ref} data-testid="machinery-spotlight" className="flex flex-col gap-2">
      <Frame
        m={lead}
        onSelect={onSelect}
        className="mx-auto w-full max-w-4xl"
        zoom="group-hover:scale-[1.05]"
      />
      <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
        {rest.map((m) => (
          <Frame key={m.idx} m={m} onSelect={onSelect} dense />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   Lightbox — where the per-machine detail lives, since the collage
   itself carries no captions. Prev/next lets the whole fleet be
   walked without closing between machines.
   ------------------------------------------------------------------ */
function Lightbox({ items, active, onClose, onStep }) {
  if (!active) return null;
  const i = items.findIndex((m) => m.idx === active.idx);

  return (
    <Dialog open={!!active} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-h-[92vh] max-w-3xl overflow-y-auto border-border-soft bg-surface-elevated p-0">
        <div className="relative flex max-h-[58vh] items-center justify-center overflow-hidden bg-surface-hover">
          <img
            src={active.img}
            alt={active.name}
            className="block h-auto max-h-[58vh] w-auto max-w-full object-contain"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center bg-obsidian/60 text-white/80 transition-colors hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex items-start justify-between gap-4 p-6">
          <div className="min-w-0">
            <div className="flex items-center gap-3">
              <span className="label text-gold-ink">{active.category}</span>
              <span className="label text-ink-tertiary">
                {String(i + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </span>
            </div>
            <h3 className="display mt-2 text-2xl text-ink">{active.name}</h3>
            <span className="mt-1 block text-xs text-ink-tertiary">{active.spec}</span>

            <ul className="mt-4 space-y-1.5">
              {active.specs.map((s) => (
                <li key={s} className="flex items-start gap-2 text-sm text-ink-secondary">
                  <span className="mt-2 h-1 w-1 flex-none rounded-full bg-gold" />
                  {s}
                </li>
              ))}
            </ul>

            <p className="mt-4 max-w-lg text-sm leading-relaxed text-gold-ink">{active.capability}</p>
          </div>

          {items.length > 1 && (
            <div className="flex flex-none gap-2">
              <button
                type="button"
                onClick={() => onStep(-1)}
                aria-label="Previous machine"
                className="flex h-9 w-9 items-center justify-center border border-border-soft text-ink/60 transition-colors hover:border-gold/60 hover:text-gold-ink"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => onStep(1)}
                aria-label="Next machine"
                className="flex h-9 w-9 items-center justify-center border border-border-soft text-ink/60 transition-colors hover:border-gold/60 hover:text-gold-ink"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function MachineryCollage({ items }) {
  const [active, setActive] = useState(null);

  /* Index once so machine-N test ids stay stable. Spotlight promotes the
     lead to the front, so its position in the array is not its position
     on screen — the ids must follow the data, not the render order. */
  const indexed = items.map((m, i) => ({ ...m, idx: i }));

  const step = (dir) => {
    if (!active || indexed.length < 2) return;
    const i = indexed.findIndex((m) => m.idx === active.idx);
    setActive(indexed[(i + dir + indexed.length) % indexed.length]);
  };

  return (
    <div>
      <Spotlight items={indexed} onSelect={setActive} />

      <Lightbox items={indexed} active={active} onClose={() => setActive(null)} onStep={step} />
    </div>
  );
}
