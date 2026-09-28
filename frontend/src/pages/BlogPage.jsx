import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { SlidersHorizontal, ArrowRight } from "lucide-react";
import Seo from "../components/common/Seo";
import PageHero from "../components/common/PageHero";
import { ThemePill } from "../components/common/ThemeToggle";
import BlogGrid from "../components/blog/BlogGrid";
import BlogPostDialog from "../components/blog/BlogPostDialog";
import { BLOG } from "../lib/content";

/* ============================================================
   /blog — the PrintKing journal.

   One grid: covers first, narrowed by topic, with a live count
   and the theme control in a single row. Any post opens in the
   full article reader. Every surface, border and text colour is a
   theme token, so the page works in light and dark alike.
   ============================================================ */

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default function BlogPage() {
  const [category, setCategory] = useState("All");
  const [active, setActive] = useState(null);

  const categories = useMemo(() => {
    const seen = [];
    BLOG.posts.forEach((p) => {
      if (!seen.includes(p.category)) seen.push(p.category);
    });
    return seen;
  }, []);

  const counts = useMemo(
    () =>
      categories.reduce((acc, c) => {
        acc[c] = BLOG.posts.filter((p) => p.category === c).length;
        return acc;
      }, {}),
    [categories]
  );

  const posts = useMemo(
    () => (category === "All" ? BLOG.posts : BLOG.posts.filter((p) => p.category === category)),
    [category]
  );

  const chipBase =
    "inline-flex items-center gap-1.5 border px-3 py-1 text-[11px] tracking-[0.06em] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold";

  return (
    <>
      <Seo
        title="Blog — Print Craft, Materials & Project Stories | PRINTKING"
        description="Project stories, material guides and production know-how from the PRINTKING press floor — colour, board, finishes, quality and export."
        path="/blog"
      />

      <PageHero eyebrow={BLOG.eyebrow} title={BLOG.headline} sub={BLOG.sub} tight />

      <section className="bg-surface-base py-10 md:py-12">
        <div className="section-pad mx-auto max-w-[1400px]">
          {/* ── Filter, count, theme — one compact row ───────────────── */}
          <div className="flex flex-col gap-3 border border-border-soft bg-surface-elevated px-4 py-3 shadow-[var(--shadow-card)] sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-4 sm:gap-y-3">
            <span className="label flex items-center gap-2 text-ink-tertiary">
              <SlidersHorizontal size={12} />
              Topic
            </span>

            {["All", ...categories].map((c) => {
              const on = c === category;
              return (
                <button
                  key={c}
                  type="button"
                  data-testid={`blog-filter-${slug(c)}`}
                  onClick={() => setCategory(c)}
                  aria-pressed={on}
                  className={`${chipBase} ${
                    on
                      ? "border-gold bg-gold/15 text-gold-ink"
                      : "border-border-soft bg-surface-base text-ink-secondary hover:border-gold/50 hover:text-ink"
                  }`}
                >
                  {c}
                  <span
                    className={`text-[10px] tabular-nums ${
                      on ? "text-gold-ink/80" : "text-ink-tertiary"
                    }`}
                  >
                    {c === "All" ? BLOG.posts.length : counts[c]}
                  </span>
                </button>
              );
            })}

            <span className="whitespace-nowrap text-xs text-ink-secondary sm:ml-auto">
              <span className="text-sm font-medium text-ink">{posts.length}</span> of{" "}
              {BLOG.posts.length} posts
            </span>

            <ThemePill testId="blog-theme-toggle" />
          </div>

          {/* ── The archive ──────────────────────────────────────────── */}
          <div key={category} className="mt-3">
            {posts.length === 0 ? (
              <p className="border border-dashed border-border-soft bg-surface-elevated px-6 py-16 text-center text-sm text-ink-secondary">
                No posts in this topic yet.
              </p>
            ) : (
              <BlogGrid posts={posts} onSelect={setActive} />
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
              <h2 className="display text-2xl text-ink sm:text-3xl">{BLOG.cta.title}</h2>
              <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-ink-secondary">
                {BLOG.cta.sub}
              </p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                <Link to={BLOG.cta.primary.to} className="btn-gold">
                  {BLOG.cta.primary.label}
                  <ArrowRight size={13} />
                </Link>
                <Link to={BLOG.cta.secondary.to} className="btn-ghost">
                  {BLOG.cta.secondary.label}
                </Link>
              </div>
            </div>
          </div>

          <BlogPostDialog
            post={active}
            posts={posts}
            onClose={() => setActive(null)}
            onSelect={setActive}
          />
        </div>
      </section>
    </>
  );
}
