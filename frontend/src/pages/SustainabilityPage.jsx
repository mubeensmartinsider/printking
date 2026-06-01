import React from "react";
import Seo from "../components/common/Seo";
import PageHero from "../components/common/PageHero";
import { SUSTAINABILITY } from "../lib/content";
import { useStagger, useCountUp } from "../lib/animations";

const IMPACT = [
  { value: 100, suffix: "%", label: "FSC-Certified Board" },
  { value: 30, suffix: "%", label: "Waste Recycled Annually" },
  { value: 0, suffix: "", label: "Petroleum-Based Inks" },
  { value: 100, suffix: "%", label: "Carbon-Offset Exports" },
];

function ImpactStat({ value, suffix, label }) {
  const ref = useCountUp(value, { suffix });
  return (
    <div className="border-t border-white/[0.08] pt-6">
      <div ref={ref} className="display text-5xl text-gold sm:text-6xl">0{suffix}</div>
      <div className="label mt-3 text-platinum/55">{label}</div>
    </div>
  );
}

export default function SustainabilityPage() {
  const gridRef = useStagger("[data-sus]", { stagger: 0.08 });

  return (
    <>
      <Seo title="Sustainability — Responsible Luxury Manufacturing | PRINTKING" description="FSC-certified materials, soy-based inks, water-based coatings and carbon-offset shipping. Premium packaging that does not cost the planet." path="/sustainability" />
      <PageHero
        eyebrow="RESPONSIBLE MANUFACTURING"
        title="Premium does not have to cost the planet."
        sub="Sustainability is engineered into every stage of our process — from sourcing to despatch."
      />

      <section className="py-28" style={{ backgroundColor: "var(--color-green-tint)" }}>
        <div className="section-pad mx-auto max-w-[1400px]">
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

      <section className="border-t border-white/[0.06] bg-obsidian py-28">
        <div className="section-pad mx-auto max-w-[1400px]">
          <span className="label text-gold">ANNUAL IMPACT</span>
          <h2 className="display mt-6 mb-16 text-4xl text-platinum sm:text-5xl">Measured, Not Marketed</h2>
          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {IMPACT.map((s) => (
              <ImpactStat key={s.label} {...s} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
