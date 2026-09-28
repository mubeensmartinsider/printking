import React, { useMemo } from "react";
import { Award, Printer, Users, Factory } from "lucide-react";
import BannerCarousel from "../common/BannerCarousel";
import { HERO } from "../../lib/content";

// Icon per stat, in the same order as HERO.stats
const STAT_ICONS = [Award, Printer, Users, Factory];

export default function Hero() {

  // Banner images
  const banners = useMemo(() => [
    "/assets/banners/mainbanner2.jpg",
    "/assets/banners/banner4.jpeg",
    "/assets/banners/awardbanner2.jpg",
    "/assets/banners/banner3.jpg",
    "/assets/banners/rigidbanner.jpg",
  ], []);

  return (
    <section
      data-testid="hero-section"
      className="relative overflow-hidden"
      style={{
        backgroundColor: "var(--color-bg-primary)",
      }}
    >
      {/* Banner (1600x550) with text overlay */}
      <div className="relative w-full">
        <BannerCarousel banners={banners} autoPlayInterval={5000} />

        {/* Content overlay */}
        <div
          className="absolute inset-0 z-10 flex items-center"
        >
          <div className="mx-auto w-full max-w-[1480px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <div className="max-w-3xl">
          {/* Label */}
          {/* <div className="hero-label inline-flex items-center gap-2 rounded-full border border-border-soft/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
            <span className="text-[10px] font-medium tracking-[0.2em] text-white sm:text-xs">
              {HERO.label}
            </span>
          </div> */}

          {/* Headline */}
          {/* <h1 className="hero-headline mt-8 font-light leading-[1.08] tracking-tight text-white md:mt-10">
            <span className="block text-[clamp(2.5rem,8vw,5.5rem)] md:text-[clamp(3.5rem,7vw,7rem)] lg:text-[clamp(4.5rem,6.5vw,8rem)]">
              {HERO.headline}
            </span>
          </h1> */}

          {/* Subheadline */}
          {/* <p className="hero-sub mt-6 max-w-[90%] text-base leading-relaxed text-white/80 sm:mt-8 sm:max-w-[85%] sm:text-lg md:max-w-[650px] md:text-xl md:leading-relaxed">
            {HERO.subheadline}
          </p> */}

              {/* CTAs — the hero overlay currently ships with no buttons;
                  the /portfolio CTA was removed along with the Portfolio page. */}
              <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4">
                {/* <button
                  data-testid="hero-quote-btn"
                  onClick={() => navigate("/request-quote")}
                  className="hero-cta rounded-full px-6 py-3 font-semibold sm:px-8 sm:py-3.5"
                  style={{
                    background: "var(--color-accent)",
                    color: "var(--color-text-inverse)",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "13px",
                    letterSpacing: "0.05em",
                  }}
                >
                  <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    Request a Quote
                    <ArrowRight size={16} />
                  </span>
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats bar — a dark brand band so the white stats read in BOTH themes */}
      <div className="relative z-10 w-full border-y border-border-soft bg-obsidian py-5 sm:py-8 md:py-12" style={{backgroundColor:'#2dabe2'}}>
        <div className="mx-auto w-full max-w-[1480px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:gap-10 lg:grid-cols-4 lg:gap-12">
            {HERO.stats.map((stat, idx) => {
              const Icon = STAT_ICONS[idx] || Award;
              return (
                <div key={idx} className="hero-stat group flex items-center justify-center gap-2.5 sm:gap-3 md:gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25 transition-transform duration-300 group-hover:scale-110 sm:h-12 sm:w-12 md:h-14 md:w-14">
                    <Icon className="h-4 w-4 text-white sm:h-6 sm:w-6 md:h-7 md:w-7" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0 text-left">
                    <div className="text-2xl font-semibold leading-none tracking-tight text-white transition-transform duration-300 group-hover:scale-110 sm:text-4xl sm:leading-none lg:text-5xl">
                      {stat.value}
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