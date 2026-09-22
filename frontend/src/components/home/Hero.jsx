import React, { useEffect, useRef, useMemo } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BannerCarousel from "../common/BannerCarousel";
import { gsap } from "../../lib/animations";
import { HERO } from "../../lib/content";

export default function Hero() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const navigate = useNavigate();

  // Banner images
  const banners = useMemo(() => [
    "assets/banners/banner1.png",
    "assets/banners/banner4.jpeg",
    "assets/banners/awardbanner2.png",
     "assets/banners/banner3.png",
  ], []);

  // Text entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
          force3D: true
        },
        delay: 0.2
      });

      tl.from(".hero-label", { y: 20, opacity: 0, duration: 0.6 })
        .from(".hero-headline", { y: 30, opacity: 0, duration: 0.8 }, "-=0.3")
        .from(".hero-sub", { opacity: 0, y: 15, duration: 0.6 }, "-=0.4")
        .from(".hero-cta", { y: 15, opacity: 0, duration: 0.5, stagger: 0.1 }, "-=0.2")
        .from(".hero-stat", { y: 15, opacity: 0, duration: 0.5, stagger: 0.06 }, "-=0.1");
    }, contentRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-testid="hero-section"
      className="relative overflow-hidden"
      style={{
        backgroundColor: "var(--color-bg-primary)",
      }}
    >
      {/* Spacer to clear the fixed navbar + logo strip */}
      <div className="h-32 md:h-36" />

      {/* Banner (1600x550) with text overlay */}
      <div className="relative w-full">
        <BannerCarousel banners={banners} autoPlayInterval={5000} />

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 z-[1] bg-black/40" />

        {/* Content overlay */}
        <div
          ref={contentRef}
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

      {/* Stats Bar - below the banner */}
      <div className="relative z-10 mx-auto w-full max-w-[1480px] px-4 py-8 sm:px-6 md:px-8 md:py-10 lg:px-12 xl:px-16">
        <div className="grid grid-cols-2 gap-6 rounded-2xl border border-border-strong bg-surface-elevated p-6 shadow-sm sm:gap-8 md:p-8 lg:grid-cols-4 lg:gap-10">
          {HERO.stats.map((stat, idx) => (
            <div key={idx} className="hero-stat group">
              <div className="text-2xl font-light tracking-tight text-ink transition-transform duration-300 group-hover:scale-110 sm:text-3xl lg:text-4xl">
                {stat.value}
              </div>
              <div className="mt-2 text-[11px] font-medium tracking-wider text-ink/45 sm:text-xs">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}