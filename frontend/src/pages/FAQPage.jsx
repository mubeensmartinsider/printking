import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { List, Search, X } from "lucide-react";
import Seo from "../components/common/Seo";
import PageHero from "../components/common/PageHero";
import { ThemePill } from "../components/common/ThemeToggle";
import FaqList from "../components/faq/FaqList";
import { FAQ } from "../lib/content";

/* ============================================================
   /faq — every answer on one page, grouped by topic.

   A single, dense list: search, a live count, expand/collapse
   all, and the theme control share one compact toolbar. No
   layout chrome for its own sake, and every surface, border and
   text colour is a theme token so light and dark both work.
   ============================================================ */

const TOTAL_QUESTIONS = FAQ.categories.reduce((n, c) => n + c.items.length, 0);

export default function FAQPage() {
  const [query, setQuery] = useState("");

  /* Search across questions AND answers */
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const all = FAQ.categories.flatMap((c) => c.items);
    if (!q) return all;
    return all.filter(
      (item) => item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
    );
  }, [query]);

  /* Matching questions, grouped back into their topics */
  const categories = useMemo(() => {
    if (!query.trim()) return FAQ.categories;
    return FAQ.categories
      .map((c) => ({ ...c, items: c.items.filter((i) => results.some((r) => r.q === i.q)) }))
      .filter((c) => c.items.length > 0);
  }, [query, results]);

  return (
    <>
      <Seo
        title="FAQ — Frequently Asked Questions | PRINTKING"
        description="Find answers to common questions about PRINTKING's printing and packaging services, ordering process, materials, finishes, and delivery."
        path="/faq"
      />

      <PageHero eyebrow={FAQ.eyebrow} title={FAQ.headline} sub={FAQ.sub} tight />

      <section className="bg-surface-base py-10 md:py-12">
        <div className="section-pad mx-auto max-w-[1200px]">
          {/* ── Search, count, theme — one row ─────────────────────── */}
          <div className="flex flex-col gap-3 border border-border-soft bg-surface-elevated px-4 py-3 shadow-[var(--shadow-card)] sm:flex-row sm:items-center">
            <div className="relative w-full sm:max-w-sm">
              <Search
                size={14}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-tertiary"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search questions…"
                aria-label="Search frequently asked questions"
                data-testid="faq-search"
                className="h-9 w-full border border-border-soft bg-surface-base pl-9 pr-9 text-sm text-ink placeholder:text-ink-tertiary focus:border-gold focus:outline-none focus-visible:ring-1 focus-visible:ring-gold"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  data-testid="faq-search-clear"
                  className="absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center text-ink-tertiary transition-colors duration-300 hover:text-gold-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <X size={13} />
                </button>
              )}
            </div>

            <span className="flex items-center gap-1.5 whitespace-nowrap text-xs text-ink-secondary sm:ml-1">
              <List size={12} className="text-gold-ink" />
              <span className="text-sm font-medium text-ink">{results.length}</span> of{" "}
              {TOTAL_QUESTIONS}
            </span>

            <ThemePill testId="faq-theme-toggle" className="sm:ml-auto" />
          </div>

          {/* ── The answers ───────────────────────────────────────── */}
          <div className="mt-4">
            {results.length === 0 ? (
              <p className="border border-dashed border-border-soft bg-surface-elevated px-6 py-16 text-center text-sm text-ink-secondary">
                No questions match “{query.trim()}”. Try a different keyword, or{" "}
                <Link to="/contact" className="text-gold-ink underline underline-offset-4">
                  ask us directly
                </Link>
                .
              </p>
            ) : (
              <FaqList categories={categories} />
            )}
          </div>

          {/* ── Enquiry ───────────────────────────────────────────── */}
          <div className="relative mt-8 overflow-hidden border border-gold/30 bg-surface-elevated px-6 py-8 text-center">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background: "radial-gradient(70% 120% at 50% 0%, var(--gold-100), transparent 70%)",
              }}
            />
            <div className="relative">
              <h2 className="display text-2xl text-ink sm:text-3xl">{FAQ.cta.title}</h2>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-ink-secondary">
                {FAQ.cta.sub}
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                <Link to={FAQ.cta.primary.to} className="btn-gold">
                  {FAQ.cta.primary.label}
                </Link>
                <Link to={FAQ.cta.secondary.to} className="btn-ghost">
                  {FAQ.cta.secondary.label}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
