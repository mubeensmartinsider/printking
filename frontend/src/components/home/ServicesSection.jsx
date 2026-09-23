import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BOX_FORMATS, SERVICE_LINES } from "../../lib/content";
import SectionHeading from "../common/SectionHeading";
import { useStagger } from "../../lib/animations";
import * as Icons from "lucide-react";

const ROTATE_MS = 3500;
/* Contact-sheet art shown when a row's dedicated file hasn't been dropped in yet */
const FALLBACK_IMG = "/assets/services/products.png";

/* Flat, ordered list of all 14 rows; each row's banner image comes from its content.js `image` field */
const ITEMS = [
  ...BOX_FORMATS.map((item) => ({ ...item, side: "left" })),
  ...SERVICE_LINES.map((item) => ({ ...item, side: "right" })),
];

function Row({ item, active, onEnter, onClick }) {
  const Icon = Icons[item.icon];
  const isLeft = item.side === "left";

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${item.title} — view services`}
      onMouseEnter={onEnter}
      onFocus={onEnter}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className={`group relative flex cursor-pointer items-start gap-4 border-b border-border-soft px-4 py-5 text-left transition-colors duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-gold lg:px-6 ${
        active ? "bg-gold" : "hover:bg-gold/10"
      }`}
    >
      {/* Arrow pointing at the banner — only on the active row (reference design) */}
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

      <span
        className={`mt-0.5 shrink-0 transition-transform duration-300 ${
          active ? "scale-110" : "group-hover:scale-105"
        }`}
      >
        {Icon && (
          <Icon
            className={`h-8 w-8 stroke-1.5 ${active ? "text-white" : "text-gold group-hover:text-white"}`}
          />
        )}
      </span>

      <span className="min-w-0">
        <span
          className={`block text-[15px] font-bold uppercase tracking-[0.14em] leading-snug transition-colors duration-300 ${
            active ? "text-white" : "text-gold group-hover:text-white"
          }`}
        >
          {item.title}
        </span>
        <span
          className={`mt-1.5 block text-[13px] leading-relaxed transition-colors duration-300 ${
            active ? "text-white" : "text-ink-secondary group-hover:text-white"
          }`}
        >
          {item.desc}
        </span>
      </span>
    </div>
  );
}

export default function ServicesSection() {
  const navigate = useNavigate();
  const gridRef = useStagger(":scope > *", { stagger: 0.12, y: 40 });
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const activeItem = ITEMS[activeIdx];

  const grouped = useMemo(
    () => ({
      left: ITEMS.filter((it) => it.side === "left"),
      right: ITEMS.filter((it) => it.side === "right"),
    }),
    []
  );

  const goTo = useCallback((idx) => setActiveIdx(idx), []);

  /* Auto-advance the banner (and the highlighted row) until the user hovers */
  useEffect(() => {
    if (paused) return undefined;
    timerRef.current = window.setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % ITEMS.length);
    }, ROTATE_MS);
    return () => window.clearInterval(timerRef.current);
  }, [paused]);

  const goServices = () => navigate("/services");

  const renderColumn = (list) =>
    list.map((item) => {
      const idx = ITEMS.findIndex((it) => it.id === item.id);
      return (
        <Row
          key={item.id}
          item={item}
          active={idx === activeIdx}
          onEnter={() => goTo(idx)}
          onClick={goServices}
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
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
          }}
          className="grid grid-cols-1 items-stretch overflow-hidden rounded-sm border border-border-soft bg-surface-elevated shadow-lg lg:grid-cols-[1fr_minmax(300px,400px)_1fr]"
        >
          {/* LEFT — Boxes */}
          <div className="order-2 flex flex-col lg:order-1">
            <div className="border-b border-border-soft bg-surface-base px-4 py-4 lg:px-6">
              <span className="label text-gold">Boxes</span>
            </div>
            {renderColumn(grouped.left)}
          </div>

          {/* CENTER — auto-rotating banner */}
          <div className="relative order-1 min-h-[320px] overflow-hidden bg-obsidian lg:order-2 lg:min-h-full">
            <img
             style={{ backgroundColor: "#faf9f7" }}
              src={activeItem.image}
              alt={`${activeItem.title} showcase`}
              onError={(e) => {
                const el = e.currentTarget;
                /* Dedicated slug art missing → show the contact sheet until the real file lands */
                if (!el.src.endsWith(FALLBACK_IMG)) el.src = FALLBACK_IMG;
              }}
              className="absolute inset-0 h-full w-full object-contain"
            />

            {/* Caption + progress bars */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-obsidian/90 via-obsidian/50 to-transparent px-5 pb-4 pt-12">
              <span className="label block text-gold">
                {activeItem.side === "left" ? "Boxes" : "Services"}
              </span>
              <span className="mt-1 block text-sm font-medium text-white">
                {activeItem.title}
              </span>
              <div className="mt-3 flex gap-1.5">
                {ITEMS.map((it, i) => (
                  <span
                    key={it.id}
                    className={`h-0.5 rounded-full transition-all duration-300 ${
                      i === activeIdx ? "w-5 bg-gold" : "w-2 bg-white/35"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Services */}
          <div className="order-3 flex flex-col">
            <div className="border-b border-border-soft bg-surface-base px-4 py-4 lg:px-6">
              <span className="label text-gold">Services</span>
            </div>
            {renderColumn(grouped.right)}
          </div>
        </div>
      </div>
    </section>
  );
}

