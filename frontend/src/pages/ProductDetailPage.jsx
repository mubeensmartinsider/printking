import React from "react";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import Seo from "../components/common/Seo";
import ProductCard from "../components/common/ProductCard";
import ProductImage from "../components/common/ProductImage";
import { COMPANY, PRODUCTS, productHeaderImage } from "../lib/content";
import { buildWhatsAppLink } from "../lib/leadService";
import { useReveal, useStagger } from "../lib/animations";

/* Light theme only (current brief). Order: header (background image) →
   product image → description → features → related → CTA. */
export default function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const product = PRODUCTS.find((p) => p.slug === slug);

  const heroRef = useReveal({ y: 24 });
  const imageRef = useReveal({ y: 24 });
  const descRef = useReveal({ y: 24 });
  const featureRef = useStagger("[data-feature]", { stagger: 0.03, y: 16 });

  /* Unknown slug → back to the products index (hooks above stay unconditional) */
  if (!product) return <Navigate to="/products" replace />;

  const sameCategory = PRODUCTS.filter((p) => p.slug !== product.slug && p.category === product.category);
  const related = (sameCategory.length ? sameCategory : PRODUCTS.filter((p) => p.slug !== product.slug)).slice(0, 4);

  const whatsappHref = buildWhatsAppLink({
    productType: product.title,
    message: `Hello PrintKing — I'd like a quotation for ${product.title}.`,
  });

  return (
    <div className="bg-surface-base text-ink">
      <Seo
        title={`${product.title} — ${product.category} | PRINTKING`}
        description={product.short}
        path={`/products/${product.slug}`}
        image={product.banner}
      />

      {/* ── 1. Compact header with a light background image ── */}
      <header className="relative isolate overflow-hidden border-b border-border-soft">
        <img
          src={productHeaderImage(product)}
          alt=""
          aria-hidden="true"
          fetchpriority="high"
          decoding="async"
          className="absolute inset-0 -z-10 h-full w-full object-cover object-right opacity-30"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-surface-base via-surface-base/90 to-surface-base/30" />

        <div ref={heroRef} className="section-pad mx-auto max-w-[1400px] pb-8 pt-32 lg:pb-10 lg:pt-36">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-ink-tertiary">
            <Link to="/" className="transition-colors duration-300 hover:text-gold-ink">Home</Link>
            <span>/</span>
            <Link to="/products" className="transition-colors duration-300 hover:text-gold-ink">Products</Link>
            <span>/</span>
            <span className="text-gold-ink">{product.title}</span>
          </nav>

          <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-border-soft bg-surface-elevated px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-gold-ink">
                  {product.category}
                </span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-ink-tertiary">
                  Product {product.num} / {PRODUCTS.length}
                </span>
              </div>

              <h1 className="display mt-3 text-3xl leading-[1.08] sm:text-4xl lg:text-[46px]">{product.title}</h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-secondary sm:text-[15px]">{product.tagline}</p>

              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {product.highlights.map((item) => (
                  <li key={item} className="flex items-center gap-1.5 text-xs text-ink-secondary">
                    <Check size={13} className="shrink-0 text-gold-ink" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button onClick={() => navigate("/request-quote")} className="btn-gold h-11 px-6 text-xs">
                Request a Quote
              </button>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center gap-2 rounded-sm border border-border-soft bg-surface-elevated px-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-ink transition-colors duration-300 hover:bg-surface-hover"
              >
                <MessageCircle size={14} />
                Let's Chat
              </a>
            </div>
          </div>
        </div>
      </header>
      {/* ── 2. Product image + 3. Description (side by side — compact) ── */}
      <section className="py-10 lg:py-12">
        <div className="section-pad mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-12">
          <figure
            ref={imageRef}
            className="overflow-hidden rounded-md border border-border-soft bg-surface-elevated shadow-[0_18px_40px_-34px_rgba(28,26,23,0.5)]"
          >
            <ProductImage
              src={product.image}
              alt={`${product.title} packaging manufactured by ${COMPANY.name}`}
              className="aspect-[4/3] w-full bg-white object-contain p-4"
            />
            <figcaption className="flex flex-wrap items-center justify-between gap-2 border-t border-border-soft bg-surface-base px-3.5 py-2 text-[9px] font-semibold uppercase tracking-[0.16em] text-gold-ink">
              {product.title}
              <span className="text-ink-tertiary">{COMPANY.name}</span>
            </figcaption>
          </figure>

          <div ref={descRef}>
            <span className="label text-gold-ink">Overview</span>
            <h2 className="display mt-2 text-2xl sm:text-3xl">Product Description</h2>

            <div className="mt-3 space-y-3">
              {product.description.map((paragraph) => (
                <p key={paragraph.slice(0, 32)} className="text-sm leading-relaxed text-ink-secondary">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {product.highlights.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-border-soft bg-surface-elevated px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-ink-secondary"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Features — dense specification grid ── */}
      <section className="border-t border-border-soft bg-surface-primary py-10 lg:py-14">
        <div className="section-pad mx-auto max-w-[1400px]">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="label text-gold-ink">Specification</span>
              <h2 className="display mt-2 text-2xl sm:text-3xl">Features & Options</h2>
            </div>
            <p className="max-w-sm text-xs leading-relaxed text-ink-tertiary">
              Every specification below can be tailored to your brand — send us your requirement and we'll confirm
              material, finishing, lead time and pricing.
            </p>
          </div>

          <dl
            ref={featureRef}
            className="mt-6 grid gap-px overflow-hidden rounded-md border border-border-soft bg-surface-elevated sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {product.features.map((feature) => (
              <div
                key={feature.label}
                data-feature
                className="bg-surface-elevated px-4 py-3.5 transition-colors duration-300 hover:bg-surface-base"
              >
                <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-gold-ink">{feature.label}</dt>
                <dd className="mt-1 text-xs leading-relaxed text-ink-secondary">{feature.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      {/* ── 5. Related products ── */}
      {related.length > 0 && (
        <section className="border-t border-border-soft py-10 lg:py-12">
          <div className="section-pad mx-auto max-w-[1400px]">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="label text-gold-ink">Explore More</span>
                <h2 className="display mt-2 text-2xl sm:text-3xl">Related Products</h2>
              </div>
              <Link
                to="/products"
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-ink transition-colors duration-300 hover:text-gold-ink"
              >
                All products
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((item) => (
                <ProductCard key={item.slug} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 6. Compact CTA band ── */}
      <section className="border-t border-border-soft bg-surface-primary py-8 lg:py-9">
        <div className="section-pad mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="display text-xl sm:text-2xl">Ready to specify your {product.title.toLowerCase()}?</h2>
            <p className="mt-1 max-w-xl text-sm text-ink-secondary">
              Share your dimensions, quantity and finish requirements — we'll return a detailed quotation and production
              timeline within 4 business hours.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={() => navigate("/request-quote")} className="btn-gold h-11 px-6 text-xs">
              Request a Quote
            </button>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center gap-2 rounded-sm border border-border-soft bg-surface-elevated px-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-gold-ink transition-colors duration-300 hover:bg-surface-hover"
            >
              <MessageCircle size={14} />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>


    </div>
  );
}
