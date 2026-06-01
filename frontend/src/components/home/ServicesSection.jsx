import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SERVICES } from "../../lib/content";
import ServiceCard from "../common/ServiceCard";
import { gsap, ScrollTrigger } from "../../lib/animations";

export default function ServicesSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const amount = () => track.scrollWidth - window.innerWidth;
      gsap.to(track, {
        x: () => -amount(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => "+=" + amount(),
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section data-testid="services-section" className="bg-obsidian">
      {/* Desktop — horizontal pinned scroll */}
      <div ref={sectionRef} className="hidden h-screen overflow-hidden lg:block">
        <div ref={trackRef} className="flex h-full items-center gap-6 px-16 will-change-transform">
          {/* Intro panel */}
          <div className="flex h-[60vh] w-[42vw] flex-none flex-col justify-center pr-10">
            <span className="label text-gold">WHAT WE MAKE</span>
            <h2 className="display mt-6 text-5xl leading-tight text-platinum xl:text-6xl">
              Every Format. Every Finish. Every Scale.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-platinum/55">
              Thirteen disciplines under one roof — engineered to jewellery-grade
              tolerances. Scroll to explore the full catalogue.
            </p>
          </div>

          {SERVICES.map((s) => (
            <div key={s.num} className="h-[60vh] w-[34vw] flex-none">
              <ServiceCard service={s} onClick={() => navigate("/services")} className="h-full" />
            </div>
          ))}
        </div>
      </div>

      {/* Mobile — vertical stack */}
      <div className="section-pad py-24 lg:hidden">
        <span className="label text-gold">WHAT WE MAKE</span>
        <h2 className="display mt-5 text-4xl leading-tight text-platinum">
          Every Format. Every Finish. Every Scale.
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {SERVICES.map((s) => (
            <ServiceCard key={s.num} service={s} onClick={() => navigate("/services")} />
          ))}
        </div>
      </div>
    </section>
  );
}
