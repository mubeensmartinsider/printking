import React from "react";
import { ArrowUpRight, Clock } from "lucide-react";
import Img from "../common/Img";
import { PostMeta } from "./postMeta";

/* ============================================================
   Grid view — covers first. The first post gets a wide cell so
   the page opens on the most recent story rather than a wall of
   equal cards. Every card opens the post reader.
   ============================================================ */

export default function BlogGrid({ posts, onSelect }) {
  return (
    <div data-testid="blog-view-grid" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, i) => {
        const featured = i === 0;
        return (
          <button
            key={post.slug}
            type="button"
            data-testid={`blog-post-${post.slug}`}
            onClick={() => onSelect(post)}
            aria-label={`Read: ${post.title}`}
            className={`group relative flex flex-col overflow-hidden border border-border-soft bg-surface-elevated text-left transition-all duration-500 ease-lux hover:-translate-y-1 hover:border-gold/50 hover:shadow-[var(--shadow-card-hover)] focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base ${
              featured ? "sm:col-span-2" : ""
            }`}
          >
            {/* Cover — the site's own printing photography, with a
                branded fallback if a file ever goes missing */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-hover">
              <Img
                src={post.cover}
                alt={post.title}
                label={post.category}
                className="h-full w-full"
                imgClassName="transition-transform duration-700 ease-lux group-hover:scale-[1.05]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/55 via-transparent to-transparent" />
              <span className="absolute left-4 top-4 border border-gold/30 bg-obsidian/70 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-gold-soft backdrop-blur-sm">
                {post.category}
              </span>
            </div>

            {/* Copy */}
            <div className="flex flex-1 flex-col p-5">
              <PostMeta post={post} />

              <h3
                className={`display mt-2 text-ink transition-colors duration-300 group-hover:text-gold-ink ${
                  featured ? "text-xl sm:text-2xl" : "text-base sm:text-lg"
                }`}
              >
                {post.title}
              </h3>

              <p
                className={`mt-2 text-sm leading-relaxed text-ink-secondary ${
                  featured ? "max-w-2xl" : "line-clamp-3"
                }`}
              >
                {post.excerpt}
              </p>

              <span className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-tertiary transition-colors duration-300 group-hover:text-gold-ink">
                <Clock size={11} />
                Read the story
                <ArrowUpRight
                  size={12}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
