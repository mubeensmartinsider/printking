import React, { useMemo, useRef, useEffect } from "react";
import { Award, Printer, Users, Factory } from "lucide-react";
import BannerCarousel from "../common/BannerCarousel";
import { HERO } from "../../lib/content";
import { gsap } from "../../lib/animations";

// Icon per stat, in the same order as HERO.stats
const STAT_ICONS = [Award, Printer, Users, Factory];

/* HERO.stats values are authored as display strings ("15+", "12,000").
   Split them so the number can be count-animated while the prefix/suffix
   stay exactly as written in content.js. */
const splitStat = (value) => {
  const m = String(value).match(/^([^\d]*)(\d[\d,]*)(.*)$/);
  if (!m) return { prefix: "", target: 0, suffix: String(value), format: () => String(value) };
  return {
    prefix: m[1],
    suffix: m[3],
    target: parseInt(m[2].replace(/,/g, ""), 10),
    format: (v) => Math.round(v).toLocaleString("en-US"),
  };
};

function StatValue({ value }) {
  const ref = useRef(null);
  const { prefix, target, suffix, format } = useMemo(() => splitStat(value), [value]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const obj = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: target,
        duration: 1.8,
        ease: "power3.out",
        delay: 0.9,
        onUpdate: () => { el.textContent = prefix + format(obj.val) + suffix; },
        onComplete: () => { el.textContent = value; },
      });
    }, el);
    return () => ctx.revert();
  }, [target, prefix, suffix, format, value]);

  return <span ref={ref}>{value}</span>;
}

export default function Hero() {
  const rootRef = useRef(null);

  // Banner images
  const banners = useMemo(() => [
    "/assets/banners/banner4.jpeg",
    "/assets/banners/mainbanner2.jpg",
    "/assets/banners/awardbanner2.jpg",
    "/assets/banners/banner3.jpg",
    "/assets/banners/rigidbanner.jpg",
  ], []);

  /* Band entrance + staggered icon float loops. Skipped under reduced-motion. */
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      /* 1 — slide the whole band up from below */
      gsap.from("[data-hero=band]", { y: 24, opacity: 0, duration: 0.9, ease: "power3.out" });

      /* 2 — stagger the four stat blocks into view */
      gsap.from("[data-hero=stat]", {
        y: 20, opacity: 0, duration: 0.7, ease: "power2.out",
        stagger: 0.12, delay: 0.3,
      });

      /* 3 — gentle perpetual float on each icon ring */
      gsap.to("[data-hero=icon]", {
        y: -6,
        duration: 2.2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.4, from: "start" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      data-testid="hero-section"
      className="relative overflow-hidden"
    >
      {/* Visually-hidden h1 so crawlers and screen readers have a page title
          while the banner artwork stays fully unobstructed. The visible
          content lives in the stats band below the banner. */}
      <h1 className="sr-only">{HERO.headline}</h1>

      {/* Banner carousel (1600x550) */}
      <div className="relative w-full">
        <BannerCarousel banners={banners} autoPlayInterval={5000} />

        {/* The banners are self-contained marketing artwork — they carry their
            own headline and typography. An overlay headline/CTA block on top
            duplicated that copy and fought the artwork, so the carousel runs
            clean. Below-the-fold content is where the messaging now lives. */}
      </div>

      {/* Stats band — band-accent, a deliberate fixed accent that separates the
          banner from the page body. See --color-band-accent in tokens.css. */}
      <div data-hero="band" className="relative z-10 w-full border-y border-band-accent-deep/30 bg-band-accent py-5 sm:py-8 md:py-12">
        <div className="mx-auto w-full max-w-[1480px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:gap-10 lg:grid-cols-4 lg:gap-12">
            {HERO.stats.map((stat, idx) => {
              const Icon = STAT_ICONS[idx] || Award;
              return (
                <div key={idx} data-hero="stat" className="hero-stat group flex items-center justify-center gap-2.5 sm:gap-3 md:gap-4">
                  <span data-hero="icon" className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30 transition-transform duration-300 group-hover:scale-110 sm:h-12 sm:w-12 md:h-14 md:w-14">
                    <Icon className="h-4 w-4 text-white sm:h-6 sm:w-6 md:h-7 md:w-7" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0 text-left">
                    <div className="text-2xl font-semibold leading-none tracking-tight text-white sm:text-4xl sm:leading-none lg:text-5xl">
                      <StatValue value={stat.value} />
                    </div>
                    <div className="mt-1 text-[11px] font-semibold leading-tight tracking-wide text-white/90 sm:text-sm">
                      {stat.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}