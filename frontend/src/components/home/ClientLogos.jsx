import React, { useEffect, useRef } from "react";
import SectionHeading from "../common/SectionHeading";
import { useStagger, usePrefersReducedMotion } from "../../lib/animations";

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

/* ── Gold particle canvas ──────────────────────────────────────────────
   Tiny gold dots drift upward and fade, giving the section a premium
   "printing press dust" feel. Canvas-only — zero layout impact.

   The loop is gated three ways so it costs nothing while idle: it never
   starts under prefers-reduced-motion, it stops whenever the section leaves
   the viewport, and it stops when the tab is backgrounded. An unconditional
   requestAnimationFrame loop burns a frame of CPU forever on every page
   that mounts this section.                                            */
const PARTICLE_COUNT = 38;

function GoldParticles() {
  const canvasRef = useRef(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = null;
    let visible = false;
    let onScreen = true;

    /* Scale the backing store by devicePixelRatio — at 1x the dots render
       soft on every modern display. All drawing below is in CSS pixels. */
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(canvas.offsetWidth * dpr);
      canvas.height = Math.floor(canvas.offsetHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x:  Math.random() * canvas.offsetWidth,
      y:  Math.random() * canvas.offsetHeight,
      r:  Math.random() * 1.8 + 0.5,
      o:  Math.random() * 0.5 + 0.15,
      vy: Math.random() * 0.35 + 0.15,
      vx: (Math.random() - 0.5) * 0.25,
      wo: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.wo += 0.012;
        p.y -= p.vy;
        p.x += p.vx + Math.sin(p.wo) * 0.22;
        if (p.y < -8) { p.y = h + 8; p.x = Math.random() * w; }
        if (p.x < -8) p.x = w + 8;
        if (p.x > w + 8) p.x = -8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(197,160,90,${(p.o * (0.65 + Math.sin(p.wo) * 0.35)).toFixed(3)})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };

    const start = () => {
      if (raf === null && visible && onScreen) raf = requestAnimationFrame(draw);
    };
    const stop = () => {
      if (raf !== null) cancelAnimationFrame(raf);
      raf = null;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
        else stop();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    const onVisibility = () => {
      onScreen = document.visibilityState === "visible";
      if (onScreen) start();
      else stop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-70"
    />
  );
}

/* ── Marquee row ─────────────────────────────────────────────────── */
const MarqueeRow = ({ logos, reverse, duration }) => (
  <div className="marquee-row relative overflow-hidden pt-8 pb-0">
    <div
      className={`marquee-track ${reverse ? "marquee-reverse" : ""}`}
      style={{ "--marquee-duration": duration }}
    >
      {[...logos, ...logos].map((logo, idx) => {
        const clone = idx >= logos.length;
        return (
          <div
            key={`${logo.name}-${idx}`}
            aria-hidden={clone ? true : undefined}
            className="group relative mx-2 flex h-14 w-24 shrink-0 items-center justify-center rounded-sm border border-border-strong bg-surface-elevated p-2.5 shadow-brand-card transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/60 hover:bg-surface-hover hover:shadow-brand-card-hover sm:h-20 sm:w-36"
          >
            <span aria-hidden="true" className="card-border-shimmer" />
            <img
              src={logo.src}
              alt={logo.name}
              loading="lazy"
              decoding="async"
              fetchpriority="low"
              className="h-full w-full object-contain object-center transition-transform duration-300 group-hover:scale-110"
            />
            <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-1 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-sm border border-gold/40 bg-surface-floating px-3 py-1 text-[11px] font-semibold text-ink opacity-0 shadow-md transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100">
              {logo.name}
            </span>
          </div>
        );
      })}
    </div>
  </div>
);

/* ── ClientLogos ─────────────────────────────────────────────────── */
export default function ClientLogos() {
  const half    = Math.ceil(LOGOS.length / 2);
  const rowOne  = LOGOS.slice(0, half);
  const rowTwo  = LOGOS.slice(half);
  const rowsRef = useStagger(":scope > *", { stagger: 0.15, y: 36 });

  return (
    <section
      data-testid="clients-section"
      className="relative overflow-hidden bg-surface-primary py-8 md:py-10"
    >
      {/* Static ambient backdrop */}
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

      {/* ✦ Floating gold dust particles */}
      <GoldParticles />

      <div className="relative z-10 mx-auto max-w-[1600px] px-2 md:px-4 lg:px-6">
        <SectionHeading
          align="center"
          eyebrow="TRUSTED BY LEADERS"
          title="Brands That Trust"
          titleItalic="PrintKing."
          sub="From fashion houses to FMCG giants — leading brands across Pakistan rely on us for premium printing and packaging."
        />

        <div aria-hidden="true" className="mx-auto mt-3 flex w-fit items-center justify-center gap-3">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold/60" />
          <span className="h-1.5 w-1.5 rotate-45 bg-gold" />
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold/60" />
        </div>

        <div ref={rowsRef} className="-mx-2 mt-4 flex flex-col md:-mx-4 lg:-mx-6">
          <MarqueeRow logos={rowOne} duration="48s" />
          <MarqueeRow logos={rowTwo} reverse duration="56s" />
        </div>
      </div>
    </section>
  );
}
