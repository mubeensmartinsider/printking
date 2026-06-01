import React, { useState } from "react";

/* ============================================================
   Img — premium image with graceful placeholder fallback.
   If the remote image fails, we render an on-brand labelled
   placeholder so the layout never breaks.
   ============================================================ */
export default function Img({ src, alt = "", label, className = "", imgClassName = "", ...rest }) {
  const [failed, setFailed] = useState(!src);

  if (failed) {
    return (
      <div
        className={`relative overflow-hidden bg-graphite flex items-center justify-center ${className}`}
        data-testid="img-placeholder"
        {...rest}
      >
        <div className="grain absolute inset-0 opacity-[0.06]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 30% 20%, rgba(201,168,76,0.10), transparent 60%)",
          }}
        />
        <div className="relative text-center px-6">
          <div className="mx-auto mb-3 h-8 w-8 rounded-full border border-gold/40" />
          <span className="label text-gold/70">{label || alt || "Image"}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`} {...rest}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setFailed(true)}
        className={`h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  );
}
