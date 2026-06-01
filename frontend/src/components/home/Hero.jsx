import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HeroBox from "../../three/HeroBox";
import { gsap } from "../../lib/animations";
import { HERO } from "../../lib/content";

function Counter({ value, suffix, label, delay }) {
  const numRef = useRef(null);
  useEffect(() => {
    const obj = { v: 0 };
    const t = gsap.to(obj, {
      v: value,
      duration: 2,
      delay,
      ease: "power2.out",
      onUpdate: () => {
        if (numRef.current) numRef.current.textContent = Math.round(obj.v) + suffix;
      },
    });
    return () => t.kill();
  }, [value, suffix, delay]);

  return (
    <div className="flex-1 px-4 first:pl-0">
      <div ref={numRef} className="display text-3xl text-platinum sm:text-4xl">0{suffix}</div>
      <div className="label mt-2 text-platinum/45">{label}</div>
    </div>
  );
}

export default function Hero() {
  const progressRef = useRef(0);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const [showScroll, setShowScroll] = useState(false);
  const navigate = useNavigate();

  // drive 3D box scroll progress
  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight;
      progressRef.current = Math.min(1, Math.max(0, window.scrollY / vh));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // entrance timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-label", { y: 40, opacity: 0, duration: 0.6, delay: 0.2 })
        .from(".hero-line", { y: 60, opacity: 0, duration: 0.8, stagger: 0.12 }, "-=0.1")
        .from(".hero-sub", { opacity: 0, y: 20, duration: 0.6 }, "-=0.3")
        .from(".hero-cta", { y: 24, opacity: 0, duration: 0.6, stagger: 0.1 }, "-=0.2")
        .from(".hero-counters", { y: 24, opacity: 0, duration: 0.6 }, "-=0.1");
    }, contentRef);
    const t = setTimeout(() => setShowScroll(true), 1200);
    return () => {
      ctx.revert();
      clearTimeout(t);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-testid="hero-section"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* 3D scene */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <HeroBox progressRef={progressRef} />
      </div>

      {/* Legibility gradient */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(100deg, rgba(10,10,11,0.92) 0%, rgba(10,10,11,0.6) 38%, rgba(10,10,11,0) 70%)",
        }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="section-pad relative z-10 mx-auto w-full max-w-[1400px] pt-28 pb-16"
      >
        <div className="max-w-2xl">
          <span className="hero-label label inline-block text-gold">{HERO.label}</span>

          <h1 className="display mt-7 text-platinum">
            {HERO.headline.map((line, i) => (
              <span key={i} className="hero-line block text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
                {line}
              </span>
            ))}
          </h1>

          <p className="hero-sub mt-8 max-w-[520px] text-lg leading-relaxed text-platinum/60">
            {HERO.subheadline}
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              data-testid="hero-quote-btn"
              onClick={() => navigate("/request-quote")}
              className="btn-gold hero-cta"
            >
              Request a Quote <ArrowRight size={16} />
            </button>
            <button
              data-testid="hero-work-btn"
              onClick={() => navigate("/portfolio")}
              className="btn-ghost hero-cta"
            >
              View Our Work
            </button>
          </div>

          {/* Counters */}
          <div className="hero-counters mt-16 flex max-w-2xl divide-x divide-gold/20">
            {HERO.counters.map((c, i) => (
              <Counter key={c.label} {...c} delay={1.4 + i * 0.15} />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 z-10 -translate-x-1/2 transition-opacity duration-700 ${
          showScroll ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col items-center gap-2 text-platinum/40">
          <span className="label">Scroll</span>
          <ArrowDown size={16} className="animate-bounce text-gold" />
        </div>
      </div>
    </section>
  );
}
