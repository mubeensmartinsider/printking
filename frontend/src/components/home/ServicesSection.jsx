import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BOX_FORMATS, SERVICE_LINES } from "../../lib/content";
import SectionHeading from "../common/SectionHeading";
import { useStagger, gsap } from "../../lib/animations";
import {
  Package, Boxes, PackageOpen, ShoppingBag, Tag, Tags,
  BookOpen, Printer, Box, Briefcase, Newspaper, Megaphone, Sparkles, PenTool,
} from "lucide-react";

const SERVICE_ICONS = {
  Package, Boxes, PackageOpen, ShoppingBag, Tag, Tags,
  BookOpen, Printer, Box, Briefcase, Newspaper, Megaphone, Sparkles, PenTool,
};

const ROTATE_MS = 3200;
const PREFERS_REDUCED =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const ITEMS = [
  ...BOX_FORMATS.map((item)  => ({ ...item, side: "left"  })),
  ...SERVICE_LINES.map((item) => ({ ...item, side: "right" })),
];

/* ── Row ───────────────────────────────────────────────────── */
function Row({ item, active, onEnter, onClick }) {
  const Icon   = SERVICE_ICONS[item.icon];
  const isLeft = item.side === "left";

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${item.title} — view products`}
      onMouseEnter={onEnter}
      onFocus={onEnter}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); } }}
      className={`group relative flex cursor-pointer items-center justify-center gap-4 border-b border-border-soft px-4 py-5 text-center transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-gold lg:px-6 ${
        active ? "bg-gold" : "hover:bg-gold/10"
      }`}
    >
      {/* Side arrow */}
      {active && (
        <span
          aria-hidden="true"
          className={`absolute top-1/2 hidden h-0 w-0 -translate-y-1/2 border-y-[9px] border-y-transparent lg:block ${
            isLeft
              ? "right-0 translate-x-full border-l-[11px] border-l-gold"
              : "left-0 -translate-x-full border-r-[11px] border-r-gold"
          }`}
        />
      )}

      {/* Icon with a spin-in on activation */}
      <span className={`mt-0.5 shrink-0 transition-transform duration-400 ease-spring ${active ? "scale-115 rotate-6" : "group-hover:scale-105"}`}>
        {Icon && (
          <Icon className={`h-8 w-8 stroke-1.5 ${active ? "text-white" : "text-gold-ink group-hover:text-white"}`} />
        )}
      </span>

      <span className="min-w-0 text-center">
        <span className={`block text-[16px] font-bold uppercase tracking-[0.14em] leading-snug transition-colors duration-300 ${active ? "text-white" : "text-gold-ink group-hover:text-white"}`}>
          {item.title}
        </span>
        <span className={`mt-1.5 block text-[15px] leading-relaxed transition-colors duration-300 ${active ? "text-white" : "text-ink-secondary group-hover:text-white"}`}>
          {item.desc}
        </span>
      </span>
    </div>
  );
}

/* ── Center panel — GSAP clip-path wipe between images ──────── */
function CenterPanel({ activeItem, activeIdx }) {
  const frontRef = useRef(null);
  const backRef  = useRef(null);
  const prevIdx  = useRef(activeIdx);
  const prevSrc  = useRef(activeItem.image);

  useEffect(() => {
    if (PREFERS_REDUCED || activeIdx === prevIdx.current) return;
    const front = frontRef.current;
    const back  = backRef.current;
    if (!front || !back) return;

    /* Set the back layer to the incoming image before the reveal starts */
    back.src = activeItem.image;

    const ctx = gsap.context(() => {
      /* Wipe the back image in from bottom → top */
      gsap.fromTo(
        back,
        { clipPath: "inset(100% 0% 0% 0%)", opacity: 1 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 0.55,
          ease: "power3.inOut",
          onComplete: () => {
            /* Swap: front becomes the new image */
            front.src = activeItem.image;
            gsap.set(back, { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 });
          },
        }
      );
    });

    prevIdx.current = activeIdx;
    prevSrc.current = activeItem.image;
    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIdx]);

  return (
    <div className="relative order-1 min-h-[320px] overflow-hidden bg-surface-base lg:order-2 lg:min-h-full">
      {/* Front (current) image */}
      <img
        ref={frontRef}
        src={activeItem.image}
        alt={`${activeItem.title} showcase`}
        className="absolute inset-0 h-full w-full object-contain p-4"
        loading="lazy"
        decoding="async"
      />
      {/* Back (incoming) image — initially hidden above the clip */}
      <img
        ref={backRef}
        src={activeItem.image}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-contain p-4"
        style={{ clipPath: "inset(100% 0% 0% 0%)", opacity: 0 }}
        loading="lazy"
        decoding="async"
      />

      {/* Subtle shimmer overlay on the center panel */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(160deg, rgba(197,160,90,0.06) 0%, transparent 50%, rgba(197,160,90,0.04) 100%)",
        }}
      />

      {/* Caption + progress bars */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-obsidian/92 via-obsidian/55 to-transparent px-5 pb-5 pt-14">
        <span className="label block text-gold-ink">
          {activeItem.side === "left" ? "Boxes" : "Services"}
        </span>
        <span className="mt-1 block text-sm font-medium text-white">
          {activeItem.title}
        </span>
        {/* Progress pips */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {ITEMS.map((it, i) => (
            <span
              key={it.id}
              className={`h-0.5 rounded-full transition-all duration-400 ${
                i === activeIdx ? "w-6 bg-gold" : "w-2 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── ServicesSection ─────────────────────────────────────────── */
export default function ServicesSection() {
  const navigate   = useNavigate();
  const gridRef    = useStagger(":scope > *", { stagger: 0.12, y: 40 });
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused]       = useState(false);
  const timerRef   = useRef(null);

  const activeItem = ITEMS[activeIdx];

  const grouped = useMemo(() => ({
    left:  ITEMS.filter((it) => it.side === "left"),
    right: ITEMS.filter((it) => it.side === "right"),
  }), []);

  const goTo = useCallback((idx) => setActiveIdx(idx), []);

  useEffect(() => {
    if (paused) return undefined;
    timerRef.current = window.setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % ITEMS.length);
    }, ROTATE_MS);
    return () => window.clearInterval(timerRef.current);
  }, [paused]);

  const goProducts = () => navigate("/products");

  const renderColumn = (list) =>
    list.map((item) => {
      const idx = ITEMS.findIndex((it) => it.id === item.id);
      return (
        <Row
          key={item.id}
          item={item}
          active={idx === activeIdx}
          onEnter={() => goTo(idx)}
          onClick={goProducts}
        />
      );
    });

  return (
    <section className="bg-surface-base py-20 lg:py-32">
      <div className="section-pad mx-auto max-w-7xl">
        <SectionHeading
          align="center"
          eyebrow="WHAT WE MAKE"
          title="Every Format. Every Finish."
          titleItalic="Every Scale."
          sub="Thirteen product categories. Infinite customization possibilities. One manufacturer that gets it right every time."
          className="mb-14 !max-w-3xl"
        />

        <div
          ref={gridRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false); }}
          className="grid grid-cols-1 items-stretch overflow-hidden rounded-sm border border-border-soft bg-surface-elevated shadow-brand-elevated lg:grid-cols-[1fr_minmax(300px,400px)_1fr]"
        >
          {/* LEFT */}
          <div className="order-2 flex flex-col lg:order-1">
            <div className="border-b border-border-soft bg-surface-base px-4 py-4 text-center lg:px-6">
              <span className="label text-[12px] text-gold-ink">Products</span>
            </div>
            {renderColumn(grouped.left)}
          </div>

          {/* CENTER — GSAP wipe panel */}
          <CenterPanel activeItem={activeItem} activeIdx={activeIdx} />

          {/* RIGHT */}
          <div className="order-3 flex flex-col">
            <div className="border-b border-border-soft bg-surface-base px-4 py-4 text-center lg:px-6">
              <span className="label text-[12px] text-gold-ink">Services</span>
            </div>
            {renderColumn(grouped.right)}
          </div>
        </div>
      </div>
    </section>
  );
}
