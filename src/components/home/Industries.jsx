import React from "react";
import { INDUSTRIES } from "../../lib/content";
import Icon from "../common/Icon";
import { useReveal, useStagger } from "../../lib/animations";

const HEX_W = 156;
const HEX_H = 178;
const OVERLAP = 46; // vertical interlock

function Hex({ ind }) {
  return (
    <div
      data-hex
      className="group relative transition-transform duration-[350ms] ease-out hover:-translate-y-1.5 hover:scale-[1.04]"
      style={{ width: HEX_W, height: HEX_H }}
    >
      {/* gold border layer */}
      <div
        className="hexagon absolute inset-0 opacity-60 transition-opacity duration-[350ms] group-hover:opacity-100"
        style={{ background: "linear-gradient(160deg, rgba(197,160,90,0.7), rgba(197,160,90,0.12))" }}
      />
      {/* base fill */}
      <div
        className="hexagon absolute inset-[1.5px] flex flex-col items-center justify-center px-5 text-center transition-colors duration-[350ms]"
        style={{ background: "linear-gradient(145deg, #1c1814, #241f1a)" }}
      >
        <Icon
          name={ind.icon}
          size={28}
          strokeWidth={1.5}
          className="text-gold transition-transform duration-[350ms] group-hover:scale-110"
        />
        <span className="mt-3 text-[12px] font-semibold leading-tight text-platinum transition-colors duration-[350ms] group-hover:text-gold-soft">
          {ind.name}
        </span>
        <span className="mt-1 translate-y-1 text-[10px] leading-snug text-platinum/0 transition-all duration-[350ms] group-hover:translate-y-0 group-hover:text-platinum/55">
          {ind.desc}
        </span>
      </div>
    </div>
  );
}

export default function Industries() {
  const headRef = useReveal();
  const gridRef = useStagger("[data-hex]", { stagger: 0.08, y: 36 });

  const rows = [INDUSTRIES.slice(0, 3), INDUSTRIES.slice(3, 6), INDUSTRIES.slice(6, 9)];

  return (
    <section data-testid="industries-section" className="relative overflow-hidden bg-obsidian py-28">
      <div className="lux-grid absolute inset-0 opacity-[0.5]" />
      <div
        className="absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2"
        style={{ background: "radial-gradient(circle, rgba(197,160,90,0.05), transparent 65%)" }}
      />

      <div className="section-pad relative mx-auto max-w-[1400px]">
        <div ref={headRef} className="mx-auto mb-16 flex max-w-2xl flex-col items-center text-center">
          <span className="label text-gold">WHO WE SERVE</span>
          <h2 className="display mt-6 text-4xl text-platinum sm:text-5xl">
            Built for Every Industry That Values <span className="italic">Quality.</span>
          </h2>
          <span className="reveal-rule mt-7 block h-px w-16 origin-center bg-gold" />
          <p className="mt-7 max-w-lg text-base leading-relaxed text-platinum/55">
            From fashion houses to financial institutions — if your brand demands premium
            print and packaging, we have served your industry for over 15 years.
          </p>
        </div>

        {/* Honeycomb */}
        <div ref={gridRef} className="flex flex-col items-center">
          {rows.map((row, ri) => (
            <div
              key={ri}
              className="flex justify-center"
              style={{
                marginTop: ri === 0 ? 0 : -OVERLAP,
                transform: ri % 2 === 1 ? `translateX(${HEX_W / 2}px)` : "none",
              }}
            >
              {row.map((ind) => (
                <Hex key={ind.name} ind={ind} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
