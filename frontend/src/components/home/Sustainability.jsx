import React from "react";
import { Leaf } from "lucide-react";
import { SUSTAINABILITY } from "../../lib/content";
import { useReveal, useStagger } from "../../lib/animations";

export default function Sustainability() {
  const headRef = useReveal();
  const gridRef = useStagger("[data-sus]", { stagger: 0.08 });

  return (
    <section
      data-testid="sustainability-section"
      className="py-28"
      style={{ backgroundColor: "var(--color-green-tint)" }}
    >
      <div className="section-pad mx-auto max-w-[1400px]">
        <div ref={headRef} className="mb-20 max-w-3xl">
          <span className="label flex items-center gap-2 text-gold">
            <Leaf size={14} /> {SUSTAINABILITY.eyebrow}
          </span>
          <h2 className="display mt-6 text-4xl italic leading-tight text-platinum sm:text-5xl">
            “{SUSTAINABILITY.headline}”
          </h2>
        </div>

        <div ref={gridRef} className="grid gap-x-12 gap-y-14 md:grid-cols-3">
          {SUSTAINABILITY.items.map((item) => (
            <div key={item.title} data-sus className="border-t border-white/[0.08] pt-6">
              <h3 className="text-lg font-medium text-platinum">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-platinum/55">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
