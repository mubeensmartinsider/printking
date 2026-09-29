import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const BannerCarousel = ({ banners = [], autoPlayInterval = 5000 }) => {
  // Respect prefers-reduced-motion — no autoplay under reduced-motion
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(!prefersReducedMotion);
  const autoPlayRef = useRef(null);
  const carouselRef = useRef(null);
  const liveRef = useRef(null);

  const totalBanners = banners.length || 1;

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlay || totalBanners <= 1) return;

    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalBanners);
    }, autoPlayInterval);

    return () => clearInterval(autoPlayRef.current);
  }, [isAutoPlay, totalBanners, autoPlayInterval]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    if (!prefersReducedMotion) {
      setIsAutoPlay(false);
      // Resume autoplay after 8 seconds of inactivity
      setTimeout(() => setIsAutoPlay(true), 8000);
    }
  };

  const goNext = () => {
    goToSlide((currentIndex + 1) % totalBanners);
  };

  const goPrev = () => {
    goToSlide((currentIndex - 1 + totalBanners) % totalBanners);
  };

  if (!banners || banners.length === 0) {
    return (
      <div className="flex h-96 w-full items-center justify-center rounded-lg bg-surface-elevated">
        <p className="text-ink-tertiary">No banners available</p>
      </div>
    );
  }

  return (
    <div
      ref={carouselRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured banners"
      className="relative w-full overflow-hidden bg-surface-elevated"
      onMouseEnter={() => { if (!prefersReducedMotion) setIsAutoPlay(false); }}
      onMouseLeave={() => { if (!prefersReducedMotion) setIsAutoPlay(true); }}
    >
      {/* Visually-hidden live region announces slide changes to screen readers */}
      <div
        ref={liveRef}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {`Slide ${currentIndex + 1} of ${totalBanners}`}
      </div>

      {/* Image Container - sized to banner aspect ratio 1600x550 */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1600 / 550" }}>
        {banners.map((banner, idx) => (
          <div
            key={idx}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${idx + 1} of ${totalBanners}`}
            aria-hidden={idx !== currentIndex}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              idx === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={banner}
              alt=""
              role="presentation"
              className="w-full h-full object-cover"
              loading={idx === currentIndex ? "eager" : "lazy"}
              decoding="async"
              fetchpriority={idx === 0 ? "high" : "auto"}
            />
          </div>
        ))}
      </div>

      {/* Navigation Controls - Desktop */}
      <button
        onClick={goPrev}
        aria-label="Previous slide"
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-border-soft/20 text-white hover:bg-white/20 transition-all duration-300 group"
      >
        <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform motion-safe:group-hover:-translate-x-1" />
      </button>

      <button
        onClick={goNext}
        aria-label="Next slide"
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-border-soft/20 text-white hover:bg-white/20 transition-all duration-300 group"
      >
        <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform motion-safe:group-hover:translate-x-1" />
      </button>

      {/* Dot Indicators */}
      <div
        role="tablist"
        aria-label="Slide indicators"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full"
      >
        {banners.map((_, idx) => (
          <button
            key={idx}
            role="tab"
            aria-selected={idx === currentIndex}
            aria-label={`Go to slide ${idx + 1}`}
            aria-current={idx === currentIndex ? "true" : undefined}
            onClick={() => goToSlide(idx)}
            className={`transition-all duration-300 rounded-full ${
              idx === currentIndex
                ? "bg-white w-8 h-2"
                : "bg-white/40 hover:bg-white/60 w-2 h-2"
            }`}
          />
        ))}
      </div>

      {/* Counter */}
      <div
        aria-hidden="true"
        className="absolute top-6 right-6 z-20 hidden md:flex items-center gap-2 bg-black/30 backdrop-blur-md px-4 py-2 rounded-lg text-white text-sm font-medium border border-border-soft"
      >
        <span>{String(currentIndex + 1).padStart(2, "0")}</span>
        <span className="text-white/50">/</span>
        <span>{String(totalBanners).padStart(2, "0")}</span>
      </div>
    </div>
  );
};

export default BannerCarousel;
