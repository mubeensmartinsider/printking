import React from "react";

/* Contact-sheet art shown when a product's dedicated file hasn't been dropped in yet */
export const PRODUCT_FALLBACK_IMG = "/assets/services/products.jpg";

/* Product artwork with graceful degradation — drop a real file at
   content.js `image` and the fallback is never used. */
export default function ProductImage({ src, alt, className = "", fallback = PRODUCT_FALLBACK_IMG }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
      onError={(event) => {
        const el = event.currentTarget;
        if (el.dataset.fallbackApplied) return;
        el.dataset.fallbackApplied = "1";
        el.src = fallback;
      }}
    />
  );
}
