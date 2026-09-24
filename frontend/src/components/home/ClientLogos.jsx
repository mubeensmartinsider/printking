import React from "react";
import SectionHeading from "../common/SectionHeading";
import { useReveal, useStagger } from "../../lib/animations";

const LOGOS = [
  { name: "Bareeze",                 src: "/assets/brands/bareeze.png" },
  { name: "Firdous",                 src: "/assets/brands/Firdous.webp" },
  { name: "Baroque",                 src: "/assets/brands/Baroque.png" },
  { name: "Warda",                   src: "/assets/brands/Warda.png" },
  { name: "IZNiK",                   src: "/assets/brands/IZNiK.png" },
  { name: "Zaha",                    src: "/assets/brands/Zaha.png" },
  { name: "Imrozia",                 src: "/assets/brands/Imrozia.png" },
  { name: "Taana Baana",             src: "/assets/brands/TaanaBaana.png" },
  { name: "Polo Ralph Lauren",       src: "/assets/brands/Polo_Ralph_Lauren.png" },
  { name: "Armani",                  src: "/assets/brands/armani.png" },
  { name: "ChenOne",                 src: "/assets/brands/ChenOne.png" },
  { name: "RajBari",                 src: "/assets/brands/RajBari.png" },
  { name: "Sefam",                   src: "/assets/brands/Sefam.png" },
  { name: "Phulkari",                src: "/assets/brands/Phulkari.png" },
  { name: "Élan",                    src: "/assets/brands/Elan.svg" },
  { name: "Nestlé",                  src: "/assets/brands/Nestle.svg" },
  { name: "Pepsi",                   src: "/assets/brands/Pepsi.png" },
  { name: "Haleeb Foods",            src: "/assets/brands/HaleebFoods.png" },
  { name: "Tetra Pak",               src: "/assets/brands/TetraPak.png" },
  { name: "Daewoo",                  src: "/assets/brands/Daewoo.png" },
  { name: "Al-Fatah",                src: "/assets/brands/AlFatah.png" },
  { name: "Kansai Paint",            src: "/assets/brands/KansaiPaint.png" },
  { name: "Telenor",                 src: "/assets/brands/Telenor.png" },
  { name: "DWP Group",               src: "/assets/brands/dwpgroup.png" },
  { name: "British High Commission", src: "/assets/brands/BritishHighCommission.png" },
  { name: "Govt. of Punjab",         src: "/assets/brands/govtofpunjab.png" },
];

const SECTORS = ["Fashion", "FMCG", "Retail", "Telecom", "Government", "Industry"];

const MarqueeRow = ({ logos, reverse, duration }) => (
  <div className="marquee-row relative overflow-hidden pt-8 pb-0">
    <div
      className={`marquee-track ${reverse ? "marquee-reverse" : ""}`}
      style={{ "--marquee-duration": duration }}
    >
      {/* List duplicated once for a seamless infinite loop; clones hidden from a11y */}
      {[...logos, ...logos].map((logo, idx) => {
        const clone = idx >= logos.length;
        return (
          <div
            key={`${logo.name}-${idx}`}
            aria-hidden={clone || undefined}
            className="group relative mx-2 flex h-14 w-24 shrink-0 items-center justify-center rounded-sm border border-border-strong bg-surface-elevated p-2.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:bg-surface-hover sm:h-20 sm:w-36"
          >
            {/* Animated gold border shimmer on hover (existing utility) */}
            <span aria-hidden="true" className="card-border-shimmer" />

            {/* Logo shown in its original form by default */}
            <img
              src={logo.src}
              alt={logo.name}
              loading="lazy"
              decoding="async"
              className="max-h-8 max-w-full object-contain transition-transform duration-300 group-hover:scale-110 sm:max-h-10"
            />

            {/* Tooltip — row pt-10 keeps it inside the overflow clip */}
            <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-1 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-sm border border-gold/40 bg-surface-floating px-3 py-1 text-[11px] font-semibold text-ink opacity-0 shadow-md transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
              {logo.name}
            </span>
          </div>
        );
      })}
    </div>
  </div>
);

export default function ClientLogos() {
  const half = Math.ceil(LOGOS.length / 2);
  const rowOne = LOGOS.slice(0, half);
  const rowTwo = LOGOS.slice(half);

  const chipsRef = useReveal({ y: 24, delay: 0.15 });
  const rowsRef = useStagger(":scope > *", { stagger: 0.15, y: 36 });

  return (
    <section
      data-testid="clients-section"
      className="relative overflow-hidden bg-surface-primary py-8 md:py-10"
    >
      {/* Ambient backdrop — drifting gold glows, dot texture, gold hairlines */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div
          className="glow-drift absolute -top-40 inset-x-0 mx-auto h-72 w-[42rem] rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(197,160,90,0.13), transparent)" }}
        />
        <div
          className="glow-drift-rev absolute -bottom-52 -right-24 h-80 w-80 rounded-full"
          style={{ background: "radial-gradient(closest-side, rgba(197,160,90,0.09), transparent)" }}
        />
        <div className="absolute inset-0 bg-gold-dots opacity-70" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px] px-2 md:px-4 lg:px-6">
        {/* Header */}
        <SectionHeading
          align="center"
          eyebrow="TRUSTED BY LEADERS"
          title="Brands That Trust"
          titleItalic="PrintKing."
          sub="From fashion houses to FMCG giants — leading brands across Pakistan rely on us for premium printing and packaging."
        />

        {/* Gold diamond ornament */}
        <div aria-hidden="true" className="mx-auto mt-3 flex w-fit items-center justify-center gap-3">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/60" />
          <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold/60" />
        </div>

        {/* Count + sector chips */}
        {/* <div ref={chipsRef} className="mt-3 flex flex-wrap items-center justify-center gap-2.5">
          <span className="label rounded-full bg-gold px-4 py-1.5 text-obsidian">
            {LOGOS.length} Brands
          </span>
          {SECTORS.map((s) => (
            <span
              key={s}
              className="label rounded-full border border-gold/30 bg-surface-elevated/60 px-4 py-1.5 text-ink/70 transition-colors duration-300 hover:border-gold/60 hover:text-gold"
            >
              {s}
            </span>
          ))}
        </div> */}

        {/* Two-row marquee: top scrolls right → left, bottom scrolls left → right */}
        <div ref={rowsRef} className="-mx-2 mt-4 flex flex-col md:-mx-4 lg:-mx-6">
          <MarqueeRow logos={rowOne} duration="48s" />
          <MarqueeRow logos={rowTwo} reverse duration="56s" />
        </div>
      </div>
    </section>
  );
}
