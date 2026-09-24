import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

/* Respect the visitor's motion preference in the spotlight rotator */
const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ------------------------------------------------------------------
   PhotoFrame — shows the whole machine, always.

   The frame takes the photo's own aspect ratio (read from the file as
   it loads), so the image fits the available section exactly: nothing
   is cropped off the sides, nothing is letterboxed, and there is no
   blurred filler behind it. A 3:2 landscape frame is used only as the
   pre-load placeholder so the grid never jumps.
   ------------------------------------------------------------------ */
function PhotoFrame({ src, alt, className = "" }) {
  const imgRef = useRef(null);
  const [ratio, setRatio] = useState(null);

  const readRatio = (el) => {
    if (el && el.naturalWidth && el.naturalHeight) {
      setRatio(`${el.naturalWidth} / ${el.naturalHeight}`);
    }
  };

  /* Cached images can complete before React attaches onLoad */
  useEffect(() => {
    setRatio(null);
    if (imgRef.current && imgRef.current.complete) readRatio(imgRef.current);
  }, [src]);

  return (
    <div
      className={`relative aspect-[3/2] w-full overflow-hidden bg-surface-hover ${className}`}
      style={ratio ? { aspectRatio: ratio } : undefined}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={(e) => readRatio(e.currentTarget)}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
    </div>
  );
}

function MachineCell({ m, featured, onClick, className = "" }) {
  return (
    <button
      data-testid={`machine-${m.idx}`}
      onClick={onClick}
      className={`group flex flex-col overflow-hidden border border-border-soft bg-surface-elevated text-left transition-colors duration-300 hover:border-gold/60 focus:outline-none focus-visible:ring-1 focus-visible:ring-gold ${
        featured ? "sm:flex-row-reverse" : ""
      } ${className}`}
    >
      {/* Content — top strip, side panel on the featured machine */}
      <div
        className={`flex-none border-b border-border-soft px-4 py-3 ${
          featured ? "sm:flex sm:w-1/2 sm:flex-col sm:justify-center sm:border-b-0 sm:border-l sm:px-8 sm:py-10" : ""
        }`}
      >
        <span className="label text-gold">{m.category}</span>
        <h3 className="mt-1 text-sm font-semibold leading-snug text-ink transition-colors duration-300 group-hover:text-gold">
          {m.name}
        </h3>
        <span className="mt-0.5 block text-[11px] text-ink/50">{m.spec}</span>
      </div>

      {/* Machine photo — the frame adopts the photo's own shape, so the whole
          machine fits the section: no sides cut off, no empty letterbox bars,
          and no blurred filler behind it. */}
      <PhotoFrame
        src={m.img}
        alt={m.name}
        className={featured ? "sm:w-1/2 sm:flex-none" : ""}
      />
    </button>
  );
}

/* ------------------------------------------------------------------
   Spotlight — one machine at a time with its full specification,
   auto-rotating like the hero banner. No grid, no scrolling.
   ------------------------------------------------------------------ */
const SPOTLIGHT_MS = 4500;

function Spotlight({ items }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const active = items[idx];

  useEffect(() => {
    if (paused || reducedMotion()) return undefined;
    const id = window.setInterval(
      () => setIdx((p) => (p + 1) % items.length),
      SPOTLIGHT_MS
    );
    return () => window.clearInterval(id);
  }, [paused, items.length]);

  const go = (dir) => setIdx((p) => (p + dir + items.length) % items.length);
  const counter = `${String(idx + 1).padStart(2, "0")} / ${String(items.length).padStart(2, "0")}`;

  const arrow =
    "flex h-9 w-9 items-center justify-center border border-border-soft text-ink/55 transition-colors hover:border-gold/60 hover:text-gold";

  return (
    <div
      className="grid overflow-hidden border border-border-soft bg-surface-elevated lg:grid-cols-2"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      {/* key resets the frame so the ratio is re-measured per machine */}
      <PhotoFrame key={active.img} src={active.img} alt={active.name} />

      <div className="flex flex-col justify-center gap-3 p-6 lg:p-10">
        <div className="flex items-start justify-between gap-4">
          <span className="label text-gold">{active.category}</span>
          <span className="label text-ink/35">{counter}</span>
        </div>

        <h3 className="display text-2xl leading-tight text-ink lg:text-[30px]">{active.name}</h3>
        <span className="text-xs text-ink/50">{active.spec}</span>

        <ul className="mt-1 space-y-1.5">
          {active.specs.map((s) => (
            <li key={s} className="flex items-start gap-2 text-sm text-ink/60">
              <span className="mt-2 h-1 w-1 flex-none rounded-full bg-gold" />
              {s}
            </li>
          ))}
        </ul>

        <p className="mt-1 max-w-md text-sm leading-relaxed text-gold">{active.capability}</p>

        <div className="mt-4 flex items-center gap-5">
          <div className="flex flex-none gap-2">
            <button type="button" onClick={() => go(-1)} aria-label="Previous machine" className={arrow}>
              <ChevronLeft size={16} />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next machine" className={arrow}>
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Progress bars double as jump-to-machine controls */}
          <div className="flex flex-1 items-center gap-1.5">
            {items.map((m, i) => (
              <button
                key={m.name}
                type="button"
                data-testid={`machine-${i}`}
                onClick={() => setIdx(i)}
                aria-label={`Show ${m.name}`}
                aria-current={i === idx}
                className="group/bar flex h-4 flex-1 items-center"
              >
                <span
                  className={`block h-0.5 w-full rounded-full transition-colors duration-300 ${
                    i === idx ? "bg-gold" : "bg-ink/20 group-hover/bar:bg-ink/45"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MachineryGrid({ items, variant = "grid" }) {
  const [active, setActive] = useState(null);
  const indexed = items.map((m, i) => ({ ...m, idx: i }));
  const hero    = indexed[0];
  const rest    = indexed.slice(1);

  return (
    <>
      {variant === "spotlight" ? (
        <Spotlight items={indexed} />
      ) : (
        <div className="flex flex-col gap-3">
          <MachineCell m={hero} featured onClick={() => setActive(hero)} />
          {/* Remaining machines — 2 per row on small screens, 4 on large, so
              every row is filled and no card has to be stretched or cropped. */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {rest.map((m) => (
              <MachineCell key={m.name} m={m} onClick={() => setActive(m)} />
            ))}
          </div>
        </div>
      )}

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-h-[92vh] max-w-3xl overflow-y-auto border-border-soft bg-surface-elevated p-0">
          {active && (
            <div>
              {/* Full, uncropped machine — sized to the photo and capped to the
                  viewport height so nothing is ever cut off or squashed. */}
              <div className="relative flex max-h-[55vh] items-center justify-center overflow-hidden bg-surface-hover">
                <img
                  src={active.img}
                  alt={active.name}
                  className="block h-auto max-h-[55vh] w-auto max-w-full object-contain"
                />
              </div>
              <div className="flex items-start justify-between p-6">
                <div>
                  <span className="label text-gold">{active.category}</span>
                  <h3 className="display mt-2 text-2xl text-ink">{active.name}</h3>
                  <ul className="mt-4 space-y-1.5">
                    {active.specs.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-sm text-ink/60">
                        <span className="mt-2 h-1 w-1 flex-none rounded-full bg-gold" />{s}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 max-w-lg text-sm leading-relaxed text-gold">{active.capability}</p>
                </div>
                <button onClick={() => setActive(null)} className="text-ink/50 hover:text-ink">
                  <X size={20} />
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
