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
    <section data-testid="video-section" className="relative bg-surface-primary py-28">
      <div className="section-pad mx-auto max-w-[1400px]">
        <div ref={headRef} className="mb-14 max-w-3xl">
          <span className="label text-gold">{VIDEO.eyebrow}</span>
          <h2 className="display mt-6 text-4xl leading-tight text-ink sm:text-5xl">{VIDEO.headline}</h2>
          <p className="mt-6 text-base leading-relaxed text-ink/55">{VIDEO.sub}</p>
        </div>

        {/* Video container */}
        <div
          ref={containerRef}
          className="relative mx-auto aspect-video w-full max-w-[1200px] overflow-hidden rounded-lg border border-gold/25"
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

        {/* Capability strip */}
        <div ref={capRef} className="mt-16 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {VIDEO.capabilities.map((c) => (
            <div key={c.title} data-cap className="border-t border-border-soft pt-5">
              <h3 className="text-base font-medium text-ink">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/55">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
