import React, { useEffect, useRef } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HeroBox from "../../three/HeroBox";
import { gsap } from "../../lib/animations";
import { HERO } from "../../lib/content";

export default function Hero() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const navigate = useNavigate();

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
      className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-[#0d0b09] via-[#0f0d0a] to-[#1a140d]"
    >
      {/* Ambient glow effects */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-30">
        <div className="absolute top-0 left-1/4 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-gold/20 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] translate-x-1/2 rounded-full bg-gold/10 blur-[100px]" />
      </div>

      {/* 3D Scene - Luxury Box only */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <HeroBox />
      </div>

      {/* Content Container */}
      <div
        ref={contentRef}
        className="absolute inset-0 z-20 mx-auto w-full max-w-[1480px] px-4 py-20 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-44 md:pt-28 pb-48 sm:pb-40 md:pb-32 lg:pb-32"
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="max-w-4xl">
          {/* Label */}
          <div className="hero-label inline-flex items-center gap-2 rounded-full border border-gold/20 bg-gold/5 px-4 py-2 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
            <span className="text-[10px] font-medium tracking-[0.2em] text-gold sm:text-xs">
              {HERO.label}
            </span>
          </div>

          {/* Headline */}
          <h1 className="hero-headline mt-8 font-light leading-[1.08] tracking-tight text-platinum md:mt-10">
            <span className="block text-[clamp(2.5rem,8vw,5.5rem)] md:text-[clamp(3.5rem,7vw,7rem)] lg:text-[clamp(4.5rem,6.5vw,8rem)]">
              {HERO.headline}
            </span>
          </h1>

          {/* Subheadline */}
          <p className="hero-sub mt-6 max-w-[90%] text-base leading-relaxed text-platinum/60 sm:mt-8 sm:max-w-[85%] sm:text-lg md:max-w-[650px] md:text-xl md:leading-relaxed">
            {HERO.subheadline}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:gap-4">
            <button
              data-testid="hero-quote-btn"
              onClick={() => navigate("/request-quote")}
              className="hero-cta rounded-full px-8 py-4 font-semibold sm:px-10 sm:py-5"
              style={{
                background: "#c5a05a",
                color: "#0d0b09",
                border: "none",
                cursor: "pointer",
                fontSize: "14px",
                letterSpacing: "0.05em",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                Request a Quote
                <ArrowRight size={18} />
              </span>
            </button>
            <button
              data-testid="hero-portfolio-btn"
              onClick={() => navigate("/portfolio")}
              className="hero-cta rounded-full px-8 py-4 font-medium sm:px-10 sm:py-5"
              style={{
                background: "transparent",
                color: "#f0ebe2",
                border: "1px solid rgba(197, 160, 90, 0.4)",
                cursor: "pointer",
                fontSize: "14px",
                letterSpacing: "0.05em",
              }}
            >
              Explore Portfolio
            </button>
          </div>

          {/* Stats Bar */}
          <div className="mt-16 rounded-2xl border border-gold/10 bg-gradient-to-br from-gold/5 to-transparent p-6 backdrop-blur-sm sm:mt-20 sm:p-8 md:mt-24">
            <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4 lg:gap-10">
              {HERO.stats.map((stat, idx) => (
                <div key={idx} className="hero-stat group">
                  <div className="text-3xl font-light tracking-tight text-gold transition-transform duration-300 group-hover:scale-110 sm:text-4xl lg:text-5xl">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-[11px] font-medium tracking-wider text-platinum/40 sm:text-xs">
                    {stat.label}
                  </div>
                  {idx < HERO.stats.length - 1 && (
                    <div className="absolute right-0 top-1/2 hidden h-12 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-gold/20 to-transparent lg:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-24 left-1/2 z-10 hidden -translate-x-1/2 animate-bounce md:block">
        <div className="flex flex-col items-center gap-2 opacity-40 transition-opacity duration-300 hover:opacity-100">
          <ChevronDown size={20} className="text-gold" strokeWidth={1.5} />
          <div className="h-12 w-px bg-gradient-to-b from-gold/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}