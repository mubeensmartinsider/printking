import React, { useRef, useState, useEffect } from "react";
import { Play } from "lucide-react";
import { VIDEO } from "../../lib/content";
import { useReveal, useStagger } from "../../lib/animations";

const POS = {
  "top-left": "top-5 left-5",
  "top-right": "top-5 right-5",
  "bottom-left": "bottom-5 left-5",
  "bottom-right": "bottom-5 right-5",
};

export default function ProductionVideo() {
  const headRef = useReveal();
  const capRef = useStagger("[data-cap]", { stagger: 0.08 });
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  // Autoplay when video comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && videoRef.current && !playing) {
          videoRef.current.play().catch((err) => {
            console.error("Play error:", err);
          });
          setPlaying(true);
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [playing]);

  const onPlay = () => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.error("Play error:", err);
      });
      setPlaying(true);
    }
  };

  return (
    <section data-testid="video-section" className="relative bg-carbon py-28">
      <div className="section-pad mx-auto max-w-[1400px]">
        <div ref={headRef} className="mb-14 max-w-3xl">
          <span className="label text-gold">{VIDEO.eyebrow}</span>
          <h2 className="display mt-6 text-4xl leading-tight text-platinum sm:text-5xl">{VIDEO.headline}</h2>
          <p className="mt-6 text-base leading-relaxed text-platinum/55">{VIDEO.sub}</p>
        </div>

        {/* Cinema container — VIDEO SLOT */}
        <div
          ref={containerRef}
          className="relative mx-auto aspect-video w-full max-w-[1200px] overflow-hidden rounded-lg border border-gold/25"
          style={{ boxShadow: "0 0 80px rgba(197, 160, 90,0.12)" }}
        >
          {/* Video element */}
          <video
            ref={videoRef}
            className="absolute inset-0 z-10 h-full w-full object-cover"
            poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Crect fill='%2314110d' width='1920' height='1080'/%3E%3C/svg%3E"
            controls
            autoPlay
            muted
            loop
          >
            <source src="/dummy.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Poster placeholder (shown when not playing) */}
          {!playing && (
            <div className="absolute inset-0 z-0 bg-[#14110d]">
              <div className="grain absolute inset-0 opacity-[0.06]" />
              <div className="lux-grid absolute inset-0 opacity-40" />
              <div className="absolute inset-0" style={{ background: "radial-gradient(80% 60% at 50% 40%, rgba(197, 160, 90,0.10), transparent 65%)" }} />
            </div>
          )}

          {/* Letterbox gradients */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-24" style={{ background: "linear-gradient(#0d0b09cc, transparent)" }} />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24" style={{ background: "linear-gradient(transparent, #0d0b09cc)" }} />

          {/* Play trigger */}
          {!playing && (
            <button
              data-testid="video-play"
              onClick={onPlay}
              aria-label="Play production reel"
              className="absolute left-1/2 top-1/2 z-30 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
            >
              <span className="absolute inset-0 rounded-full border border-gold/60 pulse-ring" />
              <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gold transition-transform duration-300 group-hover:scale-110 hover:scale-110">
                <Play size={22} className="ml-1 fill-obsidian text-obsidian" />
              </span>
            </button>
          )}

          {!playing && <span className="absolute bottom-5 left-1/2 z-30 -translate-x-1/2 label text-platinum/45">Watch the floor in motion</span>}

          {/* Floating stat cards */}
          {VIDEO.stats.map((s, i) => (
            <div key={s.label} className={`video-stat absolute ${POS[s.pos]}`} style={{ animationDelay: `${i}s` }}>
              {s.label}
            </div>
          ))}
        </div>

        {/* Capability strip */}
        <div ref={capRef} className="mt-16 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {VIDEO.capabilities.map((c) => (
            <div key={c.title} data-cap className="border-t border-white/[0.08] pt-5">
              <h3 className="text-base font-medium text-platinum">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-platinum/55">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
