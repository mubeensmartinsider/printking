import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { MACHINERY } from "../../lib/content";
import MachineryCollage from "./MachineryCollage";

export default function MachinerySection() {
  return (
    <section data-testid="machinery-section" className="bg-surface-primary pt-4 pb-12">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        {/* One description for the whole collage: the photos below carry no
            captions, so this block does the explaining for all nine
            machines. Facility stat + CTA sit opposite it. */}
        <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="label text-gold-ink">{MACHINERY.eyebrow}</span>
            <h2 className="display mt-3 text-4xl leading-[1.08] text-ink sm:text-5xl">
              {MACHINERY.headline[0]} <span className="italic">{MACHINERY.headline[1]}</span>
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink/55">{MACHINERY.sub}</p>
          </div>

          <div className="flex flex-col gap-3 lg:items-end lg:text-right">
            <p className="max-w-xs text-sm leading-relaxed text-ink/45">{MACHINERY.banner}</p>
            <Link
              to="/machinery"
              className="label group inline-flex items-center gap-2 text-gold-ink transition-colors hover:text-ink"
            >
              View all {MACHINERY.items.length} machines
              <ArrowRight
                size={13}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        <MachineryCollage items={MACHINERY.items} />
      </div>
    </section>
  );
}
