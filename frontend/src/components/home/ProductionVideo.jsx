import React, { useRef, useState, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { VIDEO } from "../../lib/content";
import { useReveal, useStagger, usePrefersReducedMotion, gsap } from "../../lib/animations";

/* Stat chips are pinned to the RIGHT edge of the video panel. The two that
   used to sit on the left (top-left, bottom-left) were removed — they crowded
   the play control and left the panel visually unbalanced. */
const POS = {
  "top-left":     "top-4 right-4 sm:top-5 sm:right-5",
  "top-right":    "top-4 right-4 sm:top-5 sm:right-5",
  "bottom-left":  "bottom-4 right-4 sm:bottom-5 sm:right-5",
  "bottom-right": "bottom-4 right-4 sm:bottom-5 sm:right-5",
};

export default function ProductionVideo() {
  const headRef      = useReveal();
  const capRef       = useStagger("[data-cap]", { stagger: 0.08 });
  const videoRef     = useRef(null);
  const containerRef = useRef(null);
  const parallaxRef  = useRef(null);
  const reduced      = usePrefersReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [src, setSrc] = useState(null);
  /* The reel autoplays muted — browsers block audible autoplay, and an
     unexpected soundtrack is hostile anyway. `muted` is tracked here so the
     speaker button can reflect (and toggle) the real element state. */
  const [muted, setMuted] = useState(true);

  /* Lazy-load the video source when the section enters the viewport */
  useEffect(() => {
    const container = containerRef.current;
    if (!container || src) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setSrc("/assets/video.mp4");
        observer.disconnect();
      },
      { rootMargin: "300px 0px" }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, [src]);

  /* Auto-play once source is set */
  useEffect(() => {
    if (!src) return;
    const el = videoRef.current;
    if (!el) return;
    el.play().catch(() => {});
    setPlaying(true);
  }, [src]);

  /* Parallax depth: the <video> drifts upward slower than the page scroll.
     The transform is applied to the video INSIDE the overflow-hidden panel, not
     to the panel itself. Transforming the panel would move the whole grid item
     — it would overlap the headline column and tear a gap along the bottom
     edge. Translating the video and overscaling it (1.2) means the 8% offset
     can never expose an edge, at any viewport height. */
  useEffect(() => {
    if (reduced) return;
    const el = parallaxRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 0, scale: 1.2 },
        {
          y: () => -el.offsetHeight * 0.08,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.4,
            invalidateOnRefresh: true,
          },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [reduced]);

  const onPlay = () => {
    if (!src) setSrc("/assets/video.mp4");
    videoRef.current?.play().catch(() => {});
    setPlaying(true);
  };

  /* Pause/resume from the overlay control once the reel is running. */
  const onTogglePlay = () => {
    const el = videoRef.current;
    if (!el) return onPlay();
    if (el.paused) {
      el.play().catch(() => {});
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  /* Mute/unmute. Volume is set explicitly because some browsers ignore a
     bare `muted` flip on a playing element. */
  const onToggleMute = () => {
    const el = videoRef.current;
    if (!el) return;
    const next = !el.muted;
    el.muted = next;
    el.volume = 1;
    setMuted(next);
  };

  return (
    <section
      ref={containerRef}
      data-testid="video-section"
      className="relative overflow-hidden bg-surface-primary py-16 lg:py-20"
    >      {/* Ambient background — warm gold wash, drifting glow, faint grid, shimmer edge */}
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(165deg, rgba(197,160,90,0.10), rgba(197,160,90,0.03) 45%, transparent 75%)" }} />
      <div aria-hidden className="glow-drift pointer-events-none absolute -top-44 -left-40 h-[480px] w-[480px] rounded-full" style={{ background: "radial-gradient(circle, rgba(197,160,90,0.22), transparent 65%)" }} />
      <div aria-hidden className="lux-grid pointer-events-none absolute inset-0 opacity-50" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(197,160,90,0.7), transparent)", backgroundSize: "200% 100%", animation: "gold-shimmer 6s linear infinite" }} />
      <div className="section-pad relative mx-auto max-w-[1400px]">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left — concise copy */}
          <div ref={headRef}>
            <span className="label text-gold-ink">{VIDEO.eyebrow}</span>
            <h2 className="display mt-4 text-3xl leading-[1.08] tracking-tight text-ink sm:text-4xl lg:text-[44px]">{VIDEO.headline}</h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-ink/55 sm:text-base">{VIDEO.sub}</p>
          </div>

        {/* Right — video. The panel clips; the video inside it parallaxes. */}
        <div className="relative aspect-video w-full self-center overflow-hidden rounded-lg border border-gold/25 lg:row-span-2" style={{ boxShadow: "0 0 60px rgba(197,160,90,0.10)" }}>
          <video
            ref={(node) => {
              videoRef.current = node;
              parallaxRef.current = node;
            }}
            className="absolute inset-0 z-10 h-full w-full object-cover"
            /* preload="none" + no autoPlay: nothing is fetched until the
               section nears the viewport. playsInline stops iOS hijacking
               autoplay into fullscreen. */
            preload="none"
            muted={muted}
            loop
            playsInline
            poster="/assets/banners/banner3.jpg"
          >
            {src && <source src={src} type="video/mp4" />}
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

          {/* Play/pause + volume, bottom-left. Kept clear of the stat chips,
              which are pinned to the right edge. Rendered UNCONDITIONALLY —
              gating them on `src` meant they stayed hidden until the
              IntersectionObserver had fired, which is exactly why no volume
              control was ever visible on first paint. The handlers already
              no-op safely when the element is not mounted yet. */}
          <div className="absolute bottom-4 left-4 z-30 flex items-center gap-2 sm:bottom-5 sm:left-5">
              <button
                type="button"
                onClick={onTogglePlay}
                aria-label={playing ? "Pause production reel" : "Play production reel"}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/55 text-white backdrop-blur-sm transition-colors duration-300 hover:border-gold/60 hover:text-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                {playing ? (
                  <Pause size={15} className="fill-white" />
                ) : (
                  <Play size={15} className="ml-0.5 fill-white" />
                )}
              </button>

              <button
                type="button"
                data-testid="video-mute"
                onClick={onToggleMute}
                aria-label={muted ? "Unmute production reel" : "Mute production reel"}
                aria-pressed={!muted}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/55 text-white backdrop-blur-sm transition-colors duration-300 hover:border-gold/60 hover:text-gold-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
          </div>

          {/* Floating stat chips — right edge only */}
          {VIDEO.stats.map((s) => (
            <div
              key={s.label}
              className={`absolute z-20 ${POS[s.pos]} rounded bg-black/50 backdrop-blur-sm px-3 py-1.5 text-[11px] font-medium tracking-wider text-white border border-border-soft`}
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
