import React, { useEffect, useState, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
      if (p >= 1) {
        setIndex((i) => (i + 1) % TESTIMONIALS.length);
      }
    }, 40);
    return () => clearInterval(tick);
  }, [index]);

  const t = TESTIMONIALS[index];

  return (
    <section data-testid="testimonials-section" className="border-y border-white/[0.06] bg-carbon py-28">
      <div className="section-pad mx-auto max-w-4xl text-center">
        <span ref={headRef} className="label text-gold">CLIENT VOICES</span>

        <blockquote key={index} className="mt-12 animate-[fadeIn_0.7s_ease]">
          <p className="display text-3xl italic leading-snug text-platinum sm:text-4xl">
            “{t.quote}”
          </p>
          <footer className="mt-10">
            <span className="label block text-platinum">{t.name}</span>
            <span className="label mt-1 block text-platinum/45">
              {t.title} · {t.company}
            </span>
          </footer>
        </blockquote>

        {/* Controls */}
        <div className="mt-14 flex items-center justify-center gap-8">
          <button
            data-testid="testimonial-prev"
            onClick={() => go(-1)}
            aria-label="Previous"
            className="flex h-11 w-11 items-center justify-center border border-white/[0.1] text-platinum/70 transition-colors hover:border-gold hover:text-gold"
          >
            <ArrowLeft size={17} />
          </button>

          <div className="flex items-center gap-3">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => { setIndex(i); }}
                aria-label={`Testimonial ${i + 1}`}
                className="relative h-[3px] w-10 overflow-hidden bg-white/[0.12]"
              >
                <span
                  className="absolute inset-y-0 left-0 bg-gold transition-[width] duration-100"
                  style={{ width: i === index ? `${progress * 100}%` : i < index ? "100%" : "0%" }}
                />
              </button>
            ))}
          </div>

          <button
            data-testid="testimonial-next"
            onClick={() => go(1)}
            aria-label="Next"
            className="flex h-11 w-11 items-center justify-center border border-white/[0.1] text-platinum/70 transition-colors hover:border-gold hover:text-gold"
          >
            <ArrowRight size={17} />
          </button>
        </div>
      </div>
    </section>
  );
}
