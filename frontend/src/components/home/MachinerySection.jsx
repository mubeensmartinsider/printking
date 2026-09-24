import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { MACHINERY } from "../../lib/content";
import MachineryGrid from "../common/MachineryGrid";

export default function MachinerySection() {
  return (
    <section data-testid="machinery-section" className="bg-surface-primary pt-4 pb-12">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 lg:px-16">
        {/* Heading row — copy on the left, facility stat + CTA on the right.
            Stacking these instead of a full heading block saves ~100px. */}
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="label text-gold">{MACHINERY.eyebrow}</span>
            <h2 className="display mt-3 text-4xl leading-[1.08] text-ink sm:text-5xl">
              {MACHINERY.headline[0]} <span className="italic">{MACHINERY.headline[1]}</span>
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink/55">{MACHINERY.sub}</p>
          </div>

          <div className="flex flex-col gap-3 lg:items-end lg:text-right">
            <p className="max-w-xs text-sm leading-relaxed text-ink/45">{MACHINERY.banner}</p>
            <Link
              to="/machinery"
              className="label group inline-flex items-center gap-2 text-gold transition-colors hover:text-ink"
            >
              View all {MACHINERY.items.length} machines
              <ArrowRight
                size={13}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        <MachineryGrid items={MACHINERY.items} variant="spotlight" />
      </div>
    </section>
  );
}
