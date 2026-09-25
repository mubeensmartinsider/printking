import React, { useMemo } from "react";
import { Award, Printer, Users, Factory } from "lucide-react";
import BannerCarousel from "../common/BannerCarousel";
import { HERO } from "../../lib/content";

// Icon per stat, in the same order as HERO.stats
const STAT_ICONS = [Award, Printer, Users, Factory];

export default function Hero() {

  // Banner images
  const banners = useMemo(() => [
    "/assets/banners/mainbanner2.png",
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
          {/* <div className="hero-label inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
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

              {/* CTAs */}
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
                {/* <button
                  data-testid="hero-portfolio-btn"
                  onClick={() => navigate("/portfolio")}
                  className="hero-cta rounded-full px-6 py-3 font-medium sm:px-8 sm:py-3.5"
                  style={{
                    background: "transparent",
                    color: "#ffffff",
                    border: "1px solid rgba(255, 255, 255, 0.4)",
                    cursor: "pointer",
                    fontSize: "13px",
                    letterSpacing: "0.05em",
                  }}
                >
                  Explore Portfolio
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar - full-width band below the banner */}
      <div className="relative z-10 w-full bg-[#2dabe2] py-8 md:py-12">
        <div className="mx-auto w-full max-w-[1480px] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-4 lg:gap-12">
            {HERO.stats.map((stat, idx) => {
              const Icon = STAT_ICONS[idx] || Award;
              return (
                <div key={idx} className="hero-stat group flex items-center justify-center gap-2 sm:gap-3 md:gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25 transition-transform duration-300 group-hover:scale-110 sm:h-12 sm:w-12 md:h-14 md:w-14">
                    <Icon className="h-5 w-5 text-white sm:h-6 sm:w-6 md:h-7 md:w-7" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0 text-left">
                    <div className="text-3xl font-semibold tracking-tight text-white transition-transform duration-300 group-hover:scale-110 sm:text-4xl lg:text-5xl">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-xs font-semibold tracking-wider text-white/90 sm:text-sm">
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