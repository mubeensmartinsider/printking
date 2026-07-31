import React, { useState, useRef, useCallback, useEffect } from "react";

/**
 * ComparisonSlider — Interactive before/after image comparison.
 *
 * Props:
 *   before: { src, alt, label } — before image
 *   after: { src, alt, label } — after image
 *   className: additional wrapper classes
 */
export default function ComparisonSlider({
  before = { src: "", alt: "Before", label: "Before" },
  after = { src: "", alt: "After", label: "After" },
  className = "",
}) {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const updatePosition = useCallback((clientX) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, []);

  const handleMouseDown = useCallback(
    (e) => {
      setIsDragging(true);
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (isDragging) updatePosition(e.clientX);
    },
    [isDragging, updatePosition]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchMove = useCallback(
    (e) => {
      if (isDragging) {
        updatePosition(e.touches[0].clientX);
      }
    },
    [isDragging, updatePosition]
  );

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  return (
    <div
      ref={containerRef}
      className={`comparison-slider relative overflow-hidden select-none ${className}`}
      style={{
        aspectRatio: "16/10",
        background: "var(--color-carbon)",
        cursor: "col-resize",
        userSelect: "none",
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={(e) => {
        setIsDragging(true);
        updatePosition(e.touches[0].clientX);
      }}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
    >
      {/* Before image (full width) */}
      <div className="absolute inset-0">
        <img
          src={before.src}
          alt={before.alt}
          className="h-full w-full object-cover"
          draggable={false}
        />
        {/* Before label */}
        <span className="absolute bottom-4 left-4 rounded-sm bg-black/50 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white/80 backdrop-blur-sm">
          {before.label}
        </span>
      </div>

      {/* After image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPos}%` }}
      >
        <img
          src={after.src}
          alt={after.alt}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ width: `${100 / (sliderPos / 100)}%` }}
          draggable={false}
        />
        {/* After label */}
        <span className="absolute bottom-4 right-4 rounded-sm bg-gold/80 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-obsidian backdrop-blur-sm">
          {after.label}
        </span>
      </div>

      {/* Slider handle */}
      <div
        className={`absolute inset-y-0 z-10 flex items-center justify-center transition-shadow duration-300 ${
          isDragging ? "shadow-gold-glow-hover" : ""
        }`}
        style={{ left: `${sliderPos}%` }}
      >
        {/* Handle line */}
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-white/90 shadow-[0_0_8px_rgba(0,0,0,0.5)]" />

        {/* Handle circle */}
        <div
          className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-obsidian/60 backdrop-blur-sm transition-all duration-200 ${
            isDragging ? "scale-110" : ""
          }`}
        >
          {/* Double arrow icon */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-gold"
          >
            <path d="M7 4L3 8L7 12" />
            <path d="M13 4L17 8L13 12" />
          </svg>
        </div>
      </div>
    </div>
  );
}