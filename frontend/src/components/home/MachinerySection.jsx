import React from "react";
import { MACHINERY } from "../../lib/content";
import SectionHeading from "../common/SectionHeading";
import MachineryGrid from "../common/MachineryGrid";

export default function MachinerySection() {
  return (
    <section data-testid="machinery-section" className="bg-carbon py-28">
      <div className="section-pad mx-auto max-w-[1400px]">
        <SectionHeading
          eyebrow={MACHINERY.eyebrow}
          title={MACHINERY.headline}
          sub={MACHINERY.sub}
          className="mb-16"
        />
        <MachineryGrid items={MACHINERY.items} />
      </div>
    </section>
  );
}
