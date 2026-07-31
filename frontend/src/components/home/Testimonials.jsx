import React, { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { TESTIMONIALS } from "../../lib/content";
import { useReveal } from "../../lib/animations";

const DURATION = 6000;

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const headRef = useReveal();

  const go = useCallback((dir) => {
    setProgress(0);
    setIndex((i) => (i + dir + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    setProgress(0);
    const start = Date.now();
    const tick = setInterval(() => {
      const p = Math.min(1, (Date.now() - start) / DURATION);
      setProgress(p);
      if (p >= 1) setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 40);
    return () => clearInterval(tick);
  }, [index]);

  const t = TESTIMONIALS[index];

  return (
    <section data-testid="testimonials-section" className="relative border-y border-white/[0.06] bg-graphite py-28 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern-testimonials pointer-events-none" />
      
      <div className="section-pad mx-auto max-w-4xl text-center">
        <span ref={headRef} className="label text-gold">CLIENT VOICES</span>
        <h2 className="display mt-5 text-3xl text-platinum sm:text-4xl">What Our Clients Say.</h2>

        <div className="relative mt-14">
          {/* decorative chevrons */}
          <span className="display pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-[120px] leading-none text-gold/[0.06] italic">
            &ldquo;
          </span>
          <blockquote key={index} className="relative animate-[fadeIn_0.5s_ease]">
            {/* Star rating */}
            <div className="flex items-center justify-center gap-1.5 mb-8">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} size={16} className="text-gold fill-gold" strokeWidth={1.5} />
              ))}
            </div>
            <p className="display-serif-alt mx-auto max-w-[780px] text-3xl italic leading-snug text-platinum sm:text-[34px]">
              &ldquo;{t.quote}&rdquo;
            </p>
            <footer className="mt-10">
              <span className="mx-auto mb-4 block h-px w-8 bg-gold" />
              <span className="block text-[13px] font-semibold text-platinum">{t.name}</span>
              <span className="label mt-1 block text-gold">{t.title} · {t.company}</span>
            </footer>
          </blockquote>
        </div>

        {/* Controls */}
        <div className="mt-14 flex items-center justify-center gap-8">
          <button data-testid="testimonial-prev" onClick={() => go(-1)} aria-label="Previous"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/20 text-platinum/70 transition-all duration-300 hover:border-gold hover:text-gold hover:bg-gold/10">
            <ChevronLeft size={18} />
          </button>

          <div className="flex flex-col items-center gap-3">
            <div className="h-[3px] w-40 overflow-hidden bg-white/[0.1] rounded-full">
              <span className="block h-full bg-gold rounded-full transition-[width] duration-100" style={{ width: `${progress * 100}%` }} />
            </div>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setIndex(i)} aria-label={`Go to ${i + 1}`}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${i === index ? "bg-gold scale-125" : "bg-platinum/30 hover:bg-platinum/50"}`} />
              ))}
            </div>
          </div>

          <button data-testid="testimonial-next" onClick={() => go(1)} aria-label="Next"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/20 text-platinum/70 transition-all duration-300 hover:border-gold hover:text-gold hover:bg-gold/10">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
