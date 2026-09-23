import React, { useRef, useState, useEffect } from "react";
import { Play } from "lucide-react";
import { VIDEO } from "../../lib/content";
import { useReveal, useStagger } from "../../lib/animations";

const POS = {
  "top-left":     "top-5 left-5",
  "top-right":    "top-5 right-5",
  "bottom-left":  "bottom-5 left-5",
  "bottom-right": "bottom-5 right-5",
};

export default function ProductionVideo() {
  const headRef      = useReveal();
  const capRef       = useStagger("[data-cap]", { stagger: 0.08 });
  const videoRef     = useRef(null);
  const containerRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const observer  = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && videoRef.current && !playing) {
          videoRef.current.play().catch(() => {});
          setPlaying(true);
        }
      },
      { threshold: 0.5 }
    );
    if (container) observer.observe(container);
    return () => { if (container) observer.unobserve(container); };
  }, [playing]);

  const onPlay = () => {
    videoRef.current?.play().catch(() => {});
    setPlaying(true);
  };

  return (
    <section data-testid="video-section" className="relative overflow-hidden bg-surface-primary py-16 lg:py-20">
      {/* Ambient background — warm gold wash, drifting glow, faint grid, shimmer edge */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(165deg, rgba(197,160,90,0.10), rgba(197,160,90,0.03) 45%, transparent 75%)" }} />
      <div aria-hidden className="glow-drift pointer-events-none absolute -top-44 -left-40 h-[480px] w-[480px] rounded-full" style={{ background: "radial-gradient(circle, rgba(197,160,90,0.22), transparent 65%)" }} />
      <div aria-hidden className="lux-grid pointer-events-none absolute inset-0 opacity-50" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(197,160,90,0.7), transparent)", backgroundSize: "200% 100%", animation: "gold-shimmer 6s linear infinite" }} />
      <div className="section-pad relative mx-auto max-w-[1400px]">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left — concise copy */}
          <div ref={headRef}>
            <span className="label text-gold">{VIDEO.eyebrow}</span>
            <h2 className="display mt-4 text-3xl leading-[1.08] tracking-tight text-ink sm:text-4xl lg:text-[44px]">{VIDEO.headline}</h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink/55 sm:text-base">{VIDEO.sub}</p>
          </div>

        {/* Right — video */}
        <div
          ref={containerRef}
          className="relative aspect-video w-full self-center overflow-hidden rounded-lg border border-gold/25 lg:row-span-2"
          style={{ boxShadow: "0 0 60px rgba(197,160,90,0.10)" }}
        >
          <video
            ref={videoRef}
            className="absolute inset-0 z-10 h-full w-full object-cover"
            controls autoPlay muted loop
          >
            <source src="/printing.mp4" type="video/mp4" />
          </video>

          {!playing && (
            <div className="absolute inset-0 z-0 bg-surface-elevated" />
          )}

          {!playing && (
            <button
              data-testid="video-play"
              onClick={onPlay}
              aria-label="Play production reel"
              className="absolute left-1/2 top-1/2 z-30 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
            >
              <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gold hover:bg-gold-soft transition-colors duration-300">
                <Play size={22} className="ml-1 fill-obsidian text-obsidian" />
              </span>
            </button>
          )}

          {/* Floating stat chips */}
          {VIDEO.stats.map((s) => (
            <div
              key={s.label}
              className={`absolute z-20 ${POS[s.pos]} rounded bg-black/50 backdrop-blur-sm px-3 py-1.5 text-[11px] font-medium tracking-wider text-white border border-white/10`}
            >
              {s.label}
            </div>
          ))}
        </div>

        {/* Left bottom — compact capability grid */}
        <div ref={capRef} className="grid grid-cols-2 gap-x-6 gap-y-4 sm:gap-y-5">
          {VIDEO.capabilities.map((c) => (
            <div key={c.title} data-cap className="border-t border-border-soft pt-3">
              <h3 className="text-sm font-semibold text-ink">{c.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-ink/55">{c.desc}</p>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
