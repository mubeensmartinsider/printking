import React from "react";
import { TRUSTED } from "../../lib/content";
import SectionHeading from "../common/SectionHeading";

const Tile = ({ name }) => (
  <div className="mx-3 flex h-[60px] w-[160px] flex-none items-center justify-center border border-white/[0.07] bg-white/[0.03]">
    <span className="display text-lg tracking-wide text-platinum/75">{name}</span>
  </div>
);

const Row = ({ items, direction }) => (
  <div className="marquee-row flex overflow-hidden py-2">
    <div
      className={`marquee-track flex w-max ${
        direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
      }`}
    >
      {[...items, ...items].map((b, i) => (
        <Tile key={`${b}-${i}`} name={b} />
      ))}
    </div>
  </div>
);

export default function TrustedBy() {
  const half = Math.ceil(TRUSTED.brands.length / 2);
  const row1 = TRUSTED.brands.slice(0, half);
  const row2 = TRUSTED.brands.slice(half);

  return (
    <section data-testid="trusted-section" className="border-y border-white/[0.06] bg-carbon py-24">
      <div className="section-pad mx-auto max-w-[1400px]">
        <SectionHeading title={TRUSTED.headline} sub={TRUSTED.sub} align="center" className="mb-14" />
      </div>

      <div className="space-y-3 opacity-40 transition-opacity duration-500 hover:opacity-100">
        <Row items={row1} direction="left" />
        <Row items={row2} direction="right" />
      </div>

      <div className="section-pad mx-auto mt-16 max-w-[1400px]">
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-4 text-center">
          {TRUSTED.metrics.map((m, i) => (
            <React.Fragment key={m}>
              <span className="label text-platinum/70">{m}</span>
              {i < TRUSTED.metrics.length - 1 && <span className="text-gold">·</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
