import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "@/lib/animations";

const BannerCarousel = ({ banners = [], autoPlayInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const autoPlayRef = useRef(null);
  const carouselRef = useRef(null);

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
    setIsAutoPlay(false);
    // Resume autoplay after 8 seconds of inactivity
    setTimeout(() => setIsAutoPlay(true), 8000);
  };

  const goNext = () => {
    goToSlide((currentIndex + 1) % totalBanners);
  };

  const goPrev = () => {
    goToSlide((currentIndex - 1 + totalBanners) % totalBanners);
  };

  if (!banners || banners.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-200 flex items-center justify-center rounded-lg">
        <p className="text-gray-500">No banners available</p>
      </div>
    );
  }

  return (
    <div
      ref={carouselRef}
      className="relative w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-900"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      {/* Image Container - sized to banner aspect ratio 1600x550 */}
      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "1600 / 550" }}>
        {banners.map((banner, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              idx === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={banner}
              alt={`Banner ${idx + 1}`}
              className="w-full h-full object-cover"
              loading={idx === currentIndex ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      {/* Navigation Controls - Desktop */}
      <button
        onClick={goPrev}
        aria-label="Previous slide"
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 group"
      >
        <ChevronLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
      </button>

      <button
        onClick={goNext}
        aria-label="Next slide"
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-300 group"
      >
        <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/20 backdrop-blur-md px-4 py-2 rounded-full">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full ${
              idx === currentIndex
                ? "bg-white w-8 h-2"
                : "bg-white/40 hover:bg-white/60 w-2 h-2"
            }`}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="absolute top-6 right-6 z-20 hidden md:flex items-center gap-2 bg-black/30 backdrop-blur-md px-4 py-2 rounded-lg text-white text-sm font-medium border border-white/10">
        <span>{String(currentIndex + 1).padStart(2, "0")}</span>
        <span className="text-white/50">/</span>
        <span>{String(totalBanners).padStart(2, "0")}</span>
      </div>
    </div>
  );
};

export default BannerCarousel;
