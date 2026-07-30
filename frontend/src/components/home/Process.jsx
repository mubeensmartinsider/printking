import React, { useEffect, useRef } from "react";
import { PROCESS } from "../../lib/content";
import { gsap } from "../../lib/animations";
import { useReveal } from "../../lib/animations";

function Tooltip({ step }) {
  return (
    <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-4 w-[220px] -translate-x-1/2 translate-y-2 border border-white/10 bg-[rgba(28,24,20,0.92)] p-4 text-left opacity-0 shadow-[0_16px_40px_rgba(0,0,0,0.5)] backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
      style={{ borderTop: "2px solid rgba(197,160,90,0.6)" }}>
      <span className="label text-gold">Step {step.num}</span>
      <p className="mt-2 text-[12px] leading-relaxed text-platinum/65">{step.desc}</p>
    </div>
  );
}

export default function Process() {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const headRef = useReveal();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const path = pathRef.current;
      if (path) {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%", end: "bottom 75%", scrub: 1 },
        });
      }
      gsap.from("[data-node]", {
        scale: 0, opacity: 0, duration: 0.5, stagger: 0.12, ease: "back.out(1.7)",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} data-testid="process-section" className="relative bg-carbon py-28">
      <div className="lux-grid absolute inset-0 opacity-[0.35]" />
      {/* Background pattern overlay */}
      <div className="absolute inset-0 bg-pattern-process pointer-events-none opacity-60" />
      <div className="section-pad relative mx-auto max-w-[1400px]">
        <div ref={headRef} className="mb-24 max-w-2xl">
          <span className="label text-gold">HOW WE WORK</span>
          <h2 className="display mt-6 text-4xl leading-[1.08] text-platinum sm:text-5xl">
            From Brief to Delivery —
            <br />
            <span className="italic">We Own Every Step.</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-platinum/55">
            A seven-stage process refined over 15 years. No shortcuts. No assumptions. No surprises.
          </p>
        </div>

        {/* Desktop horizontal timeline */}
        <div className="relative hidden md:block">
          <svg className="absolute left-0 top-[14px] h-6 w-full" preserveAspectRatio="none" viewBox="0 0 1000 20">
            <line x1="0" y1="10" x2="1000" y2="10" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <line ref={pathRef} x1="0" y1="10" x2="1000" y2="10" stroke="#c5a05a" strokeWidth="1.5" />
          </svg>
          <div className="grid grid-cols-7 gap-2">
            {PROCESS.map((step) => (
              <div key={step.num} className="group relative flex flex-col items-center text-center">
                <Tooltip step={step} />
                <div data-node className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full border border-gold bg-carbon transition-colors duration-300 group-hover:bg-gold">
                  <span className="h-2 w-2 rounded-full bg-gold transition-colors duration-300 group-hover:bg-obsidian" />
                </div>
                <span className="label mt-6 text-gold">{step.num}</span>
                <h4 className="mt-2 px-1 text-sm font-medium text-platinum">{step.title}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="relative space-y-8 border-l border-white/[0.1] pl-8 md:hidden">
          {PROCESS.map((step) => (
            <div key={step.num} className="relative">
              <span className="absolute -left-[39px] top-1 flex h-5 w-5 items-center justify-center rounded-full border border-gold bg-carbon">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
              </span>
              <span className="label text-gold">{step.num}</span>
              <h4 className="mt-1 text-base font-medium text-platinum">{step.title}</h4>
              <p className="mt-1 text-sm text-platinum/50">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
