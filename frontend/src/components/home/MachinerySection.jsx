import React from "react";
import { MACHINERY } from "../../lib/content";
import MachineryGrid from "../common/MachineryGrid";

export default function MachinerySection() {
  return (
    <section data-testid="machinery-section" className="bg-surface-primary pt-8 pb-20">
      <div className="px-6 md:px-10 lg:px-16 mx-auto max-w-[1400px]">
        <div className="max-w-2xl mb-12">
          <span className="label text-gold">{MACHINERY.eyebrow}</span>
          <h2 className="display text-4xl leading-[1.08] text-ink sm:text-5xl mt-4">
            {MACHINERY.headline[0]} <span className="italic">{MACHINERY.headline[1]}</span>
          </h2>
          <p className="text-base leading-relaxed text-ink/55 mt-4">{MACHINERY.sub}</p>
        </div>

        <MachineryGrid items={MACHINERY.items} />

        <div className="mt-16 flex items-center justify-center gap-5">
          <span className="hidden h-px w-16 bg-gold/50 sm:block" />
          <p className="display text-center text-lg italic text-ink/75 sm:text-[22px]">{MACHINERY.banner}</p>
          <span className="hidden h-px w-16 bg-gold/50 sm:block" />
        </div>
      </div>
    </section>
  );
}
