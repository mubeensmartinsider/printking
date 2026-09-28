const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

/* "2026-09-12" -> "12 Sep 2026" */
export function formatDate(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

/* Meta line shared by every view: date · read time · author */
export function PostMeta({ post, className = "" }) {
  return (
    <span className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-ink-tertiary ${className}`}>
      <span>{formatDate(post.date)}</span>
      <span aria-hidden="true">·</span>
      <span>{post.readTime} min read</span>
      <span aria-hidden="true">·</span>
      <span>{post.author}</span>
    </span>
  );
}
