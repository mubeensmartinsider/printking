import React, { useState } from "react";
import { Maximize2, X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Img from "./Img";

/* Editorial machinery grid (2 large + small) with full-screen lightbox.
   Image slots are placeholders — drop real factory photographs into
   `item.img` without restructuring the layout. */
export default function MachineryGrid({ items }) {
  const [active, setActive] = useState(null);

  const spanFor = (i, size) => {
    // First and fourth items render large
    if (size === "large") return "lg:col-span-2 lg:row-span-2";
    return "";
  };

  return (
    <>
      <div className="grid auto-rows-[220px] grid-cols-2 gap-4 lg:grid-cols-4">
        {items.map((m, i) => (
          /* MACHINE PHOTO: {m.name} */
          <button
            key={m.name}
            data-testid={`machine-${i}`}
            onClick={() => setActive(m)}
            className={`group relative overflow-hidden border border-white/[0.06] ${spanFor(i, m.size)}`}
          >
            <Img
              src={m.img}
              alt={m.name}
              label={m.name}
              className="h-full w-full"
              imgClassName="brightness-[0.7] transition-all duration-700 group-hover:brightness-100 group-hover:scale-105"
            />
            <div className="absolute inset-0" style={{ background: "rgba(10,10,11,0.5)" }} />
            <div className="absolute inset-0 flex flex-col justify-end p-5 text-left">
              <span className="text-base font-medium text-platinum">{m.name}</span>
              <span className="label mt-1 text-gold">{m.spec}</span>
            </div>
            <Maximize2 size={16} className="absolute right-4 top-4 text-platinum/0 transition-colors duration-300 group-hover:text-platinum/80" />
          </button>
        ))}
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-4xl border-white/10 bg-carbon p-0">
          {active && (
            <div>
              <Img src={active.img} alt={active.name} label={active.name} className="aspect-video w-full" />
              <div className="flex items-center justify-between p-6">
                <div>
                  <h3 className="text-xl font-medium text-platinum">{active.name}</h3>
                  <span className="label mt-1 block text-gold">{active.spec}</span>
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
