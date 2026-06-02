import React, { useMemo, useState } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Seo from "../components/common/Seo";
import PageHero from "../components/common/PageHero";
import Img from "../components/common/Img";
import { PORTFOLIO, PORTFOLIO_FILTERS } from "../lib/content";

export default function PortfolioPage() {
  const [industry, setIndustry] = useState("All");
  const [product, setProduct] = useState("All");
  const [active, setActive] = useState(null);

  const items = useMemo(
    () =>
      PORTFOLIO.filter(
        (p) =>
          (industry === "All" || p.industry === industry) &&
          (product === "All" || p.product === product)
      ),
    [industry, product]
  );

  const FilterRow = ({ label, options, value, onChange }) => (
    <div className="flex flex-wrap items-center gap-2">
      <span className="label mr-2 text-platinum/40">{label}</span>
      {options.map((o) => (
        <button
          key={o}
          onClick={() => onChange(o)}
          data-testid={`filter-${o.replace(/\s+/g, "-").toLowerCase()}`}
          className={`px-4 py-1.5 text-xs transition-colors duration-300 ${
            value === o
              ? "bg-gold text-obsidian"
              : "border border-white/[0.1] text-platinum/70 hover:border-gold hover:text-gold"
          }`}
        >
          {o}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <Seo title="Portfolio — Luxury Packaging Projects | PRINTKING" description="A curated selection of luxury packaging projects across cosmetics, fashion, food & beverage, electronics and e-commerce — manufactured by PRINTKING." path="/portfolio" />
      <PageHero
        eyebrow="SELECTED WORK"
        title="Packaging That Earns Its Place on the Shelf"
        sub="A curated selection of projects across industries. Filter by sector or product type."
      />

      <section className="bg-obsidian py-16">
        <div className="section-pad mx-auto max-w-[1400px]">
          <div className="mb-10 space-y-4">
            <FilterRow label="Industry" options={PORTFOLIO_FILTERS.industries} value={industry} onChange={setIndustry} />
            <FilterRow label="Product" options={PORTFOLIO_FILTERS.products} value={product} onChange={setProduct} />
          </div>

          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
            {items.map((p, i) => (
              <button
                key={p.title}
                data-testid={`portfolio-item-${i}`}
                onClick={() => setActive(p)}
                className="group block w-full break-inside-avoid overflow-hidden border border-white/[0.06] text-left"
              >
                <Img
                  src={p.img}
                  alt={p.title}
                  label={p.title}
                  className={`w-full ${i % 3 === 0 ? "aspect-[3/4]" : "aspect-square"}`}
                  imgClassName="transition-transform duration-700 group-hover:scale-105"
                />
                <div className="flex items-center justify-between p-4">
                  <div>
                    <h3 className="text-sm font-medium text-platinum">{p.title}</h3>
                    <span className="label mt-1 block text-gold">{p.product}</span>
                  </div>
                  <span className="label text-platinum/40">{p.industry}</span>
                </div>
              </button>
            ))}
          </div>

          {items.length === 0 && (
            <p className="py-20 text-center text-platinum/50">No projects match these filters.</p>
          )}
        </div>
      </section>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="max-w-3xl border-white/10 bg-carbon p-0">
          {active && (
            <div>
              <Img src={active.img} alt={active.title} label={active.title} className="aspect-[16/10] w-full" />
              <div className="flex items-start justify-between p-6">
                <div>
                  <span className="label text-gold">{active.industry} · {active.product}</span>
                  <h3 className="display mt-2 text-2xl text-platinum">{active.title}</h3>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-platinum/55">
                    A bespoke {active.product.toLowerCase()} engineered for {active.title}. Foiled,
                    embossed and finished to luxury-shelf standards.
                  </p>
                </div>
                <button onClick={() => setActive(null)} className="text-platinum/60 hover:text-platinum">
                  <X size={20} />
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
