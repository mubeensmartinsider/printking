import React from "react";
import Seo from "../components/common/Seo";
import PageHero from "../components/common/PageHero";
import MachineryGrid from "../components/common/MachineryGrid";
import { MACHINERY } from "../lib/content";

export default function MachineryPage() {
  return (
    <>
      <Seo title="Machinery & Infrastructure | PRINTKING" description="Inside PRINTKING's production facility — Heidelberg & KBA offset presses, Bobst die-cutters, hot-foil stamping and lamination lines running at international standards." path="/machinery" />
      <PageHero
        eyebrow="OUR INFRASTRUCTURE"
        title="The Machines Behind the Craft"
        sub="A controlled environment — precision-calibrated, climate-regulated, and running at international production standards."
      />

      <section className="bg-obsidian py-24">
        <div className="section-pad mx-auto max-w-[1400px]">
          <MachineryGrid items={MACHINERY.items} />
        </div>
      </section>
    </>
  );
}
