import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Star, ShieldCheck, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "../../lib/content";

const CLIENTS_PHOTO = "/assets/clients.jpg";

const PREFERS_REDUCED =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Normalise the field names — content.js has name/title/company transposed */
const attr = (t) => ({ company: t.title, role: t.name, city: t.company });

const Stars = () => (
  <span className="flex items-center gap-1" aria-label="Rated 5 out of 5">
    {Array.from({ length: 5 }, (_, i) => (
      <Star key={i} size={13} className="fill-gold-soft text-gold-soft" strokeWidth={1.5} aria-hidden="true" />
    ))}
  </span>
);

/* Apply CSS 3-D depth transform to every slide based on its distance from
   the selected snap point. Active slide sits flush; flanking slides rotate
   away and recede into Z, giving a curved-theatre effect.              */
function applyDepth(emblaApi) {
  if (PREFERS_REDUCED) return;
  const slides     = emblaApi.slideNodes();
  const snaps      = emblaApi.scrollSnapList();
  const progress   = emblaApi.scrollProgress();

  snaps.forEach((snap, i) => {
    const slide  = slides[i];
    if (!slide) return;
    const diff    = Math.max(-1, Math.min(1, (progress - snap) * 2.8));
    const rotateY = diff * -22;
    const transZ  = (1 - Math.abs(diff)) * 50 - 50;   // 0 active → −50 edge
    const opacity = 1 - Math.abs(diff) * 0.5;
    const sc      = 1 - Math.abs(diff) * 0.07;
    slide.style.transform  = `perspective(1000px) rotateY(${rotateY}deg) translateZ(${transZ}px) scale(${sc})`;
    slide.style.opacity    = String(opacity);
    slide.style.transition = "transform 0.06s linear, opacity 0.06s linear";
  });
}

export default function Testimonials() {
  const [photoFailed, setPhotoFailed]   = useState(false);
  const [selectedIdx, setSelectedIdx]   = useState(0);

  const autoplay = useRef(
    Autoplay({ delay: 4600, stopOnInteraction: true })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", skipSnaps: false },
    [autoplay.current]
  );

  useEffect(() => {
    if (!emblaApi) return;
    const sync = () => {
      applyDepth(emblaApi);
      setSelectedIdx(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("scroll", sync);
    emblaApi.on("select", sync);
    emblaApi.on("reInit", sync);
    sync();
    return () => { emblaApi.off("scroll", sync); emblaApi.off("select", sync); };
  }, [emblaApi]);

  const prev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section
      data-testid="testimonials-section"
      /* Always-dark plate, like the footer and the hero band. This section is
         built dark on purpose: a full-bleed photo under a graphite scrim, with
         white type and translucent white cards. It therefore must NOT use a
         theme-aware surface — `bg-surface-elevated` resolves to light cream
         (#ede9e2) in light mode, which left every white heading, quote and
         attribution unreadable. `bg-obsidian` stays near-black in both themes.
         The border is white-alpha to match, since --color-border is near-black
         in light mode and vanished against the dark plate. */
      className="relative isolate overflow-hidden border-y border-white/10 bg-obsidian py-16 lg:py-24"
    >
      <style>{`
        .testi-track { perspective: 1000px; }
        .testi-slide {
          will-change: transform, opacity;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        @media (prefers-reduced-motion: reduce) {
          .testi-slide { transform: none !important; opacity: 1 !important; }
        }
      `}</style>

      {/* Full-bleed background photo */}
      {!photoFailed && (
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
          <img
            src={CLIENTS_PHOTO}
            alt=""
            onError={() => setPhotoFailed(true)}
            className="h-full w-full object-cover opacity-50 grayscale"
          />
          {/* Scrim over the photo. Was `bg-graphite/82`, which Tailwind drops
              silently — 82 is not on the default opacity scale (multiples of
              5), so no rule was ever emitted and the photo sat at only 50%
              opacity, washing out the white type above it. */}
          <div className="absolute inset-0 bg-graphite/80" />
        </div>
      )}

      {/* Ambient radial gold vignette at bottom */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "radial-gradient(60% 45% at 50% 105%, rgba(197,160,90,0.18), transparent)" }}
      />

      <div className="section-pad mx-auto max-w-[1400px]">
        {/* Header row */}
        <div className="mb-12 flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
          <div>
            <span className="label text-[11px] font-semibold tracking-[0.22em] text-gold-soft">
              CLIENT VOICES
            </span>
            <h2 className="display mt-3 text-3xl text-white sm:text-4xl lg:text-5xl">
              What Our Clients Say.
            </h2>
          </div>
          <div className="flex items-center gap-2 text-white/70">
            <ShieldCheck size={15} className="text-gold-soft" aria-hidden="true" />
            <span className="text-[13px] font-medium">
              {TESTIMONIALS.length} verified client testimonials
            </span>
          </div>
        </div>

        {/* Embla 3-D carousel */}
        <div
          className="overflow-visible"
          ref={emblaRef}
          role="region"
          aria-roledescription="carousel"
          aria-label="Client testimonials"
        >
          <div className="testi-track flex gap-5">
            {TESTIMONIALS.map((t, i) => {
              const { company, role, city } = attr(t);
              const isActive = i === selectedIdx;
              return (
                <figure
                  key={`${city}-${i}`}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Testimonial ${i + 1} of ${TESTIMONIALS.length}`}
                  className="testi-slide min-w-0 flex-[0_0_min(86vw,520px)] sm:flex-[0_0_min(64vw,480px)] lg:flex-[0_0_min(40vw,500px)]"
                >
                  <div
                    className={`relative h-full overflow-hidden rounded-sm border p-7 backdrop-blur-md transition-colors duration-500 sm:p-8
                      ${isActive
                        ? "border-gold/40 bg-white/10 shadow-[0_0_60px_rgba(197,160,90,0.12)]"
                        : "border-white/10 bg-white/5"}`}
                  >
                    {/* Decorative quote mark */}
                    <Quote
                      size={40}
                      className="absolute right-6 top-5 text-gold/15 rotate-180"
                      aria-hidden="true"
                    />

                    <Stars />
                    <blockquote className="mt-5">
                      <p className="font-serif text-[18px] italic leading-[1.8] text-white sm:text-[19px]">
                        {t.quote}
                      </p>
                    </blockquote>
                    <figcaption className="mt-6">
                      <span className="block h-px w-8 bg-gold-soft/60" />
                      <span className="mt-3 block text-[15px] font-semibold text-white">
                        {company}
                      </span>
                      <span className="mt-1 block text-[11px] font-medium uppercase tracking-[0.14em] text-white/65">
                        {role} · {city}
                      </span>
                    </figcaption>

                    {/* Active card gold bottom line */}
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent"
                      />
                    )}
                  </div>
                </figure>
              );
            })}
          </div>
        </div>

        {/* Controls row */}
        <div className="mt-9 flex items-center justify-between">
          {/* Dot indicators */}
          <div
            role="tablist"
            aria-label="Testimonial indicators"
            className="flex items-center gap-2"
          >
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === selectedIdx}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => emblaApi?.scrollTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === selectedIdx
                    ? "h-2 w-8 bg-gold-soft"
                    : "h-2 w-2 bg-white/25 hover:bg-white/55"
                }`}
              />
            ))}
          </div>

          {/* Prev / Next buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/60 transition-all duration-300 hover:border-gold/60 hover:bg-gold/10 hover:text-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <ChevronLeft size={19} />
            </button>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/60 transition-all duration-300 hover:border-gold/60 hover:bg-gold/10 hover:text-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              <ChevronRight size={19} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
