import React, { useEffect, useRef, useState } from "react";
import { gsap, usePrefersReducedMotion } from "../../lib/animations";

/* ============================================================
   Img — premium image with graceful placeholder + scroll reveal.
   ============================================================ */
export default function Img({ src, alt = "", label, className = "", imgClassName = "", ...rest }) {
  const [failed, setFailed]   = useState(!src);
  const [loaded, setLoaded]   = useState(false);
  const wrapRef               = useRef(null);
  const reduced               = usePrefersReducedMotion();

  /* Scroll-reveal: image scales up from 1.06 → 1 and fades in.
     clearProps matters here — without it GSAP leaves inline transform/opacity
     on the wrapper permanently, which then fights the opacity transition the
     <img> below already runs. */
  useEffect(() => {
    if (reduced || !wrapRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(wrapRef.current, {
        scale: 1.06,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        clearProps: "transform,opacity",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top 88%",
          once: true,
          invalidateOnRefresh: true,
        },
      });
    }, wrapRef);
    return () => ctx.revert();
  }, [reduced]);

  if (failed) {
    return (
      <div
        className={`relative overflow-hidden bg-surface-elevated flex items-center justify-center ${className}`}
        data-testid="img-placeholder"
        {...rest}
      >
        <div className="grain absolute inset-0 opacity-[0.06]" />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(120% 80% at 30% 20%, rgba(197,160,90,0.10), transparent 60%)" }}
        />
        <div className="relative text-center px-6">
          <div className="mx-auto mb-3 h-8 w-8 rounded-full border border-gold/40" />
          <span className="label text-gold-ink/70">{label || alt || "Image"}</span>
        </div>
      </div>
    );
  }

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className}`} {...rest}>
      {/* Shimmer placeholder until image loads */}
      {!loaded && (
        <div className="absolute inset-0 skeleton-shimmer" aria-hidden="true" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"} ${imgClassName}`}
      />
    </div>
  );
}
