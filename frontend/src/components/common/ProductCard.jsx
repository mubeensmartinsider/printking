import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ProductImage from "./ProductImage";
import use3DTilt from "../../lib/use3DTilt";

/* Compact product tile with 3D tilt on hover */
export default function ProductCard({ product, className = "" }) {
  const { ref, glareRef, onMove, onLeave } = use3DTilt({ max: 8, scale: 1.02, speed: 550 });

  return (
    <Link
      to={`/products/${product.slug}`}
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      data-testid={`product-card-${product.slug}`}
      aria-label={`${product.title} — view product details`}
      className={`group flex h-full flex-col overflow-hidden rounded-md border border-border-soft bg-surface-elevated transition-shadow duration-500 ease-lux hover:shadow-[0_22px_45px_-20px_rgba(28,26,23,0.45)] ${className}`}
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
    >
      {/* Glare sheen */}
      <span
        ref={glareRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 rounded-md opacity-0 overflow-hidden"
        style={{
          background:
            "linear-gradient(105deg, rgba(255,255,255,0) 38%, rgba(255,255,255,0.13) 50%, rgba(255,255,255,0) 62%)",
        }}
      />

      {/* Product art — white plate so pack shots read in both themes */}
      <div
        className="relative aspect-[16/11] overflow-hidden bg-white"
        style={{ transform: "translateZ(16px)" }}
      >
        <ProductImage
          src={product.image}
          alt={`${product.title} packaging by PrintKing`}
          className="h-full w-full object-contain p-3 transition-transform duration-700 ease-lux group-hover:scale-[1.05]"
        />
        <span className="absolute left-3 top-3 rounded-full border border-gold/30 bg-obsidian/80 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-gold-soft backdrop-blur-sm">
          {product.category}
        </span>
      </div>

      {/* Copy */}
      <div
        className="flex flex-1 flex-col border-t border-border-soft px-4 py-3.5"
        style={{ transform: "translateZ(8px)" }}
      >
        <h3 className="display text-base leading-snug text-ink sm:text-lg">{product.title}</h3>
        <p className="mt-1.5 line-clamp-2 flex-1 text-xs leading-relaxed text-ink/55">{product.short}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-ink">
          View details
          <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
