import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import Seo from "../components/common/Seo";
import ProductCard from "../components/common/ProductCard";
import { COMPANY, PRODUCTS, PRODUCT_CATEGORIES, PRODUCT_PAGE } from "../lib/content";
import { useReveal, useStagger } from "../lib/animations";

/* Turn a category label into a stable data-testid slug */
const testId = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-");

/* Light theme only (current brief): warm-white palette, compact spacing and
   light-toned imagery so nothing dominates the page. */
export default function ProductsPage() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("All");
  const heroRef = useReveal({ y: 24 });
  const gridRef = useStagger("[data-product]", { stagger: 0.05, y: 24 });

  const products = useMemo(
    () => (category === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === category)),
    [category]
  );

  return (
    <div className="bg-[#faf9f7] text-[#1c1a17]">
      <Seo
        title="Products — Luxury Packaging, Boxes, Bags & Print | PRINTKING"
        description="Explore PRINTKING's product range: luxury rigid boxes, folding cartons, mailer boxes, paper bags, labels, catalogues and commercial printing. Click any product for its full specification."
        path="/products"
        image={PRODUCT_PAGE.banner}
      />

      {/* ── Compact header with a light background image ── */}
      <section className="relative isolate overflow-hidden border-b border-[#e8e1d7]">
        <img
          src={PRODUCT_PAGE.banner}
          alt=""
          aria-hidden="true"
          fetchpriority="high"
          decoding="async"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-right opacity-30"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#faf9f7] via-[#faf9f7]/90 to-[#faf9f7]/30" />

        <div ref={heroRef} className="section-pad mx-auto max-w-[1400px] pb-9 pt-32 lg:pb-11 lg:pt-36">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-[#8a8076]">
            <Link to="/" className="transition-colors duration-300 hover:text-[#8b6a32]">Home</Link>
            <span>/</span>
            <span className="text-[#8b6a32]">Products</span>
          </nav>

          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <span className="label text-[#8b6a32]">{PRODUCT_PAGE.eyebrow}</span>
              <h1 className="display mt-2 text-3xl leading-[1.1] sm:text-4xl lg:text-[42px]">
                {PRODUCT_PAGE.headline}
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-[#5a5248] sm:text-[15px]">{PRODUCT_PAGE.sub}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button onClick={() => navigate("/request-quote")} className="btn-gold h-11 px-6 text-xs">
                Request a Quote
              </button>
              <a
                href={`https://wa.me/${COMPANY.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-sm border border-[#d9cba6] bg-white/60 px-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8b6a32] transition-colors duration-300 hover:bg-white"
              >
                <MessageCircle size={14} />
                Let's Chat
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* ── Filters + product grid (click a card for the full product page) ── */}
      <section className="py-10 lg:py-12">
        <div className="section-pad mx-auto max-w-[1400px]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter products by category">
              {PRODUCT_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={category === cat}
                  data-testid={`product-filter-${testId(cat)}`}
                  onClick={() => setCategory(cat)}
                  className={`rounded-full border px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] transition-all duration-300 ${
                    category === cat
                      ? "border-[#c5a05a] bg-[#c5a05a] text-[#1c1a17]"
                      : "border-[#e0d8c8] bg-white text-[#5a5248] hover:border-[#c5a05a] hover:text-[#8b6a32]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <span className="text-[10px] uppercase tracking-[0.18em] text-[#8a8076]">
              {products.length} {products.length === 1 ? "Product" : "Products"}
            </span>
          </div>

          <div ref={gridRef} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <div key={product.slug} data-product className="h-full">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Compact CTA band ── */}
      <section className="border-t border-[#e8e1d7] bg-[#f4f1ec] py-8 lg:py-9">
        <div className="section-pad mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="display text-xl sm:text-2xl">Can't find your format?</h2>
            <p className="mt-1 max-w-xl text-sm text-[#5a5248]">
              Send us the dimensions, quantity and finish you have in mind — we'll engineer the structure and return a
              detailed quotation within 4 business hours.
            </p>
          </div>
          <button onClick={() => navigate("/request-quote")} className="btn-gold h-11 px-6 text-xs">
            Request a Quote
          </button>
        </div>
      </section>

    </div>
  );
}
