import React, { useMemo } from "react";

const LOGOS = [
  { name: "Bareeze",                src: "assets/brands/bareeze.png" },
  { name: "Firdous",                src: "assets/brands/Firdous.webp" },
  { name: "Baroque",                src: "assets/brands/Baroque.png" },
  { name: "Warda",                  src: "assets/brands/Warda.png" },
  { name: "IZNiK",                  src: "assets/brands/IZNiK.png" },
  { name: "Zaha",                   src: "assets/brands/Zaha.png" },
  { name: "Imrozia",                src: "assets/brands/Imrozia.png" },
  { name: "Taana Baana",            src: "assets/brands/TaanaBaana.png" },
  { name: "Polo Ralph Lauren",      src: "assets/brands/Polo_Ralph_Lauren.png" },
  { name: "Armani",                 src: "assets/brands/armani.png" },
  { name: "ChenOne",                src: "assets/brands/ChenOne.png" },
  { name: "RajBari",                src: "assets/brands/RajBari.png" },
  { name: "Sefam",                  src: "assets/brands/Sefam.png" },
  { name: "Phulkari",               src: "assets/brands/Phulkari.png" },
  { name: "Nestlé",                 src: "assets/brands/Nestle" },
  { name: "Pepsi",                  src: "assets/brands/Pepsi.png" },
  { name: "Haleeb Foods",           src: "assets/brands/HaleebFoods.png" },
  { name: "Tetra Pak",              src: "assets/brands/TetraPak.png" },
  { name: "Daewoo",                 src: "assets/brands/Daewoo.png" },
  { name: "Al-Fatah",               src: "assets/brands/AlFatah.png" },
  { name: "Kansai Paint",           src: "assets/brands/KansaiPaint.png" },
  { name: "Telenor",                src: "assets/brands/Telenor.png" },
  { name: "DWP Group",              src: "assets/brands/dwpgroup.png" },
  { name: "British High Commission",src: "assets/brands/BritishHighCommission.png" },
  { name: "Govt. of Punjab",        src: "assets/brands/govtofpunjab.png" },
];

const MarqueeRow = ({ logos, reverse, duration }) => (
  <div className="marquee-row relative overflow-hidden">
    <div
      className={`marquee-track ${reverse ? "marquee-reverse" : ""}`}
      style={{ "--marquee-duration": duration }}
    >
      {/* List duplicated once for a seamless infinite loop */}
      {[...logos, ...logos].map((logo, idx) => (
        <div
          key={idx}
          className="group relative mx-2.5 flex h-16 w-28 shrink-0 items-center justify-center rounded-sm border border-border-strong bg-surface-elevated p-3 shadow-sm transition-all duration-300 hover:border-gold/60 hover:bg-surface-hover sm:h-20 sm:w-36"
        >
          <img
            src={logo.src}
            alt={logo.name}
            className="max-h-10 max-w-full object-contain transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
          {/* tooltip */}
          <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded border border-border-soft bg-surface-floating px-2.5 py-1 text-[11px] font-medium text-ink opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100">
            {logo.name}
          </span>
        </div>
      ))}
    </div>

    {/* Edge fade masks */}
    <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-surface-primary to-transparent sm:w-24" />
    <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-surface-primary to-transparent sm:w-24" />
  </div>
);

export default function ClientLogos() {
  const half = Math.ceil(LOGOS.length / 2);
  const rowOne = LOGOS.slice(0, half);
  const rowTwo = LOGOS.slice(half);

  return (
    <section className="relative bg-surface-primary py-20 md:py-28 overflow-hidden">
      <div className="section-pad mx-auto max-w-[1480px]">
        {/* Header */}
        <div className="mb-14 text-center">
          <span className="label text-gold block mb-3">TRUSTED BY LEADERS</span>
          <h2 className="display text-4xl md:text-5xl text-ink mb-4">
            Brands That Trust PrintKing
          </h2>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-ink/55">
            From fashion houses to FMCG giants — leading brands across Pakistan rely on us for premium printing and packaging.
          </p>
        </div>

        {/* Two-row marquee: top scrolls right → left, bottom scrolls left → right */}
        <div className="flex flex-col gap-4 sm:gap-5">
          <MarqueeRow logos={rowOne} duration="38s" />
          <MarqueeRow logos={rowTwo} reverse duration="44s" />
        </div>
      </div>
    </section>
  );
}
