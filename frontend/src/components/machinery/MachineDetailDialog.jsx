import React from "react";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

/* ============================================================
   Machine detail — the full specification sheet for one machine.
   Theme-aware end to end: surface, ink and border tokens all flip
   between light and dark, and the photograph is shown whole
   (contain) on a neutral plate so nothing is cropped.
   ============================================================ */

export default function MachineDetailDialog({ machine, onClose, onPrev, onNext }) {
  const num = (i) => String(i + 1).padStart(2, "0");

  return (
    <Dialog open={!!machine} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        data-testid="machine-detail"
        className="max-h-[92vh] max-w-4xl overflow-y-auto border-border-soft bg-surface-elevated p-0 sm:rounded-sm"
      >
        {machine && (
          <>
            {/* Photograph — full machine, never cropped */}
            <div className="relative flex max-h-[46vh] items-center justify-center overflow-hidden bg-surface-hover">
              <span className="pointer-events-none absolute left-5 top-5 z-10 border border-gold/30 bg-obsidian/70 px-2.5 py-1 text-[10px] font-medium tracking-[0.18em] text-gold-soft backdrop-blur-sm">
                {num(machine.idx)} / {machine.category}
              </span>
              <img
                src={machine.img}
                alt={machine.name}
                className="block h-auto max-h-[46vh] w-auto max-w-full object-contain"
              />
            </div>

            {/* Specification */}
            <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[1.25fr_1fr]">
              <div>
                <span className="label text-gold-ink">{machine.category}</span>
                <DialogTitle className="display mt-2 text-2xl leading-tight text-ink sm:text-3xl">
                  {machine.name}
                </DialogTitle>
                <p className="mt-1.5 text-xs uppercase tracking-[0.12em] text-ink-tertiary">
                  {machine.spec}
                </p>

                <DialogDescription className="mt-4 border-l-2 border-gold/50 pl-4 text-sm leading-relaxed text-ink-secondary">
                  {machine.capability}
                </DialogDescription>

                <Link
                  to="/request-quote"
                  onClick={onClose}
                  className="group mt-5 inline-flex items-center gap-2 bg-gold px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-obsidian transition-all duration-300 hover:bg-gold-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  Request a quote for this machine
                  <ArrowRight
                    size={13}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>

              {/* Figures + in-dialog navigation */}
              <div className="flex flex-col">
                <span className="label border-b border-border-soft pb-3 text-ink-tertiary">
                  Technical figures
                </span>
                <ul className="mt-4 space-y-3">
                  {machine.specs.map((s) => (
                    <li key={s} className="flex items-start gap-3 text-sm text-ink-secondary">
                      <span className="mt-0.5 flex h-4 w-4 flex-none items-center justify-center rounded-full border border-gold/40">
                        <Check size={9} className="text-gold-ink" />
                      </span>
                      {s}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex items-center gap-2 pt-6">
                  <button
                    type="button"
                    onClick={onPrev}
                    data-testid="machine-detail-prev"
                    className="border border-border-soft px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-tertiary transition-colors duration-300 hover:border-gold/60 hover:text-gold-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  >
                    ← Previous
                  </button>
                  <button
                    type="button"
                    onClick={onNext}
                    data-testid="machine-detail-next"
                    className="border border-border-soft px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-tertiary transition-colors duration-300 hover:border-gold/60 hover:text-gold-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  >
                    Next →
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
