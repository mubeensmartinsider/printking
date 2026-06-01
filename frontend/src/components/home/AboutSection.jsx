import React, { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ABOUT } from "../../lib/content";
import { useReveal, gsap } from "../../lib/animations";
import Img from "../common/Img";

export default function AboutSection() {
  const leftRef = useReveal();
  const gridRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cols = gridRef.current?.querySelectorAll("[data-parallax]");
      cols?.forEach((col, i) => {
        gsap.to(col, {
          yPercent: i % 2 === 0 ? -8 : 8,
          ease: "none",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <section data-testid="about-section" className="bg-obsidian py-28">
      <div className="section-pad mx-auto grid max-w-[1400px] gap-16 lg:grid-cols-2 lg:gap-24">
        {/* Left — editorial */}
        <div ref={leftRef} className="flex flex-col justify-center">
          <span className="label text-gold">{ABOUT.eyebrow}</span>
          <h2 className="display mt-6 text-3xl leading-[1.12] text-platinum sm:text-4xl lg:text-[44px]">
            “{ABOUT.headline}”
          </h2>
          <div className="mt-8 space-y-5">
            {ABOUT.body.map((p, i) => (
              <p key={i} className="text-base leading-[1.8] text-platinum/60">{p}</p>
            ))}
          </div>
          <button
            data-testid="about-cta"
            onClick={() => navigate("/about")}
            className="group mt-10 inline-flex items-center gap-2 self-start border-b border-gold/40 pb-1 text-sm text-gold transition-colors hover:border-gold"
          >
            {ABOUT.cta}
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Right — 2x2 film grid */}
        <div ref={gridRef} className="grid grid-cols-2 gap-4">
          {ABOUT.images.map((img, i) => (
            <div
              key={i}
              data-parallax
              className={`group relative overflow-hidden ${i % 2 === 0 ? "mt-0" : "mt-8"}`}
            >
              <Img
                src={img.src}
                alt={img.caption}
                label={img.caption}
                className="aspect-[4/5] w-full"
                imgClassName="transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-obsidian/80 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <span className="label text-gold">{img.caption}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
