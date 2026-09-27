import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ProductImage from "./ProductImage";

/* Compact product tile — light theme (white art panel, dark copy) */
export default function ProductCard({ product, className = "" }) {
  return (
    <Link
      to={`/products/${product.slug}`}
      data-testid={`product-card-${product.slug}`}
      aria-label={`${product.title} — view product details`}
      className={`group flex h-full flex-col overflow-hidden rounded-md border border-border-soft bg-surface-elevated transition-all duration-500 ease-lux hover:-translate-y-0.5 hover:border-[#d9cba6] hover:shadow-[0_18px_40px_-30px_rgba(28,26,23,0.55)] ${className}`}
    >
      {/* Product art on a clean white panel */}
      <div className="relative aspect-[16/11] overflow-hidden bg-white">
        <ProductImage
          src={product.image}
          alt={`${product.title} packaging by PrintKing`}
          className="h-full w-full object-contain p-3 transition-transform duration-700 ease-lux group-hover:scale-[1.04]"
        />
        <span className="absolute left-3 top-3 rounded-full border border-black/5 bg-white/90 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-[#8b6a32]">
          {product.category}
        </span>
      </div>

      {/* Copy */}
      <div className="flex flex-1 flex-col border-t border-border-soft px-4 py-3.5">
        <h3 className="display text-base leading-snug text-ink sm:text-lg">{product.title}</h3>
        <p className="mt-1.5 line-clamp-2 flex-1 text-xs leading-relaxed text-ink/55">{product.short}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8b6a32]">
          View details
          <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

