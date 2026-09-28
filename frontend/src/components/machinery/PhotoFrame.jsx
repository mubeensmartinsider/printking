import React, { useEffect, useRef, useState } from "react";

/* ============================================================
   PhotoFrame — shows the whole machine, always.

   The frame adopts the photo's own aspect ratio (read from the
   file as it loads), so the image fits the available area exactly:
   nothing is cropped off the sides, nothing is letterboxed, and
   there is no blurred filler behind it. A 3:2 landscape frame is
   used only as the pre-load placeholder so the layout never jumps.

   If the file is missing we fall back to a branded, on-theme
   placeholder carrying the machine name instead of a broken icon.
   ============================================================ */
export default function PhotoFrame({
  src,
  alt,
  label,
  className = "",
  imgClassName = "",
  eager = false,
  contain = false,
  fill = false,
}) {
  const imgRef = useRef(null);
  const [ratio, setRatio] = useState(null);
  const [failed, setFailed] = useState(false);

  const readRatio = (el) => {
    if (el && el.naturalWidth && el.naturalHeight) {
      setRatio(`${el.naturalWidth} / ${el.naturalHeight}`);
    }
  };

  /* Cached images can complete before React attaches onLoad */
  useEffect(() => {
    setRatio(null);
    setFailed(false);
    if (imgRef.current && imgRef.current.complete) readRatio(imgRef.current);
  }, [src]);

  if (failed) {
    return (
      <div
        className={`relative flex w-full items-center justify-center overflow-hidden bg-graphite ${
          fill ? "h-full" : "aspect-[3/2]"
        } ${className}`}
        data-testid="machinery-photo-missing"
      >
        <div className="grain absolute inset-0 opacity-[0.06]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 30% 20%, rgba(197,160,90,0.12), transparent 60%)",
          }}
        />
        <div className="relative px-6 text-center">
          <div className="mx-auto mb-3 h-8 w-8 rounded-full border border-gold/40" />
          <span className="label text-gold-soft/80">{label || alt || "Photography"}</span>
          <span className="mt-2 block text-[10px] uppercase tracking-[0.18em] text-platinum/40">
            Photo coming soon
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full overflow-hidden bg-surface-hover ${
        fill ? "h-full" : "aspect-[3/2]"
      } ${className}`}
      style={ratio && !fill ? { aspectRatio: ratio } : undefined}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onLoad={(e) => readRatio(e.currentTarget)}
        onError={() => setFailed(true)}
        className={`absolute inset-0 h-full w-full ${
          contain ? "object-contain" : "object-cover object-center"
        } ${imgClassName}`}
      />
    </div>
  );
}
