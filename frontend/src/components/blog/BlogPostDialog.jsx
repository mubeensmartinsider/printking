import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Award, Layers, Quote } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Img from "../common/Img";
import { PostMeta } from "./postMeta";

/* ============================================================
   Post reader — the full article in a scrollable dialog.
   Theme-aware throughout, with prev/next so the reader can keep
   moving without going back to the list.
   ============================================================ */

export default function BlogPostDialog({ post, posts, onClose, onSelect }) {
  const i = posts.findIndex((p) => p.slug === post?.slug);
  const step = (dir) => {
    if (i < 0 || posts.length < 2) return;
    onSelect(posts[(i + dir + posts.length) % posts.length]);
  };

  return (
    <Dialog open={!!post} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        data-testid="blog-reader"
        className="max-h-[92vh] max-w-3xl overflow-y-auto border-border-soft bg-surface-elevated p-0 sm:rounded-sm"
      >
        {post && (
          <>
            <div className="relative h-[26vh] overflow-hidden bg-surface-hover sm:h-[30vh]">
              <Img
                src={post.cover}
                alt={post.title}
                label={post.category}
                className="h-full w-full"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/45 to-transparent" />
              <span className="absolute bottom-4 left-5 border border-gold/30 bg-obsidian/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-gold-soft backdrop-blur-sm">
                {post.category}
              </span>
            </div>

            <article className="p-5 sm:p-7">
              <DialogTitle className="display text-balance text-2xl leading-[1.15] text-ink sm:text-3xl">
                {post.title}
              </DialogTitle>
              <PostMeta post={post} className="mt-3" />

              <div className="mt-5 space-y-5">
                {post.body.map((section) => (
                  <section key={section.heading}>
                    <h3 className="label text-gold-ink">{section.heading}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-secondary">
                      {section.text}
                    </p>
                  </section>
                ))}
              </div>

              {/* Materials */}
              <div className="mt-6 border-t border-border-soft pt-5">
                <h3 className="label mb-3 flex items-center gap-2 text-ink-tertiary">
                  <Layers size={12} />
                  Materials & finishes
                </h3>
                <ul className="flex flex-wrap gap-1.5">
                  {post.materials.map((m) => (
                    <li
                      key={m}
                      className="border border-border-soft bg-surface-base px-2.5 py-1 text-[11px] leading-tight text-ink-secondary"
                    >
                      {m}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Outcomes */}
              <div className="mt-5 border-t border-border-soft pt-5">
                <h3 className="label mb-3 flex items-center gap-2 text-ink-tertiary">
                  <Award size={12} />
                  Outcomes
                </h3>
                <ul className="space-y-1.5">
                  {post.results.map((r) => (
                    <li key={r} className="flex items-start gap-2.5 text-sm text-ink-secondary">
                      <span className="mt-[7px] h-1 w-1 flex-none rounded-full bg-gold" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Client quote */}
              {post.quote && (
                <figure className="mt-6 border-l-2 border-gold bg-surface-base p-5">
                  <Quote size={14} className="text-gold-ink" />
                  <blockquote className="display-serif-alt mt-2 text-base italic leading-relaxed text-ink">
                    “{post.quote.text}”
                  </blockquote>
                  <figcaption className="mt-3 text-sm text-ink-secondary">
                    <span className="block text-ink">{post.quote.name}</span>
                    <span className="label text-gold-ink">{post.quote.role}</span>
                  </figcaption>
                </figure>
              )}

              {/* Footer — keep reading or enquire */}
              <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border-soft pt-5">
                <Link
                  to="/request-quote"
                  onClick={onClose}
                  className="group inline-flex items-center gap-2 bg-gold px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-obsidian transition-colors duration-300 hover:bg-gold-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  Start a project like this
                  <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

                <div className="ml-auto flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    data-testid="blog-reader-prev"
                    className="border border-border-soft px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-tertiary transition-colors duration-300 hover:border-gold/60 hover:text-gold-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  >
                    ← Older
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    data-testid="blog-reader-next"
                    className="border border-border-soft px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-tertiary transition-colors duration-300 hover:border-gold/60 hover:text-gold-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                  >
                    Newer →
                  </button>
                </div>
              </div>
            </article>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
