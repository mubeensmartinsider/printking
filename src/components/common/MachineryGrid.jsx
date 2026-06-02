import React, { useState } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

/* Warm placeholder — swap inner block for <img> when photos arrive */
function MachinePlaceholder({ name }) {
  return (
    <div className="absolute inset-0 bg-[linear-gradient(145deg,#1c1814,#241f1a)]">
      <div className="grain absolute inset-0 opacity-[0.05]" />
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <span className="display text-2xl text-platinum/70">{name}</span>
        <span className="label mt-2 text-gold/70">Photo pending</span>
      </div>
    </div>
  );
}

function MachineCell({ m, big, onClick }) {
  return (
    <button
      data-testid={`machine-${m.idx}`}
      onClick={onClick}
      className={`group relative overflow-hidden border border-white/[0.06] ${
        m.size === "wide" ? "sm:col-span-2" : ""
      } ${big ? "h-[340px]" : "h-[240px]"}`}
    >
      {/* MACHINE PHOTO: {m.name} — Replace MachinePlaceholder with <img> */}
      <MachinePlaceholder name={m.name} />

      {/* Resting overlay (bottom 50%) */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(transparent 45%, rgba(13,11,9,0.92))" }} />
      <div className="absolute inset-x-0 bottom-0 p-5 text-left">
        <span className="label text-gold">{m.category}</span>
        <h3 className="mt-1 text-base font-semibold text-platinum">{m.name}</h3>
        <span className="mt-1 block text-xs text-platinum/55">{m.spec}</span>
      </div>

      {/* Hover overlay (full) */}
      <div className="absolute inset-0 flex flex-col justify-center bg-[rgba(13,11,9,0.9)] p-6 text-left opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <span className="label text-gold">{m.category}</span>
        <h3 className="mt-2 text-lg font-semibold text-platinum">{m.name}</h3>
        <ul className="mt-4 space-y-1.5">
          {m.specs.map((s) => (
            <li key={s} className="flex items-start gap-2 text-xs text-platinum/60">
              <span className="mt-1.5 h-1 w-1 flex-none rounded-full bg-gold" />
              {s}
            </li>
          ))}
        </ul>
        <p className="mt-4 border-t border-white/[0.08] pt-3 text-[11px] leading-relaxed text-gold">{m.capability}</p>
      </div>
    </button>
  );
}

export default function MachineryGrid({ items }) {
  const [active, setActive] = useState(null);
  const indexed = items.map((m, i) => ({ ...m, idx: i }));
  const hero = indexed[0];
  const rest = indexed.slice(1);

  return (
    <>
      <div className="space-y-5">
        {/* Hero cell — flagship press */}
        <MachineCell m={hero} big onClick={() => setActive(hero)} />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 [grid-auto-flow:dense]">
          {rest.map((m) => (
            <MachineCell key={m.name} m={m} onClick={() => setActive(m)} />
          ))}
        </div>
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-3xl border-white/10 bg-carbon p-0">
          {active && (
            <div>
              <div className="relative h-72">
                <MachinePlaceholder name={active.name} />
              </div>
              <div className="flex items-start justify-between p-6">
                <div>
                  <span className="label text-gold">{active.category}</span>
                  <h3 className="display mt-2 text-2xl text-platinum">{active.name}</h3>
                  <ul className="mt-4 space-y-1.5">
                    {active.specs.map((s) => (
                      <li key={s} className="flex items-start gap-2 text-sm text-platinum/60">
                        <span className="mt-2 h-1 w-1 flex-none rounded-full bg-gold" />{s}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 max-w-lg text-sm leading-relaxed text-gold">{active.capability}</p>
                </div>
                <button onClick={() => setActive(null)} className="text-platinum/60 hover:text-platinum">
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
