import React, { useEffect, useRef } from "react";
import { PROCESS } from "../../lib/content";
import SectionHeading from "../common/SectionHeading";
import { gsap, ScrollTrigger } from "../../lib/animations";

export default function Process() {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const path = pathRef.current;
      if (path) {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 75%",
            scrub: 1,
          },
        });
      }
      gsap.from("[data-node]", {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.12,
        ease: "back.out(1.7)",
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} data-testid="process-section" className="bg-obsidian py-28">
      <div className="section-pad mx-auto max-w-[1400px]">
        <SectionHeading
          eyebrow="HOW WE WORK"
          title="From Brief to Delivery — We Own Every Step"
          className="mb-24"
        />

        {/* Desktop horizontal timeline */}
        <div className="relative hidden md:block">
          <svg className="absolute left-0 top-[14px] h-6 w-full" preserveAspectRatio="none" viewBox="0 0 1000 20">
            <line x1="0" y1="10" x2="1000" y2="10" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
            <line
              ref={pathRef}
              x1="0"
              y1="10"
              x2="1000"
              y2="10"
              stroke="#c9a84c"
              strokeWidth="1.5"
            />
          </svg>
          <div className="grid grid-cols-7 gap-2">
            {PROCESS.map((step) => (
              <div key={step.num} className="group flex flex-col items-center text-center">
                <div
                  data-node
                  className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full border border-gold bg-obsidian transition-colors duration-300 group-hover:bg-gold"
                >
                  <span className="h-2 w-2 rounded-full bg-gold transition-colors duration-300 group-hover:bg-obsidian" />
                </div>
                <span className="label mt-6 text-gold">{step.num}</span>
                <h4 className="mt-2 px-1 text-sm font-medium text-platinum">{step.title}</h4>
                <p className="mt-2 px-2 text-xs leading-snug text-platinum/45 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile vertical timeline */}
        <div className="relative space-y-8 border-l border-white/[0.1] pl-8 md:hidden">
          {PROCESS.map((step) => (
            <div key={step.num} className="relative">
              <span className="absolute -left-[39px] top-1 flex h-5 w-5 items-center justify-center rounded-full border border-gold bg-obsidian">
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
